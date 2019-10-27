import React, { Component } from 'react';
import { Dimensions, Modal, Keyboard, AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Input, Item, Spinner, Separator, Picker } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import { normalizeEmail } from 'validator'
import moment from 'moment'
import truncate from 'lodash/truncate'

// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

// Icons
import { Ionicons, Foundation } from '@expo/vector-icons'
import { colorsPalette } from '../../../global/static/colors';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutYou extends Component {
    state = {
        // Inputs
        businessLocation: {
            street: "",
            state: "Not completed",
            city: "Not completed",
            country: "Not completed"
        },
        generalInformation: "",

        companyName: "",

        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },

        inputTextTitleIntheCompany: "",
        inputTextCountry: "",
        inputTextCities: "",

        // Modal
        visibleModalGeneralInformation: false,
        visibleModalBusinessLocation: false,
        visibleModalCompanyname: false,
        visibleModalSocialMediaHandle: false,

        // Data API
        dataCountries: [],
        listCountries: [],
        listRegions: [],
        listCities: []
    }


    componentDidMount() {
        this._retrieveData()
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.businessLocation.country !== this.state.businessLocation.country) { this._getRegions(nextState.businessLocation.country) }
        if (nextState.businessLocation.state !== this.state.businessLocation.state) { this._getCities(nextState.businessLocation.state) }
    }

    _retrieveData = async () => {
        try {
            const countries = await AsyncStorage.getItem('@COUNTRIESCAC');
            if (countries !== null) {
                this.setState({ listCountries: JSON.parse(countries).map(item => item.name), dataCountries: JSON.parse(countries) })
            } else {
                this._getCountry()
            }
        } catch (error) {
            console.log(error)
        }
    };

    _getCountry = async () => {
        try {
            const response = await fetch('https://influencemenow-statics-files-env.s3.amazonaws.com/public/data/countries.json')
            response.json().then(json => { this.setState({ listCountries: json.map(item => item.name), dataCountries: json }); AsyncStorage.setItem('@COUNTRIESCAC', JSON.stringify(json)) })
        } catch (error) {
            console.log(error)
        }
    }

    _getRegions = async (country) => {
        const { dataCountries } = this.state
        let regions = []; regions = dataCountries.filter(item => item.name.indexOf(country) !== -1)
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
        const { businessLocation, companyName, generalInformation } = this.state
        const data = { aboutTheCompany: { businessLocation, companyName, generalInformation }, submitPrizeUserId: userData.id, createdAt: moment().toISOString() }
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
        const { generalInformation, businessLocation, companyName } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            generalInformation ?
                businessLocation.street && businessLocation.country
                    ? companyName
                        ? this._submit()
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid title company" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid business businessLocation" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid general information" } } })
        }, 500);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wantSuggestedFields) {
            const { dataFromThePreviousSubmitPrize } = nextProps
            this.setState({
                generalInformation: dataFromThePreviousSubmitPrize.aboutTheCompany.generalInformation,
                businessLocation: {
                    street: dataFromThePreviousSubmitPrize.aboutTheCompany.businessLocation.street,
                    state: dataFromThePreviousSubmitPrize.aboutTheCompany.businessLocation.state,
                    city: dataFromThePreviousSubmitPrize.aboutTheCompany.businessLocation.city,
                    country: dataFromThePreviousSubmitPrize.aboutTheCompany.businessLocation.country
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
            generalInformation,
            businessLocation,
            companyName,

            inputTextRegions,
            inputTextCountry,
            inputTextCities,

            // modal
            visibleModalGeneralInformation,
            visibleModalBusinessLocation,
            visibleModalCompanyname,

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
                        <Text allowFontScaling={false} style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Create your prize!</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontWeight: 'bold', fontSize: wp(4) }}>Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{userData && truncate(_.startCase(_.lowerCase(userData.name)), { length: 15, separator: "..." })}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontWeight: 'bold', fontSize: wp(4) }}>Last name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{userData && truncate(_.startCase(_.lowerCase(userData.lastname)), { length: 25, separator: "..." })}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontWeight: 'bold', fontSize: wp(4) }}>Number phone</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{userData && userData.phone === null ? 'Not completed' : userData.phone}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontWeight: 'bold', fontSize: wp(4) }}>Email</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{userData.email === undefined ? null : truncate(normalizeEmail(userData.email), { length: 15, separator: "..." })}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* GENERAL INFORMATION */}
                                    <ListItem disabled={isLoading} icon onPress={() => this.setState({ visibleModalGeneralInformation: true })}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#757575" }}>
                                                <Icon type="Ionicons" active name="ios-information-circle" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontWeight: 'bold', fontSize: wp(4) }}>General information</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: generalInformation ? colorsPalette.darkFont : colorsPalette.gradientGray }}>{generalInformation ? truncate(generalInformation, { length: 15, separator: "..." }) : "Not completed"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* LOCATION */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalBusinessLocation(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D" }} onPress={() => this._visibleModalBusinessLocation(true)}>
                                                <Icon type="Entypo" name="location-pin" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontWeight: 'bold', fontSize: wp(4) }}>Location</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: businessLocation.street && businessLocation.country ? colorsPalette.darkFont : colorsPalette.gradientGray }}>{businessLocation.street && businessLocation.country ? truncate(`${businessLocation.street}, ${businessLocation.country}`, { length: 15, separator: "..." }) : "Not completed"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* COMPANY NAME */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalCompanyname(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#EC407A" }}>
                                                <Icon type="FontAwesome" style={{ left: 1, fontSize: wp(5) }} active name="building" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontWeight: 'bold', fontSize: wp(4) }}>Company name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: companyName ? colorsPalette.darkFont : colorsPalette.gradientGray }}>{companyName ? truncate(companyName, { length: 15, separator: "..." }) : "Not completed"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

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

                {/* GENERAL INFORMATION */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalGeneralInformation}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => { }}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>General information</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    generalInformation
                                        ? this.setState({ visibleModalGeneralInformation: false })
                                        : this.setState({ generalInformation: "", visibleModalGeneralInformation: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: generalInformation ? "#E91E63" : "#3333"
                                    }}>{generalInformation ? "Done" : "Cancel"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* generalInformation */}
                            <Item
                                style={{ width: "90%", top: 15, alignSelf: "center", borderBottomColor: colorsPalette.transparent }}>
                                <Input
                                    allowFontScaling={false}
                                    multiline
                                    numberOfLines={3}
                                    placeholderTextColor="#EEEE"
                                    autoFocus={true}
                                    value={generalInformation}
                                    keyboardType="ascii-capable"
                                    selectionColor="#E91E63"
                                    style={{ padding: 5, maxHeight: 220 }}
                                    onChangeText={(value) => this.setState({ generalInformation: value })} />
                            </Item>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, alignSelf: 'center', textAlign: 'center', top: 20 }}>Please, write something about yourself or your company, this information will appear in the prize profile (first screen), the more detail the better.</Text>
                        </Content>
                    </Container>
                </Modal>

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
                                    businessLocation.street && businessLocation.country !== "Not completed"
                                        ? filterRegionList.length
                                            ? businessLocation.state !== "Not completed"
                                                ? filterCitiesList && filterCitiesList.length
                                                    ? businessLocation.city !== "Not completed"
                                                        ? this.setState({ visibleModalBusinessLocation: false })
                                                        : this.setState({
                                                            visibleModalBusinessLocation: false,
                                                            listRegions: [],
                                                            businessLocation: {
                                                                street: "",
                                                                country: "Not completed",
                                                                state: "Not completed",
                                                                city: "Not completed",
                                                            }
                                                        })
                                                    : this.setState({ visibleModalBusinessLocation: false })
                                                : this.setState({
                                                    visibleModalBusinessLocation: false,
                                                    listRegions: [],
                                                    businessLocation: {
                                                        street: "",
                                                        country: "Not completed",
                                                        state: "Not completed",
                                                        city: "Not completed",
                                                    }
                                                })
                                            : this.setState({ visibleModalBusinessLocation: false })
                                        : this.setState({
                                            visibleModalBusinessLocation: false,
                                            listRegions: [],
                                            businessLocation: {
                                                street: "",
                                                country: "Not completed",
                                                state: "Not completed",
                                                city: "Not completed",
                                            }
                                        })}>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        top: 5,
                                        letterSpacing: 1,
                                        color: businessLocation.street && businessLocation.country !== "Not completed"
                                            ? filterRegionList.length
                                                ? businessLocation.state !== "Not completed"
                                                    ? filterCitiesList && filterCitiesList.length
                                                        ? businessLocation.city !== "Not completed"
                                                            ? colorsPalette.primaryColor
                                                            : colorsPalette.gradientGray
                                                        : colorsPalette.gradientGray
                                                    : colorsPalette.gradientGray
                                                : colorsPalette.primaryColor
                                            : colorsPalette.gradientGray
                                    }}>{businessLocation.street && businessLocation.country !== "Not completed"
                                        ? filterRegionList.length
                                            ? businessLocation.state !== "Not completed"
                                                ? filterCitiesList && filterCitiesList.length
                                                    ? businessLocation.city !== "Not completed"
                                                        ? "DONE"
                                                        : "CANCEL"
                                                    : "DONE"
                                                : "CANCEL"
                                            : "DONE"
                                        : "CANCEL"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* STREET */}
                            <ListItem icon last>
                                <Left>
                                    <Button style={{ backgroundColor: "#90A4AE" }}>
                                        <Icon type="FontAwesome" name="road" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Input
                                        onSubmitEditing={() => businessLocation.street && businessLocation.country !== 'Not completed' && businessLocation.state !== "Not completed" && businessLocation.city !== 'Not completed' ? this.setState({ visibleModalBusinessLocation: false }) : Keyboard.dismiss()}
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
                                    <Text allowFontScaling={false}>{businessLocation.country !== "Not completed" ? businessLocation.country : 'Not completed'}</Text>
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
                                                <Button small transparent style={{ alignSelf: 'flex-end', top: 3, right: -50 }} onPress={() => this._getCountry()}>
                                                    <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Reload</Text>
                                                </Button>
                                            </Item>}
                                    </Header>}
                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                headerTitleStyle={{ color: "#D81B60" }}
                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                selectedValue={businessLocation.country}
                                onValueChange={(value) => this.setState({ businessLocation: { ...businessLocation, country: value, state: "Not completed", city: "Not completed" } })}>
                                {filterCounttriesList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                            </Picker>

                            {/* STATES */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: listRegions.length ? "#27ae60" : colorsPalette.gradientGray }}>
                                        <Icon type="Foundation" name="map" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text allowFontScaling={false} style={{ color: listRegions.length ? colorsPalette.darkFont : colorsPalette.gradientGray }}>State</Text>
                                </Body>
                                <Right>
                                    <Text allowFontScaling={false} style={listRegions.length ? {} : { color: colorsPalette.gradientGray }}>{businessLocation.state !== "Not completed" ? businessLocation.state : 'Not completed'}</Text>
                                </Right>
                            </ListItem>
                            <Picker
                                enabled={filterRegionList.length ? true : false}
                                style={{ position: 'absolute', bottom: 0, width: '100%' }}
                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                mode="dropdown"
                                renderHeader={backAction =>
                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                        <Button transparent small onPress={backAction}>
                                            <Text allowFontScaling={false} style={{ color: '#D81B60', fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                        </Button>
                                        {filterRegionList.length
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
                                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', top: 2 }}>States not available</Text>
                                                <Button small transparent style={{ alignSelf: 'flex-end', top: 3, right: -50 }} onPress={() => this._getRegions()}>
                                                    <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Reload</Text>
                                                </Button>
                                            </Item>}
                                    </Header>}
                                iosHeader="SELECT REGION"
                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                headerTitleStyle={{ color: "#D81B60" }}
                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                selectedValue={businessLocation.state}
                                onValueChange={(value) => this.setState({ businessLocation: { ...businessLocation, state: value, city: "Not completed" } })}>
                                {filterRegionList.length
                                    ? filterRegionList.map((item, key) => <Picker.Item key={key} label={item.region} value={item.region} />)
                                    : null}
                            </Picker>

                            {/* CITIES */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: filterCitiesList && filterCitiesList.length && filterRegionList.length ? "#0277BD" : colorsPalette.gradientGray }}>
                                        <Icon type="MaterialIcons" name="location-city" />
                                    </Button>
                                </Left>
                                <Body style={{ borderBottomColor: 'transparent' }}>
                                    <Text allowFontScaling={false} style={{ color: filterCitiesList && filterCitiesList.length && filterRegionList.length ? colorsPalette.darkFont : colorsPalette.gradientGray }}>City</Text>
                                </Body>
                                <Right style={{ borderBottomColor: 'transparent' }}>
                                    <Text allowFontScaling={false} style={filterCitiesList && filterCitiesList.length && filterRegionList.length ? {} : { color: colorsPalette.gradientGray }}>{businessLocation.city !== "Not completed" ? businessLocation.city : 'Not completed'}</Text>
                                </Right>
                            </ListItem>
                            <Picker
                                enabled={filterCitiesList && filterCitiesList.length && filterRegionList.length ? true : false}
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
                                                <Icon type="MaterialIcons" name="businessLocation-city" style={{ fontSize: wp(4) }} />
                                            </Item>
                                            : <Item style={{ backgroundColor: '#FFF' }}>
                                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', top: 2 }}>Cities not available</Text>
                                                <Button small transparent style={{ alignSelf: 'flex-end', top: 3, right: -50 }} onPress={() => this._getCities()}>
                                                    <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Reload</Text>
                                                </Button>
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
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, alignSelf: 'center', textAlign: 'center', width: "90%" }}>You must specify the country, then the state and finally the city. The list will not be enabled if it is empty.</Text>
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
                                        placeholder="Company name"
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
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5), textAlign: 'center', top: 15, width: "90%", alignSelf: 'center' }}>If this information is not provided your profile name will be displayed (optional)</Text>
                        </Content>
                    </Container>
                </Modal>

            </Container>
        );
    }
}

export default withNavigation(AboutYou)