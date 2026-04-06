import { useState, useEffect } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext, PathOption } from '../../context/AppContext';

export default function SettingsScreen() {
    const router = useRouter();
    const { selectedPath, setSelectedPath } = useAppContext();
    const [localPath, setLocalPath] = useState<PathOption>(selectedPath);

    useEffect(() => {
        setLocalPath(selectedPath);
    }, [selectedPath]);

    const handlePathSwitch = (path: PathOption) => {
        setLocalPath(path);
        setSelectedPath(path);
    };

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    return (
        <Container style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.placeholder} />
                <Text style={styles.title}>Settings</Text>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                    <View style={styles.checkCircle}>
                        <Text style={styles.checkMark}>✓</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Path Selection */}
                <Text style={styles.sectionLabel}>Path Selection</Text>

                <TouchableOpacity
                    style={styles.pathOption}
                    activeOpacity={0.7}
                    onPress={() => handlePathSwitch('dr_bob')}
                >
                    <View style={styles.pathTextContainer}>
                        <Text style={styles.pathTitle}>Dr. Bob Mode - 2 Way Prayer</Text>
                        <Text style={styles.pathDescription}>
                            Read. Be Still. Ask. Write. Test. Obey. Our co-founder Dr. Bob
                            called it Two Way Prayer and this is how he practiced Step 11.
                        </Text>
                    </View>
                    {localPath === 'dr_bob' && (
                        <Text style={styles.pathCheck}>✓</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity
                    style={styles.pathOption}
                    activeOpacity={0.7}
                    onPress={() => handlePathSwitch('big_book')}
                >
                    <View style={styles.pathTextContainer}>
                        <Text style={styles.pathTitle}>Big Book Thumper</Text>
                        <Text style={styles.pathDescription}>
                            Page 86–88. Line by line exactly like the big book.
                        </Text>
                    </View>
                    {localPath === 'big_book' && (
                        <Text style={styles.pathCheck}>✓</Text>
                    )}
                </TouchableOpacity>

                {/* Preferences */}
                <Text style={styles.sectionLabel}>Preferences</Text>
                <TouchableOpacity
                    style={styles.menuRow}
                    activeOpacity={0.7}
                    onPress={() => router.push('/settings/notifications')}
                >
                    <Text style={styles.menuIcon}>🔔</Text>
                    <Text style={styles.menuLabel}>Notifications</Text>
                    <Text style={styles.menuChevron}>›</Text>
                </TouchableOpacity>

                {/* Content */}
                <Text style={styles.sectionLabel}>Content</Text>
                <TouchableOpacity
                    style={styles.menuRow}
                    activeOpacity={0.7}
                    onPress={() => router.push('/settings/scriptures')}
                >
                    <Text style={styles.menuIcon}>📖</Text>
                    <Text style={styles.menuLabel}>Scriptures</Text>
                    <Text style={styles.menuChevron}>›</Text>
                </TouchableOpacity>

                {/* App Data */}
                <Text style={styles.sectionLabel}>App Data</Text>
                <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
                    <Text style={styles.menuIcon}>🔄</Text>
                    <Text style={styles.menuLabel}>Reset Onboarding</Text>
                </TouchableOpacity>

                {/* About Section */}
                <Text style={styles.sectionLabel}>About</Text>
                <TouchableOpacity 
                    style={styles.menuRow} 
                    activeOpacity={0.7}
                    onPress={() => router.push('/settings/about-us')}
                >
                    <Text style={styles.menuIcon}>ℹ️</Text>
                    <Text style={styles.menuLabel}>About Us</Text>
                    <Text style={styles.menuChevron}>›</Text>
                </TouchableOpacity>

                {/* Donate Button */}
                <View style={styles.donateContainer}>
                    <TouchableOpacity 
                        style={styles.donateButton} 
                        activeOpacity={0.8}
                        onPress={() => Linking.openURL('https://buy.stripe.com/6oU00j8ET0SS0eG6Z28Vi00')}
                    >
                        <Text style={styles.donateText}>Donate</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
    },
    placeholder: {
        width: 36,
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 22,
        color: '#000000',
    },
    checkCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#4A9FE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkMark: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: '#000000',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    sectionLabel: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13,
        color: '#777777',
        marginTop: 24,
        marginBottom: 10,
        paddingLeft: 2,
    },
    pathOption: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    pathTextContainer: {
        flex: 1,
    },
    pathTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: '#000000',
        marginBottom: 4,
    },
    pathDescription: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: '#555555',
        lineHeight: 19,
    },
    pathCheck: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 22,
        color: '#4A9FE5',
        marginLeft: 12,
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#ffffff',
        marginVertical: 4,
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 12,
    },
    menuIcon: {
        fontSize: 20,
    },
    menuLabel: {
        fontFamily: 'Inter_500Medium',
        flex: 1,
        fontSize: 16,
        color: '#000000',
    },
    menuChevron: {
        fontFamily: 'Inter_400Regular',
        fontSize: 22,
        color: '#555555',
    },
    donateContainer: {
        marginTop: 32,
        marginBottom: 16,
    },
    donateButton: {
        backgroundColor: '#94CDFA',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
    },
    donateText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: '#1a1a1a',
        letterSpacing: 0.3,
    },
});
