import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Video } from 'expo-av';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Thumbnail, View, Spinner, Footer } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import upperFirst from 'lodash/upperFirst'
import lowerCase from 'lodash/lowerCase'
import startCase from 'lodash/startCase'
import Swiper from 'react-native-swiper'
import moment from 'moment'

// Colors
import { colorsPalette } from '../../../../../global/static/colors'

// Child Components
import ModalRedeemPrize from './redeemPrize'

const screenHeight = Dimensions.get('window').height

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
            <Container style={{ backgroundColor: '#F5F5F5' }}>
                <View style={{ backgroundColor: '#FFF', height: screenHeight, position: 'absolute', width: '100%', top: 0 }} />
                <Header style={{ backgroundColor: '#F5F5F5', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <Left>
                        <Button transparent onPress={() => { fromWhere === 'fromSubmitPrize' ? navigation.navigate('Home') : navigation.goBack() }}>
                            <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                            <Text
                                minimumFontScale={wp(4)}
                                allowFontScaling={false}
                                style={{ left: 5, color: "#D81B60", fontSize: wp(4) }}>{upperFirst(lowerCase(prize.category))}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title
                            minimumFontScale={wp(7)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(7), color: '#D81B60' }}>{startCase(prize.general.nameOfPrize)}</Title>
                    </Body>
                    <Right>
                        <Thumbnail small source={{ uri: prize.user.avatar }} />
                        <Button transparent onPress={() => this.props.navigation.navigate('UserProfile', { userId: prize.user.id })} style={{ position: 'absolute', width: 45, height: 45 }} />
                    </Right>
                </Header>
                <View style={{ padding: 15, shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { height: 5 }, shadowOpacity: 1, backgroundColor: '#F5F5F5' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            minimumFontScale={wp(9)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(9), color: '#D81B60', fontWeight: '400' }}>About the prize</Text>
                        <Text
                            minimumFontScale={wp(3)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(3), color: '#F44336', top: 15 }}>
                            {prize.general.price} Points
                    </Text>
                    </View>
                    <Text
                        minimumFontScale={wp(3.5)}
                        allowFontScaling={false}
                        style={{ color: '#3333', fontSize: wp(3.5), fontWeight: '100' }}>
                        This prize was published at <Text style={{ color: '#3333', fontWeight: 'bold' }}>{moment(prize.createdAt).fromNow()}</Text>, by user <Text style={{ color: '#3333', fontWeight: 'bold' }}>{prize.user.name}</Text>.
                    </Text>
                </View>
                <Content contentContainerStyle={{ backgroundColor: '#FFF', top: 10 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                        <Icon type="Entypo" name="bookmark" style={{ fontSize: wp(10), color: '#D81B60' }} />
                        <Text
                            minimumFontScale={wp(3.5)}
                            allowFontScaling={false}
                            style={{ color: '#333', fontSize: wp(3.5), fontWeight: '100', textAlign: 'center' }}>
                            {prize.general.description}
                        </Text>
                    </View>
                    <Swiper style={{ height: 250 }} loop={false} activeDotColor="#D81B60">
                        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner color="#333" size="large" animating={pictureLoading} hidesWhenStopped={pictureLoading} style={{ position: 'absolute' }} />
                            <Image
                                onLoadStart={() => this.setState({ pictureLoading: true })}
                                onLoadEnd={() => this.setState({ pictureLoading: false })}
                                style={{ width: "100%", height: '100%' }}
                                source={{ uri: prize.general.picture.url }} />
                        </View>
                        <View style={{ height: 200 }}>
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
                    </Swiper>

                    <View style={{ padding: 15, shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { height: -5 }, shadowOpacity: 1, backgroundColor: '#F5F5F5', }}>
                        <Text
                            minimumFontScale={wp(9)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(9), color: '#D81B60', fontWeight: '400' }}>Instructions</Text>
                        <View style={{ padding: 15, justifyContent: 'center' }}>
                            <View style={{ backgroundColor: '#E53935', position: 'absolute', borderRadius: "50%", padding: 6.5 }}>
                                <Text
                                    minimumFontScale={wp(2.5)}
                                    allowFontScaling={false}
                                    style={{ fontWeight: 'bold', color: '#FFF', fontSize: wp(2.5) }}>{startCase(prize.general.instructions.typeContentInstructionsValue)}</Text>
                            </View>
                        </View>
                        <Text
                            minimumFontScale={wp(3.5)}
                            allowFontScaling={false}
                            style={{ color: '#333', fontSize: wp(3.5), fontWeight: '100' }}>
                            {prize.general.instructions.msg}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: '#F5F5F5', height: screenHeight, position: 'absolute', width: '100%', bottom: -screenHeight }} />
                </Content>
                <Footer style={{ backgroundColor: '#F5F5F5', borderTopColor: 'rgba(0,0,0,0.0)', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        onPress={() => this._modalRedeemPrizeAction()}
                        style={{ backgroundColor: '#D81B60', width: '60%', alignSelf: 'center', height: '70%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            minimumFontScale={wp(4)}
                            allowFontScaling={false}
                            style={{ letterSpacing: 2, fontWeight: 'bold', fontSize: wp(4) }}>Redeem Prize</Text>
                    </Button>
                </Footer>
                <ModalRedeemPrize
                    // Data
                    userData={userData}
                    prize={prize}

                    // Actions
                    modalRedeemPrizeAction={modalRedeemPrizeAction}

                    // Functions
                    _modalRedeemPrizeAction={this._modalRedeemPrizeAction} />
            </Container>
        );
    }
}

export default withNavigation(AboutPrize)