import { KeyboardAwareScrollView as DefaultScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import Colors from '../theme/Colors';
import Text from '../theme/Text';

export const Heading = styled.Text`
  fontSize: ${Text.size.heading};
  fontFamily: ${Text.font.heading};
  fontWeight: bold;
`;

export const Body = styled.Text`
  fontFamily: ${Text.font.body};
`;

export const SmallTextInput = styled.TextInput`
  height: 40px;
  maxWidth: 100%;
  borderRadius: 8px;
  padding: 10px;
  background: #FFFFFF;
  boxShadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;

export const LargeTextInput = styled.TextInput`
  height: 100px;
  maxWidth: 100%;
  borderRadius: 8px;
  padding: 10px;
  background: #FFFFFF;
  boxShadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;

export const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  borderRadius: 50px;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  background: #FFFFFF;
`;

export const Container = styled.View`
  alignItems: center;
  justifyContent: center;
  padding: 10px;
  width: 100%;
`;

export const InputTextLabel = styled.Text`
  fontFamily: ${Text.font.body};
  width: 100px;
  fontSize: ${Text.size.body};
  padding: 0;
`

export const FormContainer = styled.View`
  margin: 10px;
  paddingVertical: 20px;
  alignItems: center;
  backgroundColor: transparent;
`;

export const InputContainer = styled.View`
  flexDirection: column;
  width: 95%;
  margin: 5px;
  backgroundColor: transparent;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const CenterText = styled.Text`
  textAlign: center;
`;

export const RowContainer = styled.View`
  flexDirection: row;
  alignItems: center;
`;

export const ColumnContainer = styled.View`
  flexDirection: column;
  alignItems: center;
`;

export const PrimaryButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  backgroundColor: ${Colors.clifford};
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  margin: auto;
  fontSize: ${Text.size.body};
`;