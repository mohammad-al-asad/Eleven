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

export default function CheckGuidanceScreen() {
    const router = useRouter();
    const [selections, setSelections] = useState({
        selfish: false,
        dishonest: false,
        fearDriven: false,
        selfCentered: false,
    });

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const toggleSelection = (key: keyof typeof selections) => {
        setSelections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const checkItems = [
        { id: 'selfish', label: 'Is this selfish?' },
        { id: 'dishonest', label: 'Is this dishonest?' },
        { id: 'fearDriven', label: 'Is this fear-driven?' },
        { id: 'selfCentered', label: 'Is this self-centered?' },
    ];

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
                <Text style={styles.headerTitle}>Check guidance</Text>
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
                        Trust but test
                    </Text>
                    <View style={styles.yellowBar} />
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        “I was to test my thinking by the new God-consciousness within...”
                    </Text>
                </View>

                {/* Instructions */}
                <View style={styles.instructionsSection}>
                    <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                    <Text style={styles.instructionsText}>
                        Not every thought is from God. Run it through the spiritual test.
                    </Text>
                </View>

                {/* Check List */}
                <View style={styles.checkListSection}>
                    {checkItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.checkRow}
                            onPress={() => toggleSelection(item.id as keyof typeof selections)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.checkLabel}>{item.label}</Text>
                            <Text style={[
                                styles.selectText,
                                selections[item.id as keyof typeof selections] && styles.selectedText
                            ]}>
                                {selections[item.id as keyof typeof selections] ? 'Selected' : 'Select'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Continue Button */}
                <View style={styles.buttonPadding}>
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => router.push('/morning/big-book/obey-and-act')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
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
        width: '60%',
        borderRadius: 2,
    },
    quoteCard: {
        backgroundColor: '#2c2514',
        marginHorizontal: 24,
        borderRadius: 16,
        padding: 30,
        marginBottom: 40,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#d1b88a',
        textAlign: 'center',
        lineHeight: 28,
    },
    instructionsSection: {
        paddingHorizontal: 24,
        marginBottom: 40,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#666666',
        letterSpacing: 1.2,
        marginBottom: 12,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#888888',
        lineHeight: 24,
    },
    checkListSection: {
        paddingHorizontal: 24,
        gap: 32,
        marginBottom: 60,
    },
    checkRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
    },
    selectText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#444444',
    },
    selectedText: {
        color: '#FFD54F',
        fontFamily: 'Inter_700Bold',
    },
    buttonPadding: {
        paddingHorizontal: 24,
    },
    continueButton: {
        backgroundColor: '#FFD54F',
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
