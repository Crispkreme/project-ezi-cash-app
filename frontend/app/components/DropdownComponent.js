import React, { useState } from 'react';
  import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { __gstyles__ } from '../globalStylesheet';

  

  const DropdownComponent = ({data, placeholder ,setState}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
      <TouchableOpacity className='rounded-md' style={[styles.container, __gstyles__.shadow]}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          className='rounded-md'
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? placeholder : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            setState(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : '#6b7280'}
              name="Safety"
              size={20}
            />
          )}
        />
      </TouchableOpacity>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    dropdown: {
      height: 50,
      borderColor: '#9ca3af',
      borderWidth: 0.5,
      borderRadius: 6,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 14,
      lineHeight: 20,
      color: '#6b7280'
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
