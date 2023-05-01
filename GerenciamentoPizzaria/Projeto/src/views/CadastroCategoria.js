import React, { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert } from "react-native";
import {
    adicionaCategoria,
    alteraCategoria,
} from '../services/dbservice';
import api from '../services/api'

export default ({ route, navigation }) => {
    const [codigo, setCodigo] = useState('')
    const [categoria, setCategoria] = useState('')

    useEffect(() => {
        if (route.params) {
            setCodigo(route.params.idCat)
            setCategoria(route.params.categoria)
        } else {
            setCodigo('')
            setCategoria('')
        }
    }, [route.params])

    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }

    async function salvaDados() {
        let novoRegistro = codigo === '';
        if (categoria === '') {
            Alert.alert('Aviso', 'É necessário o preenchimento do campo Categoria.')
        } else {
            let obj = {
                idCat: novoRegistro ? createUniqueId() : codigo,
                categoria: categoria,
            };
    
            try {
                if (novoRegistro) {
                    await api.post('/categoria', obj)
                            .then(() => Alert.alert('Adicionado com sucesso!'))
                            .catch(error => trataErroAPI(error))
                } else {
                    await api.put('/categoria/' + codigo, obj)
                            .then(() => Alert.alert('Alterado com sucesso!'))
                            .catch(error => trataErroAPI(error))
                }
                /* if (novoRegistro) {
                    let resposta = (await adicionaCategoria(obj));
    
                    if (resposta)
                        Alert.alert('adicionado com sucesso!');
                    else
                        Alert.alert('Falhou miseravelmente!');
                }
                else {
                    let resposta = await alteraCategoria(obj);
                    if (resposta)
                        Alert.alert('Alterado com sucesso!');
                    else
                        Alert.alert('Falhou miseravelmente!');
                } */
    
                setCodigo('')
                setCategoria('')
            } catch (e) {
                Alert.alert(e);
            }
        }
    }

    function trataErroAPI(error) {
        if (error.response && error.response.data && error.response.data.erro) {
            Alert.alert(error.response.data.erro);
        }
        else {
            Alert.alert(error.toString());
        }
    }

    return (
        <View style={style.form}>
            <Text style={style.label}>Código</Text>
            <TextInput editable={false} selectTextOnFocus={false} onChangeText={cod => setCodigo(cod)}
                value={codigo}
                style={style.input}></TextInput>
            <Text style={style.label}>Categoria</Text>
            <TextInput onChangeText={cat => setCategoria(cat)}
                value={categoria}
                style={style.input}></TextInput>

            <TouchableOpacity
                style={style.button}
                onPress={() => {
                    salvaDados();
                }}
            >
                <Text style={style.text}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[style.button, style.margin]}
                onPress={() => {
                    setCodigo('')
                    setCategoria('')
                }}
            >
                <Text style={style.text}>Limpar</Text>
            </TouchableOpacity>
            {/* <Button title='Salvar'
                style={style.button}
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user,
                    })
                    navigation.goBack()
                }}></Button> */}
        </View>
    )
}

const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    label: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    button: {
        borderRadius: 18,
        backgroundColor: '#f4511e',
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        width: 65,
        height: 30,
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    margin: {
        marginTop: 8,
    }
})