import React, { Component } from 'react';
import { Dimensions, Alert, Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Input, Item, Spinner, Picker, Separator } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'lodash'
import { normalizeEmail } from 'validator'
import moment from 'moment'

// Gradients
import { GadrientsAuth } from '../../../Global/gradients'
import { MyStatusBar } from '../../../Global/statusBar'

// Static data
import { ocuppationList } from '../../../../assets/data/global'

// Countries data
import countries from '../../../../assets/data/countries.json'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutYou extends Component {
    state = {
        // Inputs
        location: {
            street: "",
            country: "Not specified",
            state: "Not specified",
            city: "Not specified",
        },
        companyName: "",
        titleInTheCompany: 'Not specified',

        inputTextTitleIntheCompany: "",
        inputTextCountry: "",
        inputTextCities: "",

        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },

        // Modal
        visibleModalLocation: false,
        visibleModalCompanyname: false,
        visibleModalTitleInTheCompany: false,

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
        if (nextState.location.country !== this.state.location.country) { this._getRegions(nextState.location.country) }
        if (nextState.location.state !== this.state.location.state) { this._getCities(nextState.location.state) }
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
    _visibleModalLocation = (visible) => this.setState({ visibleModalLocation: visible })
    _visibleModalCompanyname = (visible) => this.setState({ visibleModalCompanyname: visible })
    _visibleModalTitleInTheCompany = (visible) => this.setState({ visibleModalTitleInTheCompany: visible })

    // Send Data to AWS
    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms, userData } = this.props
        const { location, companyName, titleInTheCompany } = this.state
        const data = { aboutTheUser: { location, companyName, titleInTheCompany }, createContestUserId: userData.id, createdAt: moment().toISOString() }
        try {
            await _dataFromForms(data)
            await _indexChangeSwiper(1)
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
        } catch (error) {
            console.log(error)
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
        }
    }

    _validateForm = () => {
        const { location, companyName, titleInTheCompany } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            location.street && location.city && location.state && location.country
                ? companyName
                    ? titleInTheCompany
                        ? this._submit()
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid title company" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid name company" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid location" } } })
        }, 500);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wantSuggestedFields) {
            const { dataFromThePreviousContest } = nextProps
            this.setState({
                location: {
                    street: dataFromThePreviousContest.aboutTheUser.location.street,
                    state: dataFromThePreviousContest.aboutTheUser.location.state,
                    city: dataFromThePreviousContest.aboutTheUser.location.city,
                    country: dataFromThePreviousContest.aboutTheUser.location.country
                },
                companyName: dataFromThePreviousContest.aboutTheUser.companyName,
                titleInTheCompany: dataFromThePreviousContest.aboutTheUser.titleInTheCompany,
                coinLocation: 60,
                coinCompanyName: 50,
                coinTitleInTheCompany: 50
            })
        }
    }

    render() {
        const {
            isvalidFormAnimation,
            isLoading,
            messageFlash,

            // Input
            location,
            companyName,
            titleInTheCompany,

            inputTextRegions,
            inputTextCountry,
            inputTextCities,

            inputTextTitleIntheCompany,

            // modal
            visibleModalLocation,
            visibleModalCompanyname,

            // Data API
            listCountries,
            listRegions,
            listCities
        } = this.state
        const { userData, navigation } = this.props
        let filterOcuppationList = ocuppationList.filter((item) => { return item.toLowerCase().indexOf(_.lowerCase(inputTextTitleIntheCompany)) !== -1 })
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
                    <Right />
                </Header>

                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: isLoading ? '#EEEEEE' : '#FFF', fontWeight: '100' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Let's get started!</Text> {'\n'}Tell us a little about yourself!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content contentContainerStyle={{ paddingTop: 10 }} keyboardShouldPersistTaps={'always'}>
                                <List>
                                    {/* NAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#007AFF" }}>
                                                <Icon type="Ionicons" name="md-person" />
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
                                                <Icon type="Ionicons" name="md-person" />
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
                                                <Icon type="Foundation" name="telephone" />
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
                                                <Icon type="Ionicons" name="md-mail" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Email</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData.email === undefined ? null : normalizeEmail(userData.email)}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* LOCATION */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalLocation(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D" }} onPress={() => this._visibleModalLocation(true)}>
                                                <Icon type="Entypo" name="location-pin" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Location</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{location.street && location.city && location.state && location.country ? "Specified" : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* COMPANY NAME */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalCompanyname(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#EC407A" }}>
                                                <Icon type="FontAwesome" name="building-o" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Company Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{companyName ? _.truncate(companyName, { separator: '...', length: 15 }) : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* TITLE IN THE OCMPANY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                                <Icon type="Entypo" name="creative-commons-attribution" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Title in the company</Text>
                                            {isLoading ? null :
                                                <Picker
                                                    renderHeader={backAction =>
                                                        <Header searchBar transparent rounded style={{ left: -20 }}>
                                                            <Button transparent small onPress={backAction}>
                                                                <Text allowFontScaling={false} style={{ color: '#D81B60', fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                                            </Button>
                                                            <Item style={{ backgroundColor: '#F5F5F5' }}>
                                                                <Icon name="ios-search" />
                                                                <Input
                                                                    allowFontScaling={false}
                                                                    placeholder="Filter"
                                                                    value={inputTextTitleIntheCompany}
                                                                    onChangeText={(value) => this.setState({ inputTextTitleIntheCompany: value })} />
                                                                <Icon type="Entypo" name="creative-commons-attribution" />
                                                            </Item>
                                                        </Header>}
                                                    style={{ position: 'absolute', top: -30 }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    selectedValue={titleInTheCompany}
                                                    onValueChange={(value) => this.setState({ titleInTheCompany: value })}>
                                                    {filterOcuppationList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                                </Picker>}
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{titleInTheCompany}</Text>
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

                {/* LOCATION MODAL */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalLocation}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'}
                        enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Location</Title>
                        </Header>

                        {/* STREET */}
                        <ListItem icon last>
                            <Left>
                                <Button style={{ backgroundColor: "#90A4AE" }}>
                                    <Icon type="FontAwesome" name="road" />
                                </Button>
                            </Left>
                            <Body>
                                <Input
                                    allowFontScaling={false}
                                    placeholder="Your street"
                                    placeholderTextColor="#EEEE"
                                    autoFocus={true}
                                    maxLength={512}
                                    value={location.street}
                                    keyboardType="ascii-capable"
                                    selectionColor="#E91E63"
                                    onChangeText={(value) => this.setState({ location: { ...location, street: value } })} />
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
                                <Text allowFontScaling={false}>{location.country !== "Not specified" ? location.country : 'Not specified'}</Text>
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
                            selectedValue={location.country}
                            onValueChange={(value) => this.setState({ location: { ...location, country: value } })}>
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
                                <Text allowFontScaling={false}>{location.state !== "Not specified" ? location.state : 'Not specified'}</Text>
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
                            selectedValue={location.state}
                            onValueChange={(value) => this.setState({ location: { ...location, state: value } })}>
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
                                <Text allowFontScaling={false}>{location.city !== "Not specified" ? location.city : 'Not specified'}</Text>
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
                            selectedValue={location.city}
                            onValueChange={(value) => this.setState({ location: { ...location, city: value } })}>
                            {filterCitiesList && filterCitiesList.length
                                ? filterCitiesList.map((item, key) => <Picker.Item key={key} label={item.city} value={item.city} />)
                                : null}
                        </Picker>

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => {
                                        this.setState({
                                            location: {
                                                street: "",
                                                state: "Not specified",
                                                city: "Not specified",
                                                country: "Not specified"
                                            }
                                        }); this._visibleModalLocation(false)
                                    }}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text allowFontScaling={false} style={{ color: "#333" }}>CANCEL</Text>
                                </Button>
                            </Col>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    disabled={location.street !== "" && location.city !== "Not specified" && location.state !== "Not specified" && location.country !== "Not specified" ? false : true}
                                    onPress={() => {
                                        this._visibleModalLocation(false);
                                    }}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text allowFontScaling={false} style={{ color: location.street && location.city !== "Not specified" && location.state !== "Not specified" && location.country !== "Not specified" ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
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
                            <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Company Name</Title>
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

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => {
                                        this.setState({
                                            companyName: "",
                                        });
                                        this._visibleModalCompanyname(false)
                                    }}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text allowFontScaling={false} style={{ color: "#333" }}>CANCEL</Text>
                                </Button>
                            </Col>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={companyName ? () => {
                                        this._visibleModalCompanyname(false)
                                    } : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text allowFontScaling={false} style={{ color: companyName ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
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