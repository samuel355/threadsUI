import React, {useState, useRef} from 'react';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Animated,
  Text,
  Image,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

const DATA = [
  {name: 'Marissa Castillo'},
  {name: 'Denzel Curry'},
  {name: 'Miles Ferguson'},
  {name: 'Kenny Moreno'},
  {name: 'Shelby Craig'},
  {name: 'Jordyn Brewer'},
  {name: 'Tanya Walker'},
  {name: 'Nolan Figueroa'},
  {name: 'Sophia Gibbs'},
  {name: 'Vincent Sandoval'},
];
const HEADER_HEIGHT = 40;
const TAB_BAR_HEIGHT = 40;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = ({
  position,
  syncOffset,
  firstRef,
  onMomentumScrollBegin,
}: any) => {
  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      ref={firstRef}
      scrollEventThrottle={1}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: position}}}],
        {useNativeDriver: true},
      )}
      onMomentumScrollEnd={e => {
        syncOffset('foryou', e.nativeEvent.contentOffset.y);
      }}
      data={DATA}
      keyExtractor={(item, i) => String(i)}
      renderItem={({item}) => (
        <View style={[styles.scene, {backgroundColor: 'white'}]}>
          <Text>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={{paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT}}
    />
  );
};

const SecondRoute = ({
  position,
  syncOffset,
  secondRef,
  onMomentumScrollBegin,
}: any) => (
  <Animated.FlatList
    showsVerticalScrollIndicator={false}
    ref={secondRef}
    scrollEventThrottle={1}
    onMomentumScrollBegin={onMomentumScrollBegin}
    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: position}}}], {
      useNativeDriver: true,
    })}
    onMomentumScrollEnd={e => {
      syncOffset('following', e.nativeEvent.contentOffset.y);
    }}
    data={DATA}
    keyExtractor={(item, i) => String(i)}
    renderItem={({item}) => (
      <View style={[styles.scene, {backgroundColor: 'white'}]}>
        <Text>{item.name}</Text>
      </View>
    )}
    contentContainerStyle={{paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT}}
  />
);

const Home = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'foryou', title: 'For You'},
    {key: 'following', title: 'Following'},
  ]);

  const position: any = useRef(new Animated.Value(0)).current;
  const isValidTabPress: any = useRef(false);

  const firstRef: any = useRef();
  const secondRef: any = useRef();

  const onMomentumScrollBegin = () => {
    isValidTabPress.current = true;
  };

  const syncOffset = (scene: any, y: any) => {
    console.log(scene, y);
    if (scene === 'foryou') {
      secondRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    if (scene === 'following') {
      firstRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    isValidTabPress.current = false;
  };

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'foryou':
        return (
          <FirstRoute
            position={position}
            syncOffset={syncOffset}
            firstRef={firstRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      case 'following':
        return (
          <SecondRoute
            position={position}
            syncOffset={syncOffset}
            secondRef={secondRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      default:
        return null;
    }
  };

  function renderTabBar(props: any) {
    const translateY = position.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[
          {position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1},
          {
            transform: [{translateY}],
          },
        ]}>
        <View
          style={{
            height: HEADER_HEIGHT,
            backgroundColor: 'white',
          }}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://freelogopng.com/images/all_img/1688663318threads-logo-white.png',
            }}
          />
        </View>

        <TabBar
          {...props}
          style={{height: TAB_BAR_HEIGHT}}
          activeColor="black"
          inactiveColor="grey"
          labelStyle={{textTransform: 'none'}}
          indicatorContainerStyle={{backgroundColor: 'white'}}
          indicatorStyle={{backgroundColor: 'black', height: 1}}
          onTabPress={({route, preventDefault}) => {
            if (isValidTabPress.current) {
              preventDefault();
            }
          }}
        />
      </Animated.View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={{position: 'absolute', top: 0, backgroundColor: 'white', width: '100%', height: '100%', flex: 1}}>

        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    height: 150,
  },
  logo: {
    width: 40,
    height: 40,
    objectFit: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default Home;
