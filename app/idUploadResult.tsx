import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";


const cobeeIcon = require("@/assets/images/notext-cobee.png"); // 코비 아이콘
const testIdCardImg = require("@/assets/images/test-idcard.png");
const { width } = Dimensions.get("window");

const getImageSource = (imageUri: string | undefined) => {
  if (imageUri) {
    return { uri: imageUri };
  }
  return testIdCardImg;
};

export default function IdUploadResult() {
  const { imageUri } = useLocalSearchParams<{ imageUri?: string }>();
  const [editMode, setEditMode] = useState(false);
  const [fields, setFields] = useState({
    name: "홍길동",
    regNo: "501111-1234566",
    issueDate: "2019.11.25",
  });

  const handleChange = (key: string, value: string) => {
    setFields({ ...fields, [key]: value });
  };

  return (
    <View style={styles.container}>
      {/* 상단 배경 + 로고 */}
      <View style={styles.header}>
        <Image source={cobeeIcon} style={styles.headerLogo} resizeMode="contain" />
      </View>
      {/* 카드 영역 */}
      <View style={styles.cardBox}>
        <Image source={getImageSource(typeof imageUri === 'string' ? imageUri : undefined)} style={styles.idCardImg} resizeMode="contain" />
      </View>
      {/* 결과 텍스트 블록 */}
      <View style={styles.resultBlock}>
        <Text style={styles.label}>이름</Text>
        <View style={styles.textBox}>
          {editMode ? (
            <TextInput
              style={styles.inputText}
              value={fields.name}
              onChangeText={v => handleChange("name", v)}
              placeholder="이름"
              placeholderTextColor="#bbb"
            />
          ) : (
            <Text style={styles.grayText}>{fields.name}</Text>
          )}
        </View>
        <Text style={styles.label}>주민등록번호</Text>
        <View style={styles.textBox}>
          {editMode ? (
            <TextInput
              style={styles.inputText}
              value={fields.regNo}
              onChangeText={v => handleChange("regNo", v)}
              placeholder="주민등록번호"
              placeholderTextColor="#bbb"
            />
          ) : (
            <Text style={styles.grayText}>{fields.regNo}</Text>
          )}
        </View>
        <Text style={styles.label}>발급일자</Text>
        <View style={styles.textBox}>
          {editMode ? (
            <TextInput
              style={styles.inputText}
              value={fields.issueDate}
              onChangeText={v => handleChange("issueDate", v)}
              placeholder="발급일자"
              placeholderTextColor="#bbb"
            />
          ) : (
            <Text style={styles.grayText}>{fields.issueDate}</Text>
          )}
        </View>
      </View>
      {/* 하단 버튼 */}
      <View style={styles.buttonRow}>
        {editMode ? (
          <TouchableOpacity
            style={[styles.buttonFilled, styles.singleButton]}
            onPress={() => setEditMode(false)}
          >
            <Text style={[styles.buttonText, styles.buttonFilledText]}>완료</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={() => setEditMode(true)}>
              <Text style={styles.buttonText}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, styles.buttonFilled]}
                onPress={() => router.push("./survey")}>
              <Text style={[styles.buttonText, styles.buttonFilledText]}>완료</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  header: {
    width: "100%",
    height: 180,
    backgroundColor: "#f7b32b57",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  headerLogo: {
    width: 54,
    height: 35,
    marginBottom: 45,
  },
  cardBox: {
    width: width,
    backgroundColor: "#fff",
    borderRadius: 35,
    marginTop: -25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  idCardImg: {
    width: 237*1.1,
    height: 151*1.1,
    marginTop: 35,
  },
  resultBlock: {
    width: width * 0.8,
    marginTop: -20,
    padding: 25,
  },
  label: {
    fontSize: 15,
    color: "#222",
    marginTop: 8,
    marginBottom: 8,
  },
  textBox: {
    borderWidth: 1,
    borderColor: "#bbb",
    height: 46,
    borderRadius: 8,
    paddingVertical: 12, // 기존 10에서 줄임
    paddingTop: 12, // 추가: 위쪽 패딩을 더 줄임
    paddingBottom: 6, // 추가: 아래쪽 패딩을 더 늘림
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    justifyContent: "center",
  },
  grayText: {
    color: "#888",
    fontSize: 16,
    height: "100%",
    textAlignVertical: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.8,
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#F9B233",
    borderRadius: 8,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#F9B233",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonFilled: {
    backgroundColor: "#F9B233",
    borderWidth: 0,
    borderRadius: 8,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 0,
  },
  singleButton: {
    width: '60%',
    marginHorizontal: 25,
  },
  inputText: {
    color: "#222",
    fontSize: 16,
    height: "100%",
    textAlignVertical: "center",
    padding: 0,
  },
  buttonFilledText: {
    color: "#fff",
  },
}); 