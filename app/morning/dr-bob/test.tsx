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

type TagType = 'Honest' | 'Pure' | 'Unselfish' | 'Loving' | 'Unsure' | null;

export default function DrBobTestScreen() {
    const router = useRouter();
    const { journalEntries } = useAppContext();
    const [selectedTag, setSelectedTag] = useState<TagType>(null);
    const [editableText, setEditableText] = useState('');

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    // Get the latest journal entry content
    const latestEntry = journalEntries && journalEntries.length > 0
        ? journalEntries[journalEntries.length - 1]
        : null;
    const initialText = latestEntry?.content || '';

    // Initialize editable text from journal entry
    useState(() => {
        if (initialText && !editableText) {
            setEditableText(initialText);
        }
    });

    const tags: { label: string; color: string; bgColor: string }[] = [
        { label: 'Honest', color: '#E8A87C', bgColor: 'rgba(232, 168, 124, 0.25)' },
        { label: 'Pure', color: '#B8B8D0', bgColor: 'rgba(184, 184, 208, 0.25)' },
        { label: 'Unselfish', color: '#7EC8E3', bgColor: 'rgba(126, 200, 227, 0.25)' },
        { label: 'Loving', color: '#A8D5A2', bgColor: 'rgba(168, 213, 162, 0.25)' },
        { label: 'Unsure', color: '#C4B998', bgColor: 'rgba(196, 185, 152, 0.25)' },
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
                    <Text style={styles.headerTitle}>Test the From God?</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Is This From God?</Text>
                    <View style={styles.goldUnderline} />
                </View>

                {/* Instructions */}
                <View style={styles.instructionsSection}>
                    <Text style={styles.instructionsLabel}>INSTRUCTIONS:</Text>
                    <Text style={styles.instructionsText}>
                        When the writing stops, pause and test.
                    </Text>
                </View>

                {/* Four Absolutes */}
                <View style={styles.absolutesSection}>
                    <Text style={styles.absolutesTitle}>Ask the Four Absolutes:</Text>
                    <View style={styles.absolutesList}>
                        <Text style={styles.absoluteItem}>· Is it Honest?</Text>
                        <Text style={styles.absoluteItem}>· Is it Pure?</Text>
                        <Text style={styles.absoluteItem}>· Is it Unselfish?</Text>
                        <Text style={styles.absoluteItem}>· Is it Loving?</Text>
                    </View>
                </View>

                {/* Note */}
                <View style={styles.noteSection}>
                    <Text style={styles.noteText}>
                        You can mark anything 'Unsure' and revisit it with a trusted friend.
                    </Text>
                </View>

                {/* You Wrote Section */}
                <View style={styles.youWroteSection}>
                    <Text style={styles.youWroteTitle}>You Wrote:</Text>
                    <Text style={styles.youWroteSubtitle}>
                        Select any text and tag it with one of the Four Absolutes:
                    </Text>
                </View>

                {/* Tag Buttons */}
                <View style={styles.tagsContainer}>
                    <View style={styles.tagsRow}>
                        {tags.map((tag) => (
                            <TouchableOpacity
                                key={tag.label}
                                style={[
                                    styles.tagButton,
                                    { backgroundColor: tag.bgColor },
                                    selectedTag === tag.label && { borderColor: tag.color, borderWidth: 2 },
                                ]}
                                activeOpacity={0.7}
                                onPress={() => setSelectedTag(tag.label as TagType)}
                            >
                                <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={[styles.tagButton, styles.removeTagButton]}
                            activeOpacity={0.7}
                            onPress={() => setSelectedTag(null)}
                        >
                            <Text style={styles.removeTagText}>Remove Tag</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Written Text Area */}
                <View style={styles.textCard}>
                    <TextInput
                        style={styles.textCardInput}
                        value={editableText}
                        onChangeText={setEditableText}
                        placeholder="Write your thoughts here..."
                        placeholderTextColor="#555555"
                        multiline
                        textAlignVertical="top"
                        selectionColor="#D4A843"
                    />
                </View>
            </ScrollView>

            {/* Continue Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => router.push('/morning/dr-bob/share-discern')}
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
    },
    goldUnderline: {
        height: 4,
        backgroundColor: '#D4A843',
        borderRadius: 2,
        width: '100%',
    },
    instructionsSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
    },
    instructionsLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: '#555555',
        letterSpacing: 1.5,
        marginBottom: 12,
    },
    instructionsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 17,
        color: '#000000',
        lineHeight: 26,
    },
    absolutesSection: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    absolutesTitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 17,
        color: '#000000',
        marginBottom: 12,
    },
    absolutesList: {
        gap: 6,
    },
    absoluteItem: {
        fontFamily: 'Inter_400Regular',
        fontSize: 17,
        color: '#000000',
        lineHeight: 28,
    },
    noteSection: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 24,
    },
    noteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#888888',
        lineHeight: 22,
    },
    youWroteSection: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    youWroteTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
        marginBottom: 4,
    },
    youWroteSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#888888',
        lineHeight: 20,
    },
    tagsContainer: {
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
    },
    tagButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    tagText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
    },
    removeTagButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: '#444444',
    },
    removeTagText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        color: '#555555',
    },
    textCard: {
        backgroundColor: '#1a1a1a',
        marginHorizontal: 24,
        borderRadius: 16,
        padding: 20,
        minHeight: 120,
        borderWidth: 1,
        borderColor: '#333333',
    },
    textCardInput: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#cccccc',
        lineHeight: 24,
        minHeight: 100,
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
