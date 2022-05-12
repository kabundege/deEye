import * as React from "react";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../helpers/colors";
import { globalStyles } from "../helpers/styles";

const { height,width } = Dimensions.get("screen")

export default function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={[globalStyles.flexed, styles.bottomSheet]}  >
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
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    width,
    borderTopWidth: 0,
    backgroundColor:"whitesmoke",
    paddingVertical: height * 0.01,
  },
});
