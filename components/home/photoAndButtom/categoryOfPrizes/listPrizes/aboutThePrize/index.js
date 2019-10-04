import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Video } from 'expo-av';
import { Container, Header, Title, Button, Left, Right, Icon, Text, Thumbnail, View, Body } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import upperFirst from 'lodash/upperFirst'
import lowerCase from 'lodash/lowerCase'
import startCase from 'lodash/startCase'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import { Grid, Row, Col } from 'react-native-easy-grid'
import truncate from "lodash/truncate";

// Colors
import { colorsPalette } from '../../../../../global/static/colors'
import { MyStatusBar } from '../../../../../global/statusBar'

// Child Components
import ModalRedeemPrize from './redeemPrize'


class AboutPrize extends Component {
    state = { pictureLoading: false, modalRedeemPrizeAction: false }

    // Modal redeem prizes
    _modalRedeemPrizeAction = () => {
        this.setState({ modalRedeemPrizeAction: !this.state.modalRedeemPrizeAction })
    }

    render() {
        const { pictureLoading, modalRedeemPrizeAction } = this.state
        const { navigation } = this.props
        const prize = navigation.getParam('prize')
        const userData = navigation.getParam('userData')
        const fromWhere = navigation.getParam('fromWhere')
        return (
            <Container>
                <Header style={{ backgroundColor: colorsPalette.primaryColor }}>
                    <Left>
                        <Button transparent onPress={() => { fromWhere === 'fromSubmitPrize' ? navigation.navigate('Home') : navigation.goBack() }}>
                            <Icon name='arrow-back' style={{ color: colorsPalette.secondaryColor }} />
                            <Text
                                minimumFontScale={wp(4)}
                                allowFontScaling={false}
                                style={{ color: colorsPalette.secondaryColor, fontSize: wp(4) }}>{upperFirst(lowerCase(prize.category))}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title
                            minimumFontScale={wp(7)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(7), color: colorsPalette.secondaryColor }}>{startCase(prize.general.nameOfPrize)}</Title>
                    </Body>
                    <Right>
                        <View style={{ padding: 2, backgroundColor: colorsPalette.secondaryColor, borderRadius: "50%" }}>
                            <Thumbnail small source={{ uri: prize.user.avatar }} />
                        </View>
                        <Button transparent onPress={() => this.props.navigation.navigate('UserProfile', { userId: prize.user.id })} style={{ position: 'absolute', width: 45, height: 45 }} />
                    </Right>
                </Header>
                <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                <Swiper loop={false}
                    activeDotColor={colorsPalette.primaryColor}
                    dotColor={colorsPalette.gradientGray}>
                    <Grid style={{ padding: 10 }}>
                        <Row size={35}>
                            <View style={{ flex: 1, shadowOpacity: 1, shadowOffset: { width: 1 }, shadowColor: colorsPalette.primaryShadowColor }}>
                                <View style={{ flex: 1, position: 'absolute', height: "100%", width: "100%", backgroundColor: '#3333' }} />
                                <Video
                                    source={{ uri: prize.general.video.url }}
                                    useNativeControls
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    shouldPlay={false}
                                    isLooping={false}
                                    style={{ width: "100%", height: "100%" }} />
                            </View>
                        </Row>
                        <Row size={5}>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Icon type="MaterialIcons" name="location-on" style={{ fontSize: wp(5), color: colorsPalette.gradientGray }} />
                                <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}>{truncate(`${prize.aboutTheCompany.businessLocation.city}, ${prize.aboutTheCompany.businessLocation.country}.`, { length: 23, separator: "..." })}</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray, right: 5 }}>Published {moment(prize.createdAt).fromNow()}</Text>
                            </View>
                        </Row>
                        <Row size={60} style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.darkFont }}>General information</Text>
                                {prize.share === null ? null
                                    : <View style={{ padding: 15, justifyContent: 'center', left: 10 }}>
                                        <View style={{ backgroundColor: '#E53935', position: 'absolute', borderRadius: "50%", padding: 6.5 }}>
                                            <Text
                                                minimumFontScale={wp(2.5)}
                                                allowFontScaling={false}
                                                style={{ fontWeight: 'bold', color: '#FFF', fontSize: wp(2.5) }}>{startCase(prize.share && prize.share.contentUserShare)}</Text>
                                        </View>
                                    </View>}
                            </View>
                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.darkFont }}>{prize.aboutTheCompany.generalInformation}</Text>
                        </Row>
                    </Grid>
                    <Grid style={{ padding: 10 }}>
                        <Row size={35}>
                            <View style={{ flex: 1, shadowOpacity: 1, shadowOffset: { width: 1 }, shadowColor: colorsPalette.primaryShadowColor }}>
                                <Image
                                    onLoadStart={() => this.setState({ pictureLoading: true })}
                                    onLoadEnd={() => this.setState({ pictureLoading: false })}
                                    style={{ width: "100%", height: '100%' }}
                                    source={{ uri: prize.general.picture.url }} />
                            </View>
                        </Row>
                        <Row size={5}>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(5), color: colorsPalette.errColor }}>Price: {prize.general.price}</Text>
                            </View>
                        </Row>
                        <Row size={40} style={{ flexDirection: 'column' }}>
                            {prize.share === null
                                ? <Grid>
                                    <Col>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.darkFont, alignSelf: 'center' }}>Description</Text>
                                        <ScrollView>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.darkFont, textAlign: 'center' }}>{prize.general.description}</Text>
                                        </ScrollView>
                                    </Col>
                                </Grid>
                                : <Grid>
                                    <Col style={{ padding: 2 }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.darkFont, alignSelf: 'center' }}>Description</Text>
                                        <ScrollView>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.darkFont, textAlign: 'center' }}>{prize.general.description}</Text>
                                        </ScrollView>
                                    </Col>
                                    <Col style={{ padding: 2 }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.darkFont, alignSelf: 'center' }}>What to do</Text>
                                        <ScrollView>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.darkFont, textAlign: 'center' }}>{prize.share.whatUserDo}</Text>
                                        </ScrollView>
                                    </Col>
                                </Grid>}
                        </Row>
                        <Row size={20} style={{ justifyContent: 'center' }}>
                            <Button
                                onPress={() => this._modalRedeemPrizeAction()}
                                style={{ backgroundColor: '#D81B60', width: '80%', justifyContent: 'center', top: 10 }}>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ letterSpacing: 2, fontWeight: 'bold', fontSize: wp(4) }}>Redeem Prize</Text>
                            </Button>
                        </Row>
                        <ModalRedeemPrize
                            // Data
                            userData={userData}
                            prize={prize}

                            // Actions
                            modalRedeemPrizeAction={modalRedeemPrizeAction}

                            // Functions
                            _modalRedeemPrizeAction={this._modalRedeemPrizeAction} />
                    </Grid>
                </Swiper>
            </Container>
        );
    }
}

export default withNavigation(AboutPrize)