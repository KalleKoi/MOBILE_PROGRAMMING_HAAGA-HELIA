import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View 
      style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white' // background color
      }}
    >
      <Text style={{ fontSize: 28, color: 'black' }}> 
        🎉 Hello Expo! 🎉
      </Text>
    </View>
  );
}
