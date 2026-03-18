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

export default function ObeyAndActScreen() {
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
                <Text style={styles.headerTitle}>Obey + Act</Text>
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
                        Thy Will, Not Mine, Be Done
                    </Text>
                    <View style={styles.yellowBar} />
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        “We usually conclude the period of meditation with a prayer...”
                    </Text>
                </View>

                {/* Main Prayer Block */}
                <View style={styles.prayerBlock}>
                    <Text style={styles.prayerText}>
                        God, please show me throughout this day what my next step is to be.
                    </Text>
                    <Text style={[styles.prayerText, { marginTop: 32 }]}>
                        Give me whatever I need to take care of any problems.
                    </Text>
                    <Text style={[styles.prayerText, { marginTop: 32 }]}>
                        Free me from self-will, fear, or self-pity.
                    </Text>
                    <Text style={[styles.prayerText, { marginTop: 32 }]}>
                        Help me to do Thy will always. Amen.
                    </Text>
                </View>

                {/* Finish Button */}
                <View style={styles.buttonPadding}>
                    <TouchableOpacity
                        style={styles.finishButton}
                        onPress={() => router.push('/finish')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.finishButtonText}>Continue</Text>
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
        padding: 24,
        marginBottom: 32,
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#d1b88a',
        textAlign: 'center',
        lineHeight: 26,
    },
    prayerBlock: {
        backgroundColor: '#2c2514',
        padding: 32,
        marginBottom: 48,
        minHeight: 400,
    },
    prayerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 24,
        color: '#fff',
        lineHeight: 36,
    },
    buttonPadding: {
        paddingHorizontal: 24,
    },
    finishButton: {
        backgroundColor: '#FFD54F',
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
