import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Alert } from "react-native";
import { Ionicons, Entypo } from '@expo/vector-icons';
import {
  obtemTodasPizzas,
  obtemTodasCategorias,
  excluiPizza,
} from '../services/dbservice';
import api from '../services/api'
import { ListItem, Button } from 'react-native-elements';


export default props => {
  const [pizzas, setPizzas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)

  async function efetivarExclusaoPizza(pizza) {
    try {
      await api.delete('/pizza/' + pizza.id)
            .then(() => Alert.alert('Excluido com sucesso!'))
            .catch(error => trataErroAPI(error))
      await carregarDados()
      /* await excluiPizza(pizza.id);
      await carregarDados()
      Alert.alert('Apagado com sucesso!'); */
    } catch (e) {
      Alert.alert(e);
    }
  }

  function confirmDeletionPizza(pizza) {

    Alert.alert('Excluir Pizza', 'Deseja excluir a pizza?', [
      {
        text: 'Sim',
        onPress() {
          efetivarExclusaoPizza(pizza)
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  async function carregarDadosPizza() {
    setLoading(true)
    await carregarDados()

  }

  useEffect(
    () => {
      carregarDadosPizza();
    }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      carregarDadosPizza();
    });

    return unsubscribe;
  }, [props.navigation]);

  async function carregarDados() {
    try {
      console.log('Antes API')
      let listPizzas = (await api.get('/pizza/list/getAll'))
      console.log('depois API')
      setPizzas(listPizzas.data);
      setLoading(false)
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function getActions(user) {

    return (
      <>
        <Button
          onPress={() => {
            props.navigation.navigate('CadastroPizza', user)
          }}
          type='clear'
          icon={<Entypo name="edit" size={32} color="black" />}></Button>
        <Button
          onPress={() => confirmDeletionPizza(user)}
          //onPress={() => console.warn('excluir')}
          type='clear'
          icon={<Ionicons name="md-remove-circle" size={32} color="red" />}></Button>
      </>
    )
  }

  function getUserItem({ item: user }) {

    return (
      <ListItem
        key={user.id}
        bottomDivider

      >
        <ListItem.Content>
          <ListItem.Title>{user.descricao} - R$ {user.precoUnitario}</ListItem.Title>
          <ListItem.Subtitle>{user.categoria}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Title right>
          {getActions(user)}
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
        keyExtractor={user => user.id.toString()}
        data={pizzas}
        renderItem={getUserItem}
      ></FlatList>
    </View>
  )
}
