import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import { colors } from '../../Colors/Colors';
import ButtonsContainer from "../LoginContainer/ButtonsContainer/ButtonsContainer";

export default function LoginContainer({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Conta</Text>
      <TextInput 
        style={styles.inputStyle} 
        placeholder='Email' 
        placeholderTextColor={"#9C9C9D"}
      />
      <TextInput 
        style={styles.inputStyle} 
        placeholder='Senha' 
        placeholderTextColor={"#9C9C9D"}
        secureTextEntry
      />
      <TextInput 
        style={styles.inputStyle} 
        placeholder='Confirmar senha' 
        placeholderTextColor={"#9C9C9D"}
        secureTextEntry
      />
      <TextInput 
        style={styles.inputStyle} 
        placeholder='Email' 
        placeholderTextColor={"#9C9C9D"}
      />
      
      <TouchableOpacity style={{width: "80%"}}>
        <View style={styles.button}>
          <Text style={styles.textButtom}>Nova Conta</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}