import React, { Component } from 'react';
import { FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Video } from 'expo-av';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Button, Icon, Thumbnail, View, Title } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import UserAvatar from "react-native-user-avatar"
import ModalAnimated from 'react-native-modal'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import values from 'lodash/values';

// Colors
import { colorsPalette } from '../../../global/static/colors'

// Child Components
import PChart from './charts/PChart'
import PChartByUser from './charts/PChartByUser'

class ViewsVideo extends Component {

    state = { userInfo: { dataVideo: [] } }

    _closeAllModalsAndGoToProfileUser = (item) => {
        const { _usersViewsVideoModal, _modalVisibleShowStatistics, navigation } = this.props
        _usersViewsVideoModal(false)
        setTimeout(() => {
            _modalVisibleShowStatistics(false);
            navigation.navigate("UserProfile", { userId: item.idUserView })
        }, 500);
    }

    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    render() {
        const {
            // Data
            userInfo,

            // Actions
            modalAnimated
        } = this.state
        const {
            // Data
            contest,
            userData,

            // Functions
            _usersViewsVideoModal
        } = this.props
        const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const result = _(userInfo.dataVideo.map(item => ({ day: `${DAYS[new Date(JSON.parse(item).createdAt).getDay()]}`, timeElapsed: JSON.parse(item).positionMillis }))).groupBy('day').values().map(
            (group) => ({ ...group[0], repeat: group.length, group })
        );
        return (
            <Swiper
                activeDotColor={colorsPalette.primaryColor}
                dotColor={colorsPalette.gradientGray}
                ref={r => this.swiper = r}
                loop={false}>
                <Container>
                    <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                        <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Button transparent onPress={() => _usersViewsVideoModal(false)}>
                                <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Close</Text>
                            </Button>
                            <Title allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(4.5) }}>Views promotional video</Title>
                        </Left>
                    </Header>
                    <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
                        <View style={{ flex: 0.4 }}>
                            <Video
                                ref={r => this.videoRef = r}
                                source={{ uri: contest.general.video.url }}
                                useNativeControls={true}
                                usePoster={true}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay={true}
                                isLooping={false}
                                style={{ width: "100%", height: "100%" }} />
                        </View>
                        <View style={{ flex: 0.1, padding: 5 }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.gradientGray, top: 10, width: '95%', left: 10 }}>
                                Percentage of times a user has left or finished watching the video. The percentage indicates where the video has ended, the total duration of the video is 100%.
                                </Text>
                        </View>
                        <View style={{ flex: 0.4 }}>
                            <PChart viewsVideo={contest.viewsVideo} />
                        </View>
                        <View style={{ flex: 0.1, padding: 10 }}>
                            <Text allowFontScaling={false} style={{ alignSelf: 'center', top: -10, fontSize: wp(3.5), color: colorsPalette.darkFont, fontWeight: 'bold' }}>Total viwes: {contest.viewsVideo.items.length} <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.darkFont, fontWeight: 'normal' }}>(It is calculated by user).</Text></Text>
                        </View>
                    </Content>
                </Container>
                <Container>
                    <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                        <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Button transparent onPress={() => this._changeSwiper(-1)}>
                                <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Back</Text>
                            </Button>
                        </Left>
                    </Header>
                    <Content padder>
                        <Text allowFontScaling style={{ color: colorsPalette.gradientGray, fontSize: wp(4), width: "80%" }}>List of users who view your promotional video - Press and hold for more information.</Text>
                        <FlatList
                            data={contest.viewsVideo && contest.viewsVideo.items}
                            renderItem={({ item }) => (
                                <List>
                                    <ListItem avatar
                                        onPress={() => this._closeAllModalsAndGoToProfileUser(item)}
                                        onLongPress={() => this.setState({ modalAnimated: true, userInfo: item })} underlayColor={colorsPalette.secondaryColor}>
                                        <Left>
                                            {item.avatar !== null
                                                ? <Thumbnail source={{ uri: item.avatar }} />
                                                : <UserAvatar size="55" name={item.name} />}
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false}>{userData.id === item.idUserView ? "You" : item.name}</Text>
                                            <Text note allowFontScaling={false} style={{ fontWeight: 'normal', fontSize: wp(3) }}>
                                                Visualized your video {item.dataVideo.length} times. Press and hold for more information.
                                            </Text>
                                        </Body>
                                    </ListItem>
                                </List>
                            )}
                            keyExtractor={items => items.createdAt} />
                    </Content>
                    {/* MODAL PARA MOSTRAR TODA LA INFORMACION DEL USUARIO */}
                    {Object.keys(userInfo).length !== 0 ?
                        <ModalAnimated
                            isVisible={modalAnimated}
                            onSwipeComplete={() => this.setState({ modalAnimated: false })}
                            swipeDirection={['left', 'right', 'down']}
                            style={{ justifyContent: 'flex-end', margin: 0 }}>
                            <View style={{
                                backgroundColor: colorsPalette.secondaryColor,
                                padding: 15,
                                justifyContent: 'center',
                                borderRadius: 4,
                                borderColor: 'rgba(0, 0, 0, 0.3)',
                                height: 650
                            }}>
                                <ListItem
                                    avatar
                                    underlayColor={colorsPalette.secondaryColor}>
                                    <Left>
                                        {userInfo.avatar !== null
                                            ? <Thumbnail source={{ uri: userInfo.avatar }} />
                                            : <UserAvatar size="55" name={userInfo.name} />}
                                    </Left>
                                    <Body style={{ borderBottomColor: colorsPalette.transparent }}>
                                        <Text allowFontScaling={false}>{userData.id === userInfo.idUserView ? "You" : userInfo.name}</Text>
                                        <Text note allowFontScaling={false} style={{ fontWeight: 'normal' }}>
                                            Visualized your video {userInfo.dataVideo.length} times.
                                    </Text>
                                    </Body>
                                </ListItem>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 0.5 }}>
                                        <PChartByUser userInfo={userInfo} />
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <View style={{ flex: 0.1 }}>
                                            <Text allowFontScaling={false} style={{ alignSelf: 'center', fontSize: wp(4) }}>Time elapsed</Text>
                                        </View>
                                        <View style={{ flex: 0.9 }}>
                                            <Text allowFontScaling={false} style={{ alignSelf: 'center', fontSize: wp(3), color: colorsPalette.gradientGray, top: -3 }}>Use two fingers to swipe down</Text>
                                            <Content>
                                                {JSON.parse(JSON.stringify(result)).map((items, key) =>
                                                    <Text allowFontScaling={false} style={{ fontSize: wp(4), fontWeight: 'bold' }} key={key}>
                                                        {key + 1}. {items.day}: <Text allowFontScaling={false} style={{ fontSize: wp(4), fontWeight: 'normal' }}>Viewed {items.group.length} times: {items.group.map((item, i) => i + 1 === items.group.length ? `${new Date(1000 * Math.round(item.timeElapsed / 1000)).getUTCMinutes()}:${new Date(1000 * Math.round(item.timeElapsed / 1000)).getUTCSeconds()}.` : `${new Date(1000 * Math.round(item.timeElapsed / 1000)).getUTCMinutes()}:${new Date(1000 * Math.round(item.timeElapsed / 1000)).getUTCSeconds()}, `)}</Text>
                                                    </Text>
                                                )}
                                            </Content>
                                        </View>
                                    </View>
                                </View>
                                <Button style={{ alignSelf: 'center', backgroundColor: colorsPalette.primaryColor, margin: 5 }} small onPress={() => this.setState({ modalAnimated: false })}>
                                    <Text allowFontScaling={false}>CLOSE</Text>
                                </Button>
                            </View>
                        </ModalAnimated> : null}
                </Container>
            </Swiper>
        );
    }
}

export default withNavigation(ViewsVideo)