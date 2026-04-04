import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Screens/Login/Login';
import SingIn from './src/Screens/SingIn/SingIn';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SingIn" component={SingIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}