import { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

type CaptureOption = 'app' | 'paper' | 'remember';

export default function CaptureInspirationScreen() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<CaptureOption | null>(null);

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const options = [
        {
            id: 'app' as CaptureOption,
            title: 'Write in the app',
            subtitle: 'Write your journal entries here in the app',
        },
        {
            id: 'paper' as CaptureOption,
            title: 'Write on paper',
            subtitle: 'Jot down your inspiration on paper and reflect on it later.',
        },
        {
            id: 'remember' as CaptureOption,
            title: 'I will just remember',
            subtitle: 'Keep your reflections in your head.',
        },
    ];

    const handleContinue = () => {
        if (selectedOption === 'app') {
            router.push('/morning/big-book/write');
        } else {
            router.push('/morning/big-book/plan-the-day');
        }
    };

    return (
        <Container style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
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
                {/* Sub-header with yellow bar */}
                <View style={styles.subHeaderSection}>
                    <Text style={styles.subHeaderTitle}>
                        Ask For Inspiration. Relax.{'\n'}Don’t Struggle
                    </Text>
                    <View style={styles.yellowBar} />
                </View>

                {/* Main Question */}
                <Text style={styles.questionText}>
                    How would you like to capture{'\n'}your inspiration?
                </Text>

                {/* Options List */}
                <View style={styles.optionsContainer}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={styles.optionRow}
                            onPress={() => setSelectedOption(option.id)}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.radioButton,
                                selectedOption === option.id && styles.radioButtonSelected
                            ]}>
                                {selectedOption === option.id && <View style={styles.radioInner} />}
                            </View>
                            <View style={styles.optionTextContent}>
                                <Text style={styles.optionTitle}>{option.title}</Text>
                                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        “Being still inexperienced... it is not probable that we are going to be inspired at all times”
                    </Text>
                </View>

                {/* Hidden Continue Button (Conditional) */}
                {selectedOption && (
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleContinue}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
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
    subHeaderSection: {
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 40,
    },
    subHeaderTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 22,
        color: '#000000',
        lineHeight: 32,
        marginBottom: 12,
    },
    yellowBar: {
        height: 4,
        backgroundColor: '#FFD54F',
        width: 100, // Matching the screenshot's length relative to screen
        borderRadius: 2,
    },
    questionText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 24,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 34,
        marginBottom: 48,
    },
    optionsContainer: {
        paddingHorizontal: 24,
        marginBottom: 40,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 32,
    },
    radioButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#555555',
        marginRight: 16,
        marginTop: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        borderColor: '#FFD54F',
    },
    radioInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#FFD54F',
    },
    optionTextContent: {
        flex: 1,
    },
    optionTitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 20,
        color: '#000000',
        marginBottom: 4,
    },
    optionSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
    quoteCard: {
        backgroundColor: '#2c2514',
        marginHorizontal: 24,
        borderRadius: 16,
        padding: 30,
        marginTop: 10,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#d1b88a',
        textAlign: 'center',
        lineHeight: 26,
    },
    continueButton: {
        backgroundColor: '#FFD54F',
        marginHorizontal: 24,
        marginTop: 40,
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
