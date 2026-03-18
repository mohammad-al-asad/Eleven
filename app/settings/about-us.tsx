import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGetAboutUsQuery } from '../../Redux/features/settings/aboutUsApi';

export default function AboutUsScreen() {
    const router = useRouter();
    const { data: aboutResponse, isLoading: isAboutLoading } = useGetAboutUsQuery({});
    
    const Container = Platform.OS === 'web' ? View : SafeAreaView;
    const cleanContent = aboutResponse?.data?.about?.replace(/<[^>]*>?/gm, '').trim() || 'No content available';

    return (
        <Container style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        if (router.canGoBack()) {
                            router.back();
                        } else {
                            router.replace('/settings');
                        }
                    }}
                    activeOpacity={0.7}
                    style={styles.backButton}
                >
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>About Us</Text>
                <View style={styles.placeholder} />
            </View>

            {isAboutLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#94CDFA" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.aboutText}>{cleanContent}</Text>
                </ScrollView>
            )}
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
    headerTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 22,
        color: '#000000',
    },
    placeholder: {
        width: 36,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
    },
    aboutText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#333333',
        lineHeight: 26,
    },
});
