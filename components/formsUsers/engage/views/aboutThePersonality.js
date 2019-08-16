import React, { Component } from 'react';
import { Dimensions, Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Spinner, Picker, Separator } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import { normalizeEmail } from 'validator'
import moment from 'moment'
import axios from 'axios'
import AnimateNumber from 'react-native-animate-number'
import DateTimePicker from 'react-native-modal-datetime-picker';

// Data
import { sexualityList, maritalStatusList, regionalIdentityList, nacionality as nacionalityList, parentalConditionList } from '../../../Global/data/index'

// Gradients
import { GadrientsAuth } from '../../../Global/gradients/index'
import { MyStatusBar } from '../../../Global/statusBar/index'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutThePersonality extends Component {
    state = {
        // Data
        location: {
            born: {
                country: 'Not specified',
                city: 'Not specified'
            },
            currentPlace: {
                country: 'Not specified',
                city: 'Not specified'
            }
        },
        gender: 'Not specified',
        birthDate: 'Not specified',
        sexuality: 'Not specified',
        maritalStatus: 'Not specified',
        regionalIdentity: 'Not specified',
        nacionality: 'Not specified',
        parentalCondition: 'Not specified',
        amountOfSimblings: "Not specified",
        amountOfChildren: 'Not specified',

        // Poins
        coinGender: 0,
        coinBirthDate: 0,
        coinSexuality: 0,
        coinMaritalStatus: 0,
        coinRegionalIdentity: 0,
        coinNacionality: 0,
        coinParentalCondition: 0,
        coinAmountOfSimblings: 0,
        coinAmountOfChildren: 0,


        // Inputs
        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },

        // Modal
        visibleModalLocation: false,
        datePickerAction: false,

        // Data API
        listCountries: [],
        listCities: []
    }

    componentDidMount() {
        this._getCountry()
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.location.born.country !== this.state.location.born.country) {
            this._getCity(nextState.location.born.country)
        }
        if (nextState.location.currentPlace.country !== this.state.location.currentPlace.country) {
            this._getCity(nextState.location.currentPlace.country)
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

    // Modals
    _visibleModalLocation = (visible) => { this.setState({ visibleModalLocation: visible }) }


    // Send Data to AWS
    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms, userData } = this.props
        const { location, gender, birthDate, sexuality, maritalStatus, regionalIdentity, nacionality, parentalCondition, amountOfSimblings, amountOfChildren } = this.state
        const dataCoins = {
            coinsPersonality: _.sum([coinLocation,
                coinGender,
                coinBirthDate,
                coinSexuality,
                coinMaritalStatus,
                coinRegionalIdentity,
                coinNacionality,
                coinParentalCondition,
                coinAmountOfSimblings,
                coinAmountOfChildren])
        }
        const data = {
            aboutThePersonality: { location, gender, birthDate, sexuality, maritalStatus, regionalIdentity, nacionality, parentalCondition, amountOfSimblings, amountOfChildren },
            engageUserId: userData.sub, createdAt: moment().toISOString()
        }
        try {
            await _dataFromForms(data, dataCoins)
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
            await _indexChangeSwiper(1)
        } catch (error) {
            alert(error)
            this.setState({ isLoading: false, messageFlash: { cognito: { message: "" } } })
        }
    }

    _validateForm = () => {
        const { location, gender, birthDate, sexuality, maritalStatus, regionalIdentity, nacionality, amountOfSimblings, parentalCondition, amountOfChildren } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            location.born.city !== 'Not specified' && location.born.city !== 'Not specified' && location.currentPlace.city !== 'Not specified' && location.currentPlace.city !== 'Not specified'
                ? gender !== 'Not specified'
                    ? birthDate !== 'Not specified'
                        ? sexuality !== 'Not specified'
                            ? maritalStatus !== 'Not specified'
                                ? regionalIdentity !== 'Not specified'
                                    ? nacionality !== 'Not specified'
                                        ? parentalCondition !== 'Not specified'
                                            ? amountOfSimblings !== 'Not specified'
                                                ? amountOfChildren !== 'Not specified'
                                                    ? this._submit()
                                                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid amount of childrens" } } })
                                                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid amount of simblings" } } })
                                            : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid parent's conditional" } } })
                                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid nacionality" } } })
                                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid regional indentify" } } })
                                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid marital status" } } })
                            : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid sexuality" } } })
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid birthdate" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid gender" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid location" } } })
        }, 500);
    }

    render() {
        const {
            // Data
            location,
            gender,
            birthDate,
            sexuality,
            maritalStatus,
            regionalIdentity,
            nacionality,
            parentalCondition,
            amountOfSimblings,
            amountOfChildren,

            isvalidFormAnimation,
            isLoading,
            messageFlash,

            // Coins
            coinLocation,
            coinGender,
            coinBirthDate,
            coinSexuality,
            coinMaritalStatus,
            coinRegionalIdentity,
            coinNacionality,
            coinParentalCondition,
            coinAmountOfSimblings,
            coinAmountOfChildren,

            // modal
            visibleModalLocation,
            datePickerAction,

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
                    <Right>
                        <AnimateNumber
                            style={{ color: "#FFF", fontSize: wp(5), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}
                            value={_.sum([coinLocation,
                                coinGender,
                                coinBirthDate,
                                coinSexuality,
                                coinMaritalStatus,
                                coinRegionalIdentity,
                                coinNacionality,
                                coinParentalCondition,
                                coinAmountOfSimblings,
                                coinAmountOfChildren])}
                            interval={10}
                            countBy={5}
                            formatter={(val) => {
                                return 'Coins earned ' + parseFloat(val).toFixed(0)
                            }} />
                    </Right>
                </Header>

                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text style={{ fontSize: wp(4.5), color: isLoading ? '#EEEEEE' : '#FFF', fontWeight: '100' }}>
                            <Text style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Let's get started!</Text> {'\n'}Tell us about yourself and a little more! 🤗
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

                                    {/* BIRHTDAY */}
                                    <ListItem last disabled={isLoading} icon onPress={() => this.setState({ datePickerAction: true })} style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FFD600" }}>
                                                <Icon type="MaterialIcons" name="child-care" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Birthdate</Text>
                                        </Body>
                                        <Right>
                                            <Text>{birthDate !== 'Not specified' ? moment(new Date(birthDate)).calendar() : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        <DateTimePicker
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType="fade"
                                            androidMode={"spinner"}
                                            titleIOS=""
                                            textStyle={{ color: "#333", fontWeight: '100' }}
                                            placeHolderTextStyle={{ color: '#333' }}
                                            minimumDate={new Date(1970, 1, 1)}
                                            maximumDate={new Date()}
                                            isVisible={datePickerAction}
                                            onConfirm={(value) => this.setState({ birthDate: value, datePickerAction: false, coinBirthDate: 100 })}
                                            onCancel={() => this.setState({ datePickerAction: false, coinBirthDate: 0, birthDate: "Not specified" })}
                                        />
                                    </ListItem>

                                    <Separator bordered />

                                    {/* LOCALIDAD */}
                                    <ListItem disabled={isLoading} icon onPress={() => this._visibleModalLocation(true)}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#D500F9" }}>
                                                <Icon type="Entypo" name="location-pin" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Location</Text>
                                        </Body>
                                        <Right>
                                            <Text>{location.born.country !== 'Not specified' ? 'Specified' : 'Not specified'}</Text>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* REGION*/}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#00897B" }}>
                                                <Icon type="FontAwesome" name="globe" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>What region do you identify with?</Text>
                                        </Body>
                                        <Right>
                                            <Text>{regionalIdentity === 'Not specified' ? 'Not specified' : _.truncate(regionalIdentity, { length: 20, separate: '...' })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={regionalIdentity}
                                                onValueChange={(value) => this.setState({ regionalIdentity: value, coinRegionalIdentity: 100 })}>
                                                {regionalIdentityList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                            </Picker>}
                                    </ListItem>

                                    {/* NACIONALITY */}
                                    <ListItem last icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#6200EA" }}>
                                                <Icon type="MaterialCommunityIcons" name="earth" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>What nacionality do you identify with?</Text>
                                        </Body>
                                        <Right>
                                            <Text>{nacionality === 'Not specified' ? 'Not specified' : nacionality}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={nacionality}
                                                onValueChange={(value) => this.setState({ nacionality: value, coinNacionality: 50 })}>
                                                {nacionalityList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                            </Picker>}
                                    </ListItem>

                                    <Separator bordered />

                                    {/* GENDER */}
                                    <ListItem icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#90A4AE" }}>
                                                <Icon type="MaterialCommunityIcons" name="gender-male-female" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>What gender do you identify with?</Text>
                                        </Body>
                                        <Right>
                                            <Text>{gender === 'Not specified' ? 'Not specified' : gender}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={gender}
                                                onValueChange={(value) => this.setState({ gender: value, coinGender: 50 })}>
                                                <Picker.Item label="Male" value="Male" />
                                                <Picker.Item label="Famale" value="Famale" />
                                                <Picker.Item label="Other" value="Other" />
                                                <Picker.Item label="Do not specify" value="Not specified" />
                                            </Picker>}
                                    </ListItem>

                                    {/* SEXUALITY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#D81B60" }}>
                                                <Icon type="FontAwesome" name="genderless" style={{ fontSize: wp(8), top: -4, left: 1.5 }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Identify according to your sexual preference</Text>
                                        </Body>
                                        <Right>
                                            <Text>{sexuality === 'Not specified' ? 'Not specified' : sexuality}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={gender}
                                                onValueChange={(value) => this.setState({ sexuality: value, coinSexuality: 50 })}>
                                                {sexualityList[0].children.map((item, key) => <Picker.Item key={key} label={item.name} value={item.name} />)}
                                            </Picker>}
                                    </ListItem>

                                    {/* MARITAL STATUS */}
                                    <ListItem last icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#00BCD4" }}>
                                                <Icon type="Entypo" name="slideshare" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>What is your marital status?</Text>
                                        </Body>
                                        <Right>
                                            <Text>{maritalStatus === 'Not specified' ? 'Not specified' : maritalStatus}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={maritalStatus}
                                                onValueChange={(value) => this.setState({ maritalStatus: value, coinMaritalStatus: 50 })}>
                                                {maritalStatusList[0].children.map((item, key) => <Picker.Item key={key} label={item.name} value={item.name} />)}
                                            </Picker>}
                                    </ListItem>

                                    <Separator bordered />

                                    {/* PARENT'S CONDITION */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#EF5350" }}>
                                                <Icon type="Feather" name="users" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Parent's conditional</Text>
                                        </Body>
                                        <Right>
                                            <Text>{parentalCondition === 'Not specified' ? 'Not specified' : _.truncate(parentalCondition, { length: 15, separate: '...' })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 150, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={parentalCondition}
                                                onValueChange={(value) => this.setState({ parentalCondition: value, coinParentalCondition: 50 })}>
                                                {parentalConditionList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                            </Picker>}
                                    </ListItem>

                                    {/* AMOUNT OF SIMBLINGS */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#AA00FF" }}>
                                                <Icon type="Entypo" name="users" style={{ fontSize: wp(5) }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Amount of simblings</Text>
                                        </Body>
                                        <Right>
                                            <Text>{amountOfSimblings === 'Not specified' ? 'Not specified' : _.truncate(amountOfSimblings, { length: 15, separate: '...' })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 150, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={parentalCondition}
                                                onValueChange={(value) => this.setState({ amountOfSimblings: value, coinAmountOfSimblings: 25 })}>
                                                {_.range(6).map(item => <Picker.Item key={item} label={`${item}`} value={item} />)}
                                            </Picker>}
                                    </ListItem>

                                    {/* AMOUNT OF CHILDREN */}
                                    <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#1E88E5" }}>
                                                <Icon type="FontAwesome" name="child" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Amount of childrens</Text>
                                        </Body>
                                        <Right>
                                            <Text>{amountOfChildren === 'Not specified' ? 'Not specified' : _.startCase(_.lowerCase(amountOfChildren))}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="SELECT ONE"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 0, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={amountOfChildren}
                                                onValueChange={(value) => this.setState({ amountOfChildren: value, coinAmountOfChildren: 25 })}>
                                                {_.range(6).map(item => <Picker.Item key={item} label={`${item}`} value={item} />)}
                                            </Picker>}
                                    </ListItem>

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
                                backgroundColor: '#E91E63',
                                shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1
                            }}>
                            <Text style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#EEEEEE" : "#FFF" }}>Continue</Text>
                            {isLoading ? <Spinner color={isLoading ? "#EEEEEE" : "#FFF"} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>

                {/* LOCATION */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalLocation}
                    animationType="slide"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView
                        keyboardShouldPersistTaps={'always'}
                        enabled
                        behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", }}>
                            <Left style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', left: 10 }}>
                                <Button transparent
                                    onPress={() => {
                                        this.setState({
                                            coinLocation: 0,
                                            location: {
                                                born: {
                                                    country: 'Not specified',
                                                    city: 'Not specified'
                                                },
                                                currentPlace: {
                                                    country: 'Not specified',
                                                    city: 'Not specified'
                                                }
                                            }
                                        });
                                        this._visibleModalLocation(false)
                                    }}>
                                    <Text style={{ color: '#E91E63' }}>Back</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Title style={{ color: "#E91E63", fontSize: wp(7) }}>Location</Title>
                            </Body>
                            <Right>
                                <Button transparent
                                    disabled={location.born.country !== 'Not specified' &&
                                        location.born.city !== 'Not specified' &&
                                        location.currentPlace.country !== 'Not specified' &&
                                        location.currentPlace.city !== 'Not specified' ? false : true}
                                    onPress={() => {
                                        this._visibleModalLocation(false);
                                        this.setState({ coinLocation: 150 })
                                    }}>
                                    <Text style={{
                                        color: location.born.country !== 'Not specified' &&
                                            location.born.city !== 'Not specified' &&
                                            location.currentPlace.country !== 'Not specified' &&
                                            location.currentPlace.city !== 'Not specified' ? "#D81B60" : '#E0E0E0'
                                    }}>ACCEPT</Text>
                                </Button>
                            </Right>
                        </Header>

                        {/* COUNTRY */}
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#E65100" }}>
                                    <Icon type="MaterialCommunityIcons" name="earth" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={{ color: '#333' }}>Country of birth?</Text>
                            </Body>
                            <Right>
                                <Text>{listCountries.length ? location.born.country : 'Not specified'}</Text>
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
                            selectedValue={location.born.country}
                            onValueChange={(value) => this.setState({ location: { ...location, born: { ...location.born, country: value } } })}>
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
                                <Text style={{ color: '#333' }}>City of birth?</Text>
                            </Body>
                            <Right>
                                <Text>{listCities.length ? location.born.city : 'Not specified'}</Text>
                            </Right>
                        </ListItem>
                        {location.born.country === 'Not specified' ? null : <Picker
                            style={{ position: 'absolute', bottom: 0, width: '100%' }}
                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                            mode="dropdown"
                            iosHeader="SELECT CITY"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            selectedValue={location.born.city}
                            onValueChange={(value) => this.setState({ location: { ...location, born: { ...location.born, city: value } } })}>
                            {listCities.map((item, key) => <Picker.Item key={key} label={item.region} value={item.region} />)}
                        </Picker>}


                        <Separator bordered style={{ maxHeight: 40 }} />


                        {/* COUNTRY */}
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#00B8D4" }}>
                                    <Icon type="MaterialCommunityIcons" name="earth" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={{ color: '#333' }}>Current country?</Text>
                            </Body>
                            <Right>
                                <Text>{listCountries.length ? location.currentPlace.country : 'Not specified'}</Text>
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
                            selectedValue={location.currentPlace.country}
                            onValueChange={(value) => this.setState({ location: { ...location, currentPlace: { ...location.currentPlace, country: value } } })}>
                            {listCountries.map((item, key) => <Picker.Item key={key} label={item.name} value={item.name} />)}
                        </Picker>

                        {/* CITIES */}
                        <ListItem last icon>
                            <Left>
                                <Button style={{ backgroundColor: "#00BFA5" }}>
                                    <Icon type="MaterialIcons" name="location-city" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={{ color: '#333' }}>Current city?</Text>
                            </Body>
                            <Right>
                                <Text>{listCities.length ? location.currentPlace.city : 'Not specified'}</Text>
                            </Right>
                        </ListItem>
                        {location.currentPlace.country === 'Not specified' ? null : <Picker
                            style={{ position: 'absolute', bottom: 0, width: '100%' }}
                            textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                            mode="dropdown"
                            iosHeader='SELECT CITY'
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            selectedValue={location.currentPlace.city}
                            onValueChange={(value) => this.setState({ location: { ...location, currentPlace: { ...location.currentPlace, city: value } } })}>
                            {listCities.map((item, key) => <Picker.Item key={key} label={item.region} value={item.region} />)}
                        </Picker>}
                    </KeyboardAvoidingView>
                </Modal>
            </Container>
        );
    }
}

export default withNavigation(AboutThePersonality)