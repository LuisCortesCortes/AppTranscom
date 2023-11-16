import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity,StatusBar,Linking } from 'react-native';
import { ActivityIndicator} from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

export class CargarPeajeFotoScreen extends Component {
    constructor() {
        super();
        this.state = this.getInitialState();
      }

    getInitialState() {
        return {
            hasCameraPermission: null,
            data: null,
            captures: "",
            base64: "",
            showCapturar: true,
            showMensaje: false,
        }
    }

    componentDidMount() {
        this._requestPermissionsAsync();
    }

    _requestPermissionsAsync = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    _searchText = async (photo) => {

        var foto = photo.base64
        var token = this.props.route.params.token 

        this.props.navigation.navigate('CargarPeajeResultados', {foto, token} )

    };

    takePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved, base64: true, quality: 0.1 });
        }
    };

    onPictureSaved = photo => {
        //const uri  = photo.base64
        this._searchText(photo);
        this.setState({showMensaje: true})  // to show it  
        this.setState({showCapturar: false}) // to hide it
    } 

    render() {

        return (
            <View style={styles.container}>

                <Camera
                    style={{ flex: 1 }}
                    type={Camera.Constants.Type.back}
                    ref={(ref) => { this.camera = ref }}
                />

                { this.state.showCapturar && 
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle}
                            activeOpacity={.5}
                            onPress={this.takePicture}>

                            <Text style={styles.TextStyle}> Capturar </Text>
                        </TouchableOpacity>
                    </View>
                }

                { this.state.showMensaje && 
                    <Text style={[{alignSelf: 'center'},{marginTop: '5%'}]}>Espere mientras se procesa su documento... </Text>
                }

                

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
    containerCamara: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        marginTop: '10%'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
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
        backgroundColor:'#000176',
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
        marginTop: '8%',
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#000176'
    }
});