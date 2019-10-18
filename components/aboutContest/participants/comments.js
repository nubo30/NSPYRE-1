import React, { Component } from 'react';
import { FlatList, Alert } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, ListItem, Text, Left, Body, Button, Icon, Thumbnail, View, Title, Right, Form, Textarea, Spinner, Toast, Root } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment';
import UserAvatar from "react-native-user-avatar"
import ModalAnimated from 'react-native-modal'
import ReadMore from 'react-native-read-more-text';

// Colors
import { colorsPalette } from '../../global/static/colors'

// AWS
import * as mutations from '../../../src/graphql/mutations'
import * as queries from '../../../src/graphql/queries'

class Comments extends Component {
    state = { modalAnimated: false, modalComment: false, comment: "", isLoading: false, modalUpdateComment: false, itemToUpdate: {} }


    _makeComment = async () => {
        this.setState({ isLoading: true })
        const userData = this.props.navigation.getParam('userData')
        const { item, _getParticipation } = this.props
        const comment = {
            name: userData.name,
            idUserComments: userData.id,
            createdAt: moment().toISOString(),
            avatar: userData.avatar,
            commentsToParticipantsParticipantsId: item.id,
            comments: this.state.comment
        }
        try {
            await API.graphql(graphqlOperation(mutations.createCommentsToParticipants, { input: comment }))
            this.setState({ isLoading: false, modalComment: false })
            _getParticipation()
            this._createNotification()
        } catch (error) {
            this.setState({ isLoading: false })
            Toast.show({
                text: "Oops! An error has occurred. Try again, please",
                buttonText: "Okay",
                type: "danger",
                position: 'top',
                duration: 3000
            })
            console.log(error)
        }
    }

    _updateComment = async () => {
        this.setState({ isLoading: true })
        const userData = this.props.navigation.getParam('userData')
        const { itemToUpdate } = this.state
        const { _getParticipation } = this.props
        const comment = {
            id: itemToUpdate.id,
            name: itemToUpdate.name,
            idUserComments: itemToUpdate.idUserComments,
            createdAt: moment().toISOString(),
            avatar: userData.avatar,
            commentsToParticipantsParticipantsId: itemToUpdate.commentsToParticipantsParticipantsId,
            comments: this.state.comment
        }
        try {
            await API.graphql(graphqlOperation(mutations.updateCommentsToParticipants, { input: comment }))
            this.setState({ isLoading: false, modalUpdateComment: false })
            _getParticipation()
            setTimeout(() => { this.setState({ modalAnimated: true }) }, 500);
        } catch (error) {
            this.setState({ isLoading: false })
            Toast.show({
                text: "Error updated, try again",
                buttonText: "Okay",
                type: "danger",
                position: 'top',
                duration: 3000
            })
            console.log(error)
        }
    }

    _openOrCloseModal = (item) => {
        this.setState({ modalAnimated: false })
        setTimeout(() => {
            this.setState({ modalUpdateComment: true, comment: item.comments })
        }, 500);
    }

    _deleteComment = async (item) => {
        const { _getParticipation } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.deleteCommentsToParticipants, { input: { id: item.id } }))
            this.setState({ modalAnimated: false })
            _getParticipation()
            setTimeout(() => { this.setState({ modalAnimated: true }) }, 500);
        } catch (error) {
            Toast.show({
                text: "Error deleting, try again",
                buttonText: "Okay",
                type: "danger",
                position: 'top',
                duration: 3000
            })
        }
    }

    _createNotification = async () => {
        const userData = this.props.navigation.getParam('userData')
        const { contest, item } = this.props
        try {
            const respose = await API.graphql(graphqlOperation(queries.getUser, { id: item.participantId }))
            const input = {
                createdAt: moment().toISOString(),
                expirationDateWeek: new Date(new Date().setDate(new Date().getDate() + 7)),
                avatar: userData.avatar === null ? null : userData.avatar,
                idUSerFrom: userData.id,
                idUserTo: item.participantId,
                userFrom: userData.name,
                userTo: item.nameUser,
                expoPushToken: respose.data.getUser.notificationToken === null ? 'none' : respose.data.getUser.notificationToken,
                messageTitle: `${userData.name} has comment on your participation`,
                messageBody: `${this.state.comment}. In the contest ${contest.general.nameOfContest}.`,
                nameOfcontest: contest.general.nameOfContest,
                JSONdata: JSON.stringify({
                    "type": 'commentParticipants',
                    "rute": "AboutContest",
                    "userData": { id: userData.id },
                    "contest": {
                        "id": contest.id,
                        "user": { id: contest.user.id },
                        "prizes": [],
                        "participants": { items: [] },
                        "general": {
                            "nameOfContest": contest.general.nameOfContest,
                            "picture": { url: contest.general.picture.url },
                            "video": { url: contest.general.video.url }
                        }
                    }
                }),
            }
            const { data } = await API.graphql(graphqlOperation(mutations.createNotifications, { input }))
            await API.graphql(graphqlOperation(queries.sendNotification, { notificationId: data.createNotifications.id }))
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        const userData = this.props.navigation.getParam('userData')
        const { modalAnimated, modalComment, comment, isLoading, modalUpdateComment } = this.state
        const { item } = this.props
        return (
            <View>
                <Button
                    onPress={() => this.setState({ modalComment: true, comment: "" })}
                    onLongPress={() => this.setState({ modalAnimated: true })}
                    small iconLeft style={{ backgroundColor: colorsPalette.transparent, right: 20 }}>
                    <Icon type="MaterialCommunityIcons" name="comment" style={{ color: colorsPalette.gradientGray, right: 5 }} />
                    <Text allowFontScaling={false} style={{ fontSize: wp(3), right: 15, color: colorsPalette.gradientGray }}>{item.commentsToParticipants && item.commentsToParticipants.items && item.commentsToParticipants && item.commentsToParticipants.items.length}</Text>
                </Button>

                {/* VER LOS COMENTARIOS DE LOS USUARIOS */}
                <ModalAnimated
                    isVisible={modalAnimated}
                    onSwipeComplete={() => this.setState({ modalAnimated: false })}
                    swipeDirection={['left', 'right', 'down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}>
                    <Root>
                        <View style={{
                            backgroundColor: colorsPalette.secondaryColor,
                            padding: 15,
                            justifyContent: 'center',
                            borderTopStartRadius: 10,
                            borderTopEndRadius: 10,
                            borderColor: 'rgba(0, 0, 0, 0.3)',
                            flex: 1,
                            maxHeight: 600,
                            position: 'absolute',
                            bottom: 0,
                            width: '100%'
                        }}>
                            <View style={{ flex: 0.1, justifyContent: 'center', height: 35 }}>
                                <Icon type="AntDesign" name="minus" style={{ alignSelf: 'center', fontSize: wp(13), top: -10 }} />
                                <Text allowFontScaling={false} style={{ fontSize: wp(3.5), alignSelf: 'center', color: colorsPalette.gradientGray, top: -10 }}>User Comments</Text>
                            </View>
                            <Content contentContainerStyle={{ flex: 1 }}>
                                {item.commentsToParticipants && item.commentsToParticipants.items && item.commentsToParticipants && item.commentsToParticipants.items.length
                                    ? <FlatList
                                        data={item.commentsToParticipants && item.commentsToParticipants.items && item.commentsToParticipants && item.commentsToParticipants.items.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })}
                                        renderItem={({ item }) => (
                                            <View>
                                                <View>
                                                    <ListItem
                                                        avatar
                                                        underlayColor={colorsPalette.secondaryColor}>
                                                        <Button transparent style={{ position: 'absolute', zIndex: 1000, width: "100%" }} onPress={() => { this.setState({ modalAnimated: false }); this.props.navigation.navigate('UserProfile', { userId: item.idUserComments }) }} />
                                                        <Left>
                                                            {item.avatar !== null
                                                                ? <Thumbnail small source={{ uri: item.avatar }} />
                                                                : <UserAvatar size="35" name={item.name} />}
                                                        </Left>
                                                        <Body style={{ borderBottomColor: colorsPalette.transparent, top: 5 }}>
                                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData.id === item.idUserComments ? "You" : item.name}  <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}>{moment(item.createdAt).fromNow()} (edited)</Text></Text>
                                                            <ReadMore numberOfLines={3}>
                                                                <Text allowFontScaling={false} note style={{ fontSize: wp(4), fontWeight: 'normal' }}>{item.comments}</Text>
                                                            </ReadMore>
                                                        </Body>
                                                    </ListItem>
                                                </View>
                                                {userData.id === item.idUserComments
                                                    ? <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Button transparent small style={{ left: 10 }} onPress={() => { this._openOrCloseModal(item); this.setState({ itemToUpdate: item }) }}>
                                                            <Icon type="MaterialIcons" name="mode-edit" style={{ color: colorsPalette.gradientGray }} />
                                                        </Button>
                                                        <Button
                                                            transparent small onPress={() => Alert.alert(
                                                                '',
                                                                'You are deleting your comment, do you want to continue?',
                                                                [
                                                                    {
                                                                        text: 'Cancel',
                                                                        onPress: () => { },
                                                                        style: 'cancel',
                                                                    },
                                                                    { text: 'OK', onPress: () => this._deleteComment(item) },
                                                                ],
                                                                { cancelable: false },
                                                            )}>
                                                            <Icon type="Ionicons" name="md-trash" style={{ color: colorsPalette.errColor }} />
                                                        </Button>

                                                    </View> : null}
                                            </View>
                                        )}
                                        keyExtractor={item => item.createdAt} />
                                    : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 20 }}>
                                        <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: wp(5), color: colorsPalette.gradientGray }}>Here are the users who have commented, at the moment nobody has done it, why not you?</Text>
                                    </View>}
                            </Content>
                            <Button style={{ alignSelf: 'center', backgroundColor: colorsPalette.primaryColor, top: 5 }} small onPress={() => this.setState({ modalAnimated: false })}>
                                <Text allowFontScaling={false}>CLOSE</Text>
                            </Button>
                        </View>
                    </Root>
                </ModalAnimated>

                {/* Modal para crear comentarios */}
                <ModalAnimated
                    onSwipeComplete={() => this.setState({ modalComment: false })}
                    swipeDirection={['left', 'right', 'down']}
                    isVisible={modalComment}
                    style={{ justifyContent: 'flex-end', margin: 0 }}>
                    <Root>
                        <View style={{
                            backgroundColor: colorsPalette.secondaryColor,
                            justifyContent: 'center',
                            borderTopStartRadius: 10,
                            borderTopEndRadius: 10,
                            borderColor: 'rgba(0, 0, 0, 0.3)',
                            flex: 1,
                            minHeight: 600,
                            maxHeight: 600,
                            position: 'absolute',
                            bottom: 0,
                            width: '100%'
                        }}>
                            <Container style={{ borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
                                <Header style={{ backgroundColor: colorsPalette.secondaryColor, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                                    <Left>
                                        <Button transparent onPress={() => this.setState({ modalComment: false })}>
                                            <Text
                                                allowFontScaling={false}
                                                minimumFontScale={wp(4)}
                                                style={{ color: colorsPalette.primaryColor, fontSize: wp(4), top: -10 }}>Close</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Title style={{ top: -10 }}>Comment</Title>
                                    </Body>
                                    <Right>
                                        <Button
                                            style={{ top: -10 }}
                                            disabled={comment.length > 10 ? false : true}
                                            transparent
                                            onPress={() => this._makeComment()}>
                                            {isLoading
                                                ? <Spinner color={colorsPalette.primaryColor} size="small" style={{ right: 5, top: -5 }} />
                                                : <Text
                                                    allowFontScaling={false}
                                                    minimumFontScale={wp(4)}
                                                    style={{ color: comment.length > 10 ? colorsPalette.primaryColor : colorsPalette.gradientGray, fontSize: wp(4), top: -5 }}>DONE</Text>}
                                        </Button>
                                    </Right>
                                </Header>
                                <Content scrollEnabled={false}>
                                    <ListItem itemDivider style={{ borderBottomColor: colorsPalette.underlinesColor, borderBottomWidth: 0.5 }}>
                                        <Text>PLEASE, WRITE YOUR COMMENT:</Text>
                                    </ListItem>
                                    <Form style={{ padding: 10 }}>
                                        <Textarea
                                            maxLength={1024}
                                            autoFocus={true}
                                            value={comment}
                                            onChangeText={(comment) => this.setState({ comment })}
                                            allowFontScaling={false}
                                            style={{ borderColor: colorsPalette.transparent }}
                                            rowSpan={10}
                                            selectionColor={colorsPalette.primaryColor}
                                        />
                                    </Form>
                                </Content>
                            </Container>
                        </View>
                    </Root>
                </ModalAnimated>

                {/* MODAL PARA ACTUALZIAR LOS COMENTARIOS */}
                <ModalAnimated
                    onSwipeComplete={() => this.setState({ modalUpdateComment: false })}
                    swipeDirection={['left', 'right', 'down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    animationType="slide"
                    isVisible={modalUpdateComment}>
                    <Root>
                        <View style={{
                            backgroundColor: colorsPalette.secondaryColor,
                            justifyContent: 'center',
                            borderTopStartRadius: 10,
                            borderTopEndRadius: 10,
                            borderColor: 'rgba(0, 0, 0, 0.3)',
                            flex: 1,
                            minHeight: 600,
                            maxHeight: 600,
                            position: 'absolute',
                            bottom: 0,
                            width: '100%'
                        }}>
                            <Container style={{ borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
                                <Header style={{ backgroundColor: colorsPalette.secondaryColor, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                                    <Left>
                                        <Button transparent onPress={() => this.setState({ modalUpdateComment: false })}>
                                            <Text
                                                allowFontScaling={false}
                                                minimumFontScale={wp(4)}
                                                style={{ color: colorsPalette.primaryColor, fontSize: wp(4), top: -10 }}>Close</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Title style={{ top: -10 }}>Update comment</Title>
                                    </Body>
                                    <Right>
                                        <Button
                                            style={{ top: -10 }}
                                            disabled={comment.length > 10 ? false : true}
                                            transparent
                                            onPress={() => this._updateComment()}>
                                            {isLoading
                                                ? <Spinner color={colorsPalette.primaryColor} size="small" style={{ right: 5, top: -5 }} />
                                                : <Text
                                                    allowFontScaling={false}
                                                    minimumFontScale={wp(4)}
                                                    style={{ color: comment.length > 10 ? colorsPalette.primaryColor : colorsPalette.gradientGray, fontSize: wp(4), top: -5 }}>UPDATE</Text>}
                                        </Button>
                                    </Right>
                                </Header>
                                <Content scrollEnabled={false}>
                                    <ListItem itemDivider style={{ borderBottomColor: colorsPalette.underlinesColor, borderBottomWidth: 0.5 }}>
                                        <Text>PLEASE, UPDATE YOUR COMMENT:</Text>
                                    </ListItem>
                                    <Form style={{ padding: 10 }}>
                                        <Textarea
                                            maxLength={1024}
                                            autoFocus={true}
                                            value={comment}
                                            onChangeText={(comment) => this.setState({ comment })}
                                            allowFontScaling={false}
                                            style={{ borderColor: colorsPalette.transparent }}
                                            rowSpan={10}
                                            selectionColor={colorsPalette.primaryColor} />
                                    </Form>
                                </Content>
                            </Container>
                        </View>
                    </Root>
                </ModalAnimated>
            </View>
        );
    }
}

export default withNavigation(Comments)