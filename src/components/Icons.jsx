import React from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { theme } from '../styles/theme'

const Icons = ({ name, type, shape, onPress, size = 25 }) =>
{
    switch (type)
    {
        case "icon":
            return (<View style={{
                width: 35,
                height: 35,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Icon name={name} size={size} color={theme.dark} />
            </View>)

        case "button":
            return (
                <TouchableNativeFeedback
                    onPress={onPress}
                    background={TouchableNativeFeedback.Ripple(
                        "gray",
                        true
                    )}
                >
                    <View style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Icon name={name} size={size} color={theme.dark} />
                    </View>
                </TouchableNativeFeedback>
            )

        default:
            return <View style={{
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Icon name={name} size={size} color={theme.dark} />
            </View>
    }
}

export default Icons
