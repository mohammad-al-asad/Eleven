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

export default function MiddayActScreen() {
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
                <Text style={styles.headerTitle}>Next Right Action</Text>
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
                        <Text style={styles.title}>Into Action. Faith Without Works Is Dead</Text>
                        <View style={styles.blueUnderline} />
                    </View>

                    {/* Quote Card */}
                    <View style={styles.quoteCard}>
                        <Text style={styles.quoteText}>
                            "We are in the world to play the role He assigns. Just to the extent that we do as we think He would have us... does He enable us to match calamity with serenity."
                        </Text>
                    </View>

                    {/* Input Section */}
                    <View style={styles.inputSection}>
                        <Text style={styles.inputTitle}>Today, I will....</Text>
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
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Continue Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => router.push('/midday/big-book/closing-prayer')}
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
        fontSize: 26,
        color: '#000000',
        marginBottom: 10,
        lineHeight: 36,
    },
    blueUnderline: {
        height: 4,
        backgroundColor: '#94CDFA',
        borderRadius: 2,
        width: '100%',
    },
    quoteCard: {
        backgroundColor: '#1a2a3a',
        marginHorizontal: 24,
        marginTop: 24,
        borderRadius: 16,
        padding: 24,
        marginBottom: 40,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#94CDFA',
        textAlign: 'center',
        lineHeight: 26,
    },
    inputSection: {
        paddingHorizontal: 24,
    },
    inputTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: '#000000',
        marginBottom: 12,
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
    continueButton: {
        backgroundColor: '#94CDFA',
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
