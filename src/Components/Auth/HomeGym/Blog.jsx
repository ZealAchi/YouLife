import React from 'react'
// import { WebView } from 'react-native-webview';
import { WebView } from 'react-native-webview';

export  function Blog(props) {
    return (
        <>
         <WebView source={{ uri: 'https://www.doyoutrain.com/blog' }} />
        </>
    )
}
