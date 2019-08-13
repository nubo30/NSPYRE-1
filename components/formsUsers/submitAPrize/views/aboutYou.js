import React, { Component } from 'react';
import { Dimensions, Alert, Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Input, Item, Spinner, Separator, Picker } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'lodash'
import { isAscii, normalizeEmail } from 'validator'
import moment from 'moment'
import axios from 'axios'

// Gradients
import { GadrientsAuth } from '../../../Global/gradients/index'
import { MyStatusBar } from '../../../Global/statusBar/index'

// Icons
import { Ionicons, Foundation, Entypo, FontAwesome, Feather, AntDesign } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutYou extends Component {
    state = {
        // Inputs
        businessLocation: {
            street: "",
            state: "",
            city: "Not specified",
            country: "Not specified"
        },
        socialMediaHandle: {
            facebook: "",
            twitter: "",
            instagram: "",
            snapchat: ""
        },
        companyName: "",

        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },

        // Modal
        visibleModalBusinessLocation: false,
        visibleModalCompanyname: false,
        visibleModalSocialMediaHandle: false,

        // Data API
        listCountries: [],
        listCities: []
    }


    componentDidMount() {
        this._getCountry()
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.businessLocation.country !== this.state.businessLocation.country) {
            this._getCity(nextState.businessLocation.country)
        }
    }

    _getCountry = async () => {
        const { data } = await axios.get('http://battuta.medunes.net/api/country/all/?key=f011d84c6f4d9ff4ead6bf9d380ecef8')
        this.setState({ listCountries: data })
    }

    _getCity = async (country) => {
        const { listCountries } = this.state
        let filterCountries = []; filterCountries = listCountries.filter((item) => { return item.name.indexOf(country) !== -1 })
        if (filterCountries.length !== 0) {
            const { data } = await axios.get(`http://battuta.medunes.net/api/region/${filterCountries[0].code}/all/?key=f011d84c6f4d9ff4ead6bf9d380ecef8`)
            this.setState({ listCities: data })
        }
    }


    // Modal
    _visibleModalBusinessLocation = (visible) => this.setState({ visibleModalBusinessLocation: visible })
    _visibleModalCompanyname = (visible) => this.setState({ visibleModalCompanyname: visible })
    _visibleModalSocialMediaHandle = (visible) => this.setState({ visibleModalSocialMediaHandle: visible })

    // Send Data to AWS
    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms, userData } = this.props
        const { businessLocation, companyName, socialMediaHandle } = this.state
        const data = { aboutTheCompany: { businessLocation, companyName, socialMediaHandle }, submitPrizeUserId: userData.sub, createdAt: moment().toISOString() }
        try {
            await _dataFromForms(data)
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
            await _indexChangeSwiper(1)
        } catch (error) {
            console.log(error)
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
        }
    }

    _validateForm = () => {
        const { businessLocation, companyName, socialMediaHandle } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            businessLocation.street && businessLocation.city && businessLocation.state && businessLocation.country
                ? isAscii(companyName)
                    ? socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat
                        ? this._submit()
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid comapany social media handles" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid title company" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid business location" } } })
        }, 500);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wantSuggestedFields) {
            const { dataFromThePreviousSubmitPrize } = nextProps
            this.setState({
                businessLocation: {
                    street: dataFromThePreviousSubmitPrize.aboutTheCompany.businessLocation.street,
                    state: dataFromThePreviousSubmitPrize.aboutTheCompany.businessLocation.state,
                    city: dataFromThePreviousSubmitPrize.aboutTheCompany.businessLocation.city,
                    country: dataFromThePreviousSubmitPrize.aboutTheCompany.businessLocation.country
                },
                socialMediaHandle: {
                    facebook: dataFromThePreviousSubmitPrize.aboutTheCompany.socialMediaHandle.facebook,
                    twitter: dataFromThePreviousSubmitPrize.aboutTheCompany.socialMediaHandle.twitter,
                    instagram: dataFromThePreviousSubmitPrize.aboutTheCompany.socialMediaHandle.instagram,
                    snapchat: dataFromThePreviousSubmitPrize.aboutTheCompany.socialMediaHandle.snapchat
                },
                companyName: dataFromThePreviousSubmitPrize.aboutTheCompany.companyName,
            })
        }
    }


    render() {
        const {
            isvalidFormAnimation,
            isLoading,
            messageFlash,

            // Input
            businessLocation,
            companyName,
            socialMediaHandle,

            // modal
            visibleModalBusinessLocation,
            visibleModalCompanyname,
            visibleModalSocialMediaHandle,

            // Data API
            listCountries,
            listCities
        } = this.state
        const { userData, navigation } = this.props
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
                            onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: isLoading ? '#EEEEEE' : '#FFF', }} />
                            <Text style={{ color: isLoading ? "#EEEEEE" : "#FFF" }}>Back</Text>
                        </Button>
                        <Title style={{ color: isLoading ? '#EEEEEE' : '#FFF', fontSize: wp(7) }}>About You</Title>
                    </Left>
                </Header>

                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text style={{ fontSize: wp(4.5), color: isLoading ? '#EEEEEE' : '#FFF', fontWeight: '100' }}>
                            <Text style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Let's get started!</Text> {'\n'}Tell us a little more!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content
                                scrollEnabled={!isLoading}
                                contentContainerStyle={{ paddingTop: 10 }}
                                keyboardShouldPersistTaps={'always'}>

                                <List>

                                    {/* NAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#007AFF" }}>
                                                <Ionicons style={{ fontSize: wp(5), color: '#FFF' }} active name="md-person" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Name</Text>
                                        </Body>
                                        <Right>
                                            <Text>{userData && _.startCase(_.lowerCase(userData.name))}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* LASTNAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                                <Ionicons style={{ fontSize: wp(5), color: '#FFF' }} active name="md-person" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Lastname</Text>
                                        </Body>
                                        <Right>
                                            <Text>{userData && _.startCase(_.lowerCase(userData.middle_name))}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* PHONE */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#F4511E" }}>
                                                <Foundation style={{ fontSize: wp(5.6), color: '#FFF' }} active name="telephone" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Number Phone</Text>
                                        </Body>
                                        <Right>
                                            <Text>{userData && userData.phone_number}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* EMAIL */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#4DB6AC" }}>
                                                <Ionicons style={{ fontSize: wp(5), color: '#FFF' }} active name="md-mail" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Email</Text>
                                        </Body>
                                        <Right>
                                            <Text>{userData.email === undefined ? null : normalizeEmail(userData.email)}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* BUSINESS ADDRESS */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalBusinessLocation(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D" }} onPress={() => this._visibleModalBusinessLocation(true)}>
                                                <Entypo style={{ fontSize: wp(6), color: '#FFF' }} active name="location-pin" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Business location</Text>
                                        </Body>
                                        <Right>
                                            <Text>{businessLocation.street && businessLocation.city && businessLocation.state && businessLocation.country && businessLocation.city && businessLocation.state && businessLocation.country ? "Specified" : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* COMPANY NAME */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalCompanyname(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#EC407A" }}>
                                                <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF', left: 2 }} active name="building" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Company Name</Text>
                                        </Body>
                                        <Right>
                                            <Text>{companyName ? "Specified" : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* COMPANY SOCIAL MEDIA HANDLE */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalSocialMediaHandle(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FF9800" }}>
                                                <Entypo style={{ fontSize: wp(6), color: '#FFF', left: 1, top: 1 }} active name="network" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Company social media handles</Text>
                                        </Body>
                                        <Right>
                                            <Text>{socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat ? "Specified" : "Not specified"}</Text>
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
                        <Text style={{ color: '#F44336', fontSize: wp(4), top: 10 }}>
                            {messageFlash.cognito && messageFlash.cognito.message}
                        </Text>
                    </Row>
                </Grid>

                {/* SUBMIT DATA TO AWS */}
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
                            disabled={isLoading || Object.keys(userData).length === 0}
                            onPress={() => { this._validateForm() }}
                            iconRight style={{
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: '#E91E63'
                            }}>
                            <Text style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#EEEEEE" : "#FFF" }}>Continue</Text>
                            {isLoading ? <Spinner color={isLoading ? "#EEEEEE" : "#FFF"} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>

                {/* BUSSINES LOCATION MODAL */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalBusinessLocation}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'}
                        enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Title style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Location</Title>
                        </Header>

                        {/* LOCATION */}

                        {/* STREET */}
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#90A4AE" }}>
                                    <Icon type="FontAwesome" name="road" />
                                </Button>
                            </Left>
                            <Body>
                                <Input
                                    placeholder="Your street"
                                    placeholderTextColor="#EEEE"
                                    autoFocus={true}
                                    maxLength={512}
                                    value={businessLocation.street}
                                    keyboardType="ascii-capable"
                                    selectionColor="#E91E63"
                                    onChangeText={(value) => this.setState({ businessLocation: { ...businessLocation, street: value } })} />
                            </Body>
                            <Right />
                        </ListItem>

                        {/* STATE */}
                        <ListItem last icon>
                            <Left>
                                <Button style={{ backgroundColor: "#616161" }}>
                                    <Icon type="Foundation" name="map" />
                                </Button>
                            </Left>
                            <Body>
                                <Input
                                    placeholder="Your state"
                                    placeholderTextColor="#EEEE"
                                    maxLength={512}
                                    value={businessLocation.state}
                                    keyboardType="ascii-capable"
                                    selectionColor="#E91E63"
                                    onChangeText={(value) => this.setState({ businessLocation: { ...businessLocation, state: value } })} />
                            </Body>
                            <Right />
                        </ListItem>

                        <Separator bordered style={{ maxHeight: 40 }} />


                        {/* COUNTRY */}
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#E65100" }}>
                                    <Icon type="MaterialCommunityIcons" name="earth" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={{ color: '#333' }}>Country</Text>
                            </Body>
                            <Right>
                                <Text>{businessLocation.country !== "Not specified" ? businessLocation.country : 'Not specified'}</Text>
                            </Right>
                        </ListItem>
                        <Picker
                            style={{ position: 'absolute', bottom: 0, width: '100%' }}
                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                            mode="dropdown"
                            iosHeader="SELECT COUNTRY"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            selectedValue={businessLocation.country}
                            onValueChange={(value) => this.setState({ businessLocation: { ...businessLocation, country: value } })}>
                            {listCountries.map((item, key) => <Picker.Item key={key} label={item.name} value={item.name} />)}
                        </Picker>

                        {/* CITIES */}
                        <ListItem last icon>
                            <Left>
                                <Button style={{ backgroundColor: "#0277BD" }}>
                                    <Icon type="MaterialIcons" name="location-city" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={{ color: '#333' }}>City</Text>
                            </Body>
                            <Right>
                                <Text>{businessLocation.city !== "Not specified" ? businessLocation.city : 'Not specified'}</Text>
                            </Right>
                        </ListItem>
                        <Picker
                            style={{ position: 'absolute', bottom: 0, width: '100%' }}
                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                            mode="dropdown"
                            iosHeader="SELECT CITY"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            selectedValue={businessLocation.city}
                            onValueChange={(value) => this.setState({ businessLocation: { ...businessLocation, city: value } })}>
                            {listCities.map((item, key) => <Picker.Item key={key} label={item.region} value={item.region} />)}
                        </Picker>

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => {
                                        this.setState({
                                            businessLocation: {
                                                street: "",
                                                state: "",
                                                city: "Not specified",
                                                country: "Not specified"
                                            }
                                        }); this._visibleModalBusinessLocation(false)
                                    }}
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
                                    disabled={businessLocation.street && businessLocation.city !== "Not specified" && businessLocation.state !== "" && businessLocation.country !== "Not specified" ? false : true}
                                    onPress={() => this._visibleModalBusinessLocation(false)}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: businessLocation.street && businessLocation.city !== "Not specified" && businessLocation.state !== "" && businessLocation.country !== "Not specified" ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>

                {/* COMPANY NAME */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalCompanyname}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'}
                        enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Title style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Company Name</Title>
                        </Header>

                        {/* COMPANY NAMEY */}
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#EC407A" }}>
                                    <Icon type="FontAwesome" name="building-o" />
                                </Button>
                            </Left>
                            <Body>
                                <Input
                                    placeholder="Company Name"
                                    placeholderTextColor="#EEEE"
                                    maxLength={20}
                                    autoFocus={true}
                                    value={companyName}
                                    keyboardType="ascii-capable"
                                    selectionColor="#E91E63"
                                    onChangeText={(value) => this.setState({ companyName: value })} />
                            </Body>
                            <Right />
                        </ListItem>

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => {
                                        this.setState({ companyName: "" });
                                        this._visibleModalCompanyname(false)
                                    }}
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
                                    onPress={companyName ? () => this._visibleModalCompanyname(false) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(companyName) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>

                {/* COMPANY SOCIAL MEDIA HANDLE */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalSocialMediaHandle}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'}
                        enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Title style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Social Media Handle</Title>
                        </Header>

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

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => {
                                        this.setState({ socialMediaHandle: { facebook: "", twitter: "", instagram: "", snapchat: "" } });
                                        this._visibleModalSocialMediaHandle(false)
                                    }}
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
                                    onPress={socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat ? () => this._visibleModalSocialMediaHandle(false) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>

            </Container>
        );
    }
}

export default withNavigation(AboutYou)