import { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../../context/AppContext';

export default function MiddayDrBobWriteInAppScreen() {
    const router = useRouter();
    const { addJournalEntry } = useAppContext();
    const [text, setText] = useState('');

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const handleSave = () => {
        if (text.trim()) {
            addJournalEntry({
                title: 'Midday Dr. Bob Reflection',
                preview: text.substring(0, 100),
                content: text,
                type: 'midday',
            });
        }
        router.push('/midday/dr-bob/test');
    };

    return (
        <Container style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    style={styles.headerButton}
                >
                    <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Inspiration</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.micIcon}>🎙</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerButton}
                        activeOpacity={0.7}
                        onPress={handleSave}
                    >
                        <Text style={styles.checkIcon}>✓</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Text Input Area */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    multiline
                    autoFocus
                    placeholder="Write your thoughts here..."
                    placeholderTextColor="#555555"
                    value={text}
                    onChangeText={setText}
                    textAlignVertical="top"
                />
            </View>

            {/* Continue Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleSave}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        fontSize: 18,
        color: '#fff',
    },
    headerTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: '#fff',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 10,
    },
    micIcon: {
        fontSize: 18,
        color: '#94CDFA',
    },
    checkIcon: {
        fontSize: 20,
        color: '#94CDFA',
        fontWeight: 'bold',
    },
    inputContainer: {
        paddingHorizontal: 16,
        flex: 1,
    },
    textInput: {
        backgroundColor: '#f2f2f7',
        borderRadius: 16,
        padding: 20,
        color: '#000000',
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        minHeight: 200,
        lineHeight: 24,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
    },
    continueButton: {
        backgroundColor: '#94CDFA',
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
