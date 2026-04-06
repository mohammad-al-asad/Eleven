import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function RemindersScreen() {
    const router = useRouter();

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    return (
        <Container style={styles.container}>
            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Reminders</Text>

                <Text style={styles.paragraph}>
                    In order to help you build the habit of reflection three times a day,
                    this app can automatically remind you to come back for your morning,
                    mid day, and evening reflection.
                </Text>

                <Text style={styles.paragraph}>
                    You can turn off reminders at any time later, once you find you no
                    longer need to be reminded.
                </Text>
            </View>

            {/* Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => router.push('/welcome/selection')}
                >
                    <Text style={styles.buttonText}>Set reminders permission</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#94CDFA',
        paddingHorizontal: 32,
        paddingTop: Platform.OS === 'web' ? 48 : 0,
    },
    content: {
        flex: 1,
        paddingTop: 48,
    },
    title: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 32,
        color: '#000000',
        marginBottom: 24,
        letterSpacing: 0.2,
    },
    paragraph: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        color: '#000000',
        lineHeight: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        paddingBottom: 36,
        paddingHorizontal: 0,
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: '#1a1a1a',
        letterSpacing: 0.2,
    },
});
