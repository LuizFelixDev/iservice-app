import React from 'react';
import { View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from "../SingIn/singStyles";
import SiginContainer from "../../components/SinginContainer/SiginContainer";
import Logo from "../../../assets/iservice-horizontal-inverted (1).png"

export default function SingIn({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.nome}/>
      <SiginContainer navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}