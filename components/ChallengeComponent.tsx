import { StyleSheet, View } from 'react-native';
import {
  RowContainer,
  ColContainer,
  Heading,
  SubHeadingItalic,
} from '../components/Common';
import Colors from '../theme/Colors';

interface ChallengeProps {
  name: string;
}

export default function Challenge({ name }: ChallengeProps) {
  return (
    <View style={styles.challenge}>
      <RowContainer>
        <ColContainer>
          <Heading style={styles.challengeHeading}>{name}</Heading>
          <SubHeadingItalic>9 members</SubHeadingItalic>
          <SubHeadingItalic style={styles.redText}>
            Last update: 2:32 pm
          </SubHeadingItalic>
        </ColContainer>
      </RowContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  challenge: {
    width: '100%',
    height: 90,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.malamute,
    borderRadius: 18,
    borderWidth: 3.3,
    borderColor: Colors.goldendoodle,
  },
  challengeHeading: {
    fontSize: 16,
  },
  redText: {
    color: Colors.clifford,
  },
});
