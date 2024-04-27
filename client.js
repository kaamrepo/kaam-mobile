import io from 'socket.io-client';
import {feathers} from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import EncryptedStorage from 'react-native-encrypted-storage';
const socket = io(
  'https://84a8-2409-40c2-102c-dc28-61e8-a54-a96c-a92e.ngrok-free.app',
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
