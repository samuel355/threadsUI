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
  TouchableOpacity,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
const logo = '../assets/icons/threads-app-icon.png'
const addIcon = '../assets/icons/add.png'
const menuIcon = '../assets/icons/menu.png'

const likeIcon = '../assets/icons/like.png'
const commentIcon = '../assets/icons/comment.png'
const retweetIcon = '../assets/icons/retweet.png'
const sendIcon = '../assets/icons/send.png'

const DATA = [
  {name: 'Marissa Castillo', handle: 'sobal_official', time: '16m', content: 'Behind the scenes, people are dating our thread WIVES. Chairman wo last warning nie hmm.', likes: 12, replies: 3, profileImage : 'profile.jpg'},
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
        <View
          style={[
            styles.scene,
            {
              backgroundColor: 'white',
              marginLeft: 12,
              marginTop: 12,
              borderBottomWidth: 0.5,
              borderBlockColor: '#eee',
            },
          ]}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{position: 'relative'}}>
              <TouchableOpacity>
                <Image
                  style={styles.profileImage}
                  source={require(`../assets/profile.jpg`)}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.addIcon} source={require(addIcon)} />
              </TouchableOpacity>
            </View>

            <View style={{display: 'flex', flexDirection: 'column'}}>
              <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.handle}>
                  <Text>{item.handle}</Text>
                </TouchableOpacity>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1,
                    marginRight: 10,
                  }}>
                  <Text style={styles.time}>{item.time}</Text>
                  <TouchableOpacity style={styles.menuDots}>
                    <Image
                      style={{width: 20, height: 20, objectFit: 'contain'}}
                      source={require(menuIcon)}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.postContainer}>
                <Text style={{lineHeight: 24}}>{item.content}</Text>
              </TouchableOpacity>

              <View style={styles.iconsContainer}>
                <TouchableOpacity>
                  <Image style={styles.icon} source={require(likeIcon)} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icon} source={require(commentIcon)} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icon} source={require(retweetIcon)} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icon} source={require(sendIcon)} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
      <View
        style={[
          styles.scene,
          {backgroundColor: 'white', marginHorizontal: 12, marginTop: 12},
        ]}>
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
            source={require(logo)}
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
  profileImage: {
    width: 45,
    height: 45,
    objectFit: 'contain',
    borderRadius: 200,
  },
  addIcon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    left: 30,
    bottom: -3,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  handle: {
    fontWeight: '600',
    fontSize: 14,
  },
  time: {
    marginRight: 10,
    color: 'gray',
    textAlign: 'right',
  },
  contentContainer: {
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  postContainer: {
    marginLeft: 15,
    marginTop: 10,
  },
  post: {
    paddingRight: 12,
  },
  menuDots: {
    
  },
  icon: {
    width: 22,
    height: 22,
    objectFit: 'container',
    marginLeft: 15,
    marginTop: 15,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
});

export default Home;
