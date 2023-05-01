import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert
} from "react-native";

import { login } from '../util/api'
import api from '../services/api'

export default props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    async function logarUsuario() {
        const obj = {
            email: email,
            senha: password
        }
        try {
            setLoading(true)
            const user = await login(obj)
            setLoading(false)
            setEmail('')
            setPassword('')
            props.navigation.push('Drawer', user)
        } catch (e) {
            setLoading(false)
            Alert.alert(e)
        }

    }

    async function criarUsuario() {
        const obj = {
            email: email,
            senha: password
        }

        try {
            console.log('passou aqui')
            await api.post('/auth', obj)
                .then(() => Alert.alert('Usuario cadastrado com sucesso!'))
                .catch(error => trataErroAPI(error))

            setEmail('')
            setPassword('')
        } catch (e) {
            Alert.alert(e);
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
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/LogoPizzaEC10.png")} />
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    logarUsuario()
                }}>
                <Text style={styles.loginText}>{loading ? "Loading..." : "Login"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    criarUsuario()
                }}>
                <Text style={styles.loginText}>Cadastrar-se</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 70,
        marginLeft: 50,
        width: 210,
        height: 180
    },
    inputView: {
        backgroundColor: "#F08080",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#DC143C",
    },
});