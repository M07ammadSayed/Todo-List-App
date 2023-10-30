import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, Button, navigation } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Task from './apps/common/Task';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Login({ navigation }) {
  return (
    <View style={styles.registerContainer}>
      <Button
        title={"Enter as a guest"}
        onPress={() => navigation.navigate("Home")}
      />
      <TextInput placeholder={'Username'} style={styles.registerInput} />
      <TextInput placeholder={'Password'} style={styles.registerInput} secureTextEntry={true} autoCapitalize='none' />
      <View style={styles.registerButton}>
        <Button style={styles.registerButton} title='Login' />
      </View>
      <Text style={styles.createAccount} onPress={() => navigation.navigate("Register")}>Do you have account?</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function Register({ navigation }) {
  return (
    <View style={styles.registerContainer}>
      <Button
        title={"Enter as a guest"}
        onPress={() => navigation.navigate("Home")}
      />
      <TextInput placeholder={'Username'} style={styles.registerInput} />
      <TextInput placeholder={'Email'} style={styles.registerInput} autoCapitalize='none'  />
      <TextInput placeholder={'Password'} style={styles.registerInput} secureTextEntry={true} autoCapitalize='none' />
      <View style={styles.registerButton}>
        <Button title='Register' />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <Button title={"Register / Login"}
        onPress={() => navigation.navigate("Login")}
      />
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <Text style={styles.sectionTitle}></Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  createAccount: {
    color: '#000',
    fontSize: 18,
    marginTop: 20,
  },
  registerContainer: {
    flex: 1,
    backgroundColor: '#E8EAED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerInput: {
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    width: '55%',
    backgroundColor: '#E8EAED',
    margin: 15,
  },
  registerButton: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#55BCF6',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#55BCF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    borderColor: 'transparent',
    borderWidth: 0,
  },
  addText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});