import { TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../theme/Colors";
import { Heading } from "./Common";

interface NotebookTabProps {
  title: string;
  setCurrentTab: (title: string) => void;
  currentTab: string;
}

export default function NotebookTab({ title, setCurrentTab, currentTab }: NotebookTabProps) {
  return (
    <TouchableOpacity
      onPress={() => setCurrentTab(title)}
      style={[styles.tab, currentTab === title && styles.tabSelected]}>
      <Heading style={styles.tabText}>{title}</Heading>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabText: {
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
  },
  tab: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    paddingTop: 8,
    width: 95,
    height: 33,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.25,
    // shadowRadius: 2,
  },
  tabSelected: {
    borderBottomColor: Colors.clifford,
    borderBottomWidth: 3,
  },
});