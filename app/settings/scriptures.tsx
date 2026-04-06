import { useState } from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useGetAllScripturesQuery } from '../../Redux/features/scriptures/scripturesApi';

type Scripture = {
    _id: string;
    author: string;
    title: string;
    content: string;
    mode: string;
    timeOfDay: string;
    createdAt: string;
    updatedAt: string;
};

export default function ScripturesScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const { data: response, isLoading } = useGetAllScripturesQuery({});

    const scriptures: Scripture[] = response?.data || [];

    const filteredScriptures = scriptures.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const renderItem = ({ item }: { item: Scripture }) => {
        const activeDate = new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const updatedDate = new Date(item.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

        return (
            <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                <View style={styles.cardContent}>
                    <View style={styles.cardMain}>
                        <Text style={styles.reference}>{item.title} - {item.author}</Text>
                        <View style={styles.typeRow}>
                            <Text style={styles.typeIcon}>📖</Text>
                            <Text style={styles.typeLabel}>{item.timeOfDay} • {item.mode}</Text>
                        </View>
                        <Text style={styles.quoteText} numberOfLines={2}>
                            {item.content}
                        </Text>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                </View>
                <View style={styles.metadataRow}>
                    <Text style={styles.dateText}>Active: {activeDate}</Text>
                    <Text style={styles.dateText}>Updated: {updatedDate}</Text>
                </View>
                <View style={styles.divider} />
            </TouchableOpacity>
        );
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
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Scriptures</Text>
            </View>

            {/* List */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#94CDFA" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={filteredScriptures}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search scriptures..."
                        placeholderTextColor="#777777"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
        paddingTop: Platform.OS === 'web' ? 16 : 0,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
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
    titleContainer: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 32,
        color: '#000000',
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 100, // Space for search bar
    },
    card: {
        paddingVertical: 16,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardMain: {
        flex: 1,
    },
    reference: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
        marginBottom: 6,
    },
    typeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    typeIcon: {
        fontSize: 14,
        opacity: 0.8,
    },
    typeLabel: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        color: '#555555',
    },
    quoteText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#555555',
        lineHeight: 20,
        marginBottom: 12,
    },
    chevron: {
        fontFamily: 'Inter_400Regular',
        fontSize: 24,
        color: '#555555',
        marginLeft: 12,
    },
    metadataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 11,
        color: '#555555',
    },
    divider: {
        height: 1,
        backgroundColor: '#ffffff',
        marginTop: 16,
    },
    searchContainer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 48,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        color: '#000000',
    },
});
