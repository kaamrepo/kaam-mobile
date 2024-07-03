/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await onMessageReceived(remoteMessage);
});
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  console.log(
    '🚀 ~ notifee.onBackgroundEvent ~ detail:',
    JSON.stringify(detail, null, 4),
  );
  // Remove the notification
  // Or perform another action
  if (type === EventType.ACTION_PRESS) {
    await notifee.cancelNotification(notification.id);
  }
  //   await onMessageReceived(remoteMessage);
});

async function onMessageReceived(message) {
  try {
    const notifyObj = JSON.parse(message.data.notifee);
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
