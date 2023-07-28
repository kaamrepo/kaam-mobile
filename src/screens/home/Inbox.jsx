import { StyleSheet, Text, View, FlatList, Pressable, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import FontFamilyStylesheet from '../../assets/css/stylesheet';

import WhiteTickSMSVG from "../../assets/svgs/WhiteTickSM.svg"
import Icon, { Icons } from '../../components/Icons';

const colors = [
    "#264653",
    "#bc6c25",
    "#f4acb7",
    "#2a9d8f",
    "#e76f51",
    "#fca311",
    "#023e8a",
    "#588157",
    "#48cae4",
    "#ffd6ff",
    "#ae2012",
    "#1b263b",
    "#e0e1dd",
    "#333333",
    "#e63946",
    "#3a86ff",
    "#ffc300",
    "#a8dadc",
    "#ffd60a",
    "#38b000",
]

// const createJobSchema = yup.object({
//     position: yup.string().required("Job position is required!"),
//     description: yup.string().required("Job description is required!"),
//     requirements: yup.string().required("Job requirements is required!"),
//     tags: yup.array().of(yup.string()).min(1).max(3),
//     about: yup.string().required("Mention about the job!"),
//     salary: yup.number().required("Job salary in required!"),
//     salaryduration: yup.string().required("Please mention the salary duration!"),
// })

const Inbox = () =>
{

    const [selectedColor, setSelectedColor] = useState(null);
    // const [tagText, setTagText] = useState("")
    // const [tags, setTags] = useState([])

    // const { control, getValues, setValue, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(createJobSchema),
    //     mode: 'onChange',
    //     defaultValues: {
    //         description: ''
    //     }
    // });
    // const descriptionRef = useRef();
    // const requirementsRef = useRef();
    // const aboutRef = useRef();

    const Item = ({ color }) => (
        <Pressable key={color}
            style={({ pressed }) => [tw` h-10 w-10 mr-2 shadow-lg rounded-2 overflow-hidden`]}
            onPress={() => setSelectedColor(color)}
        >
            <View style={[tw`h-10 w-10`, { backgroundColor: color }]}>
                {selectedColor === color ? <WhiteTickSMSVG /> : null}
            </View>
        </Pressable>
    );


    const createJob = (data) =>
    {
        console.log(data);
    }

    return (
        <SafeAreaView style={tw`flex-1 px-5 py-5 bg-white`}>
            <Text style={[tw`text-black text-center text-lg`, { fontFamily: "Poppins-Bold" }]}>Get a Job Done!</Text>
            <View style={tw`h-10`}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled
                    horizontal={true}
                    style={tw``}
                    data={colors}
                    renderItem={({ item }) => <Item color={item} />}
                    keyExtractor={item => item}
                />
            </View>

            {/* 
            <ScrollView style={[tw`my-5`]} contentContainerStyle={{ alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            >

                <Text style={[tw`text-black text-lg`, { fontFamily: "Poppins-SemiBold" }]}>Fill Job Details here...</Text>
                <View style={tw`w-full`}>
                    <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>Job position:</Text>
                    <Controller
                        control={control}
                        name='position'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                keyboardType='default'
                                autoCapitalize="sentences"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={[{ fontFamily: "Poppins-Regular" }, tw`text-black text-[14px] px-4 py-2 border-[1px] border-slate-300 w-full rounded-lg`]}
                                placeholder='eg. Software Engineer.'
                                placeholderTextColor={"rgb(163 163 163)"}
                            />
                        )
                        }
                    />
                    <Text style={[tw`text-red-600 w-full text-[10px] text-right px-2 py-1`, { fontFamily: "Poppins-Regular" }]}> {errors?.position?.message}</Text>
                </View>

                <CustomTextEditor label="Job description" placeholder="eg. We are currently seeking a highly skilled and motivated Software Engineer" getValues={getValues} setValue={setValue} fieldName={"description"} editorRef={descriptionRef} errors={errors} />


                <CustomTextEditor label="Job requirements" placeholder="eg. We are currently seeking a highly skilled and motivated Software Engineer" getValues={getValues} setValue={setValue} fieldName={"requirements"} editorRef={requirementsRef} errors={errors} />


                <CustomTextEditor label="Job about" placeholder="eg. We are currently seeking a highly skilled and motivated Software Engineer" getValues={getValues} setValue={setValue} fieldName={"about"} editorRef={aboutRef} errors={errors} />

                <View style={[tw`w-full`]}>
                    <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>Job position:</Text>
                    <View style={[tw`w-full flex-row`]}>
                        <TextInput
                            maxLength={100}
                            value={tagText}
                            keyboardType='default'
                            autoCapitalize="sentences"
                            onChangeText={setTagText}
                            style={[{ fontFamily: "Poppins-Regular" }, tw`text-black text-[14px] px-4 py-2 border-[1px] border-slate-300 w-[85%] rounded-l-lg`]}
                            placeholder='Add tags here'
                            placeholderTextColor={"rgb(163 163 163)"}
                        />
                        <Pressable
                            onPress={() =>
                            {
                                if (tagText)
                                {
                                    if (!tags)
                                    {
                                        setTags([tagText])
                                    } else
                                    {
                                        setTags([...tags, tagText])
                                    }
                                    setTagText("")
                                }
                            }}
                            style={({ pressed }) => tw`flex-row items-center justify-center rounded-r-xl w-[15%] ${ pressed ? 'bg-blue-600' : 'bg-blue-500' }`}>
                            <Text style={[tw`text-white text-[22px]`, { fontFamily: "Poppins-SemiBold" }]}>+</Text>
                        </Pressable>
                    </View>
                     setTags(prev => prev.filter(t => t !== tag))
                    <View style={[tw`flex flex-row flex-wrap gap-2 my-1`]}>
                        {
                            tags?.map((tag, index) => (
                                <View key={index}
                                    style={tw`bg-orange-100 border border-orange-500 py-[2px] rounded-full flex-row justify-between items-center `}>
                                    <Text style={tw`text-black mx-1`}>{tag?.length > 30 ? tag?.slice(0, 30) + "..." : tag}</Text>
                                    <Icon type={Icons.Ionicons} name={"close"}
                                        style={tw`rounded-full bg-white p-1`}
                                        color={"black"} size={15} onPress={() => { setTags(tags.filter((t, i) => i !== index)) }} />
                                </View>
                            ))
                        }
                    </View>
                </View>

                <Pressable
                    onPress={handleSubmit(createJob)}
                    style={({ pressed }) => tw`my-3 px-5 py-2 w-1/2 flex-row gap-2 items-center justify-center rounded-xl shadow-lg shadow-green-800 ${ pressed ? 'bg-blue-600' : 'bg-blue-500' }`}>
                    <Text style={[tw`text-white text-[20px]`, { fontFamily: "Poppins-SemiBold" }]}>Post a Job</Text>
                </Pressable>

            </ScrollView > */}
        </SafeAreaView >
    )
}

export default Inbox

const styles = StyleSheet.create({})





// const CustomTextEditor = ({ label, placeholder, getValues, setValue, fieldName, editorRef, errors }) =>
// {
//     return (
//         <View style={tw`w-full`}>
//             <Text style={[tw`text-gray-600 w-full text-[11px] text-left px-2`, { fontFamily: "Poppins-Regular" }]}>{label}:</Text>
//             <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
//                 <RichEditor
//                     placeholder={placeholder}
//                     placeholderTextColor="gray"
//                     style={tw`border border-slate-300 bg-slate-100/40 rounded-t-lg overflow-hidden`}
//                     ref={editorRef}
//                     editorStyle={{
//                         initialCSSText: `${ FontFamilyStylesheet }`,
//                         contentCSSText: `font-family: Poppins; font-size:14px; color:gray;`
//                     }}
//                     initialContentHTML={getValues(`${ fieldName }`)}
//                     onChange={(content) =>
//                     {
//                         setValue(`${ fieldName }`, content)
//                     }}
//                 />
//             </KeyboardAvoidingView>
//             <RichToolbar
//                 style={tw`rounded-b-lg border border-t-0 border-slate-300`}
//                 editor={editorRef}
//                 selectedIconTint={'#2095F2'}
//                 disabledIconTint={'#bfbfbf'}
//                 actions={[
//                     actions.keyboard,
//                     actions.setBold,
//                     actions.setItalic,
//                     actions.setUnderline,
//                     actions.insertBulletsList,
//                     actions.insertOrderedList,
//                     actions.setStrikethrough,
//                     actions.undo,
//                     actions.redo,
//                 ]}
//             />
//             <Text style={[tw`text-red-600 w-full text-[10px] text-right px-2 py-1`, { fontFamily: "Poppins-Regular" }]}> {errors?.[`${ fieldName }`]?.message}</Text>
//         </View>
//     )
// }
