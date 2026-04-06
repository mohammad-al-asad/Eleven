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

export default function NightBigBookAmendsScreen() {
    const router = useRouter();
    const [plan, setPlan] = useState('');

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
                <Text style={styles.headerTitle}>Ask for correction</Text>
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
                        <Text style={styles.title}>
                            Let God guide the correction, Ask God for Guidance and Forgiveness
                        </Text>
                        <View style={styles.underline} />
                    </View>

                    {/* Quote Card */}
                    <View style={styles.quoteCard}>
                        <Text style={styles.quoteText}>
                            "We ask God's forgiveness and inquire what corrective measures should be taken."
                        </Text>
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionsSection}>
                        <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                        <Text style={styles.instructionsText}>
                            Quietly pray: "God, show me where I fell short and what I need to do differently."
                        </Text>
                    </View>

                    <View style={styles.guidanceSection}>
                        <Text style={styles.guidanceText}>
                            Then jot down any guidance or next steps that come to heart.
                        </Text>
                    </View>

                    {/* Input Section */}
                    <View style={styles.inputSection}>
                        <Text style={styles.inputTitle}>Tomorrow, I will......</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your Guidance and next steps"
                            placeholderTextColor="#555555"
                            value={plan}
                            onChangeText={setPlan}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Continue Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => router.push('/night/big-book/closing-prayer')}
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
        fontFamily: 'Inter_700Bold',
        fontSize: 24,
        color: '#000000',
        marginBottom: 10,
        lineHeight: 34,
    },
    underline: {
        height: 4,
        backgroundColor: '#5a7a9a',
        borderRadius: 2,
        width: '100%',
    },
    quoteCard: {
        backgroundColor: '#1a2530',
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
    instructionsSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
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
        fontSize: 16,
        color: '#888888',
        lineHeight: 24,
    },
    guidanceSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    guidanceText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#888888',
        lineHeight: 24,
    },
    inputSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    inputTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: '#8aaccc',
        marginBottom: 12,
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
        color: '#fff',
    },
});
