import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * SafeAreaView
 *   └── ScrollView
 *        ├── View
 *        ├── Image
 *        ├── Text
 *        └── Pressable
 */
export function LayoutExample() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Мій магазин</Text>

        <View style={styles.productCard}>
          <Image
            source={{ uri: "https://picsum.photos/500/300" }}
            style={styles.image}
          />

          <Text style={styles.productName}>Сучасні навушники</Text>

          <Text style={styles.description}>
            Бездротові навушники для музики та роботи.
          </Text>

          <View style={styles.bottom}>
            <Text style={styles.price}>2499 ₴</Text>

            <Pressable
              style={({ pressed }) => [
                styles.buyButton,
                pressed && styles.pressed,
              ]}
              onPress={() => {
                console.log("Товар додано");
                Alert.alert("Успіх", "Товар додано до кошика");
              }}
            >
              <Text style={styles.buyText}>До кошика</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  productCard: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#eee",
    gap: 12,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
  },
  buyButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#333",
  },
  pressed: {
    opacity: 0.5,
  },
  buyText: {
    color: "white",
    fontWeight: "700",
  },
});
