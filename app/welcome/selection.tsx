import { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext, PathOption } from '../../context/AppContext';

export default function SelectionScreen() {
    const router = useRouter();
    const { setSelectedPath } = useAppContext();
    const [selected, setSelected] = useState<PathOption | null>(null);

    const Container = Platform.OS === 'web' ? View : SafeAreaView;

    const handleContinue = () => {
        if (selected) {
            setSelectedPath(selected);
            router.push('/home');
        }
    };

    return (
        <Container style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>
                How would you like to begin{'\n'}practicing Step 11?
            </Text>

            {/* Option Cards */}
            <View style={styles.cardsContainer}>
                {/* Dr. Bob Mode */}
                <TouchableOpacity
                    style={[
                        styles.card,
                        selected === 'dr_bob' && styles.cardSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setSelected('dr_bob')}
                >
                    <View style={styles.radioRow}>
                        <View style={styles.radioOuter}>
                            {selected === 'dr_bob' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardTitle}>
                                Dr. Bob Mode – 2 Way Prayer
                            </Text>
                            <Text style={styles.cardDescription}>
                                Read. Be Still. Ask. Write. Test. Obey. Our co-founder Dr. Bob
                                called it Two Way Prayer and this is how he practiced Step 11.
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Big Book Thumper */}
                <TouchableOpacity
                    style={[
                        styles.card,
                        selected === 'big_book' && styles.cardSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setSelected('big_book')}
                >
                    <View style={styles.radioRow}>
                        <View style={styles.radioOuter}>
                            {selected === 'big_book' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardTitle}>Big Book Thumper</Text>
                            <Text style={styles.cardDescription}>
                                Page 86–88. Line by line exactly like the big book.
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        !selected && styles.buttonDisabled,
                    ]}
                    activeOpacity={selected ? 0.8 : 1}
                    disabled={!selected}
                    onPress={handleContinue}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            !selected && styles.buttonTextDisabled,
                        ]}
                    >
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#94CDFA',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'web' ? 48 : 0,
    },
    header: {
        fontFamily: 'Inter_700Bold',
        fontSize: 22,
        color: '#000000',
        textAlign: 'center',
        marginTop: 48,
        marginBottom: 36,
        lineHeight: 32,
    },
    cardsContainer: {
        gap: 16,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cardSelected: {
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        bordercolor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ffffff',
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 17,
        color: '#000000',
        marginBottom: 6,
    },
    cardDescription: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.85)',
        lineHeight: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 36,
        left: 24,
        right: 24,
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: '#1a1a1a',
        letterSpacing: 0.3,
    },
    buttonTextDisabled: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
});
