import React from 'react';
import
{
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
    Pressable
} from 'react-native';

import
{
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import tw from 'twrnc';
import Icon, { Icons } from '../components/Icons';

// SVGIcons

import PersonalInformationSVG from "../assets/svgs/Personal Information.svg"
import ApplicationsSVG from "../assets/svgs/Applications.svg"
import PortfolioSVG from "../assets/svgs/Portfolio.svg"
import ProposalsSVG from "../assets/svgs/Proposals.svg"
import ResumesSVG from "../assets/svgs/Resumes.svg"
import SettingsSVG from "../assets/svgs/Settings.svg"
import LogoutSVG from "../assets/svgs/Logout.svg"
import BlueTickSVG from "../assets/svgs/Blue Tick.svg"
import PremiumIconSVG from "../assets/svgs/PremiumIcon.svg"


const CustomSidebarMenu = (props) =>
{
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[tw`p-3 h-[35%] items-center justify-center relative`]}>
                <Pressable style={({ pressed }) => tw`absolute rounded-full p-1 top-5 right-5 ${ pressed ? 'bg-slate-200' : '' }`}
                    onPress={() =>
                    {
                        props.navigation.closeDrawer();
                    }}
                >
                    <Icon type={Icons.MaterialCommunityIcons}
                        name={"close"} size={30}
                        style={tw`text-black`}
                    />
                </Pressable>
                <Image
                    source={require("../assets/images/browse-jobs.png")}
                    style={styles.sideMenuProfileIcon}
                />
                <Text style={[tw`text-black text-[24px]`, { fontFamily: 'Poppins-SemiBold' }]}>Sidhesh Parab</Text>
                <View style={tw`flex-row`}>
                    <Text style={[tw`text-[#95969D] text-[14px]`, { fontFamily: 'Poppins-Light' }]}>UI Designer </Text>
                    <BlueTickSVG width={20} height={20} />
                </View>
                <Text style={[tw`text-green-700 text-[15px]`, { fontFamily: 'Poppins-Regular' }]}>View Profile</Text>
            </View>
            <DrawerContentScrollView {...props}>
                {/* <DrawerItemList {...props} /> */}

                <View style={tw`px-4`}>
                    <CustomDrawerItem title="Personal Info" id={1} index={props?.state?.index} icon={< PersonalInformationSVG />} subtitle={"80% complete"} subtitleStyle={tw`text-[#FE6D73] text-[12px]`} onPress={() => props.navigation.navigate("Personal Info")} />
                    <CustomDrawerItem title="Applications" id={2} index={props?.state?.index} icon={< ApplicationsSVG />} onPress={() => props.navigation.navigate("Applications")} />
                    <CustomDrawerItem title="Proposals" id={3} index={props?.state?.index} icon={< ProposalsSVG />} onPress={() => props.navigation.navigate("Proposals")} />
                    <CustomDrawerItem title="Resumes" id={4} index={props?.state?.index} icon={< ResumesSVG />} onPress={() => props.navigation.navigate("Resumes")} />
                    <CustomDrawerItem title="Portfolio" id={5} index={props?.state?.index} icon={< PortfolioSVG />} onPress={() => props.navigation.navigate("Portfolio")} />
                    <CustomDrawerItem title="Settings" id={6} index={props?.state?.index} icon={< SettingsSVG />} onPress={() => props.navigation.navigate("Settings")} />
                    <CustomDrawerItem title="Logout" id={7} index={props?.state?.index} icon={< LogoutSVG />} onPress={() => props.navigation.navigate("Logout")} />
                </View>
            </DrawerContentScrollView>

            <View style={tw`items-center my-5`}>
                <Pressable onPress={props.onPress} style={({ pressed }) => tw`my-3 px-5 py-3 flex-row gap-2 items-center justify-center rounded-xl shadow-lg shadow-green-800 ${ pressed ? 'bg-green-800' : 'bg-green-700' }`}>
                    <PremiumIconSVG height={18} />
                    <Text style={[tw`text-center text-white`, { fontFamily: "Poppins-Regular" }]}>
                        Go Premium
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center'
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomSidebarMenu;





const CustomDrawerItem = (props) =>
{

    return <Pressable onPress={props.onPress} style={({ pressed }) => tw`flex-row px-2 my-[3px] items-center justify-between rounded-md ${ pressed ? 'bg-green-500/30' : props.id === props.index ? 'bg-green-200/30' : 'bg-white' }`}>
        <View style={tw`flex-row items-center gap-3 py-[10px] px-1`}>
            <View style={tw`px-1`}>
                {props.icon}
            </View>
            <Text style={[props.titleStyle ? props.titleStyle : tw`text-black`, { fontFamily: "Poppins-Regular" }]}>
                {props.title}
            </Text>
        </View>
        <Text style={[props.subtitleStyle, { fontFamily: "Poppins-Regular" }]}>
            {props.subtitle}
        </Text>
    </Pressable>
}