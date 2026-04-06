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

export default function MiddayDrBobWriteScreen() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        if (option === 'app') {
            router.push('/midday/dr-bob/write-in-app');
        } else if (option === 'paper') {
            router.push('/midday/dr-bob/test');
        } else {
            router.push('/midday/dr-bob/test');
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
                <Text style={styles.headerTitle}>The Guidance</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>What Come Up?</Text>
                    <View style={styles.blueUnderline} />
                </View>

                {/* Instructions */}
                <View style={styles.instructionsSection}>
                    <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                    <Text style={styles.instructionsText}>
                        Did anything come? A word? A feeling?{'\n'}A phrase?
                    </Text>
                </View>

                <View style={styles.encourageSection}>
                    <Text style={styles.encourageText}>
                        Even if it feels silly or small, Write it down.{'\n'}if nothing come, that's okay too.
                    </Text>
                </View>

                {/* Capture Question */}
                <View style={styles.captureQuestion}>
                    <Text style={styles.captureQuestionText}>
                        How would you like to Capture{'\n'}your thoughts?
                    </Text>
                </View>

                {/* Options */}
                <View style={styles.optionsSection}>
                    <TouchableOpacity
                        style={styles.optionRow}
                        activeOpacity={0.7}
                        onPress={() => handleOptionSelect('app')}
                    >
                        <View style={[styles.radioCircle, selectedOption === 'app' && styles.radioSelected]}>
                            {selectedOption === 'app' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>Write in the app</Text>
                            <Text style={styles.optionDescription}>Write your journal entries here in the app</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionRow}
                        activeOpacity={0.7}
                    // onPress={() => handleOptionSelect('paper')}
                    >
                        <View style={[styles.radioCircle, selectedOption === 'paper' && styles.radioSelected]}>
                            {selectedOption === 'paper' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>Write on paper</Text>
                            <Text style={styles.optionDescription}>Jot down your inspiration on paper and reflect on it later.</Text>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={styles.optionRow}
                        activeOpacity={0.7}
                    onPress={() => handleOptionSelect('remember')}
                    >
                        <View style={[styles.radioCircle, selectedOption === 'remember' && styles.radioSelected]}>
                            {selectedOption === 'remember' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>I will just remember</Text>
                            <Text style={styles.optionDescription}>Keep your reflections in your head.</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
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
        paddingBottom: 40,
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
    instructionsSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 4,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#555555',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
    },
    encourageSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 8,
    },
    encourageText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
    },
    captureQuestion: {
        paddingHorizontal: 24,
        paddingTop: 28,
        paddingBottom: 28,
        alignItems: 'center',
    },
    captureQuestionText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 28,
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
    radioCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#555555',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    radioSelected: {
        borderColor: '#94CDFA',
    },
    radioInner: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#94CDFA',
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
    optionDescription: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#888888',
        lineHeight: 20,
    },
});
