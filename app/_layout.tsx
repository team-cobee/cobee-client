import { Stack, useRouter, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Onboarding from "./onboarding";

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      const timer = setTimeout(() => {
        router.replace("/login");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname, router]);

  if (pathname === "/") {
    return <Onboarding />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </>
  );
}