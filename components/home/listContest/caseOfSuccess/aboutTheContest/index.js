import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native'
import { Video } from 'expo-av';
import { API, graphqlOperation } from 'aws-amplify'
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
import ShowLCVSimpact from '../../../../aboutContest/secondaryView/statistics/charts/showLCVSImpact'
import ShowSN from '../../../../aboutContest/secondaryView/statistics/charts/showSN'
import ShowSubmissionDay from '../../../../aboutContest/secondaryView/statistics/charts/showSubmissionDay'
import ShowRgions from '../../../../aboutContest/secondaryView/statistics/charts/showRgions'
import ShowGender from '../../../../aboutContest/secondaryView/statistics/charts/showGender'

// AWS
import * as queries from '../../../../../src/graphql/queries'

export default class AboutContestCOS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSections: [],
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
            swiperIndex: 0,

            isReady: null
        };
    }
    componentDidMount() {
        this.getContestFromAWS()
    }

    getContestFromAWS = async () => {
        const { navigation } = this.props
        const contest = navigation.getParam('contest');
        try {
            const dataContest = await API.graphql(graphqlOperation(queries.getCreateContest, { id: contest.id }))
            this.setState({ isReady: true, contest: dataContest.data.getCreateContest })
        } catch (error) {
            console.log(error);
        }
    }

    _setModalVisiblePrizes = (visible) => {
        this.setState({ modalVisiblePrizes: visible })
    }


    render() {
        const {
            contest,
            swiperIndex,

            // Modal
            modalVisiblePrizes,
        } = this.state
        return (
            <Swiper
                onIndexChanged={(index) => this.setState({ swiperIndex: index })}
                showsPagination={false}
                loop={false}>
                {contest !== null
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
                                <HeaderContest contest={contest} />
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
                            </View>
                            <View style={{ height: 250 }}>
                                <View style={{ paddingLeft: 15, flex: 0.1 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Distribution <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>Touch for more information on the colors</Text></Text>
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    {contest.participants !== undefined && <ShowLCVSimpact participants={contest.participants.items} />}
                                    <View style={{ backgroundColor: 'rgba(0,0,0,0.0)', width: "100%", height: "100%", position: 'absolute' }} />
                                </View>
                                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                                </View>
                            </View>
                            <View style={{ height: 250 }}>
                                <View style={{ paddingLeft: 15, flex: 0.1 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Social networks <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, fontWeight: 'normal' }}>Scroll to left to see more</Text></Text>
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    {contest.participants !== undefined && <ShowSN participants={contest.participants.items} />}
                                </View>
                                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                                </View>
                            </View>
                            <View style={{ height: 250 }}>
                                <View style={{ paddingLeft: 15, flex: 0.1 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Submission day</Text>
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    {contest.participants !== undefined && <ShowSubmissionDay participants={contest.participants.items} />}
                                </View>
                                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                                </View>
                            </View>
                            <View style={{ height: 250 }}>

                                <View style={{ paddingLeft: 15, flex: 0.1 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Top Locations</Text>
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    {contest.participants !== undefined && <ShowRgions participants={contest.participants.items} />}
                                </View>
                                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                                </View>
                            </View>

                            <View style={{ height: 250 }}>
                                <View style={{ paddingLeft: 15, flex: 0.1 }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontWeight: 'bold' }}>Gender</Text>
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    {contest.participants !== undefined && <ShowGender participants={contest.participants.items} />}
                                </View>
                                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>These data are the sum of all data per participant.</Text>
                                </View>
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
                }
                <Container>
                    <Video
                        source={{ uri: contest && contest.general.video.url }}
                        useNativeControls={true}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={swiperIndex ? true : false}
                        isLooping={false}
                        style={{ width: "100%", height: "100%" }} />
                </Container>
            </Swiper>
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