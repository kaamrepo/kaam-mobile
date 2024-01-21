// import AsyncStorage from '@react-native-async-storage/async-storage';
// import authentication from '@feathersjs/authentication-client'
import {REACT_APP_DEV_MODE} from './env.js';
import io from 'socket.io-client';
import {feathers} from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

const socket = io(`${REACT_APP_DEV_MODE}/`, {
  transports: ['websocket'],
  forceNew: true,
});

const client = feathers();

client.configure(socketio(socket));

export default client;
