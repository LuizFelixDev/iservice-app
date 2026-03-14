import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import {styles} from "./styles"

export default function LoginContainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
      style={styles.inputStyle} 
      placeholder='Email' 
      placeholderTextColor={"#9C9C9D"}
      />
      <TextInput style={styles.inputStyle} 
      placeholder='Senha' 
      placeholderTextColor={"#9C9C9D"}
      />
      <StatusBar style="auto" />
    </View>
  );
}