import { StyleSheet, Text, View, Pressable, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function FinishScreen() {
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
                <Text style={styles.headerTitle}>Finish</Text>
                <View style={styles.placeholder} />
            </View>

            <Pressable
                style={styles.pressableContent}
                onPress={() => router.push('/home')}
            >
                <View style={styles.content}>
                    <Text style={styles.finishText}>
                        Keep coming Back. it{"\n"}works. it really does.
                    </Text>
                </View>
            </Pressable>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        color: '#fff',
    },
    placeholder: {
        width: 44,
    },
    pressableContent: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginTop: -60, // Offset to keep text centered even with header
    },
    finishText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 32,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 48,
    },
});
