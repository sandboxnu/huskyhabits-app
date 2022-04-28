import { KeyboardAwareScrollView as DefaultScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import Colors from '../theme/Colors';
import Text from '../theme/Text';

export const Heading = styled.Text`
  fontsize: ${Text.size.heading};
  fontfamily: ${Text.font.heading};
  fontweight: bold;
`;

export const Body = styled.Text`
  fontfamily: ${Text.font.body};
`;

export const ProfileBody = styled.Text`
  fontsize: ${Text.size.body};
  fontfamily: ${Text.font.bodyBold};
`;

export const TitleText = styled.Text`
  fontfamily: ${Text.font.bodyBold};
  fontsize: ${Text.size.heading};
`;

export const SmallTextInput = styled.TextInput`
  height: 40px;
  borderradius: 8px;
  margin: 5px;
  elevation: 2;
  padding: 10px;
  background: #ffffff;
  boxshadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
`;

export const LargeTextInput = styled.TextInput`
  height: 100px;
  borderradius: 8px;
  margin: 5px;
  padding: 10px;
  background: #ffffff;
  boxshadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
  textalignvertical: top;
`;

export const InputTextLabel = styled.Text`
  fontfamily: ${Text.font.body};
  maxwidth: 90%;
  fontsize: ${Text.size.body};
  marginright: 10px;
  padding: 0;
`;

export const RequiredLabel = styled.Text`
  color: ${Colors.clifford};
`;

export const FormContainer = styled.View`
  margin: 10px;
  alignitems: center;
  backgroundcolor: transparent;
`;

export const InputContainer = styled.View`
  flexdirection: column;
  width: 95%;
  margin: 5px;
  backgroundcolor: transparent;
`;

export const CenterText = styled.Text`
  textalign: center;
`;

export const Container = styled.View`
  padding: 10px;
  width: 100%;
`;

export const CenteredContainer = styled.View`
  alignitems: center;
  justifycontent: center;
  padding: 10px;
  width: 100%;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const RowContainer = styled.View`
  flexdirection: row;
  alignitems: center;
`;

export const CenteredRowContainer = styled.View`
  alignitems: center;
  justifycontent: center;
  flexdirection: row;
`;

export const CenteredColContainer = styled.View`
  flexdirection: column;
  alignitems: center;
  justifycontent: center;
`;

export const ColContainer = styled.View`
  flexdirection: column;
`;

export const LeftAlign = styled.View`
  flexdirection: row;
  justifycontent: flex-start;
`;

export const SubHeadingItalic = styled.Text`
  fontfamily: ${Text.font.subHeadingItalic};
  fontsize: 14px;
  marginbottom: 10px;
  color: ${Colors.huskyYellow};
`;

export const ColumnContainer = styled.View`
  flexdirection: column;
  alignitems: center;
`;

export const PrimaryButton = styled.TouchableOpacity`
  display: flex;
  flexdirection: row;
  alignitems: flex-start;
  padding: 12px 16px;
  backgroundcolor: ${Colors.clifford};
  borderradius: 8px;
`;

export const SecondaryButton = styled.TouchableOpacity`
  display: flex;
  flexdirection: row;
  alignitems: flex-start;
  padding: 12px 16px;
  bordercolor: ${Colors.clifford};
  borderwidth: 2px;
  backgroundcolor: ${Colors.malamute};
  borderradius: 8px;
`;

export const ButtonText = styled.Text`
  margin: auto;
  fontsize: ${Text.size.body};
`;
