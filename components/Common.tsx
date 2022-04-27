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

export const ProfileBody = styled.Text`
  fontSize: ${Text.size.body};
  fontFamily: ${Text.font.bodyBold};
`;

export const TitleText = styled.Text`
  fontFamily: ${Text.font.bodyBold};
  fontSize: ${Text.size.heading};
`;

export const SmallTextInput = styled.TextInput`
  height: 40px;
  maxWidth: 100%;
  borderRadius: 8px;
  padding: 10px;
  background: #ffffff;
  boxShadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;

export const LargeTextInput = styled.TextInput`
  height: 100px;
  maxWidth: 100%;
  borderRadius: 8px;
  padding: 10px;
  background: #ffffff;
  boxShadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;

export const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  borderRadius: 50px;
  boxShadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  background: #ffffff;
`;

export const CenteredContainer = styled.View`
  alignItems: center;
  justifyContent: center;
  padding: 10px;
  width: 100%;
`;

export const Container = styled.View`
  padding: 10px;
  width: 100%;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const InputTextLabel = styled.Text`
  fontFamily: ${Text.font.body};
  fontSize: ${Text.size.body};
  width: auto;
  maxWidth: 90%;
  marginBottom: 5px;
  padding: 0;
`;

export const RequiredLabel = styled.Text`
  color: ${Colors.clifford};
`;

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

export const CenterText = styled.Text`
  textAlign: center;
`;

export const RowContainer = styled.View`
  flexDirection: row;
  alignItems: center;
`;

export const CenteredRowContainer = styled.View`
  alignItems: center;
  justifyContent: center;
  flexDirection: row;
`;

export const CenteredColContainer = styled.View`
  flexDirection: column;
  alignItems: center;
  justifyContent: center;
`;

export const ColContainer = styled.View`
  flexDirection: column;
`;

export const LeftAlign = styled.View`
  flexDirection: row;
  justifyContent: flex-start;
`;

export const SubHeadingItalic = styled.Text`
  fontFamily: ${Text.font.subHeadingItalic};
  fontSize: 14px;
  marginBottom: 10px;
  color: ${Colors.huskyYellow};
`;
export const ColumnContainer = styled.View`
  flexDirection: column;
  alignItems: center;
`;

export const PrimaryButton = styled.TouchableOpacity`
  display: flex;
  flexDirection: row;
  alignItems: flex-start;
  padding: 12px 16px;
  backgroundColor: ${Colors.clifford};
  borderRadius: 8px;
`;

export const SecondaryButton = styled.TouchableOpacity`
  display: flex;
  flexDirection: row;
  alignItems: flex-start;
  padding: 12px 16px;
  borderColor: ${Colors.clifford};
  borderWidth: 2px;
  backgroundColor: ${Colors.malamute};
  borderRadius: 8px;
`;

export const ButtonText = styled.Text`
  margin: auto;
  fontSize: ${Text.size.body};
`;
