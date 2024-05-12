import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import SelectChips from '../../components/SelectChips';
import Icon, {Icons} from '../../components/Icons';

const jobRoles = [
  {name: 'Product Designer', isSelected: false},
  {name: 'Motion Designer', isSelected: false},
  {name: 'UX Designer', isSelected: false},
  {name: 'Graphics Designer', isSelected: false},
  {name: 'Full-Stack Developer', isSelected: false},
  {name: 'Data Analyst', isSelected: false},
  {name: 'Business Analyst', isSelected: false},
  {name: 'Project Manager', isSelected: false},
  {name: 'Sales Executive', isSelected: false},
  {name: 'Marketing Manager', isSelected: false},
  {name: 'HR Manager', isSelected: false},
  {name: 'Accountant', isSelected: false},
  {name: 'Financial Analyst', isSelected: false},
  {name: 'Content Writer', isSelected: false},
  {name: 'Graphic Designer', isSelected: false},
  {name: 'UI/UX Designer', isSelected: false},
  {name: 'Web Developer', isSelected: false},
  {name: 'Android Developer', isSelected: false},
  {name: 'System Administrator', isSelected: false},
  {name: 'Network Engineer', isSelected: false},
  {name: 'Operations Manager', isSelected: false},
  {name: 'Quality Assurance Analyst', isSelected: false},
  {name: 'Electrician', isSelected: false},
  {name: 'Plumber', isSelected: false},
  {name: 'Carpenter', isSelected: false},
  {name: 'Welder', isSelected: false},
  {name: 'Mason', isSelected: false},
  {name: 'Painter', isSelected: false},
  {name: 'Mechanic', isSelected: false},
  {name: 'Driver', isSelected: false},
  {name: 'Security Guard', isSelected: false},
  {name: 'Construction Laborer', isSelected: false},
  {name: 'Factory Worker', isSelected: false},
  {name: 'Machine Operator', isSelected: false},
  {
    name: 'Technician(e.g., HVAC technician, automotive technician)',
    isSelected: false,
  },
  {name: 'Housekeeping Staff', isSelected: false},
  {name: 'Delivery Driver', isSelected: false},
  {name: 'Gardener', isSelected: false},
  {name: 'Cleaner', isSelected: false},
  {name: 'Loading / Unloading Staff', isSelected: false},
  {name: 'Packaging Staff', isSelected: false},
  {name: 'Farm Worker', isSelected: false},
];

const JobPreference = ({navigation}) => {
  const [selectedJobRoles, setSelectedJobRoles] = useState(jobRoles);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = text => {
    setSearchValue(text);
    const filteredJobRoles = jobRoles.filter(jobRole =>
      jobRole.name.toLowerCase().includes(text.toLowerCase()),
    );
    setSelectedJobRoles(filteredJobRoles);
  };

  return (
    <SafeAreaView style={[tw`bg-white flex-1 px-5 pt-5`]}>
      <View
        style={[
          tw`flex-row justify-between items-center border border-slate-400 rounded-md px-5 mb-2`,
        ]}>
        <Icon type={Icons.Ionicons} name={'search'} size={20} color={'black'} />
        <TextInput
          style={tw`w-[90%] py-[5px] text-slate-600`}
          placeholder="Search for a job"
          placeholderTextColor={'gray'}
          value={searchValue}
          onChangeText={handleSearchChange}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[tw`mt-5 gap-3`]}>
          <SelectChips
            items={selectedJobRoles}
            title={'Select Job Roles'}
            setSelectedChips={setSelectedJobRoles}
            allowedCount={5}
            showAllOptions={true}
            role={'job roles'}
          />
        </View>
      </ScrollView>

      <View style={tw`flex-row items-center justify-around gap-1 h-14 mb-1`}>
        <Pressable
          onPress={() => {}}
          style={({pressed}) => [
            tw`w-1/4 items-center justify-center rounded-2xl`,
          ]}>
          {({pressed}) => (
            <Text style={tw`text-gray-600 text-[15px] font-medium`}>Skip</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('JobSelection');
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#d7dbd8' : 'transparent',
            },
            tw`w-13 h-13 items-center justify-center rounded-full`,
          ]}>
          {({pressed}) => (
            <Image
              source={require('../../assets/images/gotonextScreen.png')}
              style={tw`w-12 h-12`}
            />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default JobPreference;

const styles = StyleSheet.create({});
