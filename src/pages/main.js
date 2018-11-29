import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import api from '../services/api'
export default class Main extends Component {

    static navigationOptions = {
        title: "Hit Libs"
    }

    state = {
        productInfo: {},
        docs: [],
        page: 1
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const {docs, ...productInfo} = response.data;
        this.setState({counter: docs.length});
        this.setState({docs: [...this.state.docs, ...docs], 
                       productInfo,
                       page});
    }

    loadMore = () => {
        const {page, productInfo} = this.state;
        if (page === productInfo.pages) return;

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }

    renderItem = ({item}) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("Product", {product: item})}} style={styles.productButton} >
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    render(){
        return(
            <View style={styles.container}>
                {/* <Text>Página Principal {this.state.counter} </Text>
                {this.state.docs.map(product => (<Text key={product._id}>{product.title}</Text>))} */}

                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={ item => item._id }
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1} //quando eu tiver com 10% da lista scrollado eu carrego o loadMore
                    />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    list: {
        padding: 20
    },
    productContainer: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20
    },
    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#94e8dd",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    productButtonText:{
        fontSize: 16,
        color: '#94e8dd',
        fontWeight: "bold"
    }

});