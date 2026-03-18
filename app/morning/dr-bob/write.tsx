import { useState, useEffect } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../../context/AppContext';

export default function DrBobWriteInAppScreen() {
    const router = useRouter();
    const { addJournalEntry } = useAppContext();
    const [note, setNote] = useState('');
    const [timeLeft, setTimeLeft] = useState(1200);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const handleSave = () => {
        if (note.trim().length === 0) {
            if (Platform.OS === 'web') {
                alert('Please write something before saving.');
            } else {
                Alert.alert('Empty Note', 'Please write something before saving.');
            }
            return;
        }

        addJournalEntry({
            title: 'Dr. Bob – Two-Way Prayer',
            preview: note.substring(0, 100) + (note.length > 100 ? '...' : ''),
            content: note,
            type: 'morning',
        });

        router.push('/morning/dr-bob/test');
    };

    // Initialize Speech Recognition
    useEffect(() => {
        if (Platform.OS === 'web' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognitionInstance = new SpeechRecognition();

            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onresult = (event: any) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    setNote(prev => prev + (prev.length > 0 ? ' ' : '') + finalTranscript);
                }
            };

            recognitionInstance.onend = () => setIsListening(false);
            recognitionInstance.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
        }
    }, []);

    const toggleListening = () => {
        if (!recognition) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }
        if (isListening) {
            recognition.stop();
        } else {
            try {
                recognition.start();
                setIsListening(true);
            } catch (error) {
                console.error('Failed to start recognition:', error);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    return (
        <Container style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    style={styles.closeButton}
                >
                    <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Dr. Bob – Write</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={[styles.actionButton, isListening && styles.actionButtonActive]}
                        onPress={toggleListening}
                    >
                        <Text style={[styles.actionIcon, isListening && styles.actionIconActive]}>🎤</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleSave}
                        activeOpacity={0.7}
                    >
                        <View style={styles.checkCircle}>
                            <Text style={styles.checkIcon}>✓</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Intro Text */}
                    <View style={styles.textSection}>
                        <Text style={styles.mainTitle}>
                            Your Quiet Time is sacred. If you still feel inspired, take your time and keep writing.
                        </Text>
                        <Text style={styles.subTitle}>
                            When you're ready, we'll move on to test what came through.
                        </Text>
                    </View>

                    {/* Timer */}
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                    </View>

                    {/* Input Area */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            placeholderTextColor="#fff"
                            value={note}
                            onChangeText={setNote}
                            multiline
                            autoFocus
                            textAlignVertical="top"
                            selectionColor="#D4A843"
                        />
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => router.push('/morning/dr-bob/test')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
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
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    closeButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1c1c1e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        fontSize: 20,
        color: '#D4A843',
    },
    headerTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1c1c1e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonActive: {
        backgroundColor: '#D4A843',
    },
    actionIcon: {
        fontSize: 20,
        color: '#D4A843',
    },
    actionIconActive: {
        color: '#000000',
    },
    checkCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#3a3a3e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIcon: {
        fontSize: 20,
        color: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    textSection: {
        marginBottom: 32,
    },
    mainTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
        marginBottom: 16,
    },
    subTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#666666',
        lineHeight: 24,
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    timerText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        color: '#D4A843',
    },
    inputContainer: {
        backgroundColor: '#161618',
        borderRadius: 24,
        padding: 24,
        minHeight: 300,
        marginBottom: 40,
    },
    textInput: {
        flex: 1,
        color: '#fff',
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        lineHeight: 28,
    },
    continueButton: {
        backgroundColor: '#E8B931',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
    },
    continueButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
});
