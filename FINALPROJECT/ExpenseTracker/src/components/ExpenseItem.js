import { View, Text } from 'react-native';

export default function ExpenseItem({ item }) {
    return (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text>{item.amount} €</Text>
        </View>
    );
}