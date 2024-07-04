// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', title: 'Office Wear', image: require('../assets/dress1.png'), price: 120 },
  { id: '2', title: 'Black Reversible Angora Cardigan', image: require('../assets/dress2.png'), price: 120 },
  { id: '3', title: 'Church Wear', image: require('../assets/dress3.png'), price: 120 },
  { id: '4', title: 'Lamerei', image: require('../assets/dress4.png'), price: 120 },
  { id: '5', title: '2WVN', image: require('../assets/dress5.png'), price: 120 },
  { id: '6', title: 'Logo', image: require('../assets/dress6.png'), price: 120 },
  { id: '7', title: 'Iree', image: require('../assets/dress7.png'), price: 120 },
];

export default function HomeScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Image source={require('../assets/add_circle.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  product: { marginBottom: 20 },
  image: { width: 100, height: 100 },
  icon: { width: 30, height: 30 },
});
