import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onClose: () => void;
};

const ChatSidebar = ({ onClose }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/be/e2/80/bee28018255d3cd44fa52e5eb900b827.jpg",
          }}
          style={styles.avatar}
        />
        <Image
          source={{
            uri: "https://cdnnews.sookmyung.ac.kr/news/photo/202111/10734_10481_311.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.roomName}>룸메구하송</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>사진</Text>
        <View style={styles.photos}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/be/e2/80/bee28018255d3cd44fa52e5eb900b827.jpg",
            }}
            style={styles.photo}
          />
          <Image
            source={{
              uri: "https://cdnnews.sookmyung.ac.kr/news/photo/202111/10734_10481_311.jpg",
            }}
            style={styles.photo}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionItem}>
          <Ionicons name="megaphone-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>공지</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Ionicons name="notifications-off-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>알림 끄기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Ionicons name="pencil-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>채팅방 이름 바꾸기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Ionicons name="exit-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>채팅방 나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatSidebar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "80%",
    height: "100%",
    backgroundColor: "#F7B32B",
    padding: 16,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    zIndex: 10,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 48,
    marginBottom: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 4,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  photos: {
    flexDirection: "row",
    gap: 10,
  },
  photo: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  actions: {
    gap: 12,
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // 아이콘과 텍스트 사이 간격
    paddingVertical: 6,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
