import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import useDataCollection from '../hooks/useDataCollection';

// @param: {void} - No parameters.
// @description: Defines the props interface for the DataCollectionToggle component.
// @returns: {void} - No return value.
// @updates: Provides TypeScript interface for component props.
interface DataCollectionToggleProps {
  showStatus?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'text';
}

// @param: {DataCollectionToggleProps} props - Component configuration options.
// @description: Renders a toggle button for data collection with visual feedback.
// @returns: {JSX.Element} - A toggle button component with status indicator.
// @updates: Displays current data collection state and allows user to toggle it.
const DataCollectionToggle: React.FC<DataCollectionToggleProps> = ({
  showStatus = true,
  size = 'medium',
  variant = 'contained',
}) => {
  const { isEnabled, isCollecting, lastCollectionTime, toggleCollection } = useDataCollection();

  // @param: {void} - No parameters.
  // @description: Determines the button color based on collection state.
  // @returns: {string} - The appropriate color for the current state.
  // @updates: Provides visual feedback for the current collection status.
  const getButtonColor = (): string => {
    return isEnabled ? '#4CAF50' : '#F44336';
  };

  // @param: {void} - No parameters.
  // @description: Determines the button text based on collection state.
  // @returns: {string} - The appropriate text for the current state.
  // @updates: Provides clear indication of the current collection status.
  const getButtonText = (): string => {
    return isEnabled ? 'ON' : 'OFF';
  };

  // @param: {void} - No parameters.
  // @description: Determines the status text based on collection state.
  // @returns: {string} - The appropriate status message.
  // @updates: Provides detailed status information to the user.
  const getStatusText = (): string => {
    if (isEnabled) {
      if (isCollecting) {
        return lastCollectionTime 
          ? `Active since ${new Date(lastCollectionTime).toLocaleTimeString()}`
          : 'Data collection is active';
      }
      return 'Starting data collection...';
    }
    return 'Data collection is disabled';
  };

  // @param: {void} - No parameters.
  // @description: Handles the toggle button press event.
  // @returns: {void} - No return value.
  // @updates: Toggles the data collection state in the store.
  const handleToggle = async (): Promise<void> => {
    await toggleCollection();
  };

  // @param: {void} - No parameters.
  // @description: Determines the button text size based on size prop.
  // @returns: {number} - The appropriate font size for the button.
  // @updates: Provides responsive button sizing.
  const getButtonTextSize = (): number => {
    switch (size) {
      case 'large':
        return 18;
      case 'small':
        return 12;
      default:
        return 16;
    }
  };

  // @param: {void} - No parameters.
  // @description: Determines the status text color based on collection state.
  // @returns: {string} - The appropriate color for the status text.
  // @updates: Provides visual feedback for the status text.
  const getStatusTextColor = (): string => {
    return isEnabled ? '#4CAF50' : '#F44336';
  };

  return (
    <View style={styles.container}>
      <Button
        mode={variant}
        onPress={handleToggle}
        buttonColor={getButtonColor()}
        textColor="white"
        style={[
          styles.toggleButton,
          { borderColor: getButtonColor() }
        ]}
        labelStyle={[
          styles.buttonText,
          { fontSize: getButtonTextSize() }
        ]}
        disabled={isCollecting && !isEnabled}
      >
        {getButtonText()}
      </Button>
      
      {showStatus && (
        <Text 
          variant="bodySmall" 
          style={[
            styles.statusText,
            { color: getStatusTextColor() }
          ]}
        >
          {getStatusText()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButton: {
    borderRadius: 8,
    borderWidth: 2,
    minWidth: 80,
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statusText: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
  },
});

export default DataCollectionToggle; 