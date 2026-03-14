import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {styles} from "./loginStyles"
import LoginContainer from "../../components/LoginContainer/LoginContainer"

export default function Login() {
  return (
    <View style={styles.container}>
      <LoginContainer/>
      <StatusBar style="auto" />
    </View>
  );
}