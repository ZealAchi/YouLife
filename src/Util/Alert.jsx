import { Alert } from 'react-native';
export const AlertMessage = (props) => {
    const { data, message,nextAction } = props
    Alert.alert(
      'YouTrain',
      `${message}`,
      [
        {
          text: 'OK', onPress: data && data.result === 1 ? () => {
            () => {nextAction&&nextAction() }
          } : null
        },
      ],
      { cancelable: false },
    )
  }
