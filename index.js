import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import Main from './main';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => Main);
