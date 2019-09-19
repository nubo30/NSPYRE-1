import React, { Component } from 'react';
import { FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, List, ListItem, Text, Left, Body, Button, Icon, Thumbnail, View, Title } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment';
import UserAvatar from "react-native-user-avatar"
import ModalAnimated from 'react-native-modal'
import flatten from 'lodash/flatten'

// Colors
import { colorsPalette } from '../../../global/static/colors'

// Child Components
import CPieChart from './charts/CPieChart'

class Share extends Component {

    state = { userInfo: {} }

    // Determinar en cual aplicación se ha compartido el concurso
    _applicationInWhichTheContestHasBeenShared = (value) => {
        if (typeof (value) !== 'string') {
            return value.map(item => {
                switch (item) {
                    case "ph.telegra.Telegraph.Share": return ({ appName: "Telegram", color: colorsPalette.tgColor })
                    case "net.whatsapp.WhatsApp.ShareExtension": return ({ appName: "WhatsApp", color: colorsPalette.waColor })
                    case "com.google.hangouts.ShareExtension": return ({ appName: "Hangouts", color: colorsPalette.hgColor })
                    case "com.atebits.Tweetie2.ShareExtension": return ({ appName: "Twitter", color: colorsPalette.tgColor })
                    case "com.apple.UIKit.activity.PostToFacebook": return ({ appName: "Facebook", color: colorsPalette.fbColor })
                    case "com.tinyspeck.chatlyio.share": return ({ appName: "Slack", color: colorsPalette.scColor })
                    case "com.google.Gmail.ShareExtension": return ({ appName: "Gmail", color: colorsPalette.glColor })
                    default: break;
                }
            })
        } else if (typeof (value) === 'string') {
            switch (value) {
                case "ph.telegra.Telegraph.Share": return "Telegram"
                case "net.whatsapp.WhatsApp.ShareExtension": return "WhatsApp"
                case "com.google.hangouts.ShareExtension": return "Hangouts"
                case "com.atebits.Tweetie2.ShareExtension": return "Twitter"
                case "com.apple.UIKit.activity.PostToFacebook": return "Facebook"
                case "com.tinyspeck.chatlyio.share": return "Slack"
                case "com.google.Gmail.ShareExtension": return "Gmail"
                default: break;
            }
        }
    }

    _closeAllModalsAndGoToProfileUser = (item) => {
        const { _usersSharedModal, _modalVisibleShowStatistics, navigation } = this.props
        _usersSharedModal(false)
        setTimeout(() => {
            _modalVisibleShowStatistics(false);
            navigation.navigate("UserProfile", { userId: item.idUserSharing })
        }, 500);
    }

    render() {
        const {
            // Data
            userInfo,

            // Actions
            modalAnimated
        } = this.state
        const {
            // Data
            contest,
            sharedCount,
            userData,

            // Functions
            _usersSharedModal
        } = this.props

        return (
            <Container>
                <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _usersSharedModal(false)}>
                            <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                            <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Close</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(4.5) }}>Shared on social networks</Title>
                    </Left>
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
                    <View style={{ backgroundColor: colorsPalette.secondaryColor, flex: 0.4, shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                        <CPieChart sharedCount={this._applicationInWhichTheContestHasBeenShared(flatten(sharedCount))} />
                    </View>
                    <List style={{ flex: 0.6 }}>
                        <FlatList
                            data={contest.statistics && contest.statistics.userSharing}
                            renderItem={({ item }) => (
                                <ListItem avatar
                                    onPress={() => this._closeAllModalsAndGoToProfileUser(item)}
                                    onLongPress={() => this.setState({ modalAnimated: true, userInfo: item })} underlayColor={colorsPalette.secondaryColor}>
                                    <Left>
                                        {item.avatar !== null
                                            ? <Thumbnail source={{ uri: item.avatar }} />
                                            : <UserAvatar size="55" name={item.name} />}
                                    </Left>
                                    <Body>
                                        <Text allowFontScaling={false}>{userData.id === item.idUserSharing ? "You" : item.name}</Text>
                                        {console.log([...new Set(item.whereItHasBeenShared)].length)}
                                        <Text note allowFontScaling={false}>
                                            {[...new Set(item.whereItHasBeenShared)].length === 1
                                                ? `Shared in ${this._applicationInWhichTheContestHasBeenShared([...new Set(item.whereItHasBeenShared)][0])}. ${moment(item.createdAt).fromNow()}`
                                                : [...new Set(item.whereItHasBeenShared)].length === 2
                                                    ? `Shared in ${this._applicationInWhichTheContestHasBeenShared([...new Set(item.whereItHasBeenShared)][0])} and ${this._applicationInWhichTheContestHasBeenShared([...new Set(item.whereItHasBeenShared)][1])}. ${moment(item.createdAt).fromNow()}`
                                                    : [...new Set(item.whereItHasBeenShared)].length <= 3
                                                        ? `Shared in ${this._applicationInWhichTheContestHasBeenShared([...new Set(item.whereItHasBeenShared)][0])}, ${this._applicationInWhichTheContestHasBeenShared([...new Set(item.whereItHasBeenShared)][1])} and ${this._applicationInWhichTheContestHasBeenShared([...new Set(item.whereItHasBeenShared)][2])}. ${moment(item.createdAt).fromNow()}`
                                                        : `Shared in ${this._applicationInWhichTheContestHasBeenShared([...new Set(item.whereItHasBeenShared)][0])}, ${this._applicationInWhichTheContestHasBeenShared([...new Set(item.whereItHasBeenShared)][1])}, ${this._applicationInWhichTheContestHasBeenShared([...new Set(item.whereItHasBeenShared)][2])} and others... ${moment(item.createdAt).fromNow()}`}
                                        </Text>
                                    </Body>
                                </ListItem>
                            )}
                            keyExtractor={items => items.createdAt} />
                    </List>
                </Content>

                {/* MODAL PARA MOSTRAR TODA LA INFORMACION DEL USUARIO */}
                {Object.keys(userInfo).length !== 0 ?
                    <ModalAnimated
                        isVisible={modalAnimated}
                        onSwipeComplete={() => this.setState({ modalAnimated: false })}
                        swipeDirection={['up', 'left', 'right', 'down']}
                        style={{ justifyContent: 'flex-end', margin: 0 }}>
                        <View style={{
                            backgroundColor: colorsPalette.secondaryColor,
                            padding: 15,
                            justifyContent: 'center',
                            borderRadius: 4,
                            borderColor: 'rgba(0, 0, 0, 0.3)',
                        }}>
                            <ListItem
                                avatar
                                underlayColor={colorsPalette.secondaryColor}>
                                <Left>
                                    {userInfo.avatar !== null
                                        ? <Thumbnail source={{ uri: userInfo.avatar }} />
                                        : <UserAvatar size="55" name={userInfo.name} />}
                                </Left>
                                <Body style={{ borderBottomColor: colorsPalette.transparent }}>
                                    <Text allowFontScaling={false}>{userData.id === userInfo.idUserSharing ? "You" : userInfo.name}</Text>
                                    <Text note allowFontScaling={false}>
                                        Shared in {[...new Set(userInfo.whereItHasBeenShared.map(item => this._applicationInWhichTheContestHasBeenShared(item)))].join(', ')}.
                                    </Text>
                                </Body>
                            </ListItem>
                            <Button style={{ alignSelf: 'center', backgroundColor: colorsPalette.primaryColor }} small onPress={() => this.setState({ modalAnimated: false })}>
                                <Text allowFontScaling={false}>CLOSE</Text>
                            </Button>
                        </View>
                    </ModalAnimated> : null}
            </Container>
        );
    }
}

export default withNavigation(Share)