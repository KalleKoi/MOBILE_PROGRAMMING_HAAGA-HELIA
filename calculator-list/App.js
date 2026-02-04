import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function CalculatorScreen({ navigation }) {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);

  const calculateSum = () => {
    const res = Number(num1) + Number(num2);
    setResult(res);
    setHistory(prev => [`${num1} + ${num2} = ${res}`, ...prev]);
  };

  const calculateSubtraction = () => {
    const res = Number(num1) - Number(num2);
    setResult(res);
    setHistory(prev => [`${num1} - ${num2} = ${res}`, ...prev]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First number"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        placeholder="Second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.buttonContainer}>
        <Button title="Sum" onPress={calculateSum} />
        <Button title="Subtract" onPress={calculateSubtraction} />
        <Button title="Dismiss Keyboard" onPress={() => Keyboard.dismiss()} />
      </View>

      <Text style={styles.result}>Result: {result}</Text>
      <Button
        title="View History"
        onPress={() => navigation.navigate('History', { history })}
      />
    </View>
  );
}

function HistoryScreen({ route }) {
  const { history = [] } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.todo}>• {item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  result: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  todo: {
    fontSize: 18,
    paddingVertical: 5
  },
});
