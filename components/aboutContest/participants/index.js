import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { Video } from 'expo-av';
import { withNavigation } from 'react-navigation'
import { FlatList, Image } from 'react-native'
import { Container, Header, Content, Tab, Tabs, Text, Left, Body, Title, View, Button, Thumbnail, TabHeading, Card, CardItem, Right } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import UserAvatar from "react-native-user-avatar"
import upperFirst from 'lodash/upperFirst'
import ReadMore from 'react-native-read-more-text';
import * as Animatable from 'react-native-animatable'


// Child Components
import ButtonListLikes from './likes'
import ButtonComments from './comments'
import ButtonStatistics from './statistics/index'
import UpdateParticipant from './updateParticipant'
import ButtonShare from './share'
import ParticipationsPlaceHolder from './placeholders/participations'

// AWS
import * as queries from '../../../src/graphql/customQueries'
import * as subscriptions from '../../../src/graphql/subscriptions'
import * as mutations from '../../../src/graphql/mutations'

let fullscreenVideo = 0

class Participants extends Component {
    state = {
        // Actions
        isImgLoading: false,
        participation: null,
        actionVideo: false,
    }

    componentDidMount() {
        const { contest } = this.props
        this._getParticipation()

        // Agregar nueva participación
        API.graphql(graphqlOperation(subscriptions.onCreateParticipants)).subscribe({
            error: ({ errors }) => { console.log(errors) },
            next: (getData) => {
                if (getData.value.data.onCreateParticipants.contestId === contest.id) {
                    this.setState({ participation: [...this.state.participation, getData.value.data.onCreateParticipants] })
                }
            }
        })

        API.graphql(graphqlOperation(subscriptions.onUpdateParticipants)).subscribe({
            error: ({ errors }) => { console.log(errors) },
            // next: (getData) => {
            next: () => {
                this._getParticipation()
            }
        })

    }

    _getParticipation = async () => {
        const { contest } = this.props
        try {
            const response = await API.graphql(graphqlOperation(queries.listParticipantss, { filter: { contestId: { eq: contest.id } } }))
            this.setState({ participation: response.data.listParticipantss.items })
        } catch (error) {
            console.log(error)
        }
    }

    _updateDataWithTab = async () => {
        this._getParticipation()
    }

    _onPlaybackStatusUpdate = async (playbackStatus, index, item) => {
        const userData = this.props.navigation.getParam('userData')
        const views = {
            participantsId: item.participantId,
            name: userData.name,
            idUserView: userData.id,
            uri: item.video.url,
            didJustFinish: playbackStatus.durationMillis === playbackStatus.positionMillis ? true : false,
            durationMillis: playbackStatus.durationMillis,
            positionMillis: playbackStatus.positionMillis,
            isPaused: playbackStatus.durationMillis !== playbackStatus.positionMillis ? true : false,
            createdAt: moment().toISOString(),
            avatar: userData.avatar,
            viewsParticipantsParticipantsId: item.id
        }

        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state
            if (playbackStatus.isPlaying) {
                if (fullscreenVideo++ === 1) { await this[`ref${index}`].presentFullscreenPlayer() }
            } else {
                if (fullscreenVideo > 1) { fullscreenVideo = 0 }
            }

            if (playbackStatus.isBuffering) {
                // Update your UI for the buffering state
                // console.log('El vieeo esta en el buffer')
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing and will stop. Maybe you want to play something else?
                try {
                    await API.graphql(graphqlOperation(mutations.createViewsParticipants, { input: views }))
                } catch (error) {
                    console.log(error)
                }
            }

        }
    };

    _durationVideo = async (data, index, item) => {
        if (data.fullscreenUpdate === 3) {
            if (data.status.positionMillis >= 3000) {
                const userData = this.props.navigation.getParam('userData')
                const views = {
                    participantsId: item.participantId,
                    name: userData.name,
                    idUserView: userData.id,
                    uri: item.video.url,
                    didJustFinish: data.status.durationMillis === data.status.positionMillis ? true : false,
                    durationMillis: data.status.durationMillis,
                    positionMillis: data.status.positionMillis,
                    isPaused: data.status.durationMillis !== data.status.positionMillis ? true : false,
                    createdAt: moment().toISOString(),
                    avatar: userData.avatar,
                    viewsParticipantsParticipantsId: item.id
                }
                try {
                    await API.graphql(graphqlOperation(mutations.createViewsParticipants, { input: views }))
                } catch (error) {
                    console.log(error)
                }
            }
            this[`ref${index}`].stopAsync()
        }
    }

    render() {
        const { isImgLoading, participation, actionVideo } = this.state
        const { _setModalVisibleJoinToTheContest, _setModalVisibleAudience, userData, contest, disableParticipants, navigation } = this.props
        const filterParticipantsList = participation && participation.filter((item) => { return item.participantId.indexOf(userData.id) !== -1 })
        return (
            <Container>
                <Header hasTabs style={{ backgroundColor: '#F5F5F5' }}>
                    <Left>
                        <Title
                            minimumFontScale={wp(9)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(9), color: "#D82B60" }}>Participations 🔥</Title>
                    </Left>
                </Header>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#D82B60' }} onChangeTab={() => this._updateDataWithTab()}>
                    <Tab
                        heading={
                            <TabHeading style={{ backgroundColor: "#F5F5F5" }}>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ color: '#D81B60', fontSize: wp(4) }}>All</Text>
                            </TabHeading>
                        }
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}
                        activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                        tabStyle={{ backgroundColor: '#F5F5F5' }}>
                        {participation !== null ? participation.length ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={participation.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })}
                                renderItem={({ item, index }) => (
                                    <Animatable.View animation="fadeIn" style={{ padding: 10 }}>
                                        <Card>
                                            <CardItem>
                                                <Button transparent style={{ position: 'absolute', zIndex: 1000, width: 200 }} onPress={() => navigation.navigate('UserProfile', { userId: item.participantId })} />
                                                <Left>
                                                    {item.avatar === null ? <UserAvatar size="35" name={item.nameUser} /> : <Thumbnail small source={{ uri: item.avatar }} />}
                                                    <Body>
                                                        <Text>{userData.id === item.participantId ? "You" : item.nameUser}</Text>
                                                        <Text note>{upperFirst(moment(item.createdAt).fromNow())}</Text>
                                                    </Body>
                                                </Left>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    {item.picture && item.picture.url === null
                                                        ? <View style={{ flex: 1, height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                                            <View style={{ backgroundColor: '#3333', height: 200, width: "109.5%", position: 'absolute' }} />
                                                            <Video
                                                                onFullscreenUpdate={(s) => this._durationVideo(s, index, item)}
                                                                onPlaybackStatusUpdate={(s) => this._onPlaybackStatusUpdate(s, index, item)}
                                                                ref={r => this[`ref${index}`] = r}
                                                                source={{ uri: item.video && item.video.url }}
                                                                useNativeControls={true}
                                                                rate={1.0}
                                                                volume={1.0}
                                                                isMuted={false}
                                                                resizeMode="cover"
                                                                shouldPlay={false}
                                                                isLooping={false}
                                                                style={{ width: "109.5%", height: 200, alignSelf: 'center' }} />
                                                            <Button transparent style={{ width: 80, height: 50, position: 'absolute', top: 0, left: -15 }} />
                                                        </View>
                                                        : <Image source={{ uri: item.picture && item.picture.url }} style={{ height: 200, width: "109.5%", flex: 1, alignSelf: 'center' }} />}
                                                    <View style={{ top: 10 }}>
                                                        <ReadMore numberOfLines={6}>
                                                            {item.comment}
                                                        </ReadMore>
                                                    </View>
                                                </Body>
                                            </CardItem>
                                            <CardItem>
                                                <Left style={{ right: 10 }}>
                                                    <ButtonListLikes _getParticipation={this._getParticipation} item={item} />
                                                    <ButtonComments _getParticipation={this._getParticipation} item={item} />
                                                </Left>
                                                <Right>
                                                    <ButtonShare item={item} contest={contest} />
                                                </Right>
                                            </CardItem>
                                        </Card>
                                    </Animatable.View>
                                )}
                                keyExtractor={item => item.createdAt} />
                            : userData.id === contest.user.id || disableParticipants === true
                                ? <View style={{ height: 150, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        minimumFontScale={wp(4)}
                                        allowFontScaling={false}
                                        style={{ color: "#333", fontSize: wp(4) }}>You don't have any participants yet 😕</Text>
                                    <Button
                                        onPress={() => _setModalVisibleAudience(true)}
                                        style={{ backgroundColor: '#D82B60', alignSelf: 'center', top: 20, width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text
                                            minimumFontScale={wp(4)}
                                            allowFontScaling={false}
                                            style={{ fontSize: wp(4) }}
                                        >Would you like to create an audience?</Text>
                                    </Button>
                                </View>
                                : <View style={{ height: 150, padding: 5, justifyContent: 'center', alignItems: 'center', top: 5 }}>
                                    <Text
                                        minimumFontScale={wp(4.5)}
                                        allowFontScaling={false}
                                        style={{ color: "#333", fontSize: wp(4.5) }}>Be the first to join!</Text>
                                    <Button
                                        onPress={() => _setModalVisibleJoinToTheContest(true)}
                                        style={{ backgroundColor: '#D82B60', alignSelf: 'center', top: 20, width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ letterSpacing: 2 }}>PARTICIPATE NOW</Text>
                                    </Button>
                                </View>
                            : <ParticipationsPlaceHolder />}
                    </Tab>
                    {userData.id === contest.user.id || disableParticipants == true
                        ? null
                        : <Tab
                            heading={
                                <TabHeading style={{ backgroundColor: "#F5F5F5" }}>
                                    <Text
                                        minimumFontScale={wp(4)}
                                        allowFontScaling={false}
                                        style={{ color: '#D81B60', fontSize: wp(4) }}>Mine</Text>
                                </TabHeading>
                            }
                            activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                            activeTabStyle={{ backgroundColor: '#F5F5F5' }}
                            tabStyle={{ backgroundColor: '#F5F5F5' }}>
                            {filterParticipantsList !== null
                                ? filterParticipantsList.length ?
                                    <FlatList
                                        data={filterParticipantsList}
                                        renderItem={({ item }) => (
                                            <Animatable.View animation="fadeIn" style={{ padding: 10 }}>
                                                <Card>
                                                    <CardItem>
                                                        <Button transparent style={{ position: 'absolute', zIndex: 1000, width: 200 }} onPress={() => navigation.navigate('UserProfile', { userId: item.participantId })} />
                                                        <Left>
                                                            {item.avatar === null ? <UserAvatar size="35" name={item.nameUser} /> : <Thumbnail small source={{ uri: item.avatar }} />}
                                                            <Body>
                                                                <Text>{userData.id === item.participantId ? "You" : item.nameUser}</Text>
                                                                <Text note>{upperFirst(moment(item.createdAt).fromNow())}</Text>
                                                            </Body>
                                                        </Left>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Body>
                                                            <View style={{ backgroundColor: '#3333', height: 200, width: "109.5%", position: 'absolute', alignSelf:'center' }} />
                                                            {item.picture && item.picture.url === null
                                                                ? <Video
                                                                    source={{ uri: item.video && item.video.url }}
                                                                    useNativeControls={true}
                                                                    rate={1.0}
                                                                    volume={1.0}
                                                                    isMuted={false}
                                                                    resizeMode="cover"
                                                                    shouldPlay={false}
                                                                    isLooping={false}
                                                                    style={{ width: "110%", height: 200, alignSelf: 'center' }} />
                                                                : <Image source={{ uri: item.picture && item.picture.url }} style={{ height: 200, width: "110%", flex: 1, alignSelf: 'center' }} />}
                                                            <Text allowFontScaling={false} style={{ fontSize: wp(3), top: 10 }}>
                                                            </Text>
                                                            <ReadMore numberOfLines={6}>
                                                                {item.comment}
                                                            </ReadMore>
                                                        </Body>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Left style={{ right: 10 }}>
                                                            <ButtonListLikes _getParticipation={this._getParticipation} item={item} />
                                                            <ButtonComments _getParticipation={this._getParticipation} item={item} />
                                                        </Left>
                                                        <Right style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <UpdateParticipant item={item} contest={contest} />
                                                            <ButtonStatistics item={item} contest={contest} />
                                                        </Right>
                                                    </CardItem>
                                                </Card>
                                            </Animatable.View>
                                        )}
                                        keyExtractor={item => item.createdAt} />
                                    : <View style={{ height: 150, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text
                                            minimumFontScale={wp(4.5)}
                                            allowFontScaling={false}
                                            style={{ color: "#333", fontSize: wp(4.5) }}>You still have no participation!</Text>
                                        <Button
                                            onPress={() => _setModalVisibleJoinToTheContest(true)}
                                            style={{ backgroundColor: '#D82B60', alignSelf: 'center', top: 20, width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text
                                                minimumFontScale={wp(4)}
                                                allowFontScaling={false}
                                                style={{ letterSpacing: 2, fontSize: wp(4) }}>PARTICIPATE NOW</Text>
                                        </Button>
                                    </View>
                                : <ParticipationsPlaceHolder />}
                        </Tab>
                    }
                </Tabs>
            </Container>
        );
    }
}

export default withNavigation(Participants)