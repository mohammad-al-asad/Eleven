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

export default function AnchorInWordsScreen() {
    const router = useRouter();
    const [selectedTimer, setSelectedTimer] = useState<TimerOption>(2);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const soundRef = useRef<Audio.Sound | null>(null);

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
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
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    const handleTimerComplete = async () => {
        setIsRunning(false);
        await stopSession();
    };

    async function playAudio() {
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                require('../../../assets/meditation.mp3'),
                { shouldPlay: true, isLooping: true }
            );
            soundRef.current = newSound;
        } catch (error) {
            console.error('Error loading audio:', error);
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

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    return (
        <Container style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => isRunning ? stopSession() : router.back()}
                        activeOpacity={0.7}
                        style={styles.backButton}
                    >
                        <Text style={styles.backArrow}>‹</Text>
                    </TouchableOpacity>
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Anchor in Words</Text>
                    <View style={styles.goldUnderline} />
                </View>

                {/* Subtitle */}
                <View style={styles.subtitleSection}>
                    <Text style={styles.subtitleText}>
                        Today's spiritual reading is from{'\n'}Sample Scripture
                    </Text>
                </View>

                {/* Instructions */}
                <View style={styles.instructionsSection}>
                    <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                    <Text style={styles.instructionsText}>
                        Let the words wash over you. Read aloud. Listen. Absorb. Reflect
                    </Text>
                </View>

                {/* Scripture Card */}
                <View style={styles.scriptureCard}>
                    <Text style={styles.scriptureAnchorLabel}>Today's Spiritual Anchor:</Text>
                    <Text style={styles.scriptureTitle}>Sample Scripture</Text>
                    <Text style={styles.scriptureBody}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt et labore et dolore magna aliquam. Ut enim ad minim veniam, quis nostrud exerc. Irure dolor in reprehend incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse molestiae cilum. Tia non ob ea solued incom deraud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civuda et tam. Neque pecun modut est neque nonor et imper ned libidig met, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt et labore et dolore magna aliquam. Ut enim ad minim veniam, quis nostrud exerc. Irure dolor in reprehend incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse molestiae cilum. Tia non ob ea solued incom deraud facilis est er expedit distinct. Nam liber te conscient to factor tum poen legum odioque civuda et tam. Neque pecun modut est neque nonor et imper ned libidig met,
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

                {/* Action Buttons */}
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
                        onPress={() => router.push('/morning/dr-bob/two-way-receive')}
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 8,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backArrow: {
        fontFamily: 'Inter_400Regular',
        fontSize: 24,
        color: '#000000',
        marginTop: -2,
    },
    titleSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 28,
        color: '#000000',
        marginBottom: 10,
    },
    goldUnderline: {
        height: 4,
        backgroundColor: '#D4A843',
        borderRadius: 2,
        width: '100%',
    },
    subtitleSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
        alignItems: 'center',
    },
    subtitleText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#555555',
        textAlign: 'center',
        lineHeight: 22,
    },
    instructionsSection: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 20,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#555555',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
        lineHeight: 24,
    },
    scriptureCard: {
        backgroundColor: '#1a1a1a',
        marginHorizontal: 24,
        borderRadius: 16,
        padding: 20,
        marginBottom: 32,
    },
    scriptureAnchorLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        color: '#888888',
        marginBottom: 12,
    },
    scriptureTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 24,
        color: '#fff',
        marginBottom: 16,
    },
    scriptureBody: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#cccccc',
        lineHeight: 22,
    },
    timerSection: {
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    timerLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#888888',
        marginBottom: 16,
    },
    timerOptions: {
        flexDirection: 'row',
        backgroundColor: '#1c1c1e',
        borderRadius: 30,
        padding: 4,
        width: '100%',
    },
    timerOption: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        color: '#fff',
        borderRadius: 26,
    },
    timerOptionActive: {
        backgroundColor: '#555555',
    },
    timerOptionText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#fff',
    },
    timerOptionTextActive: {
        fontFamily: 'Inter_500Medium',
    },
    actionsContainer: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    beginButton: {
        backgroundColor: '#E8B931',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 16,
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
        borderColor: '#E8B931',
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
