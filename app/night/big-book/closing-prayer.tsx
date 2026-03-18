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

export default function NightBigBookClosingPrayerScreen() {
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
                <Text style={styles.headerTitle}>Close in Prayer</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Let Go. rest in God.</Text>
                    <View style={styles.underline} />
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        "...we let God discipline us in the simple way we have just outlined."
                    </Text>
                </View>

                {/* Subtitle */}
                <View style={styles.subtitleSection}>
                    <Text style={styles.subtitle}>Closing Prayer (inspired by Steps 10 & 11):</Text>
                </View>

                {/* Prayer Block */}
                <View style={styles.prayerBlock}>
                    <Text style={styles.prayerText}>
                        God, thank You for walking with me today. Forgive my mistakes. Show me what to do better.
                        {"\n\n"}
                        Give me rest and renew me for tomorrow
                        {"\n\n"}
                        Thy _ will be _ done.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.finishButton}
                    onPress={() => router.push('/finish')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.finishButtonText}>Finish</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={styles.gratitudeButton}
                    onPress={() => router.push('/night/big-book/gratitude')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.gratitudeText}>Gratitude (Optional)</Text>
                </TouchableOpacity> */}
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
    subtitleSection: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 12,
    },
    subtitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#bbbbbb',
    },
    prayerBlock: {
        backgroundColor: '#1c2c3c',
        paddingHorizontal: 24,
        paddingVertical: 40,
        marginTop: 4,
    },
    prayerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 24,
        color: '#000000',
        lineHeight: 38,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
        alignItems: 'center',
    },
    finishButton: {
        backgroundColor: '#1a2530',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#2a3a4a',
        marginBottom: 20,
    },
    finishButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
    gratitudeButton: {
        paddingVertical: 8,
    },
    gratitudeText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#888888',
    },
});
