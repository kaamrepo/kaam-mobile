import io from 'socket.io-client';
import {feathers} from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import EncryptedStorage from 'react-native-encrypted-storage';
import {REACT_APP_LOCAL_MODE} from './env';

const socket = io(REACT_APP_LOCAL_MODE, {
  transports: ['websocket'],
  forceNew: true,
});

const client = feathers();

client.configure(socketio(socket));
client.configure(
  authentication({
    storage: EncryptedStorage,
    storageKey: 'accessToken',
    header: 'Authorization',
    jwtStrategy: 'jwt',
    path: 'api/authentication',
  }),
);
export default client;
