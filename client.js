import {REACT_APP_DEV_MODE} from './env.js';
import io from 'socket.io-client';
import {feathers} from '@feathersjs/feathers';
import socketioClient from '@feathersjs/socketio-client';

const socket = io(`${REACT_APP_DEV_MODE}/`, {
  transports: ['websocket'],
  forceNew: true,
});

const client = feathers();

client.configure(socketioClient(socket));

export default client;
