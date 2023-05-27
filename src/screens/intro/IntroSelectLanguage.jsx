import { Image, StyleSheet, Pressable, FlatList, Text, TouchableOpacity, View, SafeAreaView, Modal, } from 'react-native'
import React, { useState } from 'react';
import tw from 'twrnc';
import Languages from '../../components/Languages.json'
const IntroSelectLanguage = ({ navigation }) =>
{
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('English');
  const toggleModal = () =>
  {
    setIsModalVisible(!isModalVisible);
  };
  const handleDropdownChange = (value) =>
  {
    setSelectedOption(value);
  };
  const renderSeparator = () => (
    <View style={styles.separatorContainer}>
      <View style={styles.separator} />
    </View>
  );
  const renderLanguageItem = ({ item }) => (
    <View >
      <TouchableOpacity onPress={() => { handleDropdownChange(item.lang); toggleModal() }} style={tw`flex flex-row justify-between bg-white rounded-lg py-2 px-6`}>
        <Text style={tw`text-black text-base text-center font-bold mr-5`}>{item.lang}</Text>
        {item.lang === selectedOption && <View style={tw`w-4 h-4 mt-1`}>
          <Image source={require('../../assets/images/right_tik.png')} style={tw`w-[100%] h-[100%]`} />
        </View>}
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topPanel}>
          <Image source={require('../../assets/images/select_lnguage.png')} style={styles.image} />
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
          <View style={styles.bottomBottomPanel}>
            <TouchableOpacity onPress={toggleModal} style={tw`flex flex-row border-2 border-green-500  bg-white rounded-lg py-2 px-4`}>
              <Text style={tw`text-black text-base font-bold mr-20`}>{selectedOption}</Text>
              <View style={tw`w-4 h-4 mt-1`}>
                <Image source={require('../../assets/images/right_tik.png')} style={tw`w-[100%] h-[100%]`} />
              </View>
            </TouchableOpacity>
            <View style={tw`my-14`}>
              <Pressable
                onPress={() =>
                {
                  navigation.navigate('Intro_job_search');
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#d7dbd8' : 'transparent',
                  },
                  tw`w-1/2 items-center justify-center rounded-2xl`
                ]}>
                {({ pressed }) => (
                  <Image source={require('../../assets/images/gotonextScreen.png')} style={tw`w-12 h-12`} />
                )}
              </Pressable>

            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  topPanel: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  bottomPanel: {
    flex: 4,
    flexDirection: "column",
    backgroundColor: 'white',
    borderColor: "black",
  },
  bottomBottomPanel: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '10%'
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
