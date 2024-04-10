import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Set loading to false when auth state is determined
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsub;
  }, []);

  return { user, loading };
}
