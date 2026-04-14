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
        const unsubscribe = onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();

            if (!data) {
                setExpenses([]);
                return;
            }

            const list = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));

            setExpenses(list);
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

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const totalToday = expenses
        .filter(item => item.createdAt >= startOfToday.getTime())
        .reduce((sum, item) => {
            return sum + Number(item.amount || 0);
        }, 0);

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
                placeholder="Description (e.g. Coffee)"
                value={description}
                onChangeText={setDescription}
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            />

            <TextInput
                placeholder="Category (food, rent, fun)"
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