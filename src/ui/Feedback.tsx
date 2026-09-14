import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";

/**
 * Компоненти для повідомлення користувача про стан програми.
 *
 * ActivityIndicator -> індикатор завантаження.
 * Modal -> модальне вікно поверх поточного екрану.
 * Alert -> системне діалогове повідомлення.
 */
export function Feedback() {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const simulateLoading = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert("Готово", "Завантаження завершено");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback components</Text>

      <Pressable style={styles.button} onPress={simulateLoading}>
        <Text style={styles.buttonText}>Імітувати завантаження</Text>
      </Pressable>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text>Завантаження...</Text>
        </View>
      )}

      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Відкрити Modal</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Кошик</Text>
            <Text>У кошику 3 товари.</Text>

            <Pressable
              style={styles.close}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Закрити</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  loading: {
    alignItems: "center",
    gap: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    width: "80%",
    padding: 24,
    borderRadius: 16,
    backgroundColor: "white",
    gap: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  close: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
