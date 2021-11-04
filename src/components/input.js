import * as React from 'react'
import { View,TextInput,KeyboardAvoidingView } from 'react-native'
import { globalStyles } from '../helpers/styles'

const InputField = ({ iconLeft,iconRight,placeholder,value,onChange,styles,secureTextEntry,type,multiple }) => {
    return (
        <View style={[globalStyles.flexed,globalStyles.inputField,styles]}>
            { iconLeft && iconLeft }
            <TextInput
                keyboardType={ type && type }
                placeholder={placeholder}
                value={value}
                multiline={multiple}
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
