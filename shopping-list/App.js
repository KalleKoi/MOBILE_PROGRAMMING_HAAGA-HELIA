import { StyleSheet, Text, View, Button, TextInput, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handlePress = () => {
    setTodos([...todos, { key: todo }])
    setTodo('');
  }

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Shopping list</Text>
        </View>

        <View>
          <TextInput style={styles.input}
            value={todo}
            onChangeText={text => setTodo(text)}
            placeholder="Enter todo item"
          />
          <Button title="Add" onPress={handlePress} />
        </View>

        <View style={{ marginTop: 20, padding: 10 }}>
          <FlatList
            data={todos}
            renderItem={({ item }) => <Text style={styles.listItem}>• {item.key}</Text>}
          />
        </View>
      </View >
    </TouchableWithoutFeedback>
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
  listItem: {
    fontSize: 18,
    paddingVertical: 4,
    paddingLeft: 10,
  }

});
