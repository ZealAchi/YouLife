import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import { Platform } from 'react-native';

class NotifiactionServices {
    configure = (onRegister, onNotification, onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                onRegister(token)
                console.log('[NOtificationManager] onRegister token:', token);
            },
            onNotification: function (notification) {
                console.log('[NOtificationManager] onNotification:', notification);

                if (Platform.OS === 'ios') {
                    if (notification.data.opendInForeground) {
                        notification.userInteraction = true
                    }
                } else {
                    notification.userInteraction = true
                }

                if (notification.userInteraction) {
                    onOpenNotification(notification)
                } else {
                    onNotification(notification)
                }
                ///Only call callback if not from foreground
                if (Platform.OS === "ios") {
                    if (!notification.data.openedInForegroun) {
                        // notification.finish('backgroundFetchResultNoData')
                        notification.finish(PushNotificationIOS.FetchResult.NoData);
                    }
                } else {
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                    // notification.finish('backgroundFetchResultNoData')
                }
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    };
    _buildAndroidNotification = (
        id,
        title,
        message,
        data = {},
        options = {},
    ) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high',
            data: data
        }
    };
    _buildIOSNotification = (
        id,
        title,
        message,
        data = {},
        options = {},
    ) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || '',
            userInfo: {
                id: id,
                item: data
            }
        }
    }
    showNotification = (id, title, message, data = {}, options = {}) => {
        // console.log(id, message, data, options)
        PushNotification.localNotification({
            ...this._buildAndroidNotification(id, title, message, data, options),
            ...this._buildIOSNotification(id, title, message, data, options),
            title: title || '',
            message: message || '',
            playSound:options.playSound||false,
            soundName:options.soundName||'default',
            userInteraction: false,
        })
    }
    // testPush=()=>{
        
// PushNotification.localNotification({
//     title:"Quedate En casa",
//     message: "My Notification Message",
//   });
// }
//   testCancel=()=>{
//       PushNotification.cancelAllLocalNotifications()
//   }
    
    cancelAllLocalNotification = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications()
        } else {
            PushNotification.cancelAllLocalNotifications()
        }
    }
    unregister = () => {
        PushNotification.unregister()
    }
}

export const NotifiactionService = new NotifiactionServices()