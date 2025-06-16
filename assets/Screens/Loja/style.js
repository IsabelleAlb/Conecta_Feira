import { View, Image, StyleSheet, Text } from 'react-native';




export function NomeLoja({ nome, descricao }) {
    return (
        <View style={styles.containerNome}>
            <Text style={styles.nomeLoja}>{nome}</Text>
            <Text style={styles.descLoja}>{descricao}</Text>
        </View>
    );
}

export function Produto({ imagem, nome, preco }) {
    return (
        <View style={styles.produtoItem}>
            <Image source={imagem} style={styles.imgProduto} />
            <View style={styles.infoProduto}>
                <Text style={styles.nomeProduto}>{nome}</Text>
                <Text style={styles.precoProduto}>{preco}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerNome: {
        marginTop: '3%',
        paddingHorizontal: 20
    },

    nomeLoja: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#5D4820',
        textAlign: 'center'
    },

    descLoja: {
        color: '#5D4820',
        textAlign: 'center',
        fontSize: 18
    },

    produtoItem: {
        borderRadius: 12,
        padding: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    imgProduto: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 15,
    },

    infoProduto: {
        flex: 1,
        justifyContent: 'center',
    },

    nomeProduto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5D4820',
    },

    precoProduto: {
        fontSize: 16,
        color: '#5D4820',
        marginTop: 4,
    }
});
