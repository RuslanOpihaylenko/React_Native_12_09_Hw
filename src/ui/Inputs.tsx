import React, { useState } from "react";
import { View, Text, TextInput, Switch, StyleSheet } from "react-native";

/**
 * Компоненти введення даних.
 *
 * TextInput:
 * - поле для введення тексту;
 * - value зберігає поточне значення;
 * - onChangeText спрацьовує при зміні тексту.
 *
 * Switch:
 * - перемикач true / false.
 */
export function Inputs() {
  const [name, setName] = useState("");
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inputs</Text>

      <Text style={styles.label}>Ваше ім'я</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Введіть ім'я"
        autoCapitalize="words"
        style={styles.input}
      />

      <Text style={styles.result}>Привіт, {name || "користувач"}!</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Сповіщення</Text>

        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <Text>Сповіщення: {notifications ? "увімкнені" : "вимкнені"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
  },
  result: {
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

/*
// 1. Для ввода цифр (числовой пад)
<TextInput keyboardType="numeric" />

// 2. Для ввода номеров телефонов (с символами +, #, *)
<TextInput keyboardType="phone-pad" />

// 3. Для ввода Email (добавляет символ @ и точку)
<TextInput keyboardType="email-address" />

// 4. Только целые положительные числа (без знаков и точек)
<TextInput keyboardType="number-pad" />

// 5. Для ввода URL-адресов (добавляет .com, / и т.д.)
<TextInput keyboardType="url" />
*/
