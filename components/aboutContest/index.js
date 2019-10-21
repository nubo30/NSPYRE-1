import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { Button, Icon, Text, View } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scrollview';
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import truncate from 'lodash/truncate'

const SCREEN_HEIGHT = Dimensions.get('screen').height

import { colorsPalette } from '../global/static/colors';
import { MyStatusBar } from '../global/statusBar'

// CHild Component
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

// AWS
import * as queries from '../../src/graphql/queries'
import * as subscriptions from '../../src/graphql/subscriptions'

let subscription
export default class AboutContest extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                setTimeout(() => { this._setModalVisibleAudience(true, true) }, 1500);
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
            const userData = await Auth.currentAuthenticatedUser()
            const dataContest = await API.graphql(graphqlOperation(queries.getCreateContest, { id: contest.id }))
            Object.keys(userData).length === 1
                ? this.setState({ isReady: true, contest: dataContest.data.getCreateContest, userLogin: userData.id === dataContest.data.getCreateContest.user.userId ? true : false })
                : this.setState({ isReady: true, contest: dataContest.data.getCreateContest, userLogin: userData.attributes.sub === dataContest.data.getCreateContest.user.userId ? true : false })
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

    _setModalVisibleJoinToTheContest = (visible) => {
        this.setState({
            modalVisibleJoinToTheContest: visible
        })
    }

    _changeSwiperRoot = (i) => {
        this.swiperRoot.scrollBy(i)
    }

    render() {
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
            contest !== null
                ? <Swiper
                    scrollEnabled={isReady === null ? false : true}
                    ref={(swiperRoot) => this.swiperRoot = swiperRoot}
                    onIndexChanged={(index) => this.setState({ swiperIndex: index, fromWhere: null })}
                    loop={false}
                    showsPagination={false}>
                    <ParallaxScrollView
                        windowHeight={SCREEN_HEIGHT}
                        backgroundSource={{ uri: contest.general.picture.url }}
                        navBarColor={colorsPalette.primaryColor}
                        headerView={(
                            <View style={styles.headerTextView}>
                                <Text style={styles.headerTextViewTitle}>{contest.general.nameOfContest}</Text>
                                <Text style={styles.headerTextViewSubtitle}>By {contest.aboutTheUser.companyName}</Text>
                                <Text style={styles.headerTextViewSeeMore}>Scroll down/left to see more</Text>
                            </View>
                        )}
                        navBarView={
                            <View style={{ width: '100%' }}>
                                <HeaderContest fromWhere={fromWhere} contest={contest} />
                                <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                            </View>
                        }>
                        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#F5F5F5" }}>
                            <View style={{ height: 50, flexDirection: 'row' }}>
                                <View style={{ flex: 0.7, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                                    <Icon type="MaterialIcons" name="location-on" style={{ fontSize: wp(5), color: colorsPalette.gradientGray }} />
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}>{truncate(`${contest.aboutTheUser.location.city}, ${contest.aboutTheUser.location.country}.`, { length: 40, separator: "..." })}</Text>
                                </View>
                                <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
                                    {userLogin ? <Button
                                        style={{ alignSelf: 'flex-end' }}
                                        onPress={() => this._setModalVisibleUpdate(true)}
                                        transparent>
                                        <Icon type="Ionicons" name="md-create" style={{ color: "#BDBDBD" }} />
                                    </Button> : null}
                                </View>
                            </View>
                            <View style={{ height: 240, justifyContent: 'center', alignItems: 'center' }}>
                                <Swiper
                                    loop={false}
                                    activeDotColor="#D82B60"
                                    dotColor="#BDBDBD"
                                    showsButtons={false}>
                                    <SwiperAboutTheContest
                                        _setModalVisibleAboutTheContest={this._setModalVisibleAboutTheContest}
                                        contest={contest} />
                                    <SwiperPrizes
                                        _setModalVisiblePrizes={this._setModalVisiblePrizes}
                                        contest={contest} />
                                </Swiper>
                            </View>
                            <Participants
                                // Data
                                userData={userData}
                                contest={contest}
                                disableParticipants={this.props.navigation.getParam('disableParticipants')}

                                // Functions
                                _setModalVisibleAudience={this._setModalVisibleAudience}
                                _setModalVisibleJoinToTheContest={this._setModalVisibleJoinToTheContest} />
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
                                style={{ justifyContent: 'flex-end', margin: 0 }}>
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
                        </ScrollView>
                        <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                    </ParallaxScrollView>
                    {userLogin
                        ? <View style={{ flex: 1 }}>
                            <SecondaryView
                                // Data
                                contest={contest}
                                userData={userData}

                                // Actions
                                swiperIndex={swiperIndex}

                                // Function
                                _getContestFromAWS={this.getContestFromAWS}
                                _setModalVisibleAudience={this._setModalVisibleAudience}
                                _changeSwiperRoot={this._changeSwiperRoot} />
                            <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                        </View>
                        : <VideoPageOne contest={contest} swiperIndex={swiperIndex} />}
                </Swiper>
                : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.darkFont, textAlign: 'center' }}>This contest has been deleted</Text>
                    <Button
                        onPress={() => this.props.navigation.goBack()}
                        style={{ backgroundColor: colorsPalette.primaryColor, top: 15 }}>
                        <Text>Comeback</Text>
                    </Button>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    headerTextView: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: SCREEN_HEIGHT / 2,
        borderWidth: 5,
        borderColor: colorsPalette.secondaryColor,
        width: "90%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        shadowColor: colorsPalette.primaryShadowColor,
        shadowOffset: { width: 0 },
        shadowOpacity: 1,
        borderRadius: 5
    },
    headerTextViewTitle: {
        fontSize: wp(12),
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    headerTextViewSubtitle: {
        fontSize: wp(5),
        color: 'white',
        fontWeight: '300'
    },
    headerTextViewSeeMore: {
        fontSize: wp(2.5),
        color: 'white',
        fontWeight: '300',
        position: 'absolute',
        bottom: 0,
        padding: 5
    }
});