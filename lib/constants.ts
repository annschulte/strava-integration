if (!process.env.REACT_NATIVE_SUPABASE_URL) {
  console.log(
    "constants.ts",
    "Make sure you have a `.env` file to populate your variables."
  );
}

console.log(process.env.REACT_NATIVE_SUPABASE_URL);

export const SUPABASE_URL = process.env.REACT_NATIVE_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY =
  process.env.REACT_NATIVE_SUPABASE_ANON_KEY || "";

export const Styles = {
  fontNormal: 20,
  fontMedium: 28,
  fontLarge: 34,
  fontExtraLarge: 40,
  colorPrimary: "black",
  spacing: 12,
};

const tintColorLight = "#2f43dc";
const tintColorDark = "#fff";
const tabColorDefault = "#454545";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: tabColorDefault,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#fff",
    tabIconSelected: tintColorDark,
  },
};

// import { Dimensions } from "react-native";

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

// export default {
//   window: {
//     width,
//     height,
//   },
//   isSmallDevice: width < 375,
// };
