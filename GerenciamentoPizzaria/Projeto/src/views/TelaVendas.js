import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Text, View, Alert, ScrollView, StyleSheet } from "react-native";
import { Icon } from '@rneui/themed';
import {
    obtemTodasPizzas,
    obtemParcialmentePizzas,
    obtemTodasCategorias,
    excluiPizza,
} from '../services/dbservice';
import { ProductListContext } from '../components/Context';
import { Autocomplete, AutocompleteItem } from "@ui-kitten/components";

let pedidoPizza = []

export default props => {
    const [pizzas, setPizzas] = useState([])
    const [contagem, setContagem] = useState(0)
    const [pedidos, setPedidos] = useState([])
    const { productList, setProductList } = useContext(ProductListContext);
    const [data, setData] = useState([]);
    const [dataAux, setDataAux] = useState([]);
    const [value, setValue] = useState(null);
    const filter = (item, query) => item.categoria.toLowerCase().includes(query.toLowerCase());

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

    async function carregarDadosPizza() {
        await carregarDados()

    }

    async function carregarDadosCategoria() {
        await carregarDadosCategoriaPizza()

    }

    useEffect(
        () => {
            carregarDadosPizza();
            carregarDadosCategoria();
        }, []);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            carregarDadosPizza();
            carregarDadosCategoria();
        });

        return unsubscribe;
    }, [props.navigation]);

    async function carregarDados() {
        try {
            let listPizzas = await obtemTodasPizzas()
            setPizzas(listPizzas);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    async function carregarDadosCategoriaPizza() {
        try {
            let listCategoria = await obtemTodasCategorias()
            setData(listCategoria)
            setDataAux(listCategoria)
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    function adicionaCarrinhoCompra(pizza) {
        setProductList([...productList, pizza])
        //console.warn(productList.length)
        setContagem(productList.length + 1)
    }

    function limparCarrinhoCompra() {
        Alert.alert('Limpar carrinho', 'Deseja realmente limpar o carrinho de compras?', [
            {
                text: 'Sim',
                onPress() {
                    pedidoPizza = []
                    setProductList(pedidoPizza)
                    setContagem(0)
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    async function obterParcialmente() {
        try {
            let listPizzas
            if (value !== '')
                listPizzas = await obtemParcialmentePizzas(value)
            else
            listPizzas = await obtemTodasPizzas()
            setPizzas(listPizzas);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
                <Autocomplete
                style={{width: '100%', margin: 15}}
                    placeholder='Place your Text'
                    value={value}
                    onSelect={onSelect}
                    onChangeText={onChangeText}>
                    {data.map(renderOption)}
                </Autocomplete>
                <Icon name="search" type='font-awesome' style={{marginLeft: 40, marginTop: 20}} size={25}
                    onPress={() => {
                        obterParcialmente()
                    }}
                ></Icon>
            </View>
            <ScrollView>
                {
                    pizzas.map((pizza, index) => (
                        <View style={style.pizzas} key={index.toString()}>

                            <Text style={style.fontPizza}>{pizza.desc} - R$ {pizza.preco}</Text>
                            <Icon name='add' raised style={{ marginTop: 7 }}
                                onPress={() => {
                                    adicionaCarrinhoCompra(pizza)
                                }}
                            ></Icon>
                            <Text style={style.categoriaPizza}>{pizza.cat}</Text>

                        </View>
                    ))
                }

            </ScrollView>
            <View style={style.footer}>
                <Text style={style.fontQtde}>Quantidade: {contagem}</Text>
                <Icon name="shopping-cart" raised reverse size={25}
                    onPress={() => {
                        //console.warn(pedidos)
                        props.navigation.navigate('CarrinhoCompra')
                    }}></Icon>
                <Icon name="trash" type='font-awesome' raised reverse size={25}
                    onPress={() => {
                        limparCarrinhoCompra()
                    }}
                ></Icon>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    footer: {
        backgroundColor: '#f4511e',
        flexDirection: 'row',
        padding: 5,
    },
    listaPizzas: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        marginTop: 20,
    },
    pizzas: {
        backgroundColor: '#ed8f1c',
        height: 80,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    fontPizza: {
        fontSize: 20,
        margin: 10,
        marginLeft: 20,
        width: '68%'
    },
    categoriaPizza: {
        marginLeft: 20,
        marginTop: -13
    },
    fontQtde: {
        fontSize: 20,
        width: '47%',
        margin: 18,
        fontWeight: 'bold'
    }
})