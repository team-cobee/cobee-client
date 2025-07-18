import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Linking,
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
interface RecruitPostDetail {
  post: {
    id: number;
    authorId: number;
    authorName: string;
    //profileImage : string;
    houseLocation: string;
    title: string;
    needMemberCount: number; // 모집인원
    deposit: number; // 보증금
    monthlyRentCost: number; // 월세
    content: string; // 내용
    formLink: string;
  };
  currentUserId: number;
}

export default function RecruitPost(/*{ API연동시 외부에서 주는 파라미터값
  post,
  currentUserId,
}: RecruitPostDetail*/) {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, content: "폼 제출은 언제까지 하면 될까요?", image: profile },
    { id: 2, content: "오늘까지요.", image: profile, parentId: 1 },
  ]);

  const [posts, setPosts] = useState<RecruitPostDetail>({
    post: {
      id: 1,
      authorId: 100,
      authorName: "희디",
      houseLocation: "숙명여대 10번출구 400m",
      title: "룸메 구해요",
      needMemberCount: 3,
      deposit: 300,
      monthlyRentCost: 50,
      content:
        "코골이 없는 룸메구해요. 해당 폼에서 정보 입력해주시면 추후 연락드리겠습니다:D",
      formLink: "https://github.com/hwnooy",
    },
    currentUserId: 10,
  });
  const isAuthor = posts.currentUserId === posts.post.authorId; // 글 작성자인지 체크 변수

  const [inputText, setInputText] = useState("");
  const [replyToId, setReplyToId] = useState<number | null>(null); // 대댓글용

  const handleSendComment = () => {
    // 댓글 작성 버튼 클릭시
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

  const handleEdit = () => {
    // api 연동부분
    console.log("수정 버튼 클릭됨!");
  };

  return (
    <MainLayout title="모집글 상세" showTabs backType="arrow">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          //contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.postContainer}>
            <Text style={styles.writerName}>{posts.post.authorName}님</Text>
            <Text style={styles.location}>
              위치 : {posts.post.houseLocation}
            </Text>
            <Text></Text>
            <Text style={styles.postTitle}>{posts.post.title}</Text>

            <Text style={styles.postText}>
              모집인원 : {posts.post.needMemberCount}명
            </Text>
            <Text style={styles.postText}>
              보증금 : {posts.post.deposit}만원
            </Text>
            <Text style={styles.postText}>
              월세 : {posts.post.monthlyRentCost}만원
            </Text>
            <Text></Text>

            <Text style={styles.postText}>{posts.post.content}</Text>
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL(posts.post.formLink)}
            >
              폼링크 : {posts.post.formLink}
            </Text>
            {/*작성자면 보여주기*/}
            {isAuthor && (
              <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                <Text style={styles.editButtonText}>수정</Text>
              </TouchableOpacity>
            )}
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

                            {/* 이모티콘을 오른쪽 끝에 정렬 */}
                            <TouchableOpacity
                              //onPress={() => setReplyToId(comment.id)}
                              onPress={() =>
                                setReplyToId((prevId) =>
                                  prevId === comment.id ? null : comment.id
                                )
                              }
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

                      {/* 대댓글 렌더링 */}
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

                      {/* 대댓글 입력창 */}
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
        {replyToId === null && (
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
        )}
      </KeyboardAvoidingView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
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
    fontSize: 25,
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
    backgroundColor: "#F2F2F2",
    padding: 12,
    borderRadius: 8,
  },
  editButton: {
    position: "absolute",
    bottom: 10,
    right: 30,
    width: 90,

    backgroundColor: "#fdbd23",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  editButtonText: {
    left: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
