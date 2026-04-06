import { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

type CaptureOption = 'app' | 'paper' | null;

export default function TwoWayReceiveScreen() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<CaptureOption>(null);

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const handleContinue = () => {
        if (selectedOption === 'app') {
            router.push('/morning/dr-bob/write');
        } else if (selectedOption === 'paper') {
            router.push('/morning/big-book/check-guidance');
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
                <Text style={styles.headerTitle}>Two-Way, Receive</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Title Section */}
            <View style={styles.titleSection}>
                <Text style={styles.title}>Ask, Listen, Receive</Text>
                <View style={styles.goldUnderline} />
            </View>

            {/* Quote Card */}
            <View style={styles.quoteCard}>
                <Text style={styles.quoteText}>
                    "We believe when a man listens, God speaks- often in gentle thoughts, nudges, or images."
                </Text>
            </View>

            {/* Question */}
            <View style={styles.questionSection}>
                <Text style={styles.questionText}>
                    How would you like to capture your thoughts?
                </Text>
            </View>

            {/* Options */}
            <View style={styles.optionsSection}>
                <TouchableOpacity
                    style={styles.optionRow}
                    activeOpacity={0.7}
                    onPress={() => setSelectedOption('app')}
                >
                    <View style={[styles.radioOuter, selectedOption === 'app' && styles.radioOuterSelected]}>
                        {selectedOption === 'app' && <View style={styles.radioInner} />}
                    </View>
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>Write in the app</Text>
                        <Text style={styles.optionSubtitle}>Write your journal entries here in the app</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionRow}
                    activeOpacity={0.7}
                    onPress={() => setSelectedOption('paper')}
                >
                    <View style={[styles.radioOuter, selectedOption === 'paper' && styles.radioOuterSelected]}>
                        {selectedOption === 'paper' && <View style={styles.radioInner} />}
                    </View>
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>Write on paper</Text>
                        <Text style={styles.optionSubtitle}>Jot down your inspiration on paper and reflect on it later.</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Continue Button */}
            {selectedOption && (
                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        style={styles.continueButton}
                        activeOpacity={0.8}
                        onPress={handleContinue}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    quoteCard: {
        backgroundColor: '#2C2208',
        marginHorizontal: 24,
        marginTop: 24,
        borderRadius: 16,
        padding: 24,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#D4A843',
        textAlign: 'center',
        lineHeight: 26,
    },
    questionSection: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 24,
    },
    questionText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 30,
    },
    optionsSection: {
        paddingHorizontal: 24,
        gap: 20,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },
    radioOuter: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#555555',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    radioOuterSelected: {
        borderColor: '#E8B931',
    },
    radioInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#E8B931',
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: '#000000',
        marginBottom: 4,
    },
    optionSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#888888',
        lineHeight: 20,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    continueButton: {
        backgroundColor: '#E8B931',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
});
