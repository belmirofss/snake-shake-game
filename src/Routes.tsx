import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";
import { GameOver } from "./screens/GameOver";
import { THEME } from "./theme";

const StackNavigator = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: THEME.COLORS.WHITE,
            padding: 24,
          },
          headerShown: false,
        }}
        initialRouteName="HomePage"
      >
        <StackNavigator.Screen name="Home" component={Home} />

        <StackNavigator.Screen name="Game" component={Game} />

        <StackNavigator.Screen name="GameOver" component={GameOver} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
