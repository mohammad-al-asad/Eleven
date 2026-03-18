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
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const QUESTIONS = [
    {
        id: 1,
        text: 'Were We resentful, selfish, dishonest or afraid? Do we owe an apology?',
        placeholder: 'Write Your reflection here.........',
    },
    {
        id: 2,
        text: 'Have we kept something to ourselves which should be discussed with another person at once? Were we kind and loving toward all?',
        placeholder: 'Write your reflection here...',
    },
    {
        id: 3,
        text: 'What could we have done better? Were we thinking of ourselves most of the time, or were we thinking of what we could do for others, of what we could pack into the stream of life?',
        placeholder: 'Write your reflection here...',
    },
];

export default function NightBigBookReviewScreen() {
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
            router.push('/night/big-book/amends');
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
                <Text style={styles.headerTitle}>Inventory Questions</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Constructively Review Your Day</Text>
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

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        "But we must be careful not to drift into worry, remorse or morbid reflection, for that would diminish our usefulness to others."
                    </Text>
                </View>

                {/* Encourage Text */}
                <View style={styles.encourageSection}>
                    <Text style={styles.encourageText}>
                        Let God guide the correction, not self-condemnation.
                    </Text>
                </View>
            </ScrollView>

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
    counterSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 4,
    },
    counterText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        color: '#5a7a9a',
    },
    questionSection: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 16,
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
        minHeight: 100,
        lineHeight: 24,
    },
    quoteCard: {
        backgroundColor: '#f2f2f7',
        marginHorizontal: 24,
        marginTop: 20,
        borderRadius: 16,
        padding: 24,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        color: '#8aaccc',
        textAlign: 'center',
        lineHeight: 24,
    },
    encourageSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    encourageText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
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
        color: '#000000',
    },
});
