import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { Header, Title } from '../../components/style';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useDatabase } from '../../data/database';

export function Busca() {
    const [busca, setBusca] = useState('');
    const { buscarLojasPorNome } = useDatabase();
    const [lojasEncontradas, setLojasEncontradas] = useState([]);

    // 👇 Função agora está DENTRO do componente
    async function handleBuscar() {
        try {
            const resultado = await buscarLojasPorNome(busca);
            setLojasEncontradas(resultado);
        } catch (error) {
            console.error('Erro ao buscar lojas:', error);
        }
    }

    const lojasFiltradas = lojasEncontradas;

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Header>
                <Title text="Buscar Loja" />

                <View style={styles.containerbusca}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome da loja..."
                        placeholderTextColor="#aaa"
                        value={busca}
                        onChangeText={setBusca}
                    />
                    <TouchableOpacity onPress={handleBuscar}>
                        <Ionicons
                            name="search"
                            color="#DD9D27"
                            size={28}
                        />
                    </TouchableOpacity>
                </View>
            </Header>

            <View style={styles.containerLojas}>
                {lojasFiltradas.length > 0 ? (
                    lojasFiltradas.map((loja) => (
                        <TouchableOpacity key={loja.id} style={styles.lojaItem} activeOpacity={0.7}>
                            <Image source={{ uri: loja.imagem_perfil }} style={styles.lojaImagem} />
                            <Text style={styles.lojaNome}>{loja.nome_fantasia}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: '#aaa' }}>
                        Nenhuma loja encontrada.
                    </Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerbusca: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#DD9D27',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginVertical: 8,
        marginHorizontal: '4%',
        width: '90%',
        height: 60,
        paddingHorizontal: 15,
    },

    input: {
        flex: 1,
        fontSize: 18,
        color: '#5D4820',
    },
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
    },

    lojaImagem: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },

    lojaNome: {
        fontSize: 18,
        color: '#5D4820',
        fontWeight: 'bold',
    },
});
