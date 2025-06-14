// Tabs/index.tsx
import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import useStyles from './styles';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({tabs, defaultActiveTab, onTabChange}) => {
  const [activeTab, setActiveTab] = useState(
    defaultActiveTab || tabs[0]?.id || '',
  );

  const {
    containerStyle,
    tabBarStyle,
    tabButtonStyle,
    activeTabButtonStyle,
    tabLabelStyle,
    activeTabLabelStyle,
    tabContentStyle,
    scrollViewStyle,
  } = useStyles();

  const handleTabPress = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    },
    [onTabChange],
  );

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <View style={containerStyle}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={scrollViewStyle}
        contentContainerStyle={tabBarStyle}>
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[tabButtonStyle, isActive && activeTabButtonStyle]}
              onPress={() => handleTabPress(tab.id)}
              activeOpacity={0.7}>
              {tab.icon && (
                <Text style={[tabLabelStyle, isActive && activeTabLabelStyle]}>
                  {tab.icon}
                </Text>
              )}
              <Text style={[tabLabelStyle, isActive && activeTabLabelStyle]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={tabContentStyle}>{activeTabContent}</View>
    </View>
  );
};

export default Tabs;
