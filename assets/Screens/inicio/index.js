import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

export function Inicio({ navigation }) {
  return (
    <View>
      <View style={styles.containerLogo}>
        <Image source={require('../../images/logo.png')} style={styles.logo} />
      </View>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Homepage')}
      >
        <Text style={styles.textoBotao}>Quero Visitar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textoBotao}>Área do Vendedor</Text>
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

  botao: {
    backgroundColor: '#DD9D27',
    borderRadius: 15,
    padding: 18,
    marginVertical: 8,
    marginHorizontal: '5%',
    width: '90%',
  },

  textoBotao: {
    fontWeight: 'bold',
    color: '#5D4820',
    textAlign: 'center',
    fontSize: 18,
  },
});
