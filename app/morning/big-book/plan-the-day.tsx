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

export default function PlanTheDayScreen() {
    const router = useRouter();
    const [plan, setPlan] = useState('');
    const [personOrTask, setPersonOrTask] = useState('');

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
                <Text style={styles.headerTitle}>Plan the day</Text>
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
                    {/* Sub-header with yellow bar */}
                    <View style={styles.subHeaderSection}>
                        <Text style={styles.subHeaderTitle}>
                            Plan the Day. Then Stet into it.
                        </Text>
                        <View style={styles.yellowBar} />
                    </View>

                    {/* Quote Card */}
                    <View style={styles.quoteCard}>
                        <Text style={styles.quoteText}>“We consider our plans for the day...”</Text>
                        <Text style={styles.quoteText}>“We ask God to direct our thinking... Show me the next step.”</Text>
                        <Text style={styles.quoteText}>“What can we do for the man who is still sick?”</Text>
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionsSection}>
                        <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                        <Text style={styles.instructionsText}>
                            You've prayed and listened. Now, ask to be of service. This is where faith becomes action.
                        </Text>
                    </View>

                    {/* Prayer / Commitment Texts */}
                    <View style={styles.prayerSection}>
                        <Text style={styles.prayerText}>
                            Help me be patient, tolerant, kind, and loving to all I meet — especially my family.
                        </Text>
                        <Text style={[styles.prayerText, { marginTop: 24 }]}>
                            What can I do today for the man who is still sick?
                        </Text>
                    </View>

                    {/* Input Fields */}
                    <View style={styles.inputsSection}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Today, I will...</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter your plan for today"
                                placeholderTextColor="#555555"
                                value={plan}
                                onChangeText={setPlan}
                                multiline
                                textAlignVertical="top"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>One person or task God brought to mind today..</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter a person or task"
                                placeholderTextColor="#555555"
                                value={personOrTask}
                                onChangeText={setPersonOrTask}
                                multiline
                                textAlignVertical="top"
                            />
                        </View>
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => router.push('/morning/big-book/check-guidance')}
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
        color: '#000000',
        marginTop: -4,
    },
    headerTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 22,
        color: '#000000',
    },
    placeholder: {
        width: 44,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    subHeaderSection: {
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 32,
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
        width: '60%',
        borderRadius: 2,
    },
    quoteCard: {
        backgroundColor: '#2c2514',
        marginHorizontal: 24,
        borderRadius: 24,
        padding: 30,
        marginBottom: 40,
        gap: 20,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#d1b88a',
        textAlign: 'center',
        lineHeight: 24,
    },
    instructionsSection: {
        paddingHorizontal: 24,
        marginBottom: 40,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#555555',
        letterSpacing: 1.2,
        marginBottom: 12,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
        lineHeight: 24,
    },
    prayerSection: {
        paddingHorizontal: 24,
        marginBottom: 48,
        alignItems: 'center',
    },
    prayerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 28,
    },
    inputsSection: {
        paddingHorizontal: 24,
        marginBottom: 40,
    },
    inputGroup: {
        marginBottom: 32,
    },
    inputLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
        marginBottom: 16,
    },
    textInput: {
        backgroundColor: '#1c1c1e',
        borderRadius: 16,
        padding: 20,
        color: '#000000',
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        minHeight: 120,
    },
    continueButton: {
        backgroundColor: '#FFD54F',
        marginHorizontal: 24,
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
