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

export default function NightBigBookScreen() {
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useState(2);
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const soundRef = useRef<Audio.Sound | null>(null);

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const timerOptions = [2, 5, 10];

    async function playAudio() {
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                require('../../../assets/meditation.mp3'),
                { shouldPlay: true, isLooping: true }
            );
            soundRef.current = newSound;
        } catch (error) {
            console.error('Error loading audio:', error);
        }
    }

    async function stopAudio() {
        if (soundRef.current) {
            try {
                await soundRef.current.stopAsync();
                await soundRef.current.unloadAsync();
            } catch (e) {
                console.log('Error stopping audio:', e);
            }
            soundRef.current = null;
        }
    }

    const startTimer = async () => {
        setTimeLeft(selectedTime * 60);
        setTimerActive(true);
        await playAudio();
    };

    useEffect(() => {
        if (timerActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current!);
                        setTimerActive(false);
                        stopAudio();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [timerActive]);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

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
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        style={styles.backButton}
                    >
                        <Text style={styles.backArrow}>‹</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Settle In</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Retire with Evening Review</Text>
                    <View style={styles.underline} />
                </View>

                {/* First Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        "When we retire at night, we constructively review our day"
                    </Text>
                </View>

                {/* Instructions Card */}
                <View style={styles.instructionsCard}>
                    <Text style={styles.instructionsText}>
                        "This isn't about shame. It's a spiritual conversation.{'\n'}Ask God to help you look at the day with honesty, humility, and clarity.
                    </Text>
                    <Text style={[styles.instructionsText, { marginTop: 20 }]}>
                        "Take a deep breath. Be still. Let the day come into focus."
                    </Text>
                </View>

                {/* Timer Section */}
                <View style={styles.timerSection}>
                    <Text style={styles.timerLabel}>Timer:</Text>
                    <View style={styles.timerOptions}>
                        {timerOptions.map((min) => (
                            <TouchableOpacity
                                key={min}
                                style={[
                                    styles.timerOption,
                                    selectedTime === min && styles.timerOptionSelected,
                                ]}
                                onPress={() => setSelectedTime(min)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.timerOptionText,
                                        selectedTime === min && styles.timerOptionTextSelected,
                                    ]}
                                >
                                    {min} min
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.beginButton}
                    onPress={startTimer}
                    activeOpacity={0.8}
                >
                    <Text style={styles.beginButtonText}>Begin Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => router.push('/night/big-book/review')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.skipButtonText}>Skip Timer</Text>
                </TouchableOpacity>
            </View>

            {/* Timer Modal */}
            <Modal visible={timerActive} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Evening Stillness</Text>
                        <Text style={styles.modalTimer}>{formatTime(timeLeft)}</Text>
                        <Text style={styles.modalSubtext}>
                            Be still. Let the day come into focus.
                        </Text>
                        <TouchableOpacity
                            style={styles.modalStopButton}
                            onPress={async () => {
                                setTimerActive(false);
                                if (intervalRef.current) clearInterval(intervalRef.current);
                                await stopAudio();
                            }}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.modalStopText}>End Timer</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    headerTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: '#000000',
    },
    placeholder: {
        width: 36,
    },
    titleSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 24,
        color: '#000000',
        marginBottom: 10,
        lineHeight: 32,
    },
    underline: {
        height: 4,
        backgroundColor: '#5a7a9a',
        borderRadius: 2,
        width: '100%',
    },
    quoteCard: {
        backgroundColor: '#1a2530',
        marginHorizontal: 24,
        marginTop: 28,
        borderRadius: 16,
        padding: 24,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#8aaccc',
        textAlign: 'center',
        lineHeight: 26,
    },
    instructionsCard: {
        backgroundColor: '#f2f2f7',
        marginHorizontal: 24,
        marginTop: 20,
        borderRadius: 16,
        padding: 24,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#a0b8d0',
        textAlign: 'center',
        lineHeight: 26,
    },
    timerSection: {
        paddingHorizontal: 24,
        paddingTop: 28,
        alignItems: 'center',
    },
    timerLabel: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#888888',
        marginBottom: 12,
    },
    timerOptions: {
        flexDirection: 'row',
        gap: 8,
    },
    timerOption: {
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#f2f2f7',
    },
    timerOptionSelected: {
        backgroundColor: '#1a2530',
        borderWidth: 1,
        borderColor: '#5a7a9a',
    },
    timerOptionText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        color: '#888888',
    },
    timerOptionTextSelected: {
        color: '#8aaccc',
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
        gap: 12,
    },
    beginButton: {
        backgroundColor: '#1a2530',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a3a4a',
    },
    beginButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#fff',
    },
    skipButton: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    skipButtonText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#888888',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    modalTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 22,
        color: '#8aaccc',
        marginBottom: 24,
    },
    modalTimer: {
        fontFamily: 'Inter_700Bold',
        fontSize: 72,
        color: '#fff',
        marginBottom: 16,
    },
    modalSubtext: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#888888',
        marginBottom: 40,
    },
    modalStopButton: {
        backgroundColor: '#1a2530',
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#2a3a4a',
    },
    modalStopText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: '#fff',
    },
});
