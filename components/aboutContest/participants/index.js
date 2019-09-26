import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { Video } from 'expo-av';
import { withNavigation } from 'react-navigation'
import { FlatList, Image } from 'react-native'
import { Container, Header, Content, Tab, Tabs, Text, Left, Body, Title, View, Button, Thumbnail, TabHeading, Card, CardItem, Right } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import UserAvatar from "react-native-user-avatar"


// Child Components
import ButtonListLikes from './likes'
import ButtonComments from './comments'
import ButtonStatistics from './buttonStatistics'

// AWS
import * as mutations from '../../../src/graphql/mutations'

class Participants extends Component {
    state = {
        // Actions
        isImgLoading: false
    }

    _updateDataWithTab = async () => {
        const { contest } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { isImgLoading } = this.state
        const { _setModalVisibleJoinToTheContest, _setModalVisibleAudience, userData, contest, disableParticipants, navigation } = this.props
        const filterParticipantsList = contest.participants.items.filter((item) => { return item.participantId.indexOf(userData.id) !== -1 })
        return (
            <Container>
                <Header hasTabs style={{ backgroundColor: '#F5F5F5' }}>
                    <Left>
                        <Title
                            minimumFontScale={wp(9)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(9), color: "#D82B60" }}>Participations 🔥 </Title>
                    </Left>
                </Header>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#D82B60' }} onChangeTab={(i) => this._updateDataWithTab()}>
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
                        {
                            contest.participants.items.length ?
                                <Container>
                                    <Content padder showsVerticalScrollIndicator={false}>
                                        <FlatList
                                            data={contest.participants.items}
                                            renderItem={({ item }) => (
                                                <Card>
                                                    <CardItem>
                                                        <Left>
                                                            {item.avatar === null ? <UserAvatar size="35" name={item.nameUser} /> : <Thumbnail small source={{ uri: item.avatar }} />}
                                                            <Body>
                                                                <Text>{item.nameUser}</Text>
                                                                <Text note>{moment(item.createdAt).fromNow()}</Text>
                                                            </Body>
                                                        </Left>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Body>
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
                                                                {item.comment}
                                                            </Text>
                                                        </Body>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Left style={{ right: 10 }}>
                                                            <ButtonListLikes item={item} contest={contest} />
                                                            <ButtonComments item={item} contest={contest} />
                                                        </Left>
                                                    </CardItem>
                                                </Card>

                                            )}
                                            keyExtractor={item => item.createdAt} />
                                    </Content>
                                </Container>
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
                        }
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
                            {filterParticipantsList.length ?
                                <Container>
                                    <Content padder showsVerticalScrollIndicator={false}>
                                        <FlatList
                                            data={filterParticipantsList}
                                            renderItem={({ item }) => (
                                                <Card>
                                                    <CardItem>
                                                        <Left>
                                                            {item.avatar === null ? <UserAvatar size="35" name={item.nameUser} /> : <Thumbnail small source={{ uri: item.avatar }} />}
                                                            <Body>
                                                                <Text>{item.nameUser}</Text>
                                                                <Text note>{moment(item.createdAt).fromNow()}</Text>
                                                            </Body>
                                                        </Left>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Body>
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
                                                                {item.comment}
                                                            </Text>
                                                        </Body>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Left style={{ right: 10 }}>
                                                            <ButtonListLikes item={item} contest={contest} />
                                                            <ButtonComments item={item} contest={contest} />
                                                        </Left>
                                                        <Right style={{ alignItems: 'flex-end' }}>
                                                            <ButtonStatistics item={item} contest={contest} />
                                                        </Right>
                                                    </CardItem>
                                                </Card>

                                            )}
                                            keyExtractor={item => item.createdAt} />
                                    </Content>
                                </Container>
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
                                </View>}
                        </Tab>
                    }
                </Tabs>
            </Container>
        );
    }
}

export default withNavigation(Participants)