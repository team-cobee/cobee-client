// import { Link } from "expo-router";
// import { SafeAreaView, StyleSheet, Text } from "react-native";

// export default function HomeScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.text}>👋 안녕하세요! 첫 화면입니다.</Text>
//       <Link href="/post">
//         <Text>Post 화면으로 이동</Text>
//       </Link>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   text: {
//     fontSize: 20,
//     color: "#333",
//   },
// });

// app/(tabs)/index.tsx
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <MainLayout title="홈" showTabs>
      <View style={styles.container}>
        <Text style={styles.text}>👋 안녕하세요! 첫 화면입니다.</Text>
        <Link href="/recruitPost">
          <Text style={styles.link}>➡ 모집글 상세로 이동</Text>
        </Link>
      </View>
    </MainLayout>
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
  link: {
    marginTop: 16,
    color: "#F9B233",
    fontWeight: "bold",
  },
});
