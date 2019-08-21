import React, { Component } from 'react';
import { FlatList } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Thumbnail, View } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import moment from 'moment'


import { MyStatusBar } from '../../Global/statusBar/index'


export default class NotificationCenter extends Component {

    render() {
        const { _changeSwiper, notifications } = this.props

        let filterNotification = notifications.map(item => { return new Date(item.createdAt).getDay() - 2 > 0 ? item : null })

        // Las notificaciones duarán solo 7 días
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
                    <List style={{ width: '100%' }}>
                        <Text style={{ fontWeight: 'bold', left: 10, marginTop: 10, marginBottom: 5 }}>Esta semana</Text>
                        <FlatList
                            data={filterNotification}
                            renderItem={({ item }) => (
                                item && <View>
                                    <ListItem avatar onPress={() => console.log('Presionado!')}>
                                        <Left style={{ top: -5 }}>
                                            {item.avatar !== null
                                                ? <Thumbnail source={{ uri: item.avatar }} />
                                                : <UserAvatar size="55" name={item.userFrom} />}
                                        </Left>
                                        <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                            <Text>{_.startCase(item.userFrom)}<Text style={{ color: '#333', fontWeight: '100' }}>, has joined your contest, today at {moment(item.createAt).startOf('day').fromNow()}. Touch to see!</Text></Text>
                                        </Body>
                                    </ListItem>
                                    <View style={{ borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)' }} />
                                </View>
                            )} keyExtractor={item => item && item.id} />


                        <View style={{ top: 30 }}>
                            <Text style={{ fontWeight: 'bold', left: 10, marginBottom: 5 }}>Anteriores</Text>
                            <ListItem avatar onPress={() => console.log('Presionado!')}>
                                <Left>
                                    <Thumbnail
                                        style={{ top: -5 }}
                                        source={{ uri: 'https://images.unsplash.com/photo-1566332242436-086c43cfe91e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' }} />
                                </Left>
                                <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                    <Text>Kumar Pratik<Text style={{ color: '#333', fontWeight: '100' }}>, se ha unido a tu concurso, hoy a las 3:00 PM. Toca para ver!</Text></Text>
                                </Body>
                            </ListItem>
                            <View style={{ borderWidth: 0.4, borderColor: 'rgba(0,0,0,0.1)' }} />
                        </View>
                    </List>
                </Content>
                <Footer />
            </Container>

        );
    }
}