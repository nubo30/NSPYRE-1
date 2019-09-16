import React, { Component } from 'react';
import { Dimensions, Modal, Keyboard } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Input, Item, Spinner, Picker, Separator } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import lowerCase from 'lodash/lowerCase'
import startCase from 'lodash/startCase'
import truncate from 'lodash/truncate'
import { normalizeEmail } from 'validator'
import moment from 'moment'

// Gradients
import { GadrientsAuth } from '../../../global/gradients'
import { MyStatusBar } from '../../../global/statusBar'

// Static data
import { occupationList } from '../../../global/data/global'

// Color
import { colorsPalette } from '../../../global/static/colors'

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
        dataCountries: [],
        listCountries: [],
        listRegions: [],
        listCities: []
    }

    componentDidMount() {
        this._getCountry()
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.location.country !== this.state.location.country) { this._getRegions(nextState.location.country) }
        if (nextState.location.state !== this.state.location.state) { this._getCities(nextState.location.state) }
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

    _getCountry = async () => {
        try {
            const response = await fetch('https://influencemenow-statics-files-env.s3.amazonaws.com/public/data/countries.json')
            response.json().then(json => this.setState({ listCountries: json.map(item => item.name), dataCountries: json }))
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
        let filterOcuppationList = occupationList.filter((item) => { return item.toLowerCase().indexOf(lowerCase(inputTextTitleIntheCompany)) !== -1 })
        let filterRegionList = listRegions && listRegions.filter((item) => { return item.region.toLowerCase().indexOf(lowerCase(inputTextRegions)) !== -1 })
        let filterCounttriesList = listCountries && listCountries.filter((item) => { return item.toLowerCase().indexOf(lowerCase(inputTextCountry)) !== -1 })
        let filterCitiesList = listCities && listCities.filter((item) => { return item.city.toLowerCase().indexOf(lowerCase(inputTextCities)) !== -1 })
        return (
            <Container>
                <GadrientsAuth />
                <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />

                <Header transparent>
                    <MyStatusBar backgroundColor={colorsPalette.secondaryColor} barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, }} />
                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontSize: wp(6) }}>About You</Title>
                    </Left>
                    <Right />
                </Header>

                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontWeight: '100' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), fontWeight: 'bold', color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor }}>Let's get started!</Text> {'\n'}Tell us a little about yourself!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: colorsPalette.secondaryColor, width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content contentContainerStyle={{ paddingTop: 10 }} keyboardShouldPersistTaps={'always'}>
                                <List>
                                    {/* NAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#007AFF" }}>
                                                <Icon type="Ionicons" name="md-person" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData && startCase(lowerCase(userData.name))}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* LASTNAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#009688" }}>
                                                <Icon type="Ionicons" name="md-person" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Lastname</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData && startCase(lowerCase(userData.lastname))}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* PHONE */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#F4511E" }}>
                                                <Icon type="Foundation" name="telephone" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Number Phone</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData && userData.phone === null ? 'Not specified' : userData.phone}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* EMAIL */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#4DB6AC" }}>
                                                <Icon type="Ionicons" name="md-mail" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Email</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{userData.email === undefined ? null : normalizeEmail(userData.email)}</Text>
                                        </Right>
                                    </ListItem>

                                    {/* LOCATION */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalLocation(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#FBC02D" }} onPress={() => this._visibleModalLocation(true)}>
                                                <Icon type="Entypo" name="location-pin" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Location</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{location.street && location.city && location.state && location.country ? "Specified" : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* COMPANY NAME */}
                                    <ListItem icon disabled={isLoading} onPress={() => this._visibleModalCompanyname(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#EC407A" }}>
                                                <Icon type="FontAwesome" name="building-o" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Company Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{companyName ? truncate(companyName, { separator: '...', length: 15 }) : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* TITLE IN THE OCMPANY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#009688" }}>
                                                <Icon type="Entypo" name="creative-commons-attribution" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4) }}>Title in the company</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>{titleInTheCompany}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute' }}>
                                                <Picker
                                                    renderHeader={backAction =>
                                                        <Header searchBar transparent rounded style={{ left: -20 }}>
                                                            <Button transparent small onPress={backAction}>
                                                                <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                                            </Button>
                                                            <Item style={{ backgroundColor: colorsPalette.gradientGray }}>
                                                                <Icon name="ios-search" />
                                                                <Input
                                                                    allowFontScaling={false}
                                                                    placeholder="Filter"
                                                                    value={inputTextTitleIntheCompany}
                                                                    onChangeText={(value) => this.setState({ inputTextTitleIntheCompany: value })} />
                                                                <Icon type="Entypo" name="creative-commons-attribution" />
                                                            </Item>
                                                        </Header>}
                                                    textStyle={{ color: colorsPalette.transparent }}
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: colorsPalette.primaryColor, fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: colorsPalette.primaryColor }}
                                                    headerStyle={{ backgroundColor: colorsPalette.secondaryColor, borderBottomColor: colorsPalette.secondaryColor }}
                                                    selectedValue={titleInTheCompany}
                                                    onValueChange={(value) => this.setState({ titleInTheCompany: value })}>
                                                    {filterOcuppationList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                                </Picker>
                                            </View>}
                                    </ListItem>
                                </List>

                            </Content>
                        </View>
                        <Text allowFontScaling={false} style={{ color: colorsPalette.errColor, fontSize: wp(3.5), top: 10 }}>
                            {messageFlash.cognito && messageFlash.cognito.message}
                        </Text>
                    </Row>
                </Grid>

                {/* SUBMIT DATA TO AWS */}
                <Footer style={{ backgroundColor: colorsPalette.transparent, borderTopColor: colorsPalette.transparent }}>
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
                                backgroundColor: colorsPalette.primaryColor
                            }}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontSize: wp(4) }}>Continue</Text>
                            {isLoading ? <Spinner color={isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
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
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(7) }}>Location</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ position: 'absolute', right: 0 }} onPress={() =>
                                    location.street && location.country !== 'Not specified' && location.state !== "Not specified" && location.city !== 'Not specified'
                                        ? this.setState({ visibleModalLocation: false })
                                        : this.setState({
                                            visibleModalLocation: false,
                                            location: {
                                                street: "",
                                                country: "Not specified",
                                                state: "Not specified",
                                                city: "Not specified",
                                            }
                                        })

                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        top: 5,
                                        letterSpacing: 1,
                                        color: location.street && location.country !== 'Not specified' && location.state !== "Not specified" && location.city !== 'Not specified' ? colorsPalette.primaryColor : colorsPalette.thirdColor
                                    }}>{
                                            location.street && location.country !== 'Not specified' && location.state !== "Not specified" && location.city !== 'Not specified' ? "DONE" : "CANCEL"
                                        }</Text>
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
                                        onSubmitEditing={() => location.street && location.country !== 'Not specified' && location.state !== "Not specified" && location.city !== 'Not specified' ? this.setState({ visibleModalLocation: false }) : Keyboard.dismiss()}
                                        returnKeyType='done'
                                        allowFontScaling={false}
                                        placeholder="Your street"
                                        placeholderTextColor={colorsPalette.gradientGray}
                                        autoFocus={true}
                                        maxLength={512}
                                        value={location.street}
                                        keyboardType="ascii-capable"
                                        selectionColor={colorsPalette.primaryColor}
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
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont }}>Country</Text>
                                </Body>
                                <Right>
                                    <Text allowFontScaling={false}>{location.country !== "Not specified" ? location.country : 'Not specified'}</Text>
                                </Right>
                            </ListItem>
                            <Picker
                                style={{ position: 'absolute', bottom: 0, width: '100%' }}
                                textStyle={{ color: colorsPalette.transparent }}
                                mode="dropdown"
                                renderHeader={backAction =>
                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                        <Button transparent small onPress={backAction}>
                                            <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                        </Button>
                                        {listCountries.length
                                            ? <Item style={{ backgroundColor: colorsPalette.gradientGray }}>
                                                <Icon name="ios-search" />
                                                <Input
                                                    allowFontScaling={false}
                                                    placeholder="Filter"
                                                    value={inputTextCountry}
                                                    onChangeText={(value) => this.setState({ inputTextCountry: value })} />
                                                <Icon type="MaterialCommunityIcons" name="earth" style={{ fontSize: wp(4) }} />
                                            </Item>
                                            : <Item style={{ backgroundColor: colorsPalette.secondaryColor }}>
                                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', top: 2 }}>Countries not available</Text>
                                            </Item>}
                                    </Header>}
                                headerBackButtonTextStyle={{ color: colorsPalette.primaryColor, fontSize: wp(5) }}
                                headerTitleStyle={{ color: colorsPalette.primaryColor }}
                                headerStyle={{ backgroundColor: colorsPalette.secondaryColor, borderBottomColor: colorsPalette.secondaryColor }}
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
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont }}>State</Text>
                                </Body>
                                <Right>
                                    <Text allowFontScaling={false}>{location.state !== "Not specified" ? location.state : 'Not specified'}</Text>
                                </Right>
                            </ListItem>
                            <Picker
                                style={{ position: 'absolute', bottom: 0, width: '100%' }}
                                textStyle={{ color: colorsPalette.transparent }}
                                mode="dropdown"
                                renderHeader={backAction =>
                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                        <Button transparent small onPress={backAction}>
                                            <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                        </Button>
                                        {listRegions.length
                                            ? <Item style={{ backgroundColor: colorsPalette.gradientGray }}>
                                                <Icon name="ios-search" />
                                                <Input
                                                    allowFontScaling={false}
                                                    placeholder="Filter"
                                                    value={inputTextRegions}
                                                    onChangeText={(value) => this.setState({ inputTextRegions: value })} />
                                                <Icon type="Foundation" name="map" style={{ fontSize: wp(4) }} />
                                            </Item>
                                            : <Item style={{ backgroundColor: colorsPalette.secondaryColor }}>
                                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', top: 2 }}>Regions not available</Text>
                                            </Item>}
                                    </Header>}
                                iosHeader="SELECT REGION"
                                headerBackButtonTextStyle={{ color: colorsPalette.primaryColor, fontSize: wp(5) }}
                                headerTitleStyle={{ color: colorsPalette.primaryColor }}
                                headerStyle={{ backgroundColor: colorsPalette.secondaryColor, borderBottomColor: colorsPalette.secondaryColor }}
                                selectedValue={location.state}
                                onValueChange={(value) => this.setState({ location: { ...location, state: value } })}>
                                {filterRegionList.length
                                    ? filterRegionList.map((item, key) => <Picker.Item key={key} label={item.region} value={item.region} />)
                                    : null}
                            </Picker>

                            {/* CITIES */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#0277BD" }}>
                                        <Icon type="MaterialIcons" name="location-city" />
                                    </Button>
                                </Left>
                                <Body style={{ borderBottomColor: 'transparent' }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont }}>City</Text>
                                </Body>
                                <Right style={{ borderBottomColor: 'transparent' }}>
                                    <Text allowFontScaling={false}>{location.city !== "Not specified" ? location.city : 'Not specified'}</Text>
                                </Right>
                            </ListItem>
                            <Picker
                                style={{ position: 'absolute', bottom: 0, width: '100%' }}
                                textStyle={{ color: colorsPalette.transparent }}
                                mode="dropdown"
                                renderHeader={backAction =>
                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                        <Button transparent small onPress={backAction}>
                                            <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                        </Button>
                                        {listCities && listCities.length
                                            ? <Item style={{ backgroundColor: colorsPalette.gradientGray }}>
                                                <Icon name="ios-search" />
                                                <Input
                                                    allowFontScaling={false}
                                                    placeholder="Filter"
                                                    value={inputTextCities}
                                                    onChangeText={(value) => this.setState({ inputTextCities: value })} />
                                                <Icon type="MaterialIcons" name="location-city" style={{ fontSize: wp(4) }} />
                                            </Item>
                                            : <Item style={{ backgroundColor: colorsPalette.secondaryColor }}>
                                                <Text allowFontScaling={false} style={{ fontWeight: 'bold', top: 2 }}>Cities not available</Text>
                                            </Item>}
                                    </Header>}
                                headerBackButtonTextStyle={{ color: colorsPalette.primaryColor, fontSize: wp(5) }}
                                headerTitleStyle={{ color: colorsPalette.primaryColor }}
                                headerStyle={{ backgroundColor: colorsPalette.secondaryColor, borderBottomColor: colorsPalette.secondaryColor }}
                                selectedValue={location.city}
                                onValueChange={(value) => this.setState({ location: { ...location, city: value } })}>
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
                                <Title allowFontScaling={false} style={{ color: colorsPalette.primaryColor, fontSize: wp(7) }}>Company Name</Title>
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
                                        color: companyName ? colorsPalette.primaryColor : colorsPalette.thirdColor
                                    }}>{
                                            companyName ? "DONE" : "CANCEL"
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
                                        placeholderTextColor={colorsPalette.gradientGray}
                                        maxLength={20}
                                        autoFocus={true}
                                        value={companyName}
                                        keyboardType="ascii-capable"
                                        selectionColor={colorsPalette.primaryColor}
                                        onChangeText={(value) => this.setState({ companyName: value })} />
                                </Body>
                                <Right />
                            </ListItem>
                        </Content>
                    </Container>
                </Modal>

            </Container>
        );
    }
}

export default withNavigation(AboutYou)