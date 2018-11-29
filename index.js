/** @format */

import {AppRegistry} from 'react-native'; //utilizado para registrar um component como arquivo inicial da aplicação
import App from './src'; //arquivo inicial da aplicação (por padrão busca o index)
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
