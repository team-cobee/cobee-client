// App.tsx
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>👋 안녕하세요! 첫 화면입니다.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체 채움
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

export default App;
