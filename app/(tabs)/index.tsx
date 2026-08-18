import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // ⛔️ REMOVE ALL CONDITIONS FOR NOW
    router.replace("/login");
  }, []);

  return null;
}
