import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity,StatusBar, Modal, ScrollView, Alert} from 'react-native';
import { ActivityIndicator} from 'react-native-paper';

import {decode, encode} from 'base-64'
import { TRANSCOM_BACKEND_URL } from '../config/constants/environtments';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

export class RecuperarPasswordScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()

        /* Otras variables */
        this.state = {
            loaderVisible : false,
            data: [],
            rut: ''
        }

        this.buttonPressedRecuperarPassword = this.buttonPressedRecuperarPassword.bind(this)

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

    buttonPressedRecuperarPassword(){

        fetch(`${TRANSCOM_BACKEND_URL}/recovery`, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'    
            },
            body: JSON.stringify(
                {
                    rut_dv: this.state.rut
                }
            )
        })
        .then((response) => response.json())
        .then((json) => this.showData(json));

    }

    showData(json) {

        console.log(json)

        if(json.success == false) {
            Alert.alert(
              "CONECTA",
              json.data,
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
        }else{
            this.props.navigation.navigate('Login')    
            Alert.alert(
              "CONECTA",
              json.data.message,
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );       
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.barra}>
                    <Text style={styles.barraText}> Recuperación Contraseña </Text>
                    <Image
                        style={styles.barraImage}
                        source={require('../assets/images/Navbar/user.png')}
                    />
                </View>
                
                <Text style={styles.nombre} >Recuperación Contraseña</Text>

                <Text style={[{alignSelf: 'center'},{marginTop: '5%'}]}>Ingrese su RUT a continuación: </Text>

                <TextInput
                    style={styles.input}
                    keyboardType="text"
                    onChangeText={rut => this.setState({rut: rut})}
                />

                <View style={styles.buttonStyle}>
                    <TouchableOpacity
                        style={styles.SubmitButtonStyle}
                        activeOpacity={.5}
                        onPress={this.buttonPressedRecuperarPassword}>

                        <Text style={styles.TextStyle}> Enviar </Text>
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
    buttonStyle: {
        margin: 20,
        marginLeft: 100,
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
});