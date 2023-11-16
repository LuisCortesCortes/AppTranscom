import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity,StatusBar} from 'react-native';
import { ActivityIndicator} from 'react-native-paper';

import {decode, encode} from 'base-64'
import { TRANSCOM_BACKEND_URL } from '../config/constants/environtments';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

export class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()

        /* Otras variables */
        this.state = {
            loaderVisible : false,
            entredUID: '',
            password: '',
            data: []
        }

        this.buttonPressedLogin = this.buttonPressedLogin.bind(this)
        this.PasswordRecovery = this.PasswordRecovery.bind(this)
    }

    componentWillUnmount() {
        
    }

    onReceived(notification) {
        
    }

    onOpened(openResult) {
        
    }

    onIds(device) {
        
    }

    async buttonPressedLogin() {
        //

        var data = '';

        let body = new FormData();
        
        body.append('rut_dv', this.state.entredUID)
        body.append('password', this.state.password)

        await fetch(`${TRANSCOM_BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: '*/*'
            },
            body: body
        })
        .then((response) => response.json())
        .then((json) => data = json);

        if(data.success == false) {
            alert('Datos de acceso incorrectos')
        }else{
            this.setState({entredUID: ''})
            this.setState({password: ''})
            var token = data.data.token
            var username = data.data.user.name
            console.log('token', token)
            this.props.navigation.navigate('Home', {token, username})
        }

    }

    meme(text){
        if(text.length > 7 && text.length <= 8){
            new_text = text.slice(0, 7) + "-" + text.slice(7)
            this.setState({entredUID: new_text})

        }

        if(text.length > 9){
            var new_text = text.replace('-', '')
            new_text = new_text.slice(0, 8) + "-" + new_text.slice(8)
            this.setState({entredUID: new_text})
        }
    }

    buttonPressedRegister() {
        this.props.navigation.navigate('Register')
    }

    PasswordRecovery() {
        this.props.navigation.navigate('RecuperarPassword')
    }

    render() {

        const firstName = this.state.entredUID;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#000176" barStyle="light-content" />
                <Image
                    style={[{height: 170}, {width: 140}, {alignSelf: 'center'}]}
                    source={require('../assets/images/dellorto.png')}
                />

                <Text style={[{alignSelf: 'center'},{color: '#000176'},{fontWeight: 'bold'},{marginTop: '5%'},{fontSize: 18}]}>Ingreso al Sistema</Text>

                <View style={styles.inputsContainer}>
                    <View style={styles.textlayout}>

                        <TextInput style={styles.input}
                            defaultValue={firstName}
                            placeholder="RUT (Ejemplo: 12345678-9)"
                            placeholderTextColor="#A0AAB6"
                            color="black"
                            autoCapitalize="none"
                            underlineColorAndroid='transparent'
                            onChangeText={textUser => this.meme(textUser)}
                            maxLength={10}
                        />

                        <TextInput style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#A0AAB6"
                            color="black"
                            autoCapitalize="none"
                            underlineColorAndroid='transparent'
                            onChangeText={textPwd => this.setState({password: textPwd})}
                            secureTextEntry={true}
                            maxLength={20}
                        />

                    </View>

                    { !this.state.loaderVisible &&    
                        <View style={styles.buttonStyle}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={this.buttonPressedLogin}>

                                <Text style={styles.TextStyle}> INGRESAR </Text>
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
                    
                    <Text onPress={this.PasswordRecovery}  style={[{alignSelf: 'center'},{color: '#2680EB'}]}>Olvidó su contraseña</Text>

                    <View style={styles.buttonStyle}>

                    </View>

                    <Text style={[{alignSelf: 'center'},{color: '#000176'},{marginTop: '30%'}]}>@ Ver. 1.1.11</Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#C4D2FF'
    },
    textlayout: {
        margin: 10
    },
    lable: {

    }, inputsContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#C4D2FF'
    },
    input: {
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        height: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor : "#ffffff",
        elevation: 10
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
    RegisterButtonStyle: {
        marginTop:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'blue',
        borderRadius:40
    },
    TextStyle:{
        color:'#ffffff',
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    LoadingIndicator:{
        marginTop:5
    }
});