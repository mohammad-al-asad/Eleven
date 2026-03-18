import { useState, useEffect, useRef } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';


export default function BeStillScreen() {
    const router = useRouter();
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const soundRef = useRef<Audio.Sound | null>(null);

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

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
                <Text style={styles.title}>Be Still. Breathe. Invite God.</Text>
                <View style={styles.goldUnderline} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                <Text style={styles.instructionsText}>
                    As you enter prayer, pause to be still. Breathe. Take it easy. Tune into the presence of God. God cannot get through to us if we are tense or anxious about later responsibilities. Let's have a moment of silence followed by the serenity prayer.
                </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    activeOpacity={0.8}
                    onPress={() => router.push('/morning/dr-bob/serenity-prayer')}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 26,
        color: '#000000',
        marginBottom: 10,
    },
    goldUnderline: {
        height: 4,
        backgroundColor: '#D4A843',
        borderRadius: 2,
        width: '100%',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#555555',
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 17,
        color: '#000000',
        lineHeight: 28,
    },
    timerSection: {
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
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
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
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
    continueButton: {
        backgroundColor: '#E8B931',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 12,
    },
    continueButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
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
        color: '#000000',
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
        color: '#000000',
    },
});
