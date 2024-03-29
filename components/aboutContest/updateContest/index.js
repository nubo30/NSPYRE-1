import React, { Component } from 'react';
import { Modal, ImageBackground, Alert, Platform, Image, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
import { withNavigation } from 'react-navigation'
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { Header, Left, Button, Icon, Text, Title, View, Right, ListItem, Body, Item, Input, List, Spinner, Toast, Container, Content } from 'native-base'
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment'
import _ from 'lodash'
import Swiper from 'react-native-swiper'
import * as Animatable from 'react-native-animatable'
import { isAscii } from 'validator'
import omitDeep from 'omit-deep'
import AWS from 'aws-sdk'
import bytes from 'bytes'
import FlashMessage, { showMessage } from "react-native-flash-message";

import { securityCredentials } from '../../global/aws/credentials'

// Colors
import { colorsPalette } from "../../global/static/colors";

// Icons
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { MyStatusBar } from '../../global/statusBar/index'

// GRAPHQL
import * as mutations from '../../../src/graphql/mutations'

class UpdateContest extends Component {

    state = {
        dateChoose: "",
        nameOfContest: "",
        description: "",
        instructions: "",
        description: "",

        // Prize
        nameOfPrize: "",
        descriptionOfPrize: "",
        pictureOfPrize: { name: "", type: "", localUrl: "", url: "" },

        // List
        prizesList: [],

        // Photo
        picture: { name: "", type: "", localUrl: "", url: "" },
        video: { name: "", type: "", localUrl: "", url: "" },

        // Actions
        timerSwitch: false,
        isDateTimePickerVisible: false,
        indexSwiper: 0,
        indexSecondSwiper: 0,
        isvalidFormAnimation: false,
        messageFlash: { cognito: null },


        // Modals
        openModalDescription: false,
        openModalInstructions: false,
        visibleModalNameOfPrize: false,
        visibleModalDescription: false,
        VisibleModalPicturePrize: false,
        visibleModalVideoPrize: false,

        // Loadings
        isLoadingUploadImagenToAWS: false,
        isLoading: false
    }

    // Cambiar el timer
    _dateTimePicker = () => {
        const { timerSwitch } = this.state
        !timerSwitch ? this.showDateTimePicker() : this.setState({ dateChoose: "" })
    }

    showDateTimePicker = () => { this.setState({ isDateTimePickerVisible: true }) }

    // Confirmar la fecha selccionada
    handleDatePicked = date => {
        this.setState({ dateChoose: date })
        this.hideDateTimePicker(true);
    };

    hideDateTimePicker = (action) => { this.setState({ isDateTimePickerVisible: false, timerSwitch: action ? true : false }) };


    // UPLOAD PHOTOS PRIZES
    // permission to access the user's phone library
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    _useLibraryHandlerContest = async (action) => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: action })
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

    _useLibraryHandlerPrizes = async (action) => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], mediaTypes: action })
        this._getNameOfLocalUrlImagePrizes(result.uri)
    }


    _getNameOfLocalUrlImage = async (fileUri, access = "public") => {
        const { contest } = this.props
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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${contest.user.email}/contest/pictures/owner/${name}`
            }
        })
    }

    _getNameOfLocalUrlVideo = async (fileUri, access = "public") => {
        const { contest } = this.props
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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${contest.user.email}/contest/videos/owner/${name}`
            }
        })
    }

    // Actualizar datos en AWS
    _updateContest = async () => {
        this.setState({ isLoadingUploadImagenToAWS: true })
        const { nameOfContest, description, instructions, picture, dateChoose, video } = this.state
        const { contest } = this.props
        const userData = { id: this.props.userData.id, email: this.props.userData.email, firstPicture: contest.general.picture, firstVideo: contest.general.video }
        omitDeep(contest, ['user', '__typename', 'audience', 'participants', 'usersSharing', 'usersLikes', 'viewsVideo'])
        AWS.config.update({ accessKeyId: securityCredentials.accessKeyId, secretAccessKey: securityCredentials.secretAccessKey, region: securityCredentials.region })
        let blobPicture; let blobVideo

        // PICTURE OF THE CONTEST
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
        // VIDEO OF THE CONTEST
        if (video.localUrl) {
            blobVideo = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () { resolve(xhr.response) };
                xhr.onerror = function () { reject(new TypeError("Network request failed")) };
                xhr.responseType = "blob";
                xhr.open("GET", video.localUrl ? video.localUrl : contest.general.video.localUrl, true);
                xhr.send(null);
            });
        }

        Object.assign(contest, {
            general: {
                nameOfContest: nameOfContest ? nameOfContest : contest.general.nameOfContest,
                description: description ? description : contest.general.description,
                instructions: instructions ? instructions : contest.general.instructions,
                picture: picture.localUrl ? picture : contest.general.picture,
                video: video.localUrl ? video : contest.general.video,
            },
            timer: dateChoose ? { end: dateChoose, start: moment().toISOString() } : contest.timer
        })
        const input = contest

        try {
            picture.localUrl ? await Storage.put(`users/${userData.email}/contest/pictures/owner/${picture.name}`, blobPicture, {
                progressCallback(progress) {
                    this.refs.modalFlash.showMessage({
                        animated: false,
                        autoHide: progress.loaded === progress.total ? true : false,
                        message: "Uploading picture...",
                        description: `Please wait until the following load is finished: ${bytes(progress.loaded * 1.7, { decimalPlaces: 0 })}/${bytes(progress.total * 1.7, { decimalPlaces: 0 })}`,
                        type: "default",
                        backgroundColor: colorsPalette.uploadingData,
                        color: colorsPalette.secondaryColor, // text color
                    });
                },
            }, { contentType: picture.type }).catch(() => {
                this.setState({ picture: { name: "", type: "", localUrl: userData.firstPicture.url } })
            }) : null
            video.localUrl ? await Storage.put(`users/${userData.email}/contest/videos/owner/${video.name}`, blobVideo, {
                progressCallback(progress) {
                    this.refs.modalFlash.showMessage({
                        animated: false,
                        autoHide: progress.loaded === progress.total ? true : false,
                        message: "Uploading video...",
                        description: `Please wait until the following load is finished: ${bytes(progress.loaded * 1.7, { decimalPlaces: 0 })}/${bytes(progress.total * 1.7, { decimalPlaces: 0 })}`,
                        type: "default",
                        backgroundColor: colorsPalette.uploadingData,
                        color: colorsPalette.secondaryColor, // text color
                    });
                },
            }, { contentType: video.type }).catch(() => {
                this.setState({ video: { name: "", type: "", localUrl: userData.firstVideo.url, } })
            }) : null
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
            this.refs.modalFlash.showMessage({
                message: "Done!",
                description: "It has been updated successfully!",
                type: "default",
                backgroundColor: colorsPalette.validColor,
                color: colorsPalette.secondaryColor, // text color
            });
            this.setState({ isLoadingUploadImagenToAWS: false })
        } catch (error) {
            this.refs.modalFlash.showMessage({
                message: "Oh! Something went wrong.",
                description: "An error has occurred, try again please.",
                type: "default",
                backgroundColor: colorsPalette.uploadingData,
                color: colorsPalette.secondaryColor, // text color
            });
            this.setState({ isLoadingUploadImagenToAWS: false })
        }
    }

    _changeSecondSwiper = (i) => {
        this.secondSwiper.scrollBy(i)
    }

    // PRICE
    onValueChangePrice = (value) => { this.setState({ price: value }) }

    // Validar formulario
    _validateFormPrize = () => {
        this.setState({ isLoading: true })
        const { nameOfPrize, descriptionOfPrize, pictureOfPrize } = this.state
        isAscii(nameOfPrize)
            ? descriptionOfPrize
                ? pictureOfPrize.name
                    ? this._createPrize()
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong video" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid description" } } })
            : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid name prize" } } })
    }

    _getNameOfLocalUrlImagePrizes = async (fileUri, access = "public") => {
        const { contest } = this.props
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
            pictureOfPrize: {
                ...this.state.picture,
                localUrl: fileUri,
                name,
                type,
                blob,
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${contest.user.email}/contest/prizes/pictures/owner/${name}`
            }
        })
    }


    _createPrize = async () => {
        const { contest } = this.props
        const { nameOfPrize, descriptionOfPrize, price, pictureOfPrize } = this.state
        const userData = { id: this.props.userData.id, email: this.props.userData.email }
        omitDeep(contest, ['user', '__typename', 'audience', 'participants', 'usersSharing', 'usersLikes', 'viewsVideo'])
        contest.prizes.push({
            name: nameOfPrize,
            description: descriptionOfPrize,
            price,
            picture: pictureOfPrize,
            prizeId: '_' + Math.random().toString(36).substr(2, 9)
        })
        AWS.config.update({
            accessKeyId: securityCredentials.accessKeyId,
            secretAccessKey: securityCredentials.secretAccessKey,
            "region": securityCredentials.region
        })

        // PICTURE OF THE CONTEST
        const blobPicture = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", pictureOfPrize.localUrl, true);
            xhr.send(null);
        });

        const input = contest

        try {
            await Storage.put(`users/${userData.email}/contest/prizes/pictures/owner/${pictureOfPrize.name}`, blobPicture, { contentType: pictureOfPrize.type })
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
            this._changeSecondSwiper(-1)
        } catch (error) {
            this.refs.modalFlash.showMessage({
                message: "Connection failed.",
                description: "Oops! An error has occurred, please try again.",
                type: "default",
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor, // text color
            });
        }
    }

    _deleteContest = async () => {
        const { contest, navigation, _setModalVisibleUpdate, userData } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.deleteCreateContest, { input: { id: contest.id } }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
            await _setModalVisibleUpdate(false)
            await navigation.navigate('Home')
        } catch (error) {
            alert(error)
        }
    }

    render() {
        const { contest, userData, openModalUpdateContest, _setModalVisibleUpdate } = this.props
        const {
            picture,
            video,
            dateChoose,
            nameOfContest,
            description,
            instructions,
            prizesList,
            indexSwiper,
            indexSecondSwiper,

            // Prize
            nameOfPrize,
            descriptionOfPrize,
            pictureOfPrize,

            // Modals
            openModalDescription,
            openModalInstructions,
            visibleModalNameOfPrize,
            visibleModalDescription,
            VisibleModalPicturePrize,

            // Actions
            isLoadingUploadImagenToAWS,
            isLoading,
            isvalidFormAnimation,
            messageFlash
        } = this.state
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={openModalUpdateContest}>
                <Grid>
                    <Row size={35} style={{ flexDirection: 'column' }}>
                        <View style={{ position: 'absolute', height: "100%" }}>
                            <Swiper
                                onIndexChanged={(indexSwiper) => this.setState({ indexSwiper })}
                                loop={false} activeDotColor="#D82B60" dotColor="#BDBDBD">
                                <ImageBackground
                                    source={{ uri: picture.localUrl ? picture.localUrl : contest.general.picture.url }}
                                    style={{ height: "100%", width: "100%", flex: 1 }}>
                                    <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                        <Button disabled={isLoadingUploadImagenToAWS}
                                            bordered
                                            style={{ alignSelf: 'center', borderColor: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF", top: 15 }}
                                            onPress={() => this._useLibraryHandlerContest('Images')}>
                                            <Text allowFontScaling={false} style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF", letterSpacing: 3 }}>Change Image</Text>
                                        </Button>
                                    </View>
                                </ImageBackground>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                    <Video
                                        source={{ uri: video.localUrl ? video.localUrl : contest.general.video.url }}
                                        useNativeControls
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        resizeMode="cover"
                                        shouldPlay={indexSwiper ? true : false}
                                        isLooping={false}
                                        style={{ width: "100%", height: "100%" }} />
                                    <Button disabled={isLoadingUploadImagenToAWS}
                                        bordered
                                        style={{ borderColor: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF", position: 'absolute', alignSelf: 'center' }}
                                        onPress={() => this._useLibraryHandlerContest('Videos')}>
                                        <Text allowFontScaling={false} style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF", letterSpacing: 3 }}>Change Video</Text>
                                    </Button>
                                </View>
                            </Swiper>
                        </View>
                        {indexSwiper === 1 ? null : <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", width: "100%", position: 'absolute' }}>
                            <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                            <Left style={{ flexDirection: "row", alignItems: "center" }}>
                                <Button style={{ minWidth: wp(11) }}
                                    disabled={isLoadingUploadImagenToAWS}
                                    transparent
                                    onPress={() => indexSecondSwiper ? this._changeSecondSwiper(-1) : _setModalVisibleUpdate(false)}>
                                    <Icon name='arrow-back' style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF" }} />
                                    <Text allowFontScaling={false} style={{ left: 5, color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF" }}>{indexSecondSwiper ? "Back" : "Contest"}</Text>
                                </Button>
                                <Title allowFontScaling={false} style={{ alignSelf: "center", left: 15, color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF", fontSize: wp(10) }}>Editing</Title>
                            </Left>
                            <Right>
                                <Button
                                    transparent
                                    disabled={picture.localUrl || video.localUrl || dateChoose || nameOfContest || instructions || description || prizesList.length ? false : true}
                                    onPress={() => this._updateContest()}>
                                    {isLoadingUploadImagenToAWS
                                        ? <Spinner color="#BDBDBD" size="small" style={{ right: 15 }} />
                                        : <Text allowFontScaling={false} style={{ color: picture.localUrl || video.localUrl || dateChoose || nameOfContest || instructions || description || prizesList.length ? '#FFF' : '#9E9E9E', letterSpacing: 2 }}>UPDATE</Text>}
                                </Button>
                            </Right>
                        </Header>}
                    </Row>
                    <Row size={65} style={{ flexDirection: 'column' }}>
                        <Swiper
                            onIndexChanged={(index) => this.setState({ indexSecondSwiper: index })}
                            ref={(secondSwiper) => this.secondSwiper = secondSwiper}
                            showsPagination={false} loop={false} scrollEnabled={false}>
                            <View style={{ flex: 1 }}>

                                {/* NAME OF CONTEST */}
                                <ListItem icon>
                                    <Left>
                                        <Button style={{ backgroundColor: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#007AFF" }}>
                                            <Ionicons active name="ios-brush" style={{ fontSize: wp(6), color: "#FFF", top: 1.5 }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Item style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                            <Input
                                                onSubmitEditing={() => nameOfContest ? this._updateContest() : Keyboard.dismiss()}
                                                returnKeyType='done'
                                                disabled={isLoadingUploadImagenToAWS}
                                                style={{ right: 5, color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#000", fontSize: wp(5) }}
                                                maxLength={256}
                                                placeholder={contest.general.nameOfContest}
                                                placeholderTextColor={isLoadingUploadImagenToAWS ? "#BDBDBD" : "#000"}
                                                value={nameOfContest}
                                                onChangeText={(nameOfContest) => this.setState({ nameOfContest })} />
                                        </Item>
                                    </Body>
                                    <Right>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>
                                            Name of contest
                                            </Text>
                                    </Right>
                                </ListItem>

                                {/* UPDATE DESCRIPTION */}
                                <ListItem icon disabled={isLoadingUploadImagenToAWS} onPress={() => this.setState({ openModalDescription: true })}>
                                    <Left>
                                        <Button style={{ backgroundColor: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#9C27B0" }}>
                                            <AntDesign active name="bulb1" style={{ fontSize: wp(6), color: "#FFF" }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text allowFontScaling={false} style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : null, fontSize: wp(4) }}>{_.truncate(description ? description : contest.general.description, { length: 40, separator: "..." })}</Text>
                                    </Body>
                                    <Right>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Description</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>

                                {/* UPDATE INSTRUCTION */}
                                <ListItem icon disabled={isLoadingUploadImagenToAWS} onPress={() => this.setState({ openModalInstructions: true })}>
                                    <Left>
                                        <Button style={{ backgroundColor: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#E65100" }}>
                                            <MaterialCommunityIcons active name="sign-direction" style={{ fontSize: wp(6), color: "#FFF" }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text allowFontScaling={false} style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : null, fontSize: wp(4) }}>{_.truncate(instructions ? instructions : contest.general.instructions, { length: 40, separator: "..." })}</Text>
                                    </Body>
                                    <Right>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Instructions</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>

                                {/* ADD PRIZE */}
                                <ListItem icon disabled={isLoadingUploadImagenToAWS} onPress={() => this._changeSecondSwiper(1)}>
                                    <Left>
                                        <Button style={{ backgroundColor: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFD600" }}>
                                            <Feather active name="award" style={{ fontSize: wp(6), color: "#FFF" }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text allowFontScaling={false} style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : null, fontSize: wp(4) }}>{contest.prizes.length} Prize created</Text>
                                    </Body>
                                    <Right>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Add new prizes</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>

                                <Button
                                    disabled={isLoading}
                                    onPress={() => Alert.alert(
                                        `${userData.name}`,
                                        `Do you really want to delete the contest ${contest.general.nameOfContest}`,
                                        [
                                            {
                                                text: 'Cancel',
                                                onPress: () => { },
                                                style: 'cancel',
                                            },
                                            { text: 'OK', onPress: () => this._deleteContest() },
                                        ],
                                        { cancelable: false },
                                    )}
                                    transparent
                                    style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                                    <Ionicons name="md-trash" style={{ color: isLoading ? "#BDBDBD" : '#F44336', fontSize: wp(7) }} />
                                </Button>
                            </View>

                            {/* ADD PRIZES */}
                            <View style={{ flex: 1 }}>
                                <Grid>
                                    <Row size={10} style={{ padding: 15, flexDirection: 'column' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(9), color: isLoading ? "#BDBDBD" : "#D81B60" }}>
                                            Adding New Prize
                                            </Text>
                                    </Row>
                                    <Row size={70}>
                                        <List style={{ width: "100%" }}>
                                            {/* NAME PRIZE */}
                                            <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalNameOfPrize: true })}>
                                                <Left>
                                                    <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#009688" }}>
                                                        <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                                    </Button>
                                                </Left>
                                                <Body>
                                                    <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Name of prize</Text>
                                                </Body>
                                                <Right>
                                                    <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{nameOfPrize ? nameOfPrize : 'Not specified'}</Text>
                                                    <Icon active name="arrow-forward" />
                                                </Right>
                                            </ListItem>

                                            {/* DESCRIPTION */}
                                            <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalDescription: true })}>
                                                <Left>
                                                    <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#F4511E" }}>
                                                        <MaterialIcons style={{ fontSize: wp(5.6), color: '#FFF' }} active name="description" />
                                                    </Button>
                                                </Left>
                                                <Body>
                                                    <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Description</Text>
                                                </Body>
                                                <Right>
                                                    <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{descriptionOfPrize ? _.truncate(descriptionOfPrize, { separator: "...", length: 20 }) : "Not specified"}</Text>
                                                    <Icon active name="arrow-forward" />
                                                </Right>
                                            </ListItem>


                                            {/* PICTURE */}
                                            <ListItem disabled={isLoading} icon onPress={() => this.setState({ VisibleModalPicturePrize: true })}>
                                                <Left>
                                                    <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#4DB6AC" }}>
                                                        <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF' }} active name="picture-o" />
                                                    </Button>
                                                </Left>
                                                <Body>
                                                    <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4) }}>Picture</Text>
                                                </Body>
                                                <Right>
                                                    <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{pictureOfPrize.name ? "Already selected" : "No select"}</Text>
                                                    <Icon active name="arrow-forward" />
                                                </Right>
                                            </ListItem>
                                        </List>
                                    </Row>
                                    <Row size={20} style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>
                                        <Text allowFontScaling={false} style={{ color: '#F44336', fontSize: wp(4) }}>
                                            {messageFlash.cognito && messageFlash.cognito.message}
                                        </Text>
                                        <Animatable.View
                                            animation={isvalidFormAnimation ? "shake" : undefined}
                                            onAnimationEnd={() => this.setState({ isvalidFormAnimation: false })}
                                            duration={1000}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: "80%",
                                                shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                                                top: -5
                                            }}>
                                            <Button
                                                disabled={isLoading}
                                                onPress={() => this._validateFormPrize()}
                                                iconRight style={{
                                                    width: "100%",
                                                    alignSelf: 'center',
                                                    backgroundColor: '#E91E63'
                                                }}>
                                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#BDBDBD" : "#FFF", fontSize: wp(4) }}>Create</Text>
                                                {isLoading ? <Spinner color="#BDBDBD" size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                                            </Button>
                                        </Animatable.View>
                                    </Row>
                                </Grid>
                            </View>
                        </Swiper>
                    </Row>
                </Grid>

                {/* MODAL DESCRIPTION */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={openModalDescription}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(7) }}>Description</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    description
                                        ? this.setState({ openModalDescription: false })
                                        : this.setState({ description: "", openModalDescription: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: description ? colorsPalette.primaryColor : colorsPalette.thirdColor
                                    }}>{description ? "DONE" : "CANCEL"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* DESCRIPTION */}
                            <Item
                                style={{ width: "90%", top: 15, alignSelf: "center" }}>
                                <Input
                                    allowFontScaling={false}
                                    onSubmitEditing={() => description ? this.setState({ openModalDescription: false }) : Keyboard.dismiss()}
                                    returnKeyType='done'
                                    multiline
                                    numberOfLines={3}
                                    placeholder="Description"
                                    placeholderTextColor={colorsPalette.gradientGray}
                                    autoFocus={true}
                                    value={description}
                                    keyboardType="ascii-capable"
                                    selectionColor={colorsPalette.primaryColor}
                                    style={{ padding: 5, maxHeight: 170 }}
                                    onChangeText={(value) => this.setState({ description: value })} />
                            </Item>
                        </Content>
                    </Container>
                </Modal>

                {/* MODAL INSTRUCTIONS */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={openModalInstructions}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(7) }}>Instructions</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    instructions
                                        ? this.setState({ openModalInstructions: false })
                                        : this.setState({ instructions: "", openModalInstructions: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: instructions ? colorsPalette.primaryColor : colorsPalette.thirdColor
                                    }}>{instructions ? "DONE" : "CANCEL"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            <Item
                                style={{ width: "90%", top: 15, alignSelf: "center" }}>
                                <Input
                                    allowFontScaling={false}
                                    onSubmitEditing={() => instructions ? this.setState({ openModalInstructions: false }) : Keyboard.dismiss()}
                                    returnKeyType='done'
                                    multiline
                                    numberOfLines={3}
                                    placeholder="Instructions"
                                    placeholderTextColor={colorsPalette.gradientGray}
                                    autoFocus={true}
                                    value={instructions}
                                    keyboardType="ascii-capable"
                                    selectionColor={colorsPalette.primaryColor}
                                    style={{ padding: 5, maxHeight: 170 }}
                                    onChangeText={(value) => this.setState({ instructions: value })} />
                            </Item>
                        </Content>
                    </Container>
                </Modal>

                {/* NAME PRIZE MODAL */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalNameOfPrize}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Name of prize</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    nameOfPrize
                                        ? this.setState({ visibleModalNameOfPrize: false })
                                        : this.setState({ nameOfPrize: "", visibleModalNameOfPrize: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: nameOfPrize ? "#E91E63" : "#3333"
                                    }}>{
                                            nameOfPrize ? "Done" : "Cancel"
                                        }</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* COMPANY NAMEY */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                        <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Input
                                        onSubmitEditing={() => nameOfPrize ? this.setState({ visibleModalNameOfPrize: false }) : Keyboard.dismiss()}
                                        returnKeyType='done'
                                        allowFontScaling={false}
                                        placeholder="Company Name"
                                        placeholderTextColor="#EEEE"
                                        maxLength={20}
                                        autoFocus={true}
                                        value={nameOfPrize}
                                        keyboardType="ascii-capable"
                                        selectionColor="#E91E63"
                                        onChangeText={(value) => this.setState({ nameOfPrize: value })} />
                                </Body>
                                <Right />
                            </ListItem>
                        </Content>
                    </Container>
                </Modal>

                {/* DESCRIPTION OF PRIZE */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalDescription}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Description</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    descriptionOfPrize
                                        ? this.setState({ visibleModalDescription: false })
                                        : this.setState({ descriptionOfPrize: "", visibleModalDescription: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: descriptionOfPrize ? "#E91E63" : "#3333"
                                    }}>{descriptionOfPrize ? "Done" : "Cancel"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* DESCRIPTION */}
                            <Item
                                style={{ width: "90%", top: 15, alignSelf: "center", borderBottomColor: colorsPalette.transparent }}>
                                <Input
                                    allowFontScaling={false}
                                    multiline
                                    numberOfLines={3}
                                    placeholder="Description"
                                    placeholderTextColor="#EEEE"
                                    autoFocus={true}
                                    value={descriptionOfPrize}
                                    keyboardType="ascii-capable"
                                    selectionColor="#E91E63"
                                    style={{ padding: 5, maxHeight: 220 }}
                                    onChangeText={(value) => this.setState({ descriptionOfPrize: value })} />
                            </Item>
                        </Content>
                    </Container>
                </Modal>

                {/* PICTURE OF PRIZE */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={VisibleModalPicturePrize}>
                    <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent
                                onPress={() => { this.setState({ VisibleModalPicturePrize: false, pictureOfPrize: { name: "", type: "", localUrl: "" } }) }}>
                                <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                <Text allowFontScaling={false} style={{ left: 5, color: "#D81B60" }}>{pictureOfPrize.name ? "DELETE" : "BACK"}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button
                                disabled={pictureOfPrize.name ? false : true}
                                transparent
                                onPress={() => { this.setState({ VisibleModalPicturePrize: false }) }}>
                                <Text allowFontScaling={false} style={{ color: pictureOfPrize.name ? "#D81B60" : "#BDBDBD", fontSize: wp(5) }}>OK</Text>
                            </Button>
                        </Right>
                    </Header>
                    <Grid>
                        <Row size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {pictureOfPrize.name
                                ? <Image style={{ height: "100%", width: "100%" }} source={{ uri: pictureOfPrize.localUrl }} />
                                : <Ionicons name="ios-images" style={{ fontSize: wp(50), color: "#BDBDBD" }} />}
                        </Row>
                        <Row size={30} style={{ flexDirection: 'column' }}>
                            <Button
                                onPress={() => this._useLibraryHandlerPrizes('Images')}
                                transparent
                                style={{
                                    top: 10,
                                    backgroundColor: "#D81B60",
                                    borderRadius: 10, width: "80%", alignSelf: 'center', justifyContent: 'center'
                                }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: "#fff", letterSpacing: 3 }}>{pictureOfPrize.name ? `CHANGE IMAGEN` : `SELECT IMAGEN`}</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Modal>
                <FlashMessage ref="modalFlash" position="top" />
            </Modal>
        );
    }
}

export default withNavigation(UpdateContest)