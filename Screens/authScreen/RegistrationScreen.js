import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  login: "",
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    console.log(state);
    Keyboard.dismiss();
    setState(initialState);
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Text style={styles.formTitle}>Реєстрація</Text>
          <View style={styles.form}>
            <View style={{ marginTop: 32 }}>
              {/* <Text style={styles.inputTitle}>Логін</Text> */}
              <TextInput
                style={styles.input}
                textAlign={"left"}
                placeholder="Логін"
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
            </View>
            <View style={{ marginTop: 16 }}>
              {/* <Text style={styles.inputTitle}>Адреса електроної пошти</Text> */}
              <TextInput
                style={styles.input}
                textAlign={"left"}
                placeholder="Адреса електроної пошти"
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={{ marginTop: 16 }}>
              {/* <Text style={styles.inputTitle}>Пароль</Text> */}
              <TextInput
                style={styles.input}
                textAlign={"left"}
                secureTextEntry={true}
                placeholder="Пароль"
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.formButton}
              onPress={keyboardHide}
            >
              <Text style={styles.textButton}>Зареєструватись</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.regForm}>Вже є обліковий запис?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginForm}>Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    placeholderTextColor: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },
  form: {
    marginHorizontal: 16,
  },
  formTitle: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  formButton: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
  },
  regForm: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    marginTop: 14,
    textAlign: "center",
  },
  loginForm: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
});
