import { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const QUESTIONS = [
    {
        id: 1,
        text: 'Was I resentful today?',
        placeholder: 'Write Your reflection here.........',
    },
    {
        id: 2,
        text: 'Was I selfish or self-seeking?',
        placeholder: 'Write Your reflection here.........',
    },
    {
        id: 3,
        text: 'Was I dishonest or hiding in any way?',
        placeholder: 'Write Your reflection here.........',
    },
    {
        id: 4,
        text: 'Did I act in fear rather than faith?',
        placeholder: 'Write Your reflection here.........',
    },
    {
        id: 5,
        text: 'Is an amends needed to anyone I was not kind or loving to today?',
        placeholder: 'Write Your reflection here.........',
    },
    {
        id: 6,
        text: 'What could I have done better today?',
        placeholder: 'Write Your reflection here.........',
    },
    {
        id: 7,
        text: 'Was I thinking of myself most of the time, or was I thinking of what I could do for others, of what we could pack into the stream of life?',
        placeholder: 'Write Your reflection here.........',
    },
];

export default function NightDrBobReviewScreen() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ toggle: boolean; text: string }[]>(
        QUESTIONS.map(() => ({ toggle: false, text: '' }))
    );

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const question = QUESTIONS[currentQuestion];

    const updateAnswer = (field: 'toggle' | 'text', value: boolean | string) => {
        setAnswers(prev => {
            const updated = [...prev];
            if (field === 'toggle') {
                updated[currentQuestion] = { ...updated[currentQuestion], toggle: value as boolean };
            } else {
                updated[currentQuestion] = { ...updated[currentQuestion], text: value as string };
            }
            return updated;
        });
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            router.push('/night/dr-bob/help');
        }
    };

    return (
        <Container style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        if (currentQuestion > 0) {
                            setCurrentQuestion(currentQuestion - 1);
                        } else {
                            router.back();
                        }
                    }}
                    activeOpacity={0.7}
                    style={styles.backButton}
                >
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Inventory of the Day</Text>
                <View style={styles.placeholder} />
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
                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>Let’s reflect on the day - one question at a time.</Text>
                        <View style={styles.underline} />
                    </View>

                    {/* Question Counter */}
                    <View style={styles.counterSection}>
                        <Text style={styles.counterText}>
                            Question {currentQuestion + 1} of {QUESTIONS.length}
                        </Text>
                    </View>

                    {/* Question Text */}
                    <View style={styles.questionSection}>
                        <Text style={styles.questionText}>{question.text}</Text>
                    </View>

                    {/* Yes Toggle */}
                    <View style={styles.toggleSection}>
                        <Text style={styles.toggleLabel}>Yes</Text>
                        <Switch
                            value={answers[currentQuestion].toggle}
                            onValueChange={(val) => updateAnswer('toggle', val)}
                            trackColor={{ false: '#3a3a3e', true: '#5a7a9a' }}
                            thumbColor={answers[currentQuestion].toggle ? '#ffffff' : '#888888'}
                        />
                    </View>

                    {/* Text Input */}
                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={question.placeholder}
                            placeholderTextColor="#555555"
                            value={answers[currentQuestion].text}
                            onChangeText={(val) => updateAnswer('text', val)}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Next Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                    activeOpacity={0.8}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    titleSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontFamily: 'Inter_400Regular',
        fontSize: 20,
        color: '#000000',
        marginBottom: 10,
        lineHeight: 28,
    },
    underline: {
        height: 4,
        backgroundColor: '#1a2530',
        borderRadius: 2,
        width: '100%',
    },
    counterSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 16,
    },
    counterText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        color: '#888888',
        letterSpacing: 0.5,
    },
    questionSection: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    questionText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 20,
        color: '#000000',
        lineHeight: 30,
    },
    toggleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 12,
        marginBottom: 8,
    },
    toggleLabel: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#000000',
    },
    inputSection: {
        paddingHorizontal: 24,
        paddingTop: 12,
    },
    textInput: {
        backgroundColor: '#f2f2f7',
        borderRadius: 16,
        padding: 20,
        color: '#000000',
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        minHeight: 120,
        lineHeight: 24,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
    },
    nextButton: {
        backgroundColor: '#1a2530',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a3a4a',
    },
    nextButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#fff',
    },
});
