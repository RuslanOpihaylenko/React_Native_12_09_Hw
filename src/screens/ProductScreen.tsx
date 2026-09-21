import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useProductStore } from "../stores/ProductStore"; 

export default function ProductScreen() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const removeProduct = useProductStore((state) => state.removeProduct);

  const handleAddProduct = () => {
    if (!title.trim() || !price.trim()) {
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: title.trim(),
      price: Number(price),
    };

    addProduct(newProduct);

    setTitle("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Додавання продукту</Text>

      {/* Форма */}
      <TextInput
        style={styles.input}
        placeholder="Назва продукту"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Ціна"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddProduct}
      >
        <Text style={styles.addButtonText}>
          Додати продукт
        </Text>
      </TouchableOpacity>

      {/* Список продуктів */}
      <Text style={styles.productsTitle}>
        Всі продукти
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <View>
              <Text style={styles.productTitle}>
                {item.title}
              </Text>

              <Text style={styles.productPrice}>
                {item.price} грн
              </Text>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeProduct(item.id)}
            >
              <Text style={styles.deleteButtonText}>
                Видалити
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Продуктів поки немає
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
  },

  addButton: {
    height: 50,
    backgroundColor: "#2E7D32",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  productsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },

  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  productPrice: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },

  deleteButton: {
    backgroundColor: "#D32F2F",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    color: "#888888",
    marginTop: 20,
  },
});