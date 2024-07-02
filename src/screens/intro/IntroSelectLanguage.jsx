import {
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import Languages from '../../components/Languages.json';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import useLoginStore from '../../store/authentication/login.store';
import Icon, {Icons} from '../../components/Icons';
const IntroSelectLanguage = ({navigation}) => {
  const {selectLanguage} = useLoginStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('English');
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleDropdownChange = value => {
    setSelectedOption(value);
  };
  const renderSeparator = () => (
    <View style={styles.separatorContainer}>
      <View style={styles.separator} />
    </View>
  );
  const renderLanguageItem = ({item}) => {
    const isClickable = ['मराठी', 'हिंदी', 'English'].includes(item.lang);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (isClickable) {
              handleDropdownChange(item.lang);
              toggleModal();
            }
          }}
          style={[
            tw`flex flex-row justify-between bg-white rounded-lg py-2 px-6`,
            !isClickable && tw`opacity-50`, // Add opacity for non-clickable items
          ]}
          disabled={!isClickable}>
          <Text style={tw`text-black text-base text-center font-bold mr-5`}>
            {item.lang}
          </Text>
          {item.lang === selectedOption && isClickable && (
            <View style={tw`w-4 h-4 mt-1`}>
              <Image
                source={require('../../assets/images/right_tik.png')}
                style={tw`w-[100%] h-[100%]`}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={[tw`flex-1 bg-white dark:bg-gray-900`]}>
      <GeneralStatusBar backgroundColor={'#F2BB13'} />
        <View style={[tw`flex-6`]}>
          <Image
            source={require('../../assets/images/select_lnguage.png')}
            style={styles.image}
          />
        </View>
        <View style={[tw`flex-4`]}>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalBackground} />
              <View style={styles.modalContent}>
                <FlatList
                  data={Languages.languages}
                  renderItem={renderLanguageItem}
                  ItemSeparatorComponent={renderSeparator}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </Modal>
          <View style={[tw`justify-center h-full`]}>
            <TouchableOpacity
              onPress={toggleModal}
              style={tw`w-2/4 mx-auto flex flex-row justify-between items-center border-2 border-emerald-500  bg-white rounded-lg py-3 px-5`}>
              <Text
                style={[
                  tw`text-black text-base`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}>
                {selectedOption}
              </Text>
              <View style={tw`w-4 h-4`}>
                <Image
                  source={require('../../assets/images/right_tik.png')}
                  style={tw`w-[100%] h-[100%]`}
                />
              </View>
            </TouchableOpacity>
            <View style={tw`mt-15 w-full h-15 flex-row justify-center`}>
              <Pressable
                onPress={() => {
                  navigation.replace('Login');
                  selectLanguage(selectedOption);
                }}
                style={({pressed}) => [
                  tw`w-15 h-full items-center justify-center rounded-full shadow-lg ${
                    pressed ? 'bg-emerald-600' : 'bg-emerald-500'
                  }`,
                ]}>
                <Icon
                  type={Icons.Entypo}
                  name={'chevron-right'}
                  size={35}
                  style={[tw`text-white`]}
                />
              </Pressable>
            </View>
          </View>
        </View>
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  topPanel: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bottomPanel: {
    flex: 4,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: 'black',
  },
  bottomBottomPanel: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '10%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '55%',
    height: '35%',
    marginBottom: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: 'green', // Update the border color here
    borderWidth: 2,
  },
  separatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: '80%',
    height: 2,
    backgroundColor: 'green',
  },
  touchableOpacity: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});

export default IntroSelectLanguage;
