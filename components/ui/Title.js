import { StyleSheet, Text, Platform } from "react-native";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontWeight:"bold",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    // borderWidth: Platform.select({ios: 0, android: 2}),
    // borderColor: "black",
    // backgroundColor:"gold",
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    maxWidth: '80%',
    width: 300
  },
});
