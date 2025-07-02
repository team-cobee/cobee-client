import { Link } from "expo-router";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>👋 안녕하세요! 첫 화면입니다.</Text>
      <Link href="/post">
        <Text>Post 화면으로 이동</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});
