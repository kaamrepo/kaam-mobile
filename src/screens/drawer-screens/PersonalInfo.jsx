import { StyleSheet, Image, Text, View, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import tw from 'twrnc'
import Icon, { Icons } from '../../components/Icons';
import useLoginStore from '../../store/authentication/login.store';
import capitalizeFirstLetter from '../../helper/utils/capitalizeFirstLetter';
import InformationCard from '../../components/InformationCard';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import useKeyboardStatus from '../../helper/hooks/useKeyboardStatus';
import useUsersStore from '../../store/authentication/user.store';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import dayjs from 'dayjs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';



const detailsSchema = yup.object({
    phone: yup.string().required("Phone number is required!")
        .min(10, 'Phone number must be of 10 digits.')
        .max(10, 'Phone number must be of 10 digits.')
        .matches(/\d{10}/, "Phone number must only contains number.")
    ,
    email: yup.string().email('Invalid email address'),
    dateofbirth: yup.string()
})
const addressSchema = yup.object({
    addressline: yup.string().required("Phone number is required!"),
    pincode: yup.string().required("Phone number is required!"),
    city: yup.string().required("Phone number is required!"),
    state: yup.string().required("Phone number is required!"),
    country: yup.string().required("Phone number is required!")
})



const PersonalInfo = ({ navigation }) =>
{

    // store imports
    const { loggedInUser } = useLoginStore();
    const { updateAboutMeStore, updateDetailsStore, updateAddressStore } = useUsersStore()

    const snapPoints = useMemo(() => ['35%', '60%', '75%'], []);
    const isKeyboardVisible = useKeyboardStatus();

    const [aboutMeText, onChangeAboutMeText] = useState(loggedInUser?.aboutme ?? "");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const bottomSheetAboutMeRef = useRef(null);
    const bottomSheetDetailsRef = useRef(null);
    const bottomSheetAddressRef = useRef(null);
    // const bottomSheetResumeRef = useRef(null);
    const bottomSheetAadharVerificationRef = useRef(null);
    const bottomSheetPANVerificationRef = useRef(null);

    const { control: detailsControl, getValues: getDetailsValues, setValue: setDetailsValue, handleSubmit: handleDetailsSubmit, formState: { errors: detailsError } } = useForm({
        resolver: yupResolver(detailsSchema),
        mode: 'onChange',
        defaultValues: {
            "dateofbirth": loggedInUser.dateofbirth ?? new Date()
        }
    });

    const { control: addressControl, getValues: getAddressValues, setValue: setAddressValue, handleSubmit: handleAddressSubmit, formState: { errors: addressError } } = useForm({
        resolver: yupResolver(addressSchema),
        mode: 'onChange',
        defaultValues: {
        }
    });


    const [district, setDistrict] = useState([]);
    const [state, setState] = useState([]);
    const [country, setCountry] = useState([]);

    useEffect(() =>
    {
        if (loggedInUser?.phone) setDetailsValue("phone", loggedInUser?.phone)
        if (loggedInUser?.email) setDetailsValue("email", loggedInUser?.email)
        if (loggedInUser?.dateofbirth) setDetailsValue("dateofbirth", loggedInUser?.dateofbirth)
    }, [loggedInUser])

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const updateAboutMe = async () =>
    {
        if (aboutMeText && aboutMeText.length)
        {
            const success = await updateAboutMeStore(loggedInUser?._id, { aboutme: aboutMeText })
            if (success)
            {
                bottomSheetAboutMeRef.current.close()
            }
        }
    }
    const updateDetails = async (data) =>
    {
        const success = await updateDetailsStore(loggedInUser?._id, data)
        if (success)
        {
            bottomSheetDetailsRef.current.close()
        }
    }
    const updateAddress = async (data) =>
    {
        const success = await updateAddressStore(loggedInUser?._id, data)
        if (success)
        {
            bottomSheetAddressRef.current.close()
        }
    }

    const getAddressDateByZIPCode = async (text) =>
    {
        try
        {

            const res = await axios.get(`https://api.postalpincode.in/pincode/${ text }`);
            console.log("🥩🥩🥩🥩", res.data)
            if (res.data[0].Status === "Success")
            {
                res.data[0]?.PostOffice?.forEach(data =>
                {
                    !district.includes(data.District) && setDistrict([...district, data.District]);
                    !state.includes(data.State) && setState([...state, data.State]);
                    !country.includes(data.Country) && setCountry([...country, data.Country]);
                })
            }
            if (res.data[0].Status === "Error")
            {
                Toast.show({
                    type: 'tomatoToast',
                    text1: "Invalid ZIP Code.",
                });
            }
        } catch (error)
        {
            Toast.show({
                type: 'tomatoToast',
                text1: "Invalid ZIP Code.",
            });
        }
    }


    const details = {
        "Phone Number": loggedInUser?.phone,
        "E-mail": loggedInUser?.email ?? "",
        "DOB": loggedInUser?.dateofbirth ? dayjs(loggedInUser?.dateofbirth).format("DD MMM YYYY") : ""
    }

    const address = {
        "House no.": loggedInUser?.address?.houseno,
        "Street": loggedInUser?.address?.street,
        "Pin Code": loggedInUser?.address?.pincode,
        "City": loggedInUser?.address?.city,
        "State": loggedInUser?.address?.state,
    }

    return (
        <SafeAreaView style={tw`flex-1 p-4 px-5 bg-[#FAFAFD]`}>
            <View>
                <Pressable style={({ pressed }) => tw`h-10 w-10 items-center justify-center rounded-full ${ pressed ? 'bg-gray-200' : '' } `} onPress={() =>
                {
                    navigation.goBack();
                    navigation.openDrawer();
                }}>
                    <Icon type={Icons.Ionicons} name={"chevron-back"} size={25} color={"black"} />
                </Pressable>
            </View>
            <View style={tw`my-2 flex-row gap-4 items-center`}>
                <Image source={{ uri: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80" }} style={[tw`h-16 w-16 rounded-full`]} />

                <View>
                    <View style={tw`flex-row gap-5 items-center`}>
                        <Text style={[tw`text-[#0D0D26] text-[20px]`, { fontFamily: "Poppins-Bold" }]}>{`${ capitalizeFirstLetter(loggedInUser?.firstname) } ${ capitalizeFirstLetter(loggedInUser?.lastname) }`}</Text>
                        <Icon type={Icons.MaterialCommunityIcons} name={"pencil"} size={20} color={"black"} onPress={() => { }} />
                    </View>

                    <Text style={[tw`text-[#FE6D73] text-[12px]`, { fontFamily: 'Poppins-Light' }]}>{80 + "% Complete"}</Text>
                </View>
            </View>
            <ScrollView style={tw``} showsVerticalScrollIndicator={false}>
                <InformationCard title="Details" onPress={() => { bottomSheetDetailsRef.current.snapToIndex(1) }} informationArray={details} />
                <InformationCard title="Address" onPress={() => { bottomSheetAddressRef.current.snapToIndex(2) }} informationArray={address} />

                {/* Resume Action Card */}
                <View style={tw`my-3`}>
                    <View style={tw`px-6 flex-row justify-between`}>
                        <Text style={[tw`text-[#0D0D26] text-[18px]`, { fontFamily: "Poppins-Bold" }]}>Resume</Text>
                    </View>
                    <View style={tw`px-6 py-4 bg-white rounded-[20px] border border-gray-100`}>
                        <View style={tw`flex-row justify-between `}>
                            <Text style={[tw`text-[#0D0D26]/50`, { fontFamily: "Poppins-SemiBold" }]}>Create Resume</Text>
                            <Icon type={Icons.MaterialCommunityIcons} name={"pencil"} size={20} color={"black"} onPress={() => { }} />
                        </View>
                    </View>
                </View>
                {/* Resume Action Card: Completed */}

                {/* About Me Action Card */}
                <View style={tw`my-3`}>
                    <View style={tw`px-6 flex-row justify-between`}>
                        <Text style={[tw`text-[#0D0D26] text-[18px]`, { fontFamily: "Poppins-Bold" }]}>About Me</Text>
                    </View>
                    <View style={tw`px-6 py-4 bg-white rounded-[20px] border border-gray-100`}>
                        <View style={tw`flex-row justify-between `}>

                            <Text style={[tw`text-[#0D0D26]/50`, { fontFamily: "Poppins-SemiBold" }]}>{loggedInUser?.aboutme}</Text>

                            <Icon type={Icons.MaterialCommunityIcons} style={tw`pl-2`} name={"pencil"} size={20} color={"black"} onPress={() =>
                            {
                                bottomSheetAboutMeRef.current.snapToIndex(0)
                            }} />
                        </View>
                    </View>
                </View>
            </ScrollView>



            {/* Details bottom sheet */}

            <BottomSheet
                ref={bottomSheetDetailsRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
            >
                <ScrollView style={[tw`flex-1 mx-5`]}
                    contentContainerStyle={{ alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[tw`text-black text-[20px] text-center py-3`, { fontFamily: "Poppins-Bold" }]}>Details</Text>

                    <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>Phone Number:</Text>
                    <Controller
                        control={detailsControl}
                        name='phone'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                editable={false}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType='phone-pad'
                                style={[{ fontFamily: "Poppins-Regular" }, tw`text-black px-4 py-3 border-[1px] bg-slate-100/40 border-slate-300 w-full rounded-lg`]}
                                placeholder='eg. 9503857999'
                                placeholderTextColor={"gray"}
                            />
                        )
                        }
                    />
                    <Text style={[tw`text-red-600 w-full text-[10px] text-right px-2 py-1`, { fontFamily: "Poppins-Regular" }]}> {detailsError?.phone?.message}</Text>


                    <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>Email Address:</Text>
                    <Controller
                        control={detailsControl}
                        name='email'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType='email-address'
                                style={[{ fontFamily: "Poppins-Regular" }, tw` px-4 py-3 text-black border-[1px] bg-slate-100/40 border-slate-300 w-full rounded-lg`]}
                                placeholder='eg. abc@kaam.com'
                                placeholderTextColor={"gray"}
                            />
                        )
                        }
                    />
                    <Text style={[tw`text-red-600 w-full text-[10px] text-right px-2 py-1`, { fontFamily: "Poppins-Regular" }]}> {detailsError?.email?.message}</Text>


                    <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>Date of Brith:</Text>


                    <Text style={[{ fontFamily: "Poppins-Regular" }, tw`text-black px-4 py-[15px] border-[1px] bg-slate-100/40 border-slate-300 w-full rounded-lg`]}
                        onPress={() => setDatePickerVisibility(true)}
                    >
                        {dayjs(getDetailsValues("dateofbirth")).format("DD MMM YYYY") ?? "Date of Brith:"}
                    </Text>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={(date) =>
                        {
                            setDetailsValue("dateofbirth", date);
                            setDatePickerVisibility(false)
                        }}
                        onCancel={() => setDatePickerVisibility(false)}
                    />

                    {/* getDetailsValues("dateofbirth") */}

                    <Text style={[tw`text-red-600 w-full text-[10px] text-right px-2 py-1`, { fontFamily: "Poppins-Regular" }]}> {detailsError?.dateofbirth?.message}</Text>

                    <Pressable
                        onPress={handleDetailsSubmit(updateDetails)}
                        style={({ pressed }) => tw`my-3 px-5 py-3 w-1/2 flex-row gap-2 items-center justify-center rounded-xl shadow-lg shadow-green-800 ${ pressed ? 'bg-green-800' : 'bg-green-700' }`}>
                        <Text style={[tw`text-white text-[20px]`, { fontFamily: "Poppins-SemiBold" }]}>Save</Text>
                    </Pressable>
                </ScrollView>
            </BottomSheet>

            {/* Details bottom sheet */}



            {/* Address bottom sheet */}

            <BottomSheet
                ref={bottomSheetAddressRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
            >
                <ScrollView style={[tw`flex-1 mx-5`]}
                    contentContainerStyle={{ alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[tw`text-black text-[20px] text-center py-3`, { fontFamily: "Poppins-Bold" }]}>Address</Text>

                    <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>Address:</Text>
                    <Controller
                        control={addressControl}
                        name='addressline'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline={true}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={[{ fontFamily: "Poppins-Regular" }, tw`text-black max-h-32 px-4 py-3 border-[1px] bg-slate-100/40 border-slate-300 w-full rounded-lg`]}
                                placeholder='House no. 21, near Ganesh chowk'
                                placeholderTextColor={"gray"}
                            />
                        )
                        }
                    />
                    <Text style={[tw`text-red-600 w-full text-[10px] text-right px-2 py-1`, { fontFamily: "Poppins-Regular" }]}> {detailsError?.addressline?.message}</Text>


                    <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>Zip Code:</Text>
                    <Controller
                        control={addressControl}
                        name='pincode'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline={true}
                                value={value}
                                onChangeText={onChange}
                                onChange={(e) =>
                                {
                                    const { text } = e.nativeEvent;
                                    if (text && text.length >= 6)
                                    {
                                        getAddressDateByZIPCode(text)
                                    }
                                }}
                                onBlur={onBlur}
                                maxLength={6}
                                inputMode='numeric'
                                style={[{ fontFamily: "Poppins-Regular" }, tw`text-black max-h-32 px-4 py-3 border-[1px] bg-slate-100/40 border-slate-300 w-full rounded-lg`]}
                                placeholder='eg. 400049'
                                placeholderTextColor={"gray"}
                            />
                        )
                        }
                    />
                    <Text style={[tw`text-red-600 w-full text-[10px] text-right px-2 py-1`, { fontFamily: "Poppins-Regular" }]}> {detailsError?.pincode?.message}</Text>



                    <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>State:</Text>
                    <Controller
                        control={detailsControl}
                        name='email'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType='email-address'
                                style={[{ fontFamily: "Poppins-Regular" }, tw` px-4 py-3 text-black border-[1px] bg-slate-100/40 border-slate-300 w-full rounded-lg`]}
                                placeholder='eg. abc@kaam.com'
                                placeholderTextColor={"gray"}
                            />
                        )
                        }
                    />
                    <Text style={[tw`text-red-600 w-full text-[10px] text-right px-2 py-1`, { fontFamily: "Poppins-Regular" }]}> {detailsError?.email?.message}</Text>


                    <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>Date of Brith:</Text>

                    <Pressable
                        onPress={handleDetailsSubmit(updateDetails)}
                        style={({ pressed }) => tw`my-3 px-5 py-3 w-1/2 flex-row gap-2 items-center justify-center rounded-xl shadow-lg shadow-green-800 ${ pressed ? 'bg-green-800' : 'bg-green-700' }`}>
                        <Text style={[tw`text-white text-[20px]`, { fontFamily: "Poppins-SemiBold" }]}>Save</Text>
                    </Pressable>
                </ScrollView>
            </BottomSheet>

            {/* Address bottom sheet */}


            {/* About Me bottom sheet */}
            <BottomSheet
                ref={bottomSheetAboutMeRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
            >
                <View style={[tw`flex-1 items-center mx-5`]}>
                    <Text style={[tw`text-black text-[20px] text-center py-3`, { fontFamily: "Poppins-Bold" }]}>About Me</Text>
                    <TextInput
                        style={[tw`p-4 text-black border-[1px] bg-slate-100/40 ${ isKeyboardVisible ? 'max-h-[45%]' : 'max-h-[25%]' } border-slate-300 w-full rounded-lg`, { fontFamily: "Poppins-Regular" }]}
                        placeholder='Type here..'
                        onChangeText={onChangeAboutMeText}
                        value={aboutMeText}
                        multiline
                        maxLength={256}
                    />
                    <Text style={[tw`text-gray-500 w-full text-[10px] text-right px-2 py-1`, { fontFamily: "Poppins-SemiBold" }]}> {256 - aboutMeText?.length}/256</Text>

                    <Pressable
                        onPress={() => { updateAboutMe() }}
                        style={({ pressed }) => tw`my-3 px-5 py-3 w-1/2 flex-row gap-2 items-center justify-center rounded-xl shadow-lg shadow-green-800 ${ pressed ? 'bg-green-800' : 'bg-green-700' }`}>
                        <Text style={[tw`text-white text-[20px]`, { fontFamily: "Poppins-SemiBold" }]}>Save</Text>
                    </Pressable>
                </View>
            </BottomSheet>
            {/* About Me bottom sheet */}

        </SafeAreaView >
    )
}

export default PersonalInfo

const styles = StyleSheet.create({})
