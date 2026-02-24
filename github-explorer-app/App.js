import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handlefetch = async () => {
    setIsFetching(true);
    try {
      const response = await fetch("https://api.github.com/search/repositories?q=" + keyword);
      if (!response.ok) throw new Error("Error when fetching repositories");
      const data = await response.json();
      setRepositories(data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Enter keyword"
          value={keyword}
          onChangeText={text => setKeyword(text)}
          style={styles.input}
        />

        <View style={styles.buttonWrapper}>
          <Button title="Find" onPress={handlefetch} />
          {isFetching && <ActivityIndicator style={{ marginTop: 10 }} size="small" color="#0000ff" />}
        </View>

        <FlatList
          data={repositories}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          renderItem={({ item }) =>
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.full_name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          }
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },

  buttonWrapper: {
    marginBottom: 12,
  },

  list: {
    flex: 1,
  },

  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  itemTitle: {
    fontWeight: '600',
  },

  itemDescription: {
    color: '#555',
  },
});
