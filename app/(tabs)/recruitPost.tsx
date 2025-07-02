import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RecruitPost = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.backArrow}>←</Text>
        <View style={styles.headerIcons}>
          <Text>👤</Text>
          <Text>🔔</Text>
        </View>
      </View>

      {/* 게시글 영역 */}
      <View style={styles.postContainer}>
        <View style={styles.writerInfo}>
          <Text style={styles.writerName}>장숙대님</Text>
          <Text style={styles.location}>🏆 숙명여자대학교 10번 출구 100m</Text>
        </View>
        <Text style={styles.postTitle}>코 안 고는 룸메 구해요.</Text>
        <Text style={styles.postText}>ㅈㄱㄴ</Text>
        <Text style={styles.linkText}>폼 링크: ~~~~</Text>
      </View>

      {/* 댓글 목록 */}
      <View style={styles.commentSection}>
        <View style={styles.comment}>
          <Text style={styles.commentWriter}>최프리엄님</Text>
          <Text style={styles.commentText}>
            폼 제출은 언제까지 하면 될까요?
          </Text>
        </View>
        <View style={styles.replyContainer}>
          <View style={styles.replyArrow} />
          <View style={styles.reply}>
            <Text style={styles.commentWriter}>김숙영님</Text>
            <Text style={styles.commentText}>오늘까지요.</Text>
          </View>
        </View>
      </View>

      {/* 댓글 입력창 */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="댓글을 입력하세요." />
        <TouchableOpacity>
          <Text style={styles.sendIcon}>📨</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 탭바 */}
      <View style={styles.tabBar}>
        <Text>📍</Text>
        <Text>🏠</Text>
        <Text>💬</Text>
      </View>
    </SafeAreaView>
  );
};

export default RecruitPost;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  backArrow: { fontSize: 24 },
  profileBadge: {
    backgroundColor: "#A94FFF",
    padding: 6,
    borderRadius: 30,
  },
  profileText: { color: "#fff", fontWeight: "bold" },
  headerIcons: { flexDirection: "row", gap: 10 },

  postContainer: { padding: 16 },
  writerInfo: { marginBottom: 4 },
  writerName: { fontWeight: "bold" },
  location: { color: "gray", fontSize: 12 },
  postTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 4 },
  postText: { fontSize: 16 },
  linkText: { marginTop: 4, color: "gray" },

  commentSection: { padding: 16 },
  comment: { marginBottom: 10 },
  commentWriter: { fontWeight: "bold" },
  commentText: { fontSize: 14 },

  replyContainer: { flexDirection: "row", alignItems: "flex-start" },
  replyArrow: {
    width: 20,
    height: 20,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    transform: [{ rotate: "-45deg" }],
    marginRight: 10,
    marginTop: 8,
  },
  reply: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },

  inputContainer: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendIcon: { fontSize: 20, color: "#F9B233" },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});
