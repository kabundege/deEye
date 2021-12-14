import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../../helpers/colors';
import { globalStyles } from '../../helpers/styles';
import { Feather, FontAwesome, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import InputField from '../../components/input';
import { StoreContext } from '../../config/store';
import { createPost } from '../../API/posts';
import { StatusBar } from 'expo-status-bar'
import { SimpleNotification } from '../../components/alert';
import Fetch from "node-fetch";

const { height,width } = Dimensions.get("screen")

const genders = [ 'male',"female" ]
const types = [ 'lost',"found" ]

const createFormData = (image, body = {}) => {
    const data = new FormData();
  
    data.append('image', {
      name: image.fileName || "John Doe",
      type: image.type || "jpg",
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  };


export default function Post() {
    const [ creds,setCreds ] = useState({});
    const [ image,setPickImage ] = useState(null);
    const [ showModal,setModal ] = useState(false);
    const [ loading,setLoader ] = useState(false);
    const [ error,setError ] = useState(null);
    const { user,posts,handlerContext } = useContext(StoreContext)

    const { name,age,gender,phoneNumber,description,type,complexion,location,nationality } = creds;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [5, 5],
          allowsMultipleSelection: true,
          quality: 1,
        });
        if (!result.cancelled) {
          setModal(false);
          setPickImage(result);
        }
    }
    
    const captureImage = async () => {
        const res = await ImagePicker.getCameraPermissionsAsync();
        if (res.granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
                allowsMultipleSelection: true,
                aspect: [5, 5],
            });
            if (!result.cancelled) {
                setModal(false);
                setPickImage(result);
            }
        } 
    }

    const upload = () => {
        if(
            image && type && types.indexOf(String(type).toLowerCase()) !== -1
        ){
            const {  phone_number } = user;
            const newCase = {
                ...creds,
                phone_number:phoneNumber
                }
            
            delete newCase.phoneNumber;
            setLoader(true);
            // createPost(createFormData(image,newCase))
            Fetch('https://deeye-backend.herokuapp.com/posts',{
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    phone_number, 
                },
                body:createFormData(image,newCase)
            })
            .then(res => res.json())
            .then(res => {
                if(res.status === 201){
                    handlerContext('posts',[ res.data,...posts ])
                    setCreds({})
                    setPickImage(null)
                }else{
                    SimpleNotification('Case Posting failed',res.error,()=>{})
                }
            }).catch(err => setError(err.message))
            .finally(()=>setLoader(false))
        }else{
            setError("Missing some fields")
        }
    }

    const handlerChange = (key,value) => {
        setCreds(prevCred => ({ ...prevCred,[key]:value }))
        setError(null)
    }

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback onPress={()=>setModal(!showModal)}>
                <View style={styles.imageWrapper}>
                    <SimpleLineIcons name="cloud-upload" size={100} color={"whitesmoke"} style={{position:"relative",zIndex:1}} />
                    <Text style={styles.imageText}>Upload an image here</Text>
                    {
                        image &&
                        <Image source={{ uri:image.uri }} style={styles.image} />
                    }
                    {
                        showModal && 
                        (
                            <View style={styles.options}>
                                <TouchableOpacity
                                    onPress={() => captureImage()}
                                    style={[styles.optionsWrapper, styles.capture]}
                                >
                                    <Text style={styles.optionsText}>Capture</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => pickImage()}
                                    style={[styles.optionsWrapper,{
                                        borderTopLeftRadius:0,
                                        borderTopRightRadius:0
                                    }]}
                                >
                                    <Text style={styles.optionsText}>Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </TouchableWithoutFeedback>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.form}>
                <StatusBar style="light" />
                <InputField 
                    placeholder="Full Name"
                    value={name}
                    onChange={(value)=>handlerChange('name',value)}
                    iconLeft={<Feather name="user" size={20} color={colors.mutedText} />}
                />
                <InputField 
                    placeholder="Case Type : Lost or Found"
                    value={type}
                    onChange={(value)=>handlerChange('type',value)}
                    iconLeft={<Feather name="briefcase" size={20} color={colors.mutedText} />}
                />
                <InputField 
                    placeholder="Gender"
                    value={gender}
                    onChange={(value)=>handlerChange('gender',value)}
                    iconLeft={<FontAwesome name="genderless" size={20} color={colors.mutedText} />}
                />
                <InputField 
                    placeholder="Telephone"
                    value={phoneNumber}
                    type={"numeric"}
                    onChange={(value)=>handlerChange('phoneNumber',value)}
                    iconLeft={<MaterialCommunityIcons name="phone" size={20} color={colors.mutedText} />}
                />
                <InputField 
                    placeholder="Location i.e kk 123 st"
                    value={location}
                    onChange={(value)=>handlerChange('location',value)}
                    iconLeft={<MaterialCommunityIcons name="pin" size={20} color={colors.mutedText} />}
                />
                <InputField 
                    placeholder="Age"
                    type="numeric"
                    value={age}
                    onChange={(value)=>handlerChange('age',value)}
                    iconLeft={<Feather name="user" size={20} color={colors.mutedText} />}
                />
                <InputField 
                    placeholder="Complexion : dark,light,white... "
                    value={complexion}
                    onChange={(value)=>handlerChange('complexion',value)}
                    iconLeft={<Feather name="user" size={20} color={colors.mutedText} />}
                />
                <InputField 
                    placeholder="Nationality"
                    value={nationality}
                    onChange={(value)=>handlerChange('nationality',value)}
                    iconLeft={<Feather name="flag" size={20} color={colors.mutedText} />}
                />
                <InputField 
                    placeholder="Description"
                    value={description}
                    multiple={true}
                    onChange={(value)=>handlerChange('description',value)}
                    iconLeft={<Feather name="message-circle" size={20} color={colors.mutedText} />}
                />
                {
                    error &&
                    <Text style={styles.error}>{error}</Text>
                }
                <TouchableOpacity 
                    onPress={()=>upload()} 
                    style={[globalStyles.btn,globalStyles.flexed,styles.btn]}
                >
                    {
                        loading ?
                            <ActivityIndicator /> :
                            <Text style={[globalStyles.btnText,styles.btnText]}>Post</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    error:{
        fontSize:15,
        fontFamily:"Medium",
        color:colors.secondary,
        textAlign:'center'
    },
    btnText:{
        color:"white",
        fontFamily:"SemiBold"
    },
    btn:{
        width:width*0.35,
        justifyContent:"center",
        marginHorizontal:width*.20,
        marginBottom:height*0.15,
        marginTop:height*0.02,
        borderWidth:0,
        borderRadius:50,
        marginVertical:0,
        shadowOpacity:0,
        backgroundColor:colors.primary
    },
    form:{
        paddingHorizontal:width*0.1,
    },
    capture: {
        marginBottom:2,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
      },
      optionsText: {
        fontFamily: "Medium",
        color: colors.mutedText,
        fontSize: 20,
      },
      optionsWrapper: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor:"white",
        borderWidth:2,
        borderColor:"rgba(0,0,0,.1)"
      },
      options: {
        position: "absolute",
        right: "20%",
        top: "25%",
        ...globalStyles.shadow,
        shadowRadius: 10,
        elevation: 5,
        shadowOpacity:.3,
        zIndex:2,
      },
    image:{
        position:"absolute",
        width,
        resizeMode:"cover",
        zIndex:0,
        height:height*0.35,
    },
    imageText:{
        fontFamily:"SemiBold",
        color:"white",
        fontSize:15,
        position:"relative",zIndex:1
    },
    imageWrapper:{
        backgroundColor:colors.primary,
        height:height*0.35,
        width,
        ...globalStyles.safeAreaView,
        justifyContent:'center',
        alignItems:"center",
    },
    screen:{
        flex:1,
        backgroundColor:colors.baseBg
    }
})
