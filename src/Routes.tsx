import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./screens/Home";
import GamePage from "./screens/Game";
import GameOverPage from "./screens/GameOver";

export default function Routes() {
  const StackNavigator = createStackNavigator();

  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#fff",
            padding: 24,
          },
          headerShown: false,
        }}
        initialRouteName="HomePage"
      >
        <StackNavigator.Screen name="HomePage" component={HomePage} />

        <StackNavigator.Screen name="GamePage" component={GamePage} />

        <StackNavigator.Screen name="GameOverPage" component={GameOverPage} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
