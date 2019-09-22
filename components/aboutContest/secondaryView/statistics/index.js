import React, { Component } from 'react';
import { Modal, Alert } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button, Icon, Separator, Switch } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import flatten from 'lodash/flatten'
import values from 'lodash/values'

// Colors
import { colorsPalette } from '../../../global/static/colors'

// Child Components
import Share from './share'
import Likes from './likes'

class Staticstics extends Component {
    state = {
        publicStatistics: false,
        usersSharedModal: false,
        modalAnimated: false,
        usersLikesModal: false,
        userInfo: {}
    }

    // Determinar en cual aplicación se ha compartido el concurso
    _applicationInWhichTheContestHasBeenShared = (value) => {
        switch (value) {
            case "ph.telegra.Telegraph.Share": return "Telegram"
            case "net.whatsapp.WhatsApp.ShareExtension": return "WhatsApp"
            case "com.google.hangouts.ShareExtension": return "Hangouts"
            case "com.atebits.Tweetie2.ShareExtension": return "Twitter"
            case "com.apple.UIKit.activity.PostToFacebook": return "Facebook"
            case "com.tinyspeck.chatlyio.share": return "Slack"
            case "com.google.Gmail.ShareExtension": return "Gmail"
            case "com.apple.UIKit.activity.Message": return "SMS"
            default: break;
        }
    }

    _closeAllModalsAndGoToProfileUser = (item) => {
        const { _modalVisibleShowStatistics, navigation } = this.props
        this.setState({ usersSharedModal: false });
        setTimeout(() => {
            _modalVisibleShowStatistics(false);
            navigation.navigate("UserProfile", { userId: item.idUserSharing })
        }, 1000);
    }

    _usersSharedModal = (value) => {
        this.setState({ usersSharedModal: value })
    }

    _usersLikesModal = (value) => {
        this.setState({ usersLikesModal: value })
    }

    _ifTimerDifNull = () => {
        const { contest, userData } = this.props
        if (contest.timer !== null) {
            this._usersLikesModal(true)
        } else if (contest.timer === null) {
            Alert.alert(
                `${userData.name}`,
                'First enable the contest timer to continue',
                [{ text: 'OK', onPress: () => { } }],
                { cancelable: false },
            );
        }
    }

    render() {
        const {

            // Actions
            publicStatistics,
            usersSharedModal,
            usersLikesModal
        } = this.state
        const {
            // Data
            contest,
            userData,

            // Functions
            _modalVisibleShowStatistics
        } = this.props
        const sharedCount = contest.usersSharing === null ? [] : contest.usersSharing.items.map(item => item.whereItHasBeenShared)
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => _modalVisibleShowStatistics(false)}>
                            <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                            <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Back</Text>
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
                        <ListItem disabled={sharedCount.length ? false : true} last icon onPress={() => this._usersSharedModal(true)}>
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
                        <ListItem last icon disabled={contest.statistics === null ? true : contest.usersLikes === null ? true : contest.usersLikes.items.length ? false : true} onPress={() => this._ifTimerDifNull()}>
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
                                <Text>{contest.usersLikes === null ? 0 : contest.usersLikes.userLikes === null ? 0 : contest.usersLikes.items.length}</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderTopColor: 'rgba(0,0,0,0.0)' }} />

                        {/* VIDEO */}
                        <ListItem last icon onPress={() => {}}>
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
                                <Text>{contest.viewsVideo && contest.viewsVideo.items.length}</Text>
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
                    <Share userData={userData} sharedCount={sharedCount} contest={contest} _usersSharedModal={this._usersSharedModal} _modalVisibleShowStatistics={_modalVisibleShowStatistics} />
                </Modal>

                {/* USUARIOS QUE HAN DEJADO LIKES EN EL CONCURSO */}
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={usersLikesModal}
                    onRequestClose={() => { }}>
                    <Likes userData={userData} contest={contest} _usersLikesModal={this._usersLikesModal} _modalVisibleShowStatistics={_modalVisibleShowStatistics} />
                </Modal>

            </Container>
        );
    }
}

export default Staticstics