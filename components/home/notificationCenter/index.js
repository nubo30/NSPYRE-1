import React, { Component } from 'react';
import { FlatList } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, List, ListItem, Thumbnail, View, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import moment from 'moment'


import { MyStatusBar } from '../../Global/statusBar/index'

import * as mutations from '../../../src/graphql/mutations'


export default class NotificationCenter extends Component {

    state = { itemState: { id: "" } }

    _deleteNotifications = async (item) => {
        this.setState({ itemState: item })
        try {
            API.graphql(graphqlOperation(mutations.deleteNotifications, { input: { id: item.id } }))
            this.setState({ itemState: { id: "" } })
        } catch (error) {
            console.log(error)
            this.setState({ itemState: { id: "" } })
        }
    }

    render() {
        const { itemState } = this.state
        const { _changeSwiper, notifications } = this.props
        console.log(notifications, ">--------------------------------------")
        let filterDateNotifications = notifications.filter(item => new Date(item.expirationDateWeek) < new Date() ? null : item)
        let filterDateNotificationsx2 = notifications.filter(item => new Date(item.expirationDateWeek) > new Date() ? null : item)
        let areThereNotifications = filterDateNotifications.length + filterDateNotificationsx2.length
        return (
            <Container style={{ backgroundColor: "#FAFAFA" }}>
                <Header noLeft style={{ backgroundColor: "#D81B60", justifyContent: 'center', alignItems: 'center' }}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _changeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: "#FFF" }} />
                            <Text style={{ left: 5, color: "#FFF" }}>Back</Text>
                        </Button>
                        <Title style={{ fontSize: wp(7), color: "#FFF", left: 20 }}>Notification Center</Title>
                    </Left>
                </Header>
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                <Content>
                    {areThereNotifications
                        ? <List style={{ width: '100%' }}>
                            {filterDateNotifications.length
                                ? <View>
                                    <Text style={{ fontWeight: 'bold', left: 10, marginTop: 10, marginBottom: 5 }}>This week</Text>
                                    <FlatList
                                        data={filterDateNotifications}
                                        renderItem={({ item }) =>
                                            item && <View>
                                                <ListItem disabled={itemState.id === item.id ? true : false} avatar onPress={() => console.log('Presionado!')}>
                                                    <Left style={{ top: -5 }}>
                                                        {item.avatar !== null
                                                            ? <Thumbnail source={{ uri: item.avatar }} />
                                                            : <UserAvatar size="55" name={item.userFrom} />}
                                                    </Left>
                                                    <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                        <Text>{_.startCase(item.userFrom)}<Text style={{ color: '#333', fontWeight: '100' }}>, has joined your contest, today at {moment(item.createAt).startOf('day').fromNow()}. Touch to see!</Text></Text>
                                                    </Body>
                                                    <Right style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                        <Button disabled={itemState.id === item.id ? true : false} transparent onPress={() => this._deleteNotifications(item)}>
                                                            {itemState.id === item.id ? <Spinner size="small" color="#F44336" /> : <Icon name='md-trash' type="Ionicons" style={{ color: '#F44336' }} />}
                                                        </Button>
                                                    </Right>
                                                </ListItem>
                                                <View style={{ borderWidth: 0.4, borderColor: 'rgba(0,0,0,0.1)' }} />
                                            </View>
                                        } keyExtractor={item => item && item.id} />
                                </View> : null}
                            {filterDateNotificationsx2.length
                                ? <View style={{ top: 30 }}>
                                    <Text style={{ fontWeight: 'bold', left: 10, marginBottom: 5 }}>Previous</Text>
                                    <FlatList
                                        data={filterDateNotificationsx2}
                                        renderItem={({ item }) => (
                                            item && <View>
                                                <ListItem avatar onPress={() => console.log('Presionado!')}>
                                                    <Left>
                                                        <Thumbnail
                                                            style={{ top: -5 }}
                                                            source={{ uri: item.avatar }} />
                                                    </Left>
                                                    <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                        <Text>{_.startCase(item.userFrom)}<Text style={{ color: '#333', fontWeight: '100' }}>, has joined your contest, today at {moment(item.createAt).startOf('day').fromNow()}. Touch to see!</Text></Text>
                                                    </Body>
                                                </ListItem>
                                                <View style={{ borderWidth: 0.4, borderColor: 'rgba(0,0,0,0.1)' }} />
                                            </View>
                                        )} keyExtractor={item => item && item.id} />
                                    <View style={{ borderWidth: 0.4, borderColor: 'rgba(0,0,0,0.1)' }} />
                                </View> : null}
                        </List>
                        : <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ top: 50, fontSize: wp(6), color: '#333', fontWeight: '100', letterSpacing: 2 }}>
                                Nothing here...
                            </Text>
                        </View>}
                </Content>
            </Container>

        );
    }
}