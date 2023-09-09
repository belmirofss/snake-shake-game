import { ToastAndroid } from "react-native";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";
import { AD_UNIT_ID } from "../constants";
import { useEffect, useState } from "react";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : AD_UNIT_ID;

export const useAd = () => {
  const [canShow, setCanShow] = useState(false)
  const { isLoaded, load, show, error } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (canShow && isLoaded) {
      showAd()
    }
  }, [canShow, isLoaded])

  const showAd = () => {
    ToastAndroid.showWithGravity(
      "Showing ad. Ad helps us to mantain the app.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    show();
  }

  return {
    showAd: () => setCanShow(true),
  };
};
