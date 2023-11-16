import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity,StatusBar, Modal, ScrollView, Alert } from 'react-native';
import { ActivityIndicator} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

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

var jsonData = '';

export class CargarDocumentoResultadosScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()

        this.state = this.getInitialState();

        this.buttonPressedCargarDocumento = this.buttonPressedCargarDocumento.bind(this)
        this.buttonPressedCerrarSesion = this.buttonPressedCerrarSesion.bind(this)

    }

    getInitialState() {
        return {
            loaderVisible : false,
            json: null,
            volumen: 'Seleccione volumen',
            camion: '',
            semi: '',
            transporte: 0,
            showMonto: false,
            showInputMonto: false,
            valorMonto: 0,
            latitude: "Obteniendo...",
            longitude: "Obteniendo...",
            isRegisterError: false,
            token: "",
        }
    }

    componentDidMount(){
        jsonData = this.props.route.params.results
        this.state = this.getInitialState();
        console.log("this.props.route.paramsthis.props.route.paramsthis.props.route.params =>", this.props.route.params)
        this.setState({token: this.props.route.params.token})
        this._getLocation();
        if(this.props.route.params.MNT){
            this.setState({showMonto: true}) 
            this.setState({showInputMonto: false}) 
        }else{
            this.setState({showMonto: false}) 
            this.setState({showInputMonto: true}) 
        }
    }

    componentWillUnmount() {
        
    }

    onReceived(notification) {
        
    }

    onOpened(openResult) {
        
    }

    onIds(device) {
        
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

    async buttonPressedReturnToScan(token) {
        this.props.navigation.navigate('CargarDocumentoInstrucciones', {token})
    }

    async buttonPressedCargarDocumento() {
        //Enviar datos via POST
        //Mostrar Alerta de Confirmación
        //Devolver a Home

        this.setState({loaderVisible: true})

        const numero_factura = parseInt(this.props.route.params.F)
        const tipo_documento = parseInt(this.props.route.params.TD)        
        const latitud = this.state.latitude
        const longitud = this.state.longitude

        const token = this.props.route.params.token
        const auth = 'Bearer ' + token 

        const jsonBody = JSON.stringify(
            {
                numero_factura: numero_factura,  
                tipo_documento: tipo_documento,  
                latitud: latitud, 
                longitud: longitud
            })
            
        await fetch(`${TRANSCOM_BACKEND_URL}/mobil/fletes`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: auth         
            },
            body: jsonBody
        })
        .then((response) => response.json())
        .then((json) => this.showData(json, token));

    }

    showData(json, token) {

        this.setState({loaderVisible: false})

        if(!json.success) {
            this.setState({isRegisterError: true})
            if(json.data == undefined){
                Alert.alert(
                  "CONECTA",
                  "Error en el envío de datos. Revise la información enviada y vuelva a intentarlo.",
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
            } else {
                Alert.alert(
                  "CONECTA",
                  json.data.error ? json.data.error : 'Hubo un error al momento de registrar los datos',
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
            }
            
        }else{
            this.setState({isRegisterError: false})
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
                
                <Text style={styles.nombre} >Resultados</Text>

                <Text style={[{alignSelf: 'center'},{marginTop: '2%'}]}>Los datos obtenidos son los siguientes: </Text>

                <Text style={[{alignSelf: 'flex-start'},{marginTop: '3%'},{marginLeft: '5%'}]}>RUT Emisor: {this.props.route.params.RE}</Text>
                <Text style={[{alignSelf: 'flex-start'},{marginTop: '2%'},{marginLeft: '5%'}]}>N° Folio: {this.props.route.params.F}</Text>
                <Text style={[{alignSelf: 'flex-start'},{marginTop: '2%'},{marginLeft: '5%'}]}>Fecha Emisión: {this.props.route.params.FE.split("-").reverse().join("-")}</Text>
                <Text style={[{alignSelf: 'flex-start'},{marginTop: '2%'},{marginLeft: '5%'}]}>RUT Receptor: {this.props.route.params.RR}</Text>

                { this.state.showMonto && 
                    <Text style={[{alignSelf: 'flex-start'},{marginTop: '2%'},{marginLeft: '5%'}]}>Monto Total : ${this.props.route.params.MNT}</Text>
                }
                
                <Text style={[{alignSelf: 'flex-start'},{marginTop: '3%'},{marginLeft: '3%'},{fontSize: 8},{alignSelf: 'center'}]}>Ubicación : {this.state.latitude} ; {this.state.longitude}</Text>


                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>

                    { !this.state.loaderVisible && this.state.isRegisterError ?
                    (
                    <View>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle}
                            activeOpacity={.5}
                            onPress={() => this.buttonPressedReturnToScan(this.state.token)}>

                            <Text style={styles.TextStyle}> Volver a escanear </Text>
                        </TouchableOpacity>
                    </View>
                        ) : (
                        <>
                            <Text style={[{alignSelf: 'center'},{marginTop: '3%'}]}>Si está conforme con los datos, presione "Enviar"</Text>
                            <View>
                                <TouchableOpacity
                                    style={styles.SubmitButtonStyle}
                                    activeOpacity={.5}
                                    onPress={this.buttonPressedCargarDocumento}>

                                    <Text style={styles.TextStyle}> Enviar </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>

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
    SubmitButtonStyle: {
        marginTop:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#000176',
        borderRadius:10,
        width: 200
    },
    SubmitButtonAgainStyle: {
        marginTop:10,
        paddingTop:5,
        paddingBottom:5,
        color:'#000',
        border: '2px solid #000 !important',
        borderWidth: 2,
        textAlign: 'center',
        borderRadius:10,
        width: 200
    },
    TextStyle:{
        color:'#ffffff',
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    TextStyleNegative:{
        color:'#000',
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
        marginTop: 3,
        marginLeft: 40,
        marginRight: 40,
        paddingHorizontal: 10,
        height: 50,
        backgroundColor : "white",
        elevation: 10
    },
    inputSelect: {
        marginTop: 3,
        marginLeft: 40,
        marginRight: 40,
        height: 50,
        alignItems: "center",
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