import { Image, StyleSheet, ScrollView, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { theme } from '../../styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Keychain from 'react-native-keychain';
import tw from 'twrnc';

const IntroScreen1 = () =>
{
    const scheme = useColorScheme()

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={tw`py-3 px-5 bg-white rounded-lg shadow-lg shadow-red-500`}>
                    <Text style={tw`font-bold text-black `}>
                        Click Me
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default IntroScreen1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    headingStyle: {
        color: '#191919',
        fontSize: 20,
        textAlign: 'center',
    },
    imageStyle: {
        width: 64,
        height: 64,
        marginTop: 30,
    },
    elementContainer: {
        width: '100%',
        marginTop: 5,
        alignItems: 'center',
    },
    textStyle: {
        color: '#191919',
        fontSize: 25,
    },
    saparatorStyle: {
        height: 0.5,
        width: '60%',
        backgroundColor: '#C2C2C2',
        marginTop: 10,
    },
});