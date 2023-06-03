import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Toast from 'react-native-toast-message';
import Icon, { Icons } from '../../components/Icons';

const JobSelection = ({ navigation }) =>
{
    const jobTypes = [
        { id: 1, isIcon: false, type: Icons.MaterialCommunityIcons, icon: require('../../assets/images/part-time.png'), name: 'Part-Time', isSelected: false },
        { id: 2, isIcon: false, type: Icons.MaterialCommunityIcons, icon: require('../../assets/images/full-time.png'), name: 'Full-Time', isSelected: false },
        { id: 3, isIcon: false, type: Icons.MaterialCommunityIcons, icon: require('../../assets/images/contract.png'), name: 'Contract', isSelected: false },
        { id: 4, isIcon: false, type: Icons.MaterialCommunityIcons, icon: require('../../assets/images/internship.png'), name: 'Internship', isSelected: false },
        { id: 5, isIcon: false, type: Icons.MaterialCommunityIcons, icon: require('../../assets/images/freelance.png'), name: 'Freelance', isSelected: false },
        { id: 6, isIcon: true, type: Icons.MaterialCommunityIcons, icon: 'progress-clock', name: 'Designer', isSelected: false },
        { id: 7, isIcon: true, type: Icons.MaterialCommunityIcons, icon: 'progress-clock', name: 'Developer', isSelected: false },
        { id: 8, isIcon: true, type: Icons.MaterialCommunityIcons, icon: 'progress-clock', name: 'Administrative', isSelected: false },
        { id: 9, isIcon: true, type: Icons.MaterialCommunityIcons, icon: 'progress-clock', name: 'Marketing', isSelected: false },
        { id: 10, isIcon: true, type: Icons.MaterialCommunityIcons, icon: 'progress-clock', name: 'Management', isSelected: false },
        { id: 11, isIcon: true, type: Icons.MaterialCommunityIcons, icon: 'progress-clock', name: 'Others', isSelected: false }
    ];

    const [items, setSelectedChips] = useState(jobTypes);
    const allowedCount = 4;

    const handleChipSelect = (chipId) =>
    {
        const updatedItems = items.map((item) =>
        {
            if (item.id === chipId)
            {
                return {
                    ...item,
                    isSelected: !item.isSelected,
                };
            }
            return item;
        });

        const selectedItems = updatedItems.filter((item) => item.isSelected);

        if (selectedItems.length > allowedCount)
        {
            Toast.show({
                type: 'tomatoToast',
                text1: 'Count exceeds',
                text2: `Maximum ${ allowedCount } Job types selection allowed `
            });
            return;
        }

        setSelectedChips(updatedItems);
    };
    return (
        <SafeAreaView style={[tw` flex-1 justify-between px-4 pt-[10%]`]}>
            <View style={[tw`gap-3 justify-evenly`]} >
                <View style={tw`items-center`}>
                    <Image source={require('../../assets/images/kaam-logo.png')} style={{
                        height: 35,
                        width: 20
                    }} />
                </View>
                <View>
                    <Text style={[tw`text-2xl text-black`, { fontFamily: "Poppins-SemiBold" }]}>What type of job you're looking for?</Text>
                </View>
                <View style={[tw`h-[70%] py-2`]}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={items}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Chip
                                name={item.name}
                                isSelected={item.isSelected}
                                onSelect={() => handleChipSelect(item.id)}
                                object={item}
                            />
                        )}
                    />
                </View>

            </View>
            <View style={tw`flex-row  items-center justify-around gap-1 h-14 mb-1`}>
                <Pressable
                    onPress={() => { }}
                    style={({ pressed }) => [
                        tw`w-1/4 items-center justify-center rounded-2xl`
                    ]}>
                    {({ pressed }) => (
                        <Text style={tw`text-gray-600 text-[15px] font-medium`}>Skip</Text>
                    )}
                </Pressable>
                <Pressable
                    onPress={() =>
                    {
                        navigation.navigate('JobSelection');
                        // navigation.navigate('BottomTabNavigation');
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#d7dbd8' : 'transparent',
                        },
                        tw`w-13 h-13 items-center justify-center rounded-full`
                    ]}>
                    {({ pressed }) => (
                        <Image source={require('../../assets/images/gotonextScreen.png')} style={tw`w-12 h-12`} />
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default JobSelection

const styles = StyleSheet.create({})




const Chip = ({ name, isSelected, onSelect, object }) =>
{
    return (
        <Pressable
            style={({ pressed }) => [tw`flex-row items-center justify-between ${ pressed ? 'bg-slate-300/50' : 'bg-white' } px-7 py-3 rounded-lg mx-2 mb-2 `]}
            onPress={onSelect}
        >
            <View style={[tw`flex-row items-center gap-4`]}>
                {
                    object.isIcon ? (
                        <Icon type={object.type}
                            name={object.icon}
                            color={"#7F7F7F"}
                        />
                    ) : (
                        <Image source={object.icon} style={tw`w-6 h-6`} />
                    )
                }
                <Text style={{ color: 'black' }}>{name}</Text>
            </View>
            <Icon type={Icons.Ionicons}
                name={isSelected ? "checkmark-circle" : "checkmark-circle-outline"}
                color={isSelected ? "#26a5ff" : "black"}
            />
        </Pressable >
    );
};