import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function FinalPrayerScreen() {
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
                <Text style={styles.headerTitle}>Final Prayer & Send-Off</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Title Section */}
            <View style={styles.titleSection}>
                <Text style={styles.title}>
                    When A Man Listens, God Speaks, When Man Obeys, God Moves.
                </Text>
                <View style={styles.goldUnderline} />
            </View>

            {/* Prayer Section */}
            <View style={styles.prayerSection}>
                <Text style={styles.prayerText}>
                    God, I thank You for what You showed me this morning, give me strength to do your will{'\n'}____not mine.
                </Text>
            </View>

            {/* Send-Off Text */}
            <View style={styles.sendOffSection}>
                <Text style={styles.sendOffText}>
                    Now go forth in faith, trusting His guidance.
                </Text>
            </View>

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
    goldUnderline: {
        height: 4,
        backgroundColor: '#D4A843',
        borderRadius: 2,
        width: '100%',
    },
    prayerSection: {
        flex: 1,
        backgroundColor: '#2C2208',
        marginTop: 16,
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 48,
        justifyContent: 'center',
    },
    prayerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 28,
        color: '#D4A843',
        lineHeight: 44,
    },
    sendOffSection: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 16,
        alignItems: 'center',
    },
    sendOffText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 24,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 8,
    },
    finishButton: {
        backgroundColor: '#E8B931',
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
