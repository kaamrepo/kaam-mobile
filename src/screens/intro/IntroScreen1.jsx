import { Button,Image, StyleSheet, ScrollView,FlatList, Text, TouchableOpacity, View, SafeAreaView, useColorScheme, Modal, ToastAndroid } from 'react-native'
import { useState } from 'react';
import Intro_job_search from './Intro_job_search';
import tw from 'twrnc';
import Languages from '../../components/Languages.json'
import { useNavigation } from '@react-navigation/native';
  // Function to handle button press and navigate to DetailScreen

const IntroScreen1 = () => {
  const navigation = useNavigation();
  const handleButtonPress = () => {
    navigation.navigate('Intro_job_search');
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('English');
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };
  const renderSeparator = () => <View style={tw`bg-black h-[2px]`} />;
  const renderLanguageItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => {handleDropdownChange(item.lang);toggleModal()}} style={tw`flex flex-row bg-white rounded-lg py-2 px-4`}>
        <Text style={tw`text-black text-lg text-center font-bold mr-5`}>{item.lang}</Text>
        {item.lang === selectedOption && <View style={tw`w-4 h-4 mt-1`}>
          <Image source={require('../../assets/images/checklist.png')} style={tw`w-[100%] h-[100%]`} />
        </View>}
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topPanel}>
             <View style={styles.centerCircle} >
               <Image source={require('../../assets/images/wh_bg_bl_logo.png')} style={styles.image} />
             </View>
        </View>
        <View style={styles.bottomPanel}>
          <Modal visible={isModalVisible} animationType="slide" transparent={true}>
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
          <View style={styles.bottomTopPanel}>
            <Text style={tw`text-white pt-3 pl-3 text-4xl font-serif font-bold`}>Kaam</Text>
            <View style={tw`w-[11%] h-[5px] ml-3 bg-white rounded-full`} />
            <View style={tw`p-3`}>
              <Text style={tw`text-xl font-serif font-bold`}>Choose Your Language /</Text>
              <Text style={tw`text-xl font-serif font-bold`}>अपनी पसंदीदा भाषा चुनें</Text>
            </View>
          </View>
          <View style={styles.bottomBottomPanel}>
            <TouchableOpacity onPress={toggleModal} style={tw`flex flex-row  bg-white rounded-lg py-2 px-4`}>
              <Text style={tw`text-black text-lg font-bold mr-6`}>{selectedOption}</Text>
              <View style={tw`w-4 h-4 mt-2`}>
                 <Image source={require('../../assets/images/down.png')} style={tw`w-[100%] h-[100%]`} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Detail" onPress={handleButtonPress} />
    </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black'
  },
  topPanel: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  centerCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  bottomPanel: {
    flex: 4,
    flexDirection: "column",
    backgroundColor: 'black'
  },
  bottomTopPanel: {
    flex: 2
  },
  bottomBottomPanel: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop:'10%'
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '50%',
    height: '30%',
    marginBottom:'30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
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
    resizeMode: 'cover',
    borderRadius: 100,
  },
});

export default IntroScreen1;
