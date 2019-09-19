import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, View, Share } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { withNavigation } from "react-navigation"
import { Button, Text, Icon } from "native-base"
import { Grid, Row } from "react-native-easy-grid"
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import omitDeep from 'omit-deep'
import findIndex from 'lodash/findIndex'

// Child Components
import HeaderContest from "./header"
import PrizeModal from "./modals/prizes"
import AboutModal from "./modals/about"
import SwiperAboutTheContest from "./swiper/about"
import SwiperPrizes from "./swiper/prizes"
import UpdateContest from './updateContest'
import Audience from './audience'
import Participants from './participants'
import SecondaryView from './secondaryView'
import JoinToTheContest from './participants/joinToTheContest'
import VideoPageOne from './video'
import Likes from './secondaryView/statistics/likes'

// Gradients
import { GadrientsAboutContest } from "../global/gradients"
import { MyStatusBar } from '../global/statusBar'

// Colors
import { colorsPalette } from '../global/static/colors'

// GRAPHQL
import * as queries from '../../src/graphql/queries'
import * as subscriptions from '../../src/graphql/subscriptions'
import * as mutations from '../../src/graphql/mutations'

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 75 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

let subscription

class ShowContest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            activeSections: [],
            userData: {},
            contest: this.props.navigation.getParam('contest'),
            fromWhere: '',

            swiperIndex: 0,
            hideCongrastSectionAudience: false,

            // Modals
            modalVisibleAudience: false,
            openModalUpdateContest: false,
            modalVisibleAboutTheContest: false,
            modalVisibleHowToParticipe: false,
            modalVisiblePrizes: false,
            modalVisibleJoinToTheContest: false,

            userLogin: false,
            isReady: null
        };
    }

    componentDidMount() {
        const userData = this.props.navigation.getParam('userData');
        const fromWhere = this.props.navigation.getParam('fromWhere');
        this.setState({ userData, fromWhere })
        this.getContestFromAWS()
        switch (fromWhere) {
            case 'createContest':
                this._setModalVisibleAudience(true, true)
                break;
            default:
                null
        }

        subscription = API.graphql(graphqlOperation(subscriptions.onUpdateCreateContest)).subscribe({
            next: (getData) => {
                const contest = getData.value.data.onUpdateCreateContest
                this.setState({ contest })
            }
        })
    }

    componentWillUnmount() {
        subscription && subscription.unsubscribe();
    }

    getContestFromAWS = async () => {
        const { navigation } = this.props
        const contest = navigation.getParam('contest');
        try {
            const data = await Auth.currentAuthenticatedUser()
            const dataContest = await API.graphql(graphqlOperation(queries.getCreateContest, { id: contest.id }))
            this.setState({ isReady: true, contest: dataContest.data.getCreateContest, userLogin: data.id === contest.user.id ? true : false })
        } catch (error) {
            console.log(error);
        }
    }

    _share = async (item) => {
        const { contest } = this.state
        const { id, avatar, name } = this.props.navigation.getParam('userData');
        try {
            const result = await Share.share({
                message: item.general.description,
                title: item.general.nameOfContest,
            },
                {
                    tintColor: "red",
                    excludedActivityTypes: [
                        'com.apple.UIKit.activity.Print',
                        'com.apple.UIKit.activity.CopyToPasteboard',
                        'com.apple.UIKit.activity.SaveToCameraRoll',
                        'com.apple.UIKit.activity.AirDrop',
                        'com.apple.UIKit.activity.PostToWeibo',
                        'com.apple.UIKit.activity.AssignToContact',
                        'com.apple.UIKit.activity.AddToReadingList',
                        'com.apple.UIKit.activity.PostToFlickr',
                        'com.apple.UIKit.activity.PostToVimeo',
                        'com.apple.UIKit.activity.PostToTencentWeibo',
                        'com.apple.UIKit.activity.OpenInIBooks',
                        'com.apple.UIKit.activity.MarkupAsPDF',
                        'com.apple.reminders.RemindersEditorExtension',
                        'com.apple.mobilenotes.SharingExtension',
                        'com.apple.mobileslideshow.StreamShareService',
                        'com.linkedin.LinkedIn.ShareExtension',
                        'pinterest.ShareExtension',
                        'com.google.GooglePlus.ShareExtension',
                        'com.tumblr.tumblr.Share-With-Tumblr',
                        'net.whatsapp.WhatsApp.ShareExtension',
                    ],

                });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    omitDeep(contest, ['__typename'])

                    if (contest.statistics.userSharing !== null) {
                        // Si el usuario exista entonces se actualizará [whereItHasBeenShared] y se agregará un nuevo elemento
                        const userSharing = contest.statistics && contest.statistics.userSharing.filter(item => item.idUserSharing.indexOf(id) !== -1) // Se verifica si el suaurio existe
                        if (userSharing.length !== 0) {
                            const input = {
                                id: contest.id,
                                statistics: {
                                    userLikes: contest.statistics.userLikes,
                                    userSharing: [...contest.statistics.userSharing,
                                    {
                                        name,
                                        avatar,
                                        idUserSharing: id,
                                        createdAt: moment().toISOString(),
                                        whereItHasBeenShared: [...userSharing[0].whereItHasBeenShared, result.activityType],
                                    }]
                                }
                            }
                            const index = findIndex(input.statistics.userSharing, { idUserSharing: id })
                            input.statistics.userSharing.splice(index, 1)
                            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
                        } else if (userSharing.length === 0) {
                            // Se crea un nuevo usuario si no existe
                            const input = {
                                id: contest.id,
                                statistics: {
                                    userLikes: contest.statistics.userLikes,
                                    userSharing: [...contest.statistics.userSharing,
                                    {
                                        name,
                                        avatar,
                                        idUserSharing: id,
                                        createdAt: moment().toISOString(),
                                        whereItHasBeenShared: [result.activityType],
                                    }
                                    ]
                                }
                            }
                            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
                        }
                    } else if (contest.statistics.userSharing === null) {
                        // Se agrega un nuevo usuario, ya que no existe ninguno
                        const input = {
                            id: contest.id,
                            statistics: {
                                userLikes: contest.statistics.userLikes,
                                userSharing: [
                                    { name, avatar, idUserSharing: id, createdAt: moment().toISOString(), whereItHasBeenShared: [result.activityType] }
                                ]
                            }
                        }
                        await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
                    }

                } else {
                    // shared
                    console.log(result)
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log(result)
            }
        } catch (error) {
            console.log(error);
        }
    };


    _setModalVisiblePrizes = (visible) => {
        this.setState({ modalVisiblePrizes: visible })
    }

    _setModalVisibleAboutTheContest = (visible) => {
        this.setState({
            modalVisibleAboutTheContest: visible
        })
    }

    _setModalVisibleUpdate = (visible) => {
        this.setState({ openModalUpdateContest: visible })
    }

    _setModalVisibleAudience = (visible, action) => {
        this.setState({
            modalVisibleAudience: visible,
            hideCongrastSectionAudience: action
        })
    }

    _setModalVisibleJoinToTheContest = (visible) => {
        this.setState({
            modalVisibleJoinToTheContest: visible
        })
    }

    _changeSwiperRoot = (i) => {
        this.swiperRoot.scrollBy(i)
    }

    render() {
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });
        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });
        const titleScale = scrollY.interpolate({
            inputRange: [1, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.9],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });

        const {
            contest,
            userData,
            swiperIndex,
            userLogin,
            fromWhere,

            // Actions
            hideCongrastSectionAudience,
            isReady,

            // Modal
            openModalUpdateContest,
            modalVisiblePrizes,
            modalVisibleAboutTheContest,
            modalVisibleAudience,
            modalVisibleJoinToTheContest
        } = this.state

        return (
            <Swiper
                scrollEnabled={isReady === null ? false : true}
                ref={(swiperRoot) => this.swiperRoot = swiperRoot}
                onIndexChanged={(index) => this.setState({ swiperIndex: index, fromWhere: null })}
                loop={false}
                showsPagination={false}>
                <View style={{ flex: 1, shadowOffset: { width: 0 }, shadowColor: 'red', shadowOpacity: 1, }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <GadrientsAboutContest />

                    {/* Slider / Submit a video / submit a meme */}
                    <Animated.ScrollView
                        style={{ height: "100%" }}
                        scrollEventThrottle={1}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: true }
                        )}
                        contentInset={{
                            top: HEADER_MAX_HEIGHT
                        }}
                        contentOffset={{
                            y: -HEADER_MAX_HEIGHT
                        }}>
                        <Grid style={styles.scrollViewContent}>

                            {/* Botton social network */}
                            <Row size={15}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                                        <Button icon transparent onPress={() => this._share(contest)} style={{ alignSelf: 'flex-end' }}>
                                            <Icon type="FontAwesome" name='share-square-o' style={{ color: colorsPalette.primaryColor }} />
                                        </Button>
                                        <View style={{right: 15}}>
                                            <Likes userData={userData} contest={contest} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 0.5, justifyContent: 'flex-end' }}>
                                        {userLogin ? <Button
                                            style={{ alignSelf: 'flex-end' }}
                                            onPress={() => this._setModalVisibleUpdate(true)}
                                            transparent>
                                            <Icon type="Ionicons" name="md-create" style={{ color: "#BDBDBD" }} />
                                        </Button> : null}
                                    </View>
                                </View>
                            </Row>

                            {/* Slider */}
                            <Row size={30}>
                                <Swiper
                                    loop={false}
                                    height={Platform.OS === 'ios' ? 240 : 300}
                                    activeDotColor="#D82B60"
                                    dotColor="#BDBDBD"
                                    showsButtons={false}>
                                    <SwiperPrizes
                                        _setModalVisiblePrizes={this._setModalVisiblePrizes}
                                        contest={contest} />
                                    <SwiperAboutTheContest
                                        _setModalVisibleAboutTheContest={this._setModalVisibleAboutTheContest}
                                        contest={contest} />
                                </Swiper>
                            </Row>

                            {/* Stats/Submit a video or a meme */}
                            <Row size={65}>
                                <Participants
                                    // Data
                                    userData={userData}
                                    contest={contest}
                                    disableParticipants={this.props.navigation.getParam('disableParticipants')}

                                    // Functions
                                    _setModalVisibleAudience={this._setModalVisibleAudience}
                                    _setModalVisibleJoinToTheContest={this._setModalVisibleJoinToTheContest} />
                            </Row>
                        </Grid>
                    </Animated.ScrollView>

                    {/* Image Background */}
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.header,
                            { transform: [{ translateY: headerTranslate }] },
                        ]}>
                        <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                        <Animated.Image
                            style={[
                                styles.backgroundImage,
                                {
                                    opacity: imageOpacity,
                                    transform: [{ translateY: imageTranslate }],

                                },
                            ]}
                            source={{ uri: contest.general.picture.url }}
                        />
                        {
                            userLogin && fromWhere === 'createContest' &&
                            <View style={styles.swiperIndicator}>
                                <Animatable.View
                                    animation="pulse"
                                    easing="ease-in-out"
                                    iterationCount="infinite"
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}
                                >
                                    <Text
                                        minimumFontScale={wp(7)}
                                        allowFontScaling={false}
                                        style={{ textAlign: 'center', color: 'white', fontSize: wp(7), opacity: 0.8 }}>Swipe</Text>
                                    <Icon
                                        name='arrow-long-right'
                                        type='Entypo'
                                        style={{ color: 'white', marginTop: '2%', marginLeft: '4%', fontSize: wp(8), opacity: 0.8 }}
                                    />
                                </Animatable.View>
                            </View>
                        }
                    </Animated.View>

                    {/* Header Contests */}
                    <Animated.View style={[styles.bar, { transform: [{ scale: titleScale }, { translateY: titleTranslate }] }]}>
                        <HeaderContest
                            fromWhere={fromWhere}
                            contest={contest} />
                        <MyStatusBar
                            backgroundColor="#FFF"
                            barStyle="light-content" />
                    </Animated.View>

                    {/* Modals */}
                    <PrizeModal
                        // Data
                        contest={contest}

                        // Action
                        modalVisiblePrizes={modalVisiblePrizes}
                        // Function
                        _setModalVisiblePrizes={this._setModalVisiblePrizes} />

                    <AboutModal
                        // Data
                        contest={contest}
                        userData={userData}
                        disableParticipants={this.props.navigation.getParam('disableParticipants')}

                        // Action
                        modalVisibleAboutTheContest={modalVisibleAboutTheContest}
                        // Function
                        _setModalVisibleJoinToTheContest={this._setModalVisibleJoinToTheContest}
                        _setModalVisibleAboutTheContest={this._setModalVisibleAboutTheContest} />

                    <UpdateContest
                        // Data
                        contest={contest}
                        userData={userData}

                        // Action
                        openModalUpdateContest={openModalUpdateContest}
                        // Funtion
                        _setModalVisibleUpdate={this._setModalVisibleUpdate} />

                    {/* Audience Modals */}
                    <Modal
                        isVisible={modalVisibleAudience}
                        onBackdropPress={modalVisibleAudience ? null : () => this._setModalVisibleAudience(false)}
                        onSwipeComplete={modalVisibleAudience ? null : () => this._setModalVisibleAudience(false)}
                        swipeDirection={modalVisibleAudience ? null : ['down']}
                        animationInTiming={900}
                        animationIn="slideInUp"
                        backdropOpacity={0.40}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                            <Audience
                                // DATA
                                contest={contest}
                                userData={userData}

                                // Actions
                                hideCongrastSectionAudience={hideCongrastSectionAudience}

                                // Functions
                                _setModalVisibleAudience={this._setModalVisibleAudience} />
                        </View>
                    </Modal>

                    {/* Join to the contest */}
                    <JoinToTheContest
                        // Data
                        contest={contest}
                        userData={userData}

                        // Actions
                        modalVisibleJoinToTheContest={modalVisibleJoinToTheContest}

                        // Function
                        _setModalVisibleJoinToTheContest={this._setModalVisibleJoinToTheContest} />

                </View>
                {userLogin
                    ? <View style={{ flex: 1 }}>
                        <SecondaryView
                            // Data
                            contest={contest}
                            userData={userData}

                            // Actions
                            swiperIndex={swiperIndex}

                            // Function
                            _setModalVisibleAudience={this._setModalVisibleAudience}
                            _changeSwiperRoot={this._changeSwiperRoot}
                        />
                    </View> : <VideoPageOne contest={contest} swiperIndex={swiperIndex} />}
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#D82B60',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: "cover"
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 10,
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    },
    swiperIndicator: {
        width: '30%',
        color: 'white',
        position: 'absolute',
        top: 160,
        right: 10
    }
});


export default withNavigation(ShowContest)