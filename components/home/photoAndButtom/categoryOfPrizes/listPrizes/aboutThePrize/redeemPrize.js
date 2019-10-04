import React, { Component } from "react";
import { Clipboard, Share, Alert, Image } from "react-native";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { Button, View, Text, Toast, Icon, Container, Left, Body, Right, Header, Title } from 'native-base'
import Modal from "react-native-modal";
import { Grid, Row } from 'react-native-easy-grid'
import Swiper from 'react-native-swiper'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import _ from 'lodash'
import upperFirst from 'lodash/upperFirst'

// Colors
import { colorsPalette } from '../../../../../global/static/colors'

export default class RedeemPrizes extends Component {
    state = {
        isModalVisible: false,
        clipboardText: "",
        textInputText: "",
        indexSwiper: 0,
        video: { name: "", type: "", localUrl: "", url: "" },
        picture: { name: null, type: null, localUrl: null, url: null, blob: {} },
    }

    // Copia el texgto y lo almacena en el portapapeles
    setTextIntoClipboard = async () => {
        const { _modalRedeemPrizeAction } = this.props
        await Clipboard.setString("FT$qnwU1g&Dm");
        Toast.show({ text: 'Code copy to the Clipboard.' })
        _modalRedeemPrizeAction(false)
    }

    _changeSwiper = (i) => { this.swiper.scrollBy(i) }


    // UPLOAD PHOTOS PRIZES
    // permission to access the user's phone library
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    // Abrir la libreria de imagenes
    _useLibraryHandler = async (action) => {
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
        const { prize } = this.props
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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${prize.user.email}/prize/videos/participants/${name}`
            }
        })
    }

    _getNameOfLocalUrlVideo = async (fileUri, access = "public") => {
        const { prize } = this.props
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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${prize.user.email}/prize/videos/participants/${name}`
            }
        })
    }

    _applicationInWhichTheContestHasBeenShared = (value) => {
        if (typeof (value) !== 'string') {
            return value.map(item => {
                switch (item) {
                    case "ph.telegra.Telegraph.Share": return ({ appName: "Telegram", color: colorsPalette.tgColor })
                    case "net.whatsapp.WhatsApp.ShareExtension": return ({ appName: "WhatsApp", color: colorsPalette.waColor })
                    case "com.google.hangouts.ShareExtension": return ({ appName: "Hangouts", color: colorsPalette.hgColor })
                    case "com.atebits.Tweetie2.ShareExtension": return ({ appName: "Twitter", color: colorsPalette.ttColor })
                    case "com.apple.UIKit.activity.PostToFacebook": return ({ appName: "Facebook", color: colorsPalette.fbColor })
                    case "com.facebook.Messenger.ShareExtension": return ({ appName: "Messenger", color: colorsPalette.mgColor })
                    case "com.tinyspeck.chatlyio.share": return ({ appName: "Slack", color: colorsPalette.scColor })
                    case "com.google.Gmail.ShareExtension": return ({ appName: "Gmail", color: colorsPalette.glColor })
                    case "com.apple.UIKit.activity.Message": return ({ appName: "SMS", color: colorsPalette.smsColor })
                    case "com.apple.UIKit.activity.PostToTwitter": return ({ appName: "Twitter", color: colorsPalette.ttColor })
                    case "com.skype.skype.sharingextension": return ({ appName: "Skype", color: colorsPalette.spColor })
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
                case "com.facebook.Messenger.ShareExtension": return "Messenger"
                case "com.tinyspeck.chatlyio.share": return "Slack"
                case "com.google.Gmail.ShareExtension": return "Gmail"
                case "com.apple.UIKit.activity.Message": return "SMS"
                case "com.skype.skype.sharingextension": return "Skype"
                case "com.apple.UIKit.activity.PostToTwitter": return "Twitter"
                default: break;
            }
        }
    }

    _share = async () => {
        const { prize } = this.props
        try {
            const result = await Share.share({
                message: "contest.general.description",
                title: "contest.general.nameOfContest",
                url: 'https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/yank_carlos_30@hotmail.com/avatar/E43322EC-6AD8-4129-9303-D81A90AF50A9.gif"',
            }, {
                tintColor: "red",
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.Print',
                    'com.apple.UIKit.activity.CopyToPasteboard',
                    'com.apple.UIKit.activity.SaveToCameraRoll',
                    'com.apple.UIKit.activity.AirDrop',
                    'com.apple.UIKit.activity.PostToWeibo',
                    'com.apple.UIKit.activity.AssignToContact',
                    'com.apple.UIKit.activity.AddToReadingList',
                    'com.apple.UIKit.activity.PostToFlickr',
                    'com.apple.UIKit.activity.PostToVimeo',
                    'com.apple.UIKit.activity.PostToTencentWeibo',
                    'com.apple.UIKit.activity.OpenInIBooks',
                    'com.apple.UIKit.activity.MarkupAsPDF',
                    'com.apple.reminders.RemindersEditorExtension',
                    'com.apple.mobilenotes.SharingExtension',
                    'com.apple.mobileslideshow.StreamShareService',
                    'com.apple.reminders.sharingextension',
                    'com.apple.UIKit.activity.Message',
                    'com.google.Gmail.ShareExtension'
                ],

            });

            if (result.action === Share.sharedAction) {
                if (this._applicationInWhichTheContestHasBeenShared(result.activityType) === upperFirst(Object.keys(JSON.parse(prize.share.socialMediaHandle)))) {
                    this._changeSwiper(1)
                } else if (this._applicationInWhichTheContestHasBeenShared(result.activityType) !== upperFirst(Object.keys(JSON.parse(prize.share.socialMediaHandle)))) {
                    Alert.alert(
                        '',
                        'To continue please share in the required social network!',
                        [
                            { text: 'OK', onPress: () => { } },
                        ],
                        { cancelable: false },
                    );
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log(result, "No se ha compartido")
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const { indexSwiper, video, picture } = this.state
        const {
            // Data
            prize,

            // Actions
            modalRedeemPrizeAction,

            // Functions
            _modalRedeemPrizeAction
        } = this.props
        return (
            <Modal
                onSwipeComplete={() => { _modalRedeemPrizeAction(false); this.setState({ indexSwiper: 0 }) }}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                isVisible={modalRedeemPrizeAction}>
                <View style={{
                    backgroundColor: colorsPalette.secondaryColor,
                    justifyContent: 'center',
                    borderTopStartRadius: 10,
                    borderTopEndRadius: 10,
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    flex: 1,
                    maxHeight: 600
                }}>
                    <Container style={{ borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
                        <Header style={{ backgroundColor: colorsPalette.secondaryColor, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                            <Left>
                                <Button
                                    disabled={indexSwiper === 0 ? true : false}
                                    transparent onPress={() => this._changeSwiper(-1)}>
                                    <Text
                                        allowFontScaling={false}
                                        minimumFontScale={wp(4)}
                                        style={{ color: indexSwiper === 0 ? colorsPalette.gradientGray : colorsPalette.primaryColor, fontSize: wp(4), top: -10 }}>Back</Text>
                                </Button>
                            </Left>
                            <Body>
                                {indexSwiper === 0 ? <Title style={{ top: -10, fontSize: wp(9), color: colorsPalette.darkFont }}>Terms</Title> : null}
                                {indexSwiper === 1 ? <Title style={{ top: -10, fontSize: wp(9), color: colorsPalette.darkFont }}>{prize.share === null ? "Code" : "Content"}</Title> : null}
                                {indexSwiper === 2 ? <Title style={{ top: -10, fontSize: wp(9), color: colorsPalette.darkFont }}>Share</Title> : null}
                                {indexSwiper === 3 ? <Title style={{ top: -10, fontSize: wp(9), color: colorsPalette.darkFont }}>Code</Title> : null}
                            </Body>
                            <Right>
                                {prize.share !== null
                                    ? indexSwiper === 2 || indexSwiper === 3 ?
                                        null : <Button
                                            disabled={indexSwiper === 1 ? video.localUrl || picture.localUrl ? false : true : false}
                                            transparent style={{ top: -10 }} onPress={() => this._changeSwiper(1)}>
                                            <Text allowFontScaling={false} style={{ color: indexSwiper === 1 ? video.localUrl || picture.localUrl ? colorsPalette.primaryColor : colorsPalette.gradientGray : colorsPalette.primaryColor }}>Next</Text>
                                        </Button>
                                    : <Button
                                        transparent style={{ top: -10 }} onPress={indexSwiper === 0 ? () => this._changeSwiper(1) : () => { _modalRedeemPrizeAction(false); this.setState({ indexSwiper: 0 }) }}>
                                        <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>{indexSwiper === 0 ? "Next" : "Done"}</Text>
                                    </Button>}
                            </Right>
                        </Header>
                        <Swiper
                            scrollEnabled={true}
                            ref={(swiper) => this.swiper = swiper}
                            onIndexChanged={(value) => this.setState({ indexSwiper: value })}
                            showsPagination={false}
                            pagingEnabled={true}
                            loop={false}>
                            {/* TERMS */}
                            <Grid>
                                <Row size={80} style={{ padding: 20 }}>
                                    <Text
                                        minimumFontScale={wp(3)}
                                        allowFontScaling={false}
                                        style={{ fontSize: wp(3), color: '#333', textAlign: 'justify' }}>
                                        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
                                    </Text>
                                </Row>
                                <Row size={20} style={{ justifyContent: 'space-evenly' }}>
                                    <Button style={{ backgroundColor: '#3333', width: "80%", alignItems: 'center', justifyContent: 'center' }} onPress={() => { _modalRedeemPrizeAction(false); this.setState({ indexSwiper: 0 }) }}>
                                        <Text
                                            minimumFontScale={wp(3)}
                                            allowFontScaling={false}
                                            style={{ fontSize: wp(3) }}>Decline</Text>
                                    </Button>
                                </Row>
                            </Grid>

                            {/* UPLOAD CONTENT */}
                            {prize.share !== null ? <Grid style={{ flex: 1 }}>
                                <Row size={100} style={{ flexDirection: 'column', justifyContent: 'center', top: -60 }}>
                                    {prize.share.contentUserShare === 'videos'
                                        ? video.url
                                            ? <View style={{ flex: 1 }}>
                                                <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
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
                                                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Button
                                                        onPress={() => this._useLibraryHandler('Videos')}
                                                        transparent
                                                        style={{ alignSelf: 'center' }}>
                                                        <Text allowFontScaling={false} style={{ color: "#333", fontSize: wp(3) }}>Change video</Text>
                                                    </Button>
                                                </View>
                                            </View>
                                            : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Button
                                                    onPress={() => this._useLibraryHandler("Videos")}
                                                    transparent icon style={{ width: '50%', height: '30%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon type="Feather" name="video" style={{ fontSize: wp(20), color: '#3333' }} />
                                                </Button>
                                                <Text
                                                    minimumFontScale={wp(4)}
                                                    allowFontScaling={false}
                                                    style={{ alignSelf: 'center', fontWeight: 'normal', color: '#3333', fontSize: wp(4) }}>Upload your video</Text>
                                            </View>
                                        : picture.url
                                            ? <View style={{ flex: 1 }}>
                                                <Image style={{ height: "60%", width: "100%" }} source={{ uri: picture.localUrl }} />
                                                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Button
                                                        onPress={() => this._useLibraryHandler('Images')}
                                                        transparent
                                                        style={{ alignSelf: 'center' }}>
                                                        <Text allowFontScaling={false} style={{ color: "#333", fontSize: wp(3) }}>Change picture</Text>
                                                    </Button>
                                                </View>
                                            </View>
                                            : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Button
                                                    onPress={() => this._useLibraryHandler("Images")}
                                                    transparent icon style={{ width: '50%', height: '30%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon type="Feather" name="image" style={{ fontSize: wp(20), color: '#3333' }} />
                                                </Button>
                                                <Text
                                                    minimumFontScale={wp(4)}
                                                    allowFontScaling={false}
                                                    style={{ alignSelf: 'center', fontWeight: 'normal', color: '#3333', fontSize: wp(4) }}>Upload your picture</Text>
                                            </View>
                                    }
                                </Row>
                            </Grid>
                                : <Grid>
                                    <Row size={50} style={{ justifyContent: 'center', alignItems: 'flex-end', top: -40 }}>
                                        <Icon type="Feather" name="check-circle" style={{ fontSize: wp(15), color: '#00C853' }} />
                                    </Row>
                                    <Row size={50} style={{ justifyContent: 'center', left: 10 }}>
                                        <View style={{ padding: 5, borderRadius: 5, borderWidth: 1, height: 30, justifyContent: 'center', alignItems: 'center', width: '80%', borderColor: '#D81B60' }}>
                                            <Text
                                                minimumFontScale={wp(4)}
                                                allowFontScaling={false}
                                                style={{ color: '#D81B60', fontWeight: 'bold', fontSize: wp(4) }}>FT$qnwU1g&Dm</Text>
                                        </View>
                                        <Button
                                            style={{ left: -10 }}
                                            onPress={() => this.setTextIntoClipboard()}
                                            icon transparent small>
                                            <Icon type="AntDesign" name="copy1" style={{ fontSize: wp(5), color: '#3333' }} />
                                        </Button>
                                    </Row>
                                </Grid>
                            }
                            {/* SHARING */}
                            {prize.share === null ? null : <Grid style={{ flex: 1 }}>
                                <Row size={100} style={{ flexDirection: 'column', justifyContent: 'center', top: -60 }}>
                                    <Button
                                        onPress={() => this._share()}
                                        style={{ width: '70%', alignSelf: 'center', backgroundColor: colorsPalette.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text allowFontScaling={false} style={{ letterSpacing: 2, fontWeight: 'bold' }}>Share</Text>
                                    </Button>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(2.5), top: 10, alignSelf: 'center', textAlign: 'center' }}>Share the content on your social networks to receive a code <Text allowFontScaling={false} style={{ fontSize: wp(2.5), fontWeight: 'bold' }}>(Social media required: {Object.keys(JSON.parse(prize.share.socialMediaHandle))})</Text></Text>
                                </Row>
                            </Grid>}

                            {/* GET CODE */}
                            <Grid>
                                <Row size={50} style={{ justifyContent: 'center', alignItems: 'flex-end', top: -40 }}>
                                    <Icon type="Feather" name="check-circle" style={{ fontSize: wp(15), color: '#00C853' }} />
                                </Row>
                                <Row size={50} style={{ justifyContent: 'center', left: 10 }}>
                                    <View style={{ padding: 5, borderRadius: 5, borderWidth: 1, height: 30, justifyContent: 'center', alignItems: 'center', width: '80%', borderColor: '#D81B60' }}>
                                        <Text
                                            minimumFontScale={wp(4)}
                                            allowFontScaling={false}
                                            style={{ color: '#D81B60', fontWeight: 'bold', fontSize: wp(4) }}>FT$qnwU1g&Dm</Text>
                                    </View>
                                    <Button
                                        style={{ left: -10 }}
                                        onPress={() => this.setTextIntoClipboard()}
                                        icon transparent small>
                                        <Icon type="AntDesign" name="copy1" style={{ fontSize: wp(5), color: '#3333' }} />
                                    </Button>
                                </Row>
                            </Grid>

                        </Swiper>
                    </Container>
                </View>
            </Modal>
        );
    }
}