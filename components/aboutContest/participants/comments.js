import React, { Component } from 'react';
import { FlatList, Modal, Alert } from 'react-native'
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

class Comments extends Component {
    state = { modalAnimated: false, modalComment: false, comment: "", isLoading: false, modalUpdateComment: false, itemToUpdate: {} }


    _makeComment = async () => {
        this.setState({ isLoading: true })
        const userData = this.props.navigation.getParam('userData')
        const { contest, item } = this.props
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
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            this.setState({ isLoading: false, modalComment: false })
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

    _updateComment = async () => {
        this.setState({ isLoading: true })
        const userData = this.props.navigation.getParam('userData')
        const { itemToUpdate } = this.state
        const { contest } = this.props
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
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            this.setState({ isLoading: false, modalUpdateComment: false })
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
        const { contest } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.deleteCommentsToParticipants, { input: { id: item.id } }))
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            this.setState({ modalAnimated: false })
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
                                {item.commentsToParticipants && item.commentsToParticipants.items && item.commentsToParticipants && item.commentsToParticipants.items.length ? <FlatList
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
                                                                { text: 'OK', onPress: () => { this.setState({ isLoading: true }); this._deleteComment(item) } },
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
                    isVisible={modalComment}
                    style={{ justifyContent: 'flex-end', margin: 0 }}>
                    <Root>
                        <Container>
                            <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                                <Left>
                                    <Button transparent onPress={() => this.setState({ modalComment: false })}>
                                        <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                        <Text
                                            allowFontScaling={false}
                                            minimumFontScale={wp(4)}
                                            style={{ left: 5, color: colorsPalette.primaryColor, fontSize: wp(4) }}>Back</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Title>Comment</Title>
                                </Body>
                                <Right>
                                    <Button
                                        disabled={comment.length > 10 ? false : true}
                                        transparent
                                        onPress={() => this._makeComment()}>
                                        {isLoading
                                            ? <Spinner color={colorsPalette.primaryColor} size="small" style={{ right: 5 }} />
                                            : <Text
                                                allowFontScaling={false}
                                                minimumFontScale={wp(4)}
                                                style={{ color: comment.length > 10 ? colorsPalette.primaryColor : colorsPalette.gradientGray, fontSize: wp(4) }}>DONE</Text>}
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
                    </Root>
                </ModalAnimated>

                {/* MODAL PARA ACTUALZIAR LOS COMENTARIOS */}
                <Modal
                    animationType="slide"
                    visible={modalUpdateComment}>
                    <Root>
                        <Container>
                            <Header style={{ backgroundColor: colorsPalette.secondaryColor }}>
                                <Left>
                                    <Button transparent onPress={() => this.setState({ modalUpdateComment: false })}>
                                        <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                        <Text
                                            allowFontScaling={false}
                                            minimumFontScale={wp(4)}
                                            style={{ left: 5, color: colorsPalette.primaryColor, fontSize: wp(4) }}>Back</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Title>Update comment</Title>
                                </Body>
                                <Right>
                                    <Button
                                        disabled={comment.length > 10 ? false : true}
                                        transparent
                                        onPress={() => this._updateComment()}>
                                        {isLoading
                                            ? <Spinner color={colorsPalette.primaryColor} size="small" style={{ right: 5 }} />
                                            : <Text
                                                allowFontScaling={false}
                                                minimumFontScale={wp(4)}
                                                style={{ color: comment.length > 10 ? colorsPalette.primaryColor : colorsPalette.gradientGray, fontSize: wp(4) }}>UPDATE</Text>}
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
                    </Root>
                </Modal>
            </View>
        );
    }
}

export default withNavigation(Comments)