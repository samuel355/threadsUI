import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './Home';

type Props = {
  navigation: any;
};
const Create = ({navigation}: Props) => {

  const renderBackdrop = useCallback(
    (props_: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props_}
        pressBehavior="close"
        opacity={0.5}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = ['95%'];

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleNavigation = () =>{
    navigation.navigate('Home')
  }

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onClose={handleNavigation}
        backdropComponent={renderBackdrop}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <TouchableOpacity onPress={handleNavigation}>
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Create;
