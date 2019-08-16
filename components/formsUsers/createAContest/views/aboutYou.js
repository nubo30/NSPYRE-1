import React, { Component } from 'react';
import { Dimensions, Alert, Modal, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Input, Item, Spinner, Picker, Separator } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'lodash'
import { normalizeEmail } from 'validator'
import moment from 'moment'
import axios from 'axios'

// Gradients
import { GadrientsAuth } from '../../../Global/gradients'
import { MyStatusBar } from '../../../Global/statusBar'

// Static data
import { ocuppationList } from '../../../Global/data'

// Countries data
import countries from '../../../../assets/data/countries.json'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutYou extends Component {
    state = {
        // Inputs
        location: {
            street: "",
            countryIndex: 0,
            regionIndex: 0,
            city: "Not specified",
            state: "Not specified",
            country: "Not specified",
        },
        companyName: "",
        titleInTheCompany: 'Not specified',

        inputTextTitleIntheCompany: "",

        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },

        // Modal
        visibleModalLocation: false,
        visibleModalCompanyname: false,
        visibleModalTitleInTheCompany: false,

        // Data API
        listCountries: [],
        listCities: []
    }

    componentDidMount() {
        // this._getCountry()
    }

    componentWillUpdate(nextProps, nextState) {
        // if (nextState.location.country !== this.state.location.country) {
        //     this._getCity(nextState.location.country)
        // }
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
    _visibleModalLocation = (visible) => this.setState({ visibleModalLocation: visible })
    _visibleModalCompanyname = (visible) => this.setState({ visibleModalCompanyname: visible })
    _visibleModalTitleInTheCompany = (visible) => this.setState({ visibleModalTitleInTheCompany: visible })

    // Send Data to AWS
    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms, userData } = this.props
        const { location, companyName, titleInTheCompany } = this.state
        const data = { aboutTheUser: { location, companyName, titleInTheCompany }, createContestUserId: userData.sub, createdAt: moment().toISOString() }
        try {
            await _dataFromForms(data)
            await _indexChangeSwiper(1)
        } catch (error) {
            console.log(error)
        } finally {
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

            inputTextTitleIntheCompany,

            // modal
            visibleModalLocation,
            visibleModalCompanyname,

            // Data API
            listCountries,
            listCities
        } = this.state
        const { userData, navigation } = this.props

        let filterOcuppationList = ocuppationList.filter((item) => { return item.toLowerCase().indexOf(_.lowerCase(inputTextTitleIntheCompany)) !== -1 })


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
                            <Text style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Let's get started!</Text> {'\n'}Tell us a little about yourself!
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
                                                <Icon type="Ionicons" name="md-person" />
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
                                                <Icon type="Foundation" name="telephone" />
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
                                                <Icon type="Ionicons" name="md-mail" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Email</Text>
                                        </Body>
                                        <Right>
                                            <Text>{userData.email === undefined ? null : normalizeEmail(userData.email)}</Text>
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
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Location</Text>
                                        </Body>
                                        <Right>
                                            <Text>{location.street && location.city && location.state && location.country ? "Street, City, State, Cou..." : "Not specified"}</Text>
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
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Company Name</Text>
                                        </Body>
                                        <Right>
                                            <Text>{companyName ? _.truncate(companyName, { separator: '...', length: 15 }) : "Not specified"}</Text>
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
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Title in the company</Text>
                                            {isLoading ? null :
                                                <Picker
                                                    renderHeader={backAction =>
                                                        <Header searchBar transparent rounded style={{ left: -20 }}>
                                                            <Button transparent small onPress={backAction}>
                                                                <Text style={{ color: '#D81B60', fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                                            </Button>
                                                            <Item style={{ backgroundColor: '#F5F5F5' }}>
                                                                <Icon name="ios-search" />
                                                                <Input
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
                                            <Text>{titleInTheCompany}</Text>
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
                            <Title style={{ color: "#E91E63", fontSize: wp(7), top: 5, alignSelf: 'flex-start' }}>Location</Title>
                        </Header>

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
                                <Text style={{ color: '#333' }}>Country</Text>
                            </Body>
                            <Right>
                                <Text>{location.country !== "Not specified" ? location.country : 'Not specified'}</Text>
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
                            selectedValue={location.country}
                            onValueChange={(value) => this.setState({ location: { ...location, country: value.name, countryIndex: value.index }})}>
                            {countries.map((item, key) => <Picker.Item key={key} label={item.name} value={{name: item.name, index: key}} />)}
                        </Picker>

                        {/* STATES */}
                        <ListItem last icon>
                            <Left>
                                <Button style={{ backgroundColor: "#27ae60" }}>
                                    <Icon type="Foundation" name="map" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={{ color: '#333' }}>State</Text>
                            </Body>
                            <Right>
                                <Text>{location.state !== "Not specified" ? location.state : 'Not specified'}</Text>
                            </Right>
                        </ListItem>
                        <Picker
                            style={{ position: 'absolute', bottom: 0, width: '100%' }}
                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                            mode="dropdown"
                            iosHeader="SELECT REGION"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            selectedValue={location.state}
                            onValueChange={(value) => this.setState({ location: { ...location, state: value.name, regionIndex: value.index } })}>
                            {countries[location.countryIndex].states.map((item, key) => 
                                <Picker.Item key={key} label={item.region} value={{name: item.region, index: key}} />
                            )}
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
                                <Text>{location.city !== "Not specified" ? location.city : 'Not specified'}</Text>
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
                            selectedValue={location.city}
                            onValueChange={(value) => this.setState({ location: { ...location, city: value } })}>
                            {countries[location.countryIndex].states[location.regionIndex].cities.map((item, key) => 
                                <Picker.Item key={key} label={item.city} value={item.city} />
                            )}
                        </Picker>

                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => {
                                        this.setState({
                                            location: {
                                                street: "",
                                                state: "",
                                                city: "Not specified",
                                                country: "Not specified"
                                            }
                                        }); this._visibleModalLocation(false)
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
                                    disabled={location.street !== "" && location.city !== "" && location.state !== "Not specified" && location.country !== "Not specified" ? false : true}
                                    onPress={() => this._visibleModalLocation(false)}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: location.street && location.city && location.state !== "Not specified" && location.country !== "Not specified" ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
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
                                    <Text style={{ color: companyName ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
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