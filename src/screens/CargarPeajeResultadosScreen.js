import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity,StatusBar, Modal, ScrollView, Alert} from 'react-native';
import { ActivityIndicator} from 'react-native-paper';
import { format } from "date-fns";

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import {decode, encode} from 'base-64'
import { TRANSCOM_BACKEND_URL } from '../config/constants/environtments';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

var fotoPeaje = '';
var fechaPeaje = '';
var valorPeaje = '';

export class CargarPeajeResultadosScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()

        this.state = {
            loaderVisible : false,
            json: null,
            plaza: '',
            valorPeaje: null,
            modificado: false,
            tracto: '',
            latitude: "Obteniendo...",
            longitude: "Obteniendo...",
        }

        this.buttonPressedCargarPeaje = this.buttonPressedCargarPeaje.bind(this)
        this.buttonPressedCerrarSesion = this.buttonPressedCerrarSesion.bind(this)

    }

    componentDidMount(){
        this._getLocation();
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

    componentWillUnmount() {
        
    }

    onReceived(notification) {
        
    }

    onOpened(openResult) {
        
    }

    onIds(device) {
        
    }


    buttonPressedCargarPeaje () {   

        this.setState({loaderVisible: true})
        
        const token = this.props.route.params.token
        const auth = 'Bearer ' + token 
        const foto = 'data:image/jpg;base64,'+this.props.route.params.foto.replace(" ","+")  


        fetch(`${TRANSCOM_BACKEND_URL}/mobil/peajes`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: auth        
            },
            body: JSON.stringify(
                {
                    nro_tracto: this.state.tracto,
                    latitud: this.state.latitude, 
                    longitud: this.state.longitude, 
                    foto: foto 
                }
            )
        })
        .then((response) => response.json())
        .then((json) => this.showData(json, token));

    }

    showData(json, token) {

        this.setState({loaderVisible: false})

        if(json.success == false) {
            
            if(json.data == undefined){
                Alert.alert(
                  "CONECTA",
                  "Error en el envío de datos. Revise la información enviada y vuelva a intentarlo.",
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
            } else {
                console.log(json)
                Alert.alert(
                  "CONECTA",
                  json.data.error,
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
            }
            
        }else{
            this.props.navigation.navigate('Home', {token})
            Alert.alert(
              "CONECTA",
              "Datos enviados correctamente.",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
            
        }

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

    render() {

        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor="#red" barStyle="light-content" />

                <View style={styles.barra}>
                    <Text style={styles.barraText}> Cargar Documento </Text>
                    <TouchableOpacity style={[{flex: 1}]} onPress={() => this.buttonPressedCerrarSesion()}>
                        <Image
                            style={styles.barraImage}
                            source={require('../assets/images/Navbar/user.png')}
                        />
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.nombre} >Información adicional</Text>

                <Text style={[{alignSelf: 'flex-start'},{marginTop: '5%'},{marginLeft: '10%'}]}>Ingrese el Código del Tracto para continuar: </Text>

                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={tracto => this.setState({tracto: tracto})}
                    maxLength={5}
                />

                <Text style={[{alignSelf: 'flex-start'},{marginTop: '5%'},{marginLeft: '3%'},{fontSize: 8},{alignSelf: 'center'}]}>Ubicación : {this.state.latitude} ; {this.state.longitude}</Text>

                <Text style={[{alignSelf: 'center'},{marginTop: '10%'}]}>Presione "Enviar" para terminar el proceso.</Text>

                { !this.state.loaderVisible &&  
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle}
                            activeOpacity={.5}
                            onPress={this.buttonPressedCargarPeaje}>

                            <Text style={styles.TextStyle}> Enviar </Text>
                        </TouchableOpacity>
                    </View>
                }

                { this.state.loaderVisible &&    
                    <ActivityIndicator
                        style = {styles.LoadingIndicator}
                        size = {30}
                        animating={this.state.loaderVisible} color={'#3f51b5'} 
                    />
                }
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
        marginLeft: 80,
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
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        height: 50,
        textAlign: 'center',
        backgroundColor : "white",
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
        marginTop: '1%',
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#000176'
    }
});