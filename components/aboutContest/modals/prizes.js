import React, { Component } from 'react'
import { ImageBackground, Dimensions, ScrollView } from 'react-native'
import { Video } from 'expo-av';
import { Button, Header, Left, Text, View, Body, Title, Content, Container, Right } from 'native-base'
import Swiper from 'react-native-swiper';
import { Grid, Row } from "react-native-easy-grid"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import Modal from "react-native-modal";

const { height } = Dimensions.get('window');

import { colorsPalette } from '../../global/static/colors'
import PrizeAnimation from '../../global/lottieJs/prizes'

export default class Prizes extends Component {
    constructor() {
        super();
        this.state = {
            indexSwiper: 0,
            thumbnailLoading: false
        }
    }

    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    render() {
        const { thumbnailLoading, indexSwiper } = this.state
        const { modalVisiblePrizes, _setModalVisiblePrizes, contest } = this.props
        return (
            <Modal
                style={{ justifyContent: 'flex-end', margin: 0 }}
                isVisible={modalVisiblePrizes}
                onSwipeComplete={() => { _setModalVisiblePrizes(false); this.setState({ indexSwiper: 0 }) }}
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
                            <Left>
                                <Button
                                    disabled={indexSwiper === 0 ? true : false}
                                    transparent onPress={() => this._changeSwiper(-1)}>
                                    <Text
                                        allowFontScaling={false}
                                        minimumFontScale={wp(4)}
                                        style={{ color: indexSwiper === 0 ? colorsPalette.gradientGray : colorsPalette.primaryColor, fontSize: wp(4), top: -10 }}>Back</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Title style={{ top: -10, fontSize: wp(10), color: colorsPalette.darkFont }}>Prizes</Title>
                            </Body>
                            <Right>
                                <Button
                                    disabled={indexSwiper === 2 ? true : false}
                                    transparent style={{ top: -10 }} onPress={() => this._changeSwiper(1)}>
                                    <Text allowFontScaling={false} style={{ color: indexSwiper === 2 ? colorsPalette.gradientGray : colorsPalette.primaryColor }}>Next</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Swiper
                            scrollEnabled={false}
                            ref={(swiper) => this.swiper = swiper}
                            onIndexChanged={(value) => this.setState({ indexSwiper: value })}
                            showsPagination={false}
                            pagingEnabled={true}
                            // activeDotColor="#D82B60"
                            loop={false}>
                            <Grid>
                                <Row size={60} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <PrizeAnimation />
                                </Row>
                                <Row size={40} style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(5), color: colorsPalette.darkFont }}>Hi Yank Carlos!</Text>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont, textAlign: 'center' }}>By participating in this contest you could win the following prizes!</Text>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, textAlign: 'center' }}>(Slide down to close)</Text>
                                </Row>
                            </Grid>
                            <Grid>
                                <Row size={40} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(6), color: colorsPalette.darkFont, textAlign: 'center', width: "80%" }}>Before continuing, would you like to read the contest instructions?</Text>
                                </Row>
                                <Row size={60} style={{ justifyContent: "space-evenly" }}>
                                    <Button style={{ backgroundColor: colorsPalette.primaryColor, top: 20 }}>
                                        <Text allowFontScaling={false}>YES</Text>
                                    </Button>
                                    <Button style={{ backgroundColor: colorsPalette.gradientGray, top: 20 }} onPress={() => this._changeSwiper(1)}>
                                        <Text>NO</Text>
                                    </Button>
                                </Row>
                            </Grid>
                            <Swiper
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
                        </Swiper>
                    </Container>
                </View>
            </Modal>
        )
    }
}