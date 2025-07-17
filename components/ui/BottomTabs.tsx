// components/ui/BottomTabs.tsx
import { usePathname, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const map = require("../../assets/images/map.png");
const home = require("../../assets/images/home.png");
const chat = require("../../assets/images/chat.png");

const routes = [
  // { label: "지도", icon: map, path: "/post" },
  { label: "지도", icon: map, path: "/mapScreen" },
  { label: "홈", icon: home, path: "/recruitPost" },
  { label: "채팅", icon: chat, path: "/chat" },
];

export default function BottomTabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.tabBar}>
      {routes.map((route) => {
        const isActive = pathname === route.path;

        return (
          <TouchableOpacity
            key={route.path}
            onPress={() => router.push(route.path as any)}
            style={styles.tabItem}
          >
            <Image
              source={route.icon}
              style={[styles.icon, isActive && styles.activeIcon]}
              resizeMode="contain"
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {route.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  tabItem: {
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#ccc",
  },
  activeIcon: {
    tintColor: "#F9B233",
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
  activeLabel: {
    color: "#F9B233",
    fontWeight: "bold",
  },
});
