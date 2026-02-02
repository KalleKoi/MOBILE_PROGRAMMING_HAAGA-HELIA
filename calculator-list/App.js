import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function CalculatorScreen({ history, setHistory }) {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);

  const calculateSum = () => {
    const res = Number(num1) + Number(num2);
    setResult(res);
    setHistory(prev => [
      num1 + "+" + num2 + "=" + res,
      ...prev

    ]);
  };

  const calculateSubtraction = () => {
    const res = Number(num1) - Number(num2);
    setResult(res);
    setHistory(prev => [
      num1 + "-" + num2 + "=" + res,
      ...prev
    ]);
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
    </View>
  );
}

function HistoryScreen({ history }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <View>
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
        />
      </View>
    </View>
  );
}

export default function App() {

  const [history, setHistory] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen name="Calculator">
          {() => <CalculatorScreen history={history} setHistory={setHistory} />}
        </Tab.Screen>

        <Tab.Screen name="History">
          {() => <HistoryScreen history={history} />}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    textAlign: 'center',
  },
});
