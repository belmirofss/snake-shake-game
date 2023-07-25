import { useState } from "react";
import { View } from "react-native";
import { Board } from "./Board";
import { Score } from "../../components/Score";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar } from "./ProgressBar";
import { BETA_LIMIT } from "../../constants";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [beta, setBeta] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Score score={score} />
      </View>

      <Board
        onScoreChanges={(score) => setScore(score)}
        onBetaChanges={(beta) => setBeta(beta)}
      />

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Ionicons name="ios-arrow-forward" size={48} color="black" />
          <ProgressBar progress={beta > 0 ? beta / BETA_LIMIT : 0} />
        </View>

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Ionicons name="ios-arrow-back-outline" size={48} color="black" />
          <ProgressBar progress={beta < 0 ? beta / -BETA_LIMIT : 0} />
        </View>
      </View>
    </View>
  );
};
