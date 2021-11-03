import * as React from 'react'
import { View,TextInput,KeyboardAvoidingView } from 'react-native'
import { globalStyles } from '../helpers/styles'

const InputField = ({ iconLeft,iconRight,placeholder,value,onChange,secureTextEntry,type }) => {
    return (
        <View style={[globalStyles.flexed,globalStyles.inputField]}>
            { iconLeft && iconLeft }
            <TextInput
                keyboardType={ type && type }
                placeholder={placeholder}
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={(value) => onChange(value) }
                style={globalStyles.input}
                placeholderTextColor="grey"
                 />
            { iconRight && iconRight }
        </View>
    )
}

export default InputField
