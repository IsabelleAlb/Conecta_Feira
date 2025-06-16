import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Actions() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.actionButton,
              index === data.length - 1 && { marginRight: 0 } // Remove o marginRight no último
            ]}
            onPress={() => alert(item.title)}
          >
            <View style={styles.button}>
              <Ionicons name={item.icon} color="#fff" size={30} />
            </View>
            <Text style={styles.legendaButton}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const data = [
  { title: 'Acessórios', icon: 'glasses' },
  { title: 'Decoração', icon: 'flower' },
  { title: 'Gastronomia', icon: 'fast-food-outline' },
  { title: 'Moda', icon: 'shirt' },
  { title: 'Papelaria', icon: 'library' },
  { title: 'Produtos\nNaturais', icon: 'leaf' },
  { title: 'Outros', icon: 'sparkles' },
];

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
  },
  scrollContent: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  actionButton: {
    alignItems: 'center',
    marginRight: 30, // Espaço entre os botões
  },
  button: {
    marginTop: 19,
    alignItems: 'center',
    backgroundColor: '#DD9D27',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
  },
  legendaButton: {
    marginTop: 6,
    textAlign: 'center',
    color: '#5D4820',
    fontWeight: 'bold',
  },
});
