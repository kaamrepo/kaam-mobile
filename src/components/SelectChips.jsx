import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Toast from 'react-native-toast-message';
import NotFoundSVG from '../assets/svgs/not-found.svg'

const SelectChips = ({ title, items, setSelectedChips, role, showAllOptions, allowedCount }) =>
{

    return (
        <View style={[tw`my-1 gap-1`]}>
            <View style={[tw`flex flex-row justify-between items-center`]}>
                <Text style={[tw`text-black`, { fontFamily: "Poppins-SemiBold" }]}>{title}</Text>
            </View>
            <View style={[tw`flex flex-row flex-wrap `]}>
                {
                    items && items.length ? items.map((item, index) => (
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
                                tw`rounded-full my-1 mr-1 flex self-start border ${ item.isSelected ? ' bg-[#4A9D58] border-[#4A9D58]' : ' border-slate-400 ' } px-4 py-[5px]
                            ${ pressed ? 'bg-gray-300/50' : '' }
                            `
                            ]}
                            key={Math.random()}
                        >
                            <Text numberOfLines={1}
                                style={[tw` ${ item.isSelected ? 'text-white' : 'text-slate-500' }`, { fontFamily: "Poppins-Medium" }]}
                            >{item.name}</Text>
                        </Pressable>
                    )) : <View style={tw`flex-1 my-10`}>
                        <NotFoundSVG />
                        <Text style={[tw`text-slate-500 text-center`, { fontFamily: "Poppins-Regular" }]}>No {role} found.</Text>
                    </View>
                }
            </View>
        </View>
    )
}

export default SelectChips

const styles = StyleSheet.create({})