import ChatSidebar from "@/components/layout/ChatSidebar";
import MainLayout from "@/components/layout/MainLayout";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


interface Message {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  content: string;
  isMe: boolean;
}

const Chat = () => {
  {/* 메시지 없을 때 */}
  // const [messages, setMessages] = useState<Message[]>([]);
  {/* 메시지 있을 때 */}
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "눈송",
      avatar:
        "https://i.pinimg.com/736x/be/e2/80/bee28018255d3cd44fa52e5eb900b827.jpg",
      time: "11:35 AM",
      content: "안녕하세요! 반가워요! 룸메를 구하고 있어요.",
      isMe: false,
    },
    {
      id: "2",
      sender: "Me",
      avatar:
        "https://cdnnews.sookmyung.ac.kr/news/photo/202111/10734_10481_311.jpg",
      time: "11:36 AM",
      content:
        "안녕하세요! 저도 룸메를 구하고 있어요. 서로 알아가는 시간을 가져요.",
      isMe: true,
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Me",
      avatar:
        "https://cdnnews.sookmyung.ac.kr/news/photo/202111/10734_10481_311.jpg",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      content: inputText.trim(),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[styles.messageRow, item.isMe ? styles.myRow : styles.otherRow]}
    >
      {!item.isMe && (
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      )}

      <View
        style={[
          styles.bubble,
          item.isMe ? styles.myBubble : styles.otherBubble,
        ]}
      >
        {!item.isMe && <Text style={styles.sender}>{item.sender}</Text>}
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      {item.isMe && (
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      )}
    </View>
  );

  return (
  <MainLayout
  title="룸메구하송"
  showTabs
  titleStyle={{ fontWeight: "bold", color: "#3D2C1E", fontSize: 16 }}
>
  {messages.length === 0 ? (
    // ✅ 메시지 없을 때 보여줄 화면
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>참여하는 채팅이 없습니다.</Text>
    </View>
  ) : (
    <>
      {/* ✅ 메시지가 있을 때만 햄버거 아이콘, 사이드바, 채팅 UI 렌더 */}
      <Ionicons
        name="menu-outline"
        size={24}
        style={{ position: "absolute", right: 16, top: 16, zIndex: 11 }}
        onPress={() => setShowSidebar(true)}
      />

      {showSidebar && <ChatSidebar onClose={() => setShowSidebar(false)} />}

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
      >
        <Text style={styles.dateDivider}>07/16/2025</Text>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesList}
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="메세지를 입력해주세요."
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendIcon}>
            <Ionicons name="send" size={26} color="#F7B32B" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  )}
</MainLayout>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  messagesList: { padding: 10, paddingBottom: 20 },
  dateDivider: {
    alignSelf: "center",
    marginVertical: 10,
    color: "#999",
    fontSize: 13,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  myRow: { justifyContent: "flex-end" },
  otherRow: { justifyContent: "flex-start" },
  avatar: { width: 32, height: 32, borderRadius: 16, marginHorizontal: 6 },
  bubble: { maxWidth: "70%", padding: 10, borderRadius: 12 },
  myBubble: { backgroundColor: "#F7B32B", borderTopRightRadius: 0 },
  otherBubble: { backgroundColor: "#F2F3F5", borderTopLeftRadius: 0 },
  sender: { fontSize: 12, fontWeight: "bold", color: "#444", marginBottom: 4 },
  messageText: { fontSize: 14, color: "#000" },
  time: { fontSize: 10, color: "#777", marginTop: 4, alignSelf: "flex-end" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
    color: "#000",
  },
  sendIcon: { justifyContent: "center", paddingLeft: 10 },
  emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },

});
