import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function DrBobModeScreen() {
    const router = useRouter();

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    return (
        <Container style={styles.container}>
            {/* Header with back button */}
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
                <Text style={styles.title}>Dr. Bob's Morning Quiet Time</Text>
                <View style={styles.goldUnderline} />
            </View>

            {/* Center Content */}
            <View style={styles.centerContent}>
                <Text style={styles.greeting}>Good morning.</Text>
                <Text style={styles.description}>
                    Let's begin our morning quiet time of prayer, reading, meditation, guidance, testing, and obeying.
                </Text>
            </View>

            {/* Continue Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    activeOpacity={0.8}
                    onPress={() => router.push('/morning/dr-bob/be-still')}
                >
                    <Text style={styles.continueText}>Continue</Text>
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
        fontSize: 28,
        color: '#000000',
        marginBottom: 10,
    },
    goldUnderline: {
        height: 4,
        backgroundColor: '#D4A843',
        borderRadius: 2,
        width: '100%',
    },
    centerContent: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 32,
        alignItems: 'center',
    },
    greeting: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontFamily: 'Inter_400Regular',
        fontSize: 17,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 28,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    continueButton: {
        backgroundColor: '#E8B931',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
});
