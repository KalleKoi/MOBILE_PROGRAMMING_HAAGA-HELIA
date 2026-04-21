import { View, Text } from 'react-native';
// WORK IN PROGRESS, NOT USED YET
export default function ExpenseItem({ item }) {
    return (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text>{item.amount} €</Text>
        </View>
    );
}