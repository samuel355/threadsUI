import React, {useCallback, useState, useRef} from 'react';
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
  Alert,
  TextInput,
} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

type Props = {
  navigation: any;
};

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
  navigation,
  isCommentModalOpen,
  setIsCommentModalOpen,
  retweetModalOpen,
  setRetweetModalOpen,
  sendModalOpen,
  setSendModalOpen,
  menuOpen,
  setMenuOpen,
}: any) => {
  const [likedPost, setLikedPost] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const addFriend = () =>
    Alert.alert('Add sobal_official', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Follow',
        onPress: () => console.log('OK Pressed'),
        style: 'default',
      },
    ]);

  return (
    <>
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
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 10,
              }}>
              <View style={{position: 'relative'}}>
                <TouchableOpacity>
                  <Image
                    style={styles.profileImage}
                    source={require(`../assets/profile.jpg`)}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={addFriend}>
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
                    }}>
                    <Text style={styles.time}>{item.time}</Text>
                    <TouchableOpacity
                      style={styles.menuDots}
                      onPress={() => setMenuOpen(!menuOpen)}>
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
                  <TouchableOpacity
                    onPress={() => setIsCommentModalOpen(!isCommentModalOpen)}>
                    <Image style={styles.icon} source={require(commentIcon)} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setRetweetModalOpen(!retweetModalOpen)}>
                    <Image style={styles.icon} source={require(retweetIcon)} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSendModalOpen(!sendModalOpen)}>
                    <Image style={styles.icon} source={require(sendIcon)} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT}}
      />
    </>
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

const Home = ({navigation}: Props) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [retweetModalOpen, setRetweetModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props_: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props_}
        pressBehavior="close"
        opacity={0.8}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

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
            navigation={navigation}
            position={position}
            syncOffset={syncOffset}
            firstRef={firstRef}
            isCommentModalOpen={isCommentModalOpen}
            setIsCommentModalOpen={setIsCommentModalOpen}
            retweetModalOpen={retweetModalOpen}
            setRetweetModalOpen={setRetweetModalOpen}
            sendModalOpen={sendModalOpen}
            setSendModalOpen={setSendModalOpen}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      case 'following':
        return (
          <SecondRoute
            navigation={navigation}
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
      <GestureHandlerRootView
        style={{flex: 1, position: 'relative', paddingTop: 50}}>
        {isCommentModalOpen && (
          <TouchableOpacity
            onPress={() => setIsCommentModalOpen(false)}
            activeOpacity={0.8}></TouchableOpacity>
        )}

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
        {isCommentModalOpen ? (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['95%']}
            enablePanDownToClose={true}
            onClose={() => setIsCommentModalOpen(false)}
            handleIndicatorStyle={{
              backfaceVisibility: 'hidden',
              backgroundColor: 'grey',
              width: 48,
              height: 2.5,
              opacity: 0,
            }}
            backdropComponent={renderBackdrop}>
            <BottomSheetView style={styles.commentModalContainer}>
              <View style={styles.commentHeader}>
                <TouchableOpacity onPress={() => setIsCommentModalOpen(false)}>
                  <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Reply</Text>
                <Text />
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  marginHorizontal: 12,
                  paddingTop: 8,
                  paddingBottom: 200,
                }}>
                <View style={styles.commentContent}>
                  <View style={{position: 'relative'}}>
                    <Image
                      style={styles.commentImage}
                      source={require(`../assets/profile.jpg`)}
                    />
                    <View style={styles.verticalLine}></View>
                  </View>
                  <View style={styles.commentDetails}>
                    <Text style={{fontWeight: 600, marginBottom: 4}}>
                      sobal_official
                    </Text>
                    <Text>
                      Behind the scenes, people are dating our thread WIVES.
                      Chairman wo last warning nie hmm
                    </Text>
                  </View>
                </View>

                <View style={styles.commentBottomContent}>
                  <View style={{position: 'relative'}}>
                    <Image
                      style={styles.commentImage}
                      source={require(`../assets/profile.jpg`)}
                    />
                    <View style={styles.verticalLine}></View>
                  </View>
                  <View style={styles.commentDetails}>
                    <Text style={{fontWeight: 600, marginBottom: 4}}>
                      sobal_official
                    </Text>
                    <TextInput placeholder="Reply to sobal_official" />
                  </View>
                </View>
              </ScrollView>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                }}>
                <TouchableOpacity>
                  <Text style={{color: 'gray'}}>Anyone can reply</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{color: 'blue'}}> Post</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheet>
        ) : (
          <></>
        )}

        {retweetModalOpen ? (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['25%']}
            enablePanDownToClose={true}
            onClose={() => setRetweetModalOpen(false)}
            handleIndicatorStyle={{
              backgroundColor: 'grey',
              width: 40,
              height: 2.5,
            }}
            backdropComponent={renderBackdrop}>
            <BottomSheetView style={styles.retweetContainer}>
              <TouchableOpacity style={styles.retweetButton}>
                <Text>Repost</Text>
                <Image
                  style={styles.retweetIcon}
                  source={require(retweetIcon)}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{...styles.retweetButton, marginTop: 10}}>
                <Text>Retweet</Text>
                <Image
                  style={styles.retweetIcon}
                  source={require(retweetIcon)}
                />
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheet>
        ) : (
          <></>
        )}

        {sendModalOpen ? (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['55%']}
            enablePanDownToClose={true}
            onClose={() => setSendModalOpen(false)}
            backdropComponent={renderBackdrop}>
            <BottomSheetView style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheet>
        ) : (
          <></>
        )}

        {menuOpen ? (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['50%']}
            enablePanDownToClose={true}
            onClose={() => setMenuOpen(false)}
            backdropComponent={renderBackdrop}>
            <BottomSheetView style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheet>
        ) : (
          <></>
        )}
      </GestureHandlerRootView>
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
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  backDrop: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    backgroundColor: 'black',
    opacity: 0.6,
    right: 0,
    bottom: 0,
    top: '-100%',
    flex: 1,
    zIndex: 1,
  },

  // Comment Modal
  commentModalContainer: {},
  commentHeader: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  cancel: {
    textAlign: 'left',
    fontSize: 14,
    marginLeft: 12,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 55,
    flex: 1,
  },
  commentContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  commentImage: {
    width: 35,
    height: 35,
    objectFit: 'contain',
    borderRadius: 200,
  },
  commentDetails: {
    marginLeft: 10,
  },
  verticalLine: {
    position: 'absolute',
    borderLeftColor: '#eee',
    borderLeftWidth: 1,
    height: 35,
    width: 1,
    left: 15,
    top: 45,
  },
  commentBottomContent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },

  retweetContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'white',
    paddingHorizontal: 14,
  },
  retweetButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
  },
  retweetIcon: {
    width: 22,
    height: 22,
    objectFit: 'contain',
  },
});

export default Home;
