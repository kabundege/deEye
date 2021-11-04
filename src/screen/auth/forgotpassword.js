import React, { useState,useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native"
import { colors } from '../../helpers/colors'
import { globalStyles } from '../../helpers/styles'
import InputField from '../../components/input'
import { Feather } from '@expo/vector-icons'
import { ForgotPassword } from '../../API/user'
import { SimpleNotification } from '../../components/alert'

const { width, height } = Dimensions.get('screen')

const ForgotScreen = ({ navigation }) => {
  const [creds, setCreds] = useState({ success:false })

  const { phoneNumber, loading, success } = creds;

  const handlerSubmit = () => {
    // there's no action pending, then we should act
    if (!loading) {
      if (phoneNumber) {
        setCreds({ ...creds, loading: true })
        ForgotPassword({ phoneNumber })
          .then(async res => {
            setCreds({ ...creds, loading: false })
            if (res.status === 200) {
              setCreds(prevCreds=>({ ...prevCreds,success:true }))
            } else {
              SimpleNotification("Submition failed due to", res.message)
            }
          })
      } else {
        SimpleNotification('Misssing Something', 'Fill-in the Missing Fields')
      }
    }
  }

  const handlerChange = (key, value) => {
    setCreds(prevState => ({ ...prevState, [key]: value }))
  }

  useEffect(() => {
    if(success){
      const id = setTimeout(() => {
        setCreds(prevCreds=>({ ...prevCreds,success:false,email:null }))
        clearTimeout(id);
      }, 10000);
    }
  }, [success])

  return (
      <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex:1}}>
              <View style={globalStyles.safeAreaView}>
                <TouchableOpacity 
                  onPress={()=>navigation.goBack()} 
                  style={globalStyles.backWrapper}
                >
                  <Feather name="chevron-left" size={30} color={colors.mainText} />
                </TouchableOpacity>
              </View>
              <View style={styles.parent}>
              <Text style={styles.mainText}> Forgot, {'\n'} Your Password ? </Text>
              <Text style={styles.secondaryText}>
                After submitting, check your mail for a link {"\n"}
                <Text style={{fontFamily:"SemiBold",color:colors.primary,width}}>Reset Right Away</Text> 
              </Text>
              <View style={styles.form}>
                  <InputField
                    value={phoneNumber}
                    placeholder="Phone Number"
                    type="numeric"
                    iconLeft={<Feather name='phone' size={25} color={colors.lightIcon} />}
                    onChange={(value) => handlerChange('phoneNumber', value)}
                  />
                  <TouchableOpacity onPress={handlerSubmit} style={[globalStyles.btn, styles.btn,{ backgroundColor: success ? colors.success : colors.primary }]}>
                    <Text style={[globalStyles.btnText,{ color: "white" , fontSize: 15 }]}>
                      {!loading ? success ? 'Done' : 'SUBMIT' : <ActivityIndicator size={18} color={colors.darkText} />}
                    </Text>
                  </TouchableOpacity>
              </View>
              </View>
            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

export default ForgotScreen

const styles = StyleSheet.create({
  forgot:{ 
    fontSize:15,
    marginTop:'5%',
    textAlign:"center" 
  },
  circle:{
    position:'absolute',
    width:width*0.8,
    height:width*0.8,
    borderRadius:width*0.8,
    backgroundColor:colors.primary,
    top:0,
    left:-width*0.3
  },
  btn:{
    backgroundColor:colors.primary
  },
  form:{
    flex:.6,
    justifyContent:"flex-start"
  },
  secondaryText:{
    fontFamily:"Medium",
    color:colors.lightIcon,
    fontSize:18,
    textAlign:"center",
    marginTop:'30%',
    marginBottom:'20%',
    textTransform:"capitalize"
  },
  parent:{
    flex:1,
    paddingHorizontal:"10%",
    justifyContent:'center'
  },
  mainText: {
    fontFamily: 'Bold',
    color: colors.mainText,
    fontSize: 30
  },
  screen: {
    height,
    backgroundColor: colors.baseBg
  }
})
