import { StatusBar } from 'expo-status-bar'
import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native"
import { colors } from '../../helpers/colors'
import { globalStyles } from '../../helpers/styles'
import InputField from '../../components/input'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Login, SignUp } from '../../API/user'
import { SimpleNotification } from '../../components/alert'
import { StoreContext } from '../../config/store'

const { height } = Dimensions.get('screen')

const SignUpScreen = ({ navigation }) => {
  const { handlerContext } = useContext(StoreContext)
  const [creds, setCreds] = useState({ hidePassword: true })
  const { name, phone_number, password, hidePassword, loading } = creds;

  const handlerSubmit = () => {
    // there's no action pending, then we should act
    if (!loading) {
      if (name && password && phone_number) {
        setCreds({ ...creds, loading: true })
        SignUp({ name, password, phone_number })
          .then(async res => {
            setCreds({ ...creds, loading: false })
            if (res.status === 201) {
              const { data } = res;
              await AsyncStorage.setItem("phone_number", data.phone_number);
              handlerContext('user',data);
              handlerContext('views',[]);
              navigation.replace('dash');
            } else {
              SimpleNotification("Registration failed due to", res.error)
            }
          }).catch(() => setCreds({ loading: false }))
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
                      value={name}
                      placeholder="Full Name"
                      type="default"
                      iconLeft={<Feather name='user' size={25} color={colors.lightIcon} />}
                      onChange={(value) => handlerChange('name', value)}
                    />
                    <InputField
                      value={phone_number}
                      placeholder="Phone  Number"
                      type="numeric"
                      iconLeft={<Feather name="phone" size={25} color={colors.lightIcon} />}
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
  },
  form:{
    flex:1,
    marginBottom:height*0.1,
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
    marginVertical:height*0.08,
  },
  screen: {
    height,
    backgroundColor: colors.baseBg
  }
})
