import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import { styles } from "./loginStyles";
import LoginContainer from "../../components/LoginContainer/LoginContainer";
import logo from "../../../assets/logo.png";

export default function Login({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <LoginContainer navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}