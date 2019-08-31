import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { FlatList, RefreshControl } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, List, ListItem, Thumbnail, View, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import moment from 'moment'


import { MyStatusBar } from '../../Global/statusBar/index'

import * as mutations from '../../../src/graphql/mutations'


class NotificationCenter extends Component {

    state = { itemState: "", refreshing: false }

    _deleteNotifications = async (item) => {
        const { _deleteNotificationLoading } = this.props
        this.setState({ itemState: item.id })
        _deleteNotificationLoading(true)
        try {
            API.graphql(graphqlOperation(mutations.deleteNotifications, { input: { id: item.id } }))
        } catch (error) {
            console.log(error)
        }
    }

    _onRefresh = () => {
        const { _refreshData, _refreshing } = this.props
        _refreshing(true)
        _refreshData()
    }

    _navigateToScreen = (item) => {
        const { navigation } = this.props
        const parseData = JSON.parse(item.JSONdata)
        switch (parseData.type) {
            case 'participantsInTheContest':
                navigation.navigate(parseData.rute, { userData: parseData.userData, contest: Object.assign(parseData.contest, { timer: null }) })
                break;
            default:
                break;
        }
    }

    render() {
        const { itemState } = this.state
        const { _changeSwiper, notifications, isLoading, refreshing } = this.props
        let filterDateNotifications = notifications.filter(item => new Date(item.expirationDateWeek) < new Date() ? null : Object.assign(item, JSON.parse(item.JSONdata)))
        let filterDateNotificationsx2 = notifications.filter(item => new Date(item.expirationDateWeek) > new Date() ? null : Object.assign(item, JSON.parse(item.JSONdata)))
        let areThereNotifications = filterDateNotifications.length + filterDateNotificationsx2.length
        return (
            <Container style={{ backgroundColor: "#FAFAFA" }}>
                <Header noLeft style={{ backgroundColor: "#D81B60", justifyContent: 'center', alignItems: 'center' }}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _changeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: "#FFF" }} />
                            <Text
                                allowFontScaling={false}
                                minimumFontScale={wp(4)}
                                style={{ left: 5, color: "#FFF", fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title
                            allowFontScaling={false}
                            minimumFontScale={wp(6)}
                            style={{ fontSize: wp(6), color: "#FFF", left: 15 }}>Notification Center</Title>
                    </Left>
                </Header>
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                <Content refreshControl={<RefreshControl tintColor="#D81B60" refreshing={refreshing} onRefresh={this._onRefresh} />}>
                    {areThereNotifications
                        ? <List style={{ width: '100%' }}>
                            {filterDateNotifications.length
                                ? <View>
                                    <Text
                                        allowFontScaling={false}
                                        minimumFontScale={wp(4)}
                                        style={{ fontWeight: 'bold', left: 10, marginTop: 10, marginBottom: 5 }}>This week</Text>
                                    <FlatList
                                        data={filterDateNotifications}
                                        renderItem={({ item }) =>
                                            item && <View>
                                                <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                    <Left style={{ top: -5 }}>
                                                        {item.avatar !== null
                                                            ? <Thumbnail source={{ uri: item.avatar }} />
                                                            : <UserAvatar size="55" name={item.userFrom} />}
                                                    </Left>
                                                    <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                        <Text
                                                            allowFontScaling={false}
                                                            minimumFontScale={wp(4)}
                                                            style={{ fontWeight: 'bold', color: '#333', fontSize: wp(4) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.idUSerFrom })}>{_.startCase(item.userFrom)}<Text style={{ color: '#333', fontWeight: '100', fontSize: wp(4) }} onPress={() => this._navigateToScreen(item)}>, has joined your <Text style={{ fontWeight: 'bold', color: '#333' }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                    </Body>
                                                    <Right style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                        <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                            {isLoading && itemState === item.id ? <Spinner size="small" color="#F44336" style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: '#F44336' }} />}
                                                        </Button>
                                                    </Right>
                                                </ListItem>
                                            </View>
                                        } keyExtractor={item => item && item.id} />
                                    <View style={{ borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', top: 5 }} />
                                </View> : null}
                            {filterDateNotificationsx2.length
                                ? <View style={{ paddingTop: 30 }}>
                                    <Text
                                        allowFontScaling={false}
                                        minimumFontScale={wp(4)}
                                        style={{ fontWeight: 'bold', left: 10, marginBottom: 5 }}>Previous</Text>
                                    <FlatList
                                        data={filterDateNotificationsx2}
                                        renderItem={({ item }) =>
                                            item && <View>
                                                <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                    <Left style={{ top: -5 }}>
                                                        {item.avatar !== null
                                                            ? <Thumbnail source={{ uri: item.avatar }} />
                                                            : <UserAvatar size="55" name={item.userFrom} />}
                                                    </Left>
                                                    <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                        <Text
                                                            allowFontScaling={false}
                                                            minimumFontScale={wp(4)}
                                                            style={{ fontWeight: 'bold', color: '#333', fontSize: wp(4) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.idUSerFrom })}>{_.startCase(item.userFrom)}<Text style={{ color: '#333', fontWeight: '100', fontSize: wp(4) }} onPress={() => this._navigateToScreen(item)}>, has joined your <Text style={{ fontWeight: 'bold', color: '#333' }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                    </Body>
                                                    <Right style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                        <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                            {isLoading && itemState === item.id ? <Spinner size="small" color="#F44336" style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: '#F44336' }} />}
                                                        </Button>
                                                    </Right>
                                                </ListItem>
                                            </View>
                                        } keyExtractor={item => item && item.id} />
                                    <View style={{ borderWidth: 0.4, borderColor: 'rgba(0,0,0,0.1)' }} />
                                </View> : null}
                        </List>
                        : <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text
                                allowFontScaling={false}
                                minimumFontScale={wp(6)}
                                style={{ top: 50, fontSize: wp(6), color: '#333', fontWeight: 'normal', letterSpacing: 1 }}>
                                Nothing here...
                            </Text>
                        </View>}
                </Content>
            </Container>
        );
    }
}

export default withNavigation(NotificationCenter)