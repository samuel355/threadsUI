import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = ['30%'];

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView style={{...styles.container}}>
      {isOpen && (
        <TouchableOpacity
          onPress={() => setIsOpen(false)}
          style={styles.backDrop}
          activeOpacity={0.8}></TouchableOpacity>
      )}
      <TouchableOpacity
        style={{marginTop: 40}}
        onPress={() => setIsOpen(!isOpen)}>
        <Text>Click here</Text>
      </TouchableOpacity>
      {isOpen ? (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      ) : (
        <></>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    zIndex: 99,
  },
  backDrop: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    backgroundColor: 'black',
    opacity: 0.6,
    right: 0,
    bottom: 0,
    top: 0,
  },

});

export default Search;
