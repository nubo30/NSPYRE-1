import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { FlatList, RefreshControl } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, List, ListItem, Thumbnail, View, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import moment from 'moment'


import { MyStatusBar } from '../../global/statusBar/index'

import * as mutations from '../../../src/graphql/mutations'

// Colors
import { colorsPalette } from '../../global/static/colors'


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
                navigation.navigate(parseData.rute, { userData: parseData.userData, contest: Object.assign(parseData.contest, { timer: null, aboutTheUser: { location: "" }, usersLikes: { items: [] } }) })
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
            <Container style={{ backgroundColor: colorsPalette.secondaryColor }}>
                <Header noLeft style={{ backgroundColor: colorsPalette.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _changeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: colorsPalette.secondaryColor }} />
                            <Text
                                allowFontScaling={false}
                                minimumFontScale={wp(4)}
                                style={{ left: 5, color: colorsPalette.secondaryColor, fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title
                            allowFontScaling={false}
                            minimumFontScale={wp(6)}
                            style={{ fontSize: wp(6), color: colorsPalette.secondaryColor, left: 15 }}>Notification Center</Title>
                    </Left>
                </Header>
                <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                <Content refreshControl={<RefreshControl tintColor={colorsPalette.primaryColor} refreshing={refreshing} onRefresh={this._onRefresh} />}>
                    {areThereNotifications
                        ? <List style={{ width: '100%' }}>
                            {filterDateNotifications.length
                                ? <View>
                                    <Text
                                        allowFontScaling={false}
                                        minimumFontScale={wp(4)}
                                        style={{ fontWeight: 'bold', left: 10, marginTop: 10, marginBottom: 5 }}>This week</Text>
                                    <FlatList
                                        data={filterDateNotifications.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })}
                                        renderItem={({ item }) =>
                                            item &&
                                            <View>
                                                {item.type === "participantsInTheContest"
                                                    ? <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                        <Left style={{ top: -5 }}>
                                                            {item.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.avatar }} />
                                                                : <UserAvatar size="35" name={item.userFrom} />}
                                                        </Left>
                                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: -5 }}>
                                                            <Text
                                                                allowFontScaling={false}
                                                                minimumFontScale={wp(4)}
                                                                style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: "" })}>{_.startCase(item.userFrom)}<Text style={{ color: colorsPalette.darkFont, fontWeight: 'normal', fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>, has joined your <Text style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                        </Body>
                                                        <Right style={{ borderBottomColor: colorsPalette.transparent, top: -10 }}>
                                                            <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                                {isLoading && itemState === item.id ? <Spinner size="small" color={colorsPalette.errColor} style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: colorsPalette.errColor }} />}
                                                            </Button>
                                                        </Right>
                                                    </ListItem> : null}
                                                {item.type === 'commentParticipants'
                                                    ? <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                        <Left style={{ top: -5 }}>
                                                            {item.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.avatar }} />
                                                                : <UserAvatar size="35" name={item.userFrom} />}
                                                        </Left>
                                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: -5 }}>
                                                            <Text allowFontScaling={false} minimumFontScale={wp(4)} style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.idUSerFrom })}>{_.startCase(item.userFrom)}<Text style={{ color: colorsPalette.darkFont, fontWeight: 'normal', fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>, commented on your participation in the <Text style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                        </Body>
                                                        <Right style={{ borderBottomColor: colorsPalette.transparent, top: -10 }}>
                                                            <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                                {isLoading && itemState === item.id ? <Spinner size="small" color={colorsPalette.errColor} style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: colorsPalette.errColor }} />}
                                                            </Button>
                                                        </Right>
                                                    </ListItem> : null}
                                                {item.type === 'likeToParticipants'
                                                    ? <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                        <Left style={{ top: -5 }}>
                                                            {item.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.avatar }} />
                                                                : <UserAvatar size="35" name={item.userFrom} />}
                                                        </Left>
                                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: -5 }}>
                                                            <Text allowFontScaling={false} minimumFontScale={wp(4)} style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.idUSerFrom })}>{_.startCase(item.userFrom)}<Text style={{ color: colorsPalette.darkFont, fontWeight: 'normal', fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>, liked your participation in the <Text style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                        </Body>
                                                        <Right style={{ borderBottomColor: colorsPalette.transparent, top: -10 }}>
                                                            <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                                {isLoading && itemState === item.id ? <Spinner size="small" color={colorsPalette.errColor} style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: colorsPalette.errColor }} />}
                                                            </Button>
                                                        </Right>
                                                    </ListItem> : null}
                                                {item.type === 'shareParticipants'
                                                    ? <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                        <Left style={{ top: -5 }}>
                                                            {item.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.avatar }} />
                                                                : <UserAvatar size="35" name={item.userFrom} />}
                                                        </Left>
                                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: -5 }}>
                                                            <Text allowFontScaling={false} minimumFontScale={wp(4)} style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.idUSerFrom })}>{_.startCase(item.userFrom)}<Text style={{ color: colorsPalette.darkFont, fontWeight: 'normal', fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>, shared your participation in the <Text style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                        </Body>
                                                        <Right style={{ borderBottomColor: colorsPalette.transparent, top: -10 }}>
                                                            <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                                {isLoading && itemState === item.id ? <Spinner size="small" color={colorsPalette.errColor} style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: colorsPalette.errColor }} />}
                                                            </Button>
                                                        </Right>
                                                    </ListItem> : null}
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
                                        data={filterDateNotificationsx2.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })}
                                        renderItem={({ item }) =>
                                            item && <View>
                                                {item.type === "participantsInTheContest"
                                                    ? <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                        <Left style={{ top: -5 }}>
                                                            {item.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.avatar }} />
                                                                : <UserAvatar size="35" name={item.userFrom} />}
                                                        </Left>
                                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: -5 }}>
                                                            <Text
                                                                allowFontScaling={false}
                                                                minimumFontScale={wp(4)}
                                                                style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.idUSerFrom })}>{_.startCase(item.userFrom)}<Text style={{ color: colorsPalette.darkFont, fontWeight: 'normal', fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>, has joined your <Text style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                        </Body>
                                                        <Right style={{ borderBottomColor: colorsPalette.transparent, top: -10 }}>
                                                            <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                                {isLoading && itemState === item.id ? <Spinner size="small" color={colorsPalette.errColor} style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: colorsPalette.errColor }} />}
                                                            </Button>
                                                        </Right>
                                                    </ListItem> : null}
                                                {item.type === 'commentParticipants'
                                                    ? <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                        <Left style={{ top: -5 }}>
                                                            {item.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.avatar }} />
                                                                : <UserAvatar size="35" name={item.userFrom} />}
                                                        </Left>
                                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: -5 }}>
                                                            <Text allowFontScaling={false} minimumFontScale={wp(4)} style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.idUSerFrom })}>{_.startCase(item.userFrom)}<Text style={{ color: colorsPalette.darkFont, fontWeight: 'normal', fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>, commented on your participation in the <Text style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                        </Body>
                                                        <Right style={{ borderBottomColor: colorsPalette.transparent, top: -10 }}>
                                                            <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                                {isLoading && itemState === item.id ? <Spinner size="small" color={colorsPalette.errColor} style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: colorsPalette.errColor }} />}
                                                            </Button>
                                                        </Right>
                                                    </ListItem> : null}
                                                {item.type === 'likeToParticipants'
                                                    ? <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                        <Left style={{ top: -5 }}>
                                                            {item.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.avatar }} />
                                                                : <UserAvatar size="35" name={item.userFrom} />}
                                                        </Left>
                                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: -5 }}>
                                                            <Text allowFontScaling={false} minimumFontScale={wp(4)} style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.idUSerFrom })}>{_.startCase(item.userFrom)}<Text style={{ color: colorsPalette.darkFont, fontWeight: 'normal', fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>, liked your participation in the <Text style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                        </Body>
                                                        <Right style={{ borderBottomColor: colorsPalette.transparent, top: -10 }}>
                                                            <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                                {isLoading && itemState === item.id ? <Spinner size="small" color={colorsPalette.errColor} style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: colorsPalette.errColor }} />}
                                                            </Button>
                                                        </Right>
                                                    </ListItem> : null}
                                                {item.type === 'shareParticipants'
                                                    ? <ListItem disabled={isLoading} avatar onPress={() => this._navigateToScreen(item)}>
                                                        <Left style={{ top: -5 }}>
                                                            {item.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.avatar }} />
                                                                : <UserAvatar size="35" name={item.userFrom} />}
                                                        </Left>
                                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: -5 }}>
                                                            <Text allowFontScaling={false} minimumFontScale={wp(4)} style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this.props.navigation.navigate('UserProfile', { userId: item.idUSerFrom })}>{_.startCase(item.userFrom)}<Text style={{ color: colorsPalette.darkFont, fontWeight: 'normal', fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>, shared your participation in the <Text style={{ fontWeight: 'bold', color: colorsPalette.darkFont, fontSize: wp(3) }} onPress={() => this._navigateToScreen(item)}>{_.lowerCase(item.contest.general.nameOfContest)}</Text> contest, at {moment(item.createdAt).fromNow()}. Touch to see!</Text></Text>
                                                        </Body>
                                                        <Right style={{ borderBottomColor: colorsPalette.transparent, top: -10 }}>
                                                            <Button disabled={isLoading} transparent onPress={() => this._deleteNotifications(item)}>
                                                                {isLoading && itemState === item.id ? <Spinner size="small" color={colorsPalette.errColor} style={{ left: -14 }} /> : <Icon name='md-trash' type="Ionicons" style={{ color: colorsPalette.errColor }} />}
                                                            </Button>
                                                        </Right>
                                                    </ListItem> : null}
                                            </View>
                                        } keyExtractor={item => item && item.id} />
                                    <View style={{ borderWidth: 0.4, borderColor: 'rgba(0,0,0,0.1)' }} />
                                </View> : null}
                        </List>
                        : <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text
                                allowFontScaling={false}
                                minimumFontScale={wp(6)}
                                style={{ top: 50, fontSize: wp(6), color: colorsPalette.darkFont, fontWeight: 'normal', letterSpacing: 1 }}>
                                Nothing here...
                            </Text>
                        </View>}
                </Content>
            </Container>
        );
    }
}

export default withNavigation(NotificationCenter)