import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import {  FIREBASE_AUTH } from '../firebase';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from 'expo-router';
import { useAuth } from '@/components/AuthContext';
import { useAnimatedKeyboard } from 'react-native-reanimated';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser, user} = useAuth();
  const router = useRouter();
  const keyboard = useAnimatedKeyboard();



  useEffect(() => {
    if (user) {
      router.push('/(tabs)'); // Redirect to the home page
    }
  }
  , [user]);
  // Redirect if already logged in
  
  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please re-enter email');
      return;
    };

    if(!email || !password){
      return Alert.alert('Invalid input', 'Please enter email and password');
    }
    
    
    try{
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      //console.log(response);
      setUser(response.user);
      // navigate user to the index home screen 
      router.push('/(tabs)');
    }catch(error : any){
      console.log(error);
      alert('Login failed');
    }finally{
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View>
          <Text style={styles.title}>Login</Text>
        </View>
        <View>
          <Text style={styles.titleLogin}>
            Please login to continue.
          </Text>
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
              onSubmitEditing={handleLogin}
              secureTextEntry={!isPasswordVisible} // Bổ sung thuộc tính secureTextEntry để ẩn mật khẩu
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
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>
                {isLoading ? "Logging in..." : "Login"}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <TouchableOpacity
            onPress={() => router.push('/signUp')}
            >
              <Text style={styles.registerText}>
                Don’t have an account? <Text style={styles.registerLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

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
  registerText: {
    color: "#5F5F5F",
    marginBottom: 100,
  },
  registerLink: {
    color: "#456FE8",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    
  },
  loginButtonText: {
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