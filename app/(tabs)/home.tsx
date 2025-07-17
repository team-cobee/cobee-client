// app/(tabs)/index.tsx : 기본 진입페이지 => 루트페이지
import MainLayout from "@/components/layout/MainLayout";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const newsImage = require("@/assets/images/partial-react-logo.png"); // 예시 뉴스 이미지
const profileImage = require("@/assets/images/postProfile.png"); // 예시 프로필 이미지

const posts = [
  {
    id: "1",
    nickname: "김숙명님",
    title: "아침형 인간 룸메 구해요.",
    content: "저랑 같이 아침에 일어나서 천원의 아침밥 먹을 룸메 구합니다.",
    location: "숙대입구 10번 출구",
    distance: "100m",
  },
  {
    id: "2",
    nickname: "장숙대님",
    title: "코 안 고는 룸메 구해요.",
    content: "",
    location: "숙대입구 10번 출구",
    distance: "100m",
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <MainLayout
      title="CoBee"
      titleStyle={{ fontWeight: "bold", color: "#3D2C1E", fontSize: 24, marginLeft: -20 }}
      titleAlign="left"
      showTabs
      showProfileIcon={true}
      showBellIcon={true}
      backType={null}
    >
      <View style={styles.container}>
        {/* 서브타이틀 */}
        <Text style={styles.subtitle}>
          <Text style={styles.subtitleBold}>CoBee</Text>
          <Text style={styles.subtitleNormal}>와 함께하는 오늘의 부동산 정보</Text>
        </Text>
        {/* 뉴스 카드 */}
        <View style={styles.newsCard}>
          <Image source={newsImage} style={styles.newsImage} resizeMode="contain" />
          <Text style={styles.newsTitle}>[부동산] '영끌' 아니면 '월세'… 30대 주거 양극화</Text>
          <Text style={styles.newsMeta}>이현주 기자 | 2023-07-14</Text>
          <Text style={styles.newsDesc} numberOfLines={2}>
            전체 30대 중 절반이 영끌로 주택을 구입하고 절반은 월세 산다. 각자의 배경이 있지만 격차도 커진다.
          </Text>
        </View>
        {/* 게시글 카드 리스트 */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={profileImage} style={styles.profileImg} />
                <Text style={styles.nickname}>{item.nickname}</Text>
              </View>
              <Text style={styles.postTitle}>{item.title}</Text>
              {!!item.content && <Text style={styles.postContent}>{item.content}</Text>}
              <View style={styles.postFooter}>
                <Ionicons name="location" size={16} color="#F9B233" style={{ marginRight: 2 }} />
                <Text style={styles.locationText}>{item.location}</Text>
                <Text style={styles.distanceText}>{item.distance}</Text>
              </View>
            </View>
          )}
        />
        {/* 플로팅 버튼 */}
        <TouchableOpacity style={styles.fab} activeOpacity={0.8}
          onPress={() => { router.push("/post"); }}>
          <Ionicons name="pencil" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 0,
  },
  subtitle: {
    flexDirection: "row",
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    alignItems: "center",
  },
  subtitleBold: {
    fontWeight: "bold",
    color: "#3D2C1E",
    fontSize: 18,
  },
  subtitleNormal: {
    color: "#3D2C1E",
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 2,
  },
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  newsImage: {
    width: width - 80,
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  newsTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#3D2C1E",
    marginBottom: 2,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  newsMeta: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
    alignSelf: "flex-start",
  },
  newsDesc: {
    fontSize: 13,
    color: "#333",
    alignSelf: "flex-start",
  },
  listContainer: {
    paddingBottom: 80,
    gap: 16,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: "#eee",
  },
  nickname: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  postContent: {
    fontSize: 13,
    color: "#333",
    marginBottom: 8,
  },
  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#F9B233",
    fontWeight: "bold",
    marginLeft: 2,
    marginRight: 8,
  },
  distanceText: {
    fontSize: 12,
    color: "#222",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F9B233",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
});
