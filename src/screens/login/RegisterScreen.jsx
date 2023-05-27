import React from 'react'
import { Text,StyleSheet,View } from 'react-native'
import GeneralStatusBar from '../../components/GeneralStatusBar'
import { theme } from '../../styles/theme'
const RegisterScreen = () => {
  return (
    <View style={styles.loginContainer}>
      <GeneralStatusBar backgroundColor={theme.light} />
      <View>
       <Text style={{color:"red"}}>Register Screen</Text>
      </View>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.light,
    padding: 20
  }
})