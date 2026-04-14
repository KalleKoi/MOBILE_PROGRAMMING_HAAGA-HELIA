import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function StatsScreen() {

    return (
        <View style={{ padding: 20 }}>

            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                Stats
            </Text>

            <Card style={{ marginTop: 20 }}>
                <Card.Content>
                    <Text>Total spending graph</Text>
                </Card.Content>
            </Card>

        </View>
    );
}