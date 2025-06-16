import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useDatabase } from '../../data/database'; // Conectando com o banco

export default function CadastroScreen() {
  const { inserirLoja } = useDatabase();

  // Estados dos campos
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

  // Função para cadastrar
  async function handleCadastrar() {
    if (!nomeFantasia || !cnpj || !nomeCompleto || !categoria || !email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      await inserirLoja(nomeFantasia, cnpj, nomeCompleto, categoria, email, senha);
      Alert.alert('Sucesso', 'Loja cadastrada com sucesso!');

      // Limpar campos
      setNomeFantasia('');
      setCnpj('');
      setNomeCompleto('');
      setCategoria('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
    } catch (error) {
      console.error('Erro ao cadastrar loja:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar a loja.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Cadastro</Text>

        <Text style={styles.label}>Nome Fantasia</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nomeFantasia}
          onChangeText={setNomeFantasia}
        />

        <Text style={styles.label}>CNPJ</Text>
        <TextInput
          style={styles.input}
          placeholder="00.000.000/0000-00"
          keyboardType="numeric"
          value={cnpj}
          onChangeText={setCnpj}
        />

        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue) => setCategoria(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma categoria" value="" />
            <Picker.Item label="Acessórios" value="acessorios" />
            <Picker.Item label="Decoração" value="decoracao" />
            <Picker.Item label="Gastronomia" value="gastronomia" />
            <Picker.Item label="Moda" value="moda" />
            <Picker.Item label="Papelaria" value="papelaria" />
            <Picker.Item label="Produtos Naturais" value="produtos-naturais" />
            <Picker.Item label="Outros" value="outros" />
          </Picker>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: seuemail@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.caixaSenha}>
          <TextInput
            style={styles.inputSenha}
            placeholder="Digite sua senha"
            secureTextEntry={!senhaVisivel}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Ionicons
              name={senhaVisivel ? 'eye' : 'eye-off'}
              color="#5D4820"
              size={28}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar senha</Text>
        <View style={styles.caixaSenha}>
          <TextInput
            style={styles.inputSenha}
            placeholder="Confirme sua senha"
            secureTextEntry={!confirmarSenhaVisivel}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          <TouchableOpacity onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}>
            <Ionicons
              name={confirmarSenhaVisivel ? 'eye' : 'eye-off'}
              color="#5D4820"
              size={28}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c58b1b',
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#c58b1b',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 60,
    fontSize: 18,
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: '#c58b1b',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    width: '100%',
  },
  caixaSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DD9D27',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 20,
  },
  inputSenha: {
    flex: 1,
    fontSize: 18,
    color: '#5D4820',
  },
  button: {
    backgroundColor: '#c58b1b',
    padding: 15,
    borderRadius: 12,
    height: 60,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30, 
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
});
