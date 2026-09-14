import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

/**
 * Кнопки React Native.
 *
 * Button:
 * - простий готовий компонент;
 * - добре підходить для простих дій.
 *
 * Pressable:
 * - дає найбільше контролю;
 * - має onPress, onPressIn, onPressOut, onLongPress;
 * - через pressed можна змінювати стиль під час натискання.
 *
 * TouchableOpacity:
 * - старіший, але все ще корисний спосіб зробити елемент натискуваним;
 * - автоматично змінює opacity.
 */
export function Buttons() {
  const [message, setMessage] = useState("Натисніть кнопку");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Кнопки</Text>

      <Button
        title="Button"
        onPress={() => setMessage("Натиснули Button")}
      />

      <Pressable
        onPress={() => setMessage("onPress")}
        onPressIn={() => console.log("onPressIn")}
        onPressOut={() => console.log("onPressOut")}
        onLongPress={() => setMessage("Довге натискання")}
        hitSlop={10}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressed,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.buttonText}>
            {pressed ? "Натискається..." : "Pressable"}
          </Text>
        )}
      </Pressable>

      <TouchableOpacity
        onPress={() => setMessage("Натиснули TouchableOpacity")}
        style={styles.touchable}
      >
        <Text style={styles.buttonText}>TouchableOpacity</Text>
      </TouchableOpacity>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  pressable: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#333",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
    transform: [{ scale: 0.98 }],
  },
  touchable: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#777",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  message: {
    fontSize: 18,
  },
});
