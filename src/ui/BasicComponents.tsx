import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";

/**
 * Базові компоненти React Native.
 *
 * View   -> контейнер, приблизний аналог div у Web.
 * Text   -> текст. У React Native текст потрібно поміщати всередину Text.
 * Image  -> зображення.
 * ScrollView -> контейнер, вміст якого можна прокручувати.
 */
export function BasicComponents() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{ uri: "https://picsum.photos/800/600" }}
        style={{ flex: 1 }}
      >
      <Text style={styles.title}>Базові компоненти</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>View</Text>
        <Text>
          View використовується для побудови структури та розкладки елементів.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Text</Text>
        <Text style={styles.price}>799 ₴</Text>
        <Text>Текст може мати власний стиль.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Image</Text>
        <Image
          source={{
            uri: "https://picsum.photos/400/200",
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>ScrollView</Text>
        <Text>
          ScrollView дозволяє прокручувати весь вміст. Він добре підходить, коли
          елементів небагато.
        </Text>
      </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#eee",
    gap: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
});
