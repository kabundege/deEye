import React from 'react'
import { View,Text,Image,StyleSheet,TouchableOpacity } from 'react-native'
import { colors } from '../helpers/colors'
import { globalStyles } from '../helpers/styles'
import { Feather } from '@expo/vector-icons'

const Header = () => (
    <View style={[globalStyles.flexed,styles.container]} >
        <Text style={styles.text}>Cinetie</Text>
        <TouchableOpacity style={styles.iconWrapper}>
            <Feather name="user" size={25} color={'lightgrey'} />
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    icon:{
        width:50,
        height:50
    },
    text:{
        color:colors.primary,
        fontFamily:"SemiBold",
        fontSize:25
    }, 
    iconWrapper:{
        backgroundColor:'#1a1a1a',
        padding:10,
        borderRadius:15
    },
    container:{
        paddingHorizontal:30
    }
})

export default Header
