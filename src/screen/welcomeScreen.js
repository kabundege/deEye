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
        <StatusBar style="light" />
        <View style={styles.logo} >
            <Image style={[{ width:"100%",height:"100%",resizeMode:"contain" }]} source={require('../assets/images/Saly-31.png')} />
        </View>
        <Text style={styles.content}>
            Ihuriro rusange ryumuryango kugirango uhe imiryango n'inshuti kubona inkunga mugushakisha ababo babuze.
        </Text>
        <View style={[globalStyles.flexed,{ width:'80%' }]}>
            <Text style={styles.next} onPress={() => navigation.navigate('login')}>Komeza</Text>
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
        fontFamily:"Medium",
        color:colors.mutedText,
        fontSize:20,
        marginHorizontal:'10%',
        textAlign:'center'
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
