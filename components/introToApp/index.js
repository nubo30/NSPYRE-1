import React, { Component } from 'react';
import { withNavigation } from "react-navigation"
import { API, graphqlOperation } from 'aws-amplify'
import Swiper from 'react-native-swiper';
import { Container, Content, Footer, Text, Button, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Video } from 'expo-av';

// Animaciones
import IntroToApp1 from '../Global/lottieJs/introApp1'

// GRAPHQL
import * as queries from '../../src/graphql/queries'

// Child Component
import IntroToAppPlaceholder from './introToAppPlaceholder'

class IntroToApp extends Component {

    state = {
        gamingVideo: [],
        musicVideo: [],
        foodVideo: [],
        sportVideo: [],
        electronicsVideo: [],
        isReady: false
    }

    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _changeRootSwiper = (i) => {
        this.rootSwiper.scrollBy(i)
    }

    componentDidMount() {
        this._getVideos()
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
            console.log(error)
        }
    }

    render() {
        const { gamingVideo, musicVideo, foodVideo, sportVideo, electronicsVideo, isReady } = this.state
        const gamingVideoRandom = gamingVideo[Math.floor(Math.random() * gamingVideo.length)];
        const musicVideoRandom = musicVideo[Math.floor(Math.random() * musicVideo.length)];
        const foodVideoRandom = foodVideo[Math.floor(Math.random() * foodVideo.length)];
        const sportVideoRandom = sportVideo[Math.floor(Math.random() * sportVideo.length)];
        const electronicsVideoRandom = electronicsVideo[Math.floor(Math.random() * electronicsVideo.length)];

        return isReady ? (
            <Swiper
                ref={rootSwiper => this.rootSwiper = rootSwiper}
                showsPagination={false}
                loop={false}
                scrollEnabled={false}>

                <Swiper
                    showsPagination={false}
                    loop={false}
                    pagingEnabled={false}
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
                                    <View style={{ borderWidth: 1, borderColor: '#FFF', width: '75%' }} />
                                    <View style={{ width: '75%', alignItems: 'flex-end' }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(8), right: 5 }}>Contest videos</Text>
                                    </View>
                                </Row>
                                <Row size={60} />
                                <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(7), fontWeight: '700', color: '#FFF' }}>Swipe left for more</Text>
                                </Row>
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
                                    <View style={{ borderWidth: 1, borderColor: '#FFF', width: '60%' }} />
                                    <View style={{ width: '60%', alignItems: 'flex-end' }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(8), }}>Contest videos</Text>
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
                                    <View style={{ borderWidth: 1, borderColor: '#FFF', width: '60%' }} />
                                    <View style={{ width: '60%', alignItems: 'flex-end' }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(8), }}>Contest videos</Text>
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
                                    <View style={{ borderWidth: 1, borderColor: '#FFF', width: '55%' }} />
                                    <View style={{ width: '55%', alignItems: 'flex-end' }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(7), right: 7 }}>Contest videos</Text>
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
                                    <Text style={{ color: '#FFF', fontSize: wp(23) }}>Electronics</Text>
                                    <View style={{ borderWidth: 1, borderColor: '#FFF', width: '100%' }} />
                                    <View style={{ width: '100%', alignItems: 'flex-end' }}>
                                        <Text style={{ color: '#FFF', fontSize: wp(10), right: 10 }}>Contest videos</Text>
                                    </View>
                                </Row>
                                <Row size={60} />
                                <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button transparent style={{ top: 5 }} onPress={() => this._changeRootSwiper(1)}>
                                        <Text style={{ fontSize: wp(8), fontWeight: '700', color: '#FFF' }}>Press to continue</Text>
                                    </Button>
                                </Row>
                            </Grid>
                        </View>
                    </View>




                    {/* <ImageBackground
                        source={{ uri: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" }}
                        style={{ flex: 1 }}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
                            <Grid>
                                <Row size={30} style={{ padding: 20, flexDirection: "column", justifyContent: 'center' }}>
                                    <Text style={{ color: '#FFF', fontSize: wp(25) }}>Music</Text>
                                    <View style={{ borderWidth: 1, borderColor: '#FFF', width: '60%' }} />
                                    <View style={{ width: '60%', alignItems: 'flex-end' }}>
                                        <Text style={{ color: '#FFF', fontSize: wp(10), }}>Contest videos</Text>
                                    </View>
                                </Row>
                                <Row size={60} />
                                <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: wp(8), fontWeight: '700', color: '#FFF' }}>Swipe left for more</Text>
                                </Row>
                            </Grid>
                        </View>
                    </ImageBackground> */}

                </Swiper>

                <Swiper
                    ref={swiper => this.swiper = swiper}
                    dotStyle={{ borderColor: '#FFF', borderWidth: 1, backgroundColor: '#D81B60' }}
                    activeDotColor="#FFF"
                    paginationStyle={{ bottom: 130 }}
                    scrollEnabled={false}
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
                        <Footer style={{
                            backgroundColor: '#FFF', borderTopColor: 'rgba(0,0,0,0.0)', borderTopRightRadius: 10, borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                        }}>
                            <Button
                                onPress={() => this._changeSwiper(1)}
                                style={{
                                    flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center',
                                    shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { height: -1 }, shadowOpacity: 1,
                                    borderTopRightRadius: 10, borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                                    backgroundColor: '#FFF'
                                }}>
                                <Text allowFontScaling={false} style={{ letterSpacing: 2, fontWeight: 'bold', color: '#D81B60' }}>Next</Text>
                            </Button>
                        </Footer>
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
                        <Footer style={{
                            backgroundColor: '#FFF', borderTopColor: 'rgba(0,0,0,0.0)', borderTopRightRadius: 10, borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                        }}>
                            <Button
                                onPress={() => this._changeSwiper(1)}
                                style={{
                                    flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center',
                                    shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { height: -1 }, shadowOpacity: 1,
                                    borderTopRightRadius: 10, borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                                    backgroundColor: '#FFF'
                                }}>
                                <Text allowFontScaling={false} style={{ letterSpacing: 2, fontWeight: 'bold', color: '#D81B60' }}>Next</Text>
                            </Button>
                        </Footer>
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
                        <Footer style={{
                            backgroundColor: '#FFF', borderTopColor: 'rgba(0,0,0,0.0)', borderTopRightRadius: 10, borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                        }}>
                            <Button
                                onPress={() => this.props.navigation.navigate('Auth')}
                                style={{
                                    flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center',
                                    shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { height: -1 }, shadowOpacity: 1,
                                    borderTopRightRadius: 10, borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                                    backgroundColor: '#FFF'
                                }}>
                                <Text allowFontScaling={false} style={{ letterSpacing: 2, fontWeight: 'bold', color: '#D81B60' }}>Done</Text>
                            </Button>
                        </Footer>
                    </Container>
                </Swiper>
            </Swiper>
        ) : <IntroToAppPlaceholder />
    }
}
export default withNavigation(IntroToApp)