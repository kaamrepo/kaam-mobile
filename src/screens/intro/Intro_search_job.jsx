import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Intro_search_job = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/search-dream-job.png')}
          style={styles.image}
          // resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Search your dream job fast and ease</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border:'1px solid black'
  },
  imageContainer: {
    borderWidth: 2,          // Border width
    borderColor: 'black',   // Border color
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding:'10',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Intro_search_job;
