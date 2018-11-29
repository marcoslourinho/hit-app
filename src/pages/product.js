import React from 'react';
import {WebView} from 'react-native';

const Product = ({navigation}) => (
    <WebView source={{uri: navigation.state.params.product.url}}></WebView>
);

Product.navigationOptions = ({navigation}) => ({ //componente sem estado

    title: navigation.state.params.product.title

});

export default Product;