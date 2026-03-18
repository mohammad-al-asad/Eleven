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

export default function NightDrBobIndexScreen() {
    const router = useRouter();

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
                <Text style={styles.headerTitle}>Welcome + Settle In</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Be Still</Text>
                    <View style={styles.underline} />
                </View>

                {/* Instructions Section */}
                <View style={styles.contentSection}>
                    <Text style={styles.label}>INSTRUCTIONS:</Text>
                    <Text style={styles.bodyText}>Be still. Take a breath.</Text>

                    <Text style={styles.bodyText}>You're not doing the inventory alone.</Text>

                    <Text style={styles.bodyText}>
                        This is an invitation hear God's quiet correction, comfort, and direction together.
                    </Text>

                    <View style={styles.centeredCard}>
                        <Text style={styles.cardText}>
                            This is a spiritual conversation, not a checklist.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => router.push('/night/dr-bob/review')}
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
    },
    underline: {
        height: 4,
        backgroundColor: '#1a2530',
        borderRadius: 2,
        width: '100%',
    },
    contentSection: {
        paddingHorizontal: 24,
        paddingTop: 32,
        gap: 28,
    },
    label: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#555555',
        letterSpacing: 1.5,
        marginBottom: -12,
    },
    bodyText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#000000',
        lineHeight: 28,
    },
    centeredCard: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    cardText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 24,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 34,
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
