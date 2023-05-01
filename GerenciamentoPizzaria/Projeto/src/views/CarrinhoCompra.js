import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Text, View, Alert, ScrollView, StyleSheet } from "react-native";
import { ListItem, Button } from 'react-native-elements';
import { Icon } from '@rneui/themed';
import {
    adicionaVenda,
} from '../services/dbservice';
import { ProductListContext } from '../components/Context';

export default ({ route, navigation }) => {
    const { productList, setProductList } = useContext(ProductListContext);
    let codigoVenda = ''

    function createUniqueId() {
        if (codigoVenda === '')
            codigoVenda = Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
        return codigoVenda
    }

    function getPedidoItem({ item: pedido }) {
        return (
            <ListItem
                key={pedido.cod}
                bottomDivider
            >
                <ListItem.Content>
                    <ListItem.Title>{pedido.desc} - R$ {pedido.preco}</ListItem.Title>
                    <ListItem.Subtitle>{pedido.cat}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    function valorTotal() {
        let total = 0
        productList.map((product, index) => {
            total += parseFloat(product.preco)
        })
        return total
    }

    async function salvaVenda() {
        let produtosVendidos = ''
        let precosPizza = ''

        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        dataAtual = dia + '/' + mes + '/' + ano;

        productList.map((produto) => {
            if (produtosVendidos === '') {
                produtosVendidos += produto.desc
            } else {
                produtosVendidos += "|" + produto.desc
            }

            if (precosPizza === '') {
                precosPizza += produto.preco
            } else {
                precosPizza += "|" + produto.preco
            }
        })

        let obj = {
            codVenda: createUniqueId(),
            descs: produtosVendidos,
            precos: precosPizza,
            data: dataAtual,
            precoTotal: valorTotal().toString()
        };


        try {

            let resposta = (await adicionaVenda(obj));

            if (resposta)
                Alert.alert('Compra realizado com sucesso!');
            else
                Alert.alert('Falhou miseravelmente!');

            setProductList([])

        } catch (e) {
            Alert.alert(e);
        }
    }

    function efetivaCarrinhoCompra() {
        Alert.alert('Efetivar a compra', 'Deseja efetivar a compra?', [
            {
                text: 'Sim',
                onPress: () => {
                    salvaVenda()
                    navigation.navigate('TelaPedidosRealizados')
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function ifCondition() {
        if (productList.length === 0) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Não há pedidos no carrinho!</Text>
                </View>
            )
        } else {
            return (
                <>
                    <FlatList
                        data={productList}
                        renderItem={getPedidoItem}
                    ></FlatList>
                    <View style={style.footer}>
                        <Text style={style.fontValorTotal}> Total: R${valorTotal()}</Text>
                        <Icon name='check' raised reverse
                            onPress={() => {
                                efetivaCarrinhoCompra()
                            }}
                        ></Icon>
                    </View>
                </>
            )

        }
    }



    return (
        <View style={{ flex: 1 }}>
            {
                ifCondition()
            }

        </View>
    )
}

const style = StyleSheet.create({
    footer: {
        backgroundColor: '#f4511e',
        flexDirection: 'row',
        padding: 0,
    },
    fontValorTotal: {
        fontSize: 20,
        width: '72%',
        margin: 18,
        fontWeight: 'bold'
    }
})