import React, { Component } from "react";
import { View, Dimensions, Image } from "react-native";
import { ImagePicker, Permissions, Video } from 'expo';
import { Button, Text, Icon } from 'native-base'
import Modal from "react-native-modal";
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Swiper from 'react-native-swiper';
import _ from 'lodash'

// Animations
import AnimationManWihtHearts from '../../../Global/lottieJs/manWithHearts'
import InstructionsGirlWithPhone from '../../../Global/lottieJs/instructionsGirlWithPhone'
import CongratsParticipate from '../../../Global/lottieJs/congratsParticipate'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

export default class JoinToTheContest extends Component {
    state = {
        swiperIndex: 0,
        picture: { name: "", type: "", localUrl: "" },
        video: { name: "", type: "", localUrl: "" },
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


    render() {
        const { swiperIndex, picture, video } = this.state
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
                        onIndexChanged={(index) => this.setState({ swiperIndex: index })}
                        ref={(swiper) => this.swiper = swiper}
                        showsPagination={false}
                        loop={false}>
                        {/* INTRO */}
                        <Grid>
                            <Row size={80} style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: wp(9), color: '#D82B60', top: 20 }}>You are about to join the contest!</Text>
                                <AnimationManWihtHearts />
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
                                            video: { ...video, localUrl: '', name: '', url: '', type: '', blob: {} },
                                            picture: { ...picture, localUrl: '', name: '', url: '', type: '', blob: {} }
                                        });
                                        _setModalVisibleJoinToTheContest(false)
                                    }}>
                                    <Text style={{ color: '#3333' }}>Close</Text>
                                </Button>
                            </Row>
                        </Grid>

                        {/* INSTRUCTIONS */}
                        <Grid>
                            <Row size={80} style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: wp(7), color: '#D82B60', top: 20, alignSelf: 'center' }}>Instructions</Text>
                                <Text style={{ fontSize: wp(4), color: '#3333', top: 20, alignSelf: 'center', textAlign: 'center' }}>
                                    {_.truncate(contest.general.instructions, { separate: '...', length: 170 })}
                                </Text>
                                <InstructionsGirlWithPhone />
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
                                <Button transparent onPress={() => {
                                    this.setState({
                                        video: { ...video, localUrl: '', name: '', url: '', type: '', blob: {} },
                                        picture: { ...picture, localUrl: '', name: '', url: '', type: '', blob: {} }
                                    });
                                    _setModalVisibleJoinToTheContest(false)
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
                            {video.localUrl
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

                            {picture.localUrl
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

                            {video.localUrl === '' && picture.localUrl === '' ? <Row size={60} style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
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
                            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    transparent
                                    onPress={() => {
                                        this.setState({
                                            video: { ...video, localUrl: '', name: '', url: '', type: '', blob: {} },
                                            picture: { ...picture, localUrl: '', name: '', url: '', type: '', blob: {} }
                                        });
                                        _setModalVisibleJoinToTheContest(false)
                                    }}>
                                    <Text style={{ color: '#3333' }}>Close</Text>
                                </Button>
                            </Row>
                        </Grid>

                        {/* CONGRATS */}
                        <Grid>
                            <Row size={90} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <CongratsParticipate swiperIndex={swiperIndex} />
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