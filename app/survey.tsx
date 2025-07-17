import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";

const cobeeIcon = require("@/assets/images/notext-cobee.png");
const { width } = Dimensions.get("window");

const QUESTIONS = [
  {
    question: "선호하는 룸메이트의 성별을 골라주세요",
    options: [
      { label: "남성", value: "male" },
      { label: "여성", value: "female" },
      { label: "상관 없음", value: "any" },
    ],
  },
  // 다음 단계가 있다면 여기에 추가
];

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [step]: value });
  };

  const handleNext = () => {
    if (!isLast) setStep(step + 1);
    // 마지막 단계라면 제출 등 추가 가능
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      {/* 상단 배경 + 로고 */}
      <View style={styles.header}>
        <Image source={cobeeIcon} style={styles.headerLogo} resizeMode="contain" />
      </View>
      {/* 진행 바 */}
      <View style={styles.progressBarWrap}>
        <View style={[styles.progressBar, { width: width * 0.8 * ((step + 1) / QUESTIONS.length) }]} />
      </View>
      {/* 질문 */}
      <Text style={styles.question}>{current.question}</Text>
      {/* 선택지 */}
      <View style={styles.optionsWrap}>
        {current.options.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[
              styles.optionBtn,
              answers[step] === opt.value ? styles.optionBtnSelected : styles.optionBtnUnselected,
            ]}
            onPress={() => handleSelect(opt.value)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.optionText,
                answers[step] === opt.value ? styles.optionTextSelected : styles.optionTextUnselected,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 하단 장식 */}
      <View style={styles.bottomDeco1} />
      <View style={styles.bottomDeco2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    width: "100%",
    height: 120,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  headerLogo: {
    width: 54,
    height: 35,
  },
  progressBarWrap: {
    width: width * 0.85,
    height: 8,
    backgroundColor: "#f7b32b33",
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 24,
    overflow: "hidden",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#F9B233",
    borderRadius: 4,
  },
  question: {
    fontSize: 18,
    color: "#222",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 40,
    fontWeight: "500",
  },
  optionsWrap: {
    width: width * 0.7,
    alignSelf: "center",
    padding: 15
  },
  optionBtn: {
    borderRadius: 8,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 1.5,
  },
  optionBtnSelected: {
    backgroundColor: "#FFD481",
    borderColor: "#FFD481",
  },
  optionBtnUnselected: {
    backgroundColor: "#fff",
    borderColor: "#F9B233",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#222",
  },
  optionTextUnselected: {
    color: "#222",
  },
  bottomDeco1: {
    position: "absolute",
    bottom: -width * 0.15,
    left: -width * 0.2,
    width: width * 0.8,
    height: width * 0.4,
    backgroundColor: "#F9B23333",
    borderRadius: width,
    zIndex: -1,
  },
  bottomDeco2: {
    position: "absolute",
    bottom: -width * 0.25,
    right: -width * 0.1,
    width: width * 0.9,
    height: width * 0.6,
    backgroundColor: "#F9B23333",
    borderRadius: width,
    zIndex: -2,
  },
}); 