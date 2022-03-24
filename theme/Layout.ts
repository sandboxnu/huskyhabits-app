import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const window = { width, height }

const isSmallDevice = width < 375;

export default {
  window,
  isSmallDevice
};
