// components/layout/MainLayout.tsx
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import BottomTabs from "../ui/BottomTabs";

interface Props {
  title?: string; // 헤더에 원하는 타이틀 설정 가능
  showTabs?: boolean; // 바텀바 보일지 안 보일지
  backType?: "arrow" | "close" | null; // 화살표할건지 X할건지 안 보이게 할건지
  showProfileIcon?: boolean; // 사람모양 보이게할지말지
  showBellIcon?: boolean; // 종 모양 보이게할지말지
  headerBackgroundColor?: string; // 마이페이지때문에 생성, header의 배경화면 색 설정
  headerColor?: string; // 헤더 글씨 색깔
  titleAlign?: TextStyle["textAlign"]; // 헤더에 있는 제목 위치
  titleStyle?: TextStyle; // 헤더 글씨 스타일
  children: React.ReactNode; // 헤더와 바텀바 제외한 내용부분 (필수임)
}

export default function MainLayout({
  // 기본 설정 디폴트
  title = "",
  showTabs = false,
  backType = null,
  showProfileIcon = true,
  showBellIcon = true,
  headerBackgroundColor = "#fff",
  titleAlign,
  titleStyle,
  children,
}: Props) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
        {backType ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {backType === "close" ? (
              <Ionicons name="close" size={24} color="#000" />
            ) : (
              <Ionicons name="chevron-back" size={24} color="#000" />
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}

        <View style={[styles.titleContainer, { flex: 1 }]}>
          <Text
            style={[
              styles.title,
              titleStyle,
              {
                textAlign: titleAlign ?? "center",
                //lineHeight: (titleStyle?.fontSize ?? 16) + 4,
                //paddingTop: 4,
              },
            ]}
          >
            {title}
          </Text>
        </View>

        <View style={styles.icons}>
          {showProfileIcon && (
            <Ionicons
              name="person-outline"
              size={20}
              style={styles.icon}
              onPress={() => navigate("/account")}
            />
          )}
          {showBellIcon && (
            <Ionicons
              name="notifications-outline"
              size={20}
              onPress={() => navigate("/postAlarm")}
            />
          )}
        </View>
      </View>

      {/* 본문 */}
      <View style={styles.content}>{children}</View>

      {/* 하단 탭 */}
      {showTabs && <BottomTabs />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  title: { fontWeight: "bold", fontSize: 16 },
  icons: { flexDirection: "row", gap: 10 },
  icon: { marginRight: 10 },
  content: { flex: 1, backgroundColor: "#FFFFFF" },
  titleContainer: {
    justifyContent: "center",
  },
});
