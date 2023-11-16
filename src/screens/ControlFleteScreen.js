import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity,StatusBar,ScrollView, Alert} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Datatable } from 'react-native-paper';
import {WebView} from 'react-native-webview';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Picker} from '@react-native-picker/picker';

import {decode, encode} from 'base-64'
import { TRANSCOM_BACKEND_URL } from '../config/constants/environtments';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

var rut_empresa = '';

export class ControlFleteScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()

        /* Otras variables */
        this.state = {
            loaderVisible : false,
            tableHead: ['Transporte', 'Numero', 'Fecha', 'Localidad', 'Volumen'],
            tableData: [
                ['Sin datos', 'Sin datos', 'Sin datos', 'Sin datos', 'Sin datos']
            ],
            date: '',
            month: 'Mes',
            year: 'Año'
        }

        this.buttonPressedCerrarSesion = this.buttonPressedCerrarSesion.bind(this)

    }

    getFletes() {
        //Enviar datos via POST
        //Mostrar Alerta de Confirmación
        //Devolver a Home

        this.setState({loaderVisible: true})

        var date = this.state.year + this.state.month

        var token = this.props.route.params.token
        var auth = 'Bearer ' + token 
        var url = `${TRANSCOM_BACKEND_URL}/mobil/fletes/${date}/periodo`

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: auth        
            },body: null
        })
        .then((response) => response.json())
        .then((json) => this.showData(json));
        
    }   
 
    showData(json) {
        this.setState({loaderVisible: false})
        var newData = []

        for(var i = 0; i < json.data.fletes.length; i++){

            var flete   = json.data.fletes[i].numero_flete
            var docto   = json.data.fletes[i].numero_docto
            var fecha   = json.data.fletes[i].fecha.split("-").reverse().join("-")
            var nombre  = json.data.fletes[i].nombre
            var volumen = json.data.fletes[i].volumen
            
            var data = [flete, docto, fecha, nombre, volumen]
            newData.push(data)
        }

        this.setState({tableData: newData})
        this.setState({showCalendario: false}) // to hide it

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
        const state = this.state;
        return (
            <ScrollView style={styles.container}>

                <View style={styles.barra}>
                    <Text style={styles.barraText}> Control flete </Text>
                    <TouchableOpacity style={[{flex: 1}]} onPress={() => this.buttonPressedCerrarSesion()}>
                        <Image
                            style={styles.barraImage}
                            source={require('../assets/images/Navbar/user.png')}
                        />
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.nombre} >Control de fletes</Text>

                <Text style={[{alignSelf: 'center'},{marginTop: '3%'},{fontSize: 16}]}>Seleccione el periodo a consultar (Mes / Año) </Text>
                <View style={styles.row}>
                    <Picker
                        selectedValue={this.state.month}
                        style={styles.inputSelect}
                        onValueChange={month => this.setState({month: month})}  >
                        <Picker.Item label="Mes" value="Mes" />
                        <Picker.Item label="Enero" value="01" />
                        <Picker.Item label="Febrero" value="02" />
                        <Picker.Item label="Marzo" value="03" />
                        <Picker.Item label="Abril" value="04" />
                        <Picker.Item label="Mayo" value="05" />
                        <Picker.Item label="Junio" value="06" />
                        <Picker.Item label="Julio" value="07" />
                        <Picker.Item label="Agosto" value="08" />
                        <Picker.Item label="Septiembre" value="09" />
                        <Picker.Item label="Octubre" value="10" />
                        <Picker.Item label="Noviembre" value="11" />
                        <Picker.Item label="Diciembre" value="12" />
                    </Picker>

                    <Picker
                        selectedValue={this.state.year}
                        style={styles.inputSelect}
                        onValueChange={year => this.setState({year: year})}  >
                        <Picker.Item label="Año" value="Año" />
                        <Picker.Item label="2022" value="2022" />
                        <Picker.Item label="2023" value="2023" />
                        <Picker.Item label="2024" value="2024" />
                        <Picker.Item label="2025" value="2025" />
                       
                    </Picker>
                </View>

                { !this.state.loaderVisible && 
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle}
                            activeOpacity={.5}
                            onPress={() => this.getFletes()}>

                            <Text style={styles.TextStyle}> Buscar </Text>
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

                <View style={styles.containerTabla}>
                    <Table borderStyle={{borderWidth: 1, borderColor: 'white'}}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.textHead}/>
                        <Rows data={state.tableData} textStyle={styles.text}/>
                    </Table>
                </View>


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
    containerTabla: { 
        flex: 1, 
        padding: 16, 
        paddingTop: 5, 
        backgroundColor: '#C4D2FF',
        marginTop: '10%'
    },
    head: { 
        height: 60, 
        backgroundColor: '#000176',
        color: 'white'
    },
    text: { 
        margin: 6,
        color: '#000176'
    },
    textHead: { 
        fontSize: 12,
        margin: 6,
        color: 'white'
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
        marginLeft: 16,
        marginRight: 140,
        height: 35,
        textAlign: 'center',
        backgroundColor : "white",
        elevation: 10
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    inputSelect: {
        flex: 1,
        width: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        height: 20,
        alignItems: "center",
        backgroundColor : "white",
        elevation: 5
    },
    buttonStyle: {
        margin: 5,
        marginLeft: '5%',
        justifyContent: 'center'
    },
    SubmitButtonStyle: {
        marginTop:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'blue',
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
        fontSize: 16,
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
    datePickerStyle: {
        width: 200,
        marginTop: 10,
        marginLeft: 90
    }
});