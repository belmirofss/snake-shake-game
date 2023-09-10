import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { BOARD_SIZE } from "../constants";

const KEY = "SnakeShakeGame@Record";

export const useScoreRecord = () => {
  const MAX_SCORE = BOARD_SIZE * BOARD_SIZE - 3;
  
  const [record, setRecord] = useState(0);

  const getRecord = async () => {
    const value = await AsyncStorage.getItem(KEY);
    return value ? Number(value) : 0;
  };

  const saveRecord = async (newRecord: number) => {
    const record = await getRecord();
    if (newRecord > record) {
      await AsyncStorage.setItem(KEY, String(newRecord));
      setRecord(newRecord);
    }
  };

  const loadRecord = async () => {
    const record = await getRecord();
    setRecord(record);
  };

  useEffect(() => {
    loadRecord();
  }, []);

  return {
    record,
    saveRecord,
    MAX_SCORE
  };
};
