import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native"
import { colors } from '../../helpers/colors'
import { globalStyles } from '../../helpers/styles'
import InputField from '../../components/input'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Login } from '../../API/user'
import { SimpleCancelableNotification, SimpleNotification } from '../../components/alert'

const { width, height } = Dimensions.get('screen')

const SignUpScreen = ({ navigation }) => {
  const [creds, setCreds] = useState({ hidePassword: true })
  const { email, phoneNumber, password, hidePassword, loading } = creds;

  const handlerSubmit = () => {
    // there's no action pending, then we should act
    if (!loading) {
      if (email && password && phoneNumber) {
        setCreds({ ...creds, loading: true })
        Login({ email, password, phoneNumber })
          .then(async res => {
            setCreds({ ...creds, loading: false })
            if (res.statusCode === 200) {
              const { data } = res;
              await AsyncStorage.setItem("user-token", data);
              navigation.replace('dash');
            } else {
              SimpleNotification("Login failed due to", res.message)
            }
          })
      } else {
        SimpleNotification('Misssing Something', 'Fill-in the Missing Fields')
      }
    }
  }

  const togglePassword = () => {
    setCreds(prevState => ({ ...prevState, hidePassword: !hidePassword }))
  }


  const handlerChange = (key, value) => {
    setCreds(prevState => ({ ...prevState, [key]: value }))
  }

  return (
      <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ height,backgroundColor:colors.baseBg }}>
              <View style={globalStyles.safeAreaView}>
                <TouchableOpacity 
                  onPress={()=>navigation.goBack()} 
                  style={[{ padding:5 }]}
                >
                  <Feather name="chevron-left" size={30} color={colors.mainText} />
                </TouchableOpacity>
              </View>
              <View style={styles.parent}>
                <Text style={styles.mainText}> Hey, {'\n'} Register. </Text>
                <View style={styles.form}>
                    <InputField
                      value={email}
                      placeholder="Email"
                      type="email-address"
                      iconLeft={<Feather name='mail' size={25} color={colors.lightIcon} />}
                      onChange={(value) => handlerChange('email', value)}
                    />
                    <InputField
                      value={phoneNumber}
                      placeholder="Phone  Number"
                      type="email-address"
                      iconLeft={<Feather name="phone" size={25} color={colors.lightIcon} />}
                      onChange={(value) => handlerChange('phoneNumber', value)}
                    />

                    <InputField
                      value={password}
                      placeholder="Password"
                      secureTextEntry={hidePassword}
                      iconLeft={<Feather name='lock' size={25} color={colors.lightIcon} />}
                      iconRight={<Feather name={hidePassword ? "eye" : "eye-off"} size={25} color={colors.lightIcon} onPress={togglePassword} />}
                      onChange={(value) => handlerChange('password', value)}
                    />

                    <TouchableOpacity onPress={handlerSubmit} style={[globalStyles.btn, styles.btn]}>
                      <Text style={[globalStyles.btnText, { color: "white", fontSize: 15 }]}>
                        {!loading ? 'SIGN UP' : <ActivityIndicator size={18} color={colors.darkText} />}
                      </Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  register:{
    fontFamily:"SemiBold",
    color:colors.mainText
  },
  forgot:{ 
    fontSize:15,
    marginTop:'5%',
    textAlign:"center" 
  },
  btn:{
    backgroundColor:colors.primary,
    marginTop:"auto"
  },
  form:{
    flex:.6,
    justifyContent:"space-around"
  },
  secondaryText:{
    fontFamily:"Medium",
    color:colors.lightIcon,
    fontSize:15
  },
  parent:{
    flex:1,
    paddingHorizontal:"10%",
    justifyContent:'space-evenly'
  },
  mainText: {
    fontFamily: 'Bold',
    color: colors.mainText,
    fontSize: 35
  },
  screen: {
    height,
    backgroundColor: colors.baseBg
  }
})
