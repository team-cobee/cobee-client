import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const cobeeIcon = require("@/assets/images/notext-cobee.png");
const surveyBg = require("@/assets/images/survey-background.png");
const { width, height } = Dimensions.get("window");

interface Question {
  question: string;
  options: { label: string; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    question: "선호하는 룸메이트의 성별을 골라주세요",
    options: [
      { label: "남성", value: "male" },
      { label: "여성", value: "female" },
      { label: "상관 없음", value: "any" },
    ],
  },
];

export default function Survey() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const router = useRouter();

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [step]: value }));
  };

  const handleNext = () => {
    if (!isLast) setStep(step + 1);
    // 마지막 단계 처리 로직 추가 가능
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      {/* 상단 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/idUploadResult")}
          style={{ position: "absolute", left: 20, top: 80, zIndex: 2 }}
        >
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Image source={cobeeIcon} style={styles.headerLogo} resizeMode="contain" />
      </View>

      {/* 진행 바 */}
      <View style={styles.progressBarWrap}>
        <View
          style={[
            styles.progressBar,
            { width: width * 0.8 * ((step + 1) / QUESTIONS.length) },
          ]}
        />
      </View>

      {/* 질문 */}
      <Text style={styles.question}>{current.question}</Text>

      {/* 선택지 */}
      <View style={styles.optionsWrap}>
        {current.options.map(opt => {
          const selected = answers[step] === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.optionBtn,
                selected ? styles.optionBtnSelected : styles.optionBtnUnselected,
              ]}
              onPress={() => handleSelect(opt.value)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.optionText,
                  selected ? styles.optionTextSelected : styles.optionTextUnselected,
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={handleNext}
        disabled={!answers[step]}
      >
        <Text style={styles.nextBtnText}>다음</Text>
      </TouchableOpacity>

      {/* 배경 이미지: pointerEvents 제거, zIndex 조정 */}
      <Image
        source={surveyBg}
        style={styles.surveyBg}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // 또는 "#fff" 대신 "rgba(255, 255, 255, 0)" 등
    zIndex : -1,
  },
  header: {
    width: "100%",
    height: 120,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  headerLogo: { width: 54, height: 35 },
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
    padding: 15,
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
  optionText: { fontSize: 18, fontWeight: "500" },
  optionTextSelected: { color: "#222" },
  optionTextUnselected: { color: "#222" },
  nextBtn: {
    marginTop: -25,
    alignSelf: "center",
    backgroundColor: "#F9B233",
    borderRadius: 8,
    marginLeft : 165,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  surveyBg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: height * 0.7,
    zIndex: -1,           // 뒤로 보내기
  },
});