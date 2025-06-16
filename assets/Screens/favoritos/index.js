import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Header, Title } from '../../components/style';
import { useState } from 'react';

// Vamos simular os favoritos aqui por enquanto
const favoritosExemplo = [];

export function Favoritos() {
    const [favoritos, setFavoritos] = useState(favoritosExemplo);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Header>
                <Title text="Lojas Favoritas" />
            </Header>

            <View style={styles.containerLojas}>
                {favoritos.length === 0 ? (
                    <Text style={styles.textoVazio}>Você ainda não tem lojas favoritas.</Text>
                ) : (
                    favoritos.map((loja) => (
                        <TouchableOpacity key={loja.id} style={styles.lojaItem} activeOpacity={0.7}>
                            <Image source={loja.imagemPerfil} style={styles.lojaImagem} />
                            <Text style={styles.lojaNome}>{loja.nome}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerLojas: {
        paddingHorizontal: '5%',
        marginTop: 20,
    },

    lojaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#DD9D27',
    },

    lojaImagem: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },

    lojaNome: {
        fontSize: 18,
        color: '#5D4820',
        fontWeight: 'bold',
    },

    textoVazio: {
        fontSize: 16,
        color: '#5D4820',
        textAlign: 'center',
        marginTop: 50,
    },
});
