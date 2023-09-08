import { ToastAndroid } from "react-native";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";
import { AD_UNIT_ID } from "../constants";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : AD_UNIT_ID;

export const useAd = () => {
  const { isLoaded, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  return {
    showAd: () => {
      ToastAndroid.showWithGravity(
        "Showing ad. Ad helps us to mantain the app.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      show();
    },
    isLoaded,
    loadAd: load,
  };
};
