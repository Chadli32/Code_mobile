import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import colors from "../utile/colors";

export default CategoryItem = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.Thistle,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 50,
    marginBottom: 5,
  },

  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
