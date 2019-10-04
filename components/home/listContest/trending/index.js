import React, { Component } from 'react';
import { FlatList, RefreshControl, ImageBackground } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from 'react-navigation'
import {
    Container,
    Text,
    Left,
    Header,
    Item,
    Icon,
    Input,
    Button,
    Title,
    Card, CardItem, Thumbnail, Right
} from "native-base"
import truncate from 'lodash/truncate'
import startCase from 'lodash/startCase'
import lowerCase from 'lodash/lowerCase'
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import moment from 'moment'
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import * as Animatable from 'react-native-animatable';

import { MyStatusBar } from '../../../global/statusBar'
import { DataNotFound } from "../../../global/emojis/index"

class Trending extends Component {
    state = {
        isReady: false,
        input: "",
        refreshing: false,
        activeAnimation: false,
        trendingContests: [],
        isFinishedContest: false
    }


    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getContest().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { input, trendingContests, activeAnimation, isFinishedContest } = this.state
        let filterTrendingContest = []
        return (
            <Container>
                <Header span style={{ backgroundColor: "#D82B60", borderBottomColor: "rgba(0,0,0,0.0)", height: 110 }}>
                    <Grid>
                        <Row size={50}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => { this.props.navigation.goBack(); }}>
                                    <Icon name='arrow-back' style={{ color: "#FFF" }} />
                                    <Text
                                        minimumFontScale={wp(4)}
                                        allowFontScaling={false}
                                        style={{ left: 5, color: "#FFF", fontSize: wp(4) }}>Back</Text>
                                </Button>
                                <Title
                                    minimumFontScale={wp(9)}
                                    allowFontScaling={false}
                                    style={{ alignSelf: "center", left: 15, color: "#FFF", fontSize: wp(9) }}>Trending 🔥</Title>
                            </Left>
                        </Row>
                        <Row size={50} style={{ paddingLeft: 15 }}>
                            <Header searchBar rounded style={{ height: "100%", width: 300, backgroundColor: "#D82B60", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                                <Item style={{ backgroundColor: '#fff', top: -10 }}>
                                    <Icon name="ios-search" style={{ color: !input ? "#E0E0E0" : "#333" }} />
                                    <Input
                                        minimumFontScale={wp(4)}
                                        allowFontScaling={false}
                                        onChangeText={(input) => this.setState({ input })}
                                        placeholderTextColor="#E0E0E0"
                                        placeholder="Filter by name of contest" />
                                </Item>
                            </Header>
                        </Row>
                    </Grid>
                </Header>
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                {trendingContests !== null
                    ? filterTrendingContest.length
                        ? <FlatList
                            data={filterTrendingContest}
                            refreshControl={
                                <RefreshControl tintColor="#D82B60" refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                            }
                            keyExtractor={item => item.id}
                            initialNumToRender={2}
                            renderItem={({ item, index }) =>
                                <TouchableHighlight
                                    onPress={() => { this.setState({ activeAnimation: true }); }}
                                    underlayColor="rgba(0,0,0,0.0)">
                                    <Animatable.View
                                        duration={200}
                                        animation={this.state.activeAnimation ? 'pulse' : undefined}
                                        onAnimationEnd={() => {
                                            this.setState({ activeAnimation: false });
                                            //   this.props.navigation.navigate("AboutContest", { contest: item, fromWhere: 'categoryContest', userData })
                                        }}>
                                        <Card style={{
                                            flex: 0,
                                            borderRadius: 7,
                                            marginBottom: 10,
                                            width: "95%",
                                            alignSelf: "center",
                                            marginTop: 20,
                                            shadowColor: 'rgba(0,0,0,0.3)',
                                            shadowOffset: { width: 0 },
                                            shadowOpacity: 1
                                        }}>
                                            <CardItem style={{ borderTopEndRadius: 7, borderTopStartRadius: 7 }}>
                                                <Left>
                                                    <Animatable.View animation="fadeIn">
                                                        {/* {item && item.user.avatar === null
                                                            ? <UserAvatar size="40" name={item.user.name} />
                                                            : <Thumbnail source={{ uri: item.user.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />} */}
                                                        <Thumbnail source={{ uri: "item.user.avatar" }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                                                    </Animatable.View>
                                                    <Body>
                                                        <Text
                                                            //onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.user.id })}
                                                            minimumFontScale={wp(4)}
                                                            allowFontScaling={false}
                                                            style={{ fontSize: wp(4) }}>
                                                            Yank Carlos
                                                            {/* {userData.id === item.user.id ? "You" : _.truncate(_.upperFirst(_.lowerCase(item.aboutTheUser.companyName === null ? item.user.name : item.aboutTheUser.companyName)), { length: 20, separator: '...' })} */}
                                                        </Text>
                                                        <Text
                                                            //onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.user.id })}
                                                            minimumFontScale={wp(3)}
                                                            allowFontScaling={false}
                                                            note
                                                            style={{ fontSize: wp(3) }}>
                                                            Publicado hoy
                                                            {/* Published {moment(item.createdAt).fromNow()} */}
                                                        </Text>
                                                    </Body>
                                                </Left>
                                                <Right>
                                                    {isFinishedContest ? <View style={{
                                                        borderRadius: "50%",
                                                        backgroundColor: '#E53935',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        shadowColor: 'rgba(0,0,0,0.3)',
                                                        shadowOffset: { width: 0 },
                                                        shadowOpacity: 1,
                                                    }}>
                                                        <View style={{ padding: 10 }}>
                                                            <Text
                                                                minimumFontScale={wp(3)}
                                                                allowFontScaling={false}
                                                                style={{ fontSize: wp(3), color: '#FFF', fontWeight: 'bold' }}>Completed</Text>
                                                        </View>
                                                    </View> :
                                                        item.timer === null
                                                            ? null
                                                            : new Date(item.timer.end) < new Date()
                                                                ? <View style={{
                                                                    borderRadius: "5%",
                                                                    backgroundColor: '#E53935',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    shadowColor: 'rgba(0,0,0,0.3)',
                                                                    shadowOffset: { width: 0 },
                                                                    shadowOpacity: 1,
                                                                }}>
                                                                    <View style={{ padding: 10 }}>
                                                                        <Text style={{ fontSize: wp(4), color: '#FFF', fontWeight: 'bold' }}>Completed</Text>
                                                                    </View>
                                                                </View> : <CountDown
                                                                    style={{ alignSelf: 'flex-end', top: -4 }}
                                                                    digitStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
                                                                    digitTxtStyle={{ color: '#000' }}
                                                                    timeLabelStyle={{ color: '#333' }}
                                                                    until={moment(item.timer.end).diff(moment(new Date()), 'seconds')}
                                                                    onFinish={() => this.setState({ isFinishedContest: true })}
                                                                    onPress={() => { }}
                                                                    size={10}
                                                                />}
                                                </Right>
                                            </CardItem>
                                            <CardItem cardBody style={{ borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}>
                                                <View style={{
                                                    borderBottomLeftRadius: 7,
                                                    borderBottomRightRadius: 7,
                                                    overflow: 'hidden', flex: 1
                                                }}>
                                                    <Animatable.View animation="fadeIn">
                                                        <ImageBackground
                                                            source={{ uri: "item.general.picture.url" }}
                                                            style={{ height: 125, width: "100%", flex: 1 }}>
                                                            <View style={{
                                                                backgroundColor: 'rgba(0,0,0,0.2)',
                                                                width: "100%", height: "100%",
                                                                borderBottomLeftRadius: 7, borderLeftColor: 7,
                                                            }}>
                                                                <Text
                                                                    minimumFontScale={wp(7)}
                                                                    allowFontScaling={false}
                                                                    style={{ color: "#FFF", fontSize: wp(7), position: "absolute", bottom: 0, padding: 10 }}>
                                                                    {/* {_.truncate(_.upperFirst(_.lowerCase(item.general.nameOfContest)), { length: 20, separator: '...' })} */}
                                                                    Periodico de ayer
                                                                </Text>
                                                                <View style={{ flexDirection: 'row', bottom: 0, right: 0, position: 'absolute', padding: 7 }}>
                                                                    <Text
                                                                        minimumFontScale={wp(3)}
                                                                        allowFontScaling={false}
                                                                        style={{ color: "#FFF", left: -7, fontSize: wp(4) }}>🏆 {"item.prizes.length"}</Text>
                                                                    <Text
                                                                        minimumFontScale={wp(4)}
                                                                        allowFontScaling={false}
                                                                        style={{ color: "#FFF", left: -5, fontSize: wp(4) }}>👥 {"item.participants.items.length"}</Text>
                                                                </View>
                                                            </View>
                                                        </ImageBackground>
                                                    </Animatable.View>
                                                </View>
                                            </CardItem>
                                        </Card>
                                    </Animatable.View>
                                </TouchableHighlight>
                            } /> : <DataNotFound inputText={input} />
                    : <PlaceholderAll />}
            </Container>
        );
    }
}
export default withNavigation(Trending)