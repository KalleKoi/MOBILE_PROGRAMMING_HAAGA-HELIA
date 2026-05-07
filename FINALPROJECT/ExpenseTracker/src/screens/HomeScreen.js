import { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { db, auth } from '../../firebase';
import { ref, push, onValue } from 'firebase/database';

export default function HomeScreen() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);


    useEffect(() => {
        const uid = auth.currentUser.uid;
        const itemsRef = ref(db, `users/${uid}/expenses`);

        const unsubscribe = onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const loadedExpenses = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }));

                setExpenses(loadedExpenses);
            } else {
                setExpenses([]);
            }
        });

        return () => unsubscribe();
    }, []);


    async function addExpense() {
        if (!amount.trim()) return;

        const uid = auth.currentUser.uid;
        const expensesRef = ref(db, `users/${uid}/expenses`);

        await push(expensesRef, {
            amount: parseFloat(amount.replace(',', '.')),
            description: description.trim() ? description : null,
            category: category.trim() ? category : null,
            createdAt: Date.now()
        });

        setAmount('');
        setDescription('');
        setCategory('');
    }


    // Calculation for total expenses of the current day and month
    const startOfToday = new Date().setHours(0, 0, 0, 0);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    let totalToday = 0;
    let totalThisMonth = 0;

    for (const e of expenses) {
        if (e.createdAt >= startOfMonth) {
            totalThisMonth += +e.amount || 0;
        }
        if (e.createdAt >= startOfToday) {
            totalToday += +e.amount || 0;
        }
    }




    return (
        <View style={{ padding: 20, flex: 1 }}>

            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                Expense Tracker
            </Text>

            <Button
                mode="contained"
                onPress={() => auth.signOut()}
                style={{ position: 'absolute', top: 10, right: 20 }}
            >
                Logout
            </Button>

            <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: '600' }}>
                💰 Today: {totalToday.toFixed(2)} €
                💰 This Month: {totalThisMonth.toFixed(2)} €
            </Text>

            <TextInput
                placeholder="Enter amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            />

            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            />

            <TextInput
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            />

            <Button mode="contained" onPress={addExpense}>
                Add Expense
            </Button>

            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={{ marginTop: 10 }}>
                        <Card.Content>
                            <Text>€ {Number(item.amount).toFixed(2)}</Text>
                            <Text>{item.description}</Text>
                            <Text style={{ opacity: 0.6 }}>
                                {item.category}
                            </Text>
                        </Card.Content>
                    </Card>
                )}
            />

        </View>
    );
}