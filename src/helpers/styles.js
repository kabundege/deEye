import { Dimensions,StyleSheet } from 'react-native'
import { colors } from './colors'
import Constants from 'expo-constants'

const { width,height } = Dimensions.get('screen')
export const borderRadius = 15

export const globalStyles = StyleSheet.create({
    divider:{
        width:"100%",
        borderBottomWidth:2,
        borderBottomColor:colors.mutedText
    },
    blobCircle:{
        position:'absolute',
        width:width*0.85,
        height:width*0.85,
        borderRadius:width*0.8,
        backgroundColor:colors.primary,
        top:-height*0.01,
        left:-width*0.25
    },
    topFadder:{
        width:'100%',
        height:20,
        position:'absolute',
        top:0,
        zIndex:1
    },
    gradientWrapper:{ 
        transform: [{ rotate:'-10deg' }],
        position:'absolute',
        top:0,
        left: - width*0.4
    },
    topGradient:{
        position:'absolute',
        width: width*1.8,
        height:height*0.2,
    },
    backhandler:{
        backgroundColor:colors.baseBg,
        padding:7,
        borderRadius:15,
        borderWidth:2,
        borderColor:'rgba(0,0,0,.6)',
        shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:1,
        shadowRadius:10
    },
    header:{
        marginHorizontal:"5%",
        paddingVertical:5
    },
    flexed:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    centerd:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        width:'100%',
        height:'100%'
    },
    btn: {
        padding:20,
        borderRadius:borderRadius+10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderWidth:2,
        borderColor:"rgba(0,0,0,0.1)",
        shadowOffset:{width:0,height:0},
        shadowOpacity:.3,
        shadowRadius:10
    },
    btnText:{
        fontFamily:"SemiBold",
        fontSize:20,
        color:colors.mainText,
    },
    shadow:{
        shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:1,
        shadowRadius:10
    },
    textShadow:{
        textShadowColor:"rgba(0,0,0,.5)",
        textShadowOffset:{width:0,height:0},
        textShadowRadius:5,
    },
    inputField:{
      borderWidth:2,
      borderColor:"whitesmoke",
      marginVertical:10,
      borderRadius:35,
      flexDirection:"row",
      alignItems:"center",
      paddingHorizontal:15,
      backgroundColor:colors.baseBg,
      shadowColor:'whitesmoke',
      shadowOffset:{width:0,height:0},
      shadowRadius:10,
      shadowOpacity:1
    },
    input:{
      flex:1,
      paddingVertical:20,
      paddingHorizontal:10,
      color:colors.mainText,
      fontFamily:"Medium",
      fontSize:15
    },
    safeAreaView:{
        paddingTop: Constants.statusBarHeight + 5,
        paddingHorizontal: width*0.1,
    }
})
