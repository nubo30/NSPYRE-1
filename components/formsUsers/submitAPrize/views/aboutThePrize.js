import React, { Component } from 'react';
import { Dimensions, Modal, Toast, Platform, Image, Keyboard } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Picker, Item, Input, Spinner, CheckBox } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import { isAscii } from 'validator'
import Swiper from 'react-native-swiper'
import numeraljs from 'numeraljs';

// Gradients
import { GadrientsAuth } from '../../../Global/gradients/index'
import { MyStatusBar } from '../../../Global/statusBar/index'

// Icons
import { Entypo, FontAwesome, AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class AboutTheContest extends Component {
    state = {
        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },
        typeContentInstructionsActionVideos: false,
        typeContentInstructionsActionMemes: false,
        typeContentInstructionsValue: '',
        indexSwiperInstructions: 0,
        keyboardDidShowAction: false,


        // Data
        category: 'Not specified',
        price: 0,
        nameOfPrize: "",
        description: "",
        instructions: "",
        socialMediaHandle: {
            facebook: "",
            twitter: "",
            instagram: "",
            snapchat: ""
        },
        picture: { name: "", type: "", localUrl: "" },
        video: { name: "", type: "", localUrl: "" },

        // Modal
        visibleModalPrice: false,
        visibleModalNameOfPrize: false,
        visibleModalDescription: false,
        visibleModalInstructions: false,
        visibleModalSocialMediaHandle: false,
        VisibleModalPicture: false,
        visibleModalVideo: false
    }

    // Picker
    _onValueChangeCategory = (value) => { this.setState({ category: value }) }
    _onValueChangePrice = (value) => { this.setState({ price: value }) }
    _visibleModalSocialMediaHandle = (visible) => this.setState({ visibleModalSocialMediaHandle: visible })


    // Validar formulario
    _validateForm = () => {
        const { category, nameOfPrize, description, instructions, socialMediaHandle, picture, video } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            category !== 'Not specified'
                ? isAscii(nameOfPrize)
                    ? description
                        ? instructions
                            ? socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.twitter || socialMediaHandle.snapchat
                                ? picture.name
                                    ? video.name
                                        ? this._submit()
                                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong video" } } })
                                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Wrong picture" } } })
                                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid socials medias" } } })
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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/prize/pictures/owner/${name}`
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
                url: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/prize/videos/owner/${name}`
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
        const { category, nameOfPrize, price, description, instructions, socialMediaHandle, picture, video, typeContentInstructionsValue } = this.state
        const data = { category, general: { nameOfPrize, price, description, instructions: { typeContentInstructionsValue, msg: instructions }, socialMediaHandle, picture, video } }
        try {
            await _dataFromForms(data)
            this.setState({ isLoading: false })
            await _indexChangeSwiper(1)
        } catch (error) {
            this.setState({ isLoading: false })
            Toast.show({
                text: "Oops! The prize could not be created, try again.",
                buttonText: "Okay",
                type: "danger",
                position: 'top',
                duration: 3000
            })
        }
    }

    _swiperInstructions = (value) => {
        if (value === 'memes' || value === 'videos') {
            this.swiperInstructions.scrollBy(1)
        } else {
            this.swiperInstructions.scrollBy(-1);
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => { this.setState({ keyboardDidShowAction: true }) }

    _keyboardDidHide = () => { this.setState({ keyboardDidShowAction: false }) }


    componentWillReceiveProps(nextProps) {
        if (nextProps.wantSuggestedFields) {
            const { dataFromThePreviousSubmitPrize } = nextProps
            this.setState({
                description: dataFromThePreviousSubmitPrize.general.description,
                typeContentInstructionsValue: dataFromThePreviousSubmitPrize.general.instructions.typeContentInstructionsValue,
                instructions: dataFromThePreviousSubmitPrize.general.instructions.msg,
                socialMediaHandle: {
                    facebook: dataFromThePreviousSubmitPrize.general.socialMediaHandle.facebook,
                    twitter: dataFromThePreviousSubmitPrize.general.socialMediaHandle.twitter,
                    instagram: dataFromThePreviousSubmitPrize.general.socialMediaHandle.instagram,
                    snapchat: dataFromThePreviousSubmitPrize.general.socialMediaHandle.snapchat
                },
            })
        }
    }

    render() {
        const {
            // DATA
            category,
            nameOfPrize,
            description,
            instructions,
            picture,
            video,
            socialMediaHandle,
            price,

            // Actions
            typeContentInstructionsActionVideos,
            typeContentInstructionsActionMemes,
            indexSwiperInstructions,

            isvalidFormAnimation,
            isLoading,
            messageFlash,

            // Modal
            visibleModalPrice,
            visibleModalNameOfPrize,
            visibleModalDescription,
            visibleModalInstructions,
            visibleModalSocialMediaHandle,
            VisibleModalPicture,
            visibleModalVideo
        } = this.state
        const { _indexChangeSwiper } = this.props
        return (
            <Container style={{ top: -7 }}>
                <GadrientsAuth />
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                <Header transparent>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => _indexChangeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: isLoading ? "#EEEEEE" : "#FFF" }} />
                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(4) }}>About You</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(6) }}>About The Prize</Title>
                    </Left>
                </Header>
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: isLoading ? "#EEEEEE" : "#FFF", fontWeight: '100' }}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: wp(11), color: isLoading ? "#EEEEEE" : "#FFF" }}>Great! {'\n'}</Text> Now tell us about the prize you want to build!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center' }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content contentContainerStyle={{ paddingTop: 10 }}>
                                <List>

                                    {/* CATEGORY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#007AFF" }}>
                                                <AntDesign style={{ fontSize: wp(5), color: '#FFF' }} active name="select1" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Category</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{_.upperFirst(_.lowerCase(category))}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute', width: '100%' }}>
                                                <Picker
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE CATEGORY"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    selectedValue={category}
                                                    onValueChange={(value) => this._onValueChangeCategory(value)}>
                                                    <Picker.Item label="Apparel Clothing" value="APPAREL_CLOTHING" />
                                                    <Picker.Item label="Trips" value="TRIPS" />
                                                    <Picker.Item label="Cryptocurrency" value="CRYPTOCURRENCY" />
                                                    <Picker.Item label="Shoes" value="SHOES" />
                                                    <Picker.Item label="Electronics" value="ELECTRONICS" />
                                                    <Picker.Item label="Gaming" value="GAMING" />
                                                    <Picker.Item label="Tickets" value="TICKETS" />
                                                    <Picker.Item label="Amazon Products" value="AMAZON" />
                                                    <Picker.Item label="Cars" value="CARS" />
                                                    <Picker.Item label="Miles" value="MILES" />
                                                    <Picker.Item label="Coupon Codes" value="COUPON_CODES" />
                                                    <Picker.Item label="Hats" value="HATS" />
                                                    <Picker.Item label="Others" value="OTHERS" />
                                                </Picker>
                                            </View>}
                                    </ListItem>

                                    {/* PRICE */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalPrice: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#43A047" }}>
                                                <MaterialIcons style={{ fontSize: wp(6), color: '#FFF', left: 1 }} active name="attach-money" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Price</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{price !== 0 ? numeraljs(price).format('0,0') : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* NAME OF PRIZE */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalNameOfPrize: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                                <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Name of prize</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{nameOfPrize ? nameOfPrize : "Not specified"}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Description</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{_.truncate(description ? description : "Not specified", { separator: '...', length: 20 })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* INSTRUCTION */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalInstructions: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#EC407A" }}>
                                                <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF', left: 1 }} active name="warning" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Instructions</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{_.truncate(instructions ? instructions : "Not specified", { separator: '...', length: 20 })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* USER SOCIAL MEDIA HANDLE */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalSocialMediaHandle(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FF9800" }}>
                                                <Entypo style={{ fontSize: wp(6), color: '#FFF', left: 1, top: 1 }} active name="network" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Socials medias</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat ? "Specified" : "Not specified"}</Text>
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
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{picture.name ? "Already selected" : "No select"}</Text>
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
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{video.name ? "Already selected" : "No select"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                </List>
                            </Content>
                        </View>
                    </Row>
                    <Text allowFontScaling={false} style={{ color: '#F44336', fontSize: wp(4), top: -7, alignSelf: 'center' }}>
                        {messageFlash.cognito && messageFlash.cognito.message}
                    </Text>
                </Grid>

                {/* Validate Form */}
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
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#EEEEEE" : "#FFF" }}>Continue</Text>
                            {isLoading ? <Spinner color={isLoading ? "#EEEEEE" : "#FFF"} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>

                {/* PRICE */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalPrice}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Price</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    price
                                        ? this.setState({ visibleModalPrice: false })
                                        : this.setState({ price: "", visibleModalPrice: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: price ? "#E91E63" : "#3333"
                                    }}>{
                                            price ? "Done" : "Cancel"
                                        }</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* COMPANY NAMEY */}
                            <Item
                                error={price !== 0 ? false : true}
                                success={price !== 0 ? true : false}
                                style={{ width: "90%", top: 15, alignSelf: "center" }}>
                                <Input
                                    onSubmitEditing={() => price ? this.setState({ visibleModalPrice: false }) : Keyboard.dismiss()}
                                    returnKeyType='done'
                                    placeholder="0,000.00"
                                    placeholderTextColor="#EEEE"
                                    autoFocus={true}
                                    value={numeraljs(price).format('0,0')}
                                    keyboardType="numeric"
                                    selectionColor="#E91E63"
                                    onChangeText={(value) => this.setState({ price: value })} />
                                <Text allowFontScaling={false} style={{ fontSize: wp(6), color: price !== 0 ? '#388E3C' : '#3333' }}>$</Text>
                            </Item>
                        </Content>
                    </Container>
                </Modal>

                {/* NAME OF PRIZE */}
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
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Description</Title>
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

                {/* INSTRUCTIONS */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalInstructions}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                        <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Button
                                onPress={() => indexSwiperInstructions ? this._swiperInstructions(null) : this.setState({ visibleModalInstructions: false, typeContentInstructionsActionVideos: false, typeContentInstructionsActionMemes: false, typeContentInstructionsValue: '' })}
                                transparent>
                                <Icon name='arrow-back' style={{ color: "#E91E63" }} />
                                <Text allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(4) }}>Back</Text>
                            </Button>
                            <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(5) }}>Instructions</Title>
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
                                    color: instructions ? "#E91E63" : "#3333"
                                }}>{instructions ? "Done" : "Cancel"}</Text>
                            </Button>
                        </Right>
                    </Header>
                    <Swiper
                        scrollEnabled={false}
                        onIndexChanged={(index) => this.setState({ indexSwiperInstructions: index })}
                        ref={(swiperInstructions) => this.swiperInstructions = swiperInstructions}
                        loop={false} showsButtons={false} showsPagination={false}>
                        <View style={{ flex: 1 }}>
                            <Text allowFontScaling={false} style={{ padding: 10, fontSize: wp(5), color: '#333' }}>
                                To continue you must choose between these two options, what do you want your participants to do?
                                </Text>
                            <ListItem style={{ height: 70 }}
                                onPress={() => {
                                    this._swiperInstructions('videos');
                                    this.setState({
                                        typeContentInstructionsActionVideos: !typeContentInstructionsActionVideos,
                                        typeContentInstructionsActionMemes: false,
                                        typeContentInstructionsValue: 'videos'
                                    })
                                }}>
                                <CheckBox
                                    checked={typeContentInstructionsActionVideos}
                                    onPress={() => {
                                        this._swiperInstructions('videos')
                                        this.setState({
                                            typeContentInstructionsActionVideos: !typeContentInstructionsActionVideos,
                                            typeContentInstructionsActionMemes: false,
                                            typeContentInstructionsValue: 'videos'
                                        })
                                    }}
                                    color="#E91E63" />
                                <Body>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(6), color: '#3333' }}>Upload videos</Text>
                                </Body>
                            </ListItem>
                            <ListItem style={{ height: 70 }} onPress={() => {
                                this._swiperInstructions('memes');
                                this.setState({
                                    typeContentInstructionsActionVideos: false,
                                    typeContentInstructionsActionMemes: !typeContentInstructionsActionMemes,
                                    typeContentInstructionsValue: 'memes'
                                })
                            }}>
                                <CheckBox
                                    checked={typeContentInstructionsActionMemes}
                                    onPress={() => {
                                        this._swiperInstructions('memes');
                                        this.setState({
                                            typeContentInstructionsActionVideos: false,
                                            typeContentInstructionsActionMemes: !typeContentInstructionsActionMemes,
                                            typeContentInstructionsValue: 'memes'
                                        })
                                    }}
                                    color="#E91E63" />
                                <Body>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(6), color: '#3333' }}>Upload memes</Text>
                                </Body>
                            </ListItem>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text allowFontScaling={false} style={{ padding: 10, fontSize: wp(4), color: '#333' }}>
                                Target the content you want your participants to share, for example: "Share a video, the best video will be the winner of the prize!"
                               </Text>
                            <Item
                                error={instructions ? false : true}
                                success={instructions ? true : false}
                                style={{ width: "90%", alignSelf: "center" }}>
                                <Input
                                    onSubmitEditing={() => instructions ? this.setState({ visibleModalInstructions: false }) : Keyboard.dismiss()}
                                    returnKeyType='done'
                                    multiline
                                    autoCorrect={false}
                                    numberOfLines={3}
                                    placeholder="Instructions"
                                    placeholderTextColor="#EEEE"
                                    value={instructions}
                                    keyboardType="ascii-capable"
                                    selectionColor="#E91E63"
                                    style={{ padding: 5, maxHeight: 200 }}
                                    onChangeText={(value) => this.setState({ instructions: value })} />
                            </Item>
                        </View>
                    </Swiper>
                </Modal>

                {/* COMPANY SOCIAL MEDIA HANDLE */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalSocialMediaHandle}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Social Media Handle</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat
                                        ? this.setState({ visibleModalSocialMediaHandle: false })
                                        : this.setState({ companyName: "", visibleModalSocialMediaHandle: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color:
                                            socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat
                                                ? "#E91E63" : "#3333"
                                    }}>{
                                            socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat
                                                ? "Done" : "Cancel"
                                        }</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>

                            {/* FACEBOOK */}
                            <ListItem icon style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#3b5998" }}>
                                        <Feather active name="facebook" style={{ color: '#FFF', fontSize: wp(5.5) }} />
                                    </Button>
                                </Left>
                                <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                    <Item>
                                        <Input
                                            onSubmitEditing={() => socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat ? this.setState({ visibleModalSocialMediaHandle: false }) : Keyboard.dismiss()}
                                            returnKeyType='done'
                                            autoFocus={true}
                                            placeholder="Facebook"
                                            placeholderTextColor="#EEEE"
                                            maxLength={512}
                                            value={socialMediaHandle.facebook}
                                            keyboardType="ascii-capable"
                                            selectionColor="#E91E63"
                                            onChangeText={(value) => this.setState({ socialMediaHandle: { ...socialMediaHandle, facebook: value } })}
                                        />
                                    </Item>
                                </Body>
                                <Right style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }} />
                            </ListItem>

                            {/* TWITTER */}
                            <ListItem icon style={{ borderBottomColor: 'rgba(0,0,0,0.0)', top: 5 }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#00acee" }}>
                                        <Entypo active name="twitter" style={{ color: '#FFF', fontSize: wp(5.5), top: 2 }} />
                                    </Button>
                                </Left>
                                <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                    <Item>
                                        <Input
                                            onSubmitEditing={() => socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat ? this.setState({ visibleModalSocialMediaHandle: false }) : Keyboard.dismiss()}
                                            returnKeyType='done'
                                            placeholder="Twitter"
                                            placeholderTextColor="#EEEE"
                                            maxLength={512}
                                            value={socialMediaHandle.twitter}
                                            keyboardType="ascii-capable"
                                            selectionColor="#E91E63"
                                            onChangeText={(value) => this.setState({ socialMediaHandle: { ...socialMediaHandle, twitter: value } })}
                                        />
                                    </Item>
                                </Body>
                                <Right style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }} />
                            </ListItem>

                            {/* INSTAGRAM */}
                            <ListItem icon style={{ borderBottomColor: 'rgba(0,0,0,0.0)', top: 10 }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#E1306C" }}>
                                        <AntDesign active name="instagram" style={{ color: '#FFF', fontSize: wp(5.5), top: 1, left: 0.5 }} />
                                    </Button>
                                </Left>
                                <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                    <Item>
                                        <Input
                                            onSubmitEditing={() => socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat ? this.setState({ visibleModalSocialMediaHandle: false }) : Keyboard.dismiss()}
                                            returnKeyType='done'
                                            placeholder="Instagram"
                                            placeholderTextColor="#EEEE"
                                            maxLength={512}
                                            value={socialMediaHandle.instagram}
                                            keyboardType="ascii-capable"
                                            selectionColor="#E91E63"
                                            onChangeText={(value) => this.setState({ socialMediaHandle: { ...socialMediaHandle, instagram: value } })}
                                        />
                                    </Item>
                                </Body>
                                <Right style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }} />
                            </ListItem>

                            {/* SNACPCHAT */}
                            <ListItem icon style={{ borderBottomColor: 'rgba(0,0,0,0.0)', top: 15 }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#FFEA00" }}>
                                        <Ionicons active name="logo-snapchat" style={{ color: '#FFF', fontSize: wp(5.5), top: 1, left: 0.5 }} />
                                    </Button>
                                </Left>
                                <Body style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                    <Item>
                                        <Input
                                            onSubmitEditing={() => socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat ? this.setState({ visibleModalSocialMediaHandle: false }) : Keyboard.dismiss()}
                                            returnKeyType='done'
                                            placeholder="Snapchat"
                                            placeholderTextColor="#EEEE"
                                            maxLength={512}
                                            value={socialMediaHandle.snapchat}
                                            keyboardType="ascii-capable"
                                            selectionColor="#E91E63"
                                            onChangeText={(value) => this.setState({ socialMediaHandle: { ...socialMediaHandle, snapchat: value } })}
                                        />
                                    </Item>
                                </Body>
                                <Right style={{ borderBottomColor: 'rgba(0,0,0,0.0)' }} />
                            </ListItem>

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
                                <Text allowFontScaling={false} style={{ color: picture.name ? "#D81B60" : "#EEEEEE", fontSize: wp(4) }}>Ok</Text>
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
                                <Text allowFontScaling={false} style={{ left: 5, color: "#D81B60", fontSize: wp(4) }}>{picture.name ? "Delete" : "Back"}</Text>
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