import AsyncStorage from '@react-native-async-storage/async-storage';
const Auth = {
    setAuth: async (auth) => {
        try {
            await AsyncStorage.setItem('auth', JSON.stringify(auth));
        } catch (error) {
            console.error(error)
        }
    },
    getAuth: async () => {
        try {
            const auth = await AsyncStorage.getItem('auth');
            if (!auth) {
                return null;
            }
            return JSON.stringify(JSON.parse(auth));
        } catch (error) {
            console.error(error)
        }
    },
    removeAuth: async () => {
        try {
            await AsyncStorage.removeItem('auth');
        } catch (error) {
            console.error(error)
        }
    },
    setDeviceId: async (device_id) => {
        try {
            await AsyncStorage.setItem('device_id', device_id);
        } catch (error) {
            console.error(error)
        }
    },
    getDeviceId: async () => {
        try {
            const device_id = await AsyncStorage.getItem('device_id');
            if (!auth) {
                return null;
            }
            return device_id;
        } catch (error) {
            console.error(error)
        }
    },
    setLanguage: async (lang) => {
        try {
            await AsyncStorage.setItem('language', lang);
        } catch (error) {
            console.error(error)
        }
    },
    getLanguage: async () => {
        try {
            const lang = await AsyncStorage.getItem('language');
            if (!lang) {
                return null;
            }
            return lang;
        } catch (error) {
            console.error(error)
        }
    },
    setAppMasterData: async (samd) => {
        try {
            await AsyncStorage.setItem('samd', samd);
        } catch (error) {
            console.error(error)
        }
    },
    getAppMasterData: async () => {
        try {
            const samd = await AsyncStorage.getItem('samd');
            if (!samd) {
                return null;
            }
            return samd;
        } catch (error) {
            console.error(error)
        }
    }
};

export default Auth;
