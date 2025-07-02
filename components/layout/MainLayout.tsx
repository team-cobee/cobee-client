// components/layouts/MainLayout.tsx

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomTabs from "../ui/BottomTabs";

interface Props {
  title?: string;
  showTabs?: boolean;
  showBack?: boolean;
  children: React.ReactNode;
}

export default function MainLayout({
  title = "",
  showTabs = false,
  showBack = true,
  children,
}: Props) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* 공통 헤더 */}
      <View style={styles.header}>
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.icons}>
          <Ionicons name="person-outline" size={20} style={styles.icon} />
          <Ionicons name="notifications-outline" size={20} />
        </View>
      </View>

      {/* 컨텐츠 영역 */}
      <View style={styles.content}>{children}</View>

      {/* 하단 탭 */}
      {showTabs && <BottomTabs />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  title: { fontWeight: "bold", fontSize: 16 },
  icons: { flexDirection: "row", gap: 10 },
  icon: { marginRight: 10 },
  content: { flex: 1 },
});
