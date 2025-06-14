// Tabs/styles.ts
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import useThemeStore from '../../stores/theme';


const useStyles = () => {
  const theme = useThemeStore(state => state.theme);
  const getColor = useThemeStore(state => state.getColor);
  const getSpacing = useThemeStore(state => state.getSpacing);
  const getBorderRadius = useThemeStore(state => state.getBorderRadius);
  const getFontSize = useThemeStore(state => state.getFontSize);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        scrollView: {
          flexGrow: 0,
        },
        tabBar: {
          flexDirection: 'row',
          backgroundColor: getColor('surface'),
          borderBottomWidth: 1,
          borderBottomColor: getColor('border'),
          paddingHorizontal: getSpacing(2),
        },
        tabButton: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: getSpacing(3),
          paddingHorizontal: getSpacing(4),
          marginRight: getSpacing(1),
          marginBottom: getSpacing(1),
          borderRadius: getBorderRadius('sm'),
          minWidth: 80,
          justifyContent: 'center',
        },
        activeTabButton: {
          backgroundColor: getColor('primary'),
        },
        tabLabel: {
          fontSize: getFontSize('sm'),
          fontWeight: '500',
          fontFamily: theme.fontFamily.sans[0],
          color: getColor('textSecondary'),
        },
        activeTabLabel: {
          color: getColor('white'),
        },
        tabContent: {
          flex: 1,
          backgroundColor: getColor('background'),
        },
      }),
    [
      getColor,
      getSpacing,
      getBorderRadius,
      getFontSize,
      theme.fontFamily.sans,
    ],
  );

  return {
    containerStyle: styles.container,
    scrollViewStyle: styles.scrollView,
    tabBarStyle: styles.tabBar,
    tabButtonStyle: styles.tabButton,
    activeTabButtonStyle: styles.activeTabButton,
    tabLabelStyle: styles.tabLabel,
    activeTabLabelStyle: styles.activeTabLabel,
    tabContentStyle: styles.tabContent,
  };
};

export default useStyles;
