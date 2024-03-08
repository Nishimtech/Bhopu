import Toast from 'react-native-simple-toast';
import {Config} from '../../Helper';
function successShowToast(message) {
  return Toast.showWithGravity(message, Toast.LONG,Toast.TOP, {
    backgroundColor: Config.green,
  });
}

function WarningShowToast(message) {
  return Toast.showWithGravity(message, Toast.LONG,Toast.TOP, {
    backgroundColor: 'orange',
  });

}

function FailureShowToast(message) {
  return Toast.showWithGravity(message, Toast.LONG,Toast.TOP, {
    backgroundColor: Config.red,
  });
}
export default {
  successShowToast,
  WarningShowToast,
  FailureShowToast,
};
