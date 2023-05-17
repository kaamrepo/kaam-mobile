import { StatusBar, } from 'react-native'
import React from 'react'


const GeneralStatusBar = ({ backgroundColor, ...props }) =>
{
    return (
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    )
}

export default GeneralStatusBar
