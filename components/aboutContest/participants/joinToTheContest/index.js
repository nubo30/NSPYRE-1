import React, { Component } from "react";
import { View, Dimensions, Image } from "react-native";
import { API, graphqlOperation, Storage } from 'aws-amplify'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
import { Button, Text, Icon, Form, Textarea, Spinner } from 'native-base'
import Modal from "react-native-modal";
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Swiper from 'react-native-swiper';
import _ from 'lodash'
import moment from 'moment'
import AWS from 'aws-sdk'

// Animations
import AnimationManWihtHearts from '../../../Global/lottieJs/manWithHearts'
import InstructionsGirlWithPhone from '../../../Global/lottieJs/instructionsGirlWithPhone'
import CongratsParticipate from '../../../Global/lottieJs/congratsParticipate'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

// Graphql
import * as mutations from '../../../../src/graphql/mutations'
import * as queries from '../../../../src/graphql/queries'

export default class JoinToTheContest extends Component {
    state = {
        swiperIndex: 0,
        picture: { name: null, type: null, localUrl: null, url: null, blob: {} },
        video: { name: null, type: null, localUrl: null, url: null, blob: {} },
        commentText: '',
        isLoading: false
    }

    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    // Preguntar al usuario por los permisos para abrir la libreria de imagenes y videos
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    // Abrir la libreria de imagenes
    _useLibraryHandler = async (action) => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], mediaTypes: action })
        if (!result.cancelled) { action !== 'Videos' ? this._getNameOfLocalUrlImage(result.uri) : this._getNameOfLocalUrlVideo(result.uri) }
    }

    _getNameOfLocalUrlImage = async (fileUri, access = "public") => {
        const { userData } = this.props
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
        const { userData } = this.props
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
                ...this.state.video,
                localUrl: fileUri,
                name,
                type,
                blob,
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/contest/participants/videos/${name}`
            }
        })
    }

    _submit = async () => {
        this.setState({ isLoading: true })
        const { video, picture, commentText } = this.state
        const { userData, contest } = this.props

        AWS.config.update({
            accessKeyId: "AKIAIQA34573X4TITQEQ",
            secretAccessKey: "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",
            "region": "sa-east-1"
        })

        // PICTURE OF THE CONTEST
        let blobPicture
        if (picture.localUrl !== null) {
            blobPicture = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () { resolve(xhr.response) };
                xhr.onerror = function () { reject(new TypeError("Network request failed")) };
                xhr.responseType = "blob";
                xhr.open("GET", picture.localUrl, true);
                xhr.send(null);
            });
        }

        // VIDEO OF THE CONTEST
        let blobVideo
        if (video.localUrl !== null) {
            blobVideo = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () { resolve(xhr.response) };
                xhr.onerror = function () { reject(new TypeError("Network request failed")) };
                xhr.responseType = "blob";
                xhr.open("GET", video.localUrl, true);
                xhr.send(null);
            });
        }

        // DATA TO AWS
        const participants = {
            participantId: userData.id,
            nameUser: userData.name,
            comment: commentText,
            video,
            picture,
            avatar: userData.avatar,
            createdAt: moment().toISOString(),
            participantsContestId: contest.id,
        }

        try {
            if (picture.localUrl !== null) { await Storage.put(`users/${userData.email}/contest/participants/pictures/${picture.name}`, blobPicture, { contentType: picture.type }) }
            if (video.localUrl !== null) { await Storage.put(`users/${userData.email}/contest/participants/videos/${video.name}`, blobVideo, { contentType: video.type }) }
            await API.graphql(graphqlOperation(mutations.createParticipants, { input: participants }))
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
            this.setState({ isLoading: false })
            await this._changeSwiper(1)
            this._createNotification()
        } catch (error) {
            this.setState({ isLoading: false, errSubmitdata: true })
            console.log(error)
        }
    }

    _createNotification = async () => {
        const { userData, contest } = this.props
        const input = {
            idUSerFrom: userData.id,
            idUserTo: contest.id,
            userFrom: userData.name,
            userTo: contest.user.name,
            expoPushToken: contest.user.notificationToken === null ? 'none' : contest.user.notificationToken,
            messageTitle: "New participant",
            messageBody: `Hey, ${_.startCase(contest.user.name)}! ${_.startCase(userData.name)} has joined your ${contest.general.nameOfContest} contest, take a look!`,
            JSONdata: JSON.stringify({
                "type": 'participantsInTheContest',
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
        try {
            const { data } = await API.graphql(graphqlOperation(mutations.createNotifications, { input }))
            await API.graphql(graphqlOperation(queries.sendNotification, { notificationId: data.createNotifications.id }))
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { commentText, swiperIndex, picture, video, isLoading } = this.state
        const {
            contest,

            // Actions
            modalVisibleJoinToTheContest,

            //Functions
            _setModalVisibleJoinToTheContest } = this.props
        return (
            <Modal isVisible={modalVisibleJoinToTheContest}>
                <View style={{ flex: 1, borderRadius: 15, backgroundColor: '#FFF', width: screenWidth - 20, alignSelf: 'center', maxHeight: screenHeight / 2 + 100, padding: 15 }}>
                    <Swiper
                        scrollEnabled={false}
                        onIndexChanged={(index) => this.setState({ swiperIndex: index })}
                        ref={(swiper) => this.swiper = swiper}
                        showsPagination={false}
                        loop={false}>

                        {/* INTRO */}
                        <Grid>
                            <Row size={80} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 0.3 }}>
                                    <Text style={{ fontSize: wp(9), color: '#D82B60', top: 20 }}>You are about to join the contest!</Text>
                                </View>
                                <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                                    <AnimationManWihtHearts />
                                </View>
                            </Row>
                            <Row size={20} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    onPress={() => this._changeSwiper(1)}
                                    iconRight style={{
                                        backgroundColor: '#D82B60',
                                        width: '70%',
                                        shadowColor: "rgba(0,0,0,0.3)", shadowOffset: { width: 1 }, shadowOpacity: 1
                                    }}>
                                    <Text style={{ color: '#FFF' }}>Next</Text>
                                    <Icon name='arrow-forward' />
                                </Button>
                            </Row>
                            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    transparent
                                    onPress={() => {
                                        this.setState({
                                            video: { ...video, localUrl: null, name: null, url: null, type: null, blob: {} },
                                            picture: { ...picture, localUrl: null, name: null, url: null, type: null, blob: {} }
                                        });
                                        _setModalVisibleJoinToTheContest(false)
                                    }}>
                                    <Text style={{ color: '#3333' }}>Close</Text>
                                </Button>
                            </Row>
                        </Grid>

                        {/* INSTRUCTIONS */}
                        <Grid>
                            <Row size={80} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 0.4, alignItems: 'center', padding: 5 }}>
                                    <Text style={{ fontSize: wp(7), color: '#D82B60' }}>Instructions</Text>
                                    <Text style={{ fontSize: wp(4), color: '#3333', textAlign: 'center', top: 5 }}>
                                        {_.truncate(contest.general.instructions, { separate: '...', length: 170 })}
                                    </Text>
                                </View>
                                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                                    <InstructionsGirlWithPhone />
                                </View>
                            </Row>
                            <Row size={20} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    onPress={() => this._changeSwiper(1)}
                                    iconRight style={{
                                        backgroundColor: '#D82B60',
                                        width: '70%',
                                        shadowColor: "rgba(0,0,0,0.3)", shadowOffset: { width: 1 }, shadowOpacity: 1
                                    }}>
                                    <Text style={{ color: '#FFF' }}>Next</Text>
                                    <Icon name='arrow-forward' />
                                </Button>
                            </Row>
                            <Row size={10} style={{ justifyContent: 'space-between' }}>
                                <Button
                                    transparent
                                    onPress={() => this._changeSwiper(-1)}>
                                    <Text style={{ color: '#3333' }}>Back</Text>
                                </Button>
                                <Button
                                    transparent
                                    onPress={
                                        () => {
                                            _setModalVisibleJoinToTheContest(false);
                                            this.setState({
                                                commentText: '',
                                                video: { ...video, localUrl: null, name: null, url: null, type: null, blob: {} },
                                                picture: { ...picture, localUrl: null, name: null, url: null, type: null, blob: {} }
                                            })
                                        }}>
                                    <Text style={{ color: '#3333' }}>Close</Text>
                                </Button>
                            </Row>
                        </Grid>

                        {/* UPLOAD VIDEO OR MEME */}
                        <Grid>
                            <Row size={20} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: wp(10), color: '#D82B60', alignSelf: 'center' }}>Upload your content</Text>
                            </Row>
                            {video.localUrl !== null
                                ? <Row size={60} style={{ flexDirection: 'column' }}>
                                    <View style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                                        <Video
                                            source={{ uri: video.localUrl }}
                                            useNativeControls
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            resizeMode="cover"
                                            shouldPlay={false}
                                            isLooping={false}
                                            style={{
                                                shadowColor: "rgba(0,0,0,0.5)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                                                width: "100%", height: "100%"
                                            }} />
                                    </View>
                                    <Button
                                        onPress={() => this._useLibraryHandler('Videos')}
                                        transparent
                                        icon style={{ alignSelf: 'center', top: -10 }}>
                                        <Icon type="Feather" name="refresh-ccw" style={{ color: '#333' }} />
                                    </Button>
                                </Row>
                                : null}

                            {picture.localUrl !== null
                                ? <Row size={60} style={{ flexDirection: 'column' }}>
                                    <View style={{
                                        shadowColor: "rgba(0,0,0,0.5)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                                        flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Image style={{
                                            height: "100%", width: "100%"
                                        }} source={{ uri: picture.localUrl }} />
                                    </View>
                                    <Button
                                        onPress={() => this._useLibraryHandler('Images')}
                                        transparent
                                        icon style={{ alignSelf: 'center', top: -10 }}>
                                        <Icon type="Feather" name="refresh-ccw" style={{ color: '#333' }} />
                                    </Button>
                                </Row>
                                : null}

                            {video.localUrl === null && picture.localUrl === null ? <Row size={60} style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Button
                                    onPress={() => this._useLibraryHandler('Videos')}
                                    transparent icon style={{ width: '40%', height: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'column', top: 5 }}>
                                    <Icon type="Ionicons" name="ios-videocam" style={{ fontSize: wp(20), color: "#3333" }} />
                                    <Text style={{ fontSize: wp(4.5), color: '#3333' }}>Videos</Text>
                                </Button>
                                <Text style={{ fontSize: wp(5), fontWeight: 'bold', color: '#333' }}>OR</Text>
                                <Button
                                    onPress={() => this._useLibraryHandler('Images')}
                                    transparent icon style={{ width: '40%', height: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'column', top: 5 }}>
                                    <Icon type="Entypo" name="images" style={{ fontSize: wp(20), color: "#3333" }} />
                                    <Text style={{ fontSize: wp(4.5), color: '#3333' }}>Imagen/Meme</Text>
                                </Button>
                            </Row> : null}

                            <Row size={20} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    disabled={video.localUrl || picture.localUrl ? false : true}
                                    onPress={() => this._changeSwiper(1)}
                                    iconRight style={{
                                        backgroundColor: video.localUrl || picture.localUrl ? '#D82B60' : '#EC407A',
                                        width: '70%',
                                        shadowColor: "rgba(0,0,0,0.3)", shadowOffset: { width: 1 }, shadowOpacity: 1
                                    }}>
                                    <Text style={{ color: '#FFF' }}>Next</Text>
                                    <Icon name='arrow-forward' />
                                </Button>
                            </Row>
                            <Row size={10} style={{ justifyContent: 'space-between' }}>
                                <Button
                                    transparent
                                    onPress={() => this._changeSwiper(-1)}>
                                    <Text style={{ color: '#3333' }}>Back</Text>
                                </Button>
                                <Button
                                    transparent
                                    onPress={
                                        () => {
                                            _setModalVisibleJoinToTheContest(false);
                                            this.setState({
                                                commentText: '',
                                                video: { ...video, localUrl: null, name: null, url: null, type: null, blob: {} },
                                                picture: { ...picture, localUrl: null, name: null, url: null, type: null, blob: {} }
                                            })
                                        }}>
                                    <Text style={{ color: '#3333' }}>Close</Text>
                                </Button>
                            </Row>
                        </Grid>

                        {/* COMMENTS */}
                        <Grid>
                            <Row size={75} style={{ flexDirection: 'column', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: wp(10), color: '#D82B60', alignSelf: 'flex-start' }}>Create a comment</Text>
                                <Form style={{ padding: 10 }}>
                                    <Textarea
                                        editable={isLoading}
                                        bordered
                                        onChangeText={(value) => this.setState({ commentText: value })}
                                        value={commentText}
                                        maxLength={512}
                                        selectionColor="#D82B60"
                                        style={{ borderColor: '#D82B60', borderRadius: 5, padding: 10, fontSize: wp(4.3), minWidth: '95%' }}
                                        rowSpan={8}
                                        placeholder="Briefly describe any thoughts you want to illustrate in your participation!" />
                                </Form>
                            </Row>
                            <Row size={15} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Button
                                    disabled={commentText ? false : true || isLoading}
                                    onPress={() => this._submit()}
                                    iconRight style={{
                                        backgroundColor: '#D82B60',
                                        width: '70%',
                                        shadowColor: "rgba(0,0,0,0.3)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                                        alignSelf: 'center',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                    {isLoading
                                        ? <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: "#EEEEEE" }}>Please wait...  </Text>
                                            <Spinner size="small" color="#EEEEEE" />
                                        </View>
                                        : <Text style={{ color: '#FFF', letterSpacing: 2 }}>SUBMIT</Text>}

                                </Button>
                            </Row>
                            <Row size={10} style={{ justifyContent: 'space-between' }}>
                                <Button
                                    transparent
                                    onPress={() => this._changeSwiper(-1)}>
                                    <Text style={{ color: '#3333' }}>Back</Text>
                                </Button>
                                <Button
                                    transparent
                                    onPress={
                                        () => {
                                            _setModalVisibleJoinToTheContest(false);
                                            this.setState({
                                                commentText: '',
                                                video: { ...video, localUrl: null, name: null, url: null, type: null, blob: {} },
                                                picture: { ...picture, localUrl: null, name: null, url: null, type: null, blob: {} }
                                            })
                                        }}>
                                    <Text style={{ color: '#3333' }}>Close</Text>
                                </Button>
                            </Row>
                        </Grid>

                        {/* CONGRATS */}
                        <Grid>
                            <Row size={90} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                                    <CongratsParticipate swiperIndex={swiperIndex} />
                                </View>
                                <Text style={{ fontSize: wp(7), color: '#D82B60', alignSelf: 'center' }}>You are inside!</Text>
                            </Row>
                            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button transparent onPress={() => _setModalVisibleJoinToTheContest(false)}>
                                    <Text style={{ color: '#3333' }}>Close</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </Swiper>
                </View>
            </Modal>
        );
    }
}