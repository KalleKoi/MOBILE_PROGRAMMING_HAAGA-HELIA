// IMPORTS
import { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { PieChart, BarChart } from 'react-native-chart-kit';

import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';


export default function ExpenseChart() {

    // STATE TO HOLD EXPENSES
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {

        // GET USER ID AND PATH TO EXPENSES IN DATABASE
        const uid = auth.currentUser.uid;
        const itemsRef = ref(db, `users/${uid}/expenses`);

        const unsubscribe = onValue(itemsRef, (snapshot) => {

            // GET EXPENSES DATA AND UPDATE STATE
            const data = snapshot.val();
            setExpenses(data ? Object.values(data) : []);
        });

        // STOPS LISTENING TO DATABASE CHANGES WHEN DONE
        return () => unsubscribe();
    }, []);

    // ARRAY FOR UNIQUE CATEGORIES
    const categories = [];

    // LOOP THROUGH EXPENSES TO EXTRACT CATEGORIES, IF CATEGORY IS EMPTY ITS CONSIDERED "OTHER"
    for (const expense of expenses) {
        const category = (expense.category || 'Other')
            .toLowerCase()
            .trim();

        // CHECKS IF CATEGORY ALREADY EXISTS -> IF IT DOESN'T, ADD IT TO THE ARRAY
        if (!categories.includes(category)) {
            categories.push(category);
        }
    }

    // DATA FOR CHART
    const pieData = [];

    const barData = {
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    };

    for (const category of categories) {
        let total = 0;

        for (const expense of expenses) {
            const expCategory = (expense.category || 'Other')
                .toLowerCase()
                .trim();

            if (expCategory === category) {

                // CONVERT TO NUMBER SO THAT MATH CAN BE DONE, OTHERWISE IT WOULD CONCATENATE STRINGS INSTEAD OF ADDING NUMBERS
                let amount = Number(expense.amount);

                if (isNaN(amount)) {
                    amount = 0;
                }

                total += amount;
            }
        }

        // CAPITALIZE FIRST LETTER OF CATEGORY FOR DISPLAY
        const categoryName =
            category.charAt(0).toUpperCase() + category.slice(1);

        const color = getColor(category);

        pieData.push({
            name: categoryName,
            amount: total,
            color: color,
        });
        // FOR BARCHART PUSH I USED HELP OF CLAUDE
        barData.labels.push(categoryName);
        barData.datasets[0].data.push(total);
    }

    // FUNCTION TO ASSIGN COLORS TO CATEGORIES, REPEATS COLORS IF THERE ARE MORE CATEGORIES THAN COLORS    
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

    // NEEDED TO RENDER RESPONSIVE CHARTS PROPERLY
    const screenWidth = Dimensions.get('window').width;

    //CHART CONFIG THAT IS NEEDED FOR BARCHART
    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: () => '#6C63FF',
        labelColor: () => '#333333',
        barPercentage: 0.6,
    };


    return (
        <View style={{ padding: 20 }}>

            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                📊 Expenses pie chart
            </Text>

            <PieChart
                data={pieData}
                width={screenWidth - 40}
                height={220}
                accessor="amount"
                backgroundColor="white"
                paddingLeft="15"
                absolute
                chartConfig={{
                    color: () => '#000'
                }}
                style={{
                    marginTop: 10,
                    borderRadius: 8
                }}
            />

            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
                📊 Expenses bar chart
            </Text>

            <BarChart
                data={barData}
                width={screenWidth}
                height={220}
                fromZero
                yAxisLabel="€"
                chartConfig={{
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: () => '#6C63FF',
                    labelColor: () => '#333333',
                    barPercentage: 0.6,
                }}
            />

        </View>
    );
}