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

export default function MiddayClosingPrayerScreen() {
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
                <Text style={styles.headerTitle}>Closing Prayer</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Instructions */}
                <View style={styles.instructionsSection}>
                    <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                    <Text style={styles.instructionsText}>
                        Return to service- get out of self
                    </Text>
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        "Abandon yourself to God as you understand God. Admit your faults to Him and to your fellows. Clear away the wreckage of your past. Give freely of what you find and join us."
                    </Text>
                </View>

                {/* Second Instructions */}
                <View style={styles.instructionsSection2}>
                    <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                    <Text style={styles.instructionsText2}>
                        This mid-day pause isn't the end. It's a reset a chance to return to God's direction, then return to your life with willingness and love.
                    </Text>
                </View>

                {/* Prayer Block */}
                <View style={styles.prayerBlock}>
                    <Text style={styles.prayerText}>
                        God, I offer myself to Thee to build with me and to do with me as Thou wilt...
                    </Text>
                    <Text style={styles.prayerText}>
                        Relieve me of the bondage of self, that I may better do Thy will.
                    </Text>
                    <Text style={styles.prayerText}>
                        Take away my difficulties, that victory over them may bear witness to those I would help of Thy Power, Thy Love, and Thy Way of Life.
                    </Text>
                    <Text style={styles.prayerText}>
                        May I do Thy will always.
                    </Text>
                </View>
            </ScrollView>

            {/* Finish Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.finishButton}
                    onPress={() => router.push('/finish')}
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
    instructionsSection: {
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 8,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#555555',
        letterSpacing: 1.5,
        marginBottom: 6,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        color: '#888888',
        lineHeight: 22,
    },
    quoteCard: {
        backgroundColor: '#1a2a3a',
        marginHorizontal: 24,
        marginTop: 12,
        borderRadius: 16,
        padding: 24,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#94CDFA',
        textAlign: 'center',
        lineHeight: 26,
    },
    instructionsSection2: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 8,
    },
    instructionsText2: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        color: '#888888',
        lineHeight: 22,
    },
    prayerBlock: {
        backgroundColor: '#f2f2f7',
        marginTop: 8,
        paddingHorizontal: 24,
        paddingVertical: 28,
        gap: 20,
    },
    prayerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 26,
        color: '#000000',
        lineHeight: 40,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
    },
    finishButton: {
        backgroundColor: '#94CDFA',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
    },
    finishButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
});
