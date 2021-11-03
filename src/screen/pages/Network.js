import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../helpers/colors";
import { globalStyles } from "../../helpers/styles";

const { width } = Dimensions.get("screen");

export default function NetworkScreen({ navigation,route }) {
    // const { action } = route.params
    const [ retrying,setRetry ] = useState(false);
    const retry = () => {
        setRetry(true);
        action()
        .then(() => {
            setRetry(true);
            navigation.goBack();
        }).catch(er => setRetry(false))
    }

    return (
        <View style={styles.screen}>
            <View style={globalStyles.gradientWrapper}>
                <LinearGradient style={globalStyles.topGradient} colors={[ colors.primary,colors.baseBg ]} />
            </View>
            <Text style={styles.internet}>No Internet</Text>
            <Text style={styles.connection}>Connection</Text>
            <Text style={styles.content}>
                Please check your internet connection, {"\n"}And try again
            </Text>
            <TouchableOpacity onPress={retry} style={[globalStyles.btn,styles.btn]}>
                <Text style={[globalStyles.btnText,styles.btnText]}>
                    {   
                        !retrying ? 
                            'Try Again' : 
                            <ActivityIndicator size={18} color={colors.darkText} />
                    }
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:colors.primary,
        width:width*0.5,
        padding:15
    },
    btnText:{
    },
    content: {
        fontFamily: "Regular",
        color: colors.mutedText,
        fontSize: width * 0.045,
        marginVertical:"10%"
    },
    connection: {
        fontFamily: "Bold",
        color: colors.mainText,
        fontSize: width * 0.13,
        marginTop:'-5 %'
    },
    internet: {
        fontFamily: "SemiBold",
        color: colors.primary,
        fontSize: width * 0.11,
    },
    screen: {
        flex: 1,
        backgroundColor: colors.baseBg,
        justifyContent: "center",
        paddingLeft: width * 0.1,
    },
});
