import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function Login() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const navigation = useNavigation();

  function signin(){
    const lojaExemplo = {
      id: 1,
      nome_fantasia: 'Minha Loja',
      cnpj: '12548963547824',
      nome_completo: 'Florzinha',
      categoria_id:1,
      email: 'meuemail@gmail.com',
      senha: '123456',
      imagem_perfil: 'https://via.placeholder.com/150'
    };
    navigation.navigate('AreaLojista', {loja: lojaExemplo});


  }




  return (
    <View>
      <View style={styles.containerLogo}>
        <Image source={require('../../images/logo.png')} style={styles.logo} />
      </View>

      <TextInput style={styles.caixa} placeholder="CNPJ" placeholderTextColor="#5D4820" />

      {/* Campo de senha com ícone */}
      <View style={styles.caixaSenha}>
        <TextInput
          style={styles.inputSenha}
          placeholder="Senha"
          placeholderTextColor="#5D4820"
          secureTextEntry={!senhaVisivel} // alterna visibilidade
        />
        <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
          <Ionicons
            name={senhaVisivel ? 'eye' : 'eye-off'}
            color="#5D4820"
            size={28}
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao} onPress={signin}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.cadastro} onPress={() => navigation.navigate ('Cadastro')}>
          Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}




const styles = StyleSheet.create({
  containerLogo: {
    marginTop: '45%',
    marginHorizontal: '25%',
  },

  logo: {
    width: 200,
    height: 200,
  },

  caixa: {
    borderWidth: 1.5,
    borderColor: '#DD9D27',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    fontSize: 18,
    marginVertical: 8,
    marginHorizontal: '5%',
    color: '#5D4820',
    width: '90%',
  },

  caixaSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DD9D27',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginVertical: 8,
    marginHorizontal: '5%',
    width: '90%',
    height: 60
  },

  inputSenha: {
    flex: 1,
    fontSize: 18,
    color: '#5D4820',
    paddingVertical: 12,
  },

  cadastro: {
    marginHorizontal: '35%',
    color: '#5D4820',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },

  botao: {
    backgroundColor: '#DD9D27',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: '5%',
    width: '90%',
  },

  textoBotao: {
    fontWeight: 'bold',
    color: '#5D4820',
    textAlign: 'center',
    fontSize: 17,
  },
});
