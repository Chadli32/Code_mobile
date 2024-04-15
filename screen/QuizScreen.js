import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../utile/colors";

export default function QuizScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerQuestion}>
        <Text style={styles.titleNumber}> 01 </Text>
        <Text style={styles.title}> Question </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.containerButton}>
          <Text style={styles.buttonText}> A - Proposition de réponse 1</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.containerButton}>
          <Text style={styles.buttonText}> B - Proposition de réponse 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.greyBackGround,
    opacity: 0.7,
  },
  containerQuestion: {
    paddingVertical: 10,
    marginVertical: 50,
    alignItems: "center",
  },
  containerButton: {
    backgroundColor: colors.Thistle,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 50,
  },

  buttonText: {
    backgroundColor: colors.Thistle,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "flex-end",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: colors.BackGroungQuestion,
    color: "white",
    borderRadius: 25,
    padding: 5,
    height: 100,
  },
  titleNumber: {
    textAlign: "center",
    color: "white",
    backgroundColor: colors.BackGroungQuestion,
    width: 50,
    paddingTop: 10,
    fontWeight: "bold",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});
