import * as Progress from "react-native-progress";

type Props = {
  progress: number;
};

export const ProgressBar = ({ progress }: Props) => {
  return (
    <Progress.Bar
      progress={progress}
      height={18}
      borderColor="#000"
      color="#000"
      borderRadius={0}
    />
  );
};
