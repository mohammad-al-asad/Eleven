import { useState, useEffect, useRef } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';

type TimerOption = 2 | 5 | 10;

export default function MeditationScreen() {
    const router = useRouter();
    const [selectedTimer, setSelectedTimer] = useState<TimerOption>(2);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    // Use a ref for sound to handle audio lifecycle without triggering re-renders
    const soundRef = useRef<Audio.Sound | null>(null);

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    // Helper to format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            console.log('Timer starting...');
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleTimerComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                console.log('Cleaning up interval');
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    const handleTimerComplete = async () => {
        setIsRunning(false);
        await stopSession();
    };

    async function playAudio() {
        console.log('Attempting to load local meditation audio');
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                require('../../../assets/meditation.mp3'),
                { shouldPlay: true, isLooping: true }
            );
            soundRef.current = newSound;
            console.log('Audio playing successfully');
        } catch (error) {
            console.error('Error loading local audio:', error);
            alert('Could not play meditation.mp3. Please check if it exists in the assets folder.');
            setIsRunning(false);
        }
    }

    const startSession = async () => {
        const totalSeconds = selectedTimer * 60;
        setTimeLeft(totalSeconds);
        setIsRunning(true);
        await playAudio();
    };

    const stopSession = async () => {
        setIsRunning(false);
        if (soundRef.current) {
            try {
                await soundRef.current.stopAsync();
                await soundRef.current.unloadAsync();
            } catch (e) {
                console.log('Error stopping audio:', e);
            }
            soundRef.current = null;
        }
    };

    // Global cleanup on unmount only
    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    return (
        <Container style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => isRunning ? stopSession() : router.back()}
                    activeOpacity={0.7}
                    style={styles.backButton}
                >
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meditation</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Section Title */}
                <View style={styles.titleSection}>
                    <Text style={styles.sectionTitle}>
                        Ask For Inspiration. Relax.{'\n'}Don’t Struggle
                    </Text>
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        “Here we ask God for inspiration, an{'\n'}
                        intuitive thought or a decision.{'\n'}
                        We relax and take it easy. We{'\n'}
                        don’t struggle.”
                    </Text>
                </View>

                {/* Instructions */}
                <View style={styles.instructionsSection}>
                    <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                    <Text style={styles.instructionsText}>
                        Sit Quietly. Relax. Ask
                    </Text>
                    <Text style={styles.instructionsQuote}>
                        “God, what would You have me do today?”
                    </Text>
                </View>

                {/* Timer Length Selection */}
                {!isRunning && (
                    <View style={styles.timerSection}>
                        <Text style={styles.timerLabel}>Timer Length</Text>
                        <View style={styles.timerOptions}>
                            <TouchableOpacity
                                style={[styles.timerOption, selectedTimer === 2 && styles.timerOptionActive]}
                                onPress={() => setSelectedTimer(2)}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.timerOptionText, selectedTimer === 2 && styles.timerOptionTextActive]}>2 min</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.timerOption, selectedTimer === 5 && styles.timerOptionActive]}
                                onPress={() => setSelectedTimer(5)}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.timerOptionText, selectedTimer === 5 && styles.timerOptionTextActive]}>5 min</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.timerOption, selectedTimer === 10 && styles.timerOptionActive]}
                                onPress={() => setSelectedTimer(10)}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.timerOptionText, selectedTimer === 10 && styles.timerOptionTextActive]}>10 min</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Actions */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.beginButton, isRunning && styles.stopButton]}
                        activeOpacity={0.8}
                        onPress={isRunning ? stopSession : startSession}
                    >
                        <Text style={[styles.beginButtonText, isRunning && styles.stopButtonText]}>
                            {isRunning ? 'Stop Timer' : 'Begin Timer'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.skipButton}
                        activeOpacity={0.7}
                        onPress={() => router.push('/morning/big-book/capture')}
                    >
                        <Text style={styles.skipButtonText}>Skip Timer</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            {/* Timer Modal Overlay */}
            <Modal
                transparent={true}
                visible={isRunning}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.timerCircle}>
                        <Text style={styles.countdownText}>{formatTime(timeLeft)}</Text>
                        <Text style={styles.remainingLabel}>Remaining</Text>
                    </View>
                    <TouchableOpacity style={styles.modalStopButton} onPress={stopSession}>
                        <Text style={styles.modalStopText}>Finish Early</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: Platform.OS === 'web' ? 16 : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1c1c1e',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    backArrow: {
        fontFamily: 'Inter_400Regular',
        fontSize: 32,
        color: '#fff',
        marginTop: -4,
    },
    headerTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
    },
    placeholder: {
        width: 44,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    titleSection: {
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 32,
    },
    sectionTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 22,
        color: '#000000',
        lineHeight: 32,
    },
    quoteCard: {
        backgroundColor: '#2c2514',
        marginHorizontal: 24,
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#d1b88a',
        textAlign: 'center',
        lineHeight: 28,
    },
    instructionsSection: {
        paddingHorizontal: 24,
        marginBottom: 48,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#555555',
        letterSpacing: 1.2,
        marginBottom: 16,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
        marginBottom: 4,
    },
    instructionsQuote: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
        fontStyle: 'italic',
    },
    timerSection: {
        alignItems: 'center',
        marginBottom: 48,
    },
    timerLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000',
        marginBottom: 16,
    },
    timerOptions: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 4,
        width: '90%',
    },
    timerOption: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 26,
    },
    timerOptionActive: {
        backgroundColor: '#555555',
    },
    timerOptionText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
    },
    timerOptionTextActive: {
        fontFamily: 'Inter_500Medium',
    },
    actionsContainer: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    beginButton: {
        backgroundColor: '#FFD54F',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    beginButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
    stopButton: {
        backgroundColor: '#ff4444',
    },
    stopButtonText: {
        color: '#000000',
    },
    skipButton: {
        paddingVertical: 8,
    },
    skipButtonText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#888888',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 4,
        borderColor: '#FFD54F',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
    },
    countdownText: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 64,
        color: '#fff',
    },
    remainingLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#888888',
        marginTop: 8,
    },
    modalStopButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#555555',
    },
    modalStopText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#fff',
    },
});
