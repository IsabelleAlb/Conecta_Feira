import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDatabase } from '../../data/database';
import { useRoute } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Header } from '../../components/style';
import { Produto } from '../Loja/style';

export function AreaLojista() {
  const { params } = useRoute();
  const loja = params.loja;

  const { atualizarLoja, buscarProdutosPorLoja, inserirProduto, excluirProduto } = useDatabase();

  const [produtos, setProdutos] = useState([]);
  const [nomeLoja, setNomeLoja] = useState(loja.nome_fantasia);
  const [descricaoLoja, setDescricaoLoja] = useState('Essa é a sua área de gerenciamento. Adicione, edite ou remova produtos da sua loja.');
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [imagemProduto, setImagemProduto] = useState(null);
  const [imagemPerfil, setImagemPerfil] = useState(loja.imagem_perfil);

  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoDescricao, setEditandoDescricao] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const resultado = await buscarProdutosPorLoja(loja.id);
    setProdutos(resultado);
  }

  async function adicionarProduto() {
    if (!nomeProduto || !precoProduto || !imagemProduto) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    await inserirProduto(nomeProduto, parseFloat(precoProduto), imagemProduto, loja.id);
    setNomeProduto('');
    setPrecoProduto('');
    setImagemProduto(null);
    carregarProdutos();
  }

  async function removerProduto(id) {
    await excluirProduto(id);
    carregarProdutos();
  }

  async function alterarImagemPerfil() {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      const novaImagem = resultado.assets[0].uri;
      setImagemPerfil(novaImagem);
      await atualizarLoja(
        loja.id,
        nomeLoja,
        loja.cnpj,
        loja.nome_dono,
        loja.categoria_id,
        loja.email,
        loja.senha,
        novaImagem
      );
    }
  }

  async function selecionarImagemProduto() {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagemProduto(resultado.assets[0].uri);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
      <Header>
        <TouchableOpacity
          style={{ position: 'absolute', top: 45, right: 20, zIndex: 1 }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="person-circle-outline"
            size={30}
            color={'#5D4820'}
          />
        </TouchableOpacity>
      </Header>

      {/* Imagem de perfil */}
      <View style={{
        marginTop: -105,
        width: 275,
        height: 195,
        borderRadius: 35,
        backgroundColor: "#DD9D27",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <TouchableOpacity onPress={alterarImagemPerfil}>
          <Image source={{ uri: imagemPerfil }} style={{ width: 270, height: 190, borderRadius: 35 }} />
        </TouchableOpacity>
      </View>


      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        {/* Nome da Loja */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {editandoNome ? (
            <TextInput
              value={nomeLoja}
              onChangeText={setNomeLoja}
              onSubmitEditing={() => setEditandoNome(false)}
              style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#422800' }}
              autoFocus
            />
          ) : (
            <>
              <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#422800' }}>
                {nomeLoja}
              </Text>
              <TouchableOpacity onPress={() => setEditandoNome(true)}>
                <Feather name="edit-2" size={25} color="#DD9D27" />
              </TouchableOpacity>
            </>
          )}
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 5 }}>
          {editandoDescricao ? (
            <TextInput
              value={descricaoLoja}
              onChangeText={setDescricaoLoja}
              onSubmitEditing={() => setEditandoDescricao(false)}
              style={{ textAlign: 'center', fontSize: 16, color: '#422800' }}
              autoFocus
              multiline
            />
          ) : (
            <>
              <Text style={{ textAlign: 'center', fontSize: 16, color: '#422800' }}>
                {descricaoLoja}
              </Text>
              <TouchableOpacity onPress={() => setEditandoDescricao(true)}>
                <Feather name="edit-2" size={25} color="#DD9D27" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#5D4820', marginBottom: 10, paddingHorizontal: 10, marginTop: 15 }}>
        Seus Produtos
      </Text>

      {produtos.map(produto => (
        <View key={produto.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
          <Produto
            imagem={{ uri: produto.imagem }}
            nome={produto.nome}
            preco={`R$ ${produto.preco.toFixed(2)}`}
          />
          <TouchableOpacity onPress={() => removerProduto(produto.id)}>
            <Feather name="trash-2" size={18} color="#c58b1b" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Adicionar Produto */}
      <View style={{ paddingHorizontal: 10, marginBottom: 40 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#5D4820', marginBottom: 10, marginTop: 15 }}>
          Adicionar Produto
        </Text>

        <TextInput
          placeholder="Nome do Produto"
          style={{ borderWidth: 1, borderColor: '#DD9D27', padding: 8, borderRadius: 15, marginBottom: 8, height: 50 }}
          value={nomeProduto}
          onChangeText={setNomeProduto}
        />

        <TextInput
          placeholder="Preço"
          style={{ borderWidth: 1, borderColor: '#DD9D27', padding: 8, borderRadius: 15, marginBottom: 8, height: 50 }}
          value={precoProduto}
          onChangeText={setPrecoProduto}
          keyboardType="numeric"
        />

        <TouchableOpacity
          onPress={selecionarImagemProduto}
          style={{ backgroundColor: '#DD9D27', borderRadius: 15, padding: 15, marginVertical: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
            Selecionar Imagem
          </Text>
        </TouchableOpacity>

        {imagemProduto && (
          <Image source={{ uri: imagemProduto }} style={{ width: 100, height: 100, borderRadius: 8, alignSelf: 'center', marginVertical: 8 }} />
        )}

        <TouchableOpacity
          onPress={adicionarProduto}
          style={{ backgroundColor: '#DD9D27', borderRadius: 15, padding: 15, marginVertical: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
            Adicionar Produto
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
