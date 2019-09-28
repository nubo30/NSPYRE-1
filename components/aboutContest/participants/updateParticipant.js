import React, { Component } from 'react';
import { Modal, Alertm, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, View, Title, Form, Textarea, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import omitDeep from 'omit-deep'
import AWS from 'aws-sdk'

import { securityCredentials } from '../../global/aws/credentials'

import { colorsPalette } from '../../global/static/colors'

// AWS
import * as mutations from '../../../src/graphql/mutations'

class UpdateParticipations extends Component {
    state = {
        modalVisibleEdit: false,
        comment: "",
        isLoading: false,
        picture: { name: "", type: "", localUrl: "", url: "" },
        video: { name: "", type: "", localUrl: "", url: "" }
    }

    // permission to access the user's phone library
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    // Abrir la libreria de imagenes
    _useLibraryHandlerContest = async (action) => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], mediaTypes: action })
        if (result.type === 'image') {
            if (!result.cancelled) { this._getNameOfLocalUrlImage(result.uri) }
        } else {
            if (Math.round(result.duration) <= 60000) {
                if (!result.cancelled) { this._getNameOfLocalUrlVideo(result.uri) }
            } else if (Math.round(result.duration) > 61000) {
                Alert.alert(
                    '',
                    'You cannot choose a video that exceeds one minute.',
                    [{ text: 'OK', onPress: () => { } }],
                    { cancelable: false },
                );
            }
        }
    }

    _getNameOfLocalUrlImage = async (fileUri, access = "public") => {
        const userData = this.props.navigation.getParam('userData')
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", fileUri, true);
            xhr.send(null);
        });
        const { name, type } = blob._data;
        this.setState({
            picture: {
                ...this.state.picture,
                localUrl: fileUri,
                name,
                type,
                blob,
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/contest/participants/pictures/${name}`
            }
        })
    }

    _getNameOfLocalUrlVideo = async (fileUri, access = "public") => {
        const userData = this.props.navigation.getParam('userData')
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", fileUri, true);
            xhr.send(null);
        });
        const { name, type } = blob._data;
        this.setState({
            video: {
                ...this.state.picture,
                localUrl: fileUri,
                name,
                type,
                blob,
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/contest/participants/videos/${name}`
            }
        })
    }

    _updateData = async () => {
        this.setState({ isLoading: true })
        const { item, contest } = this.props
        const userData = this.props.navigation.getParam('userData')
        const { picture, video } = this.state
        AWS.config.update({ accessKeyId: securityCredentials.accessKeyId, secretAccessKey: securityCredentials.secretAccessKey, region: securityCredentials.region })
        let blobPicture; let blobVideo

        // PICTURE
        if (picture.localUrl) {
            blobPicture = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () { resolve(xhr.response) };
                xhr.onerror = function () { reject(new TypeError("Network request failed")) };
                xhr.responseType = "blob";
                xhr.open("GET", picture.localUrl ? picture.localUrl : contest.general.picture.localUrl, true);
                xhr.send(null);
            });
        }

        // VIDEO
        if (video.localUrl) {
            blobVideo = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () { resolve(xhr.response) };
                xhr.onerror = function () { reject(new TypeError("Network request failed")) };
                xhr.responseType = "blob";
                xhr.open("GET", video.localUrl ? video.localUrl : item.video.localUrl, true);
                xhr.send(null);
            });
        }

        const participants = {
            id: item.id,
            participantId: item.participantId,
            nameUser: item.nameUser,
            comment: this.state.comment,
            video: video.url ? video : item.video,
            picture: picture.localUrl ? picture : item.picture,
            avatar: item.avatar,
            createdAt: item.createdAt,
            participantsContestId: contest.id,
        }
        omitDeep(participants, ['__typename'])
        try {
            if (picture.localUrl) { await Storage.put(`users/${userData.email}/contest/participants/pictures/${picture.name}`, blobPicture, { contentType: picture.type }) }
            if (video.localUrl) { await Storage.put(`users/${userData.email}/contest/participants/videos/${video.name}`, blobVideo, { contentType: video.type }) }
            await API.graphql(graphqlOperation(mutations.updateParticipants, { input: participants }))
            this.setState({
                modalVisibleEdit: false,
                picture: { name: "", type: "", localUrl: "", url: "" },
                video: { name: "", type: "", localUrl: "", url: "" },
                isLoading: false
            })
        } catch (error) {
            console.log(error)
            this.setState({ isLoading: false })
        }
    }

    componentWillReceiveProps(prevProps) {
        this.setState({ comment: prevProps.item.comment })
    }

    render() {
        const { modalVisibleEdit, comment, isLoading, video, picture } = this.state
        const { item } = this.props
        return (
            <View>
                <Button style={{ left: 10 }} transparent onPress={() => this.setState({ modalVisibleEdit: true })}>
                    <Icon type="MaterialIcons" name="mode-edit" style={{ color: colorsPalette.gradientGray }} />
                </Button>
                <Modal
                    visible={modalVisibleEdit}
                    animationType="slide">
                    <Container>
                        <Header>
                            <Left>
                                <Button
                                    disabled={isLoading ? true : false}
                                    transparent onPress={() => this.setState({
                                        modalVisibleEdit: false,
                                        picture: { name: "", type: "", localUrl: "", url: "" },
                                        video: { name: "", type: "", localUrl: "", url: "" }
                                    })}>
                                    <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                    <Text
                                        allowFontScaling={false}
                                        minimumFontScale={wp(4)}
                                        style={{ left: 5, color: colorsPalette.primaryColor, fontSize: wp(4) }}>Back</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Title allowFontScaling={false} style={{ fontSize: wp(6), color: colorsPalette.darkFont }}>Updating</Title>
                            </Body>
                            <Right>
                                <Button
                                    disabled={comment.length > 10 || video.localUrl ? false : true}
                                    transparent onPress={() => this._updateData()}>
                                    {isLoading
                                        ? <Spinner color={colorsPalette.primaryColor} size="small" />
                                        : <Text allowFontScaling={false} style={{ color: comment.length > 10 || video.localUrl ? colorsPalette.primaryColor : colorsPalette.gradientGray, fontSize: wp(4) }}>UPDATE</Text>}
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
                            <View style={{ flex: 0.4 }}>
                                <ListItem itemDivider style={{ borderBottomColor: colorsPalette.underlinesColor, borderBottomWidth: 0.5 }}>
                                    <Text>UPDATE YOUR COMMENT:</Text>
                                </ListItem>
                                <Form style={{ padding: 10 }}>
                                    <Textarea
                                        maxLength={1024}
                                        autoFocus={true}
                                        value={comment}
                                        onChangeText={(comment) => this.setState({ comment })}
                                        allowFontScaling={false}
                                        style={{ borderColor: colorsPalette.transparent }}
                                        rowSpan={7}
                                        selectionColor={colorsPalette.primaryColor}
                                    />
                                </Form>
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <ListItem itemDivider style={{ borderBottomColor: colorsPalette.underlinesColor, borderBottomWidth: 0.5, borderTopColor: colorsPalette.underlinesColor, borderTopWidth: 0.5 }}>
                                    <Text>CHANGE YOUR MEDIA CONTENT:</Text>
                                </ListItem>
                                {item.video.url === null
                                    ? <Image style={{ height: 200, width: "100%" }} source={{ uri: picture.localUrl ? picture.localUrl : item.picture.url }} />
                                    : <Video
                                        source={{ uri: video.localUrl ? video.localUrl : item && item.video && item.video.url }}
                                        useNativeControls={true}
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        resizeMode="cover"
                                        shouldPlay={false}
                                        isLooping={false}
                                        style={{ width: "100%", height: 200, alignSelf: 'center' }} />}
                                {item.video.url === null
                                    ? <Button
                                        disabled={isLoading ? true : false}
                                        onPress={() => this._useLibraryHandlerContest('Images')}
                                        style={{ width: "60%", alignSelf: 'center', justifyContent: 'center', alignItems: 'center', top: 20, backgroundColor: colorsPalette.primaryColor }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), letterSpacing: 2 }}> {video.localUrl ? "Another picture" : "Change picture"}</Text>
                                    </Button>
                                    : <Button
                                        disabled={isLoading ? true : false}
                                        onPress={() => this._useLibraryHandlerContest('Videos')}
                                        style={{ width: "60%", alignSelf: 'center', justifyContent: 'center', alignItems: 'center', top: 20, backgroundColor: colorsPalette.primaryColor }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), letterSpacing: 2 }}> {video.localUrl ? "Another video" : "Change video"}</Text>
                                    </Button>}
                            </View>
                        </Content>
                    </Container>
                </Modal>
            </View>
        );
    }
}

export default withNavigation(UpdateParticipations)