import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native"
import { colors } from '../../helpers/colors'
import { globalStyles } from '../../helpers/styles'
import InputField from '../../components/input'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Login } from '../../API/user'
import { SimpleNotification } from '../../components/alert'
import { StoreContext } from '../../config/store'

const { height } = Dimensions.get('screen')

const LoginScreen = ({ navigation }) => {
  const { handlerContext } = useContext(StoreContext)
  const [creds, setCreds] = useState({ hidePassword: true })
  const { phone_number, password, hidePassword, loading } = creds;

  const handlerSubmit = () => {
    // there's no action pending, then we should act
    if (!loading) {
      if (phone_number && password) {
        setCreds({ ...creds, loading: true })
        Login({ phone_number, password })
          .then(async res => {
            setCreds({ ...creds, loading: false })
            if (res.status === 200) {
              const { data } = res;
              await AsyncStorage.setItem("phone_number", data.phone_number);
              handlerContext('user',data);
              handlerContext('views',[]);
              navigation.replace('dash');
            } else {
              SimpleNotification("Login failed due to", res.error)
            }
          }).catch(()=>SimpleNotification('Authentication Failed','Try Again Later',()=>setCreds({ ...creds, loading: false })))

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
                <Text style={styles.mainText}> Hey, {'\n'} Login Now. </Text>
                <View style={styles.form}>
                    <InputField
                      value={phone_number}
                      placeholder="Phone Number"
                      type="numeric"
                      iconLeft={<Feather name='phone' size={25} color={colors.lightIcon} />}
                      onChange={(value) => handlerChange('phone_number', value)}
                    />

                    <InputField
                      value={password}
                      placeholder="Password"
                      secureTextEntry={hidePassword}
                      iconLeft={<Feather name='lock' size={25} color={colors.lightIcon} />}
                      iconRight={<Feather name={hidePassword ? "eye" : "eye-off"} size={25} color={colors.lightIcon} onPress={togglePassword} />}
                      onChange={(value) => handlerChange('password', value)}
                    />
                    <Text style={[styles.secondaryText,styles.forgot]}>
                      Forgot Password ? {" "}
                      <Text onPress={()=>navigation.navigate('forgot')} style={{fontFamily:"SemiBold",color:colors.mainText}}>Reset Now</Text> 
                    </Text>
                    <TouchableOpacity onPress={handlerSubmit} style={[globalStyles.btn, styles.btn]}>
                      <Text style={[globalStyles.btnText, { color: "white", fontSize: 15 }]}>
                        {!loading ? 'SIGN IN' : <ActivityIndicator size={18} color={colors.darkText} />}
                      </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.secondaryText}>
                  Don't have an account yet ? {" "}
                  <Text 
                    onPress={() => navigation.navigate('signup')} 
                    style={styles.register}>Register</Text> 
                </Text>
              </View>
            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
  },
  form:{
    flex:1,
    justifyContent:"space-evenly"
  },
  secondaryText:{
    fontFamily:"Medium",
    color:colors.lightIcon,
    fontSize:15,
    marginBottom:height*0.05,
    marginTop:-height*0.02,
  },
  parent:{
    flex:1,
    paddingHorizontal:"10%",
    justifyContent:'space-evenly'
  },
  mainText: {
    fontFamily: 'Bold',
    color: colors.mainText,
    fontSize: 35,
    marginVertical:height*0.1
  },
  screen: {
    height,
    backgroundColor: colors.baseBg
  }
})
