import React, { Component } from 'react';
import { withNavigation } from "react-navigation"
import { API, graphqlOperation } from 'aws-amplify'
import Swiper from 'react-native-swiper';
import { Container, Content, Text, Button, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Video } from 'expo-av';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { showMessage } from "react-native-flash-message";

// Animaciones
import IntroToApp1 from '../global/lottieJs/introApp1'

// GRAPHQL
import * as queries from '../../src/graphql/queries'

// Child Component
import IntroToAppPlaceholder from './introToAppPlaceholder'

import { colorsPalette } from '../global/static/colors'


class IntroToApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gestureName: 'none',
            gamingVideo: [],
            musicVideo: [],
            foodVideo: [],
            sportVideo: [],
            electronicsVideo: [],
            isReady: false,
            actionSwiperRoot: true
        };
    }

    onSwipeLeft = () => {
        this.props.navigation.navigate('FirstAuth')
    }

    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _changeRootSwiper = (i) => {
        this.rootSwiper.scrollBy(i)
    }

    componentDidMount() {
        this._getVideos()
        this._startSetInterval()
    }

    _getVideos = async () => {
        try {
            const gamer = await API.graphql(graphqlOperation(queries.listCreateContests, { filter: { category: { eq: 'GAMER' } } }))
            const music = await API.graphql(graphqlOperation(queries.listCreateContests, { filter: { category: { eq: 'MUSIC' } } }))
            const food = await API.graphql(graphqlOperation(queries.listCreateContests, { filter: { category: { eq: 'FOOD' } } }))
            const sport = await API.graphql(graphqlOperation(queries.listCreateContests, { filter: { category: { eq: 'SPORT' } } }))
            const electronics = await API.graphql(graphqlOperation(queries.listCreateContests, { filter: { category: { eq: 'ELECTRONICS' } } }))
            this.setState({
                gamingVideo: gamer.data.listCreateContests.items,
                musicVideo: music.data.listCreateContests.items,
                foodVideo: food.data.listCreateContests.items,
                sportVideo: sport.data.listCreateContests.items,
                electronicsVideo: electronics.data.listCreateContests.items,
                isReady: true
            })
        } catch (error) {
            showMessage({
                message: "Failed.",
                description: "Mmmm, something has happened, we were unable to complete the operation, please overflow your internet connection and try again!",
                type: "default",
                duration: 3000,
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor, // text color
            });
        }
    }

    _changeRootSwiperEvent = () => {
        this.setState({ actionSwiperRoot: false })
        clearInterval(this.refreshIntervalId);
    }

    _stopSetInterval = () => {
        clearInterval(this.refreshIntervalId);
    }

    _startSetInterval = () => {
        this.refreshIntervalId = setInterval(() => {
            this.state.isReady && this.fisrtSwiperChild && this.fisrtSwiperChild.scrollBy(1)
        }, 3000);
    }

    render() {
        const { gamingVideo, musicVideo, foodVideo, sportVideo, electronicsVideo, isReady, actionSwiperRoot } = this.state
        const gamingVideoRandom = gamingVideo[Math.floor(Math.random() * gamingVideo.length)];
        const musicVideoRandom = musicVideo[Math.floor(Math.random() * musicVideo.length)];
        const foodVideoRandom = foodVideo[Math.floor(Math.random() * foodVideo.length)];
        const sportVideoRandom = sportVideo[Math.floor(Math.random() * sportVideo.length)];
        const electronicsVideoRandom = electronicsVideo[Math.floor(Math.random() * electronicsVideo.length)];

        return isReady ? (
            <Swiper
                onIndexChanged={() => this._changeRootSwiperEvent()}
                ref={rootSwiper => this.rootSwiper = rootSwiper}
                showsPagination={false}
                loop={false}
                scrollEnabled={actionSwiperRoot}
                horizontal={false}>
                <View style={{ flex: 1 }}>
                    <Swiper
                        removeClippedSubviews={true}
                        onTouchStartCapture={() => this._stopSetInterval()}
                        onTouchEnd={() => this._startSetInterval()}
                        ref={swiper => this.fisrtSwiperChild = swiper}
                        showsPagination={false}
                        loop={true}
                        scrollEnabled={true}>
                        <View style={{ flex: 1 }}>
                            <Video
                                source={{ uri: gamingVideoRandom && gamingVideoRandom.general.video.url }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={true}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={{ width: "100%", height: "100%", position: 'absolute' }}
                            />
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
                                <Grid>
                                    <Row size={30} style={{ padding: 20, flexDirection: "column", justifyContent: 'center' }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(20) }}>Gaming</Text>
                                        <View style={{ borderWidth: 1, borderColor: '#FFF', width: '90%' }} />
                                        <View style={{ width: '90%' }}>
                                            <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(8) }}>Contest videos</Text>
                                        </View>
                                    </Row>
                                    <Row size={70} />
                                </Grid>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Video
                                source={{ uri: musicVideoRandom && musicVideoRandom.general.video.url }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={true}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={{ width: "100%", height: "100%", position: 'absolute' }}
                            />
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
                                <Grid>
                                    <Row size={30} style={{ padding: 20, flexDirection: "column", justifyContent: 'center' }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(20) }}>Music</Text>
                                        <View style={{ borderWidth: 1, borderColor: '#FFF', width: '90%' }} />
                                        <View style={{ width: '90%' }}>
                                            <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(8) }}>Contest videos</Text>
                                        </View>
                                    </Row>
                                    <Row size={60} />
                                    <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: wp(8), fontWeight: '700', color: '#FFF' }}></Text>
                                    </Row>
                                </Grid>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Video
                                source={{ uri: foodVideoRandom && foodVideoRandom.general.video.url }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={true}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={{ width: "100%", height: "100%", position: 'absolute' }}
                            />
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
                                <Grid>
                                    <Row size={30} style={{ padding: 20, flexDirection: "column", justifyContent: 'center' }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(20) }}>Food</Text>
                                        <View style={{ borderWidth: 1, borderColor: '#FFF', width: '90%' }} />
                                        <View style={{ width: '90%' }}>
                                            <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(8) }}>Contest videos</Text>
                                        </View>
                                    </Row>
                                    <Row size={60} />
                                    <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: wp(8), fontWeight: '700', color: '#FFF' }}></Text>
                                    </Row>
                                </Grid>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Video
                                source={{ uri: sportVideoRandom && sportVideoRandom.general.video.url }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={true}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={{ width: "100%", height: "100%", position: 'absolute' }}
                            />
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
                                <Grid>
                                    <Row size={30} style={{ padding: 20, flexDirection: "column", justifyContent: 'center' }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(20) }}>Sport</Text>
                                        <View style={{ borderWidth: 1, borderColor: '#FFF', width: '90%' }} />
                                        <View style={{ width: '90%' }}>
                                            <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(8) }}>Contest videos</Text>
                                        </View>
                                    </Row>
                                    <Row size={60} />
                                    <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: wp(8), fontWeight: '700', color: '#FFF' }}></Text>
                                    </Row>
                                </Grid>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Video
                                source={{ uri: electronicsVideoRandom && electronicsVideoRandom.general.video.url }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={true}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={{ width: "100%", height: "100%", position: 'absolute' }}
                            />
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
                                <Grid>
                                    <Row size={30} style={{ padding: 20, flexDirection: "column", justifyContent: 'center' }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(17) }}>Electronics</Text>
                                        <View style={{ borderWidth: 1, borderColor: '#FFF', width: '90%' }} />
                                        <View style={{ width: '90%' }}>
                                            <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(8) }}>Contest videos</Text>
                                        </View>
                                    </Row>
                                    <Row size={70} />
                                </Grid>
                            </View>
                        </View>
                    </Swiper>
                    <View style={{ position: 'absolute', flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: "10%", bottom: 0 }}>
                        <Button transparent onPress={() => this._changeRootSwiper(1)}>
                            <Text style={{ fontSize: wp(8), fontWeight: '700', color: '#FFF' }}>Swipe up to start!</Text>
                        </Button>
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <Swiper
                        ref={swiper => this.swiper = swiper}
                        dotStyle={{ borderColor: '#FFF', borderWidth: 1, backgroundColor: '#D81B60' }}
                        activeDotColor="#FFF"
                        scrollEnabled={true}
                        loop={false}>
                        <Container style={{ backgroundColor: '#D81B60' }}>
                            <Content
                                contentContainerStyle={{ flex: 1 }}
                                scrollEnabled={false}>
                                <Grid>
                                    <Row size={30} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(12), fontWeight: 'bold', letterSpacing: 1, color: '#FFF' }}>Lorem Ipsum</Text>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#FFF' }}>Sed ut perspiciatis</Text>
                                    </Row>
                                    <Row size={40}>
                                        <IntroToApp1 />
                                    </Row>
                                    <Row size={30} style={{ justifyContent: 'center' }}>
                                        <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: wp(4), width: '80%', color: "#FFF" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
                                    </Row>
                                </Grid>
                            </Content>
                        </Container>

                        <Container style={{ backgroundColor: '#D81B60' }}>
                            <Content
                                contentContainerStyle={{ flex: 1 }}
                                scrollEnabled={false}>
                                <Grid>
                                    <Row size={30} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(12), fontWeight: 'bold', letterSpacing: 1, color: '#FFF' }}>Lorem Ipsum</Text>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#FFF' }}>Sed ut perspiciatis</Text>
                                    </Row>
                                    <Row size={40}>
                                        <IntroToApp1 />
                                    </Row>
                                    <Row size={30} style={{ justifyContent: 'center' }}>
                                        <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: wp(4), width: '80%', color: "#FFF" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
                                    </Row>
                                </Grid>
                            </Content>
                        </Container>

                        <GestureRecognizer
                            onSwipeLeft={() => this.onSwipeLeft()}
                            config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
                            style={{ flex: 1, backgroundColor: this.state.backgroundColor }}>
                            <Container style={{ backgroundColor: '#D81B60' }}>
                                <Content
                                    contentContainerStyle={{ flex: 1 }}
                                    scrollEnabled={false}>
                                    <Grid>
                                        <Row size={30} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(12), fontWeight: 'bold', letterSpacing: 1, color: '#FFF' }}>Lorem Ipsum</Text>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#FFF' }}>Sed ut perspiciatis</Text>
                                        </Row>
                                        <Row size={40}>
                                            <IntroToApp1 />
                                        </Row>
                                        <Row size={30} style={{ justifyContent: 'center' }}>
                                            <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: wp(4), width: '80%', color: "#FFF" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
                                        </Row>
                                    </Grid>
                                </Content>
                            </Container>
                        </GestureRecognizer>
                    </Swiper>
                </View>
            </Swiper>
        ) : <IntroToAppPlaceholder />
    }
}
export default withNavigation(IntroToApp)