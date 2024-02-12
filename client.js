import io from 'socket.io-client';
import {feathers} from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import EncryptedStorage from 'react-native-encrypted-storage';
const socket = io(
  'https://2ef4-2402-3a80-1b38-4500-2ce8-e044-72e1-8ea.ngrok-free.app',
  {
    transports: ['websocket'],
    forceNew: true,
  },
);

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
