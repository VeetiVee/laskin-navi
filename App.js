import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Calculator({ navigation }) {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [total, setTotal] = useState("");
  const [data, setData] = useState([]);

  const plus = () => {
    const calc = number1 + number2;
    setTotal(calc);
    setNumber1("");
    setNumber2("");
    const entry = number1 + "+" + number2 + "=" + calc;
    setData([...data, { key: entry }]);
  };

  const minus = () => {
    const calc = number1 - number2;
    setTotal(calc);
    setNumber1("");
    setNumber2("");
    const entry = number1 + "-" + number2 + "=" + calc;
    setData([...data, { key: entry }]);
  };

  return (
    <View style={styles.container}>
      <Text>Result: {total} </Text>
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        keyboardType={"number-pad"}
        onChangeText={(text) => setNumber1(parseInt(text))}
        value={number1}
      />
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        keyboardType={"number-pad"}
        onChangeText={(text) => setNumber2(parseInt(text))}
        value={number2}
      />
      <View style={{ flexDirection: "row" }}>
        <Button onPress={plus} title="+" />
        <Button onPress={minus} title="-" />
        <Button onPress={() => navigation.navigate('History', {data: data})} title="History" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function History({ route, navigation}) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text>History</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

