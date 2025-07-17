import MainLayout from "@/components/layout/MainLayout";
import { Ionicons } from "@expo/vector-icons"; //아이콘 추가
import * as ImagePicker from "expo-image-picker"; // 이미지 선택 추가
import { navigate } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import {
  GestureResponderEvent,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PostScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [personnel, setPersonnel] = useState("");
  const [deposit, setDeposit] = useState("");
  const [monthly, setMonthly] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSubmit = (event: GestureResponderEvent) => {
    event.preventDefault();
    console.log({ title, content, personnel, deposit, monthly, imageUri });
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("사진에 대한 접근 권한이 필요해요");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <MainLayout showTabs backType="close">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* <View style={styles.topBar}>
            <TouchableOpacity onPress={() => console.log("닫기")}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            <View style={styles.rightIcons}>
              <TouchableOpacity onPress={() => console.log("사용자")}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color="#000"
                  style={styles.iconSpacing}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("알림")}>
                <Ionicons name="notifications-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View> */}

          <TextInput
            style={styles.titleInput}
            placeholder="제목을 입력해주세요."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#878686"
          />

          <View style={styles.inputRow}>
            <Text style={styles.label}>모집인원</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={personnel}
              onChangeText={setPersonnel}
              placeholder="1명 이상을 입력해주세요."
              placeholderTextColor="#878686"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>보증금</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={deposit}
              onChangeText={setDeposit}
              placeholder="보증금을 입력해주세요."
              placeholderTextColor="#878686"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>월세</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={monthly}
              onChangeText={setMonthly}
              placeholder="월세를 입력해주세요."
              placeholderTextColor="#878686"
            />
          </View>

          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <Ionicons name="image-outline" size={36} color="#C4C4C4" />
            )}
          </TouchableOpacity>

          {/* 내용 입력 */}
          <TextInput
            style={styles.contentInput}
            multiline
            placeholder="내용을 채워주세요."
            value={content}
            onChangeText={setContent}
            placeholderTextColor="#878686"
          />

          {/* 제출 버튼 */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text
              style={styles.submitText}
              onPress={() => navigate("/recruitPost")}
            >
              제출하기
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginRight: 12,
  },
  titleInput: {
    fontSize: 16,
    color: "#878686",
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    marginBottom: 24,
    paddingVertical: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    width: 80,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#d9d9d9",
    paddingVertical: 4,
    fontSize: 14,
    color: "#000",
  },
  imageBox: {
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    marginVertical: 20,
  },
  contentInput: {
    height: 120,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 12,
    padding: 10,
    fontSize: 14,
    color: "#878686",
    textAlignVertical: "top",
    marginBottom: 24,
  },
  submitButton: {
    alignSelf: "flex-end",
    backgroundColor: "#FBBE04",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
});

export default PostScreen;
