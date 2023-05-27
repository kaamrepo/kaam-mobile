import { SafeAreaView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React from 'react'
import GeneralStatusBar from '../../components/GeneralStatusBar'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    phonenumber: yup.string().required("Phone Number is required!")
        .min(10, 'Phone number must be of 10 characters')
        .max(10, 'Phone number must be of 10 characters'),
}).required();

const Login = ({ navigation }) =>
{
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = (data) =>
    {
        console.log(data);
    }
    return (
        <SafeAreaView style={[{ flex: 1 }, tw`px-5 bg-white`]}>
            <GeneralStatusBar backgroundColor={"rgb(226 232 240)"} />
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Text style={{
                        fontSize: 32,
                        color: "black",
                        fontFamily: 'Poppins-Bold'
                    }}>Kaam</Text>
                    <View style={tw`w-[12%] bg-black h-[5px] ml-2 -mt-2 rounded-[1px]`}></View>
                </View>
                <View style={[styles.maincontainer, tw`justify-around items-center`]}>
                    <View style={tw`w-full`}>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, tw`text-black text-[26px]`]}>Welcome Back 👋</Text>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, tw`text-sm text-slate-500`]}>Let's log in. Apply to jobs!</Text>
                    </View>

                    <View style={tw`w-full gap-3 -mt-20`}>
                        <View style={tw`border border-slate-500 rounded-xl flex flex-row w-full`}>
                            <View style={tw`w-[15%] justify-center items-center`}>
                                <Icon name="phone-outline" size={30} />
                            </View>
                            <Controller
                                control={control}
                                name='phonenumber'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        keyboardType='phone-pad'
                                        style={tw`px-5 w-[85%] text-lg`}
                                        placeholder='Phone Number'
                                        placeholderTextColor={"gray"}
                                    />
                                )
                                }
                            />
                        </View>
                        {errors?.phonenumber && <Text style={tw`text-red-500`}>{errors?.phonenumber?.message}</Text>}
                        <Pressable
                            onPress={handleSubmit(onSubmit)}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                                },
                                tw`w-full h-14 items-center justify-center rounded-xl`
                            ]}
                        >
                            <Text style={[{ fontFamily: "Poppins-SemiBold" }, tw`uppercase text-white`]}>get otp</Text>
                        </Pressable>
                    </View>
                    <View style={tw`flex flex-row gap-2`}>
                        <Text style={tw`text-slate-600 font-normal`}>Don't have an Account?</Text>
                        <Pressable onPress={() =>
                        {
                            navigation.navigate("registerScreen")
                        }}>
                            <Text style={tw`text-[#4A9D58] font-medium`}>Register</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        flex: 2,
        justifyContent: 'flex-end'
    },
    maincontainer: {
        flex: 9,
    },

})