import * as RNFS from 'react-native-fs';
export function useBase64(base64,setBase64) {
    async function ToBase64(data) {
        await RNFS.readFile(data, "base64").then((result) => {
            setBase64(result)
            return result
        })
    }
    return {
        base64,
        ToBase64
    }
}