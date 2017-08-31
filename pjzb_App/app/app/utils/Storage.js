/**
 * Created by wsl on 2017/01/12.
 */
 import { AsyncStorage } from 'react-native';

 let Storage = {
    setItem: async (key, value) => {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
     },
    getItem: async (key) => {
        let data = await AsyncStorage.getItem(key)
             .then((data, error) => {
                if (data) return JSON.parse(data);
             });
             return data;
     },
     clearItem: async (key) => {
         await AsyncStorage.removeItem(key);
     },
     clear: async () => {
         await AsyncStorage.clear();
     },
 }

 export default Storage;
