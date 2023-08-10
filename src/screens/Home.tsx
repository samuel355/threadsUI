import React, {useState, useRef} from 'react';
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
  Pressable,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {TabView, TabBar} from 'react-native-tab-view';
const logo = '../assets/icons/threads-app-icon.png';
const addIcon = '../assets/icons/add.png';
const menuIcon = '../assets/icons/menu.png';

const likeIcon = '../assets/icons/like.png';
const likedIcon = '../assets/icons/liked.png';
const commentIcon = '../assets/icons/comment.png';
const retweetIcon = '../assets/icons/retweet.png';
const sendIcon = '../assets/icons/send.png';

const DATA = [
  {
    id: 1,
    name: 'Marissa Castillo',
    handle: 'sobal_official',
    time: '16m',
    content:
      'Behind the scenes, people are dating our thread WIVES. Chairman wo last warning nie hmm.',
    likes: 12,
    liked: false,
    replies: 3,
    profileImage: 'profile.jpg',
  },
  {
    id: 2,
    name: 'Denzel Curry',
    handle: 'sobal_official',
    time: '16m',
    content:
      'Behind the scenes, people are dating our thread WIVES. Chairman wo last warning nie hmm.',
    likes: 12,
    replies: 3,
    liked: true,
    profileImage: 'profile.jpg',
  },
  {
    id: 3,
    name: 'Miles Ferguson',
    handle: 'sobal_official',
    time: '16m',
    liked: true,
    content:
      'Behind the scenes, people are dating our thread WIVES. Chairman wo last warning nie hmm.',
    likes: 12,
    replies: 3,
    profileImage: 'profile.jpg',
  },
  {
    id: 4,
    name: 'Kenny Moreno',
    handle: 'sobal_official',
    time: '16m',
    content:
      'Behind the scenes, people are dating our thread WIVES. Chairman wo last warning nie hmm.',
    likes: 12,
    replies: 3,
    liked: true,
    profileImage: 'profile.jpg',
  },
  {
    id: 5,
    name: 'Kenny Moreno',
    handle: 'sobal_official',
    time: '16m',
    content:
      'Behind the scenes, people are dating our thread WIVES. Chairman wo last warning nie hmm.',
    likes: 12,
    liked: false,
    replies: 3,
    profileImage: 'profile.jpg',
  },
  {
    id: 6,
    name: 'Kenny Moreno',
    handle: 'sobal_official',
    time: '16m',
    content:
      'Behind the scenes, people are dating our thread WIVES. Chairman wo last warning nie hmm.',
    likes: 12,
    liked: false,
    replies: 3,
    profileImage: 'profile.jpg',
  },
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
  openModal,
  toggleModal
}: any) => {
  const [likedPost, setLikedPost] = useState(false);
  const [isOpen, setOpen] = useState(false);

    const toggleSheet = () => {
      setOpen(!isOpen);
    };

  // function updateLiked(id: any) {
  //   var result = DATA.find((item) => item.id === id);
  //   if(result){
  //     if(result.liked === false){
  //       console.log(likedPost)
  //       return setLikedPost(true)
  //     }else if(result.liked === true){
  //       console.log(likedPost);
  //       return setLikedPost(false);
  //     }
  //   }
  // }

  return (
    <GestureHandlerRootView>
      <Animated.FlatList
        style={{backgroundColor: 'white'}}
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
                marginTop: 12,
                borderBottomWidth: 0.5,
                borderBlockColor: '#eee',
                alignItems: 'center',
                marginVertical: 4,
                marginLeft: 6,
              },
            ]}>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}>
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
                  <TouchableOpacity onPress={toggleSheet}>
                    <Image style={styles.icon} source={require(retweetIcon)} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleModal}>
                    <Image style={styles.icon} source={require(sendIcon)} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT}}
      />
      {isOpen && (
        <>
          <Pressable style={styles.backdrop} onPress={toggleSheet} />
          <View
            style={{
              backgroundColor: 'white',
              padding: 16,
              height: 220,
              width: '100%',
              position: 'absolute',
              bottom: -20 * 1.1,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              zIndex: 1,
              flex: 1,
            }}></View>
        </>
      )}
    </GestureHandlerRootView>
  );
};

const SecondRoute = ({
  position,
  syncOffset,
  secondRef,
  onMomentumScrollBegin,
}: any) => (
  <Animated.FlatList
    style={{backgroundColor: 'white'}}
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

  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

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
            openModal={openModal}
            toggleModal={toggleModal}
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
          <Image style={styles.logo} source={require(logo)} />
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
        <View
          style={{
            position: 'absolute',
            top: 0,
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            flex: 1,
          }}></View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
        {openModal && (
          <>
            <Pressable style={styles.backdrop} onPress={toggleModal} />
            <View
              style={{
                backgroundColor: 'white',
                padding: 16,
                height: 220,
                width: '100%',
                position: 'absolute',
                bottom: -20 * 1.1,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                zIndex: 9999,
                flex: 1,
              }}></View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    height: 135,
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
  menuDots: {},
  icon: {
    width: 22,
    height: 22,
    objectFit: 'contain',
    marginLeft: 15,
    marginTop: 15,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    paddingTop: '80%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
});

export default Home;
