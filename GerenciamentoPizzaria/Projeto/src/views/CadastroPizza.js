import React, { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert } from "react-native";
import {
    adicionaPizza,
    alteraPizza,
    obtemTodasCategorias
} from '../services/dbservice';
import { Autocomplete, AutocompleteItem } from "@ui-kitten/components";
import api from '../services/api'

export default ({ route, navigation }) => {
    //console.warn(route.params ? route.params.desc : "")
    //const [prod, setProd] = useState(route.params ? route.params : {})
    const [codigo, setCodigo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('')
    const [precos, setPrecos] = useState('')
    const [data, setData] = useState([]);
    const [dataAux, setDataAux] = useState([]);
    const [value, setValue] = useState(null);
    const filter = (item, query) => item.categoria.toLowerCase().includes(query.toLowerCase());
    let cate = []
    //console.warn(descricao)

    const onSelect = (index) => {
        setValue(data[index].categoria);
    };

    const onChangeText = (query) => {
        setValue(query);
        setData(data.filter(item => filter(item, query)));
        if (query === '')
            setData(dataAux)
    };

    const renderOption = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.categoria}
        />
    );

    useEffect(() => {
        if (route.params) {
            setCodigo(route.params.id)
            setDescricao(route.params.descricao)
            setPrecos(route.params.precoUnitario.toString())
            setValue(route.params.categoria)
            // console.warn(selected)
        } else {
            setCodigo('')
            setDescricao('')
            setPrecos('')
            setValue('')
        }
    }, [route.params])

    async function carregarDadosCategoria() {
        await carregarDados()

    }

    useEffect(
        () => {
            carregarDadosCategoria();
        }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            carregarDadosCategoria();
        });

        return unsubscribe;
    }, [navigation]);

    async function carregarDados() {
        try {
            let listCategoria = (await api.get('/categoria/list/getAll'))
            setData(listCategoria.data)
            setDataAux(listCategoria.data)
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }

    async function salvaDados() {
        let novoRegistro = codigo == '';

        if (descricao === '' || value === '' || precos === '') {
            Alert.alert('Aviso', 'É necessário preencher todos os campos, exceto o código.')
        } else {
            let obj = {
                id: novoRegistro ? createUniqueId() : codigo,
                descricao: descricao,
                categoria: value,
                precoUnitario: parseFloat(precos),
            };


            try {

                if (novoRegistro) {
                    await api.post('/pizza', obj)
                    .then(() => Alert.alert('Adicionado com sucesso!'))
                    .catch(error => trataErroAPI(error))
                } else {
                    await api.put('/pizza/' + codigo, obj)
                    .then(() => Alert.alert('Alterado com sucesso!'))
                    .catch(error => trataErroAPI(error))
                }
                /* if (novoRegistro) {
                    let resposta = (await adicionaPizza(obj));

                    if (resposta)
                        Alert.alert('adicionado com sucesso!');
                    else
                        Alert.alert('Falhou miseravelmente!');
                }
                else {
                    let resposta = await alteraPizza(obj);
                    if (resposta)
                        Alert.alert('Alterado com sucesso!');
                    else
                        Alert.alert('Falhou miseravelmente!');
                } */

                Keyboard.dismiss();
                setCodigo('')
                setDescricao('')
                setValue('')
                setPrecos('')
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
            <Text style={style.label}>Descrição</Text>
            <TextInput onChangeText={desc => setDescricao(desc)}
                value={descricao}
                style={style.input}></TextInput>
            <Text style={style.label}>Categoria</Text>
            <Autocomplete
                placeholder='Place your Text'
                value={value}
                onSelect={onSelect}
                onChangeText={onChangeText}>
                {data.map(renderOption)}
            </Autocomplete>
            <Text style={style.label}>Preço</Text>
            <TextInput onChangeText={preco => setPrecos(preco)}
                value={precos}
                style={style.input}
                keyboardType='phone-pad'></TextInput>

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
                    setDescricao('')
                    setValue('')
                    setPrecos('')
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