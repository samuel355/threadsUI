import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import React from 'react';
const logo = '../assets/icons/threads-app-icon.png';
const addIcon = '../assets/icons/add.png';
const menuIcon = '../assets/icons/menu.png';

const likeIcon = '../assets/icons/like.png';
const likedIcon = '../assets/icons/liked.png';
const commentIcon = '../assets/icons/comment.png';
const retweetIcon = '../assets/icons/retweet.png';
const sendIcon = '../assets/icons/send.png';

type Props = {
    navigation: any;
};

const PostDetails = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text style={styles.heading}>Thread</Text>
                <TouchableOpacity onPress={() => navigation.goForward()}>
                    <Text>Icon</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 14
                    }}>
                    <View style={{ position: 'relative' }}>
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

                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 12, marginRight: 20}}>
                        <View style={styles.contentContainer}>
                            <TouchableOpacity>
                                <Text style={styles.handle}>sobal_official</Text>
                            </TouchableOpacity>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    flex: 1,
                                }}>
                                <Text style={styles.time}>3min</Text>
                                <TouchableOpacity>
                                    <Image
                                        style={{ width: 20, height: 20, objectFit: 'contain', marginRight: 20 }}
                                        source={require(menuIcon)}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.postContainer}>
                            <Text style={{ lineHeight: 24 }}>
                                Behind the scenes, people are dating our thread WIVES. Chairman
                                wo last warning nie hmm
                            </Text>
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
            </ScrollView>
            <View></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        flex: 1,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        fontWeight: '800',
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
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
    icon: {
        width: 22,
        height: 22,
        objectFit: 'contain',
        marginTop: 15,
    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
    },
    postContainer: {
        marginTop: 8,
        paddingRight: 12
    },
});

export default PostDetails;
