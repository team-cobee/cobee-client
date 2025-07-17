import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const cobeeIcon = require("@/assets/images/cobee-icon.png");
const googleBtnImg = require("@/assets/images/google-login.png");
const kakaoBtnImg = require("@/assets/images/kakao-login.png");

const { width } = Dimensions.get("window");
const BUTTON_RATIO = 221 / 51; // 구글 버튼 기준 비율
const BTN_WIDTH = width * 0.65;
const BTN_HEIGHT = BTN_WIDTH / BUTTON_RATIO;

export default function Login() {
  const router = useRouter();
  const handleLogin = () => {
    router.replace("/idUpload");
  };
  return (
    <View style={styles.container}>
      <Image source={cobeeIcon} style={styles.logo} resizeMode="contain" />
      <TouchableOpacity style={styles.btnWrap} activeOpacity={0.8} onPress={handleLogin}>
        <Image source={googleBtnImg} style={[styles.fullBtnImg, { width: BTN_WIDTH, height: BTN_HEIGHT }]} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrap} activeOpacity={0.8} onPress={handleLogin}>
        <Image source={kakaoBtnImg} style={[styles.fullBtnImg, { width: BTN_WIDTH, height: BTN_HEIGHT }]} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.38,
    height: width * 0.38,
    marginBottom: 32,
  },
  btnWrap: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  fullBtnImg: {
    borderRadius: 8,
  },
}); 