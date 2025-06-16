import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


// Header
export function Header({ children }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

// Title
export function Title({ text, marginTop = '15%' }) {
    return (
        <Text style={[styles.title, { marginTop: marginTop }]}>
            {text}
        </Text>
    );
}

// Banner
export function Banner() {
    return (
        <Image
            source={require('../../assets/images/banner-feira.jpg')}
            style={styles.banner}
        />
    );
}

// Item do Slider
export function SliderItem({ item }) {
    const navigation = useNavigation();

    function handlePress() {
        navigation.navigate('Loja', { id: item.id });
    }

    return (
        <View style={styles.sliderItem}>
            <TouchableOpacity 
                style={styles.itemContainer} 
                activeOpacity={0.7} 
                onPress={handlePress}
            >
                <Image
                    source={item.imagemPerfil}
                    style={styles.lojaImage}
                />
            </TouchableOpacity>
            <Text style={styles.itemText}>{item.nome}</Text>
        </View>
    );
}


// Slider (FlatList)
export function SliderLojas({ data }) {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <SliderItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}    
        />
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DD9D27',
        width: '100%',
        height: 190
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#5D4820',
        marginTop: '15%',
        paddingLeft: '5%'
    },
    banner: {
        width: 385,
        height: 220,
        borderRadius: 12,
        marginTop: '3%',
        marginStart: '3.3%'
    },

    sliderItem: {
    alignItems: 'center',
    marginRight: 20, // Espaço entre os itens
},

itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
},

lojaImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
},

itemText: {
    marginTop: 8,
    fontSize: 16,
    color: '#5D4820',
    textAlign: 'center',
    fontWeight: '600'
},



});
