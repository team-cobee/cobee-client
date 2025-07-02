// components/ui/BottomTabs.tsx
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const routes = [
  { label: "지도", icon: "🗺", path: "/post" },
  { label: "홈", icon: "🏠", path: "/account" },
  { label: "쪽지", icon: "💬", path: "/recruitPost" },
];

export default function BottomTabs() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.tabBar}>
      {routes.map((route) => (
        <TouchableOpacity
          key={route.path}
          onPress={() => router.push(route.path as any)}
          style={styles.tabItem}
        >
          <Text style={[styles.icon, pathname === route.path && styles.active]}>
            {route.icon}
          </Text>
          <Text
            style={[styles.label, pathname === route.path && styles.active]}
          >
            {route.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  tabItem: {
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    color: "#888",
  },
  label: {
    fontSize: 12,
    color: "#888",
  },
  active: {
    color: "#F9B233",
    fontWeight: "bold",
  },
});
