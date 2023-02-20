import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import LoginScreen from "./Screens/authScreen/LoginScreen";
import RegistrationScreen from "./Screens/authScreen/RegistrationScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="grid"
              size={24}
              color="#212121CC"
              backgroundColor="#171F33"
            />
          ),
          headerTitleAlign: "center",
          title: "Публікації",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
          },
          headerRight: () => (
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="pluscircle" size={34} color="#FF6C00" />
          ),
          headerTitleAlign: "center",
          title: "Створити публікацію",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
          },
        }}
        name="CreatePost"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={24} color="#212121CC" />
          ),
          headerTitleAlign: "center",
          title: "Профіль",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
          },
          headerRight: () => (
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
