import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase";
import { useRouter } from "expo-router";

// Define the type for AuthContext
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  authChecked: boolean;
  setAuthChecked: (checked: boolean) => void;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ authChecked, setAuthChecked ] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {

    /**
     * the onAuthStateChanged function is used to listen for changes in the user's authentication state.
     * It takes a callback function that is called whenever the user's authentication state changes.
     * The callback function receives a User object if the user is signed in, or null if the user is signed out.
     * @param FIREBASE_AUTH : this is the instance of the firebase authentication created using getAuth()
     * @param authUser : this is the callback function that is called whenever the user's authentication state changes.
     * @returns unsubscribe function : this function is used to unsubscribe from the listener when the component unmounts.
     * 
     * It returns a function that, when called, removes the listener. This is typically used for 
     * cleanup purposes to avoid memory leaks, especially in React components when they unmount.
     * */
    const unsubscribe: () => void = onAuthStateChanged(
      FIREBASE_AUTH, 
      (user: User | null) => {
        console.log("User state changed:", user);
        setUser(user);
        setAuthChecked(true);
        setLoading(false);
        if (user) {
        router.replace("/(tabs)"); // Redirect to home if logged in
      } else {
        router.replace("/signIn"); // Redirect to login if not logged in
      }
      }
    );

    return () => {
        unsubscribe();
    // Cleanup listener on unmount
    // This is important to prevent memory leaks and ensure that the listener is removed when the component unmounts.
    // The unsubscribe function is returned by onAuthStateChanged and is called here to remove the listener.
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authChecked, setAuthChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
