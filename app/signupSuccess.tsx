import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const cobeeIcon = require("@/assets/images/notext-cobee.png");
const surveyBg = require("@/assets/images/survey-background.png");
const { width, height } = Dimensions.get("window");

export default function SignupSuccess() {
  const router = useRouter();
  const userName = "홍길동"; // 더미데이터, 추후 백엔드 연동 시 교체
  return (
    <View style={styles.container}>
      {/* 상단 배경 + 로고 */}
      <View style={styles.header}>
        <Image source={cobeeIcon} style={styles.headerLogo} resizeMode="contain" />
      </View>
      {/* 진행 바 */}
      <View style={styles.progressBarWrap}>
        <View style={styles.progressBar} />
      </View>
      {/* 카드 박스 */}
      <View style={styles.cardBox}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={64} color="#F9B233" />
        </View>
        <Text style={styles.successTitle}>가입 성공</Text>
        <Text style={styles.successDesc}>
          어서오세요!! {userName}님{"\n"}
          원하는 룸메이트를 <Text style={{fontWeight:'bold', color:'#2A5ADA'}}>Cobee</Text>에서 찾아보세요!
        </Text>
        <TouchableOpacity style={styles.homeBtn} onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
      {/* 하단 배경 이미지 */}
      <Image source={surveyBg} style={styles.surveyBg} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", zIndex: -1 },
  header: {
    width: "100%",
    height: 120,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  headerLogo: { width: 54, height: 35, marginBottom: 20 },
  progressBarWrap: {
    width: width * 0.8,
    height: 8,
    backgroundColor: "#f7b32b33",
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 24,
    overflow: "hidden",
  },
  progressBar: {
    width: width * 0.8,
    height: 8,
    backgroundColor: "#F9B233",
    borderRadius: 4,
  },
  cardBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 24,
    marginTop: 30,
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: "#F9B233",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00000",
    marginBottom: 10,
    marginTop: 8,
  },
  successDesc: {
    fontSize: 16,
    color: "#222",
    textAlign: "center",
    marginBottom: 24,
  },
  homeBtn: {
    backgroundColor: "#F9B233",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 8,
  },
  homeBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  surveyBg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: height * 0.7,
    zIndex: -1,
  },
}); 