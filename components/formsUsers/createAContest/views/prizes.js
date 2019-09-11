import React, { Component } from 'react';
import { Dimensions, Alert, Modal, Platform, Image, Keyboard } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Item, Input, Spinner } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'

// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

// Icons
import { Ionicons, Entypo, FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class Prizes extends Component {
    state = {
        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },
        prizes: [],

        // Inputs
        name: "",
        description: "",
        picture: { name: "", type: "", localUrl: "" },
        video: { name: "", type: "", localUrl: "" },

        // Modal
        visibleModalName: false,
        visibleModalDescription: false,
        VisibleModalPicture: false,
        visibleModalVideo: false
    }

    // Validar formulario
    _validateForm = () => {
        const { name, description, picture, video } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            name
                ? description
                    ? picture.name
                        ? video.name
                            ? this._submit()
                            : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong video" } } })
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong picture" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid description" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid name prize" } } })
        }, 500);
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
                name, type,
                blob,
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/contest/prizes/pictures/owner/${name}`
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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/contest/prizes/videos/owner/${name}`
            }
        })
    }

    // Preguntar al usuario por los permisos para abrir la libreria de imagenes y videos
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    // Send data to AWS
    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms, userData } = this.props
        const { prizes, name, description, picture, video } = this.state
        prizes.push({ name, description, picture, video, prizeId: '_' + Math.random().toString(36).substr(2, 9) })
        try {
            await Alert.alert(
                `Hey ${userData.name}`,
                'Would you like to create another prize?',
                [
                    {
                        text: 'No, continue', onPress: () => {
                            _dataFromForms({ prizes })
                            _indexChangeSwiper(1);
                            this.setState({
                                name: "",
                                description: "",
                                picture: { name: "", type: "", localUrl: "" },
                                video: { name: "", type: "", localUrl: "" },
                            })
                        }
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.setState({
                                name: "",
                                description: "",
                                picture: { name: "", type: "", localUrl: "" },
                                video: { name: "", type: "", localUrl: "" },
                            })
                        }
                    },
                ],
                { cancelable: false },
            )
        } catch (error) {
            console.log(error)
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
        }
    }

    render() {
        const {
            isvalidFormAnimation,
            isLoading,
            messageFlash,

            // Input
            name,
            description,
            picture,
            video,

            // Modal
            visibleModalName,
            visibleModalDescription,
            VisibleModalPicture,
            visibleModalVideo
        } = this.state
        const { _indexChangeSwiper } = this.props
        return (
            <Container>
                <GadrientsAuth />
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                <Header style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => _indexChangeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: isLoading ? "#EEEEEE" : "#FFF" }} />
                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(4) }}>About The Contest</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(6) }}>Prizes</Title>
                    </Left>
                </Header>

                {/* Forms */}
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(3), color: isLoading ? "#EEEEEE" : "#FFF", textAlign: 'left', fontWeight: '100' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Next!</Text> {'\n'}We reward your contest participants for you with our point system and redemption center but if you want to add some special give aways for top performers it can increase your results!</Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1, top: -3 }}>
                            <Content contentContainerStyle={{ paddingTop: 10 }}>
                                <List>
                                    {/* NAME PRIZE */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalName: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                                <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Name of prize</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{name ? name : 'Not specified'}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* DESCRIPTION */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalDescription: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#F4511E" }}>
                                                <MaterialIcons style={{ fontSize: wp(5.6), color: '#FFF' }} active name="description" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Terms</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{description ? _.truncate(description, { separator: "...", length: 20 }) : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* PICTURE */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ VisibleModalPicture: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#4DB6AC" }}>
                                                <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF' }} active name="picture-o" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Picture</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{picture.name ? "Already selected" : "No select"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* VIDEO */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalVideo: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D" }}>
                                                <Feather style={{ fontSize: wp(5), color: '#FFF' }} active name="video" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Video</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{video.name ? "Already selected" : "No select"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    <Button iconRight small transparent style={{ alignSelf: 'center', top: 10 }}
                                        onPress={() => Alert.alert(
                                            'Why we need this?',
                                            'We need this information to be able to get other users to find your contest!',
                                            [
                                                { text: 'OK', onPress: () => null },
                                            ],
                                        )}>
                                        <Text allowFontScaling={false} style={{ left: 5, color: "#E0E0E0" }}>Why we need this?</Text>
                                        <Icon name="alert" style={{ right: 5, color: "#E0E0E0" }} />
                                    </Button>
                                </List>
                            </Content>
                        </View>
                        <Text allowFontScaling={false} style={{ color: '#F44336', fontSize: wp(4), top: 10 }}>
                            {messageFlash.cognito && messageFlash.cognito.message}
                        </Text>
                    </Row>
                </Grid>

                {/* Validar formulario */}
                <Footer style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                    <Animatable.View
                        animation={isvalidFormAnimation ? "shake" : undefined}
                        onAnimationEnd={() => this.setState({ isvalidFormAnimation: false })}
                        duration={1000}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "80%",
                            shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                        }}>
                        <Button
                            disabled={isLoading}
                            onPress={() => this._validateForm()}
                            iconRight style={{
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: '#E91E63'
                            }}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', letterSpacing: 2 }}>Create</Text>
                            {isLoading ? <Spinner color="#FFF" size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>

                {/* NAME OF CONTEST */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalName}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Company Name</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    name
                                        ? this.setState({ visibleModalName: false })
                                        : this.setState({ name: "", visibleModalName: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: name ? "#E91E63" : "#3333"
                                    }}>{name ? "Done" : "Cancel"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* COMPANY NAME */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#009688" }}>
                                        <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Input
                                        onSubmitEditing={() => name ? this.setState({ visibleModalName: false }) : Keyboard.dismiss()}
                                        returnKeyType='done'
                                        allowFontScaling={false}
                                        placeholder="Company name"
                                        placeholderTextColor="#EEEE"
                                        maxLength={20}
                                        autoFocus={true}
                                        value={name}
                                        keyboardType="ascii-capable"
                                        selectionColor="#E91E63"
                                        onChangeText={(value) => this.setState({ name: value })} />
                                </Body>
                                <Right />
                            </ListItem>
                        </Content>
                    </Container>
                </Modal>

                {/* DESCRIPTION */}
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
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Terms</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    description
                                        ? this.setState({ visibleModalDescription: false })
                                        : this.setState({ description: "", visibleModalDescription: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: description ? "#E91E63" : "#3333"
                                    }}>{description ? "Done" : "Cancel"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* DESCRIPTION */}
                            <Item
                                style={{ width: "90%", top: 15, alignSelf: "center" }}>
                                <Input
                                    allowFontScaling={false}
                                    onSubmitEditing={() => description ? this.setState({ visibleModalDescription: false }) : Keyboard.dismiss()}
                                    returnKeyType='done'
                                    multiline
                                    numberOfLines={3}
                                    placeholder="Description"
                                    placeholderTextColor="#EEEE"
                                    autoFocus={true}
                                    value={description}
                                    keyboardType="ascii-capable"
                                    selectionColor="#E91E63"
                                    style={{ padding: 5, maxHeight: 170 }}
                                    onChangeText={(value) => this.setState({ description: value })} />
                            </Item>
                        </Content>
                    </Container>
                </Modal>

                {/* PICTURE */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={VisibleModalPicture}>
                    <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent
                                onPress={() => { this.setState({ VisibleModalPicture: false, picture: { name: "", type: "", localUrl: "" } }) }}>
                                <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                <Text allowFontScaling={false} style={{ left: 5, color: "#D81B60", fontSize: wp(4) }}>{picture.name ? "Delete" : "Back"}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button
                                disabled={picture.name ? false : true}
                                transparent
                                onPress={() => { this.setState({ VisibleModalPicture: false }) }}>
                                <Text allowFontScaling={false} style={{ color: picture.name ? "#D81B60" : "#EEEEEE", fontSize: wp(4) }}>OK</Text>
                            </Button>
                        </Right>
                    </Header>
                    <Grid>
                        <Row size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {picture.name
                                ? <Image style={{ height: "100%", width: "100%" }} source={{ uri: picture.localUrl }} />
                                : <Ionicons name="ios-images" style={{ fontSize: wp(50), color: "#EEEEEE" }} />}
                        </Row>
                        <Row size={30} style={{ flexDirection: 'column' }}>
                            <Button
                                onPress={() => this._useLibraryHandler('Images')}
                                transparent
                                style={{
                                    top: 10,
                                    backgroundColor: "#D81B60",
                                    borderRadius: 10, width: "80%", alignSelf: 'center', justifyContent: 'center'
                                }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: "#fff", letterSpacing: 3 }}>{picture.name ? `CHANGE IMAGEN` : `SELECT IMAGEN`}</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Modal>

                {/* VIDEO */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visibleModalVideo}>
                    <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent
                                onPress={() => { this.setState({ visibleModalVideo: false, video: { name: "", type: "", localUrl: "" } }) }}>
                                <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                <Text allowFontScaling={false} style={{ left: 5, color: "#D81B60", fontSize: wp(4) }}>{video.name ? "Delete" : "Back"}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button
                                disabled={video.name ? false : true}
                                transparent
                                onPress={() => { this.setState({ visibleModalVideo: false }) }}>
                                <Text allowFontScaling={false} style={{ color: video.name ? "#D81B60" : "#EEEEEE", fontSize: wp(4) }}>Ok</Text>
                            </Button>
                        </Right>
                    </Header>
                    <Grid>
                        <Row size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {video.name
                                ? <Video
                                    source={{ uri: video.localUrl }}
                                    useNativeControls
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    shouldPlay
                                    isLooping={false}
                                    style={{ width: "100%", height: "100%" }} />
                                : <Ionicons name="ios-videocam" style={{ fontSize: wp(50), color: "#EEEEEE" }} />}
                        </Row>
                        <Row size={30} style={{ flexDirection: 'column' }}>
                            <Button
                                onPress={() => this._useLibraryHandler('Videos')}
                                transparent
                                style={{
                                    top: 10,
                                    backgroundColor: "#D81B60",
                                    borderRadius: 10, width: "80%", alignSelf: 'center', justifyContent: 'center'
                                }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: "#fff", letterSpacing: 3 }}>{video.name ? `CHANGE VIDEO` : `SELECT VIDEO`}</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Modal>

            </Container>
        );
    }
}