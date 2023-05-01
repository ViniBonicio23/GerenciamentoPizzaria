import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Alert } from "react-native";
import { Ionicons, Entypo } from '@expo/vector-icons';
import {
    obtemTodasCategorias,
    excluiCategoria,
} from '../services/dbservice';
import { ListItem, Button } from 'react-native-elements';
import api from '../services/api'

export default props => {
    const [categorias, setCategorias] = useState([])

    async function efetivarExclusaoCategoria(cat) {
        try {
            await api.delete('/categoria/' + cat.idCat)
                    .then(() => Alert.alert('Excluido com sucesso!'))
                    .catch(error => trataErroAPI(error))
            await carregarDados()
            /* await excluiCategoria(cat.idCat);
            Alert.alert('Apagado com sucesso!'); */
        } catch (e) {
            Alert.alert(e);
        }
    }

    function confirmDeletionCategoria(cat) {

        Alert.alert('Excluir Categoria', 'Deseja excluir a categoria?', [
            {
                text: 'Sim',
                onPress() {
                    efetivarExclusaoCategoria(cat)
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    async function carregarDadosCategoria() {
        await carregarDados()

    }

    useEffect(
        () => {
            carregarDadosCategoria();
        }, []);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            carregarDadosCategoria();
        });

        return unsubscribe;
    }, [props.navigation]);

    async function carregarDados() {
        try {
            let listCategoria = (await api.get('/categoria/list/getAll'))
            setCategorias(listCategoria.data);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    function getActions(cat) {
        return (
            <>
                <Button
                    onPress={() => props.navigation.navigate('CadastroCategoria', cat)}
                    type='clear'
                    icon={<Entypo name="edit" size={32} color="black" />}></Button>
                <Button
                    onPress={() => confirmDeletionCategoria(cat)}
                    //onPress={() => console.warn('excluir')}
                    type='clear'
                    icon={<Ionicons name="md-remove-circle" size={32} color="red" />}></Button>
            </>
        )
    }

    function getCategoriaItem({ item: cat }) {
        return (
            <ListItem
                key={cat.idCat}
                bottomDivider

            >
                <ListItem.Content>
                    <ListItem.Title>{cat.categoria}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Title right>
                    {getActions(cat)}
                </ListItem.Title>
            </ListItem>
        )
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
        <View>
          <FlatList
            keyExtractor={user => user.idCat.toString()}
            data={categorias}
            renderItem={getCategoriaItem}
          ></FlatList>
        </View>
      )
}