import React, { Component } from 'react';
import { Modal, ImageBackground, KeyboardAvoidingView, Alert, Platform, Image } from 'react-native';
import { ImagePicker, Permissions, Video } from 'expo';
import { withNavigation } from 'react-navigation'
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { Header, Left, Button, Icon, Text, Title, Content, View, Right, ListItem, Body, Switch, Item, Input, Container, List, Picker, Spinner, Toast, Root } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import _ from 'lodash'
import Swiper from 'react-native-swiper'
import * as Animatable from 'react-native-animatable'
import { isAscii } from 'validator'
import omitDeep from 'omit-deep'


// Icons
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { MyStatusBar } from '../../Global/statusBar/index'

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
        videoOfPrize: { name: "", type: "", localUrl: "", url: "" },

        // Picker
        price: 'NO_SELECT',

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
        visibleModalDescriptionPrize: false,
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

    // UPLOAD PHOTOS CONTEST
    _useLibraryHandlerContest = async (action) => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], mediaTypes: action })
        if (!result.cancelled) {
            action === 'Images'
                ? this._getNameOfLocalUrlImage(result.uri)
                : this._getNameOfLocalUrlVideo(result.uri)
        }
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
        const { nameOfContest, description, instructions, picture, dateChoose, video } = this.state
        const { contest } = this.props
        const userData = { id: this.props.userData.id, email: this.props.userData.email, firstPicture: contest.general.picture, firstVideo: contest.general.video }
        omitDeep(contest, ['user', '__typename', 'audience'])
        AWS.config.update({
            accessKeyId: "AKIAIQA34573X4TITQEQ",
            secretAccessKey: "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",
            "region": "sa-east-1"
        })
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

        if (video.localUrl) {
            // VIDEO OF THE CONTEST
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
            timer: dateChoose ? dateChoose : contest.timer
        })
        const input = contest
        try {
            picture.localUrl ? await Storage.put(`users/${userData.email}/contest/pictures/owner/${picture.name}`, blobPicture, { contentType: picture.type }).catch(() => {
                this.setState({ picture: { name: "", type: "", localUrl: userData.firstPicture.url, } })
            }) : null
            video.localUrl ? await Storage.put(`users/${userData.email}/contest/videos/owner/${video.name}`, blobVideo, { contentType: video.type }).catch(() => {
                this.setState({ video: { name: "", type: "", localUrl: userData.firstVideo.url, } })
            }) : null
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
        } catch (error) {
            console.log(error);
            Toast.show({ text: 'An error has occurred, try again.', buttonText: 'Okay', type: 'danger' })
        } finally {
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
        const { nameOfPrize, descriptionOfPrize, pictureOfPrize, videoOfPrize } = this.state
        isAscii(nameOfPrize)
            ? descriptionOfPrize
                ? pictureOfPrize.name
                    ? videoOfPrize.name
                        ? this._createPrize()
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong video" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong picture" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid description" } } })
            : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid name prize" } } })
    }

    _useLibraryHandlerPrizes = async (action) => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], mediaTypes: action })
        if (!result.cancelled) {
            action === 'Images'
                ? this._getNameOfLocalUrlImagePrizes(result.uri)
                : this._getNameOfLocalUrlVideoPrizes(result.uri)
        }
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

    _getNameOfLocalUrlVideoPrizes = async (fileUri, access = "public") => {
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
            videoOfPrize: {
                ...this.state.picture,
                localUrl: fileUri,
                name,
                type,
                blob,
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${contest.user.email}/contest/prizes/videos/owner/${name}`
            }
        })
    }

    _createPrize = async () => {
        const { contest } = this.props
        const { nameOfPrize, descriptionOfPrize, price, pictureOfPrize, videoOfPrize } = this.state
        const userData = { id: this.props.userData.id, email: this.props.userData.email }
        omitDeep(contest, ['user', '__typename'])
        contest.prizes.push({
            name: nameOfPrize,
            description: descriptionOfPrize,
            price,
            picture: pictureOfPrize,
            video: videoOfPrize,
            prizeId: '_' + Math.random().toString(36).substr(2, 9)
        })
        AWS.config.update({
            accessKeyId: "AKIAIQA34573X4TITQEQ",
            secretAccessKey: "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",
            "region": "sa-east-1"
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

        // VIDEO OF THE CONTEST
        const blobVideo = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", videoOfPrize.localUrl, true);
            xhr.send(null);
        });
        const input = contest

        try {
            await Storage.put(`users/${userData.email}/contest/pictures/owner/${pictureOfPrize.name}`, blobPicture, { contentType: pictureOfPrize.type })
            await Storage.put(`users/${userData.email}/contest/videos/owner/${videoOfPrize.name}`, blobVideo, { contentType: videoOfPrize.type })
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
            this._changeSecondSwiper(-1)
        } catch (error) {
            Toast.show({
                text: "Oops! An error has occurred",
                buttonText: "Okay",
                type: "danger",
                duration: 3000
            })
        } finally {
            this.setState({
                isLoading: false
            })
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
            price,
            prizesList,
            indexSwiper,
            indexSecondSwiper,

            // Prize
            nameOfPrize,
            descriptionOfPrize,
            pictureOfPrize,
            videoOfPrize,

            // Modals
            openModalInstructions,
            openModalDescription,
            visibleModalNameOfPrize,
            visibleModalDescriptionPrize,
            VisibleModalPicturePrize,
            visibleModalVideoPrize,

            // Actions
            isLoadingUploadImagenToAWS,
            isDateTimePickerVisible,
            timerSwitch,
            isLoading,
            isvalidFormAnimation,
            messageFlash
        } = this.state

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={openModalUpdateContest}>
                <Root>
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
                                                <Text style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF", letterSpacing: 3 }}>Change Image</Text>
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
                                            <Text style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF", letterSpacing: 3 }}>Change Video</Text>
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
                                        <Text style={{ left: 5, color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF" }}>{indexSecondSwiper ? "Back" : "Contest"}</Text>
                                    </Button>
                                    <Title style={{ alignSelf: "center", left: 15, color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FFF", fontSize: wp(10) }}>Editing</Title>
                                </Left>
                                <Right>
                                    <Button
                                        transparent
                                        disabled={picture.localUrl || video.localUrl || dateChoose || nameOfContest || instructions || description || prizesList.length ? false : true}
                                        onPressIn={() => this.setState({ isLoadingUploadImagenToAWS: true })}
                                        onPress={() => this._updateContest()}>
                                        {isLoadingUploadImagenToAWS
                                            ? <Spinner color="#BDBDBD" size="small" style={{ right: 15 }} />
                                            : <Text style={{ color: picture.localUrl || video.localUrl || dateChoose || nameOfContest || instructions || description || prizesList.length ? '#FFF' : '#9E9E9E', letterSpacing: 2 }}>UPDATE</Text>}
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
                                    {/* TIMER */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#FF9501" }}>
                                                <Ionicons active name="md-timer" style={{ fontSize: wp(6), color: "#FFF", top: 1.5 }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            {contest.timer === null
                                                ? <Text style={{ color: !isLoadingUploadImagenToAWS ? null : "#BDBDBD" }}>{dateChoose === "" ? "Add Timer" : moment(dateChoose).format('LLLL')}</Text>
                                                : <Text style={{ color: !isLoadingUploadImagenToAWS ? null : "#BDBDBD" }}>{contest.timer === null ? contest.timer : moment(dateChoose ? dateChoose : contest.timer).format('LLLL')}</Text>}
                                        </Body>
                                        <Right>
                                            <Switch
                                                value={timerSwitch}
                                                onValueChange={() => { this.setState({ timerSwitch: !timerSwitch }); this._dateTimePicker() }}
                                                disabled={isLoadingUploadImagenToAWS} />
                                        </Right>
                                        <DateTimePicker
                                            mode="datetime"
                                            titleIOS="Press Confirm to change the current time"
                                            isVisible={isDateTimePickerVisible}
                                            onConfirm={this.handleDatePicked}
                                            onCancel={this.hideDateTimePicker}
                                            maximumDate={new Date(new Date().setDate(new Date().getDate() + 15))}
                                            minimumDate={new Date()} />
                                    </ListItem>

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
                                                    disabled={isLoadingUploadImagenToAWS}
                                                    style={{ right: 5, color: isLoadingUploadImagenToAWS ? "#BDBDBD" : "#000" }}
                                                    maxLength={256}
                                                    placeholder={contest.general.nameOfContest}
                                                    placeholderTextColor={isLoadingUploadImagenToAWS ? "#BDBDBD" : "#000"}
                                                    value={nameOfContest}
                                                    onChangeText={(nameOfContest) => this.setState({ nameOfContest })} />
                                            </Item>
                                        </Body>
                                        <Right>
                                            <Text>
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
                                            <Text style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : null }}>{_.truncate(description ? description : contest.general.description, { length: 40, separator: "..." })}</Text>
                                        </Body>
                                        <Right>
                                            <Text>Description</Text>
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
                                            <Text style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : null }}>{_.truncate(instructions ? instructions : contest.general.instructions, { length: 40, separator: "..." })}</Text>
                                        </Body>
                                        <Right>
                                            <Text>Instructions</Text>
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
                                            <Text style={{ color: isLoadingUploadImagenToAWS ? "#BDBDBD" : null }}>{contest.prizes.length} Prize created</Text>
                                        </Body>
                                        <Right>
                                            <Text>Add new prizes</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    <Button
                                        onPress={() => Alert.alert(
                                            `${userData.name}`,
                                            `Do you really want to delete the hello ${contest.general.nameOfContest}`,
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
                                        <Ionicons name="md-trash" style={{ color: '#F44336', fontSize: wp(7) }} />
                                    </Button>

                                </View>

                                {/* ADD PRIZES */}
                                <View style={{ flex: 1 }}>
                                    <Grid>
                                        <Row size={20} style={{ padding: 15, flexDirection: 'column' }}>
                                            <Text style={{ fontSize: wp(10), color: isLoading ? "#BDBDBD" : "#D81B60" }}>
                                                Adding New Prize
                                            </Text>
                                            <Text style={{ color: isLoading ? "#BDBDBD" : "#333", fontSize: wp(4) }}>
                                                Lorem Ipsum es un texto de marcador de posición comúnmente utilizado en las industrias gráficas, gráficas y editoriales para previsualizar diseños y maquetas visuales.
                                            </Text>
                                        </Row>
                                        <Row size={60}>
                                            <List style={{ width: "100%" }}>
                                                {/* NAME PRIZE */}
                                                <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalNameOfPrize: true })}>
                                                    <Left>
                                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#009688" }}>
                                                            <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Name of prize</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text>{nameOfPrize ? nameOfPrize : 'Not specified'}</Text>
                                                        <Icon active name="arrow-forward" />
                                                    </Right>
                                                </ListItem>

                                                {/* DESCRIPTION */}
                                                <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalDescriptionPrize: true })}>
                                                    <Left>
                                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#F4511E" }}>
                                                            <MaterialIcons style={{ fontSize: wp(5.6), color: '#FFF' }} active name="description" />
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Description</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text>{descriptionOfPrize ? _.truncate(descriptionOfPrize, { separator: "...", length: 20 }) : "Not specified"}</Text>
                                                        <Icon active name="arrow-forward" />
                                                    </Right>
                                                </ListItem>

                                                {/* PRICE */}
                                                <ListItem disabled={isLoading} icon>
                                                    <Left>
                                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#F4511E" }}>
                                                            <Ionicons style={{ fontSize: wp(5.6), color: '#FFF' }} active name="ios-pricetag" />
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Text style={{ color: isLoading ? '#BDBDBD' : null }}>Price</Text>
                                                        {!isLoading ? <Picker
                                                            style={{ position: 'absolute', top: -30 }}
                                                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                            mode="dropdown"
                                                            iosHeader="SELECT ONE PRICE"
                                                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                            headerTitleStyle={{ color: "#D81B60" }}
                                                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                            selectedValue={price}
                                                            onValueChange={(value) => this.onValueChangePrice(value)}>
                                                            <Picker.Item label="0$ - 25$" value="P0_25" />
                                                            <Picker.Item label="50$ - 100$" value="P50_100" />
                                                            <Picker.Item label="100$ - 200$" value="P100_200" />
                                                            <Picker.Item label="200$ - 350$" value="P200_250" />
                                                            <Picker.Item label="350$ - 400$" value="P350_400" />
                                                            <Picker.Item label="400$ - 750$" value="P400_750" />
                                                            <Picker.Item label="750$ - 1250$" value="P750_1250" />
                                                            <Picker.Item label="Others" value="OTHERS" />
                                                            <Picker.Item label="No select" value="NO_SELECT" />
                                                        </Picker> : null}
                                                    </Body>
                                                    <Right>
                                                        <Text>{_.replace(_.replace(_.startCase(_.lowerCase(_.replace(price, new RegExp("_", "g"), " "))), new RegExp("P", "g"), ""), '0 ', "0$ - ")}{price === 'OTHERS' || price === 'NO_SELECT' ? '' : '$'}</Text>
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
                                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Picture</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text>{pictureOfPrize.name ? "Already selected" : "No select"}</Text>
                                                        <Icon active name="arrow-forward" />
                                                    </Right>
                                                </ListItem>

                                                {/* VIDEO */}
                                                <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalVideoPrize: true })}>
                                                    <Left>
                                                        <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FBC02D" }}>
                                                            <Feather style={{ fontSize: wp(5), color: '#FFF' }} active name="video" />
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Video</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text>{videoOfPrize.name ? "Already selected" : "No select"}</Text>
                                                        <Icon active name="arrow-forward" />
                                                    </Right>
                                                </ListItem>
                                            </List>
                                        </Row>
                                        <Row size={20} style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>
                                            <Text style={{ color: '#F44336', fontSize: wp(4) }}>
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
                                                    onPressIn={() => this.setState({ isLoading: true })}
                                                    onLongPress={() => this.setState({ isLoading: false })}
                                                    onPress={() => this._validateFormPrize()}
                                                    iconRight style={{
                                                        width: "100%",
                                                        alignSelf: 'center',
                                                        backgroundColor: '#E91E63'
                                                    }}>
                                                    <Text style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#BDBDBD" : "#FFF" }}>Create</Text>
                                                    {isLoading ? <Spinner color="#BDBDBD" size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                                                </Button>
                                            </Animatable.View>
                                        </Row>
                                    </Grid>
                                </View>
                            </Swiper>
                        </Row>
                    </Grid>
                </Root>

                {/* MODAL DESCRIPTION */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={openModalDescription}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Left>
                                <Title style={{ color: "#333", fontSize: wp(6) }}>DESCRIPTION</Title>
                            </Left>
                            <Right />
                        </Header>
                        <Item
                            error={description ? false : true}
                            success={description ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                style={{ padding: 10, maxHeight: 120 }}
                                multiline
                                autoFocus={true}
                                maxLength={1024}
                                value={description}
                                selectionColor="#333"
                                keyboardType="default"
                                onChangeText={(description) => this.setState({ description })} />
                            <Icon
                                style={{ color: description ? '#4CAF50' : '#EF5350' }}
                                name={description ? 'checkmark-circle' : 'close-circle'} />
                        </Item>
                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => this.setState({ openModalDescription: false })}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: "#333" }}>CANCEL</Text>
                                </Button>
                            </Col>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={description ? () => this.setState({ openModalDescription: false }) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: description ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>

                {/* MODAL INSTRUCTIONS */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={openModalInstructions}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Left>
                                <Title style={{ color: "#333", fontSize: wp(6) }}>INSTRUCTIONS</Title>
                            </Left>
                            <Right />
                        </Header>
                        <Item
                            error={instructions ? false : true}
                            success={instructions ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                style={{ padding: 10, maxHeight: 120 }}
                                multiline
                                autoFocus={true}
                                maxLength={1024}
                                value={instructions}
                                selectionColor="#333"
                                keyboardType="default"
                                onChangeText={(instructions) => this.setState({ instructions })} />
                            <Icon
                                style={{ color: instructions ? '#4CAF50' : '#EF5350' }}
                                name={instructions ? 'checkmark-circle' : 'close-circle'} />
                        </Item>
                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => this.setState({ openModalInstructions: false })}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: "#333" }}>CANCEL</Text>
                                </Button>
                            </Col>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={instructions ? () => this.setState({ openModalInstructions: false }) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: instructions ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>

                {/* NAME PRIZE MODAL */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalNameOfPrize}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'}
                        enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null}
                        style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Title style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Name Of Prize</Title>
                        </Header>

                        {/* NAME OF PRIZE */}
                        <Item
                            error={isAscii(nameOfPrize) ? false : true}
                            success={isAscii(nameOfPrize) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                placeholder="Name of prize"
                                placeholderTextColor="#EEEE"
                                maxLength={20}
                                autoFocus={true}
                                value={nameOfPrize}
                                keyboardType="ascii-capable"
                                selectionColor="#E91E63"
                                style={{ fontSize: wp(7) }}
                                onChangeText={(value) => this.setState({ nameOfPrize: value })} />
                        </Item>

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => { this.setState({ visibleModalNameOfPrize: false, name: '' }) }}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: "#333" }}>CANCEL</Text>
                                </Button>
                            </Col>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={nameOfPrize ? () => this.setState({ visibleModalNameOfPrize: false }) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(nameOfPrize) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>

                {/* DESCRIPTION OF PRIZE */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalDescriptionPrize}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'}
                        enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null}
                        style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Title style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Description</Title>
                        </Header>

                        {/* NAME OF PRIZE */}
                        <Item
                            error={isAscii(descriptionOfPrize) ? false : true}
                            success={isAscii(descriptionOfPrize) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                multiline
                                numberOfLines={4}
                                placeholder="Description of Prize"
                                placeholderTextColor="#EEEE"
                                autoFocus={true}
                                value={descriptionOfPrize}
                                keyboardType="ascii-capable"
                                selectionColor="#E91E63"
                                style={{ fontSize: wp(7), padding: 10, maxHeight: 200 }}
                                onChangeText={(value) => this.setState({ descriptionOfPrize: value })} />
                        </Item>

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => { this.setState({ visibleModalDescriptionPrize: false, descriptionOfPrize: '' }) }}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: "#333" }}>CANCEL</Text>
                                </Button>
                            </Col>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={descriptionOfPrize ? () => this.setState({ visibleModalDescriptionPrize: false }) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(descriptionOfPrize) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
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
                                <Text style={{ left: 5, color: "#D81B60" }}>{pictureOfPrize.name ? "DELETE" : "BACK"}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button
                                disabled={pictureOfPrize.name ? false : true}
                                transparent
                                onPress={() => { this.setState({ VisibleModalPicturePrize: false }) }}>
                                <Text style={{ color: pictureOfPrize.name ? "#D81B60" : "#BDBDBD", fontSize: wp(5) }}>OK</Text>
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
                                <Text style={{ fontSize: wp(4.5), color: "#fff", letterSpacing: 3 }}>{pictureOfPrize.name ? `CHANGE IMAGEN` : `SELECT IMAGEN`}</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Modal>

                {/* VIDEO OF PRIZE*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visibleModalVideoPrize}>
                    <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent
                                onPress={() => { this.setState({ visibleModalVideoPrize: false, video: { name: "", type: "", localUrl: "" } }) }}>
                                <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                <Text style={{ left: 5, color: "#D81B60" }}>{videoOfPrize.name ? "DELETE" : "BACK"}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button
                                disabled={videoOfPrize.name ? false : true}
                                transparent
                                onPress={() => { this.setState({ visibleModalVideoPrize: false }) }}>
                                <Text style={{ color: videoOfPrize.name ? "#D81B60" : "#BDBDBD", fontSize: wp(5) }}>OK</Text>
                            </Button>
                        </Right>
                    </Header>
                    <Grid>
                        <Row size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {videoOfPrize.name
                                ? <Video
                                    source={{ uri: videoOfPrize.localUrl }}
                                    useNativeControls
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    shouldPlay
                                    isLooping={false}
                                    style={{ width: "100%", height: "100%" }} />
                                : <Ionicons name="ios-videocam" style={{ fontSize: wp(50), color: "#BDBDBD" }} />}
                        </Row>
                        <Row size={30} style={{ flexDirection: 'column' }}>
                            <Button
                                onPress={() => this._useLibraryHandlerPrizes('Videos')}
                                transparent
                                style={{
                                    top: 10,
                                    backgroundColor: "#D81B60",
                                    borderRadius: 10, width: "80%", alignSelf: 'center', justifyContent: 'center'
                                }}>
                                <Text style={{ fontSize: wp(4.5), color: "#fff", letterSpacing: 3 }}>{videoOfPrize.name ? `CHANGE VIDEO` : `SELECT VIDEO`}</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Modal>

            </Modal>
        );
    }
}

export default withNavigation(UpdateContest)