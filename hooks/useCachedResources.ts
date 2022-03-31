import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'Balsamiq-Sans': require('../assets/fonts/BalsamiqSans-Regular.ttf'),
          'BeVietnam-Bold': require('../assets/fonts/BeVietnam-Bold.ttf'),
          'BeVietnam': require('../assets/fonts/BeVietnam-Regular.ttf'),
          'BeVietnam-Bold': require('../assets/fonts/BeVietnam-Bold.ttf'),
          'ABeeZee': require('../assets/fonts/ABeeZee-Regular.ttf'),
          'ABeeZee-Italic': require('../assets/fonts/ABeeZee-Italic.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
