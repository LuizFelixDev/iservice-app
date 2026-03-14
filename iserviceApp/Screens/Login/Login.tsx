import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {styles} from "../Home/homeStyle"

export default function Login() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}