import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext,useState,useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StoreContext } from '../../config/store';
import { colors } from '../../helpers/colors';
import { globalStyles } from '../../helpers/styles';

export default function Settings ({ navigation }) {
    const { user,posts,comments,views } = useContext(StoreContext);
    const [ creds,setCreds ] = useState({ allPosts:0,allComments:0,allViews:0 });
    const { allPosts,allComments,allViews } = creds;

    useEffect(()=>{
        setCreds(() => {
            const currentPosts = posts.filter( one => one.creator_id == user?._id );
            const currentComments = comments.filter( one => one.creator_id == user?._id );
            return {
                allPosts: currentPosts.length,
                allComments: currentComments.length,
                allViews: views.length,
            }
        })
    },[posts,comments,views])

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
                <Text numberOfLines={2} style={styles.headerText}>{user?.name}</Text>
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
                        <Text style={styles.value}>{allViews}</Text>
                    </View>
                </View>
                <View style={[globalStyles.flexed,{ marginTop:"10%" }]}>
                    <View style={globalStyles.flexed}>
                        <Feather name="log-out" size={20} color={colors.dimeText} style={{marginRight:5}} />
                        <Text style={styles.logout}>Sign Out</Text>
                    </View>
                    <TouchableOpacity onPress={logout} style={styles.btn}>
                        <Feather name="chevron-right" color={"white"} size={25} />
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
