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
  width: 200px;
  borderRadius: 8px;
  margin: 5px;
  padding: 10px;
  background: #FFFFFF;
  boxShadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
`;

export const LargeTextInput = styled.TextInput`
  height: 100px;
  width: 200px;
  borderRadius: 8px;
  margin: 5px;
  padding: 10px;
  background: #FFFFFF;
  boxShadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
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
  textAlign: right;
  width: 100px;
  fontSize: ${Text.size.body};
  marginRight: 10px;
  padding: 0;
`

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