import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDo from './views/todo.jsx';
import Profile from './views/profile.jsx';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Button
        title="To-Do List"
        onPress={() => navigation.navigate('To-Do')}
      />
      
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
const options = { headerShown: false };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={options}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="To-Do" component={ToDo} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
