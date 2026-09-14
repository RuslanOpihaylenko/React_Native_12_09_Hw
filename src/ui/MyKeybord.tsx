import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

/**
 * Налаштування клавіатури в TextInput
 *
 * keyboardType:
 *   default      - звичайна клавіатура
 *   email-address - клавіатура для email
 *   phone-pad    - телефонна клавіатура
 *   numeric      - цифри
 *   decimal-pad  - цифри з десятковою крапкою
 *
 * autoCapitalize:
 *   none        - не робити першу літеру великою
 *   sentences   - перша літера речення велика
 *   words       - перша літера кожного слова велика
 *   characters   - усі літери великі
 *
 * autoCorrect:
 *   true / false - автоматичне виправлення тексту
 *
 * secureTextEntry:
 *   true - приховує введений текст (пароль)
 *
 * returnKeyType:
 *   визначає вигляд кнопки Enter на клавіатурі
 */

export function MyKeyboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Налаштування клавіатури</Text>

        {/* Звичайний текст */}
        <Text style={styles.label}>Ім'я</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Введіть ім'я"
          keyboardType="default"
          autoCapitalize="words"
          autoCorrect={true}
          returnKeyType="next"
          style={styles.input}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          returnKeyType="next"
          style={styles.input}
        />

        {/* Телефон */}
        <Text style={styles.label}>Телефон</Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="+380..."
          keyboardType="phone-pad"
          autoComplete="tel"
          returnKeyType="next"
          style={styles.input}
        />

        {/* Вік */}
        <Text style={styles.label}>Вік</Text>

        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="18"
          keyboardType="numeric"
          inputMode="numeric"
          maxLength={3}
          returnKeyType="done"
          style={styles.input}
        />

        {/* Ціна */}
        <Text style={styles.label}>Ціна товару</Text>

        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="99.99"
          keyboardType="decimal-pad"
          inputMode="decimal"
          returnKeyType="done"
          style={styles.input}
        />

        {/* Пароль */}
        <Text style={styles.label}>Пароль</Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Введіть пароль"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          returnKeyType="done"
          style={styles.input}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    padding: 20,
    paddingTop: 60,
    gap: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
  },
});
