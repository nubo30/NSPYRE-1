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

// Gradients
import { GadrientsAuth } from '../../../Global/gradients/index'
import { MyStatusBar } from '../../../Global/statusBar/index'

// Icons
import { Ionicons, Foundation, Entypo, FontAwesome, Feather, AntDesign } from '@expo/vector-icons'

// Countries data
import countries from '../../../../assets/data/countries.json'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutYou extends Component {
    state = {
        // Inputs
        businessLocation: {
            street: "",
            state: "Not specified",
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

        inputTextTitleIntheCompany: "",
        inputTextCountry: "",
        inputTextCities: "",

        // Modal
        visibleModalBusinessLocation: false,
        visibleModalCompanyname: false,
        visibleModalSocialMediaHandle: false,

        // Data API
        listCountries: [],
        listRegions: [],
        listCities: []
    }


    componentDidMount() {
        this._getCountry()
    }

    _getCountry = async () => {
        this.setState({ listCountries: countries.map(item => item.name) })
    }


    componentWillUpdate(nextProps, nextState) {
        if (nextState.businessLocation.country !== this.state.businessLocation.country) { this._getRegions(nextState.businessLocation.country) }
        if (nextState.businessLocation.state !== this.state.businessLocation.state) { this._getCities(nextState.businessLocation.state) }
    }
    _getRegions = async (country) => {
        let regions = []; regions = countries.filter(item => item.name.indexOf(country) !== -1)
        if (regions.length !== 0) {
            this.setState({
                listRegions: regions[0].states.map(items => items),
            })
        }
    }

    _getCities = async (region) => {
        if (this.state.listRegions.length !== 0) {
            const cities = this.state.listRegions.map(items => items.cities)
            const getcities = cities.map(item => item.map(items => items))
            const filterCities = getcities.map(item => item.filter(items => items.region.indexOf(region) !== -1))
            const citiesConvert = filterCities.map(item => item.length ? item : "")
            const citiesChoose = citiesConvert.filter(items => items !== "")
            this.setState({
                listCities: citiesChoose[0]
            })
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
        const data = { aboutTheCompany: { businessLocation, companyName, socialMediaHandle }, submitPrizeUserId: userData.id, createdAt: moment().toISOString() }
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

            inputTextRegions,
            inputTextCountry,
            inputTextCities,

            // modal
            visibleModalBusinessLocation,
            visibleModalCompanyname,
            visibleModalSocialMediaHandle,

            // Data API
            listCountries,
            listRegions,
            listCities
        } = this.state
        const { userData, navigation } = this.props
        let filterRegionList = listRegions && listRegions.filter((item) => { return item.region.toLowerCase().indexOf(_.lowerCase(inputTextRegions)) !== -1 })
        let filterCounttriesList = listCountries && listCountries.filter((item) => { return item.toLowerCase().indexOf(_.lowerCase(inputTextCountry)) !== -1 })
        let filterCitiesList = listCities && listCities.filter((item) => { return item.city.toLowerCase().indexOf(_.lowerCase(inputTextCities)) !== -1 })
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
                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? '#EEEEEE' : '#FFF', fontSize: wp(6) }}>About You</Title>
                    </Left>
                </Header>

                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: isLoading ? '#EEEEEE' : '#FFF', fontWeight: '100' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Let's get started!</Text> {'\n'}Tell us a little more!
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData && _.startCase(_.lowerCase(userData.name))}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Lastname</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData && _.startCase(_.lowerCase(userData.lastname))}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Number Phone</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData && userData.phone === null ? 'Not specified' : userData.phone}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Email</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData.email === undefined ? null : normalizeEmail(userData.email)}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* BUSINESS ADDRESS */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalBusinessLocation(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D" }} onPress={() => this._visibleModalBusinessLocation(true)}>
                                                <Icon type="Entypo" name="location-pin" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Business businessLocation</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{businessLocation.street && businessLocation.city && businessLocation.country && businessLocation.state ? "Specified" : "Not specified"}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Company Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{companyName ? "Specified" : "Not specified"}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Company social media handles</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.snapchat ? "Specified" : "Not specified"}</Text>
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
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(4) }}>Continue</Text>
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
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Location</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ position: 'absolute', right: 0 }} onPress={() =>
                                    businessLocation.street && businessLocation.country !== 'Not specified' && businessLocation.state !== "Not specified" && businessLocation.city !== 'Not specified'
                                        ? this.setState({ visibleModalBusinessLocation: false })
                                        : this.setState({
                                            visibleModalBusinessLocation: false,
                                            businessLocation: {
                                                street: "",
                                                country: "Not specified",
                                                state: "Not specified",
                                                city: "Not specified",
                                            }
                                        })}>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        top: 5,
                                        letterSpacing: 1,
                                        color: businessLocation.street && businessLocation.country !== 'Not specified' && businessLocation.state !== "Not specified" && businessLocation.city !== 'Not specified' ? "#E91E63" : "#3333"
                                    }}>{businessLocation.street && businessLocation.country !== 'Not specified' && businessLocation.state !== "Not specified" && businessLocation.city !== 'Not specified' ? "Done" : "Cancel"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                            {/* STREET */}
                            <ListItem icon last>
                                <Left>
                                    <Button style={{ backgroundColor: "#90A4AE" }}>
                                        <Icon type="FontAwesome" name="road" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Input
                                        onSubmitEditing={() => businessLocation.street && businessLocation.country !== 'Not specified' && businessLocation.state !== "Not specified" && businessLocation.city !== 'Not specified' ? this.setState({ visibleModalBusinessLocation: false }) : Keyboard.dismiss()}
                                        returnKeyType='done'
                                        allowFontScaling={false}
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

                            <Separator bordered style={{ maxHeight: 40 }} />

                            {/* COUNTRIES */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#E65100" }}>
                                        <Icon type="MaterialCommunityIcons" name="earth" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text allowFontScaling={false} style={{ color: '#333' }}>Country</Text>
                                </Body>
                                <Right>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{businessLocation.country !== "Not specified" ? businessLocation.country : 'Not specified'}</Text>
                                </Right>
                            </ListItem>
                            <Picker
                                style={{ position: 'absolute', bottom: 0, width: '100%' }}
                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                mode="dropdown"
                                renderHeader={backAction =>
                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                        <Button transparent small onPress={backAction}>
                                            <Text allowFontScaling={false} style={{ color: '#D81B60', fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                        </Button>
                                        {listCountries.length
                                            ? <Item style={{ backgroundColor: '#F5F5F5' }}>
                                                <Icon name="ios-search" />
                                                <Input
                                                    allowFontScaling={false}
                                                    placeholder="Filter"
                                                    value={inputTextCountry}
                                                    onChangeText={(value) => this.setState({ inputTextCountry: value })} />
                                                <Icon type="MaterialCommunityIcons" name="earth" style={{ fontSize: wp(4) }} />
                                            </Item>
                                            : <Item style={{ backgroundColor: '#FFF' }}>
                                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', top: 2 }}>Countries not available</Text>
                                            </Item>}
                                    </Header>}
                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                headerTitleStyle={{ color: "#D81B60" }}
                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                selectedValue={businessLocation.country}
                                onValueChange={(value) => this.setState({ businessLocation: { ...businessLocation, country: value } })}>
                                {filterCounttriesList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                            </Picker>

                            {/* STATES */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#27ae60" }}>
                                        <Icon type="Foundation" name="map" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text allowFontScaling={false} style={{ color: '#333' }}>State</Text>
                                </Body>
                                <Right>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{businessLocation.state !== "Not specified" ? businessLocation.state : 'Not specified'}</Text>
                                </Right>
                            </ListItem>
                            <Picker
                                style={{ position: 'absolute', bottom: 0, width: '100%' }}
                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                mode="dropdown"
                                renderHeader={backAction =>
                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                        <Button transparent small onPress={backAction}>
                                            <Text allowFontScaling={false} style={{ color: '#D81B60', fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                        </Button>
                                        {listRegions.length
                                            ? <Item style={{ backgroundColor: '#F5F5F5' }}>
                                                <Icon name="ios-search" />
                                                <Input
                                                    allowFontScaling={false}
                                                    placeholder="Filter"
                                                    value={inputTextRegions}
                                                    onChangeText={(value) => this.setState({ inputTextRegions: value })} />
                                                <Icon type="Foundation" name="map" style={{ fontSize: wp(4) }} />
                                            </Item>
                                            : <Item style={{ backgroundColor: '#FFF' }}>
                                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', top: 2 }}>Regions not available</Text>
                                            </Item>}
                                    </Header>}
                                iosHeader="SELECT REGION"
                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                headerTitleStyle={{ color: "#D81B60" }}
                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                selectedValue={businessLocation.state}
                                onValueChange={(value) => this.setState({ businessLocation: { ...businessLocation, state: value } })}>
                                {filterRegionList.length
                                    ? filterRegionList.map((item, key) => <Picker.Item key={key} label={item.region} value={item.region} />)
                                    : null}
                            </Picker>

                            {/* CITIES */}
                            <ListItem last icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#0277BD" }}>
                                        <Icon type="MaterialIcons" name="location-city" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text allowFontScaling={false} style={{ color: '#333' }}>City</Text>
                                </Body>
                                <Right>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{businessLocation.city !== "Not specified" ? businessLocation.city : 'Not specified'}</Text>
                                </Right>
                            </ListItem>
                            <Picker
                                style={{ position: 'absolute', bottom: 0, width: '100%' }}
                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                mode="dropdown"
                                renderHeader={backAction =>
                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                        <Button transparent small onPress={backAction}>
                                            <Text allowFontScaling={false} style={{ color: '#D81B60', fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                        </Button>
                                        {listCities && listCities.length
                                            ? <Item style={{ backgroundColor: '#F5F5F5' }}>
                                                <Icon name="ios-search" />
                                                <Input
                                                    allowFontScaling={false}
                                                    placeholder="Filter"
                                                    value={inputTextCities}
                                                    onChangeText={(value) => this.setState({ inputTextCities: value })} />
                                                <Icon type="MaterialIcons" name="location-city" style={{ fontSize: wp(4) }} />
                                            </Item>
                                            : <Item style={{ backgroundColor: '#FFF' }}>
                                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', top: 2 }}>Cities not available</Text>
                                            </Item>}
                                    </Header>}
                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                headerTitleStyle={{ color: "#D81B60" }}
                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                selectedValue={businessLocation.city}
                                onValueChange={(value) => this.setState({ businessLocation: { ...businessLocation, city: value } })}>
                                {filterCitiesList && filterCitiesList.length
                                    ? filterCitiesList.map((item, key) => <Picker.Item key={key} label={item.city} value={item.city} />)
                                    : null}
                            </Picker>

                        </Content>

                    </Container>
                </Modal>

                {/* COMPANY NAME */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalCompanyname}
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
                                    companyName
                                        ? this.setState({ visibleModalCompanyname: false })
                                        : this.setState({ companyName: "", visibleModalCompanyname: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: companyName ? "#E91E63" : "#3333"
                                    }}>{
                                            companyName ? "Done" : "Cancel"
                                        }</Text>
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
                                        onSubmitEditing={() => companyName ? this.setState({ visibleModalCompanyname: false }) : Keyboard.dismiss()}
                                        returnKeyType='done'
                                        allowFontScaling={false}
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
                        </Content>
                    </Container>
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
                                        ? this.setState({ visibleModalCompanyname: false })
                                        : this.setState({ companyName: "", visibleModalCompanyname: false })
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

            </Container>
        );
    }
}

export default withNavigation(AboutYou)