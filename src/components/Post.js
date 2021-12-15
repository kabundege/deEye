import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { StyleSheet, Text, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { colors } from '../helpers/colors'
import env from '../helpers/env'
import { globalStyles } from '../helpers/styles'

const br = 30;

const { height,width } = Dimensions.get('screen')

export default function Post({ navigation,data,isLast }) {
    const imageRef = useRef();
    const imageUri = () => {
        if (data.image.includes('https')){
            return data.image
        }else{
            return env.REACT_APP_API_URL+"/uploads/"+data.image;
        }
    }
    const onPress = () => navigation.navigate('specificPost',{ data })
    return (
        <TouchableOpacity onPress={onPress} style={[styles.wrapper,{ marginTop: data.index % 2 ? '6%' : data.index ? '-3%' : '-1%' ,marginBottom: isLast ? height*0.1 : 0 }]}>
            <Image ref={imageRef} source={{ uri:imageUri() }} style={styles.image} />
            <Text numberOfLines={2} style={styles.name}>{data.name}</Text>
            <ActivityIndicator />
            <Text numberOfLines={1} style={[styles.content,{ backgroundColor: data.type.includes('ost') ? colors.secondary : colors.success }]}>    
                {data.type + " "} 
                {
                    data.status === 'active' &&
                    <MaterialCommunityIcons name="airplane-takeoff"  />
                }
                {
                    data.status === 'closed' &&
                    <MaterialCommunityIcons name="lock"  />
                }
                {
                    data.status === 'dormant' &&
                    <MaterialCommunityIcons name="bed"  />
                }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    name:{
        fontFamily:'Bold',
        fontSize:25,
        color:colors.baseBg,
        position:"absolute",
        bottom:0,
        left:0,
        padding:5,
        ...globalStyles.textShadow,
        textTransform:"capitalize",
        zIndex:2,
        width:'100%',
        textAlign:'center'
    },
    content:{
        fontFamily:"Bold",
        fontSize:15,
        textTransform:"capitalize",
        color:"white",
        position:"absolute",
        top:0,
        left:0,
        padding:2,
        shadowRadius:1,
        shadowOpacity:.1,
        shadowOffset:{width:2,height:3},
        zIndex:2
    },
    image:{
        width:"100%",
        height:'100%',
        resizeMode:"cover",
        position:"absolute",
        zIndex:1,
        borderTopRightRadius:br,
        borderBottomLeftRadius:br,
    },
    wrapper:{
        width:width*0.46,
        height:250,
        marginLeft:'2.8%',
        backgroundColor:"whitesmoke",
        justifyContent:"center",
        alignItems:"center",
        borderTopRightRadius:br,
        borderBottomLeftRadius:br,
    }
})
