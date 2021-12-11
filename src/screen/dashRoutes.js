import React, { useContext, useEffect } from "react";
import { Dimensions, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../helpers/colors";
import PostScreen from "./views/post";
import HomeScreen from "./views/home";
import SearchScreen from "./views/search";
import LibraryScreen from "./views/library";
import SettingsScreen from "./views/settings";
import { StyleSheet, Text, View } from "react-native";
import MyTabBar from "../components/bottomNav";
import { globalStyles } from "../helpers/styles";
import { StoreContext } from "../config/store";
import { getUserInfo } from "../API/user";
import { getAllPost } from "../API/posts";
import { getAllComments } from "../API/comments";

const { height } = Dimensions.get("screen");
const Tab = createBottomTabNavigator();

export default () => {
  const headerShown = false;

  const { user,posts,comments,handlerContext } = useContext(StoreContext)

  useEffect(()=>{
    if(!user)
    getUserInfo()
    .then(res => {
      if(res.status === 200){
        handlerContext('user',res.data)
      }
    })

    if(!posts[0])
    getAllPost()
    .then(res => {
      if(res.status === 200){
        handlerContext('posts',res.data)
      }
    })

    if(!comments[0])
    getAllComments()
    .then(res => {
      if(res.status === 200){
        handlerContext('comments',res.data)
      }
    })
  },[user,posts,comments])

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: colors.baseBg,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName="home"
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown,
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons
                  name="home"
                  color={focused ? colors.primary : colors.strongIcon}
                  size={26}
                />
                {focused ? (
                  <Text style={{ fontSize: 20, color: colors.primary }}>
                    &bull;
                  </Text>
                ) : (
                  <Text style={styles.label}>Home</Text>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          headerShown,
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <Feather
                color="#fff"
                color={focused ? colors.primary : colors.strongIcon}
                name="search"
                size={25}
              />
              {focused ? (
                <Text style={{ fontSize: 20, color: colors.primary }}>
                  &bull;
                </Text>
              ) : (
                <Text style={styles.label}>Search</Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="post"
        component={PostScreen}
        options={{
          headerShown,
          tabBarLabel: "Post",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <Feather
                name="plus-square"
                color={focused ? colors.primary : colors.strongIcon}
                size={26}
              />
              {focused ? (
                <Text style={{ fontSize: 20, color: colors.primary }}>
                  &bull;
                </Text>
              ) : (
                <Text style={styles.label}>Post</Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{
          headerShown,
          tabBarLabel: "Library",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <Ionicons
                name="md-library-sharp"
                color={focused ? colors.primary : colors.strongIcon}
                size={26}
              />
              {focused ? (
                <Text style={{ fontSize: 20, color: colors.primary }}>
                  &bull;
                </Text>
              ) : (
                <Text style={styles.label}>Library</Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerShown,
          tabBarLabel: "settings",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="cog"
                color={focused ? colors.primary : colors.strongIcon}
                size={26}
              />
              {focused ? (
                <Text style={{ fontSize: 20, color: colors.primary }}>
                  &bull;
                </Text>
              ) : (
                <Text style={styles.label}>Settings</Text>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "Medium",
    textTransform: "uppercase",
    color: colors.mutedText,
    marginTop: 5,
    fontSize:10,
  },
  iconWrapper: {
    ...globalStyles.flexed,
    ...globalStyles.shadow,
    shadowOpacity: 0.1,
    flexDirection: "column",
    transform: [
      {
        translateY: Platform.OS === "ios" ? 0 : height * 0.03,
      },
    ],
  },
});
