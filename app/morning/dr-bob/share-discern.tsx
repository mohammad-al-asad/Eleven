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

export default function ShareAndDiscernScreen() {
    const router = useRouter();

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const sharingOptions = [
        'Send your writing or notes to someone you trust.',
        'Text guidance to friend',
        'Call your sponsor.',
        'Share with home group',
    ];

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
                    <Text style={styles.headerTitle}>Share and Discern</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>More Light Through{'\n'}Two Windows</Text>
                    <View style={styles.goldUnderline} />
                </View>

                {/* Description Paragraphs */}
                <View style={styles.descriptionSection}>
                    <Text style={styles.descriptionText}>
                        Dr. Bob rarely prayed alone. He and Anne(wife) read, prayed, and shared what they heard.
                    </Text>

                    <Text style={styles.descriptionText}>
                        Small circles like these were the earliest "meetings." Unity started around shared guidance.
                    </Text>

                    <Text style={styles.descriptionText}>
                        Early fellowship was born from this question:
                    </Text>
                </View>

                {/* Quote */}
                <View style={styles.quoteSection}>
                    <Text style={styles.quoteText}>
                        "What did God say to you{'\n'}this morning?"
                    </Text>
                </View>

                {/* Sharing Options */}
                <View style={styles.optionsSection}>
                    <Text style={styles.optionsLabel}>Options for sharing:</Text>
                    {sharingOptions.map((option, index) => (
                        <View key={index} style={styles.optionRow}>
                            <View style={styles.goldDot} />
                            <Text style={styles.optionText}>{option}</Text>
                        </View>
                    ))}
                </View>

                {/* Bottom Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteCardText}>
                        There are always three sides to every question—your side, my side, and the right side.
                    </Text>
                    <Text style={styles.quoteCardText}>
                        Guidance shows us which is the right side.Not who is right--but what is right.
                    </Text>
                </View>
            </ScrollView>

            {/* Continue Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => router.push('/morning/dr-bob/final-prayer')}
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
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
        fontSize: 26,
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
    descriptionSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        gap: 20,
    },
    descriptionText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
        lineHeight: 26,
    },
    quoteSection: {
        paddingHorizontal: 40,
        paddingVertical: 28,
        alignItems: 'center',
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 30,
        fontStyle: 'italic',
    },
    optionsSection: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    optionsLabel: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#888888',
        marginBottom: 16,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        marginBottom: 14,
    },
    goldDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#D4A843',
        marginTop: 6,
    },
    optionText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
        flex: 1,
        lineHeight: 24,
    },
    quoteCard: {
        backgroundColor: '#2C2208',
        marginHorizontal: 24,
        borderRadius: 16,
        padding: 24,
    },
    quoteCardText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        color: '#D4A843',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 4,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
    },
    continueButton: {
        backgroundColor: '#E8B931',
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
