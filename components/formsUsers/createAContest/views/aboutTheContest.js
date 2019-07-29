import React, { Component } from 'react';
import { Dimensions, Alert, Modal, KeyboardAvoidingView, Platform, Image } from 'react-native'
import { ImagePicker, Permissions, Video } from 'expo';
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Picker, Item, Input, Spinner } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'lodash'
import { isAscii } from 'validator'

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

        // Data
        category: 'NO_SELECT',
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
        category !== 'NO_SELECT'
            ? isAscii(nameOfContest)
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
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                <Header style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => _indexChangeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: isLoading ? "#BDBDBD" : "#FFF" }} />
                            <Text style={{ color: isLoading ? "#BDBDBD" : "#FFF" }}>About You</Text>
                        </Button>
                        <Title style={{ color: isLoading ? "#BDBDBD" : "#FFF", fontSize: wp(7) }}>About The Contest</Title>
                    </Left>
                </Header>
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text style={{ fontSize: wp(4.5), color: isLoading ? "#BDBDBD" : "#FFF", fontWeight: '100' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: wp(11), color: isLoading ? "#BDBDBD" : "#FFF" }}>Great! {'\n'}</Text> Now tell us about the contest you want to build!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center' }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content contentContainerStyle={{ paddingTop: 10 }}>
                                <List>

                                    {/* CATEGORY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#007AFF" }}>
                                                <AntDesign style={{ fontSize: wp(5), color: '#FFF' }} active name="select1" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Category</Text>
                                            {isLoading ? null :
                                                <Picker
                                                    style={{ position: 'absolute', top: -30 }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE CATEGORY"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
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
                                                    <Picker.Item label="No select" value="NO_SELECT" />
                                                </Picker>}
                                        </Body>
                                        <Right>
                                            <Text>{_.upperFirst(_.lowerCase(_.replace(category, new RegExp("_", "g"), " ")))}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* NAME CONTEST */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalNameOfContest: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#009688" }}>
                                                <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Name Of Contest</Text>
                                        </Body>
                                        <Right>
                                            <Text>{nameOfContest ? nameOfContest : "Not specified"}</Text>
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
                                            <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Description</Text>
                                        </Body>
                                        <Right>
                                            <Text>{_.truncate(description ? description : "Not specified", { separator: '...', length: 20 })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* INSTRUCTION */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalInstructions: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#EC407A" }}>
                                                <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF', left: 1 }} active name="warning" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Instructions</Text>
                                        </Body>
                                        <Right>
                                            <Text>{_.truncate(instructions ? instructions : "Not specified", { separator: '...', length: 20 })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* PICTURE */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ VisibleModalPicture: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#4DB6AC" }}>
                                                <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF' }} active name="picture-o" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Picture</Text>
                                        </Body>
                                        <Right>
                                            <Text>{picture.name ? "Already selected" : "No select"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* VIDEO */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalVideo: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FBC02D" }}>
                                                <Feather style={{ fontSize: wp(5), color: '#FFF' }} active name="video" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Video</Text>
                                        </Body>
                                        <Right>
                                            <Text>{video.name ? "Already selected" : "No select"}</Text>
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
                                        <Text style={{ left: 5, color: "#E0E0E0" }}>Why we need this?</Text>
                                        <Icon name="alert" style={{ right: 5, color: "#E0E0E0" }} />
                                    </Button>
                                </List>
                            </Content>
                        </View>
                    </Row>
                    <Text style={{ color: '#F44336', fontSize: wp(4), top: -7, alignSelf: 'center' }}>
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
                            onLongPress={() => this.setState({ isLoading: false })}
                            onPressIn={() => this.setState({ isLoading: true })}
                            onPress={() => this._validateForm()}
                            iconRight style={{
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: '#E91E63'
                            }}>
                            <Text style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#BDBDBD" : "#FFF" }}>Continue</Text>
                            {isLoading ? <Spinner color={isLoading ? "#BDBDBD" : "#FFF"} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>

                {/* LOCATION MODAL */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalNameOfContest}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'}
                        enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null}
                        style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Title style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Name Of Contest</Title>
                        </Header>

                        {/* NAME OF CONTEST */}
                        <Item
                            error={isAscii(nameOfContest) ? false : true}
                            success={isAscii(nameOfContest) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                placeholder="Name Of Contest"
                                placeholderTextColor="#EEEE"
                                maxLength={20}
                                autoFocus={true}
                                value={nameOfContest}
                                keyboardType="ascii-capable"
                                selectionColor="#E91E63"
                                style={{ fontSize: wp(7) }}
                                onChangeText={(value) => this.setState({ nameOfContest: value })} />
                        </Item>

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => { this.setState({ visibleModalNameOfContest: false, nameOfContest: '' }) }}
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
                                    onPress={nameOfContest ? () => this.setState({ visibleModalNameOfContest: false }) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(nameOfContest) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>

                {/* DESCRIPTION */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalDescription}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'} enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null}
                        style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Title style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Description</Title>
                        </Header>

                        {/* NAME OF CONTEST */}
                        <Item
                            error={isAscii(description) ? false : true}
                            success={isAscii(description) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                multiline
                                numberOfLines={3}
                                placeholder="Description"
                                placeholderTextColor="#EEEE"
                                autoFocus={true}
                                value={description}
                                keyboardType="ascii-capable"
                                selectionColor="#E91E63"
                                style={{ fontSize: wp(6), padding: 5, maxHeight: 170 }}
                                onChangeText={(value) => this.setState({ description: value })} />
                        </Item>

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => { this.setState({ visibleModalDescription: false, description: '' }) }}
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
                                    onPress={description ? () => this.setState({ visibleModalDescription: false }) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(description) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>

                {/* DESCRIPTION */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalInstructions}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'} enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null}
                        style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Title style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Instructions</Title>
                        </Header>

                        {/* NAME OF CONTEST */}
                        <Item
                            error={isAscii(instructions) ? false : true}
                            success={isAscii(instructions) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                multiline
                                numberOfLines={3}
                                placeholder="Instructions"
                                placeholderTextColor="#EEEE"
                                autoFocus={true}
                                value={instructions}
                                keyboardType="ascii-capable"
                                selectionColor="#E91E63"
                                style={{ fontSize: wp(6), padding: 5, maxHeight: 170 }}
                                onChangeText={(value) => this.setState({ instructions: value })} />
                        </Item>

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => { this.setState({ visibleModalInstructions: false, instructions: '' }) }}
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
                                    onPress={instructions ? () => this.setState({ visibleModalInstructions: false }) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(instructions) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
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
                                <Text style={{ left: 5, color: "#D81B60" }}>{picture.name ? "DELETE" : "BACK"}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button
                                disabled={picture.name ? false : true}
                                transparent
                                onPress={() => { this.setState({ VisibleModalPicture: false }) }}>
                                <Text style={{ color: picture.name ? "#D81B60" : "#BDBDBD", fontSize: wp(5) }}>OK</Text>
                            </Button>
                        </Right>
                    </Header>
                    <Grid>
                        <Row size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {picture.name
                                ? <Image style={{ height: "100%", width: "100%" }} source={{ uri: picture.localUrl }} />
                                : <Ionicons name="ios-images" style={{ fontSize: wp(50), color: "#BDBDBD" }} />}
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
                                <Text style={{ fontSize: wp(4.5), color: "#fff", letterSpacing: 3 }}>{picture.name ? `CHANGE IMAGEN` : `SELECT IMAGEN`}</Text>
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
                                <Text style={{ left: 5, color: "#D81B60" }}>{picture.name ? "DELETE" : "BACK"}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button
                                disabled={video.name ? false : true}
                                transparent
                                onPress={() => { this.setState({ visibleModalVideo: false }) }}>
                                <Text style={{ color: video.name ? "#D81B60" : "#BDBDBD", fontSize: wp(5) }}>OK</Text>
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
                                : <Ionicons name="ios-videocam" style={{ fontSize: wp(50), color: "#BDBDBD" }} />}
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
                                <Text style={{ fontSize: wp(4.5), color: "#fff", letterSpacing: 3 }}>{video.name ? `CHANGE VIDEO` : `SELECT VIDEO`}</Text>
                            </Button>
                        </Row>
                    </Grid>
                </Modal>

            </Container>
        );
    }
}