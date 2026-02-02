import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);

  const calculateSum = () => {
    const res = Number(num1) + Number(num2);
    setResult(res);
    setHistory(prev => [
      num1 + "+" + num2 + "=" + res,
      ...prev

    ]);
  };

  const calculateSubtraction = () => {
    setResult(Number(num1) - Number(num2));
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter first number"
        value={num1}
        onChangeText={setNum1}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter second number"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.buttonContainer}>
        <Button title="Sum" onPress={calculateSum} />
        <Button title="Subtract" onPress={calculateSubtraction} />
        <Button title="Dismiss Keyboard" onPress={() => Keyboard.dismiss()} />
      </View>

      <Text style={styles.result}>Result: {result}</Text>
      <View>
        <Text style={styles.title}>History</Text>

        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 15

  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  result: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  }
});
