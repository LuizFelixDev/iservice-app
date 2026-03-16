import { StyleSheet } from "react-native";
import { colors } from "../../Colors/Colors";

export const styles = StyleSheet.create({
  container: {
    height: "70%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 40
  },
  title:{
    fontSize: 35,
    fontWeight: "bold",
    color: colors.primary,
    alignSelf: "flex-start",
    marginStart: 50,
    marginTop: 35,
    marginBottom: 13
  },
  inputStyle:{
    backgroundColor: "#E5E5E5",
    borderRadius: 40,
    width: "80%",
    height: 55,
    marginTop:25,
    fontSize: 25,
    paddingLeft: 20
  },
  alterSenha:{
    marginTop: 10,
    alignSelf: "flex-end",
    marginEnd:47,
    marginBottom:10
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 40,
    width: "100%",
    height: 55,
    marginTop:25,
    marginBottom: 20
  },
  textButtom: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold"
  },
  singUpLine: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});