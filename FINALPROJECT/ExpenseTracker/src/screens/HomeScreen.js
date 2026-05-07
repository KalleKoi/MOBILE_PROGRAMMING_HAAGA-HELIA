import { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { db, auth } from '../../firebase';
import { ref, push, onValue } from 'firebase/database';

export default function HomeScreen() {
    // STATES FOR NEW EXPENSE INPUTS AND EXPENSES LIST
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);



    useEffect(() => {

        // GET USER ID AND PATH TO EXPENSES IN DATABASE
        const uid = auth.currentUser.uid;
        const itemsRef = ref(db, `users/${uid}/expenses`);

        // LISTENS TO CHANGES IN DATABASE,
        const unsubscribe = onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {

                // ARRAY TO HOLD FORMATTED EXPENSES
                const loadedExpenses = [];

                // LOOP THROUGH EXPENSES IN DATABASE, FORMAT THEM AND PUSH TO ARRAY
                for (const key in data) {


                    loadedExpenses.push({
                        id: key,
                        amount: data[key].amount,
                        description: data[key].description,
                        category: data[key].category,
                        createdAt: data[key].createdAt
                    });
                }

                // SAVE FORMATTED EXPENSES TO STATE
                setExpenses(loadedExpenses);

                // IF NO DATA, SET EXPENSES TO EMPTY ARRAY
            } else {
                setExpenses([]);
            }
        });

        // STOP LISTENING TO DATABASE
        return () => unsubscribe();
    }, []);



    // FUNCTION TO ADD EXPENSES TO DATABASE
    async function addExpense() {

        // IF AMOUNT IS EMPTY OR NOT A NUMBER, DOES NOTHING
        if (!amount.trim())
            return;

        // GETS CURRENT USER ID AND PATH TO EXPENSES IN DATABASE
        const uid = auth.currentUser.uid;
        const expensesRef = ref(db, `users/${uid}/expenses`);

        // CONVERTS AMOUNT TO NUMBER, IF IT'S NOT A NUMBER, DOES NOTHING
        const numberAmount = Number(amount.replace(',', '.'));
        if (isNaN(numberAmount))
            return;

        // PUSHES NEW EXPENSE TO DATABASE WITH AMOUNT, DESCRIPTION, CATEGORY AND CREATED AT TIMESTAMP
        // FOR CALCULATING TODAY'S AND THIS MONTH'S EXPENSES

        await push(expensesRef, {
            amount: numberAmount,
            description: description.trim() ? description : null,
            category: category.trim() ? category : null,
            createdAt: Date.now()
        });

        // CLEAR ALL INPUTS AFTER ADDING EXPENSE

        setAmount('');
        setDescription('');
        setCategory('');
    }


    // CALCULATION FOR TODAY'S AND THIS MONTH'S EXPENSES

    const now = new Date();
    const startOfToday = new Date().setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    let totalToday = 0;
    let totalThisMonth = 0;

    for (const e of expenses) {
        let amount = Number(e.amount);

        if (isNaN(amount)) {
            amount = 0;
        }

        if (e.createdAt >= startOfMonth) {
            totalThisMonth += amount;
        }

        if (e.createdAt >= startOfToday) {
            totalToday += amount;
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

            <Text style={{ marginVertical: 10, fontSize: 15, fontWeight: '600' }}>
                Today: {totalToday.toFixed(2)} €
                This Month: {totalThisMonth.toFixed(2)} €
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