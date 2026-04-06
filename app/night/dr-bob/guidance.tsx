import { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../../context/AppContext';

export default function NightDrBobGuidanceScreen() {
    const router = useRouter();
    const { addJournalEntry } = useAppContext();
    const [thought, setThought] = useState('');

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const handleFinish = () => {
        if (thought.trim()) {
            addJournalEntry({
                title: 'Night Dr. Bob Gratitude',
                preview: thought.substring(0, 100),
                content: thought,
                type: 'night',
            });
        }
        router.push('/finish');
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
                <Text style={styles.headerTitle}>Gratitude + Surrender</Text>
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
                        <Text style={styles.title}>End in Thanks, Not Shame</Text>
                        <View style={styles.underline} />
                    </View>

                    {/* Intro Text */}
                    <View style={styles.introSection}>
                        <Text style={styles.introText}>
                            Dr. Bob's review always ended with gratitude and grace:
                        </Text>
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionsSection}>
                        <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                        <Text style={styles.instructionsText}>Tonight, whisper this or read it aloud</Text>
                    </View>

                    {/* Prayer Block */}
                    <View style={styles.prayerBlock}>
                        <Text style={styles.prayerHeading}>Thank You, God,</Text>
                        <Text style={styles.prayerBody}>
                            For walking with me today.
                            {"\n\n"}
                            For my sobriety.
                            {"\n\n"}
                            For the grace to grow.
                        </Text>
                    </View>

                    {/* Input Section */}
                    <View style={styles.inputSection}>
                        <Text style={styles.inputTitle}>I am grateful for</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Today, I thank God for..."
                            placeholderTextColor="#555555"
                            value={thought}
                            onChangeText={setThought}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Closing Affirmation */}
                    <View style={styles.closingSection}>
                        <Text style={styles.closingText}>
                            Your will --- not mine be -- done tomorrow.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Finish Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.finishButton}
                    onPress={handleFinish}
                    activeOpacity={0.8}
                >
                    <Text style={styles.finishButtonText}>Finish</Text>
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
        fontSize: 22,
        color: '#000000',
        marginBottom: 10,
    },
    underline: {
        height: 4,
        backgroundColor: '#1a2530',
        borderRadius: 2,
        width: '100%',
    },
    introSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 8,
    },
    introText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 24,
    },
    instructionsSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 4,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        color: '#555555',
        letterSpacing: 1,
        marginBottom: 10,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
    },
    prayerBlock: {
        backgroundColor: '#f2f2f7',
        paddingHorizontal: 32,
        paddingVertical: 40,
        marginTop: 24,
    },
    prayerHeading: {
        fontFamily: 'Inter_400Regular',
        fontSize: 24,
        color: '#000000',
        marginBottom: 32,
    },
    prayerBody: {
        fontFamily: 'Inter_400Regular',
        fontSize: 24,
        color: '#000000',
        lineHeight: 32,
    },
    inputSection: {
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    inputTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: '#000000',
        marginBottom: 12,
    },
    textInput: {
        backgroundColor: '#f2f2f7',
        borderRadius: 16,
        padding: 24,
        color: '#000000',
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        minHeight: 120,
        lineHeight: 24,
    },
    closingSection: {
        paddingHorizontal: 40,
        paddingTop: 32,
        paddingBottom: 16,
    },
    closingText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 28,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
    },
    finishButton: {
        backgroundColor: '#1a2530',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a3a4a',
    },
    finishButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#fff',
    },
});
