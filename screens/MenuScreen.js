import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { menu, sizes } from "../data/menuData";
import { COLORS } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
export default function MenuScreen({ navigation }) {

  const backgroundImage = require("../assets/images/pizza.png");

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <Text style={styles.title}>Menú 🍕</Text>

        <ScrollView>

          {menu.map((pizza) => (

            <View key={pizza.id} style={styles.card}>

              <Image source={pizza.image} style={styles.image} />

              <View style={styles.info}>

                <Text style={styles.pizzaName}>{pizza.name}</Text>

                {sizes.map((size) => {

                  const price = Math.round(
                    pizza.basePrice * size.multiplier
                  );

                  return (
                    <View key={size.name} style={styles.priceRow}>
                      <Text style={styles.size}>{size.name}</Text>
                      <Text style={styles.price}>${price}</Text>
                    </View>
                  );

                })}

              </View>

            </View>

          ))}

        </ScrollView>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "rgba(11,69,77,0.6)",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  pizzaName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  size: {
    color: COLORS.white,
    fontSize: 14,
  },

  price: {
    color: COLORS.warning,
    fontWeight: "bold",
  },

  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    gap: 6,
  },

  backText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },

});