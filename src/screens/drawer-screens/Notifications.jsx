import {
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Text,
    Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import tw from 'twrnc';
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';
import Image4 from '../../assets/images/checklist.png';

const Notifications = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };
    const featuredJobs = [
        {
            image: Image1,
            title: 'Jr Executive',
            description: 'Tester',
            value: 960000,
            location: 'Delhi', workshift: "Full-time",
            status: "closed",
            color: "red"

        },
        {
            image: Image2,
            title: 'Jr Engineer',
            description: 'Devloper',
            value: 98765,
            location: 'Pune', workshift: "Over-Time",
            status: "open",
            color: "green"
        },
    ];
    const Notifications =[
        {
            "notificationLogo": Image1,
            "notificationTitle": "New Job Opportunity at XYZ Tech",
            "notificationDescription": "XYZ Tech is looking for a talented Software Engineer. Apply now!",
            "notificationTimeStamp": "2023-11-02T04:30:00Z",
            "notificationType": "INTERVIEWER"
        },{
            "notificationLogo": Image2,
            "notificationTitle": "New Connection Request",
            "notificationDescription": "John Doe wants to connect with you on LinkedIn.",
            "notificationTimeStamp": "2023-11-02T09:00:00Z",
            "notificationType": "GENERAL"
        },{
            "notificationLogo": Image3,
            "notificationTitle": "Networking Opportunity",
            "notificationDescription": "Expand your professional network with new connections and opportunities.",
            "notificationTimeStamp": "2023-11-02T01:00:00Z",
            "notificationType": "GENERAL"
        },
        {
            "notificationLogo":Image4,
            "notificationTitle": "Exciting New Project at ABC Innovations",
            "notificationDescription": "ABC Innovations is launching a new project. Get involved and contribute!",
            "notificationTimeStamp": "2023-11-01T14:30:00Z",
            "notificationType": "GENERAL"
        },
        {
            "notificationLogo": Image2,
            "notificationTitle": "Invitation: Tech Conference 2023",
            "notificationDescription": "You're invited to attend the Tech Conference 2023. Don't miss out!",
            "notificationTimeStamp": "2023-10-01T18:00:00Z",
            "notificationType": "INTERVIEWER"
        },
        {
            "notificationLogo": Image4,
            "notificationTitle": "Invitation: Tech Conference 2023",
            "notificationDescription": "You're invited to attend the Tech Conference 2023. Don't miss out!",
            "notificationTimeStamp": "2023-10-10T18:00:00Z",
            "notificationType": "INTERVIEWER"
        }
    ]
    // Get the current timestamp
    const currentTimeStamp = new Date();

    // Define the time thresholds (in milliseconds)
    const oneHourInMillis = 60 * 60 * 1000;
    const lastOneHourTimestamp = currentTimeStamp - oneHourInMillis;

    // Filter notifications based on the specified criteria
    const newActivityNotifications = Notifications.filter(
    (notification) =>
        new Date(notification.notificationTimeStamp) >= lastOneHourTimestamp 
    );

    const applicationNotifications = Notifications.filter(
    (notification) =>
        new Date(notification.notificationTimeStamp) < lastOneHourTimestamp &&
        notification.notificationType === "GENERAL"
    );

    const interviewsNotifications = Notifications.filter(
    (notification) =>
        new Date(notification.notificationTimeStamp) < lastOneHourTimestamp &&
        notification.notificationType === "INTERVIEWER"
    );
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`flex bg-[#FAFAFD]`}>
            <View style={tw`bg-white flex-row justify-center items-center mt-10`}>
            <View>
                <Pressable
                onPress={() => {
                    navigation.openDrawer();
                }}
                style={({ pressed }) => [
                    tw`h-12 w-12 rounded-full flex-row justify-center items-center ${pressed ? 'bg-slate-200' : ''}`,
                ]}
                >
                <TouchableOpacity onPress={handleBackPress}>
                    <Ionicons
                    name="chevron-back"
                    size={24}
                    style={tw`text-black`}
                    />
                </TouchableOpacity>
                </Pressable>
            </View>
            <View style={tw`p-3  flex-grow`}>
                <View style={tw`flex-1 justify-center items-center`}>
                <Text style={[tw`text-xl text-black`, { fontFamily: "Poppins-Bold" }]}>Notifications</Text>
                </View>
            </View>
            </View>
            <View style={tw`flex-row justify-between items-center mt-3 mb-2 mx-6`}>
                <Text style={[tw`text-xl text-black `, { fontFamily: "Poppins-Bold" }]}>New activity</Text>
            </View>
            <View>
                {newActivityNotifications.map((item, index) => (
                    <Pressable key={index} onPress={() => { }}>
                        {({ pressed }) => (
                        <View style={tw`rounded-5 p-1  m-1 mx-5 ${pressed ? 'bg-gray-100' : 'bg-white'}`}>
                            <View style={tw`flex-row mb-2 px-5 `}>
                                <View style={tw`m-2 items-center justify-center mr-3`}>
                                    <Image
                                        source={item.notificationLogo}
                                        style={tw`w-12 h-12 rounded-full`}
                                    />
                                </View>
                                <View style={tw`flex-1 items-start justify-center `}>
                                    <Text style={tw`text-lg font-bold text-black`}>{item.notificationTitle}</Text>
                                    <Text style={tw`text-sm text-black`}>{item.notificationDescription}</Text>
                                    <Text style={tw`text-sm text-gray-400`}>{formatTimestamp(item.notificationTimeStamp)}</Text>
                                </View>
                                
                            </View>
                        </View>)}
                    </Pressable>
                ))}
            </View>
            <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
                <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>
                    Applications
                </Text>
                <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
                    See all
                </Text>
            </View>
            <View>
               {applicationNotifications.map((item, index) => (
                    <Pressable key={index} onPress={() => { }}>
                        {({ pressed }) => (
                        <View style={tw`rounded-5 p-1  m-1 mx-5 ${pressed ? 'bg-gray-100' : 'bg-white'}`}>
                            <View style={tw`flex-row mb-2 px-5 `}>
                                <View style={tw`m-2 items-center justify-center mr-3`}>
                                    <Image
                                        source={item.notificationLogo}
                                        style={tw`w-12 h-12 rounded-full`}
                                    />
                                </View>
                                <View style={tw`flex-1 items-start justify-center `}>
                                    <Text style={tw`text-lg font-bold text-black`}>{item.notificationTitle}</Text>
                                    <Text style={tw`text-sm text-gray-400`}>{item.notificationDescription}</Text>
                                    <Text style={tw`text-sm text-gray-400`}>{formatTimestamp(item.notificationTimeStamp)}</Text>
                                </View>
                                
                            </View>
                        </View>)}
                    </Pressable>
                ))}
            </View>
            <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
                <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>
                    Interview
                </Text>
                <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
                    See all
                </Text>
            </View>
            <View>
                {interviewsNotifications.map((item, index) => (
                    <Pressable key={index} onPress={() => { }}>
                        {({ pressed }) => (
                        <View style={tw`rounded-5 p-1  m-1 mx-5 ${pressed ? 'bg-gray-100' : 'bg-white'}`}>
                            <View style={tw`flex-row mb-2 px-5 `}>
                                <View style={tw`m-2 items-center justify-center mr-3`}>
                                    <Image
                                        source={item.notificationLogo}
                                        style={tw`w-12 h-12 rounded-full`}
                                    />
                                </View>
                                <View style={tw`flex-1 items-start justify-center `}>
                                    <Text style={tw`text-lg font-bold text-black`}>{item.notificationTitle}</Text>
                                    <Text style={tw`text-sm text-gray-400`}>{item.notificationDescription}</Text>
                                    <Text style={tw`text-sm text-gray-400`}>{formatTimestamp(item.notificationTimeStamp)}</Text>
                                </View>
                                
                            </View>
                        </View>)}
                    </Pressable>
                ))}
            </View>
        </ScrollView >
    )
}

export default Notifications

export function formatTimestamp(timestamp) {
  const currentDate = new Date();
  const messageDate = new Date(timestamp);
  const timeDifference = currentDate - messageDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days === 1) {
      return "Yesterday";
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return messageDate.toLocaleDateString(undefined, options);
    }
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }
}
