import React, { Component } from 'react';
import { Dimensions, Alert, Modal, Platform, Image, Keyboard } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Item, Input, Spinner } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import truncate from 'lodash/truncate'

// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

// Icons
import { Ionicons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'

// Colors
import { colorsPalette } from '../../../global/static/colors'

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

        // Modal
        visibleModalName: false,
        visibleModalDescription: false,
        VisibleModalPicture: false,
        visibleModalVideo: false
    }

    // Validar formulario
    _validateForm = () => {
        const { name, description, picture } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            name
                ? description
                    ? picture.name
                        ? this._submit()
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong picture" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid description" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid name prize" } } })
        }, 500);
    }

    // Abrir la libreria de imagenes
    _useLibraryHandler = async (action) => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: action })
        if (!result.cancelled) { this._getNameOfLocalUrlImage(result.uri) }
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

    // Preguntar al usuario por los permisos para abrir la libreria de imagenes y videos
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    // Send data to AWS
    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms, userData } = this.props
        const { prizes, name, description, picture } = this.state
        prizes.push({ name, description, picture, prizeId: '_' + Math.random().toString(36).substr(2, 9) })
        try {
            Alert.alert(
                `Hey ${userData.name}`,
                'Would you like to create another prize?',
                [
                    {
                        text: 'No, continue', onPress: () => {
                            _dataFromForms({ prizes })
                            _indexChangeSwiper(1);
                            this.setState({
                                isLoading: false,
                                name: "",
                                description: "",
                                picture: { name: "", type: "", localUrl: "" },
                            })
                        }
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.setState({
                                isLoading: false,
                                name: "",
                                description: "",
                                picture: { name: "", type: "", localUrl: "" },
                            })
                        }
                    },
                ],
                { cancelable: false },
            )
        } catch (error) {
            console.log(error)
        }
    }

    _toSummary = () => {
        const { name, description, picture } = this.state
        const { _indexChangeSwiper } = this.props
        name || description || picture.localUrl
            ? this._validateForm()
            : _indexChangeSwiper(1);
    }

    render() {
        const {
            isvalidFormAnimation,
            isLoading,
            messageFlash,
            prizes,

            // Input
            name,
            description,
            picture,

            // Modal
            visibleModalName,
            visibleModalDescription,
            VisibleModalPicture,
        } = this.state
        const { _indexChangeSwiper } = this.props
        return (
            <Container>
                <GadrientsAuth />
                <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                <Header transparent>
                    <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => _indexChangeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor }} />
                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontSize: wp(4) }}>About The Contest</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontSize: wp(6) }}>Prizes</Title>
                    </Left>
                </Header>

                {/* Forms */}
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(3), color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, textAlign: 'left' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), fontWeight: 'bold', color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor }}>Next!</Text> {'\n'}We reward your contest participants for you with our point system and redemption center but if you want to add some special give aways for top performers it can increase your results!</Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: colorsPalette.secondaryColor, width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 0 }, shadowOpacity: 1, top: -3 }}>
                            <Content contentContainerStyle={{ paddingTop: 10 }}>
                                <List>
                                    {/* NAME PRIZE */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalName: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#009688" }}>
                                                <Entypo style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="star" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Name of prize</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: name ? colorsPalette.darkFont : colorsPalette.gradientGray }} >{name ? truncate(name, { length: 15, separator: "..." }) : 'Not completed'}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Terms</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: description ? colorsPalette.darkFont : colorsPalette.gradientGray }} >{description ? _.truncate(description, { separator: "...", length: 20 }) : "Not completed"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* PICTURE */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ VisibleModalPicture: true })} last>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#4DB6AC" }}>
                                                <FontAwesome style={{ fontSize: wp(4.5), color: colorsPalette.secondaryColor }} active name="picture-o" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Picture</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: picture.name ? colorsPalette.darkFont : colorsPalette.gradientGray }} >{picture.name ? "Already selected" : "No select"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                </List>
                            </Content>
                        </View>
                        <Text allowFontScaling={false} style={{ color: colorsPalette.errColor, fontSize: wp(3.5), top: 10 }}>
                            {messageFlash.cognito && messageFlash.cognito.message}
                        </Text>
                    </Row>
                </Grid>

                {/* Validar formulario */}
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
                            onPress={() => prizes.length ? this._toSummary() : this._validateForm()}
                            iconRight style={{
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: colorsPalette.primaryColor
                            }}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', letterSpacing: 2 }}>Create</Text>
                            {isLoading ? <Spinner color={colorsPalette.secondaryColor} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>

                {/* NAME OF PRIZE */}
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
                                <Title allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(7) }}>Name of prize</Title>
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
                                        color: name ? colorsPalette.primaryColor : colorsPalette.thirdColor
                                    }}>{name ? "DONE" : "CANCEL"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* COMPANY NAME */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#009688" }}>
                                        <Entypo style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="star" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Input
                                        onSubmitEditing={() => name ? this.setState({ visibleModalName: false }) : Keyboard.dismiss()}
                                        returnKeyType='done'
                                        allowFontScaling={false}
                                        placeholder="Company name"
                                        placeholderTextColor={colorsPalette.gradientGray}
                                        maxLength={20}
                                        autoFocus={true}
                                        value={name}
                                        keyboardType="ascii-capable"
                                        selectionColor={colorsPalette.primaryColor}
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
                                <Title allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(7) }}>Terms</Title>
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
                                style={{ width: "90%", top: 15, alignSelf: "center", borderBottomColor: colorsPalette.transparent }}>
                                <Input
                                    allowFontScaling={false}
                                    multiline
                                    numberOfLines={3}
                                    placeholderTextColor={colorsPalette.gradientGray}
                                    autoFocus={true}
                                    value={description}
                                    keyboardType="ascii-capable"
                                    selectionColor={colorsPalette.primaryColor}
                                    style={{ padding: 5, maxHeight: 220 }}
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
                    <Header transparent style={{ height: Platform.OS === 'ios' ? 70 : 50 }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent
                                onPress={() => { this.setState({ VisibleModalPicture: false, picture: { name: "", type: "", localUrl: "" } }) }}>
                                <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                <Text allowFontScaling={false} style={{ left: 5, color: colorsPalette.primaryColor, fontSize: wp(4) }}>{picture.name ? "Delete" : "Back"}</Text>
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
            </Container>
        );
    }
}