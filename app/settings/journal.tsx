import { useState } from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';

type JournalEntry = {
    id: string;
    date: string;
    title: string;
    preview: string;
    type: 'morning' | 'midday' | 'night';
};

const SAMPLE_ENTRIES: JournalEntry[] = [
    {
        id: '1',
        date: 'Today',
        title: 'Morning Reflection',
        preview: 'Grateful for another day of sobriety and clarity...',
        type: 'morning',
    },
    {
        id: '2',
        date: 'Yesterday',
        title: 'Evening Prayer',
        preview: 'Reviewed the day and found peace in surrender...',
        type: 'night',
    },
    {
        id: '3',
        date: 'Feb 24, 2026',
        title: 'Mid Day Check-in',
        preview: 'Paused to reconnect and ask for guidance...',
        type: 'midday',
    },
];

function getTypeIcon(type: JournalEntry['type']): string {
    switch (type) {
        case 'morning': return '☀️';
        case 'midday': return '⚙️';
        case 'night': return '🌙';
    }
}

export default function JournalScreen() {
    const router = useRouter();
    const { journalEntries } = useAppContext();
    const allEntries = [...journalEntries, ...SAMPLE_ENTRIES];

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const renderEntry = ({ item }: { item: JournalEntry }) => (
        <TouchableOpacity style={styles.entryCard} activeOpacity={0.7}>
            <View style={styles.entryHeader}>
                <Text style={styles.entryIcon}>{getTypeIcon(item.type)}</Text>
                <View style={styles.entryHeaderText}>
                    <Text style={styles.entryTitle}>{item.title}</Text>
                    <Text style={styles.entryDate}>{item.date}</Text>
                </View>
            </View>
            <Text style={styles.entryPreview} numberOfLines={2}>
                {item.preview}
            </Text>
        </TouchableOpacity>
    );

    return (
        <Container style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Journal</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Entries List */}
            <FlatList
                data={allEntries}
                renderItem={renderEntry}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📖</Text>
                        <Text style={styles.emptyTitle}>No entries yet</Text>
                        <Text style={styles.emptySubtitle}>
                            Your reflections will appear here after you complete a session.
                        </Text>
                    </View>
                }
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f0ff',
        paddingTop: Platform.OS === 'web' ? 16 : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 20,
    },
    backButton: {
        fontFamily: 'Inter_400Regular',
        fontSize: 28,
        color: '#333333',
    },
    title: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 22,
        color: '#1a1a1a',
    },
    placeholder: {
        width: 28,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    entryCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    entryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 12,
    },
    entryIcon: {
        fontSize: 24,
    },
    entryHeaderText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    entryTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: '#1a1a1a',
    },
    entryDate: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        color: '#555555',
    },
    entryPreview: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
        paddingLeft: 36,
    },
    emptyState: {
        alignItems: 'center',
        paddingTop: 80,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#333333',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#888888',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 40,
    },
});
