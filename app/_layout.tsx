import { Stack } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../context/AppContext';
import ReduxProvider from '../Redux/ReduxProvider';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f7' }}>
                <ActivityIndicator size="large" color="#94CDFA" />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <ReduxProvider>
                <AppProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="index" />
                        <Stack.Screen name="welcome" />
                        <Stack.Screen name="home/index" />
                        <Stack.Screen name="settings" />
                        <Stack.Screen name="finish/index" />
                        <Stack.Screen name="morning" />
                        <Stack.Screen name="midday" />
                        <Stack.Screen name="night" />
                        <Stack.Screen name="mid-day/index" />
                    </Stack>
                </AppProvider>
            </ReduxProvider>
        </SafeAreaProvider>
    );
}

