import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import Toast from 'react-native-toast-message';
const SelectChips = ({ title, items, setSelectedChips, role, allowedCount }) =>
{
    const [showAll, setShowAll] = useState(false)

    return (
        <View style={[tailwind`my-1 gap-1`]}>
            <View style={[tailwind`flex flex-row justify-between items-center`]}>
                <Text style={[tailwind`text-black`, { fontFamily: "Poppins-SemiBold" }]}>{title}</Text>
                {/* <Pressable
                    onPress={() => setShowAll(prev => !prev)}
                    style={({ pressed }) => [
                        tailwind`px-2 py-[1px] flex justify-center rounded ${ pressed ? 'bg-gray-500/30' : '' }`
                    ]}>
                    {({ pressed }) => (
                        <Text style={[tailwind`text-black`, { fontFamily: "Poppins-Light" }]}>{showAll ? "See less" : "See all"}</Text>
                    )}
                </Pressable> */}
                <Pressable
                    onPress={() => setShowAll(true)}
                    style={({ pressed }) => [
                        tailwind`px-2 py-[1px] flex justify-center rounded ${ pressed ? 'bg-gray-500/30' : '' }`
                    ]}>
                    {({ pressed }) => (
                        <Text style={[tailwind`text-black`, { fontFamily: "Poppins-Light" }]}>See all</Text>
                    )}
                </Pressable>
            </View>
            <View style={[tailwind`flex flex-row flex-wrap`]}>
                {
                    showAll ?
                        items.map((item, index) => (
                            <Pressable
                                onPress={(pressed) =>
                                {
                                    const updatedItems = [...items];
                                    const selectedItems = updatedItems.filter((item) => item.isSelected);
                                    if (updatedItems[index].isSelected)
                                    {
                                        updatedItems[index].isSelected = false;
                                    } else
                                    {
                                        if (selectedItems.length >= allowedCount)
                                        {
                                            Toast.show({
                                                type: 'tomatoToast',
                                                text1: 'Count exceeds',
                                                text2: `Maximum ${ allowedCount } ${ role } allowed to select`
                                            });
                                            return;
                                        }
                                        updatedItems[index].isSelected = true;
                                    }
                                    setSelectedChips(updatedItems);
                                }}
                                style={({ pressed }) => [
                                    tailwind`rounded-full m-1 flex self-start border ${ item.isSelected ? ' bg-[#26a5ff] border-[#26a5ff]' : ' border-slate-400 ' } px-4 py-[5px]
                            ${ pressed ? 'bg-gray-300/50' : '' }
                            `
                                ]}
                                key={Math.random()}
                            >
                                <Text numberOfLines={1}
                                    style={[tailwind` ${ item.isSelected ? 'text-white' : 'text-slate-500' }`, { fontFamily: "Poppins-Medium" }]}
                                >{item.name}</Text>
                            </Pressable>
                        ))
                        : items.slice(0, 5).map((item, index) => (
                            <Pressable
                                onPress={(pressed) =>
                                {
                                    const updatedItems = [...items];
                                    const selectedItems = updatedItems.filter((item) => item.isSelected);
                                    if (updatedItems[index].isSelected)
                                    {
                                        updatedItems[index].isSelected = false;
                                    } else
                                    {
                                        if (selectedItems.length >= allowedCount)
                                        {
                                            Toast.show({
                                                type: 'tomatoToast',
                                                text1: 'Count exceeds',
                                                text2: `Maximum ${ allowedCount } ${ role } allowed to select`
                                            });
                                            return;
                                        }
                                        updatedItems[index].isSelected = true;
                                    }
                                    setSelectedChips(updatedItems);
                                }}
                                style={({ pressed }) => [
                                    tailwind`rounded-full m-1 flex self-start border ${ item.isSelected ? ' bg-[#26a5ff] border-[#26a5ff]' : ' border-slate-400 ' } px-4 py-[5px]
                            ${ pressed ? 'bg-gray-300/50' : '' }
                            `
                                ]}
                                key={Math.random()}
                            >
                                <Text numberOfLines={1}
                                    style={[tailwind` ${ item.isSelected ? 'text-white' : 'text-slate-500' }`, { fontFamily: "Poppins-Medium" }]}
                                >{item.name}</Text>
                            </Pressable>
                        ))
                }
            </View>
        </View>
    )
}

export default SelectChips

const styles = StyleSheet.create({})