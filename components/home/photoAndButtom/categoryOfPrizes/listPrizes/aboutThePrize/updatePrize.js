import React, { Component } from 'react';
import { Modal, Image, Alert } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { Video } from 'expo-av';
import { Container, Header, Title, Content, Spinner, Button, Left, Right, Body, Icon, Text, View, Item, Input, ListItem, Form, Textarea } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row, Col } from 'react-native-easy-grid'
import upperFirst from 'lodash/upperFirst'
import lowerCase from 'lodash/lowerCase'
import startCase from 'lodash/startCase'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import truncate from "lodash/truncate";
import ModalAnimated from 'react-native-modal'
import omitDeep from 'omit-deep'
import AWS from 'aws-sdk'

// colors
import { colorsPalette } from '../../../../../global/static/colors'
import { MyStatusBar } from '../../../../../global/statusBar'

import { securityCredentials } from '../../../../../global/aws/credentials'
import * as mutations from '../../../../../../src/graphql/mutations'

export default class updatePrize extends Component {
    state = {
        isVisible: false,
        modalGeneralInformation: false,
        isLoading: false,
        generalInformation: "",
        video: { name: "", type: "", localUrl: "", url: "" },
        picture: { name: null, type: null, localUrl: null, url: null, blob: {} },
    }


    componentWillReceiveProps(nextProps) {
        const { prize } = nextProps
        this.setState({
            generalInformation: prize.aboutTheCompany.generalInformation,
            // video: prize.general.video
        })
    }

    _updatePrize = async () => {
        this.setState({ isLoading: true })
        const { generalInformation, video } = this.state
        const { prize, _getPrize, userData } = this.props
        let blobPicture; let blobVideo
        AWS.config.update({ accessKeyId: securityCredentials.accessKeyId, secretAccessKey: securityCredentials.secretAccessKey, region: securityCredentials.region })

        // VIDEO OF THE CONTEST
        if (video.name) {
            blobVideo = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () { resolve(xhr.response) };
                xhr.onerror = function () { reject(new TypeError("Network request failed")) };
                xhr.responseType = "blob";
                xhr.open("GET", video.name ? video.localUrl : prize.general.video.localUrl, true);
                xhr.send(null);
            });
        }
        Object.assign(prize, {
            aboutTheCompany: { ...prize.aboutTheCompany, generalInformation: generalInformation },
            general: { ...prize.general, video: video.name ? video : prize.general.video }
        })
        omitDeep(prize, ['user'])
        try {
            video.name && await Storage.put(`users/${userData.email}/prize/videos/owner/${video.name}`, blobVideo, { contentType: video.type })
            await API.graphql(graphqlOperation(mutations.updateSubmitPrize, { input: prize }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
            _getPrize()
            this.setState({ isLoading: false, modalGeneralInformation: false, video: { name: "", type: "", localUrl: video.localUrl, url: "" } })
        } catch (error) {
            console.log(error)
            this.setState({ isLoading: false })
        }
    }



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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${prize.user.email}/prize/videos/owner/${name}`
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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${prize.user.email}/prize/videos/owner/${name}`
            }
        })
    }


    render() {
        const { isVisible, generalInformation, modalGeneralInformation, isLoading, video } = this.state
        const { prize } = this.props
        return (
            <View>
                <Button small transparent icon onPress={() => this.setState({ isVisible: true })}>
                    <Icon type="MaterialIcons" name="edit" style={{ color: colorsPalette.gradientGray }} />
                </Button>
                <Modal
                    animationType="fade"
                    visible={isVisible}>
                    <Container>
                        <Header style={{ backgroundColor: colorsPalette.primaryColor }}>
                            <Left>
                                <Button transparent onPress={() => this.setState({ isVisible: false })}>
                                    <Icon name='arrow-back' style={{ color: colorsPalette.secondaryColor }} />
                                    <Text
                                        minimumFontScale={wp(4)}
                                        allowFontScaling={false}
                                        style={{ color: colorsPalette.secondaryColor, fontSize: wp(4) }}>Back</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Title
                                    minimumFontScale={wp(7)}
                                    allowFontScaling={false}
                                    style={{ fontSize: wp(7), color: colorsPalette.secondaryColor }}>UPDATE</Title>
                            </Body>
                            <Right>
                                <Button small transparent disabled={isLoading || video.name ? false : true} onPress={() => this._updatePrize()}>
                                    {isLoading
                                        ? <Spinner color={colorsPalette.secondaryColor} size="small" />
                                        : <Text
                                            allowFontScaling={false}
                                            minimumFontScale={wp(4)}
                                            style={{ color: colorsPalette.secondaryColor, fontSize: wp(4) }}>OK</Text>}
                                </Button>
                            </Right>
                        </Header>
                        <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                        <Grid style={{ padding: 10 }}>
                            <Row size={35}>
                                <View style={{ flex: 1, shadowOpacity: 1, shadowOffset: { width: 1 }, shadowColor: colorsPalette.primaryShadowColor }}>
                                    <View style={{ flex: 1, position: 'absolute', height: "100%", width: "100%", backgroundColor: '#3333' }} />
                                    <Video
                                        source={{ uri: video.name ? video.localUrl : prize.general.video.url }}
                                        useNativeControls
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        resizeMode="cover"
                                        shouldPlay={false}
                                        isLooping={false}
                                        style={{ width: "100%", height: "100%" }} />
                                    <Button bordered style={{ position: 'absolute', right: 0, bottom: 0, margin: 5, borderColor: colorsPalette.secondaryColor }} onPress={() => this._useLibraryHandler('Videos')}>
                                        <Text allowFontScaling={false} style={{ color: colorsPalette.secondaryColor }}>UPDATE VIDEO</Text>
                                    </Button>
                                </View>
                            </Row>
                            <Row size={5}>
                                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Icon type="MaterialIcons" name="location-on" style={{ fontSize: wp(5), color: colorsPalette.gradientGray }} />
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray }}>{truncate(`${prize.aboutTheCompany.businessLocation.city}, ${prize.aboutTheCompany.businessLocation.country}.`, { length: 23, separator: "..." })}</Text>
                                </View>
                                <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(3), color: colorsPalette.gradientGray, right: 5 }}>Published {moment(prize.createdAt).fromNow()}</Text>
                                </View>
                            </Row>
                            <Row size={60} style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(7), color: colorsPalette.darkFont }}>General information</Text>
                                    {prize.share === null ? null
                                        : <View style={{ padding: 15, justifyContent: 'center', left: 10 }}>
                                            <View style={{ backgroundColor: '#E53935', position: 'absolute', borderRadius: "50%", padding: 6.5 }}>
                                                <Text
                                                    minimumFontScale={wp(2.5)}
                                                    allowFontScaling={false}
                                                    style={{ fontWeight: 'bold', color: '#FFF', fontSize: wp(2.5) }}>{startCase(prize.share && prize.share.contentUserShare)}</Text>
                                            </View>
                                        </View>}
                                </View>
                                <Item
                                    style={{ width: "100%", alignSelf: "center", borderBottomColor: colorsPalette.transparent }}>
                                    <Input
                                        allowFontScaling={false}
                                        multiline
                                        numberOfLines={5}
                                        placeholderTextColor={colorsPalette.gradientGray}
                                        value={generalInformation}
                                        keyboardType="ascii-capable"
                                        selectionColor={colorsPalette.primaryColor}
                                        style={{ fontSize: wp(3.5), top: -5, left: -6 }}
                                        onChangeText={(generalInformation) => this.setState({ generalInformation })} />
                                </Item>
                                <Button transparent style={{ height: "90%", width: "100%", position: 'absolute', top: 30 }} onPress={() => this.setState({ modalGeneralInformation: true })} />
                            </Row>
                        </Grid>


                        <ModalAnimated
                            style={{ justifyContent: 'flex-end', margin: 0 }}
                            isVisible={modalGeneralInformation}
                            onSwipeComplete={() => { this.setState({ modalGeneralInformation: false, generalInformation: prize.aboutTheCompany.generalInformation }) }}
                            swipeDirection={['down']}>
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
                                            <Button transparent onPress={() => this.setState({ modalGeneralInformation: false, generalInformation: prize.aboutTheCompany.generalInformation })}>
                                                <Text
                                                    allowFontScaling={false}
                                                    minimumFontScale={wp(4)}
                                                    style={{ color: colorsPalette.primaryColor, fontSize: wp(4), top: -10 }}>Close</Text>
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Title style={{ top: -10, fontSize: wp(5) }}>General information</Title>
                                        </Body>
                                        <Right>
                                            <Button
                                                style={{ top: -10 }}
                                                disabled={generalInformation.length > 10 ? false : true}
                                                onPress={() => this._updatePrize()}
                                                transparent>
                                                {isLoading
                                                    ? <Spinner color={colorsPalette.primaryColor} size="small" style={{ right: 5, top: -5 }} />
                                                    : <Text
                                                        allowFontScaling={false}
                                                        minimumFontScale={wp(4)}
                                                        style={{ color: generalInformation.length > 10 ? colorsPalette.primaryColor : colorsPalette.gradientGray, fontSize: wp(4), top: -5 }}>DONE</Text>}
                                            </Button>
                                        </Right>
                                    </Header>
                                    <Content>
                                        <ListItem itemDivider style={{ borderBottomColor: colorsPalette.underlinesColor, borderBottomWidth: 0.5 }}>
                                            <Text>PLEASE, UPDATE GENERAL INFORMATION:</Text>
                                        </ListItem>
                                        <Form style={{ padding: 10 }}>
                                            <Textarea
                                                maxLength={1024}
                                                autoFocus={true}
                                                value={generalInformation}
                                                onChangeText={(generalInformation) => this.setState({ generalInformation })}
                                                allowFontScaling={false}
                                                style={{ borderColor: colorsPalette.transparent }}
                                                rowSpan={10}
                                                selectionColor={colorsPalette.primaryColor}
                                            />
                                        </Form>
                                    </Content>
                                </Container>
                            </View>

                        </ModalAnimated>
                    </Container>
                </Modal>
            </View>
        );
    }
}