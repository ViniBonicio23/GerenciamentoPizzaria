import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Text, View, Alert, ScrollView, StyleSheet } from "react-native";
import { ListItem, Button } from 'react-native-elements';
import { Icon } from '@rneui/themed';
import {
    obtemTodasVendas,
} from '../services/dbservice';

export default props => {

    const [vendas, setVendas] = useState([])

    async function carregarDados() {
        try {
            let listVendas = await obtemTodasVendas()
            setVendas(listVendas);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    async function carregarVendas() {
        await carregarDados()
    }

    useEffect(
        () => {
            carregarVendas();
        }, []);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            carregarVendas();
        });

        return unsubscribe;
    }, [props.navigation]);

    function getVendas({ item: venda }) {
        const pizzaArray = venda.descs.split('|')
        const precoArray = venda.precos.split('|')

        return (
            <ListItem
                key={venda.codVenda}
                bottomDivider
            >
                <ListItem.Content>
                    <ListItem.Title style={{width: '120%'}}>Código da Venda: {venda.codVenda}</ListItem.Title>
                    <ListItem.Title right={true}>
                        {venda.data}
                    </ListItem.Title>
                    {
                        pizzaArray.map((pizza, index) => (
                            <ListItem.Subtitle key={index}>{pizza} - R$ {precoArray[index]}</ListItem.Subtitle>
                        ))
                    }
                </ListItem.Content>

                <ListItem.Title>
                    Total do Pedido: R$ {venda.precoTotal}
                </ListItem.Title>
            </ListItem>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                keyExtractor={user => user.codVenda.toString()}
                data={vendas}
                renderItem={getVendas}
            ></FlatList>
        </View>
    )
}