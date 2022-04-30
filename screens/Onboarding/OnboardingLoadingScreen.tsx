import { View, StyleSheet } from 'react-native';
import { Body } from '../../components/Common';
import Colors from '../../theme/Colors';
import * as Progress from 'react-native-progress';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Onboarding loading screen that displays circular progress bar
const OnboardingLoadingScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 0.1, 1));
    }, 1000);
    setIntervalId(interval);
  }, []);

  useEffect(() => {
    if (progress === 1 && intervalId) {
      clearInterval(intervalId);
      navigation.navigate('Profile');
    }
  }, [progress]);

  return (
    <View style={styles.progressBar}>
      <Progress.Circle
        progress={progress}
        size={100}
        thickness={10}
        showsText
        textStyle={styles.progressText}
        strokeCap={'round'}
        unfilledColor={Colors.mastiff}
        color={Colors.clifford}
        borderWidth={0}
      />
      <Body style={styles.introText}>Creating your profile...</Body>
    </View>
  );
};

const styles = StyleSheet.create({
  introText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 37,
    width: '60%',
    marginVertical: 20,
  },
  progressBar: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontFamily: 'BeVietnam',
    fontSize: 22,
    color: Colors.pug,
    textAlign: 'center',
  },
});

export default OnboardingLoadingScreen;
