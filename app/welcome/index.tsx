import { useRouter } from 'expo-router';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <View style={styles.logoWrapper}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Title */}
            <Text style={styles.title}>Welcome To 11</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
                The first mobile App dedicated{'\n'}to Step 11 and Two-way Prayer
            </Text>

            {/* Tagline */}
            <View style={styles.taglineContainer}>
                <Text style={styles.tagline}>Step Eleven Wasn't Meant to Be Silent.</Text>
                <Text style={styles.tagline}>It Was Meant to Set You on Fire.</Text>
            </View>

            {/* Continue Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => router.push('/welcome/reminders')}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#94CDFA',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    logoWrapper: {
        marginTop: 80,
        marginBottom: 36,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 130,
        height: 130,
    },
    title: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 30,
        color: '#000000',
        textAlign: 'center',
        letterSpacing: 0.4,
        marginBottom: 14,
    },
    subtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    taglineContainer: {
        alignItems: 'center',
        gap: 4,
    },
    tagline: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: 'rgba(255,255,255,0.82)',
        textAlign: 'center',
        lineHeight: 20,
        fontStyle: 'italic',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 36,
        left: 24,
        right: 24,
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: '#1a1a1a',
        letterSpacing: 0.3,
    },
});
