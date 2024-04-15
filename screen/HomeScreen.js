import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import colors from "../utile/colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <FontAwesome name="gears" size={30} color="grey" />
        <Text
          style={{ color: colors.Thistle, fontSize: 50, fontWeight: "bold" }}
        >
          QUIZ
        </Text>
        <FontAwesome5 name="brain" size={30} color="grey" />
      </View>
      <TouchableOpacity style={styles.containerButton}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "red", //colors.greyBackGround,
    opacity: 0.7,
  },
  containerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
    opacity: 0.7,
    shadow: 0.5,
  },
  image: {
    objectFit: "cover",
    shadowOpacity: 0.7,
  },
  containerButton: {
    backgroundColor: colors.Thistle,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
