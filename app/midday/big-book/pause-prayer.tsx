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

export default function PausePrayerScreen() {
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

    // Cleanup audio on unmount
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
                    <Text style={styles.headerTitle}>Mid- Day Prayer</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Thy Will Be Done</Text>
                    <View style={styles.blueUnderline} />
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        "We constantly remind ourselves we are no longer running the show. Humbly saying to ourselves many times each day, thy will be done."
                    </Text>
                </View>

                {/* Mid-Day Prayer Label */}
                <View style={styles.prayerLabelSection}>
                    <Text style={styles.prayerLabel}>Mid-Day prayer</Text>
                </View>

                {/* Prayer Block */}
                <View style={styles.prayerBlock}>
                    <Text style={styles.prayerText}>
                        God, i am no longer running the show. Thy will- not mine - be done.
                    </Text>
                    <Text style={[styles.prayerText, { marginTop: 16 }]}>
                        What would you have me be right now?
                    </Text>
                </View>

                {/* Timer Section */}
                <View style={styles.timerSection}>
                    <Text style={styles.timerLabel}>Optional timer:</Text>
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
                    style={styles.startButton}
                    onPress={startTimer}
                    activeOpacity={0.8}
                >
                    <Text style={styles.startButtonText}>Start Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => router.push('/midday/big-book/midday-capture')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.skipButtonText}>Skip Timer</Text>
                </TouchableOpacity>
            </View>

            {/* Timer Modal */}
            <Modal visible={timerActive} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Mid-Day Prayer</Text>
                        <Text style={styles.modalTimer}>{formatTime(timeLeft)}</Text>
                        <Text style={styles.modalSubtext}>
                            Pause. Breathe. Surrender.
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
        fontSize: 26,
        color: '#000000',
        marginBottom: 10,
    },
    blueUnderline: {
        height: 4,
        backgroundColor: '#94CDFA',
        borderRadius: 2,
        width: '100%',
    },
    quoteCard: {
        backgroundColor: '#1a2a3a',
        marginHorizontal: 24,
        marginTop: 24,
        borderRadius: 16,
        padding: 24,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#94CDFA',
        textAlign: 'center',
        lineHeight: 26,
    },
    prayerLabelSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        alignItems: 'center',
    },
    prayerLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#888888',
    },
    prayerBlock: {
        backgroundColor: '#f2f2f7',
        marginTop: 12,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    prayerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 28,
        color: '#000000',
        lineHeight: 44,
    },
    timerSection: {
        paddingHorizontal: 24,
        paddingTop: 28,
        alignItems: 'center',
    },
    timerLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#888888',
        marginBottom: 12,
    },
    timerOptions: {
        flexDirection: 'row',
        gap: 8,
    },
    timerOption: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#f2f2f7',
    },
    timerOptionSelected: {
        backgroundColor: '#1a2a3a',
        borderWidth: 1,
        borderColor: '#94CDFA',
    },
    timerOptionText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        color: '#888888',
    },
    timerOptionTextSelected: {
        color: '#94CDFA',
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
        gap: 12,
    },
    startButton: {
        backgroundColor: '#94CDFA',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
    },
    startButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
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
        color: '#94CDFA',
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
        backgroundColor: '#94CDFA',
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 30,
    },
    modalStopText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: '#000000',
    },
});
