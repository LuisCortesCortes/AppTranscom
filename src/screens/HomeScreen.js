import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity,StatusBar, Alert} from 'react-native';
import { ActivityIndicator} from 'react-native-paper';

import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

var rut_empresa = '';

export class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()

        /* Otras variables */
        this.state = {
            loaderVisible : false
        }

        this.buttonPressedComisiones = this.buttonPressedComisiones.bind(this)
        this.buttonPressedCargarDocumentoInstrucciones = this.buttonPressedCargarDocumentoInstrucciones.bind(this)
        this.buttonPressedCargarPeaje = this.buttonPressedCargarPeaje.bind(this)
        this.buttonPressedControlFlete = this.buttonPressedControlFlete.bind(this)
        this.buttonPressedCerrarSesion = this.buttonPressedCerrarSesion.bind(this)

    }

    componentDidMount(){
        
    }

    componentWillUnmount() {
        
    }

    onReceived(notification) {
        
    }

    onOpened(openResult) {
        
    }

    onIds(device) {
        
    }

    buttonPressedComisiones() {
        var token = this.props.route.params.token
        this.props.navigation.navigate('Comisiones', {token})
    }

    buttonPressedCargarDocumentoInstrucciones() {
        var token = this.props.route.params.token
        this.props.navigation.navigate('CargarDocumentoInstrucciones', {token})
    }

    buttonPressedCargarPeaje() {
        var token = this.props.route.params.token
        this.props.navigation.navigate('CargarPeajeInstrucciones', {token})
    }

    buttonPressedControlFlete() {
        var token = this.props.route.params.token
        this.props.navigation.navigate('ControlFlete',{token})
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
            <View style={styles.container}>
                <StatusBar backgroundColor="#red" barStyle="light-content" />

                <View style={styles.barra}>
                    <Text style={styles.barraText}> Perfil de Usuario </Text>
                    <TouchableOpacity style={[{flex: 1}]} onPress={() => this.buttonPressedCerrarSesion()}>
                        <Image
                            style={styles.barraImage}
                            source={require('../assets/images/Navbar/user.png')}
                        />
                    </TouchableOpacity>
                </View>

                <Image
                    style={styles.LogoStyle}
                    source={require('../assets/images/Perfil/usuario.png')}
                />
                

                <Text style={styles.nombre} >{this.props.route.params.username} </Text>
                <Text style={[{alignSelf: 'center'}]}>Bienvenido</Text>

                <Text style={[{alignSelf: 'center'},{marginTop: '5%'}]}>Pulse la opción que corresponda</Text>
                <Text style={[{alignSelf: 'center'}]}>a la acción que desee realizar</Text>

                <View style={styles.inputsContainer}>
                    
                    <TouchableOpacity style={[{flex: 1}]} onPress={() => this.buttonPressedComisiones()}>
                        <Image style={styles.ImageStyle} source={require('../assets/images/nota_ventas.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[{flex: 1}]} onPress={() => this.buttonPressedCargarDocumentoInstrucciones()}>
                        <Image style={styles.ImageStyle} source={require('../assets/images/orden_compra.png')} />
                    </TouchableOpacity>

                </View>

                <View style={styles.inputsContainer}>

                    <TouchableOpacity style={[{flex: 1}]} onPress={() => this.buttonPressedCargarPeaje()}>
                        <Image style={styles.ImageStyle} source={require('../assets/images/peaje.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[{flex: 1}]} onPress={() => this.buttonPressedControlFlete()}>
                        <Image style={styles.ImageStyle} source={require('../assets/images/flete.png')} />
                    </TouchableOpacity>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#C4D2FF'
    },
    barra: {
        backgroundColor: '#000176',
        height: 60,
        width: '100%'
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

    }, inputsContainer: {
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
    buttonStyle: {
        margin: 20,
        marginLeft: 100,
        marginRight: 100,
        justifyContent: 'center'
    },
    SubmitButtonStyle: {
        marginTop:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#cb4f3f',
        borderRadius:40
    },
    AgendaButtonStyle: {
        marginTop:400,
        marginLeft: 5,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#606ca4',
        borderRadius:5,
        width: 380,
        height: 50,
    },
    RegisterButtonStyle: {
        marginTop:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'blue',
        borderRadius:40
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
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    }
});