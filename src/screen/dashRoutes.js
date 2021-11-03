import React from 'react'
import { Dimensions,Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather,MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../helpers/colors';
import HomeScreen from './views/home';
import SearchScreen from './views/search';
import SettingsScreen from './views/settings';
import { StyleSheet, Text, View } from 'react-native';
import MyTabBar from '../components/bottomNav';
import { globalStyles } from '../helpers/styles';

const { height } = Dimensions.get('screen')
const Tab = createBottomTabNavigator();

export default () => {
  const headerShown = false;

  return (
    <Tab.Navigator 
      sceneContainerStyle={{
        backgroundColor:colors.baseBg
      }}
      
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName="home"
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            return (
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="home" color={ focused ? colors.primary : colors.strongIcon } size={26} />
              { focused ? <Text style={{fontSize:20,color:colors.primary}}>&bull;</Text> : <Text style={styles.label}>Home</Text>}
            </View>
          )},
        }}
      />
      <Tab.Screen
          name="search"
          component={SearchScreen}
          options={{
            headerShown,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconWrapper}>
                <Feather color="#fff" color={ focused ? colors.primary : colors.strongIcon }  name="search" size={25} />
              { focused ? <Text style={{fontSize:20,color:colors.primary}}>&bull;</Text> : <Text style={styles.label}>Search</Text>}
              </View>
            ),
          }}
        />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerShown,
          tabBarLabel: 'settings',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="cog" color={ focused ? colors.primary : colors.strongIcon } size={26} />
              { focused ? <Text style={{fontSize:20,color:colors.primary}}>&bull;</Text> : <Text style={styles.label}>Settings</Text>}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  label:{
    fontFamily:"Regular",
    textTransform:"uppercase",
    color:colors.dimeText,
    marginTop:5,
    fontSize: Platform.OS === "ios" ? 15 : 10
  },
  iconWrapper:{ 
    ...globalStyles.flexed,
    ...globalStyles.shadow,
    shadowOpacity:.1,
    flexDirection:'column',
    transform: [{ 
      translateY: Platform.OS === 'ios' ? 0 : height * 0.03
    }] 
  }
})
