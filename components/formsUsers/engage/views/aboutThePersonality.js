import React, { Component } from 'react';
import { Dimensions, Modal, Keyboard } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Container, Input, Header, Item, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Spinner, Picker, Separator } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import sum from 'lodash/sum'
import startCase from 'lodash/startCase'
import lowerCase from 'lodash/lowerCase'
import truncate from 'lodash/truncate'
import range from 'lodash/range'
import { normalizeEmail } from 'validator'
import moment from 'moment'
import AnimateNumber from 'react-native-animate-number'
import DateTimePicker from 'react-native-modal-datetime-picker';

// Data
import { sexualityList, maritalStatusList, regionalIdentityList, nacionality as nacionalityList, parentalConditionList } from '../../../global/data/global'
// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutThePersonality extends Component {
    state = {
        // Data
        location: {
            street: "",
            country: "Not specified",
            state: "Not specified",
            city: "Not specified",
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
        inputTextTitleIntheCompany: "",
        inputTextCountry: "",
        inputTextCities: "",

        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },

        // Modal
        visibleModalLocation: false,
        datePickerAction: false,

        // Data API
        dataCountries: [],
        listCountries: [],
        listRegions: [],
        listCities: []
    }

    componentDidMount() {
        this._getCountry()
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

    componentWillUpdate(nextProps, nextState) {
        if (nextState.location.country !== this.state.location.country) { this._getRegions(nextState.location.country) }
        if (nextState.location.state !== this.state.location.state) { this._getCities(nextState.location.state) }
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

    // Modals
    _visibleModalLocation = (visible) => { this.setState({ visibleModalLocation: visible }) }


    // Send Data to AWS
    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms, userData } = this.props
        const {
            /// Coins
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
            location, gender, birthDate, sexuality, maritalStatus, regionalIdentity, nacionality, parentalCondition, amountOfSimblings, amountOfChildren } = this.state
        const dataCoins = {
            coinsPersonality: sum([
                coinLocation,
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
            expoPushToken: userData.notificationToken === undefined || userData.notificationToken === null ? null : userData.notificationToken,
            aboutThePersonality: { location, gender, birthDate, sexuality, maritalStatus, regionalIdentity, nacionality, parentalCondition, amountOfSimblings, amountOfChildren },
            engageUserId: userData.id, createdAt: moment().toISOString()
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
            location.city !== 'Not specified'
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

            // Inputs
            inputTextRegions,
            inputTextCountry,
            inputTextCities,

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
            listRegions,
            listCities
        } = this.state
        const { userData, navigation } = this.props
        let filterRegionList = listRegions && listRegions.filter((item) => { return item.region.toLowerCase().indexOf(lowerCase(inputTextRegions)) !== -1 })
        let filterCounttriesList = listCountries && listCountries.filter((item) => { return item.toLowerCase().indexOf(lowerCase(inputTextCountry)) !== -1 })
        let filterCitiesList = listCities && listCities.filter((item) => { return item.city.toLowerCase().indexOf(lowerCase(inputTextCities)) !== -1 })

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
                    <Right>
                        <AnimateNumber
                            allowFontScaling={false}
                            style={{ color: "#FFF", fontSize: wp(4), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}
                            value={sum([coinLocation,
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
                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: isLoading ? '#EEEEEE' : '#FFF' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Let's get started!</Text> {'\n'}Tell us about yourself and a little more! 🤗
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{userData && startCase(lowerCase(userData.name))}</Text>
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
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{userData && startCase(lowerCase(userData.lastname))}</Text>
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
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{userData && userData.phone === null ? 'Not Specified' : userData.phone}</Text>
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
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{userData.email === undefined ? null : normalizeEmail(userData.email)}</Text>
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Birthdate</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{birthDate !== 'Not specified' ? moment(new Date(birthDate)).calendar() : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        <DateTimePicker
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType="fade"
                                            androidMode={"spinner"}
                                            titleIOS=""
                                            textStyle={{ color: "#000" }}
                                            placeHolderTextStyle={{ color: '#000' }}
                                            minimumDate={new Date(1970, 1, 1)}
                                            maximumDate={new Date()}
                                            isVisible={datePickerAction}
                                            onConfirm={(value) => this.setState({ birthDate: value, datePickerAction: false, coinBirthDate: 100 })}
                                            onCancel={() => this.setState({ datePickerAction: false, coinBirthDate: 0, birthDate: "Not specified" })}
                                        />
                                    </ListItem>

                                    <Separator bordered />


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
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{location.street && location.city && location.state && location.country ? "Specified" : "Not specified"}</Text>
                                            <Icon active name="arrow-forward" />
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Which identity do you most strongly associate with?</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{regionalIdentity === 'Not specified' ? 'Not specified' : truncate(regionalIdentity, { length: 20, separate: '...' })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute', width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    selectedValue={regionalIdentity}
                                                    onValueChange={(value) => this.setState({ regionalIdentity: value, coinRegionalIdentity: 100 })}>
                                                    {regionalIdentityList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                                </Picker>
                                            </View>}
                                    </ListItem>

                                    {/* NACIONALITY */}
                                    <ListItem last icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#6200EA" }}>
                                                <Icon type="MaterialCommunityIcons" name="earth" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>What nacionality do you identify with?</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{nacionality === 'Not specified' ? 'Not specified' : nacionality}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute', width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    selectedValue={nacionality}
                                                    onValueChange={(value) => this.setState({ nacionality: value, coinNacionality: 50 })}>
                                                    {nacionalityList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                                </Picker>
                                            </View>
                                        }
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>What gender do you identify with?</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{gender === 'Not specified' ? 'Not specified' : gender}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute', width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    selectedValue={gender}
                                                    onValueChange={(value) => this.setState({ gender: value, coinGender: 50 })}>
                                                    <Picker.Item label="Male" value="Male" />
                                                    <Picker.Item label="Famale" value="Famale" />
                                                    <Picker.Item label="Other" value="Other" />
                                                </Picker>
                                            </View>
                                        }
                                    </ListItem>

                                    {/* SEXUALITY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#D81B60" }}>
                                                <Icon type="FontAwesome" name="genderless" style={{ fontSize: wp(8), top: -4, left: 1.5 }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Identify according to your sexual preference</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{sexuality === 'Not specified' ? 'Not specified' : sexuality}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute', width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    selectedValue={gender}
                                                    onValueChange={(value) => this.setState({ sexuality: value, coinSexuality: 50 })}>
                                                    {sexualityList[0].children.map((item, key) => <Picker.Item key={key} label={item.name} value={item.name} />)}
                                                </Picker>
                                            </View>
                                        }
                                    </ListItem>

                                    {/* MARITAL STATUS */}
                                    <ListItem last icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#00BCD4" }}>
                                                <Icon type="Entypo" name="slideshare" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>What is your marital status?</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{maritalStatus === 'Not specified' ? 'Not specified' : maritalStatus}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute', width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    selectedValue={maritalStatus}
                                                    onValueChange={(value) => this.setState({ maritalStatus: value, coinMaritalStatus: 50 })}>
                                                    {maritalStatusList[0].children.map((item, key) => <Picker.Item key={key} label={item.name} value={item.name} />)}
                                                </Picker>
                                            </View>
                                        }
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
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Parent's conditional</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{parentalCondition === 'Not specified' ? 'Not specified' : truncate(parentalCondition, { length: 15, separate: '...' })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute', width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    selectedValue={parentalCondition}
                                                    onValueChange={(value) => this.setState({ parentalCondition: value, coinParentalCondition: 50 })}>
                                                    {parentalConditionList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                                </Picker>
                                            </View>
                                        }
                                    </ListItem>

                                    {/* AMOUNT OF SIMBLINGS */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#AA00FF" }}>
                                                <Icon type="Entypo" name="users" style={{ fontSize: wp(5) }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Amount of simblings</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{amountOfSimblings === 'Not specified' ? 'Not specified' : truncate(amountOfSimblings, { length: 15, separate: '...' })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute', width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    selectedValue={parentalCondition}
                                                    onValueChange={(value) => this.setState({ amountOfSimblings: value, coinAmountOfSimblings: 25 })}>
                                                    {range(11).map(item => <Picker.Item key={item} label={`${item}`} value={item} />)}
                                                </Picker>
                                            </View>
                                        }
                                    </ListItem>

                                    {/* AMOUNT OF CHILDREN */}
                                    <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#1E88E5" }}>
                                                <Icon type="FontAwesome" name="child" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4) }}>Amount of childrens</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }} >{amountOfChildren === 'Not specified' ? 'Not specified' : startCase(lowerCase(amountOfChildren))}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <View style={{ position: 'absolute', width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosHeader="SELECT ONE"
                                                    headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                    headerTitleStyle={{ color: "#D81B60" }}
                                                    headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                    textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                    selectedValue={amountOfChildren}
                                                    onValueChange={(value) => this.setState({ amountOfChildren: value, coinAmountOfChildren: 25 })}>
                                                    {range(11).map(item => <Picker.Item key={item} label={`${item}`} value={item} />)}
                                                </Picker>
                                            </View>
                                        }
                                    </ListItem>

                                </List>
                            </Content>
                        </View>
                        <Text allowFontScaling={false} style={{ color: '#F44336', fontSize: wp(3), top: 10 }}>
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
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Location</Title>
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
                                        color: location.street && location.country !== 'Not specified' && location.state !== "Not specified" && location.city !== 'Not specified' ? "#E91E63" : "#3333"
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
                                                <Button small transparent style={{ alignSelf: 'flex-end', top: 3, right: -50 }} onPress={() => this._getCountry()}>
                                                    <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Reload</Text>
                                                </Button>
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
                                                <Button small transparent style={{ alignSelf: 'flex-end', top: 3, right: -50 }} onPress={() => this._getRegions()}>
                                                    <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Reload</Text>
                                                </Button>
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
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#0277BD" }}>
                                        <Icon type="MaterialIcons" name="location-city" />
                                    </Button>
                                </Left>
                                <Body style={{ borderBottomColor: 'transparent' }}>
                                    <Text allowFontScaling={false} style={{ color: '#333' }}>City</Text>
                                </Body>
                                <Right style={{ borderBottomColor: 'transparent' }}>
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
                                                <Button small transparent style={{ alignSelf: 'flex-end', top: 3, right: -50 }} onPress={() => this._getCities()}>
                                                    <Text allowFontScaling={false} style={{ color: colorsPalette.primaryColor }}>Reload</Text>
                                                </Button>
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

                        </Content>
                    </Container>
                </Modal>

            </Container>
        );
    }
}

export default withNavigation(AboutThePersonality)