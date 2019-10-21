import React, { Component } from 'react';
import { Dimensions, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Video } from 'expo-av';
import { Container, Header, Title, Button, Left, Right, Body, Text, View, List, ListItem, Thumbnail, Root } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import moment from 'moment';
import ModalAnimated from 'react-native-modal'
import UserAvatar from "react-native-user-avatar"
import PureChart from 'react-native-pure-chart';

const screenWidth = Dimensions.get('screen').width

// Colors
import { colorsPalette } from '../../../../global/static/colors'

class ViewsVideos extends Component {
    state = {
        modalUsers: false,
        dataUserShow: {},
        dataGraphAllViews: [{ x: '0', y: 0 }],
        durationInVideoData: [{
            seriesName: 'ageRange',
            color: "#9E9E9E",
            data: [
                { x: "13-17", y: 19 },
                { x: "18-24", y: 87 },
                { x: "25-34", y: 32 },
                { x: "35-44", y: 55 },
                { x: "45-54", y: 8 },
                { x: "55-64", y: 12 },
                { x: "65+", y: 6 },
            ]
        }],
        dataGraphAllViewsUsers: [{ x: '0', y: 0 }],
        durationInVideoDataUsers: [{
            seriesName: 'ageRange',
            color: "#9E9E9E",
            data: [
                { x: "13-17", y: 19 },
                { x: "18-24", y: 87 },
                { x: "25-34", y: 32 },
                { x: "35-44", y: 55 },
                { x: "45-54", y: 8 },
                { x: "55-64", y: 12 },
                { x: "65+", y: 6 },
            ]
        }],
    }

    componentDidMount() {
        const { item } = this.props

        // --------------------------------------------- ALL VIEWS --------------------------------------------------
        const dateAllViews = item.viewsParticipants.items && item.viewsParticipants.items.map(items => ({ date: moment(items.createdAt).format('l') }))
        const dataAllViews = _(dateAllViews).map(item => ({ x: item.date })).groupBy('x').values().map((group) => ({ ...group[0], y: group.length }));
        let dataGraphAllViews = [{ color: colorsPalette.primaryColor, data: JSON.parse(JSON.stringify(dataAllViews)) }]

        // --------------------------------------------- DURATION IN MILILS --------------------------------------------------
        const stoppedMillis = item.viewsParticipants.items && item.viewsParticipants.items.map(items =>
            items.positionMillis <= this._getPorcentageOfNum(items.durationMillis, 20)
                ? "0%-20%" : items.positionMillis >= this._getPorcentageOfNum(items.durationMillis, 20) && items.positionMillis <= this._getPorcentageOfNum(items.durationMillis, 40)
                    ? "20%-40%" : items.positionMillis >= this._getPorcentageOfNum(items.durationMillis, 40) && items.positionMillis <= this._getPorcentageOfNum(items.durationMillis, 80)
                        ? "40%-80%" : items.positionMillis >= this._getPorcentageOfNum(items.durationMillis, 80) && "80%-100%")
        const dataGraphDurationMillis = _(stoppedMillis)
            .map(item => ({ x: item }))
            .groupBy('x')
            .values()
            .map((group) => ({ ...group[0], y: group.length }));

        // ------------------------------------------------------------ USER VIEWS ---------------------------------------------------------------------------------------
        const usersViews = _(item.viewsParticipants.items && item.viewsParticipants.items.map(item => ({
            id: item.idUserView,
            durationMillis: item.durationMillis,
            positionMillis: item.positionMillis,
            users: {
                id: item.idUserView,
                name: item.name,
                avatar: item.avatar,
                createdAt: item.createdAt,
            }
        })))
            .groupBy('id').values().map((group) => ({ ...group[0], count: group.length, group }));

        this.setState({
            usersViews: JSON.parse(JSON.stringify(usersViews)),
            dataGraphAllViews,
            durationInVideoData: [{
                seriesName: 'ageRange',
                color: colorsPalette.primaryColor,
                data: JSON.parse(JSON.stringify(dataGraphDurationMillis))
            }],
        })
    }

    _getPorcentageOfNum = (num, amount) => {
        return num * amount / 100;
    }

    _showDataPerUser = (item) => {
        // --------------------------------------------- ALL VIEWS USERS --------------------------------------------------
        const dateAllViews = item.group.map(items => ({ date: moment(items.users.createdAt).format('l') }))
        const dataAllViews = _(dateAllViews).map(item => ({ x: item.date })).groupBy('x').values().map((group) => ({ ...group[0], y: group.length }));
        let dataGraphAllViewsUsers = [{ color: colorsPalette.primaryColor, data: JSON.parse(JSON.stringify(dataAllViews)) }]

        // --------------------------------------------- DURATION IN MILILS USERS --------------------------------------------------
        const stoppedMillis = item.group.map(items =>
            items.positionMillis <= this._getPorcentageOfNum(items.durationMillis, 20)
                ? "0%-20%" : items.positionMillis >= this._getPorcentageOfNum(items.durationMillis, 20) && items.positionMillis <= this._getPorcentageOfNum(items.durationMillis, 40)
                    ? "20%-40%" : items.positionMillis >= this._getPorcentageOfNum(items.durationMillis, 40) && items.positionMillis <= this._getPorcentageOfNum(items.durationMillis, 80)
                        ? "40%-80%" : items.positionMillis >= this._getPorcentageOfNum(items.durationMillis, 80) && "80%-100%")
        const dataGraphDurationMillis = _(stoppedMillis)
            .map(items => ({ x: items }))
            .groupBy('x')
            .values()
            .map((group) => ({ ...group[0], y: group.length }));

        this.setState({
            dataUserShow: item,
            dataGraphAllViewsUsers,
            durationInVideoDataUsers: [{
                seriesName: 'ageRange',
                color: colorsPalette.primaryColor,
                data: JSON.parse(JSON.stringify(dataGraphDurationMillis))
            }],
        })
    }


    render() {
        const userData = this.props.navigation.getParam('userData')
        const { durationInVideoData, durationInVideoDataUsers, dataGraphAllViews, dataGraphAllViewsUsers, usersViews, modalUsers, dataUserShow } = this.state
        const { item } = this.props
        return (
            <Swiper
                activeDotColor={colorsPalette.primaryColor}
                dotColor={colorsPalette.gradientGray}
                ref={r => this.swiper = r}
                loop={false}>
                <Container>
                    <Grid>
                        <Row size={40}>
                            <View style={{ backgroundColor: '#3333', height: "100%", width: "100%", position: 'absolute', alignSelf: 'center' }} />
                            <Video
                                source={{ uri: item.video && item.video.url }}
                                useNativeControls={true}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay={false}
                                isLooping={false}
                                style={{ width: "100%", height: "100%", alignSelf: 'center' }} />
                        </Row>
                        <Row size={5} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.darkFont, fontWeight: 'bold' }}>Views are listed by days</Text>
                        </Row>
                        <Row size={35}>
                            <View style={{ width: screenWidth }}>
                                <PureChart data={dataGraphAllViews} type="line" height={180} />
                            </View>
                        </Row>
                        <Row size={10} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ alignSelf: 'center', fontSize: wp(3.5), color: colorsPalette.darkFont, top: -20 }}>Total viwes: {item.viewsParticipants.items && item.viewsParticipants.items.length}.</Text>
                        </Row>
                    </Grid>
                </Container>

                <Container>
                    <Grid>
                        <Row size={10} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Stopped video</Text>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>Sampling of the estimated time in the video (0% - 100% Video length)</Text>
                        </Row>
                        <Row size={40}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", left: 15 }}>
                                <PureChart data={durationInVideoData} type="bar" height={150} />
                            </View>
                        </Row>
                        <Row size={50} style={{ flexDirection: 'column' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), alignSelf: 'center', textAlign: 'center' }}>Users are listed by the number of views they have made</Text>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5), alignSelf: 'center' }}>Press and hold for more information</Text>
                            <FlatList
                                data={usersViews && usersViews.sort((a, b) => (a.count < b.count) ? 1 : -1)}
                                renderItem={({ item }) => (
                                    <View>
                                        <List>
                                            <ListItem avatar onPress={() => { this.setState({ modalUsers: true }); this._showDataPerUser(item) }}>
                                                <Left>
                                                    {item.users.avatar !== null
                                                        ? <Thumbnail small source={{ uri: item.users.avatar }} />
                                                        : <UserAvatar size="35" name={item.users.name} />}
                                                </Left>
                                                <Body style={{ top: 5 }}>
                                                    <Text allowFontScaling={false}>{userData.id === item.users.idUserComments ? "You" : item.users.name}</Text>
                                                    <Text allowFontScaling={false} note style={{ fontSize: wp(3.5), fontWeight: 'normal', color: "#3333" }}>This user has watched the video {item.count} times.</Text>
                                                </Body>
                                            </ListItem>
                                        </List>
                                    </View>
                                )}
                                keyExtractor={item => JSON.stringify(item)} />
                        </Row>
                        <ModalAnimated
                            onSwipeComplete={() => this.setState({ modalUsers: false })}
                            swipeDirection={['down']}
                            isVisible={modalUsers}
                            style={{ justifyContent: 'flex-end', margin: 0 }}>
                            <Root>
                                <View style={{
                                    backgroundColor: colorsPalette.secondaryColor,
                                    justifyContent: 'center',
                                    borderTopStartRadius: 10,
                                    borderTopEndRadius: 10,
                                    borderColor: 'rgba(0, 0, 0, 0.3)',
                                    flex: 1,
                                    minHeight: 600,
                                    maxHeight: 600,
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%'
                                }}>
                                    <Container style={{ borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
                                        <Header style={{ backgroundColor: colorsPalette.secondaryColor, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                                            <Left>
                                                <Button transparent
                                                    onPress={() => { this.setState({ modalUsers: false }) }}>
                                                    <Text
                                                        allowFontScaling={false}
                                                        minimumFontScale={wp(4)}
                                                        style={{ color: colorsPalette.primaryColor, fontSize: wp(4), top: -10 }}>Close</Text>
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Title style={{ top: -10 }}>About the user</Title>
                                            </Body>
                                            <Right />
                                        </Header>
                                        <Grid>
                                            <Row size={10} style={{ flexDirection: 'column' }}>
                                                {Object.keys(dataUserShow).length !== 0 ?
                                                    <List>
                                                        <ListItem thumbnail>
                                                            <Left>
                                                                <Thumbnail source={{ uri: dataUserShow.users.avatar }} />
                                                            </Left>
                                                            <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                                <Text>{dataUserShow.users.name}</Text>
                                                                <Text allowFontScaling={false} note style={{ fontSize: wp(3), fontWeight: 'normal', color: "#3333" }}>This user has watched the video {dataUserShow.count} times.</Text>
                                                            </Body>
                                                        </ListItem>
                                                    </List>
                                                    : null}
                                            </Row>
                                            <Row size={5} style={{ flexDirection: 'column' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(3.5), alignSelf: 'center', textAlign: 'center' }}>Views are listed by days</Text>
                                            </Row>
                                            <Row size={42.5}>
                                                <View style={{ width: screenWidth }}>
                                                    <PureChart data={dataGraphAllViewsUsers} type="line" height={180} />
                                                </View>
                                            </Row>
                                            <Row size={42.5} style={{ flexDirection: 'column' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(3.5), alignSelf: 'center', textAlign: 'center', top: -10 }}>Stopped video</Text>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", left: 15 }}>
                                                    <PureChart data={durationInVideoDataUsers} type="bar" height={150} />
                                                </View>
                                            </Row>
                                        </Grid>
                                    </Container>
                                </View>
                            </Root>
                        </ModalAnimated>

                    </Grid>
                </Container>
            </Swiper>
        );
    }
}

export default withNavigation(ViewsVideos)