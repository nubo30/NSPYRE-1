import React, { Component } from 'react';
import { Modal, FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button, Icon, Separator, Switch, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment';
import UserAvatar from "react-native-user-avatar"
import flatten from 'lodash/flatten'
import values from 'lodash/values'

// Colors
import { colorsPalette } from '../../../global/static/colors'

// Social Networks List
import { snl } from './socialNetworksList/index'

export default class staticstics extends Component {
    state = {
        publicStatistics: false,
        usersSharedModal: false,
        usersCommentsModal: false
    }

    render() {
        const {
            // Actions
            publicStatistics,
            usersSharedModal,
            usersCommentsModal
        } = this.state
        const {
            // Data
            contest,

            // Functions
            _modalVisibleShowStatistics } = this.props
        const sharedCount = contest.statistics && contest.statistics.userSharing.map(item => item.whereItHasBeenShared)
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => _modalVisibleShowStatistics(false)}>
                            <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                            <Text style={{ color: colorsPalette.primaryColor }}>Back</Text>
                        </Button>
                    </Left>
                    <Body />
                    <Right />
                </Header>
                <Content style={{ backgroundColor: colorsPalette.opaqueWhite2 }}>
                    <List style={{ backgroundColor: colorsPalette.secondaryColor }}>
                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderTopColor: 'rgba(0,0,0,0.0)' }} />
                        {/* SHOW TO THE USERS */}
                        <ListItem last icon>
                            <Body>
                                <Text
                                    allowFontScaling={false}
                                    style={{ fontSize: wp(4) }}
                                    allowFontScaling={false}
                                    minimumFontScale={wp(3)}
                                >Would you like to show the contest statistics after it is completed?</Text>
                            </Body>
                            <Right>
                                <Switch
                                    value={publicStatistics}
                                    onChange={() => this.setState({ publicStatistics: !publicStatistics })} />
                            </Right>
                        </ListItem>
                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderBottomColor: colorsPalette.opaqueWhite2, height: 50 }}>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                minimumFontScale={wp(3)}
                                style={{ color: '#3333' }}>
                                The information that will be displayed will be subject to limitations,
                            </Text>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                minimumFontScale={wp(3)}
                                style={{ color: '#3333' }}>
                                doing this can also encourage the participation of users in your
                            </Text>
                            <Text allowFontScaling={false}
                                allowFontScaling={false}
                                minimumFontScale={wp(3)}
                                style={{ color: '#3333' }}>
                                next contest!
                            </Text>
                        </Separator>
                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderTopColor: 'rgba(0,0,0,0.0)' }} />

                        {/* CANTIDAD DE LAS VECES QUE SE HA COMPARTIDO EL CONCURSO */}
                        <ListItem last icon onPress={() => this.setState({ usersSharedModal: true })}>
                            <Left>
                                <Button style={{ backgroundColor: "#F44336" }}>
                                    <Icon type="FontAwesome" name="share-square-o" />
                                </Button>
                            </Left>
                            <Body>
                                <Text
                                    allowFontScaling={false}
                                    style={{ fontSize: wp(4) }}
                                    allowFontScaling={false}
                                    minimumFontScale={wp(3)}
                                >Shared</Text>
                            </Body>
                            <Right>
                                <Text>{flatten(values(sharedCount)).length}</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>

                        {/* CANTIDAD DE COMENTARIOS */}
                        <ListItem last icon onPress={() => this.setState({ usersCommentsModal: true })}>
                            <Left>
                                <Button style={{ backgroundColor: "#1976D2" }}>
                                    <Icon type="FontAwesome" name="comment" />
                                </Button>
                            </Left>
                            <Body>
                                <Text
                                    allowFontScaling={false}
                                    style={{ fontSize: wp(4) }}
                                    allowFontScaling={false}
                                    minimumFontScale={wp(3)}
                                >Comments</Text>
                            </Body>
                            <Right>
                                <Text>30</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>

                        {/* CANTIDAD DE LIKES */}
                        <ListItem last icon onPress={() => this.setState({ usersCommentsModal: true })}>
                            <Left>
                                <Button style={{ backgroundColor: "#E91E63" }}>
                                    <Icon type="AntDesign" name="heart" />
                                </Button>
                            </Left>
                            <Body>
                                <Text
                                    allowFontScaling={false}
                                    style={{ fontSize: wp(4) }}
                                    allowFontScaling={false}
                                    minimumFontScale={wp(3)}
                                >Likes</Text>
                            </Body>
                            <Right>
                                <Text>30</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderTopColor: 'rgba(0,0,0,0.0)' }} />
                        <ListItem last icon onPress={() => this.setState({ usersCommentsModal: true })}>
                            <Left>
                                <Button style={{ backgroundColor: "#E65100" }}>
                                    <Icon type="FontAwesome" name="video-camera" />
                                </Button>
                            </Left>
                            <Body>
                                <Text
                                    allowFontScaling={false}
                                    style={{ fontSize: wp(4) }}
                                    allowFontScaling={false}
                                    minimumFontScale={wp(3)}
                                >Promotional video views</Text>
                            </Body>
                            <Right>
                                <Text>30,000</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>

                {/* USUARIOS QUE HAN COMPARTIDO EL CONCURSO */}
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={usersSharedModal}
                    onRequestClose={() => { }}>
                    <Container>
                        <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                            <Left>
                                <Button transparent onPress={() => this.setState({ usersSharedModal: false })}>
                                    <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                    <Text style={{ color: colorsPalette.primaryColor }}>Close</Text>
                                </Button>
                            </Left>
                            <Body />
                            <Right />
                        </Header>
                        <Content>
                            <List>
                                <FlatList
                                    data={contest.statistics && contest.statistics.userSharing}
                                    renderItem={({ item }) => (
                                        <ListItem avatar>
                                            <Left>
                                                {item.avatar !== null
                                                    ? <Thumbnail source={{ uri: item.avatar }} />
                                                    : <UserAvatar size="55" name={item.name} />}
                                            </Left>
                                            <Body>
                                                <Text>{item.name}</Text>
                                                <Text note>
                                                    {/* Hacer una función donde se determine que red social es según el valor que se le pase por parametro */}
                                                    {`Shared on ${[...new Set(item.whereItHasBeenShared)][0] === 'ph.telegra.Telegraph.Share' ? 'Telegram' : null}, ${[...new Set(item.whereItHasBeenShared)][1] === 'net.whatsapp.WhatsApp.ShareExtension' ? 'WhatsApp' : null} and others. ${moment(item.createdAt).fromNow()}`}
                                                </Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    keyExtractor={items => items.createdAt} />
                            </List>
                        </Content>
                    </Container>
                </Modal>

                {/* USUARIOS QUE HAN COMENTADO */}
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={usersCommentsModal}
                    onRequestClose={() => { }}>
                    <Container>
                        <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                            <Left>
                                <Button transparent onPress={() => this.setState({ usersCommentsModal: false })}>
                                    <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                    <Text style={{ color: colorsPalette.primaryColor }}>Close</Text>
                                </Button>
                            </Left>
                            <Body />
                            <Right />
                        </Header>
                        <Content>
                            <List>
                                <ListItem avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: 'https://images.unsplash.com/photo-1568659672931-c98d3639a4b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }} />
                                    </Left>
                                    <Body>
                                        <Text>Kumar Pratik</Text>
                                        <Text note>Es el mejro concurso en el cual he participado!</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </Content>
                    </Container>
                </Modal>

            </Container>
        );
    }
}

// .map(item =>
//     item === 'ph.telegra.Telegraph.Share'
//         ? 'Telegram, '
//         : item === 'net.whatsapp.WhatsApp.ShareExtension'
//             ? 'WhatsApp, '
//             : item === 'com.google.hangouts.ShareExtension'
//                 ? 'Hangouts'
//                 : item