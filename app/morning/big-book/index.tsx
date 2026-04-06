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

export default function MorningPrayerScreen() {
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
                <Text style={styles.headerTitle}>Morning Prayer</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Section Title */}
                <View style={styles.titleSection}>
                    <Text style={styles.sectionTitle}>“Upon Awakening”</Text>
                    <View style={styles.yellowBar} />
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        “On awakening let us think about the{'\n'}
                        twenty-four hours ahead...{'\n'}
                        Before we begin, we ask God to direct{'\n'}
                        our thinking...”
                    </Text>
                </View>

                {/* Instructions */}
                <View style={styles.instructionsSection}>
                    <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                    <Text style={styles.instructionsText}>
                        Pause before launching into the day. Ask God to guide your thinking — especially that it be free from fear, self-pity, or selfish motives.
                    </Text>
                </View>

                {/* Prayer Block */}
                <View style={styles.prayerBlock}>
                    <Text style={styles.prayerText}>
                        God, direct my thinking _ especially that it be divorced from self- pity dishonest or self- seeking motives
                    </Text>
                </View>

                {/* Button */}
                <View style={styles.buttonPadding}>
                    <TouchableOpacity
                        style={styles.beginButton}
                        activeOpacity={0.8}
                        onPress={() => router.push('/morning/big-book/meditation')}
                    >
                        <Text style={styles.beginButtonText}>Begin Timer</Text>
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
        color: '#fff',
        marginTop: -4,
    },
    headerTitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 18,
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
    titleSection: {
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 22,
        color: '#000000',
        marginBottom: 12,
    },
    yellowBar: {
        height: 3,
        backgroundColor: '#FFD54F',
        width: '100%',
    },
    quoteCard: {
        backgroundColor: '#2c2514',
        marginHorizontal: 24,
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#d1b88a',
        textAlign: 'center',
        lineHeight: 28,
    },
    instructionsSection: {
        paddingHorizontal: 24,
        marginBottom: 32,
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
    prayerBlock: {
        backgroundColor: '#3a3116',
        paddingVertical: 50,
        paddingHorizontal: 24,
        width: '100%',
        marginBottom: 40,
    },
    prayerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 28,
        color: '#000000',
        lineHeight: 42,
        textAlign: 'left',
    },
    buttonPadding: {
        paddingHorizontal: 24,
    },
    beginButton: {
        backgroundColor: '#FFD54F',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
    },
    beginButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
});
