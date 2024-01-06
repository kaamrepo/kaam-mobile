import tw from 'twrnc';
import Icon, {Icons} from './Icons';
import {Text, View} from 'react-native';

const InformationCard = props => {
  return (
    <View style={tw`my-3`}>
      <View style={tw`px-6 flex-row justify-between items-center`}>
        <Text
          style={[
            tw`text-[#0D0D26] text-[18px]`,
            {fontFamily: 'Poppins-Bold'},
          ]}>
          {props.title}
        </Text>
        <Text
          style={[
            tw`text-[#0D0D26] text-[12px]`,
            {fontFamily: 'Poppins-Regular'},
          ]}
          onPress={props.onPress}>
          Edit
        </Text>
        {/* <Icon type={Icons.MaterialCommunityIcons} name={"pencil"} size={20} color={"black"} onPress={props.onPress} /> */}
      </View>
      <View
        style={tw`px-6 py-4 bg-white rounded-[20px] border border-gray-100`}>
        {Object.entries(props.informationArray).map(([key, value], index) => (
          <View key={index} style={tw`flex-row justify-between py-1`}>
            <Text
              style={[tw`text-[#0D0D26]/50`, {fontFamily: 'Poppins-SemiBold'}]}>
              {key}
            </Text>
            <Text
              style={[
                tw`text-black text-right w-[60%]`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              {value ? value : '  -    '}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default InformationCard;
