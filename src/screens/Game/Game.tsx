import { useState } from "react";
import { View } from "react-native";
import { Board } from "./Board";
import { Score } from "../../components/Score";

export const Game = () => {
  const [score, setScore] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Board onScoreChanges={(score) => setScore(score)} />
      <Score score={score} />
    </View>
  );
};
