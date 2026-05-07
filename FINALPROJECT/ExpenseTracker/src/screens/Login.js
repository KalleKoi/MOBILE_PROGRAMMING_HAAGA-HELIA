import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            Alert.alert("Login failed");
        }
    };

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            Alert.alert("Signup failed");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Card>
                <Card.Content>
                    <Text style={styles.title}>Login & Sign up</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password (6+ characters long)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Button mode="contained" onPress={handleLogin}>
                        Login
                    </Button>

                    <View style={{ height: 10 }} />

                    <Button mode="outlined" onPress={handleSignup}>
                        Sign up
                    </Button>
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
    }
});