import {ActivityIndicator, View} from 'react-native';
import useLoaderStore from '../store/loader.store';
import tw from 'twrnc';

export const Loader = () => {
  const {isLoading} = useLoaderStore();

  return (
    <View
      style={[
        tw`z-50 absolute top-0 left-0 right-0 bottom-0 justify-center items-center ${
          isLoading ? 'flex' : 'hidden'
        }`,
      ]}>
      <ActivityIndicator size={60} animating={isLoading} color="#00cc66" />
    </View>
  );
};
