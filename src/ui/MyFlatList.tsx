import { FlatList, StyleSheet, Text } from "react-native";

export default function MyFlatList() {
  return (
    <FlatList
      horizontal
      data={["ts", "js", "jsx", "tsx "]}
      renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.listContent} //внутрішній контейнер
      style={styles.flatListContainer}
    />
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 0, // не дає FlatList займати весь вертикальний екран
    marginVertical: 20, //відступ зверху та знизу
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "center", // центрує елементи FlatList по горизонталі
    alignItems: "center", // центрує елементи FlatList по вертикалі
    borderWidth: 1, // додає рамку навколо FlatList
    borderColor: "black",
  },
  item: {
    marginHorizontal: 10,
    fontSize: 18, // встановлює розмір шрифту всередині FlatList
    color: "white", // встановлює колір тексту всередині FlatList
  },
});
