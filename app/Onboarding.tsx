import { Dimensions, Image, StyleSheet, View } from "react-native";

const splashIcon = require("@/assets/images/cobee-icon.png");

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <Image source={splashIcon} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const { width } = Dimensions.get("window");

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
    marginBottom: 16,
  },
});
