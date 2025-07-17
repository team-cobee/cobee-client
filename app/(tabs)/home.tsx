// app/(tabs)/index.tsx : 기본 진입페이지 => 루트페이지
import MainLayout from "@/components/layout/MainLayout";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <MainLayout
      title="CoBee"
      //titleAlign="left"
      titleStyle={{
        fontWeight: "bold",
        color: "#3D2C1E",
        fontSize: 16, // 기본값 유지
        //paddingTop: -2, // 살짝 내려줌 (선택)
      }}
      showTabs
    >
      <View>
        <Text>👋 안녕하세요! 첫 화면입니다.</Text>
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
    fontSize: 16,
    color: "#333",
  },
  link: {
    marginTop: 16,
    color: "#F9B233",
    fontWeight: "bold",
  },
});
