import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity,StatusBar, Modal, ScrollView, Alert} from 'react-native';
import { ActivityIndicator} from 'react-native-paper';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

export class CargarPeajeInstruccionesScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()

        /* Otras variables */
        this.state = {
            loaderVisible : false,
            data: [],
            latitude: "Obteniendo...",
            longitude: "Obteniendo...",
        }

        this.buttonPressedCargarPeajeScan = this.buttonPressedCargarPeajeScan.bind(this)
        this.buttonPressedCerrarSesion = this.buttonPressedCerrarSesion.bind(this)

    }

    componentDidMount(){
        this._getLocation();
    }

    componentWillUnmount() {
        
    }

    onReceived(notification) {
        
    }

    onOpened(openResult) {
        
    }

    onIds(device) {
        
    }

    buttonPressedCargarPeajeScan() {
        var token = this.props.route.params.token
        this.props.navigation.navigate('CargarPeajeScan', {token})
    }

    buttonPressedCerrarSesion(){
        Alert.alert(
            "CONECTA",
            "¿Está seguro que desea cerrar la sesión actual?",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate('Login') },
                {
                  text: "Cancelar",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
            ]
        );
    }

    _getLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted'){
        this.setState({
          errorMessage: 'PERMISSION NOT GRANTED'
        })
      }

      const location = await Location.getCurrentPositionAsync();

      this.setState({
        location,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor="#red" barStyle="light-content" />

                <View style={styles.barra}>
                    <Text style={styles.barraText}> Cargar Peaje </Text>
                    <TouchableOpacity style={[{flex: 1}]} onPress={() => this.buttonPressedCerrarSesion()}>
                        <Image
                            style={styles.barraImage}
                            source={require('../assets/images/Navbar/user.png')}
                        />
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.nombre} >Cargar Peaje</Text>

                <View style={styles.buttonStyle}>
                    <TouchableOpacity
                        style={styles.SubmitButtonStyle}
                        activeOpacity={.5}
                        onPress={this.buttonPressedCargarPeajeScan}>

                        <Text style={styles.TextStyle}> Capturar Peaje </Text>
                    </TouchableOpacity>
                </View>

                <Text style={[{alignSelf: 'center'},{marginTop: '5%'}]}>Por favor siga las instrucciones antes de continuar</Text>

                <Text style={[{alignSelf: 'flex-start'},{marginTop: '5%'},{marginLeft: '5%'}]}>1. Para comenzar, presione el boton "Capturar Peaje"</Text>
                <Text style={[{alignSelf: 'flex-start'},{marginTop: '2%'},{marginLeft: '5%'}]}>2. Enfoque el comprobante de peaje con luz clara</Text>

                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#C4D2FF'
    },
    buttonStyle: {
        margin: 20,
        marginLeft: '22%',
        marginRight: 100,
        justifyContent: 'center'
    },
    SubmitButtonStyle: {
        marginTop:30,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#000176',
        borderRadius:10,
        width: 200
    },
    TextStyle:{
        color:'#ffffff',
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    barra: {
        backgroundColor: '#000176',
        height: 60,
        width: '100%'
    },
    rotate: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    barraText: {
        color: 'white',
        fontSize: 18,
        marginTop: 15,
        marginLeft: 10
    },
    barraImage: {
        marginLeft: '90%',
        marginTop: '-5%'
    },
    textlayout: {
        margin: 10
    },
    BrandStyle:{
        width: 50,
        height: 60,
        marginLeft: '84%'
    },
    lable: {

    }, 
    inputsContainer: {
        flex: 1,
        backgroundColor: '#C4D2FF',
        flexDirection: 'row',
        marginTop: 60
    },
    buttonContainer: {
        backgroundColor: '#C4D2FF',
        flexDirection: 'row'
    },
    input: {
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40,
        height: 50,
        textAlign: 'center',
        backgroundColor : "#262a2d",
        elevation: 10
    },
    TextStyle:{
        color:'#fff',
        textAlign:'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
    LoadingIndicator:{
        marginTop:40
    },
    ImageStyle:{
        borderRadius: 10,
        marginLeft: '8%', 
        width: '85%', 
        height: '85%',
        backgroundColor: 'black'
    },
    LogoStyle:{
        alignSelf: 'center',
        marginTop: 40
    },
    nombre: {
        marginTop: '8%',
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#000176'
    }
});