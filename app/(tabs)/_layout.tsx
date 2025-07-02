// app/_layout.tsx (이제 여기서 전체 앱 라우팅 컨트롤)
import { Stack } from "expo-router";

export default function AppLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
