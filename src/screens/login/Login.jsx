import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppTitle from '../../components/AppTitle'
import { theme } from '../../styles/theme'
import GeneralStatusBar from '../../components/GeneralStatusBar'
import Icons from '../../components/Icons'

const Login = () =>
{
  return (
    <View style={styles.loginContainer}>
      <GeneralStatusBar backgroundColor={theme.dark} />
      <View >
        <AppTitle title="Kaam" titleColor={theme.light} bottomBorderColor={theme.light} />
        <Icons name={"caret-up"} type={"button"} onPress={() => { }} shape={"round"} size={10} />
        <Icons name={"caret-up"} type={"button"} onPress={() => { }} shape={"round"} />
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.light,
    padding: 20
  }
})