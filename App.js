import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LoginScreen} from './src/screens/LoginScreen'


import { HomeScreen } from './src/screens/HomeScreen';
import { ComisionesScreen } from './src/screens/ComisionesScreen';
import { CargarDocumentoInstruccionesScreen } from './src/screens/CargarDocumentoInstruccionesScreen';
import { CargarDocumentoScanScreen } from './src/screens/CargarDocumentoScanScreen';
import { CargarDocumentoResultadosScreen } from './src/screens/CargarDocumentoResultadosScreen';
import { CargarPeajeInstruccionesScreen } from './src/screens/CargarPeajeInstruccionesScreen';
import { CargarPeajeFotoScreen } from './src/screens/CargarPeajeFotoScreen';
import { CargarPeajeResultadosScreen } from './src/screens/CargarPeajeResultadosScreen';
import { ControlFleteScreen } from './src/screens/ControlFleteScreen';
import { RecuperarPasswordScreen } from './src/screens/RecuperarPasswordScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Comisiones" component={ComisionesScreen} />
        <Stack.Screen name="CargarDocumentoInstrucciones" component={CargarDocumentoInstruccionesScreen} />
        <Stack.Screen name="CargarDocumentoScan" component={CargarDocumentoScanScreen} />
        <Stack.Screen name="CargarDocumentoResultados" component={CargarDocumentoResultadosScreen} />
        <Stack.Screen name="CargarPeajeInstrucciones" component={CargarPeajeInstruccionesScreen} />
        <Stack.Screen name="CargarPeajeScan" component={CargarPeajeFotoScreen} />
        <Stack.Screen name="CargarPeajeResultados" component={CargarPeajeResultadosScreen} />
        <Stack.Screen name="ControlFlete" component={ControlFleteScreen} />
        <Stack.Screen name="RecuperarPassword" component={RecuperarPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;