
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({ navigation }) {

    const [answer, setAnswer]=useState('');  
    const [operand1, setOperand1]=useState('');
    const [operand2, setOperand2]=useState('');   

    const calculate = operator => {
      console.log(operand1, operand2, operator); 
      const [number1, number2] = [Number(operand1), Number(operand2)]; 

      switch (operator) {
      case '+': 
        setAnswer(number1 + number2); 
        break; 
      case '-':
        setAnswer(number1 - number2); 
        break; 
      }


      setOperand1('');
      setOperand2('');

    }



  return (
    <View style={styles.container}>
      <Text>Result: {answer}</Text>
      <TextInput style={styles.textinput}
        onChangeText={text => setOperand1(text)}
        value={operand1}
        keyboardType="numeric"
        />
      <TextInput style={styles.textinput}
        onChangeText={text => setOperand2(text)}
        value={operand2}
        keyboardType="numeric"
       />

    <View style={styles.button}>
      <Button onPress={() => calculate('+')} title="+" />
      <Button onPress={() => calculate('-')} title="-" />
      <Button
        title="History"
        onPress={() => navigation.navigate('History', {operand1: setOperand1,
          operand2: setOperand2,
          operator: operator, 
          answer: setAnswer,
        })
      }
      />
    </View>
    </View>
  );
}

function SettingsScreen({route, navigation }) {

  const  { operand1, operand2, operator, answer }=route.params; 

  const [data, setData]=useState([]);

  const text = `${operand1} ${operator} ${operand2} = ${answer}`; 
      setData([...data, { key: text }]); 

  return (
    <View style={styles.container}>
      <Text>History:</Text>
      <FlatList
            data={data}
            renderItem={({ item }) =>
            <Text>{item.key}</Text>
          }
        />

    </View>
  );
}

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculate" component={HomeScreen} />
        <Stack.Screen name="History" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {  
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
  },
  textinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }, 


});

export default App;