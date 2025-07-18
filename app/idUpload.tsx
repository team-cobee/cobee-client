import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const cobeeIcon = require("@/assets/images/notext-cobee.png"); // 코비 아이콘
const idCardImg = require("@/assets/images/idcard-sample.png"); // 주민등록증 샘플 이미지
const uploadBtnIcon = require("@/assets/images/image-upload.png");  // 업로드 버튼 아이콘
const testIdCardImg = require("@/assets/images/test-idcard.png");
const { width } = Dimensions.get("window");

export default function IdUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  const handlePhotoBoxPress = async () => {
    // 권한 요청
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("사진 접근 권한이 필요합니다.");
      return;
    }
    // 이미지 선택
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 배경 + 로고 */}
      <View style={styles.header}>
        <Image source={cobeeIcon} style={styles.headerLogo} resizeMode="contain" />
      </View>
      {/* 카드 영역 */}
      <View style={styles.cardBox}>
        <Image source={idCardImg} style={styles.idCardImg} resizeMode="contain" />
      </View>
      {/* 안내문구 */}
      <Text style={styles.guideText}>
        본인 확인을 위해 <Text style={styles.blue}>주민등록증</Text>
        {"\n"}원본을 업로드해주세요
      </Text>
      {/* 사진 추가 */}
      <TouchableOpacity
        style={[styles.photoBox, selectedImage && styles.photoBoxFilled]}
        onPress={handlePhotoBoxPress}
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={styles.photoBoxImage}
            resizeMode="cover"
          />
        ) : (
          <>
            <Image source={uploadBtnIcon} style={styles.photoIcon} resizeMode="contain" />
            <Text style={styles.photoText}>사진 추가</Text>
            <Text style={styles.photoSubText}>(up to 12 Mb)</Text>
          </>
        )}
      </TouchableOpacity>
      {/* 업로드 버튼 */}
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => {
          if (selectedImage) router.push({ pathname: "/idUploadResult", params: { imageUri: selectedImage } });
        }}
      >
        <Text style={styles.uploadBtnText}>신분증 업로드</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  idCardImg: {
    // width: "100%",
    width: 237,
    // height: 110,
    height: 151,
    marginTop: 35,
    borderRadius: 8,
  },
  guideText: {
    textAlign: "center",
    fontSize: 16,
    color: "#222",
    marginBottom: 16,
  },
  blue: {
    color: "#2A5ADA",
    fontWeight: "bold",
  },
  photoBox: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    width: 237, //width * 0.64
    height: 151,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    backgroundColor: "#FAFAFA",
    borderStyle: "dashed",
    // new
    overflow: "hidden",
  },
  photoBoxFilled: {
    borderWidth: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    padding: 0,
  },
  photoBoxImage: {
    width: 237,
    height: 151,
    borderRadius: 12,
  }, // new
  photoIcon: {
    width: 46.39,
    height: 60.02,
    marginTop: -13,
    marginBottom: 4,
  },
  photoText: {
    fontSize: 15,
    color: "#888",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  photoSubText: {
    fontSize: 12,
    color: "#bbb",
    marginTop: 4,
  },
  uploadBtn: {
    backgroundColor: "#F9B233",
    borderRadius: 8,
    width: width * 0.7,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  uploadBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
}); 