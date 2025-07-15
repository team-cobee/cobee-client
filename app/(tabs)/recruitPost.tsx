// import MainLayout from "@/components/layout/MainLayout";
// import { useState } from "react";
// import {
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// const profile = require("../../assets/images/postProfile.png");
// interface Comment {
//   id: number;
//   content: string;
//   image: Image;
// }

// export default function RecruitPost() {
//   const [comments, setComments] = useState<Comment[]>([
//     { id: 1, content: "폼 제출은 언제까지 하면 될까요?", image: profile },
//     { id: 2, content: "오늘까지요.", image: profile },
//   ]);
//   const [inputText, setInputText] = useState("");

//   const handleSendComment = () => {
//     if (!inputText.trim()) return;

//     const newComment: Comment = {
//       id: Date.now(),
//       content: inputText.trim(),
//       image: profile,
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
//                 <Image style={styles.profileImage} source={profile} />
//                 <Text style={styles.commentWriter}>익명</Text>
//                 <Text style={styles.commentText}>{comment.content}</Text>
//               </View>
//             ))}
//           </View>
//         </ScrollView>

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="댓글을 입력하세요."
//             placeholderTextColor="#aaa"
//             value={inputText}
//             onChangeText={setInputText}
//           />
//           <TouchableOpacity onPress={handleSendComment}>
//             <Image source={require("../../assets/images/sendComment.png")} />
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
//   profileImage: { marginLeft: 4 },
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
//     flex: 1,
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
  ImageSourcePropType,
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
  image: ImageSourcePropType;
  parentId?: number;
}

export default function RecruitPost() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, content: "폼 제출은 언제까지 하면 될까요?", image: profile },
    { id: 2, content: "오늘까지요.", image: profile, parentId: 1 },
  ]);

  const [inputText, setInputText] = useState("");
  const [replyToId, setReplyToId] = useState<number | null>(null); // 대댓글용

  const handleSendComment = () => {
    if (!inputText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      content: inputText.trim(),
      image: profile,
      parentId: replyToId ?? undefined,
    };

    setComments([...comments, newComment]);
    setInputText("");
    setReplyToId(null);
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
            {comments
              .filter((c) => !c.parentId)
              .map((comment) => {
                const replies = comments.filter(
                  (c) => c.parentId === comment.id
                );

                return (
                  <View key={comment.id} style={styles.commentBlock}>
                    <View style={styles.commentBlock}>
                      <View style={styles.commentRow}>
                        <View style={styles.commentBox}>
                          <View style={styles.commentHeaderRow}>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                style={styles.profileImage}
                                source={comment.image}
                              />
                              <Text style={styles.commentWriter}>익명</Text>
                            </View>

                            {/* ✅ 이모티콘을 오른쪽 끝에 정렬 */}
                            <TouchableOpacity
                              onPress={() => setReplyToId(comment.id)}
                              style={styles.replyIconWrapper}
                            >
                              <Image
                                source={require("../../assets/images/addReply.png")}
                                style={styles.replyIcon}
                              />
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.commentText}>
                            {comment.content}
                          </Text>
                        </View>
                      </View>

                      {/* ✅ 대댓글 렌더링 */}
                      {replies.map((reply) => (
                        <View key={reply.id} style={styles.replyRow}>
                          <Image
                            source={require("../../assets/images/commentArrow.png")}
                            style={styles.replyArrow}
                          />
                          <View style={styles.replyBox}>
                            <Image
                              style={styles.profileImage}
                              source={reply.image}
                            />
                            <Text style={styles.commentWriter}>익명</Text>
                            <Text style={styles.commentText}>
                              {reply.content}
                            </Text>
                          </View>
                        </View>
                      ))}

                      {/* ✅ 대댓글 입력창 */}
                      {replyToId === comment.id && (
                        <View style={styles.replyInputContainer}>
                          <TextInput
                            style={styles.input}
                            placeholder="답글을 입력하세요."
                            value={inputText}
                            onChangeText={setInputText}
                          />
                          <TouchableOpacity onPress={handleSendComment}>
                            <Image
                              source={require("../../assets/images/sendComment.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
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

  commentBlock: {
    marginBottom: 16,
  },
  reply: {
    marginLeft: 28,
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  replyInputContainer: {
    width: "93%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 28,
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

  commentRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  replyArrow: {
    width: 12,
    height: 12,
    marginTop: 10,
    marginRight: 4,
  },
  replyIconWrapper: {
    marginLeft: 6,
    padding: 4,
  },
  replyIcon: {
    width: 16,
    height: 16,
    tintColor: "#999",
  },

  commentHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  replyRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 8,
    marginTop: 4,
  },

  commentBox: {
    width: "90%",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },

  replyBox: {
    width: "90%",
    backgroundColor: "#F2F2F2", //배경 회색
    padding: 12,
    borderRadius: 8,
  },
});
