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

export default function SerenityPrayerScreen() {
    const router = useRouter();

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    return (
        <Container style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                        style={styles.backButton}
                    >
                        <Text style={styles.backArrow}>‹</Text>
                    </TouchableOpacity>
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Be Still. Breathe. Invite God.</Text>
                    <View style={styles.goldUnderline} />
                </View>

                {/* Instructions */}
                <View style={styles.instructionsSection}>
                    <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                    <Text style={styles.instructionsText}>
                        As you enter prayer, pause to be still. Breathe. Take it easy. Tune into the presence of God. God cannot get through to us if we are tense or anxious about later responsibilities. Let's have a moment of silence followed by the serenity prayer.
                    </Text>
                </View>

                {/* Serenity Prayer Section */}
                <View style={styles.prayerSection}>
                    <Text style={styles.prayerText}>
                        God, grant me the serenity to accept the things I cannot change,
                    </Text>

                    <Text style={styles.prayerText}>
                        the courage to change the things I can,
                    </Text>

                    <Text style={styles.prayerText}>
                        and the wisdom to know the difference.
                    </Text>
                </View>
            </ScrollView>

            {/* Continue Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    activeOpacity={0.8}
                    onPress={() => router.push('/morning/dr-bob/anchor-words')}
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
    instructionsSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 24,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#555555',
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
        lineHeight: 26,
    },
    prayerSection: {
        flex: 1,
        backgroundColor: '#2C2208',
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
        gap: 32,
    },
    prayerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 28,
        color: '#D4A843',
        lineHeight: 42,
    },
    bottomSection: {
        backgroundColor: '#2C2208',
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 8,
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
