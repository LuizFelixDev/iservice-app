import React from 'react';
import { View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from "../Login/loginStyles";
import SiginContainer from "../../components/SinginContainer/SiginContainer";

export default function SingIn({ navigation }: any) {
  return (
    <View style={styles.container}>
      <SiginContainer navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}