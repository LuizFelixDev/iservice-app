import { StyleSheet } from "react-native";
import { colors } from "../../Colors/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.primary
  },
  logo:{
    width:150,
    height:150,
    borderRadius:40,
    marginBottom: 30
  }
});