import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text,StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import InputField from '../../components/input';
import { StoreContext } from '../../config/store';
import { colors } from '../../helpers/colors';
import { globalStyles } from '../../helpers/styles';
import moment from 'moment';
import "moment-timezone";

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
    const [ allComents,setComents ] = useState([])
    const [ newComment,setComment ] = useState(null)
    const { data } = route.params;

    useEffect(()=>setComents(comments.filter(one => one.story_id === data.id )),[comments]);

    useEffect(()=>{
        const exists = views.find(one => one.story_id === data.id)
        if(!exists){
            const newView = {
                id:views.length+1,
                story_id:data.id,
            }
            handlerContext('views', [ ...views,newView ])
        }
    },[])

    const toggleModal = () => setModal(!showModal);

    const submitComment = () => {
        const payload = {
            content: newComment,
            id:comments.length+1,
            creator:user,
            creator_id:user.id,
            story_id:data.id,
            timeStamp:Date.now(),
        }
        handlerContext('comments',[ payload,...comments ])
        setComment(null)
    }

    const closecase = () => {
        const newPosts = posts.map( one => {
            if(one.id === data.id) return { ...data,status: data.status === 'active' ? 'closed' : 'active' }
            else return one
        })
        handlerContext('posts',newPosts)
        data[status] = data[status] === 'active' ? 'closed' : 'active'
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
                <Section label="Telephone" info={data.phoneNumber} />
                <TouchableOpacity onPress={toggleModal} style={[globalStyles.btn,globalStyles.flexed,styles.btn]}>
                    <Text style={[globalStyles.btnText,styles.btnText]}>Comment</Text>
                    <Feather name="arrow-right" size={20} color={"white"} />
                </TouchableOpacity>
                {
                    data?.creator_id === user.id && 
                        <TouchableOpacity 
                            onPress={closecase} 
                            style={[
                                globalStyles.btn,
                                globalStyles.flexed,
                                styles.btn,
                                {  
                                    backgroundColor: data?.status == 'closed' ? colors.secondary :  colors.success,
                                    marginTop:0 
                                }
                            ]}
                        >
                            <Text style={[globalStyles.btnText,styles.btnText]}>{ data.status === 'active' ? 'Close case' : 'Re-open case'}</Text>
                            { data.status == 'active' && <Feather name="check" size={20} color={"white"} />}
                        </TouchableOpacity>
                }
            </ScrollView>
            <View style={styles.imageWrapper}>
                <Image source={{ uri:data.image }} style={[StyleSheet.absoluteFillObject,{ borderBottomLeftRadius:100 }]} />
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
                                                <Text style={styles.commentName}>{one.creator?.name}</Text>
                                                <Text style={styles.commentContent}>{one.content}</Text>
                                                <Text style={styles.timeStamp}>{moment(one.timestamp).fromNow()}</Text>
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
        width:width*0.5,
        marginHorizontal:width*.20,
        marginBottom:height*0.05,
        marginTop:height*0.02,
        borderWidth:0,
        borderRadius:0,
        marginVertical:0,
        shadowOpacity:0,
        borderBottomLeftRadius:30,
        borderTopRightRadius:30,
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
