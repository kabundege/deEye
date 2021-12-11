import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { colors } from "../helpers/colors";
import { globalStyles } from "../helpers/styles";
import Constants  from "expo-constants"
import { FontAwesome5 } from "@expo/vector-icons";

const WelcomeScreen = ({ navigation }) => (
    <View style={styles.screen}>
        <StatusBar style="dark" />
        <View style={styles.logo} >
            <Image style={[{ width:"100%",height:"100%",resizeMode:"contain" }]} source={require('../assets/images/Saly-31.png')} />
        </View>
        <Text style={styles.content}>
            A Global Community Platform to give families and friends access to support in finding missing loved ones
        </Text>
        <View style={[globalStyles.flexed,{ width:'80%' }]}>
            <Text style={styles.next} onPress={() => navigation.navigate('login')}>Next</Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.btn}>
                <FontAwesome5 size={20} color="white" name="chevron-right" />
            </TouchableOpacity>
        </View>
    </View>
);

export default WelcomeScreen;

const styles = StyleSheet.create({
    logo:{
        width:'100%',
        height:"40%",
    },
    content:{
        fontFamily:"Regular",
        color:colors.mainText,
        fontSize:20,
        marginHorizontal:'10%',
    },
    next:{
        fontFamily: "Bold",
        fontSize:20,
        color:colors.mutedText
    },
    btn: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        paddingHorizontal:23,
        paddingVertical:20,
    },
    screen:{
        flex:1,
        justifyContent:"space-around",
        paddingVertical:Constants.statusBarHeight,
        backgroundColor:colors.baseBg,
        alignItems:'center'
    }
});
