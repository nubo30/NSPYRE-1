import React, { Component } from 'react';
import { Dimensions, Modal, Platform, Image, Keyboard } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Picker, Item, Input, Spinner } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'

import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

// Icons
import { Entypo, FontAwesome, AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

// Colors
import { colorsPalette } from '../../../global/static/colors'

export default class AboutTheContest extends Component {
    state = {
        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },

        // Data
        category: 'Not specified',
        nameOfContest: "",
        description: "",
        instructions: "",
        picture: { name: "", type: "", localUrl: "" },
        video: { name: "", type: "", localUrl: "" },

        // Modal
        visibleModalNameOfContest: false,
        visibleModalDescription: false,
        visibleModalInstructions: false,
        VisibleModalPicture: false,
        visibleModalVideo: false
    }

    // Picker
    onValueChangeCategory = (value) => { this.setState({ category: value }) }

    // Validar formulario
    _validateForm = () => {
        const { category, nameOfContest, description, instructions, picture, video } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            category !== 'Not specified'
                ? nameOfContest
                    ? description
                        ? instructions
                            ? picture.name
                                ? video.name
                                    ? this._submit()
                                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong video" } } })
                                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong picture" } } })
                            : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid instruction" } } })
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid description" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid name contest" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Choose a category" } } })
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
                name,
                type,
                blob,
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/contest/pictures/owner/${name}`
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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/contest/videos/owner/${name}`
            }
        })
    }

    // Preguntar al usuario por los permisos para abrir la libreria de imagenes y videos
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms } = this.props
        const { category, nameOfContest, description, instructions, picture, video } = this.state
        const data = { category, general: { nameOfContest, description, instructions, picture, video } }
        try {
            await _dataFromForms(data)
            await _indexChangeSwiper(1)
        } catch (error) {
            console.log(error)
        } finally {
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.wantSuggestedFields) {
            const { dataFromThePreviousContest } = nextProps
            this.setState({
                description: dataFromThePreviousContest.general.description,
                instructions: dataFromThePreviousContest.general.instructions,
            })
        }
    }

    render() {
        const {
            // DATA
            category,
            nameOfContest,
            description,
            instructions,
            picture,
            video,

            isvalidFormAnimation,
            isLoading,
            messageFlash,

            // Modal
            visibleModalNameOfContest,
            visibleModalDescription,
            visibleModalInstructions,
            VisibleModalPicture,
            visibleModalVideo
        } = this.state
        const { _indexChangeSwiper } = this.props

        return (
            <Container>
                <GadrientsAuth />
                <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                <Header transparent>
                    <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => _indexChangeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor }} />
                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor }}>About You</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontSize: wp(5) }}>About The Contest</Title>
                    </Left>
                </Header>
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontWeight: '100' }}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(11), color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor }}>Great! {'\n'}</Text> Now tell us about the contest you want to build!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center' }}>
                        <View style={{ backgroundColor: colorsPalette.secondaryColor, width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content contentContainerStyle={{ paddingTop: 10 }}>
                                <List>

                                    {/* CATEGORY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#007AFF" }}>
                                                <AntDesign style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="select1" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Category</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{_.upperFirst(_.lowerCase(category))}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute' }}>
                                                <Picker
                                                    textStyle={{ color: colorsPalette.transparent }}
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE CATEGORY"
                                                    headerBackButtonTextStyle={{ color: colorsPalette.primaryColor, fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: colorsPalette.primaryColor }}
                                                    headerStyle={{ backgroundColor: colorsPalette.secondaryColor, borderBottomColor: colorsPalette.secondaryColor }}
                                                    selectedValue={category}
                                                    onValueChange={(value) => this.onValueChangeCategory(value)}>
                                                    <Picker.Item label="Music" value="MUSIC" />
                                                    <Picker.Item label="Sport" value="SPORT" />
                                                    <Picker.Item label="Food" value="FOOD" />
                                                    <Picker.Item label="Amazon Sellers" value="AMAZON_SELLERS" />
                                                    <Picker.Item label="Movies / TV Shows / OTT" value="MOVIES_TV_SHOWS_OTT" />
                                                    <Picker.Item label="Electronics" value="ELECTRONICS" />
                                                    <Picker.Item label="Spiritual Religious" value="SPIRITUAL_RELIGIOUS" />
                                                    <Picker.Item label="Beverage" value="BEVERAGE" />
                                                    <Picker.Item label="Gamer" value="GAMER" />
                                                    <Picker.Item label="Apparel" value="APPAREL" />
                                                </Picker>
                                            </View>}
                                    </ListItem>

                                    {/* NAME CONTEST */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalNameOfContest: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#009688" }}>
                                                <Entypo style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="star" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Name of contest</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{nameOfContest ? nameOfContest : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* DESCRIPTION */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalDescription: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#F4511E" }}>
                                                <MaterialIcons style={{ fontSize: wp(5.6), color: colorsPalette.secondaryColor }} active name="description" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Description</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{_.truncate(description ? description : "Not specified", { separator: '...', length: 20 })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* INSTRUCTION */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalInstructions: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#EC407A" }}>
                                                <FontAwesome style={{ fontSize: wp(4.5), color: colorsPalette.secondaryColor, left: 1 }} active name="warning" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Instructions</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{_.truncate(instructions ? instructions : "Not specified", { separator: '...', length: 20 })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* PICTURE */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ VisibleModalPicture: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#4DB6AC" }}>
                                                <FontAwesome style={{ fontSize: wp(4.5), color: colorsPalette.secondaryColor }} active name="picture-o" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Picture</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{picture.name ? "Already selected" : "No select"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* VIDEO */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalVideo: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#FBC02D" }}>
                                                <Feather style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="video" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Video</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{video.name ? "Already selected" : "No select"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                </List>
                            </Content>
                        </View>
                    </Row>
                    <Text allowFontScaling={false} style={{ color: colorsPalette.errColor, fontSize: wp(3.5), top: -7, alignSelf: 'center' }}>
                        {messageFlash.cognito && messageFlash.cognito.message}
                    </Text>
                </Grid>

                {/* Validate Form */}
                <Footer style={{ backgroundColor: colorsPalette.transparent, borderTopColor: colorsPalette.transparent }}>
                    <Animatable.View
                        animation={isvalidFormAnimation ? "shake" : undefined}
                        onAnimationEnd={() => this.setState({ isvalidFormAnimation: false })}
                        duration={1000}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "80%",
                            shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                        }}>
                        <Button
                            disabled={isLoading}
                            onPress={() => this._validateForm()}
                            iconRight style={{
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: colorsPalette.primaryColor
                            }}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor }}>Continue</Text>
                            {isLoading ? <Spinner color={isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>

                {/* NAME OF CONTEST */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalNameOfContest}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(7) }}>Company Name</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    nameOfContest
                                        ? this.setState({ visibleModalNameOfContest: false })
                                        : this.setState({ nameOfContest: "", visibleModalNameOfContest: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: nameOfContest ? colorsPalette.primaryColor : colorsPalette.thirdColor
                                    }}>{nameOfContest ? "DONE" : "CANCEL"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* COMPANY NAMEY */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#EC407A" }}>
                                        <Icon type="FontAwesome" name="building-o" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Input
                                        onSubmitEditing={() => nameOfContest ? this.setState({ visibleModalNameOfContest: false }) : Keyboard.dismiss()}
                                        returnKeyType='done'
                                        allowFontScaling={false}
                                        placeholder="Company name"
                                        placeholderTextColor={colorsPalette.gradientGray}
                                        maxLength={20}
                                        autoFocus={true}
                                        value={nameOfContest}
                                        keyboardType="ascii-capable"
                                        selectionColor={colorsPalette.primaryColor}
                                        onChangeText={(value) => this.setState({ nameOfContest: value })} />
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
                                <Title allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(7) }}>Description</Title>
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
                                    onSubmitEditing={() => description ? this.setState({ visibleModalDescription: false }) : Keyboard.dismiss()}
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

                {/* INSTRUCTIONS */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalInstructions}
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
                                        ? this.setState({ visibleModalInstructions: false })
                                        : this.setState({ instructions: "", visibleModalInstructions: false })
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
                                    onSubmitEditing={() => instructions ? this.setState({ visibleModalInstructions: false }) : Keyboard.dismiss()}
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

                {/* PICTURE */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={VisibleModalPicture}>
                    <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: colorsPalette.transparent, borderBottomColor: colorsPalette.transparent }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent
                                onPress={() => { this.setState({ VisibleModalPicture: false, picture: { name: "", type: "", localUrl: "" } }) }}>
                                <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                <Text allowFontScaling={false} style={{ left: 5, color: colorsPalette.primaryColor, fontSize: wp(4) }}>{picture.name ? "DELETE" : "BACK"}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button
                                disabled={picture.name ? false : true}
                                transparent
                                onPress={() => { this.setState({ VisibleModalPicture: false }) }}>
                                <Text allowFontScaling={false} style={{ color: picture.name ? colorsPalette.primaryColor : colorsPalette.opaqueWhite, fontSize: wp(4) }}>OK</Text>
                            </Button>
                        </Right>
                    </Header>
                    <Grid>
                        <Row size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {picture.name
                                ? <Image style={{ height: "100%", width: "100%" }} source={{ uri: picture.localUrl }} />
                                : <Ionicons name="ios-images" style={{ fontSize: wp(50), color: colorsPalette.opaqueWhite }} />}
                        </Row>
                        <Row size={30} style={{ flexDirection: 'column' }}>
                            <Button
                                onPress={() => this._useLibraryHandler('Images')}
                                transparent
                                style={{
                                    top: 10,
                                    backgroundColor: colorsPalette.primaryColor,
                                    borderRadius: 10, width: "80%", alignSelf: 'center', justifyContent: 'center'
                                }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: colorsPalette.secondaryColor, letterSpacing: 3 }}>{picture.name ? `CHANGE IMAGEN` : `SELECT IMAGEN`}</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Modal>

                {/* VIDEO */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visibleModalVideo}>
                    <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: colorsPalette.transparent, borderBottomColor: colorsPalette.transparent }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent
                                onPress={() => { this.setState({ visibleModalVideo: false, video: { name: "", type: "", localUrl: "" } }) }}>
                                <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                <Text allowFontScaling={false} style={{ left: 5, color: colorsPalette.primaryColor, fontSize: wp(4) }}>{picture.name ? "DELETE" : "BACK"}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button
                                disabled={video.name ? false : true}
                                transparent
                                onPress={() => { this.setState({ visibleModalVideo: false }) }}>
                                <Text allowFontScaling={false} style={{ color: video.name ? colorsPalette.primaryColor : colorsPalette.opaqueWhite, fontSize: wp(4) }}>OK</Text>
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
                                : <Ionicons name="ios-videocam" style={{ fontSize: wp(50), color: colorsPalette.opaqueWhite }} />}
                        </Row>
                        <Row size={30} style={{ flexDirection: 'column' }}>
                            <Button
                                onPress={() => this._useLibraryHandler('Videos')}
                                transparent
                                style={{
                                    top: 10,
                                    backgroundColor: colorsPalette.primaryColor,
                                    borderRadius: 10, width: "80%", alignSelf: 'center', justifyContent: 'center'
                                }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: colorsPalette.secondaryColor, letterSpacing: 3 }}>{video.name ? `CHANGE VIDEO` : `SELECT VIDEO`}</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Modal>

            </Container>
        );
    }
}