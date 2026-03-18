import { useState } from 'react';
import {
    ImageBackground,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';

type Tab = 'morning' | 'midday' | 'night';

const TAB_CONFIG: Record<Tab, {
    greeting: string;
    title: string;
    icon: string;
    label: string;
    background: any;
}> = {
    morning: {
        greeting: 'Good Morning.',
        title: 'Morning',
        icon: '☀️',
        label: 'Morning',
        background: require('../../assets/mbg.png'),
    },
    midday: {
        greeting: 'Good Afternoon.',
        title: 'Mid Day',
        icon: '⚙️',
        label: 'Mid Day',
        background: require('../../assets/nbg.png'),
    },
    night: {
        greeting: 'Good Evening.',
        title: 'Night',
        icon: '🌙',
        label: 'Night',
        background: require('../../assets/night.png'),
    },
};

const TABS: Tab[] = ['morning', 'midday', 'night'];

function getFormattedDate(): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    return `Today is ${day}, ${date} ${month}, ${year}`;
}

export default function HomeScreen() {
    const { selectedPath } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('morning');
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const Container = Platform.OS === 'web' ? View : SafeAreaView;
    const config = TAB_CONFIG[activeTab];

    return (
        <ImageBackground
            source={config.background}
            style={styles.background}
            resizeMode="cover"
        >
            <Container style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.title, activeTab === 'night' && { color: '#000000' }]}>{config.title}</Text>
                    <TouchableOpacity
                        style={styles.menuButton}
                        activeOpacity={0.7}
                        onPress={() => setMenuOpen(true)}
                    >
                        <Text style={[styles.menuDots, activeTab === 'night' && { color: '#000000' }]}>•••</Text>
                    </TouchableOpacity>
                </View>

                {/* Dropdown Menu */}
                <Modal
                    visible={menuOpen}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setMenuOpen(false)}
                >
                    <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)}>
                        <View style={styles.dropdown}>
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                activeOpacity={0.7}
                                onPress={() => { setMenuOpen(false); router.push('/settings/journal'); }}
                            >
                                <Text style={styles.dropdownIcon}>📖</Text>
                                <Text style={styles.dropdownLabel}>Journal</Text>
                            </TouchableOpacity>

                            <View style={styles.dropdownDivider} />

                            <TouchableOpacity
                                style={styles.dropdownItem}
                                activeOpacity={0.7}
                                onPress={() => { setMenuOpen(false); router.push('/settings'); }}
                            >
                                <Text style={styles.dropdownIcon}>⚙️</Text>
                                <Text style={styles.dropdownLabel}>Settings</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>

                {/* Center Content */}
                <View style={styles.centerContent}>
                    <Text style={[styles.greeting, activeTab === 'night' && { color: '#000000' }]}>{config.greeting}</Text>
                    <Text style={[styles.dateText, activeTab === 'night' && { color: '#cccccc' }]}>{getFormattedDate()}</Text>

                    {/* Mood Label */}
                    <Text style={[styles.moodLabel, activeTab === 'night' && { color: 'rgba(255,255,255,0.8)', backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                        {selectedPath === 'dr_bob' ? '🙏 Dr. Bob Mode' : '📖 Big Book Thumper'}
                    </Text>

                    {/* Start Button */}
                    <TouchableOpacity
                        style={styles.startOuterCircle}
                        activeOpacity={0.8}
                        onPress={() => {
                            if (activeTab === 'morning') {
                                if (selectedPath === 'dr_bob') {
                                    router.push('/morning/dr-bob');
                                } else {
                                    router.push('/morning/big-book');
                                }
                            } else if (activeTab === 'midday') {
                                if (selectedPath === 'dr_bob') {
                                    router.push('/midday/dr-bob');
                                } else {
                                    router.push('/midday/big-book');
                                }
                            } else {
                                // night - placeholder for future
                                if (selectedPath === 'dr_bob') {
                                    router.push('/night/dr-bob');
                                } else {
                                    router.push('/night/big-book');
                                }
                            }
                        }}
                    >
                        <View style={styles.startInnerCircle}>
                            <Text style={styles.startText}>Start</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Bottom Tab Bar */}
                <View style={styles.tabBar}>
                    {TABS.map((tab) => {
                        const tabConfig = TAB_CONFIG[tab];
                        const isActive = activeTab === tab;

                        return (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, isActive && styles.tabActive]}
                                onPress={() => setActiveTab(tab)}
                                activeOpacity={0.7}
                            >
                                {isActive ? (
                                    <View style={styles.activeTabIndicator}>
                                        <Text style={[styles.tabIcon, styles.tabIconActive]}>
                                            {tabConfig.icon}
                                        </Text>
                                        <Text style={[styles.tabLabel, styles.tabLabelActive]}>
                                            {tabConfig.label}
                                        </Text>
                                    </View>
                                ) : (
                                    <>
                                        <Text style={styles.tabIcon}>{tabConfig.icon}</Text>
                                        <Text style={styles.tabLabel}>{tabConfig.label}</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Container>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'web' ? 16 : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    title: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 32,
        color: '#000000',
    },
    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuDots: {
        fontSize: 16,
        color: '#333333',
        letterSpacing: 2,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: Platform.OS === 'web' ? 70 : 90,
        paddingRight: 24,
    },
    dropdown: {
        backgroundColor: 'rgba(20, 30, 55, 0.92)',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 6,
        minWidth: 180,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 12,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 14,
    },
    dropdownIcon: {
        fontSize: 22,
    },
    dropdownLabel: {
        fontFamily: 'Inter_500Medium',
        fontSize: 18,
        color: '#fff',
    },
    dropdownDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        marginHorizontal: 16,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    },
    greeting: {
        fontFamily: 'Inter_500Medium',
        fontSize: 22,
        color: '#000000',
        marginBottom: 6,
    },
    dateText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#1a1a1a',
        marginBottom: 24,
    },
    moodLabel: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.55)',
        marginBottom: 32,
        paddingHorizontal: 16,
        paddingVertical: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        borderRadius: 20,
        overflow: 'hidden',
    },
    startOuterCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        // Shadow for premium look
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 10,
    },
    startInnerCircle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    startText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 22,
        color: '#000000',
    },
    tabBar: {
        flexDirection: 'row',
        marginHorizontal: 24,
        marginBottom: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    tabActive: {
        flex: 1.2,
    },
    activeTabIndicator: {
        backgroundColor: '#ffffff',
        width: '100%',
        paddingVertical: 10,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tabIcon: {
        fontSize: 18,
        color: '#777777',
        marginBottom: 2,
    },
    tabIconActive: {
        fontSize: 20,
        color: '#000000',
    },
    tabLabel: {
        fontFamily: 'Inter_500Medium',
        fontSize: 10,
        color: '#555555',
    },
    tabLabelActive: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        color: '#000000',
    },
});
