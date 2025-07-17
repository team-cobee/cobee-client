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
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const cobeeIcon = require("@/assets/images/notext-cobee.png");
const surveyBg = require("@/assets/images/survey-background.png");
const { width, height } = Dimensions.get("window");

interface Question {
  question: string;
  options: { label: string; value: string }[];
}

interface AgeQuestion {
  question: string;
  min: number;
  max: number;
}

type QuestionType =
  | { type: 'choice'; question: string; options: { label: string; value: string }[] }
  | { type: 'range'; question: string; min: number; max: number };

const QUESTIONS: QuestionType[] = [
  {
    type: 'choice',
    question: '선호하는 룸메이트의 성별을 골라주세요',
    options: [
      { label: '남성', value: 'male' },
      { label: '여성', value: 'female' },
      { label: '상관 없음', value: 'any' },
    ],
  },
  {
    type: 'range',
    question: '선호하는 룸메이트의 연령대는?',
    min: 0,
    max: 100,
  },
];

export default function Survey() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const router = useRouter();

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  // For range slider
  const [range, setRange] = useState<[number, number]>([25, 75]);

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [step]: value }));
  };

  const handleRangeChange = (values: number[]) => {
    setRange([values[0], values[1]]);
    setAnswers(prev => ({ ...prev, [step]: [values[0], values[1]] }));
  };

  const handleNext = () => {
    if (!isLast) {
      setStep(step + 1);
    } else {
      router.push('/signupSuccess');
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      {/* 상단 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (step === 0) {
              router.push("/idUploadResult");
            } else {
              setStep(step - 1);
            }
          }}
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
      {/* 선택지 or 범위 슬라이더 */}
      {current.type === 'choice' ? (
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
      ) : (
        <View style={styles.sliderWrap}>
          <View style={styles.sliderLabels}>
            <View style={styles.sliderLabelBox}><Text style={styles.sliderLabel}>{range[0]}</Text></View>
            <View style={styles.sliderLabelBox}><Text style={styles.sliderLabel}>{range[1]}</Text></View>
          </View>
          <MultiSlider
            values={range}
            min={current.min}
            max={current.max}
            onValuesChange={handleRangeChange}
            step={1}
            selectedStyle={{ backgroundColor: '#F9B233' }}
            unselectedStyle={{ backgroundColor: '#ddd' }}
            markerStyle={{ backgroundColor: '#fff', borderWidth: 2, borderColor: '#F9B233', width: 24, height: 24, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
            pressedMarkerStyle={{ backgroundColor: '#FFD481' }}
            containerStyle={{ height: 40 }}
            trackStyle={{ height: 6, borderRadius: 3 }}
            allowOverlap={false}
            snapped
          />
        </View>
      )}
      {/* 다음 버튼 */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={handleNext}
        disabled={current.type === 'choice' ? !answers[step] : false}
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
    // marginLeft : 165,
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
  sliderWrap: {
    width: width * 0.7,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  slider: {
    height: 40,
    marginTop: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sliderLabelBox: {
    width: 40,
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#222',
  },
});