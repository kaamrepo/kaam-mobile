import tw from 'twrnc';
import Icon, { Icons } from './Icons';
import { Text, View } from 'react-native';


const InformationCard = (props) =>
{
    return (
        <View style={tw`my-3`}>
            <View style={tw`px-6 flex-row justify-between`}>
                <Text style={[tw`text-[#0D0D26] text-[18px]`, { fontFamily: "Poppins-Bold" }]}>{props.title}</Text>
                <Icon type={Icons.MaterialCommunityIcons} name={"pencil"} size={20} color={"black"} onPress={props.onPress} />
            </View>
            <View style={tw`px-6 py-4 bg-white rounded-[20px] border border-gray-100`}>
                {
                    props.informationArray.map((i, index) => (
                        <View key={index} style={tw`flex-row justify-between `}>
                            <Text style={[tw`text-[#0D0D26]/50`, { fontFamily: "Poppins-SemiBold" }]}>{i.key}</Text>
                            <Text style={[tw`text-black`, { fontFamily: "Poppins-SemiBold" }]}>{i.value}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default InformationCard;