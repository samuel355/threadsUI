import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import RootNavigator from './src/navigation';

const App = () => {
  return (
    <BottomSheetModalProvider>
      <RootNavigator />
    </BottomSheetModalProvider>
  );
};

export default App;
