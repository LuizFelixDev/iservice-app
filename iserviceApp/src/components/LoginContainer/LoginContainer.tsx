import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import {styles} from "./styles"
import { colors } from '../../Colors/Colors';
import ButtonsContainer from "../LoginContainer/ButtonsContainer/ButtonsContainer"



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
      <TouchableOpacity style={styles.alterSenha}>
        <Text style={{color: colors.secondary}}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width: "80%"}}>
        <View style={styles.button}>
          <Text style={styles.textButtom}>Login</Text>
        </View>
      </TouchableOpacity>
      <Text style={{color: "#9C9C9D"}}>
        ────────  Login com  ────────
      </Text>

      <ButtonsContainer/>

      <View style={styles.singUpLine}>
        <Text style={{color: "#9C9C9D", marginEnd: 5, marginStart: 40}}>
          Ainda não tem conta?
        </Text>
        <TouchableOpacity style={styles.alterSenha}>
          <Text style={{color: colors.secondary}}>Nova conta</Text>
        </TouchableOpacity>
      </View>

      
      <StatusBar style="auto" />
    </View>
  );
}