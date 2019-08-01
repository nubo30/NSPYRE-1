import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from "react-navigation"
import { Button, Text } from "native-base"
import { Grid, Row } from "react-native-easy-grid"
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";

// Child Components
import SocialNetwork from "./shareSocialNetwork/index"
import HeaderContest from "./header/index"
import PrizeModal from "./modals/prizes"
import AboutModal from "./modals/about"
import SwiperAboutTheContest from "./swiper/about"
import SwiperPrizes from "./swiper/prizes"
import SubmitAvideo from "./cards/submitVideo"
import SubmitAMeme from "./cards/submitAMeme"
import UpdateContest from './updateContest/index'
import Audience from './audience/index'
import Participants from './participants/index'
import SecondaryView from './secondaryView/index'

// Gradients
import { GadrientsAboutContest } from "../Global/gradients/index"
import { MyStatusBar } from '../Global/statusBar/index'

// Icons
import { Ionicons } from '@expo/vector-icons'

// GRAPHQL
import * as queries from '../../src/graphql/queries'
import * as subscriptions from '../../src/graphql/subscriptions'

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 75 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ShowContest extends Component {
    static navigationOptions = { header: null }
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            activeSections: [],
            userData: {},
            contest: this.props.navigation.getParam('contest'),

            swiperIndex: 0,
            hideCongrastSectionAudience: false,

            // Modals
            modalVisibleAudience: false,
            openModalUpdateContest: false,
            modalVisibleAboutTheContest: false,
            modalVisibleHowToParticipe: false,
            modalVisiblePrizes: false
        };
    }

    componentDidMount() {
        const userData = this.props.navigation.getParam('userData');
        this.setState({ userData })
        this.getContestFromAWS()
        const fromWhere = this.props.navigation.getParam('fromWhere');
        switch (fromWhere) {
            case 'createContest':
                this._setModalVisibleAudience(true, true)
                break;
            default:
                null
        }

        API.graphql(graphqlOperation(subscriptions.onUpdateCreateContest)).subscribe({
            next: (getData) => {
                const contest = getData.value.data.onUpdateCreateContest
                this.setState({ contest })
            }
        })
    }

    getContestFromAWS = async () => {
        const { navigation } = this.props
        const contest = navigation.getParam('contest');
        try {
            const { data } = await API.graphql(graphqlOperation(queries.getCreateContest, { id: contest.id }))
            this.setState({ contest: data.getCreateContest })
        } catch (error) {
            console.log(error);
        }
    }


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

            // Actions
            hideCongrastSectionAudience,

            // Modal
            openModalUpdateContest,
            modalVisiblePrizes,
            modalVisibleAboutTheContest,
            modalVisibleAudience
        } = this.state

        return (
            <Swiper
                ref={(swiperRoot) => this.swiperRoot = swiperRoot}
                onIndexChanged={(index) => this.setState({ swiperIndex: index })}
                loop={false} showsPagination={false}>
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
                            <Row size={15} style={{ justifyContent: 'space-between' }}>
                                <SocialNetwork />
                                <View style={{ justifyContent: 'center', left: 5, flexDirection: 'row' }}>
                                    <Button
                                        onPress={() => this._setModalVisibleUpdate(true)}
                                        transparent color="#fff" style={{
                                            borderRadius: 100,
                                            width: 50,
                                            height: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Ionicons name="md-create" style={{ color: "#BDBDBD", fontSize: 30 }} />
                                    </Button>
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
                                <Participants  />
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
                    </Animated.View>

                    {/* Header Contests */}
                    <Animated.View style={[styles.bar, { transform: [{ scale: titleScale }, { translateY: titleTranslate }] }]}>
                        <HeaderContest
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
                        // Action
                        modalVisibleAboutTheContest={modalVisibleAboutTheContest}
                        // Function
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

                </View>
                <View style={{ flex: 1 }}>
                    <SecondaryView
                        // Actions
                        swiperIndex={swiperIndex}

                        // Function
                        _setModalVisibleAudience={this._setModalVisibleAudience}
                        _changeSwiperRoot={this._changeSwiperRoot}
                    />
                </View>
            </Swiper>
        );
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
});


export default withNavigation(ShowContest)