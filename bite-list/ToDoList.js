import {
    View,
    StyleSheet,
    Button,
    TextInput,
    FlatList,
    Text
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ToDoList() {
    const [todoTitle, setTodoTitle] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAdd = () => {
        setTodos([todoTitle, ...todos]);
    }


    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Enter title here"
                value={todoTitle}
                onChangeText={text => setTodoTitle(text)}
            />
            <Button title="Add Todo" onPress={handleAdd} />
            <FlatList
                data={todos}
                renderItem={({ item }) =>
                    <View style={styles.todoItem}>
                        <Text style={styles.todoItem}>{item}</Text>
                    </View>
                }
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 50,
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    todoItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        fontSize: 16,
    }


});
