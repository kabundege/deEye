import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { colors } from "../helpers/colors";
import { globalStyles } from "../helpers/styles";

const bgColors = [
  "rgba(250, 250, 250, 0)",
  "rgba(250, 250, 250, 0)",
  "rgba(250, 250, 250,.6)",
  "rgba(250, 250, 250,.7)",
  "rgba(250, 250, 250, 1)",
  "whitesmoke",
];

export default function MyTabBar({ state, descriptors, navigation }) {
  return (
    <LinearGradient
      colors={bgColors}
      style={[globalStyles.flexed, styles.bottomSheet]}
    >
      {React.Children.toArray(
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const Label =
            options.tabBarIcon !== undefined
              ? options.tabBarIcon
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              {<Label focused={isFocused} />}
            </TouchableOpacity>
          );
        })
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    paddingVertical: 5,
    paddingBottom: 20,
    width: "100%",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:"whitesmoke",
    ...globalStyles.shadow,
    shadowOpacity:.5,
    elevation:3
  },
});
