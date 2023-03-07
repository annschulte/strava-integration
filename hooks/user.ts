import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useLogout = () => {
  const handleLogout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.log("logout issue");
      alert(error.error_description || error.message);
    }
  }, []);
  return { handleLogout };
};

export const useSession = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setLoading(false);
  }, []);
  return { session, loading, setLoading };
};

export const useProfile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [strava, setStrava] = useState<string>("");
  const getProfile = useCallback(async () => {
    const user = supabase.auth.user();
    if (user) {
      try {
        let { data, error, status } = await supabase
          .from("profiles")
          .select()
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        console.log(data);

        if (data) {
          setStrava(data.strava);
        }
      } catch (error: any) {
        alert(error?.message);
      } finally {
        setLoading(false);
      }
    }
  }, []);
  getProfile();
  return { loading, avatarUrl, strava };
};

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [buttonTxt, setButtonTxt] = useState<string>("Lets go!");
  const [email, setEmail] = useState<string>("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoadingLogin(true);
      if (!supabase)
        throw new Error(
          "We have to initilize the magic client before use the hook. Or the Client can not use in Server Side process."
        );
      try {
        if (!email) throw new Error("Email is required");
        setErrorMessage("");
        setButtonTxt("Please check your email a click the link provided");
        await supabase.auth.signIn({ email });
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingLogin(false);
      }
    },
    [email]
  );
  return {
    email,
    setEmail,
    errorMessage,
    handleLogin,
    loadingLogin,
    setLoadingLogin,
    buttonTxt,
    setButtonTxt,
  };
};
