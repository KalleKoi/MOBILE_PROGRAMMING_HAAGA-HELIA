import { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';

import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';

export default function ExpenseChart() {
    const [expenses, setExpenses] = useState([]);


    useEffect(() => {
        const uid = auth.currentUser.uid;
        const itemsRef = ref(db, `users/${uid}/expenses`);

        const unsubscribe = onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            setExpenses(data ? Object.values(data) : []);
        });

        return () => unsubscribe();
    }, []);


    const categories = [];

    for (const expense of expenses) {
        const category = (expense.category || 'Other')
            .toLowerCase()
            .trim();

        if (!categories.includes(category)) {
            categories.push(category);
        }
    }


    const pieData = [];

    for (const category of categories) {
        let total = 0;

        for (const expense of expenses) {
            const expCategory = (expense.category || 'Other')
                .toLowerCase()
                .trim();

            if (expCategory === category) {
                total += +expense.amount || 0;
            }
        }

        pieData.push({
            name: category.charAt(0).toUpperCase() + category.slice(1),
            amount: total,
            color: getColor(category),
            legendFontColor: '#333',
            legendFontSize: 12
        });
    }


    function getColor(category) {
        const colors = [
            '#ff6384',
            '#36a2eb',
            '#ffce56',
            '#4bc0c0',
            '#9966ff',
            '#ff9f40'
        ];

        const index = categories.indexOf(category);
        return colors[index % colors.length];
    }

    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={{ padding: 20 }}>

            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                📊 Expenses per category
            </Text>

            <PieChart
                data={pieData}
                width={screenWidth - 40}
                height={220}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                chartConfig={{
                    color: () => '#000'
                }}
            />

        </View>
    );
}