import React from 'react';
import
{
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import tw from 'twrnc';

const Home = () =>
{
  const carouselData = [
    { id: 1, name: 'Product 1', price: '$10', address: 'Address 1' },
    { id: 2, name: 'Product 2', price: '$20', address: 'Address 2' },
    { id: 3, name: 'Product 3', price: '$30', address: 'Address 3' },
    // Add more carousel items as needed
  ];

  const colors = ['#FF00FF', '#C0C0C0'];

  const getRandomColor = () =>
  {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const renderCarouselItem = item => (
    <View
      style={[
        tw`bg-white p-4 rounded-lg shadow border-2`,
        { backgroundColor: getRandomColor() },
      ]}>
      <Text style={tw`font-bold mb-2`}>{item.name}</Text>
      <Text style={tw`text-gray-500 mb-2`}>{item.price}</Text>
      <Text style={tw`text-gray-500`}>{item.address}</Text>
      <Text style={tw`text-gray-500`}>{item.address}</Text>
      <Text style={tw`text-gray-500`}>{item.address}</Text>
      <Text style={tw`text-gray-500`}>{item.address}</Text>
      <Text style={tw`text-gray-500`}>{item.address}</Text>
      <Text style={tw`text-gray-500`}>{item.address}</Text>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`flex bg-white`}>
      <View style={tw`p-6 bg-white mt-5`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <View>
            <Text style={tw`text-lg font-bold`}>Welcome, John Doe</Text>
            <Text style={tw`text-lg font-bold`}>Peter Khalko👋</Text>
          </View>

          <TouchableOpacity
            style={tw`w-10 h-10 bg-green-500 rounded-lg items-center justify-center`}>
            {/* Online green ripple icon */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-row items-center mb-4 mx-5`}>
        <View
          style={tw`flex-1 bg-gray-200 rounded-lg h-10 flex-row items-center pr-2`}>
          <Icon name="search" size={20} color="gray" style={tw`mx-2`} />
          <TextInput
            style={tw`flex-1 text-sm text-black`}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>

        <TouchableOpacity
          style={tw`w-10 h-10 bg-gray-200 rounded-lg items-center justify-center ml-2`}>
          <Icon name="filter" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View>
        <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
          <Text style={tw`font-bold text-black text-xl`}>Nearby Jobs</Text>
          <Text style={tw`text-center text-sm leading-relaxed text-gray-600`}>
            See all
          </Text>
        </View>
        <View style={tw`h-70 py-5`}>
          <ScrollView contentContainerStyle={tw`items-center`}>
            <Swiper centered={true} loop autoplay autoplayTimeout={5}>
              {carouselData.map(item => (
                <View key={item.id} style={tw`mx-2`}>
                  {renderCarouselItem(item)}
                </View>
              ))}
            </Swiper>
          </ScrollView>
        </View>
      </View>
      <View>
        <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
          <Text style={tw`font-bold text-black text-xl`}>Recomended Jobs</Text>
          <Text style={tw`text-center text-sm leading-relaxed text-gray-600`}>
            See all
          </Text>
        </View>
        <View style={tw`h-70 py-5`}>
          <ScrollView contentContainerStyle={tw`items-center`}>
            <Swiper centered={true} loop autoplay autoplayTimeout={6}>
              {carouselData.map(item => (
                <View key={item.id} style={tw`mx-2`}>
                  {renderCarouselItem(item)}
                </View>
              ))}
            </Swiper>
          </ScrollView>
        </View>
      </View>
      <View>
        <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
          <Text style={tw`font-bold text-black text-xl`}>Featured Jobs</Text>
          <Text style={tw`text-center text-sm leading-relaxed text-gray-600`}>
            See all
          </Text>
        </View>
        <View style={tw`h-70 py-5`}>
          <ScrollView contentContainerStyle={tw`items-center`}>
            <Swiper centered={true} loop autoplay autoplayTimeout={7}>
              {carouselData.map(item => (
                <View key={item.id} style={tw`mx-2`}>
                  {renderCarouselItem(item)}
                </View>
              ))}
            </Swiper>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
