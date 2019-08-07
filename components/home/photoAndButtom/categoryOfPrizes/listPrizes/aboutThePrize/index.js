import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native'
import { Video } from 'expo';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Thumbnail, View, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import _ from 'lodash'
import Swiper from 'react-native-swiper'
import moment from 'moment'

// Icons
import { Entypo } from '@expo/vector-icons'

const screenHeight = Dimensions.get('window').height

export default class AboutPrize extends Component {
    state = { pictureLoading: false }

    render() {
        const { pictureLoading } = this.state
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
                            <Text style={{ left: 5, color: "#D81B60" }}>{_.upperFirst(_.lowerCase(prize.category))}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontSize: wp(8), color: '#D81B60' }}>{_.startCase(prize.general.nameOfPrize)}</Title>
                    </Body>
                    <Right>
                        <Thumbnail small source={{ uri: prize.user.avatar }} />
                    </Right>
                </Header>
                <View style={{ padding: 15, shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { height: 5 }, shadowOpacity: 1, backgroundColor: '#F5F5F5' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: wp(10), color: '#D81B60', fontWeight: '400' }}>About the prize</Text>
                        <Text style={{ fontSize: wp(4), color: '#F44336', top: 15 }}>
                            {_.replace(_.replace(_.startCase(_.lowerCase(_.replace(prize.general.price, new RegExp("_", "g"), " "))), new RegExp("P", "g"), ""), '0 ', "0$ - ")}$
                    </Text>
                    </View>
                    <Text style={{ color: '#3333', fontSize: wp(4.5), fontWeight: '100' }}>
                        This prize was published at <Text style={{ color: '#3333', fontWeight: 'bold' }}>{moment(prize.createdAt).fromNow()}</Text>, by user <Text style={{ color: '#3333', fontWeight: 'bold' }}>{prize.user.name}</Text>.
                    </Text>
                </View>
                <Content contentContainerStyle={{ backgroundColor: '#FFF', top: 10 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                        <Entypo name="bookmark" style={{ fontSize: wp(10), color: '#D81B60' }} />
                        <Text style={{ color: '#333', fontSize: wp(4.5), fontWeight: '100', textAlign: 'center' }}>
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
                        <Text style={{ fontSize: wp(10), color: '#D81B60', fontWeight: '400' }}>Instructions</Text>
                        <Text style={{ color: '#333', fontSize: wp(4.5), fontWeight: '100' }}>
                            {prize.general.instructions}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: '#F5F5F5', height: screenHeight, position: 'absolute', width: '100%', bottom: -screenHeight }} />
                </Content>
            </Container>
        );
    }
}