import { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../../context/AppContext';

export default function NightBigBookGratitudeScreen() {
    const router = useRouter();
    const { addJournalEntry } = useAppContext();
    const [thought, setThought] = useState('');

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const handleFinish = () => {
        if (thought.trim()) {
            addJournalEntry({
                title: 'Night Gratitude',
                preview: thought.substring(0, 100),
                content: thought,
                type: 'night',
            });
        }
        router.push('/finish');
    };

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
                <Text style={styles.headerTitle}>Gratitude</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Pause in Gratitude</Text>
                    <View style={styles.underline} />
                </View>

                {/* Question Section */}
                <View style={styles.questionSection}>
                    <Text style={styles.questionText}>What are you grateful for today?</Text>
                </View>

                {/* Input Section */}
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="List three things or a general reflection..."
                        placeholderTextColor="#555555"
                        value={thought}
                        onChangeText={setThought}
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        "Gratitude is a divine emotion that fills the heart with light."
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.finishButton}
                    onPress={handleFinish}
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
    questionSection: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 16,
    },
    questionText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 20,
        color: '#000000',
        lineHeight: 30,
    },
    inputSection: {
        paddingHorizontal: 24,
        paddingTop: 12,
    },
    textInput: {
        backgroundColor: '#f2f2f7',
        borderRadius: 16,
        padding: 20,
        color: '#000000',
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        minHeight: 150,
        lineHeight: 24,
    },
    quoteCard: {
        backgroundColor: '#f2f2f7',
        marginHorizontal: 24,
        marginTop: 32,
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
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
    },
    finishButton: {
        backgroundColor: '#1a2530',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a3a4a',
    },
    finishButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
});
