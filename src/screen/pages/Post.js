import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react'
import { View, Text,StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import { StoreContext } from '../../config/store';
import { colors } from '../../helpers/colors';
import { globalStyles } from '../../helpers/styles';

const { height,width } = Dimensions.get('screen')

const Section = ({label,info}) => (
    <View style={styles.section}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.info}>{ info || "Not Specified" }</Text>
    </View>
)

export default function PostScreen({ navigation,route }) {
    const { data } = route.params;
    const { user } = useContext(StoreContext)
    return (
        <View style={styles.screen}>
            <StatusBar style="dark" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: '5%',position:"relative",zIndex:3 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backWrapper}>
                    <FontAwesome5 size={20} color={colors.mainText} name="chevron-left" />
                </TouchableOpacity>
                <Text numberOfLines={2} style={styles.name}>{data.name}</Text>
                <Section label="Person" info={data.type === 'lost' ? 'Missing' : 'Found'} />
                <Section label="Age" info={data.age ?  `${data.age} Years` : "Not Specified"} />
                <Section label="Complexion" info={data.complexion} />
                <Section label="Gender" info={data.gender} />
                <Section label="Nationality" info={data.nationality} />
                <Section label="Location" info={data.location} />
                <View style={styles.section}>
                    <Text style={styles.label}>Description</Text>
                    <Text numberOfLines={5} style={[styles.info,{ fontFamily:"Medium" }]}>{ data.description || "Not Specified" }</Text>
                </View>
                <Section label="Case Status" info={data.status} />
                <Section label="Telephone" info={data.phoneNumber} />
                <View style={[globalStyles.flexed,styles.btns]}>
                    <TouchableOpacity style={[globalStyles.btn,styles.btn,{ backgroundColor:'white' }]}>
                        <Text style={[globalStyles.btnText,styles.btnText,{ color:colors.primary }]}>Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[globalStyles.btn,styles.btn]}>
                        <Text style={[globalStyles.btnText,styles.btnText]}>Comment</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.imageWrapper}>
                <Image source={{ uri:data.image }} style={[StyleSheet.absoluteFillObject,{ borderBottomLeftRadius:100 }]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btns:{ 
        marginTop:10,
        marginBottom:height*0.05,
        backgroundColor:colors.primary,
        borderRadius:30,
        borderWidth:2,
        borderColor:"whitesmoke",
    },
    btnText:{
        color:"white",
    },
    btn:{
        width:width*0.45,
        borderWidth:0,
        marginVertical:0,
        shadowOpacity:0,
    },
    overlay:{
        position:"absolute",
        height:"100%",
        width:"100%",
        left:0,
        top:0,
        zIndex:1
    },
    imageWrapper:{
        position:'absolute',
        height:height*0.65,
        width:width*0.6,
        right:0,
        top:0,
        borderLeftWidth:2,
        borderBottomWidth:2,
        borderColor:"whitesmoke",
        borderBottomLeftRadius:103,
        backgroundColor:"whitesmoke"
    },
    section:{
        marginVertical:'5%'
    },
    info:{
        fontFamily:"Bold",
        color:colors.mainText,
        fontSize:20,
        textShadowRadius:1.5,
        textShadowColor:'whitesmoke',
        textTransform:"capitalize"
    },
    label:{
        fontFamily:"Bold",
        color:colors.dimeText,
        fontSize:15,
        textShadowRadius:2,
        textShadowColor:'whitesmoke',
    },
    name:{
        fontFamily:"Black",
        color:colors.primary,
        fontSize:30,
        width:width*0.5,
    },
    backWrapper:{
        marginTop:globalStyles.safeAreaView.paddingTop,
        marginBottom:globalStyles.safeAreaView.paddingTop/2,
        paddingHorizontal:'2.5%'
    },
    screen:{
        flex:1,
        backgroundColor:colors.baseBg
    }
})
