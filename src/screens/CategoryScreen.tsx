import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import type CategoryType from "../types/CategoryType";
import { useState } from "react";

export default function CategoryScreen() {
  const URL: string = "https://baa2-37-52-79-159.ngrok-free.app/categories";
  const [category, setCategory] = useState<CategoryType>({
    name: "",
    image: "",
    color: "",
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category Screen</Text>
      <TextInput
        value={category.name}
        onChangeText={(text) => {
          setCategory({ ...category, name: text });
        }}
        style={styles.input}
        placeholder="title"
      />
      <TextInput
        value={category.image}
        onChangeText={(text) => {
          setCategory({ ...category, image: text });
        }}
        style={styles.input}
        placeholder="image"
      />
      <TextInput
        value={category.color}
        onChangeText={(text) => {
          setCategory({ ...category, color: text });
        }}
        style={styles.input}
        placeholder="color"
      />
      <Button
        title="Add"
        onPress={() => {
          console.log("Push");
          fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
          })
            .then()
            .catch((err) => console.log(err));
        }}
      />
      <Text style={{ textAlign: "center" }}>
        {category.name} {category.color} {category.image}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    gap: 20,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
  },
});

 