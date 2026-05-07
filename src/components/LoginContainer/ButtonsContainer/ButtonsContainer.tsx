import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Google from "../../../../assets/simbolo-do-google.png"
import Facebook from "../../../../assets/facebook.png"
import Apple from "../../../../assets/logotipo-da-apple.png"

export default function ButtonsContainer() {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
            <Image source={Google}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
            <Image source={Facebook}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
            <Image source={Apple}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10
  },
  button: {
    backgroundColor: "#E5E5E5",
    width: 55,
    height: 45, 
    borderRadius:10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    backgroundColor: "#E5E5E5",
    width: 55,
    height: 45, 
    marginStart: 10,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
