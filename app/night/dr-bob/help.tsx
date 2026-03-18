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

export default function NightDrBobHelpScreen() {
    const router = useRouter();
    const [thought, setThought] = useState('');

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

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
                <Text style={styles.headerTitle}>Listen for correction</Text>
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
                        <Text style={styles.title}>What Would You Have Me Do Now, God?</Text>
                        <View style={styles.underline} />
                    </View>

                    {/* First Quote Card */}
                    <View style={styles.quoteCard}>
                        <Text style={styles.quoteText}>
                            "We ask God's forgiveness and inquire what corrective measures should be taken."
                        </Text>
                    </View>

                    {/* Central Question Card */}
                    <View style={styles.questionCard}>
                        <Text style={styles.questionText}>"God, what would You have me do?"</Text>
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionsSection}>
                        <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                        <Text style={styles.instructionsText}>Ask quietly, then respond below.</Text>
                    </View>

                    {/* Input Section */}
                    <View style={styles.inputSection}>
                        <Text style={styles.inputTitle}>Tomorrow I will...</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your guidance and next steps"
                            placeholderTextColor="#555555"
                            value={thought}
                            onChangeText={setThought}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Tip Section */}
                    <View style={styles.tipSection}>
                        <Text style={styles.tipText}>Tip: If you're unsure, just write what's on your heart.</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => router.push('/night/dr-bob/guidance')}
                    activeOpacity={0.8}
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
        fontFamily: 'Inter_4Regular', // Using standard text for these specific styles if possible, else 700
        fontSize: 22,
        color: '#000000',
        marginBottom: 10,
        lineHeight: 30,
    },
    underline: {
        height: 4,
        backgroundColor: '#1a2530',
        borderRadius: 2,
        width: '100%',
    },
    quoteCard: {
        backgroundColor: '#f2f2f7',
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
    questionCard: {
        backgroundColor: '#f2f2f7',
        marginHorizontal: 24,
        marginTop: 20,
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    questionText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
    },
    instructionsSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 4,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        color: '#555555',
        letterSpacing: 1,
        marginBottom: 12,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
    },
    inputSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
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
        minHeight: 140,
        lineHeight: 24,
    },
    tipSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
        alignItems: 'center',
    },
    tipText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: '#888888',
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
    },
    continueButton: {
        backgroundColor: '#1a2530',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a3a4a',
    },
    continueButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
});
