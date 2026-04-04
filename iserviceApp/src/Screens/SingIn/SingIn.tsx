import React from 'react';
import { View} from 'react-native';
import {styles} from "../SingIn/singStyles"
import SinginContainer from "../../components/SinginContainer/SiginContainer"


export default function SingIn({ navigation }: any) {
  return (
    <View style={styles.container}>
      <SinginContainer/>
    </View>
  );
}

      {/* <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar para Login</Text>
      </TouchableOpacity> */}