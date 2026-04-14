import { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { db } from '../../firebase';
import { ref, push, onValue } from 'firebase/database';

export default function HomeScreen() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);


    const expensesRef = ref(db, 'expenses');


    useEffect(() => {
        const itemsRef = ref(db, 'expenses');

        const unsubscribe = onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setExpenses(Object.values(data));
            } else {
                setExpenses([]);
            }
        });

        return () => unsubscribe();
    }, []);


    async function addExpense() {
        if (!amount.trim()) return;

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

    const startOfToday = new Date().setHours(0, 0, 0, 0);

    let totalToday = 0;

    for (const e of expenses) {
        if (e.createdAt >= startOfToday) {
            totalToday += +e.amount || 0;
        }
    }

    return (
        <View style={{ padding: 20, flex: 1 }}>

            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                Expense Tracker
            </Text>

            <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: '600' }}>
                💰 Today: {totalToday.toFixed(2)} €
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