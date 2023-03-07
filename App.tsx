import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import React from "react";
import { UserContextProvider, useUser } from "./lib/UserContext";
import Auth from "./screens/AuthScreen";

const Container = () => {
  const { user } = useUser();

  return user ? <HomeScreen /> : <Auth />;
};

export default function App() {
  return (
    <UserContextProvider>
      <View style={styles.container}>
        <Container />
        <StatusBar style="auto" />
      </View>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
