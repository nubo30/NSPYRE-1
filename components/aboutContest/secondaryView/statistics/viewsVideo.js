import React, { Component } from 'react';
import { FlatList, ScrollView, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Video } from 'expo-av';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Button, Icon, Thumbnail, View, Title, Root, Right } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import UserAvatar from "react-native-user-avatar"
import ModalAnimated from 'react-native-modal'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import { BarChart, LineChart } from 'react-native-chart-kit'
import values from 'lodash/values';
import { Grid, Row } from 'react-native-easy-grid'
import moment from 'moment'

const screenWidth = Dimensions.get('screen').width

// Colors
import { colorsPalette } from '../../../global/static/colors'

let less20 = 0
let between20_40 = 0
let between40_80 = 0
let between80_100 = 0

let less20User = 0
let between20_40User = 0
let between40_80User = 0
let between80_100User = 0


class ViewsVideo extends Component {

    state = {
        modalUsers: false,
        userInfo: { dataVideo: [] },
        heightView: false,
        dataListByDay: [],
        clearDaysCount: [],
        usersViews: [],
        dataPerUSers: {},
        dataUserShow: [],
        durationInVideoData: {
            labels: ['0% - 20%', '20% - 40%', '40% - 80%', '80% - 100%'],
            datasets: [{
                data: [0, 0, 0, 0],
                color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                strokeWidth: 2 // optional
            }]
        },
        durationInVideoDataUser: {
            labels: ['0% - 20%', '20% - 40%', '40% - 80%', '80% - 100%'],
            datasets: [{
                data: [0, 0, 0, 0],
                color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                strokeWidth: 2 // optional
            }]
        }
    }

    componentDidMount() {
        const { contest } = this.props
        const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let startDay = new Date(new Date(contest.timer.start).getFullYear(), new Date(contest.timer.start).getMonth(), new Date(contest.timer.start).getDate());
        let endDay = new Date(new Date(contest.timer.end).getFullYear(), new Date(contest.timer.end).getMonth(), new Date(contest.timer.end).getDate());
        let weekdays = [] // Días de la semana
        let arrayNumberdays = []
        while (startDay <= endDay) {
            weekdays.push(DAYS[startDay.getDay()])
            startDay = new Date(startDay.getTime() + (24 * 60 * 60 * 1000)); // Días en formato date
            arrayNumberdays.push(startDay.getDate()); // Días en formato date        
        }
        const map = contest.viewsVideo.items && contest.viewsVideo.items
            .map(item => new Date(item.createdAt).getDate())
            .map(item => item)
            .reduce((prev, cur) => { prev[cur] = (prev[cur] || 0) + 1; return prev; }, {});
        const check = Object.entries(map).map((e) => ({ [e[0]]: e[1] }));
        const list = arrayNumberdays.map((item) => ({ [item]: 0 }))
        const updateList = check.reduce((acc, val) => {
            const key = Object.keys(val)[0];
            if (!acc[key]) acc[key] = 0
            acc[key] = acc[key] + val[key]
            return acc
        }, {})
        const dataToConvertToArrayOfString = list.map((val) => {
            var key = Object.keys(val)[0];
            return { [key]: val[key] + (updateList[key] || 0) }
        })
        const dataShowInTheGraph = dataToConvertToArrayOfString.map(item => (Object.values(item)[0]))

        const DAYSVIEWS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const daysCount = _(contest.viewsVideo.items && contest.viewsVideo.items.map(item => ({ day: `${DAYSVIEWS[new Date(item.createdAt).getDay()]}`, formatDate: moment(item.createdAt).format('L') })))
            .groupBy('day').values().map((group) => ({ ...group[0], count: group.length }));
        const clearDaysCount = JSON.parse(JSON.stringify(daysCount)).map(item => ({ day: item.day, count: item.count, formatDate: item.formatDate }))
        const dataListByDay = {
            labels: weekdays,
            datasets: [
                {
                    data: dataShowInTheGraph
                }
            ]
        };

        // ------------------------------------------------------------------ DURARION IN THE VIDEO ----------------------------------------------------------------------------
        contest.viewsVideo.items && contest.viewsVideo.items.map(item => {
            if (item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 20)) {
                less20++ + 1
            } else if (item.positionMillis >= this._getPorcentageOfNum(item.durationMillis, 20) && item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 40)) {
                between20_40++ + 1
            } else if (item.positionMillis >= this._getPorcentageOfNum(item.durationMillis, 40) && item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 80)) {
                between40_80++ + 1
            } else if (item.positionMillis >= this._getPorcentageOfNum(item.durationMillis, 80) && item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 100)) {
                between80_100++ + 1
            }
        })

        // --------------------------------------------------------------------  VIEWS POR AUSUARIOS ------------------------------------------------------------------------------
        const usersViews = _(contest.viewsVideo.items && contest.viewsVideo.items.map(item => ({
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
            usersViews,
            clearDaysCount,
            dataListByDay,
            durationInVideoData: {
                labels: ['0% - 20%', '20% - 40%', '40% - 80%', '80% - 100%'],
                datasets: [{
                    data: [less20, between20_40, between40_80, between80_100],
                    color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                    strokeWidth: 2 // optional
                }]
            }
        })

    }

    _showDataPerUser = (item) => {
        const { contest } = this.props
        const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let startDay = new Date(new Date(contest.timer.start).getFullYear(), new Date(contest.timer.start).getMonth(), new Date(contest.timer.start).getDate());
        let endDay = new Date(new Date(contest.timer.end).getFullYear(), new Date(contest.timer.end).getMonth(), new Date(contest.timer.end).getDate());
        let weekdays = [] // Días de la semana
        let arrayNumberdays = []
        while (startDay <= endDay) {
            weekdays.push(DAYS[startDay.getDay()])
            startDay = new Date(startDay.getTime() + (24 * 60 * 60 * 1000)); // Días en formato date
            arrayNumberdays.push(startDay.getDate()); // Días en formato date        
        }
        const map = JSON.parse(JSON.stringify(item.group))
            .map(item => new Date(item.users.createdAt).getDate())
            .map(item => item)
            .reduce((prev, cur) => { prev[cur] = (prev[cur] || 0) + 1; return prev; }, {});
        const check = Object.entries(map).map((e) => ({ [e[0]]: e[1] }));
        const list = arrayNumberdays.map((item) => ({ [item]: 0 }))
        const updateList = check.reduce((acc, val) => {
            const key = Object.keys(val)[0];
            if (!acc[key]) acc[key] = 0
            acc[key] = acc[key] + val[key]
            return acc
        }, {})
        const dataToConvertToArrayOfString = list.map((val) => {
            var key = Object.keys(val)[0];
            return { [key]: val[key] + (updateList[key] || 0) }
        })
        const dataShowInTheGraph = dataToConvertToArrayOfString.map(item => (Object.values(item)[0]))

        const dataPerUSers = {
            labels: weekdays,
            datasets: [
                {
                    data: dataShowInTheGraph
                }
            ]
        };

        item.group.map(item => {
            if (item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 20)) {
                less20User++ + 1
            } else if (item.positionMillis >= this._getPorcentageOfNum(item.durationMillis, 20) && item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 40)) {
                between20_40User++ + 1
            } else if (item.positionMillis >= this._getPorcentageOfNum(item.durationMillis, 40) && item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 80)) {
                between40_80User++ + 1
            } else if (item.positionMillis >= this._getPorcentageOfNum(item.durationMillis, 80) && item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 100)) {
                between80_100User++ + 1
            }
        })
        this.setState({
            dataUserShow: item,
            dataPerUSers,
            durationInVideoDataUser: {
                labels: ['0% - 20%', '20% - 40%', '40% - 80%', '80% - 100%'],
                datasets: [{
                    data: [less20User, between20_40User, between40_80User, between80_100User],
                    color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                    strokeWidth: 2 // optional
                }]
            }
        })
    }

    _getPorcentageOfNum = (num, amount) => {
        return num * amount / 100;
    }



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

    _graphToClear = () => {
        less20User = 0
        between20_40User = 0
        between40_80User = 0
        between80_100User = 0
    }

    render() {
        const {
            // Data
            clearDaysCount,
            dataListByDay,
            durationInVideoData,
            usersViews,
            dataUserShow,
            durationInVideoDataUser,
            dataPerUSers,

            // Actions
            modalUsers,
            heightView
        } = this.state
        const {
            // Data
            contest,
            userData,

            // Functions
            _usersViewsVideoModal
        } = this.props

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
                    <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
                        <Grid>
                            <Row size={40}>
                                <View style={{ backgroundColor: '#3333', height: "100%", width: "100%", position: 'absolute', alignSelf: 'center' }} />
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
                            </Row>
                            <Row size={5} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.darkFont }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: colorsPalette.darkFont, fontWeight: 'bold' }}>Views are listed by days</Text> (Finished the video).
                            </Text>
                            </Row>
                            <Row size={35}>
                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center', right: 10 }}
                                    onLayout={(event) => { this.setState({ heightView: { height } = event.nativeEvent.layout }) }}>
                                    <View style={{ backgroundColor: '#FFF', height: '100%', width: 35, position: 'absolute', zIndex: 1000, left: 0, top: 25 }} />
                                    <ScrollView horizontal style={{ left: 10 }}>
                                        {clearDaysCount.map((item, key) => <View key={key}><Text allowFontScaling={false} style={{ fontSize: wp(3) }}><Text allowFontScaling={false} style={{ fontSize: wp(3), fontWeight: 'bold' }}>{item.day}({item.formatDate})</Text>: {item.count}.</Text></View>)}
                                    </ScrollView>
                                    <ScrollView horizontal contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        {heightView.height ?
                                            <BarChart
                                                withVerticalLabels={true}
                                                withHorizontalLabels={false}
                                                data={dataListByDay}
                                                width={screenWidth + (dataListByDay.datasets[0].data.length > 6 ? (dataListByDay.datasets[0].data.length * 25) : 0)}
                                                height={heightView.height - 30}
                                                style={{ left: -35 }}
                                                chartConfig={{
                                                    decimalPlaces: 0, // optional, defaults to 2dp
                                                    backgroundGradientFrom: '#FFF',
                                                    backgroundGradientTo: '#FFF',
                                                    backgroundGradientFromOpacity: 0,
                                                    backgroundGradientToOpacity: 0,
                                                    color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                                                    strokeWidth: 0 // optional, default 3
                                                }} /> : null}
                                    </ScrollView>
                                </View>
                            </Row>
                            <Row size={10} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text allowFontScaling={false} style={{ alignSelf: 'center', fontSize: wp(3.5), color: colorsPalette.darkFont, top: -20 }}>Total viwes: {contest.viewsVideo.items && contest.viewsVideo.items.length}.</Text>
                            </Row>
                        </Grid>
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
                    <Grid>
                        <Row size={10} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Stopped video</Text>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5) }}>Sampling of the estimated time in the video (0% - 100% Video length)</Text>
                        </Row>
                        <Row size={40}>
                            <View style={{ backgroundColor: '#FFF', height: 185, width: 46, position: 'absolute', zIndex: 1000, right: 0, top: 0 }} />
                            <ScrollView horizontal contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <LineChart
                                    withVerticalLabels={true}
                                    withHorizontalLabels={false}
                                    data={durationInVideoData}
                                    width={screenWidth + 50}
                                    height={220}
                                    style={{ left: -10 }}
                                    chartConfig={{
                                        decimalPlaces: 0, // optional, defaults to 2dp
                                        backgroundGradientFrom: '#FFF',
                                        backgroundGradientTo: '#FFF',
                                        backgroundGradientFromOpacity: 0,
                                        backgroundGradientToOpacity: 0,
                                        color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                                        strokeWidth: 0 // optional, default 3
                                    }} />
                            </ScrollView>
                        </Row>
                        <Row size={50} style={{ flexDirection: 'column' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), alignSelf: 'center', textAlign: 'center' }}>Users are listed by the number of views they have made</Text>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5), alignSelf: 'center' }}>Press for more information</Text>
                            {JSON.parse(JSON.stringify(usersViews)).length ? <FlatList
                                data={JSON.parse(JSON.stringify(usersViews)).sort((a, b) => (a.count < b.count) ? 1 : -1)}
                                renderItem={({ item }) => (
                                    <View>
                                        <List>
                                            <ListItem avatar onPress={() => { this.setState({ modalUsers: true }); this._showDataPerUser(item) }}>
                                                <Left>
                                                    <Thumbnail small source={{ uri: item.users.avatar }} />
                                                </Left>
                                                <Body style={{ top: 5 }}>
                                                    <Text allowFontScaling={false}>{userData.id === item.users.idUserComments ? "You" : item.users.name}</Text>
                                                    <Text allowFontScaling={false} note style={{ fontSize: wp(3.5), fontWeight: 'normal', color: "#3333" }}>This user has watched the video {item.count} times.</Text>
                                                </Body>
                                            </ListItem>
                                        </List>
                                    </View>
                                )}
                                keyExtractor={item => JSON.stringify(item)} /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text allowFontScaling={false} style={{ fontSize: wp(5) }}>No one has seen the video yet</Text></View>}
                        </Row>
                        <ModalAnimated
                            onSwipeComplete={() => { this._graphToClear(); this.setState({ modalUsers: false }) }}
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
                                                    onPress={() => { this.setState({ modalUsers: false }); this._graphToClear() }}>
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
                                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), alignSelf: 'center', textAlign: 'center' }}>Use two fingers to swipe left/right</Text>
                                            </Row>
                                            <Row size={42.5}>
                                                <View style={{ backgroundColor: '#FFF', height: 220, width: 46, position: 'absolute', zIndex: 1000, left: 0, top: 0 }} />
                                                <ScrollView horizontal contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                    {Object.keys(dataPerUSers).length !== 0
                                                        ? <BarChart
                                                            withVerticalLabels={true}
                                                            withHorizontalLabels={false}
                                                            data={dataPerUSers}
                                                            width={screenWidth + (dataPerUSers.datasets[0].data.length > 6 ? (dataPerUSers.datasets[0].data.length * 25) : 0)}
                                                            height={220}
                                                            style={{ left: -35 }}
                                                            chartConfig={{
                                                                decimalPlaces: 0, // optional, defaults to 2dp
                                                                backgroundGradientFrom: '#FFF',
                                                                backgroundGradientTo: '#FFF',
                                                                backgroundGradientFromOpacity: 0,
                                                                backgroundGradientToOpacity: 0,
                                                                color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                                                                strokeWidth: 0 // optional, default 3
                                                            }} /> : null}
                                                </ScrollView>
                                            </Row>
                                            <Row size={42.5} style={{ flexDirection: 'column' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(3.5), alignSelf: 'center', textAlign: 'center', top: -5 }}>Stopped video</Text>
                                                <View style={{ backgroundColor: '#FFF', height: 200, width: 46, position: 'absolute', zIndex: 1000, right: 0, top: 0 }} />
                                                <ScrollView horizontal contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                    {Object.keys(dataPerUSers).length !== 0
                                                        ? <LineChart
                                                            withVerticalLabels={true}
                                                            withHorizontalLabels={false}
                                                            data={durationInVideoDataUser}
                                                            width={screenWidth + 50}
                                                            height={220}
                                                            style={{ left: -10 }}
                                                            chartConfig={{
                                                                decimalPlaces: 0, // optional, defaults to 2dp
                                                                backgroundGradientFrom: '#FFF',
                                                                backgroundGradientTo: '#FFF',
                                                                backgroundGradientFromOpacity: 0,
                                                                backgroundGradientToOpacity: 0,
                                                                color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                                                                strokeWidth: 0 // optional, default 3
                                                            }} />
                                                        : null}
                                                </ScrollView>
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

export default withNavigation(ViewsVideo)