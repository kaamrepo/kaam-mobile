/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {navigate} from './navigation';
import useChatStore from './src/store/chat.store';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
  await onMessageReceived(remoteMessage);
});
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  const {data} = detail.notification.data;
  if (
    type === EventType.ACTION_PRESS &&
    detail.pressAction.id === 'open-chat'
  ) {
    navigate('Chat', {
      appliedJobId: data['appliedJobId'],
      chatid: data['chatid'],
      name: data['name'],
    });
    await notifee.cancelNotification(notification.id);
  }
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'reply') {
    const chat_message = {
      messageType: 'text',
      text: detail.input,
      createdat: new Date().toISOString(),
      isseen: false,
    };
    useChatStore.getState().sendChatMessage(data['chatid'], chat_message);
    // await notifee.cancelNotification(detail.notification.id);
  }
  //   await onMessageReceived(remoteMessage);
});

async function onMessageReceived(message) {
  try {
    const notifyObj = JSON.parse(message.data.notifee);
    // const data = notifyObj.data;
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });
    notifyObj.android.channelId = channelId;
    await notifee.displayNotification(notifyObj);
  } catch (error) {
    console.log('notifee.displayNotification', error);
  }
}

AppRegistry.registerComponent(appName, () => App);
