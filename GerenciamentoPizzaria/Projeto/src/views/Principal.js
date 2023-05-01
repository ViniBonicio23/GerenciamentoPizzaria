import React from 'react';
import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import {
    createTableProduto,
    createTableVenda,
    createTableCategoria,
  } from '../services/dbservice';
  
export default props => {
    let tabelasCriadas = false;

  async function processamentoUseEffect() {
    if (!tabelasCriadas) {
      tabelasCriadas = true;
      await createTableProduto();
      await createTableVenda();
      await createTableCategoria();
    }

  }

  useEffect(
    () => {
      processamentoUseEffect(); 
    }, []);

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={style.principal}>
                <Text style={{fontSize: 25}}>Bem-vindo a pizzaria EC10!</Text>
                <Text style={{fontSize: 25, textAlign: 'center'}}>Utilize o menu no canto superior esquerdo para navegar e fazer o seu pedido!</Text>

            </View>

        </View>
    )
}

const style = StyleSheet.create({
    principal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})