import { ScrollView, View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { Header } from '../../components/style';
import { NomeLoja, Produto } from './style';
import { lojas } from '../../components/dadosLojas';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';


export function Loja({ route }) {
    const { id } = route.params;
    const loja = lojas.find(item => item.id === id);

    const [favorito, setFavorito] = useState (false);

    function handleFavoritar(){
        setFavorito(!favorito);
        }

        if (!loja) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loja não encontrada.</Text>
                </View>
                );
        }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Header>
                <TouchableOpacity style={styles.botaoFavorito} activeOpacity={0.7} onPress={handleFavoritar}>
                    <Ionicons name={favorito ? 'star' : 'star-outline'}
                    size={30} color={favorito ? '#FFFFFF' : '#5D4820'}/>
                </TouchableOpacity>
            </Header>

            <View style={styles.container}>
                <TouchableOpacity>
                    <Image
                        source={loja.imagemPerfil}
                        style={styles.imgPerfil}
                    />
                </TouchableOpacity>
            </View>

            <NomeLoja
                nome={loja.nome}
                descricao={loja.descricao}
            />

            {/* Lista de produtos */}
            <View style={styles.containerProdutos}>
                <Text style={styles.tituloProdutos}>Nossos Produtos</Text>

                {loja.produtos.map((produto) => (
                    <Produto
                        key={produto.id}
                        imagem={produto.imagem}
                        nome={produto.nome}
                        preco={produto.preco}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: -105,
        width: 275,
        height: 195,
        borderRadius: 35,
        backgroundColor: "#DD9D27",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },

    imgPerfil: {
        width: 270,
        height: 190,
        borderRadius: 35,
    },

    containerProdutos: {
        marginTop: 10,
        paddingHorizontal: 10,
    },

    tituloProdutos: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5D4820',
        marginBottom: 10,
        paddingHorizontal: 10
    },

    botaoFavorito: {
        position: 'absolute',
        top: 45,
        right: 20,
        zIndex: 1
    }
});
