import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "../views/Principal";
import CadastroPizza from "../views/CadastroPizza";
import ListarPizzasCrud from "../views/ListarPizzasCrud";
import TelaVendas from "../views/TelaVendas";
import CarrinhoCompra from "../views/CarrinhoCompra";
import TelaPedidosRealizados from "../views/TelaPedidosRealizados";
import CadastroCategoria from "../views/CadastroCategoria";
import ListarCategoriaCrud from "../views/ListarCategoriaCrud";

const Drawer = createDrawerNavigator();


export default props => (
    <Drawer.Navigator initialRouteName="Principal" screenOptions={screenOptions}>
        <Drawer.Screen name="Principal" options={{ title: 'Página Principal'}} component={Principal}></Drawer.Screen>
        <Drawer.Screen name="CadastroPizza" options={{ title: 'Cadastro de Pizzas'}} component={CadastroPizza}></Drawer.Screen>
        <Drawer.Screen name="ListarPizzasCrud" options={{ title: 'Lista de Pizzas'}} component={ListarPizzasCrud}></Drawer.Screen>
        <Drawer.Screen name="CadastroCategoria" options={{ title: 'Cadastro Categoria'}} component={CadastroCategoria}></Drawer.Screen>
        <Drawer.Screen name="ListarCategoriaCrud" options={{ title: 'Lista de Categoria'}} component={ListarCategoriaCrud}></Drawer.Screen>
        <Drawer.Screen name="TelaVendas" options={{ title: 'Menu'}} component={TelaVendas}></Drawer.Screen>
        <Drawer.Screen name="TelaPedidosRealizados" options={{ title: 'Pedidos Realizados'}} component={TelaPedidosRealizados}></Drawer.Screen>
        <Drawer.Screen name="CarrinhoCompra" options={{ title: 'Carrinho de Compra', drawerItemStyle: {display: 'none'}}} component={CarrinhoCompra}></Drawer.Screen>
    </Drawer.Navigator>
)

const screenOptions = {
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}