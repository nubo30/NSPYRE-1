import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Modal, Alert } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button, Icon, Separator, Switch } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Colors
import { colorsPalette } from '../../../global/static/colors'

// Child Components
import Participants from './participants'
import ViewsVideo from './viewsVideo'

// AWS
import * as mutations from '../../../../src/graphql/mutations'

class Staticstics extends Component {
    state = {
        showInCaseOfSuccess: false,
        usersSharedModal: false,
        modalAnimated: false,
        usersLikesModal: false,
        usersViewsVideoModal: false,
        participantsModal: false,
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
            case "com.facebook.Messenger.ShareExtension": return "Messenger"
            case "com.tinyspeck.chatlyio.share": return "Slack"
            case "com.google.Gmail.ShareExtension": return "Gmail"
            case "com.apple.UIKit.activity.Message": return "SMS"
            case "com.skype.skype.sharingextension": return "Skype"
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


    _usersViewsVideoModal = (value) => {
        this.setState({ usersViewsVideoModal: value })
    }

    _participantsModal = (value) => {
        this.setState({ participantsModal: value })
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

    _showInCaseOfSuccess = async (value) => {
        const { contest } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id, showInCaseOfSuccess: value } }))
        } catch (error) {
            console.log(error)
        }
    }

    componentWillMount() {
        const { contest } = this.props
        this.setState({
            showInCaseOfSuccess: contest.showInCaseOfSuccess
        })
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.showInCaseOfSuccess !== this.state.showInCaseOfSuccess) {
            this._showInCaseOfSuccess(nextState.showInCaseOfSuccess)
        }
    }

    render() {
        const {

            // Actions
            showInCaseOfSuccess,
            participantsModal,
            usersViewsVideoModal
        } = this.state
        const {
            // Data
            contest,
            userData,

            // Functions
            _modalVisibleShowStatistics
        } = this.props


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
                                    value={showInCaseOfSuccess}
                                    onChange={() => { this.setState({ showInCaseOfSuccess: !showInCaseOfSuccess }) }} />
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

                        {/* PARTICIPANTS */}
                        <ListItem
                            disabled={contest.participants && contest.participants.items.length ? false : true}
                            last icon onPress={() => { this._participantsModal(true) }}>
                            <Left>
                                <Button style={{ backgroundColor: "#00897B" }}>
                                    <Icon type="FontAwesome5" name="users" />
                                </Button>
                            </Left>
                            <Body>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4) }} allowFontScaling={false} minimumFontScale={wp(3)}>Participants</Text>
                            </Body>
                            <Right>
                                <Text>{contest.participants && contest.participants.items.length}</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>

                        {/* VIDEO */}
                        <ListItem
                            disabled={contest.viewsVideo && contest.viewsVideo.items.length ? false : true}
                            last icon onPress={() => { this._usersViewsVideoModal(true) }}>
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

                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={participantsModal}
                    onRequestClose={() => { }}>
                    <Participants _getContestFromAWS={this.props._getContestFromAWS} userData={userData} participants={contest.participants && contest.participants.items} _participantsModal={this._participantsModal} _modalVisibleShowStatistics={_modalVisibleShowStatistics} />
                </Modal>

                {/* USUARIOS QUE HAN VISTO EL VIDEO */}
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={usersViewsVideoModal}
                    onRequestClose={() => { }}>
                    <ViewsVideo userData={userData} contest={contest} _usersViewsVideoModal={this._usersViewsVideoModal} _modalVisibleShowStatistics={_modalVisibleShowStatistics} />
                </Modal>

            </Container>
        );
    }
}

export default Staticstics