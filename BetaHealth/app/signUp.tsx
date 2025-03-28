import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert,Platform, TouchableOpacity,KeyboardAvoidingView, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { FIREBASE_AUTH } from '@/firebase';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'expo-router';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAnimatedKeyboard } from 'react-native-reanimated';


export default function SignUp() {
  const { user, setUser } = useAuth(); // Access the current user state
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const keyboard = useAnimatedKeyboard();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)'); // Redirect to the home page
    }           
  }, [user]);

  const handleSignUp = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        Alert.alert('Invalid email', 'Please re-enter email');
        return;
    };

    if (!email || !password || !confirmPassword) {
      return Alert.alert('Error', 'Please fill all fields');
    }
    
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    };

    if(password.length < 8){
      return Alert.alert('Invalid password', 'Password must be at least 6 characters');   
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      setUser(FIREBASE_AUTH.currentUser); // Set the user in context
      router.replace('/(tabs)'); // Navigate after successful registration
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    };

  return (

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
            <MaterialIcons
                name="mail"
                size={20}
                color="#9d9d9d"
                style={styles.icon}
            />
            <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
            placeholderTextColor="#9d9d9d"
            />
        </View>
      
      <View style={styles.inputWrapper}>
        <MaterialIcons
            name="lock"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
        />
        <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry= {!isPasswordVisible}
        style={styles.textInput}
        placeholderTextColor="#9d9d9d"
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={20}
              color="#9d9d9d"
            />
          </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <MaterialIcons
            name="lock"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
        />
        <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry = {!isPasswordVisible}
            style={styles.textInput}
            placeholderTextColor="#9d9d9d"
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={20}
              color="#9d9d9d"
            />
          </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSignUp}>
        {loading ? (<ActivityIndicator size="large" />) : (
            <View style={styles.signUpButton}>
                <Text style={styles.SignUpButtonText}>
                    Sign Up
                </Text>
            </View>)}
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={() => router.push('/signIn')}>
            <Text style={styles.signUpText}>
                Already have an account? 
                <Text style={styles.signUpLink}> Sign In</Text>
            </Text>
        </TouchableOpacity>
      </View>
      </View>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    color: "#5F5F5F",
    fontSize: 25,
    fontWeight: "600",
  },
  titleLogin: {
    color: "#5F5F5F",
    fontSize: 15,
    marginTop: 10,
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
    gap: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A3F44",
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderRadius: 15,
  },
  textInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: "#fff",
  },
  icon: {
    marginRight: 10,
  },
  registerContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  signUpText: {
    color: "#5F5F5F",
    marginBottom: 100,
  },
  signUpLink: {
    color: "#456FE8",
    fontWeight: "600",
  },
  signUpButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  SignUpButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  errorMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
  },
});