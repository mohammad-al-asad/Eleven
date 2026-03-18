import { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
    const router = useRouter();
    const [toggles, setToggles] = useState({
        morning: true,
        midday: true,
        evening: true,
    });

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const handleToggle = (key: 'morning' | 'midday' | 'evening') => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
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
                <Text style={styles.title}>Notifications</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Notification Permission */}
            <View style={styles.content}>
                <View style={styles.permissionCard}>
                    <Text style={styles.permissionIcon}>🔔</Text>
                    <View style={styles.permissionTextContainer}>
                        <Text style={styles.permissionTitle}>Notification Permission</Text>
                        <Text style={styles.permissionSubtitle}>
                            Notifications are enabled
                        </Text>
                    </View>
                </View>

                {/* Daily Reminders */}
                <Text style={styles.sectionLabel}>Daily Reminders</Text>

                {/* Morning */}
                <View style={styles.reminderCard}>
                    <Text style={styles.reminderIcon}>☀️</Text>
                    <View style={styles.reminderTextContainer}>
                        <Text style={styles.reminderTitle}>Morning</Text>
                        <Text style={styles.reminderSubtitle}>
                            Remind me in the morning
                        </Text>
                    </View>
                    <Switch
                        value={toggles.morning}
                        onValueChange={() => handleToggle('morning')}
                        trackColor={{ false: '#3a3a3e', true: '#4A9FE5' }}
                        thumbColor={'#ffffff'}
                    />
                </View>

                {/* Mid Day */}
                <View style={styles.reminderCard}>
                    <Text style={styles.reminderIcon}>⚙️</Text>
                    <View style={styles.reminderTextContainer}>
                        <Text style={styles.reminderTitle}>Mid Day</Text>
                        <Text style={styles.reminderSubtitle}>
                            Remind me in the afternoon
                        </Text>
                    </View>
                    <Switch
                        value={toggles.midday}
                        onValueChange={() => handleToggle('midday')}
                        trackColor={{ false: '#3a3a3e', true: '#4A9FE5' }}
                        thumbColor={'#ffffff'}
                    />
                </View>

                {/* Evening */}
                <View style={styles.reminderCard}>
                    <Text style={styles.reminderIcon}>🌙</Text>
                    <View style={styles.reminderTextContainer}>
                        <Text style={styles.reminderTitle}>Evening</Text>
                        <Text style={styles.reminderSubtitle}>
                            Remind me in the evening
                        </Text>
                    </View>
                    <Switch
                        value={toggles.evening}
                        onValueChange={() => handleToggle('evening')}
                        trackColor={{ false: '#3a3a3e', true: '#4A9FE5' }}
                        thumbColor={'#ffffff'}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
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
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        color: '#000000',
    },
    placeholder: {
        width: 36,
    },
    content: {
        paddingHorizontal: 24,
    },
    permissionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 14,
        paddingVertical: 18,
        paddingHorizontal: 18,
        gap: 14,
        marginTop: 8,
    },
    permissionIcon: {
        fontSize: 22,
    },
    permissionTextContainer: {
        flex: 1,
    },
    permissionTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: '#000000',
        marginBottom: 3,
    },
    permissionSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: '#888888',
    },
    sectionLabel: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: '#000000',
        marginTop: 28,
        marginBottom: 14,
        paddingLeft: 2,
    },
    reminderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 14,
        paddingVertical: 16,
        paddingHorizontal: 18,
        gap: 14,
        marginBottom: 10,
    },
    reminderIcon: {
        fontSize: 22,
    },
    reminderTextContainer: {
        flex: 1,
    },
    reminderTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: '#000000',
        marginBottom: 3,
    },
    reminderSubtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: '#888888',
    },
});
