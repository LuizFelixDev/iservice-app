import { StyleSheet } from "react-native";
import { colors } from "../../Colors/Colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: colors.primary
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20
    },
    button: {
      marginTop: 10
    },
    nome:{
      width:300,
      height:100,
      marginTop: 50
    }

  });