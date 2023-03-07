import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Styles } from "../lib/constants";
import { supabase } from "../lib/supabase";

import { Button, Input } from "react-native-elements";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");

  const handleLogin = async (type: string, email: string) => {
    setLoading(type);
    const { error, user } =
      type === "LOGIN"
        ? await supabase.auth.signIn({ email })
        : await supabase.auth.signUp({ email });
    if (!error && !user) Alert.alert("Check your email for the login link!");
    if (error) Alert.alert(error.message);
    setLoading("");
  };

  return (
    <View>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>

      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Button
          title="Sign in"
          disabled={!!loading.length}
          loading={loading === "LOGIN"}
          onPress={() => handleLogin("LOGIN", email)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: Styles.spacing,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
