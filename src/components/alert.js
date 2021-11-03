import { Alert } from 'react-native';

export const SimpleNotification = (title, message, onPress) => {
    return (
        Alert.alert(
            title, 
            message, 
            [{
                text: 'OK',
                onPress: !onPress ? () => {} : onPress
            }], 
        { cancelable: false })
    )
}

export const SimpleCancelableNotification = (title, message, onPress) => {
    return (
        Alert.alert(
            title,
            message,
            [
            {
                text: "Cancel",
                onPress: () => {} ,
                style: "cancel"
            },
            { text: "OK", onPress }
            ],
            { cancelable: false }
        )
    
    )
}