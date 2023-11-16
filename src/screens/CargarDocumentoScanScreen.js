import React, { Component } from 'react';
import { Vibration, StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export class CargarDocumentoScanScreen extends Component {
  state = {
    hasCameraPermission: null,
    data: null,
  };

  constructor() {
    super();

    /* Otras variables */
    this.state = {
      loaderVisible: false,
      data: [],
    };
  }

  componentDidMount() {
    this._requestPermissionsAsync();
  }

  _requestPermissionsAsync = async () => {
    this.setState({ hasCameraPermission: false });
    setTimeout(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      this.setState({ hasCameraPermission: status === 'granted' });
    }, 100);
  };

  _handleBarCodeScanned = (event) => {
    const token = this.props.route.params.token;

    const results = event.data;

    const RE = results.split('<RE>').pop().split('</RE>')[0]; // Rut Emisor
    const F = results.split('<F>').pop().split('</F>')[0]; // Folio
    const FE = results.split('<FE>').pop().split('</FE>')[0]; // Fecha Emision
    const RR = results.split('<RR>').pop().split('</RR>')[0]; // RUT Receptor
    const MNT = results.split('<MNT>').pop().split('</MNT>')[0]; // Monto total
    const TD = results.split('<TD>').pop().split('</TD>')[0]; // Tipo Documento

    this.props.navigation.navigate('CargarDocumentoResultados', { RE, F, FE, RR, MNT, TD, token });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access camera</Text>;
    }
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <Camera
          onBarCodeScanned={this._handleBarCodeScanned}
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.pdf417],
          }}
        />
      </View>
    );
  }
}
