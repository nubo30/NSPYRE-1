import React, { Component } from 'react';
import { Video } from "expo"
import { FlatList, Image } from 'react-native'
import { Container, Header, Content, Tab, Tabs, Text, Left, Body, Title, Subtitle, View, Button, List, ListItem, Thumbnail, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Col } from 'react-native-easy-grid'
import moment from 'moment'
import UserAvatar from "react-native-user-avatar"

export default class Participants extends Component {
    state = {
        // Actions
        isImgLoading: false
    }

    render() {
        const { isImgLoading } = this.state
        const { _setModalVisibleJoinToTheContest, _setModalVisibleAudience, userData, contest, disableParticipants } = this.props
        const filterParticipantsList = contest.participants.items.filter((item) => { return item.participantId.indexOf(userData.id) !== -1 })
        return (
            <Container>
                <Header hasTabs style={{ backgroundColor: '#F5F5F5' }}>
                    <Left>
                        <Title style={{ fontSize: wp(10), color: "#D82B60" }}>Participations 🔥 </Title>
                        <Subtitle>The content that participants have created for this contest is shown.</Subtitle>
                    </Left>
                </Header>
                <Tabs style={{ flex: 1 }} tabBarUnderlineStyle={{ backgroundColor: '#D82B60' }}>
                    <Tab
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}
                        activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                        tabStyle={{ backgroundColor: '#F5F5F5' }}
                        heading="GLOBAL">
                        {
                            contest.participants.items.length ?
                                <FlatList
                                    data={contest.participants.items}
                                    renderItem={({ item }) => (
                                        <View style={{ height: 150, borderBottomWidth: 0.5, borderBottomColor: 'rgba(0,0,0,0.2)', padding: 5, top: 10 }}>
                                            <Grid style={{ height: 100, flex: 1 }}>
                                                <Col size={40}>
                                                    <View style={{
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                        flex: 1,
                                                    }}>
                                                        {item.video.url === null
                                                            ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                <Spinner size="large" color="#D82B60" animating={isImgLoading} style={{ position: 'absolute' }} />
                                                                <Image
                                                                    onLoadEnd={() => this.setState({ isImgLoading: false })}
                                                                    onLoadStart={() => this.setState({ isImgLoading: true })}
                                                                    style={{ height: "100%", width: "100%" }} source={{ uri: item.picture.url }} />
                                                            </View>
                                                            : <Video
                                                                source={{ uri: item.video.url }}
                                                                useNativeControls={true}
                                                                rate={1.0}
                                                                volume={1.0}
                                                                isMuted={false}
                                                                resizeMode="cover"
                                                                shouldPlay={false}
                                                                isLooping={false}
                                                                style={{ width: "100%", height: "100%" }}
                                                            />}
                                                    </View>
                                                </Col>
                                                <Col size={60} style={{ paddingStart: 10 }}>
                                                    <List style={{ height: 50 }}>
                                                        <ListItem thumbnail style={{ height: '100%', right: 15 }}>
                                                            <Left>
                                                                {item.avatar === null ? <UserAvatar size="35" name={item.nameUser} /> : <Thumbnail small source={{ uri: item.avatar }} />}
                                                            </Left>
                                                            <Body style={{ right: 5, borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                                <Text style={{ color: '#333' }}>{item.nameUser}</Text>
                                                                <Text note numberOfLines={1} style={{ fontStyle: 'italic', fontSize: wp(3.5) }}>Published {moment(item.createdAt).fromNow()}</Text>
                                                            </Body>
                                                        </ListItem>
                                                    </List>
                                                    <Content>
                                                        <Text style={{ fontSize: wp(3.5), color: "#BDBDBD" }}>
                                                            {item.comment}
                                                        </Text>
                                                    </Content>
                                                </Col>
                                            </Grid>
                                        </View>
                                    )}
                                    keyExtractor={item => item.createdAt} />
                                : userData.id === contest.user.id || disableParticipants === true
                                    ? <View style={{ height: 150, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: "#333", fontSize: wp(4.5) }}>You don't have any participants yet 😕</Text>
                                        <Button
                                            onPress={() => _setModalVisibleAudience(true)}
                                            style={{ backgroundColor: '#D82B60', alignSelf: 'center', top: 20, width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>Would you like to create an audience?</Text>
                                        </Button>
                                    </View>
                                    : <View style={{ height: 150, padding: 5, justifyContent: 'center', alignItems: 'center', top: 5 }}>
                                        <Text style={{ color: "#333", fontSize: wp(4.5) }}>Be the first to join!</Text>
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
                            activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                            activeTabStyle={{ backgroundColor: '#F5F5F5' }}
                            tabStyle={{ backgroundColor: '#F5F5F5' }}
                            heading="YOURS">
                            {filterParticipantsList.length ?
                                <FlatList
                                    data={filterParticipantsList}
                                    renderItem={({ item }) => (
                                        <View style={{ height: 150, borderBottomWidth: 0.5, borderBottomColor: 'rgba(0,0,0,0.2)', padding: 5, top: 10 }}>
                                            <Grid style={{ height: 100, flex: 1 }}>
                                                <Col size={40}>
                                                    <View style={{
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                        flex: 1,
                                                    }}>
                                                        {item.video.url === null
                                                            ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                <Spinner size="large" color="#D82B60" animating={isImgLoading} style={{ position: 'absolute' }} />
                                                                <Image
                                                                    onLoadEnd={() => this.setState({ isImgLoading: false })}
                                                                    onLoadStart={() => this.setState({ isImgLoading: true })}
                                                                    style={{ height: "100%", width: "100%" }} source={{ uri: item.picture.url }} />
                                                            </View>
                                                            : <Video
                                                                source={{ uri: item.video.url }}
                                                                useNativeControls={true}
                                                                rate={1.0}
                                                                volume={1.0}
                                                                isMuted={false}
                                                                resizeMode="cover"
                                                                shouldPlay={false}
                                                                isLooping={false}
                                                                style={{ width: "100%", height: "100%" }}
                                                            />}
                                                    </View>
                                                </Col>
                                                <Col size={60} style={{ paddingStart: 10 }}>
                                                    <List style={{ height: 50 }}>
                                                        <ListItem thumbnail style={{ height: '100%', right: 15 }}>
                                                            <Left>
                                                                {item.avatar === null ? <UserAvatar size="35" name={item.nameUser} /> : <Thumbnail small source={{ uri: item.avatar }} />}
                                                            </Left>
                                                            <Body style={{ right: 5, borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                                <Text style={{ color: '#333' }}>{item.nameUser}</Text>
                                                                <Text note numberOfLines={1} style={{ fontStyle: 'italic', fontSize: wp(3.5) }}>Published {moment(item.createdAt).fromNow()}</Text>
                                                            </Body>
                                                        </ListItem>
                                                    </List>
                                                    <Content>
                                                        <Text style={{ fontSize: wp(3.5), color: "#BDBDBD" }}>
                                                            {item.comment}
                                                        </Text>
                                                    </Content>
                                                </Col>
                                            </Grid>
                                        </View>
                                    )}
                                    keyExtractor={item => item.createdAt} />
                                : <View style={{ height: 150, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#333", fontSize: wp(4.5) }}>You still have no participation!</Text>
                                    <Button
                                        onPress={() => _setModalVisibleJoinToTheContest(true)}
                                        style={{ backgroundColor: '#D82B60', alignSelf: 'center', top: 20, width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ letterSpacing: 2 }}>PARTICIPATE NOW</Text>
                                    </Button>
                                </View>}
                        </Tab>
                    }
                </Tabs>
            </Container>
        );
    }
}