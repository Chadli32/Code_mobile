import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import colors from "../utile/colors";
import categoriesName from "../utile/CategoriesName";
import CategoryItem from "../components/CategoryItem";
import { useCallback } from "react";
import DataQuiz from "../utile/DataQuiz";

export default function CategoryScreen() {
  const onSubmit = useCallback(async (itemKey) => {
    await DataQuiz(itemKey);
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}> Category Quiz</Text>
      </View>

      <FlatList
        data={Object.keys(categoriesName)}
        renderItem={(itemData) => {
          const categoryKey = itemData.item;
          const categoryString = categoriesName[categoryKey];

          return (
            <CategoryItem
              text={categoryString}
              onPress={() => onSubmit(categoryKey)}
            />
          );
        }}
      />
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
  containerTitle: {
    paddingVertical: 10,
    marginVertical: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
