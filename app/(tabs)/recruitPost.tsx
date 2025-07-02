// import MainLayout from "@/components/layout/MainLayout";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function RecruitPost() {
//   return (
//     <MainLayout title="모집글 상세" showTabs backType={"arrow"}>
//       <View style={styles.postContainer}>
//         <Text style={styles.writerName}>장숙대님</Text>
//         <Text style={styles.location}>🏆 숙명여자대학교 10번 출구 100m</Text>
//         <Text style={styles.postTitle}>코 안 고는 룸메 구해요.</Text>
//         <Text style={styles.postText}>ㅈㄱㄴ</Text>
//         <Text style={styles.linkText}>폼 링크: ******</Text>
//       </View>

//       <View style={styles.commentSection}>
//         <View style={styles.comment}>
//           <Text style={styles.commentWriter}>최프리엄님</Text>
//           <Text style={styles.commentText}>
//             폼 제출은 언제까지 하면 될까요?
//           </Text>
//         </View>
//         <View style={styles.replyContainer}>
//           <View style={styles.replyArrow} />
//           <View style={styles.reply}>
//             <Text style={styles.commentWriter}>김숙영님</Text>
//             <Text style={styles.commentText}>오늘까지요.</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput style={styles.input} placeholder="댓글을 입력하세요." />
//         <TouchableOpacity>
//           <Text style={styles.sendIcon}>📨</Text>
//         </TouchableOpacity>
//       </View>
//     </MainLayout>
//   );
// }

// const styles = StyleSheet.create({
//   postContainer: { padding: 16 },
//   writerName: { fontWeight: "bold" },
//   location: { color: "gray", fontSize: 12, marginBottom: 8 },
//   postTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 4 },
//   postText: { fontSize: 16 },
//   linkText: { marginTop: 4, color: "gray" },

//   commentSection: { padding: 16 },
//   comment: { marginBottom: 10 },
//   commentWriter: { fontWeight: "bold" },
//   commentText: { fontSize: 14 },

//   replyContainer: { flexDirection: "row", alignItems: "flex-start" },
//   replyArrow: {
//     width: 20,
//     height: 20,
//     borderLeftWidth: 2,
//     borderBottomWidth: 2,
//     borderColor: "#ccc",
//     transform: [{ rotate: "-45deg" }],
//     marginRight: 10,
//     marginTop: 8,
//   },
//   reply: {
//     backgroundColor: "#F2F2F2",
//     padding: 10,
//     borderRadius: 10,
//     flex: 1,
//   },

//   inputContainer: {
//     flexDirection: "row",
//     padding: 12,
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderColor: "#eee",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#F7F7F7",
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginRight: 8,
//   },
//   sendIcon: { fontSize: 20, color: "#F9B233" },
// });

// import MainLayout from "@/components/layout/MainLayout";
// import { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// interface Comment {
//   id: number;
//   author: string;
//   content: string;
// }

// export default function RecruitPost() {
//   const [comments, setComments] = useState<Comment[]>([
//     { id: 1, author: "최프리엄님", content: "폼 제출은 언제까지 하면 될까요?" },
//     { id: 2, author: "김숙영님", content: "오늘까지요." },
//   ]);
//   const [inputText, setInputText] = useState("");
//   const [authorText, setAuthorText] = useState("");

//   const handleSendComment = () => {
//     if (!inputText.trim() || !authorText.trim()) return;

//     const newComment: Comment = {
//       id: Date.now(),
//       author: authorText.trim(),
//       content: inputText.trim(),
//     };

//     setComments([...comments, newComment]);
//     setInputText("");
//   };

//   return (
//     <MainLayout title="모집글 상세" showTabs backType="arrow">
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <View style={styles.postContainer}>
//             <Text style={styles.writerName}>장숙대님</Text>
//             <Text style={styles.location}>
//               🏆 숙명여자대학교 10번 출구 100m
//             </Text>
//             <Text style={styles.postTitle}>코 안 고는 룸메 구해요.</Text>
//             <Text style={styles.postText}>ㅈㄱㄴ</Text>
//             <Text style={styles.linkText}>폼 링크: ******</Text>
//           </View>

//           <View style={styles.commentSection}>
//             {comments.map((comment) => (
//               <View key={comment.id} style={styles.comment}>
//                 <Text style={styles.commentWriter}>{comment.author}</Text>
//                 <Text style={styles.commentText}>{comment.content}</Text>
//               </View>
//             ))}
//           </View>
//         </ScrollView>

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={[styles.input, { flex: 1 }]}
//             placeholder="댓글을 입력하세요."
//             placeholderTextColor="#aaa"
//             value={inputText}
//             onChangeText={setInputText}
//           />
//           <TouchableOpacity onPress={handleSendComment}>
//             <Text style={styles.sendIcon}>📨</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </MainLayout>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContent: {
//     paddingBottom: 20,
//   },
//   postContainer: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   writerName: {
//     fontWeight: "bold",
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   location: {
//     color: "#666",
//     fontSize: 12,
//     marginBottom: 12,
//   },
//   postTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   postText: {
//     fontSize: 15,
//     marginBottom: 4,
//   },
//   linkText: {
//     fontSize: 13,
//     color: "#444",
//     marginTop: 4,
//   },

//   commentSection: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     borderTopWidth: 8,
//     borderColor: "#F7F7F7",
//   },
//   comment: {
//     marginBottom: 12,
//   },
//   commentWriter: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   commentText: {
//     fontSize: 14,
//     color: "#222",
//   },

//   inputContainer: {
//     flexDirection: "row",
//     padding: 12,
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderColor: "#eee",
//     backgroundColor: "#fff",
//   },
//   input: {
//     backgroundColor: "#F7F7F7",
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginRight: 8,
//     fontSize: 14,
//   },
//   sendIcon: {
//     fontSize: 20,
//     color: "#F9B233",
//   },
// });

import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const profile = require("../../assets/images/postProfile.png");
interface Comment {
  id: number;
  content: string;
  image: Image;
}

export default function RecruitPost() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, content: "폼 제출은 언제까지 하면 될까요?", image: profile },
    { id: 2, content: "오늘까지요.", image: profile },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendComment = () => {
    if (!inputText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      content: inputText.trim(),
      image: profile,
    };

    setComments([...comments, newComment]);
    setInputText("");
  };

  return (
    <MainLayout title="모집글 상세" showTabs backType="arrow">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.postContainer}>
            <Text style={styles.writerName}>장숙대님</Text>
            <Text style={styles.location}>
              🏆 숙명여자대학교 10번 출구 100m
            </Text>
            <Text style={styles.postTitle}>코 안 고는 룸메 구해요.</Text>
            <Text style={styles.postText}>ㅈㄱㄴ</Text>
            <Text style={styles.linkText}>폼 링크: ******</Text>
          </View>

          <View style={styles.commentSection}>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.comment}>
                <Image style={styles.profileImage} source={profile} />
                <Text style={styles.commentWriter}>익명</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="댓글을 입력하세요."
            placeholderTextColor="#aaa"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={handleSendComment}>
            <Image source={require("../../assets/images/sendComment.png")} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  postContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  writerName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  location: {
    color: "#666",
    fontSize: 12,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postText: {
    fontSize: 15,
    marginBottom: 4,
  },
  linkText: {
    fontSize: 13,
    color: "#444",
    marginTop: 4,
  },

  commentSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 8,
    borderColor: "#F7F7F7",
  },
  comment: {
    marginBottom: 12,
  },
  profileImage: { marginLeft: 4 },
  commentWriter: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: "#222",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 14,
  },
  sendIcon: {
    fontSize: 20,
    color: "#F9B233",
  },
});
