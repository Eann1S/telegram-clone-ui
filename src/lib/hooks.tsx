import { useEffect, useState } from "react";

export function useUserEmail() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setUserEmail(userEmail);
    }
  }, []);

  return { userEmail };
}
