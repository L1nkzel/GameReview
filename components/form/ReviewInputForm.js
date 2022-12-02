import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const ReviewInputForm = ({ style, inputCfg }) => {
  const inputStyles = [styles.input];
  if (inputCfg && inputCfg.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput style={[inputStyles, style]} {...inputCfg} /> 
    </View>
  );
};

export default ReviewInputForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },

  input: {
    backgroundColor: "#ffffffa2",
    padding: 8,
    width: 300,
    borderRadius: 10,
  },

  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
    maxHeight: 300,
  },
});
