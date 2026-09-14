import React from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
} from "react-native";

type Product = {
  id: string;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: "1", name: "Ноутбук", price: 35000 },
  { id: "2", name: "Телефон", price: 22000 },
  { id: "3", name: "Навушники", price: 3000 },
];

const sections = [
  {
    title: "Популярні",
    data: ["Ноутбук", "Телефон"],
  },
  {
    title: "Аксесуари",
    data: ["Навушники", "Мишка"],
  },
];

/**
 * FlatList:
 * - використовується для великих списків;
 * - React Native рендерить лише потрібну частину елементів.
 *
 * SectionList:
 * - список, розділений на секції.
 */
export function Lists() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlatList</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.price} ₴</Text>
          </View>
        )}
      />

      <Text style={styles.title}>SectionList</Text>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <Text style={styles.sectionItem}>{item}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
  },
  item: {
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "600",
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },
  sectionItem: {
    padding: 10,
  },
});
