import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'

export const login = async(obj) => {
    console.log("passou aqui")
    console.log(obj)
    const response = await api.post('/auth/login', obj)
    console.log("passou aqui22")
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    await AsyncStorage.setItem('token', response.data.token)

    return response.data.user
}
