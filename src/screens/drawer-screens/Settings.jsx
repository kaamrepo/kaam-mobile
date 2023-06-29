import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon, { Icons } from '../../components/Icons';
import tw from "twrnc"



// SVG Icons

import ProfileSVG from "../../assets/svgs/Profile.svg";
import NotificationsSVG from "../../assets/svgs/Notifications.svg";
import ChangePasswordSVG from "../../assets/svgs/ChangePassword.svg";
import LanguageSVG from "../../assets/svgs/Language.svg";
import ThemeSVG from "../../assets/svgs/Theme.svg";
import DeleteAccountSVG from "../../assets/svgs/DeleteAccount.svg";
import PrivacySVG from "../../assets/svgs/Privacy.svg";
import TermsAndCondtionsSVG from "../../assets/svgs/TermsAndCondtions.svg";
import HelpCenterSVG from "../../assets/svgs/HelpCenter.svg";
import SupportSVG from "../../assets/svgs/Support.svg";
import AboutSVG from "../../assets/svgs/About.svg";

const Settings = ({ navigation }) =>
{

    const applcationOptions = [
        {
            icon: <ProfileSVG />,
            title: "Profile Visibility",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        },
        {
            icon: <NotificationsSVG />,
            title: "Notification",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        },
        {
            icon: <ChangePasswordSVG />,
            title: "Change Password",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        },
        {
            icon: <LanguageSVG />,
            title: "Language",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        },
        {
            icon: <ThemeSVG />,
            title: "Theme",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        },
        {
            icon: <DeleteAccountSVG />,
            title: "Delete Account",
            titleClass: "text-[#E30000] ",
            handleNavigation: () => { }
        },
    ]
    const aboutOptions = [
        {
            icon: <PrivacySVG />,
            title: "Privacy",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        },
        {
            icon: <TermsAndCondtionsSVG />,
            title: "Terms and conditions",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        },
        {
            icon: <HelpCenterSVG />,
            title: "Help Center",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        },
        {
            icon: <SupportSVG />,
            title: "Support",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        },
        {
            icon: <AboutSVG />,
            title: "About",
            titleClass: "text-[#0D0D26]",
            handleNavigation: () => { }
        }
    ]

    return (
        <SafeAreaView style={tw`flex-1 p-4 px-8 bg-[#FAFAFD]`}>
            <Text style={[tw`text-gray-600/60 text-[14px]`, { fontFamily: "Poppins-SemiBold" }]}>Applications</Text>
            {
                applcationOptions.map((option, index) =>
                    <ClickableItem key={index} handleNavigation={option.handleNavigation} icon={option.icon} title={option.title} titleClass={option.titleClass} />
                )
            }
            <Text style={[tw`text-gray-600/60 text-[14px] mt-3`, { fontFamily: "Poppins-SemiBold" }]}>About</Text>
            {
                aboutOptions.map((option, index) =>
                    <ClickableItem key={index} handleNavigation={option.handleNavigation} icon={option.icon} title={option.title} titleClass={option.titleClass} />
                )
            }

        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({})



const ClickableItem = (props) =>
{
    return <Pressable style={({ pressed }) => tw`my-[2px] -ml-2 pl-2 py-3 flex-row items-center gap-4 rounded ${ pressed ? 'bg-gray-200' : '' } `} onPress={props?.handleNavigation}>
        {props?.icon}
        <Text style={[tw` ${ props?.titleClass }`, { fontFamily: "Poppins-Regular" }]}>
            {props?.title}
        </Text>
    </Pressable>
}
