import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import {
    Button, Icon, Text, View,
    Body,
    H1,
    Card,
    CardItem,
    List,
    Left,
    ListItem,
    Thumbnail,
    Badge,
    Title,
    Container,
    Header, Right
} from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scrollview';
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import truncate from 'lodash/truncate'
import { Grid, Row } from "react-native-easy-grid"

const SCREEN_HEIGHT = Dimensions.get('screen').height

import { colorsPalette } from '../../../../global/static/colors';
import { MyStatusBar } from '../../../../global/statusBar'

// CHild Component
import HeaderContest from "./childComponents/header"
// import PrizeModal from "./modals/prizes"
// import AboutModal from "./modals/about"
// import SwiperAboutTheContest from "./swiper/about"
// import SwiperPrizes from "./swiper/prizes"
// import UpdateContest from './updateContest'
// import Audience from './audience'
// import Participants from './participants'
// import JoinToTheContest from './participants/joinToTheContest'

// AWS
import * as queries from '../../../../../src/graphql/queries'
import * as subscriptions from '../../../../../src/graphql/subscriptions'

let subscription
export default class AboutContestCOS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSections: [],
            userData: {},
            contest: this.props.navigation.getParam('contest'),

            swiperIndex: 0,
            hideCongrastSectionAudience: false,
            thumbnailLoading: false,

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
        this.setState({ userData })
        this.getContestFromAWS()

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
                ? <ParallaxScrollView
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
                            <View style={{ flex: 0.3, justifyContent: 'flex-end' }} />
                        </View>
                        <View style={{ height: 240, justifyContent: 'center', alignItems: 'center' }}>
                            <Swiper
                                loop={false}
                                activeDotColor="#D82B60"
                                dotColor="#BDBDBD"
                                showsButtons={false}>
                                <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: -10 }}
                                    onPress={() => {
                                        setTimeout(() => {
                                            this._setModalVisiblePrizes(true)
                                        }, 500)
                                    }}
                                    underlayColor="rgba(0,0,0,0.0)">
                                    <Card style={{ borderRadius: 5, elevation: 5, width: "80%" }}>
                                        <CardItem header bordered style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <H1
                                                minimumFontScale={wp(4)}
                                                allowFontScaling={false}
                                                style={{ color: "#D82B60", fontSize: wp(5) }}>Prizes</H1>
                                            <Badge style={{ backgroundColor: '#D82B60', width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text
                                                    minimumFontScale={wp(3)}
                                                    allowFontScaling={false}
                                                    style={{ fontSize: wp(3), right: 2, top: -2 }}>{contest.prizes.length}</Text>
                                            </Badge>
                                        </CardItem>
                                        <CardItem
                                            style={{ borderBottomLeftRadius: 5, borderBottomEndRadius: 5 }}>
                                            <List style={{ width: "100%" }}>
                                                <ListItem avatar onPress={() => setTimeout(() => {
                                                    this._setModalVisiblePrizes(true)
                                                }, 500)}>
                                                    <Left>
                                                        <Thumbnail
                                                            style={{ bottom: 5 }} source={{ uri: "https://livra.com/Portals/0/new_skin/FRANK/assets/img/prototype/content/prize-bundle.png" }} />
                                                    </Left>
                                                    <Body style={{ borderBottomColor: "#fff" }}>
                                                        <Text
                                                            minimumFontScale={wp(4)}
                                                            allowFontScaling={false}
                                                            style={{ color: "#BDBDBD", fontSize: wp(4) }}>{`This contest has ${contest.prizes.length} prize, touch to see!`}</Text>
                                                        <Text
                                                            minimumFontScale={wp(3)}
                                                            allowFontScaling={false}
                                                            style={{ color: "#D82B60", textDecorationLine: "underline", top: 3, fontSize: wp(3) }}>See the prizes</Text>
                                                    </Body>
                                                </ListItem>
                                            </List>
                                        </CardItem>
                                    </Card>
                                </TouchableHighlight>
                            </Swiper>
                        </View>

                        <Modal
                            style={{ justifyContent: 'flex-end', margin: 0 }}
                            isVisible={modalVisiblePrizes}
                            onSwipeComplete={() => { this._setModalVisiblePrizes(false); this.setState({ indexSwiper: 0 }) }}
                            swipeDirection={['down']}>
                            <View style={{
                                backgroundColor: colorsPalette.secondaryColor,
                                borderTopStartRadius: 10,
                                borderTopEndRadius: 10,
                                borderColor: 'rgba(0, 0, 0, 0.3)',
                                flex: 1,
                                maxHeight: 500,
                                minHeight: 500,
                                position: 'absolute',
                                bottom: 0,
                                width: '100%'
                            }}>
                                <Container style={{ borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
                                    <Header style={{ backgroundColor: colorsPalette.secondaryColor, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                                        <Left />
                                        <Body>
                                            <Title style={{ top: -10, fontSize: wp(10), color: colorsPalette.darkFont }}>Prizes</Title>
                                        </Body>
                                        <Right>
                                            <Button
                                                transparent style={{ top: -10 }} onPress={() => { this._setModalVisiblePrizes(false) }}>
                                                <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Close</Text>
                                            </Button>
                                        </Right>
                                    </Header>
                                    <Swiper
                                        loadMinimal={true}
                                        loop={false}
                                        activeDotColor="#D82B60">
                                        {contest.prizes.map((item, key) =>
                                            <Grid key={key}>
                                                <Row size={40}>
                                                    <ImageBackground
                                                        onLoadStart={() => this.setState({ thumbnailLoading: true })}
                                                        onLoadEnd={() => this.setState({ thumbnailLoading: false })}
                                                        source={{ uri: item.picture.url }}
                                                        style={{ width: "100%", flex: 1 }}>
                                                    </ImageBackground>
                                                </Row>
                                                <Row size={60} style={{ flexDirection: 'column', top: 10 }}>
                                                    <Text allowFontScaling={false} style={{ fontSize: wp(7), left: 15 }}>Description <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>(Use two fingers to slide down/left/right)</Text> </Text>
                                                    <Text allowFontScaling={false} style={{ fontSize: wp(4), left: 15, marginTop: 5, marginBottom: 5 }}>{item.name}</Text>
                                                    <ScrollView contentContainerStyle={{ height: "100%", left: 15, width: "90%" }}>
                                                        <Text allowFontScaling={false} style={{ textAlign: 'left', fontSize: wp(3.5) }}>{item.description}</Text>
                                                    </ScrollView>
                                                </Row>
                                            </Grid>)}
                                    </Swiper>
                                </Container>
                            </View>
                        </Modal>
                    </ScrollView>
                    <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                </ParallaxScrollView>
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