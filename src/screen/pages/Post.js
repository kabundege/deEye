import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text,StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import InputField from '../../components/input';
import { StoreContext } from '../../config/store';
import { colors } from '../../helpers/colors';
import { globalStyles } from '../../helpers/styles';
import moment from 'moment';
import "moment-timezone";
import { createComment } from '../../API/comments';
import { sendNotification } from '../../API/user';
import { SimpleCancelableNotification, SimpleNotification } from '../../components/alert';
import env from '../../helpers/env';
import { ChangeStatus } from '../../API/posts';

const { height,width } = Dimensions.get('screen')

const Section = ({label,info}) => (
    <View style={styles.section}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.info}>{ info || "Not Specified" }</Text>
    </View>
)

export default function PostScreen({ navigation,route }) {
    const { comments,views,posts,handlerContext,user } = useContext(StoreContext)
    const [ showModal,setModal ] = useState(false)
    const [ state,setState ] = useState('active')
    const [ loading,setLoader ] = useState(false)
    const [ allComents,setComents ] = useState([])
    const [ toggleLoader,setToggler ] = useState(false)
    const [ newComment,setComment ] = useState(null)
    const { data } = route.params;

    useEffect(()=>setComents( comments[0] ? comments.filter(one => one.story_id === data._id ) : []),[comments]);

    useEffect(()=>{
        const exists = views.find(one => one.story_id === data._id)
        if(!exists){
            const newView = {
                id:views.length+1,
                story_id:data.id,
            }
            handlerContext('views', [ ...views,newView ])
        }
    },[])

    useEffect(()=>{
        setState(data.status)
    },[])

    const toggleModal = () => setModal(!showModal);

    const submitComment = () => {
        const payload = {
            content: newComment,
            story_id:data._id,
            creator_id:user._id,
        }
        createComment(payload)
        .then(res => {
            if(res.status === 201){
                handlerContext('comments',[ res.data,...comments ]);
                setComment(null);
            }else{
                SimpleNotification("Erro sending notification",res.error,()=>{})
            }
        })
    }

    const toggleCase = () => {
        const status = data.status === 'active' ? 'closed' : 'active' ;
        setToggler(true)
        ChangeStatus(data._id,{ status })
        .then(res => {
            if(res.status === 200){
                const newPosts = posts.map( one => {
                    if(one._id === data._id) return { ...one,status }
                    else return one
                })
                handlerContext('posts',newPosts)
                setState(status)
            }else{
                SimpleNotification('Case Change Failed',res.error,()=>{})
            }
        }).catch(er => SimpleNotification('Case Update Failed',er.message,()=>{})
        ).finally(()=>setToggler(false))
    }

    const sendSmS = () => {
        const payload = {
            from:user.phone_number,
            to:data.phone_number
        }
        setLoader(true)
        sendNotification(payload)
        .then(res => {
          if(res.status === 200) {
            SimpleNotification('SMS sent successfuly','Thank you for your coorperation,we will reach out shortly',()=>{})
          }else{
              SimpleNotification('Sending SMS failure',res.error,()=>{})
          }
        }).finally(()=>setLoader(false))
    }

    const imageUri = () => {
        if (data.image.includes('https')){
            return data.image
        }else{
            return env.REACT_APP_API_URL+"/uploads/"+data.image;
        }
    }

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
                <Section label="Telephone" info={data.phone_number} />
                {
                    /** a user should no be able to send an sms to her/him self, the button will be hidden */
                    data?.creator_id !== user?._id &&
                    <TouchableOpacity onPress={sendSmS} style={[globalStyles.flexed,styles.smsBtn]}>
                        <FontAwesome5 name="bullhorn" color={colors.dimeText} size={30} />
                        <View  style={{flex:.6}}>
                            <Text style={[styles.mainText,{ color:colors.mainText }]} >Send A Notification </Text>
                            <Text style={[styles.minText,{color:colors.mainText}]} >
                                {
                                    loading ?
                                        "Loading...":
                                        "SMS ( CallBack )"
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={toggleModal} style={[globalStyles.flexed,styles.smsBtn,styles.btn]}>
                    <MaterialCommunityIcons name="cellphone-message" size={40} color={"#ccc"} />
                    <View style={{flex:.6}}>
                        <Text style={styles.mainText} >View Comments</Text>
                        <Text style={styles.minText} >And Contribute </Text>
                    </View>
                </TouchableOpacity>
                {
                    data?.creator_id === user?._id && 
                        <TouchableOpacity 
                            onPress={()=>
                                SimpleCancelableNotification(
                                    'Are You Sure ?',
                                    `you want to ${ data.status === 'active' ? 'close' : 'activate' } this post`,
                                    toggleCase)} 
                            style={[
                                globalStyles.flexed,
                                styles.smsBtn,
                                styles.btn,
                                {  
                                    backgroundColor: state == 'closed' ? colors.secondary :  colors.success,
                                    marginTop:-(height*0.03),
                                    marginVertical:0,
                                }
                            ]}
                        >
                            { 
                                state === 'active' 
                                    ? <Feather name="check-circle" size={20} color={"white"} />
                                    : <AntDesign name="closecircle" size={20} color={"white"} />
                            }
                            <View style={{flex:.6}}>
                                <Text style={styles.mainText} > Case status</Text>
                                <Text style={styles.minText} > { toggleLoader ? "Loading..." : state } </Text>
                            </View>
                        </TouchableOpacity>
                }
            </ScrollView>
            <View style={styles.imageWrapper}>
                <Image source={{ uri:imageUri() }} style={[StyleSheet.absoluteFillObject,{ borderBottomLeftRadius:100 }]} />
            </View>
            {
                showModal &&
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[globalStyles.safeAreaView,styles.modals]}>
                        <View style={styles.overlay2}/>
                        <TouchableOpacity onPress={toggleModal} style={styles.closer} >
                            <AntDesign name="close" size={35} color={"white"} />
                        </TouchableOpacity>
                        <View style={styles.body}>
                            <View style={[globalStyles.flexed,{ backgroundColor:"whitesmoke" }]}>
                                <InputField
                                    value={newComment}
                                    placeholder="Write Your Comment..."
                                    styles={styles.textArea}
                                    multiple={true}
                                    onChange={(value) =>{ 
                                        if(value) setComment(value) 
                                        else setComment(null)
                                    }}
                                    iconRight={
                                        <View style={[globalStyles.flexed,{ marginTop:5 }]}>
                                            {
                                                newComment &&
                                                <TouchableOpacity style={{marginRight:10}} onPress={()=>setComment(null)} >
                                                    <AntDesign color={colors.dimeText} name="close" size={25} />
                                                </TouchableOpacity>
                                            }
                                            <TouchableOpacity onPress={submitComment}>
                                                <Text style={styles.post} >Post</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.msgs} >
                                {
                                    React.Children.toArray(
                                        allComents.map(one =>
                                            <View style={styles.comment}>
                                                <Text style={styles.commentName}>{one.creator_name || "John Doe" }</Text>
                                                <Text style={styles.commentContent}>{one.content}</Text>
                                                <Text style={styles.timeStamp}>{moment(one.createdAt).fromNow()}</Text>
                                            </View>
                                        )
                                    )
                                }
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainText:{ fontFamily:"Bold",fontSize:15,color:"white" },
    minText:{ fontFamily:"Medium",fontSize:15,color:"white",textTransform:"capitalize" },
    smsBtn:{ 
        justifyContent:"space-evenly",
        backgroundColor:colors.note,
        paddingVertical:10 
    },
    timeStamp:{
        textAlign:"right",
        marginTop:5
    },
    commentContent:{
        fontFamily:"Regular",
        color:colors.mutedText,
        marginVertical:'2%'
    },
    commentName:{
        fontFamily:"SemiBold",
        color:colors.mainText,
    },
    comment:{
        backgroundColor:'whitesmoke',
        marginVertical:'3%',
        padding:'5%'
    },
    textArea:{
        backgroundColor:"whitesmoke",
        alignItems:"flex-start",
        paddingTop:10,
    },
    post:{
        fontFamily:"Bold",
        fontSize:15,
        color:colors.mainText
    },
    msgs:{
        flex:1
    },
    body:{
        backgroundColor:'white',
        height:height-globalStyles.safeAreaView.paddingTop*3,
        width:width*0.85,
        borderRadius:20,
        marginBottom:height*0.05,
        marginTop:height*0.02,
        borderWidth:2,
        borderColor:'whitesmoke',
        overflow:"hidden"
    },
    closer:{
        width:width*0.8,
        alignItems:"flex-end"
    },
    overlay2:{
        backgroundColor:colors.primary,
        position:"absolute",
        width,height,
        opacity:.6,
        zIndex:0
    },
    modals:{
        position:'absolute',
        width,
        height,
        top:0,
        left:0,
        zIndex:5,
        justifyContent:"flex-end",
        alignItems:"center",
        ...globalStyles.shadow,
        shadowOpacity:.5
    },
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
        // width:width,
        // marginHorizontal:width*.20,
        marginBottom:height*0.05,
        marginTop:height*0.02,
        borderWidth:0,
        borderRadius:0,
        marginVertical:0,
        shadowOpacity:0,
        backgroundColor:colors.primary
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
