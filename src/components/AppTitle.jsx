import { Animated, StyleSheet, Text, Easing } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';


const AppTitle = ({ title, titleColor, subTitle, subTitleColor, bottomBorderColor }) =>
{
    const fadeIn = useRef(new Animated.Value(0)).current;
    const widthAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() =>
    {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        Animated.timing(widthAnimation, {
            toValue: 1, // increase to 100% width
            delay: 700,
            duration: 700,
            easing: Easing.elastic(2),
            useNativeDriver: false, // required for width animation
        }).start();

    }, [])

    const animatedStyles = {
        width: widthAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '11%'],
        }),
        height: 5,
    };
    return (
        <SafeAreaView >
            <Animated.View style={{ opacity: fadeIn }}>
                <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
                <Animated.View style={[styles.bottomBorder, { backgroundColor: bottomBorderColor }, animatedStyles]}></Animated.View>
                {subTitle ? <Text style={[styles.subTitle, { color: subTitleColor }]}>{subTitle}</Text> : null}
            </Animated.View>
        </SafeAreaView>
    )
}

export default AppTitle

const styles = StyleSheet.create({
    title: {
        letterSpacing: 1,
        fontWeight: 800,
        fontSize: 30,
    },
    bottomBorder: {
        borderRadius: 1
    },
    subTitle: {

    }
})