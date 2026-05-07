import { useState } from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Login() {
    // STATES FOR EMAIL AND PASSWORD INPUTS
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // FUNCTION TO HANDLE LOGIN
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            Alert.alert("Login failed");
        }
    };

    // FUNCTION TO HANDLE SIGNUP
    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            Alert.alert("Signup failed");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Card>
                <Card.Content>
                    <Text style={{ fontSize: 22, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' }}>
                        Login & Sign up
                    </Text>

                    <TextInput
                        style={{ borderWidth: 1, marginBottom: 10 }}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={{ borderWidth: 1, marginBottom: 10 }}
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