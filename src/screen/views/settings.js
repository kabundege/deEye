import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext,useState,useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StoreContext } from '../../config/store';
import { colors } from '../../helpers/colors';
import { globalStyles } from '../../helpers/styles';

export default function Settings ({ navigation }) {
    const { user,posts,comments } = useContext(StoreContext);
    const [ creds,setCreds ] = useState({ allPosts:0,allComments:0,views:0 });
    const { allPosts,allComments,views } = creds;

    useEffect(()=>{
        const posts = () => {} 
    },[])

    const logout = () => {
        AsyncStorage.clear()
        .then(()=> {
            navigation.replace('landing')
        })
    };

    return (
        <View style={styles.screen}>
            <View  style={globalStyles.blobCircle} />
            <View style={globalStyles.safeAreaView}>
                <Feather name="user" size={50} color={'white'} style={{ marginVertical:"25%",opacity:.5 }} />
            </View>
            <View style={styles.form}>
                <Text numberOfLines={2} style={styles.headerText}>{user.name}</Text>
                <View style={globalStyles.divider}/>
                <View style={globalStyles.flexed}>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Posts</Text>
                        <Text style={styles.value}>{allPosts}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Comments</Text>
                        <Text style={styles.value}>{allComments}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Views</Text>
                        <Text style={styles.value}>{views}</Text>
                    </View>
                </View>
                <View style={[globalStyles.flexed,{ marginTop:"10%" }]}>
                    <Text style={styles.logout}>Sign Out</Text>
                    <TouchableOpacity onPress={logout} style={styles.btn}>
                        <Feather name="log-out" color={"white"} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View/>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:colors.primary,
        padding:20,
        borderRadius:40
    },
    logout:{
        fontSize:20,
        fontFamily:'Regular',
        color:colors.dimeText,
    },
    wrapper:{
        justifyContent:"center",
        alignItems:"center"
    },
    value:{
        fontFamily:"Bold",
        fontSize:20,
        color:colors.mainText
    },
    label:{
        fontFamily:"SemiBold",
        fontSize:20,
        color:colors.mutedText
    },
    form:{
        flex:.6,
        justifyContent:"space-evenly",
        paddingHorizontal:"10%"
    },
    headerText:{
        fontFamily: 'Bold',
        color: colors.mainText,
        fontSize: 30,
    },
    screen:{
        flex:1,
        justifyContent:"space-between"
    }
});
