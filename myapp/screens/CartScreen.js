// screens/CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      let items = await AsyncStorage.getItem('cart');
      items = items ? JSON.parse(items) : [];
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  const removeFromCart = async (productId) => {
    let items = cartItems.filter(item => item.id !== productId);
    await AsyncStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Image source={require('../assets/remove.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>Total: ${cartItems.reduce((acc, item) => acc + item.price, 0)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  product: { marginBottom: 20 },
  image: { width: 100, height: 100 },
  icon: { width: 30, height: 30 },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }
});
