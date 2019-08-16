import React, { PureComponent } from 'react';
import { Dimensions, Alert } from 'react-native'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Spinner, Picker, Item, Input, Separator } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import axios from 'axios'
import AnimateNumber from 'react-native-animate-number'

// Gradients
import { GadrientsAuth } from '../../../Global/gradients'
import { MyStatusBar } from '../../../Global/statusBar'

// Data
import { levelachievedList, ocuppationList, socioeconomicLevelList, rentOrOwnCarList, rentOrOwnHouseList } from '../../../Global/data/index'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AbouttheirOccupations extends PureComponent {
    state = {
        // Data
        schools: 'Not specified',
        university: 'Not specified',
        levelAchivied: 'Not specified',
        occupation: 'Not specified',
        socioeconomicLevel: 'Not specified',
        rentOrOwnCar: 'Not specified',
        rentOrOwnHouse: 'Not specified',

        // Coins
        coinSchools: 0,
        coinUniversity: 0,
        coinLevelAchivied: 0,
        coinOccupation: 0,
        coinSocioeconomicLevel: 0,
        coinRentOrOwnCar: 0,
        coinRentOrOwnHouse: 0,

        // Inputs
        inputTextUniversity: "",
        inputTextSchools: "",
        inputTextOcuppation: '',

        isvalidFormAnimation: false,
        isLoading: false,
        messageFlash: { cognito: null },

        // Modal
        visibleModalLocation: false,
        datePickerAction: false,

        // Data API
        schoolsList: [],
        universityList: []
    }

    componentDidMount() {
        this._getSchools()
        this._getUniversity()
    }

    _getSchools = async () => {
        try {
            const { data } = await axios.get('https://code.org/schools.json?results=1')
            this.setState({ schoolsList: data.schools.map(item => item.name).sort() })
        } catch (error) {
            console.log(error);
        }
    }

    _getUniversity = async () => {
        try {
            const { data } = await axios.get('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
            this.setState({ universityList: data.map(item => item.name).sort() })
        } catch (error) {
            console.log(error);
        }
    }

    // Modals
    _visibleModalLocation = (visible) => { this.setState({ visibleModalLocation: visible }) }


    // Send Data to AWS
    _submit = async () => {
        const { _indexChangeSwiper, _dataFromForms } = this.props
        const { schools, university, levelAchivied, occupation, socioeconomicLevel, rentOrOwnCar, rentOrOwnHouse } = this.state
        const dataCoins = {
            coinsOccupations: _.sum([coinSchools,
                coinUniversity,
                coinLevelAchivied,
                coinOccupation,
                coinSocioeconomicLevel,
                coinRentOrOwnCar,
                coinRentOrOwnHouse])
        }
        const data = { aboutTheOccupations: { schools, university, levelAchivied, occupation, socioeconomicLevel, rentOrOwnCar, rentOrOwnHouse } }
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
        const { schools, university, levelAchivied, occupation, socioeconomicLevel, rentOrOwnCar, rentOrOwnHouse } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            schools !== 'Not specified'
                ? university !== 'Not specified'
                    ? levelAchivied !== 'Not specified'
                        ? occupation !== 'Not specified'
                            ? socioeconomicLevel !== 'Not specified'
                                ? rentOrOwnCar !== 'Not specified'
                                    ? rentOrOwnHouse !== 'Not specified'
                                        ? this._submit()
                                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid data of house" } } })
                                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid data of car" } } })
                                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid socioeconomic level" } } })
                            : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid ocuppation" } } })
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid level achivied" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid university" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid school" } } })
        }, 500);
    }

    render() {
        const {
            // Data
            schools,
            university,
            levelAchivied,
            occupation,
            socioeconomicLevel,
            rentOrOwnCar,
            rentOrOwnHouse,

            // Coins
            coinSchools,
            coinUniversity,
            coinLevelAchivied,
            coinOccupation,
            coinSocioeconomicLevel,
            coinRentOrOwnCar,
            coinRentOrOwnHouse,

            // Input
            inputTextUniversity,
            inputTextSchools,
            inputTextOcuppation,

            isvalidFormAnimation,
            isLoading,
            messageFlash,

            // modal

            // API
            schoolsList,
            universityList
        } = this.state
        const { userData, _indexChangeSwiper, engage } = this.props

        // Filter universities
        let filterSchoolsList = schoolsList.filter((item) => { return item.toLowerCase().indexOf(_.lowerCase(inputTextSchools)) !== -1 })
        let filterUniversityList = universityList.filter((item) => { return item.toLowerCase().indexOf(_.lowerCase(inputTextUniversity)) !== -1 })
        let filterOcuppationList = ocuppationList.filter((item) => { return item.toLowerCase().indexOf(_.lowerCase(inputTextOcuppation)) !== -1 })

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
                            <Icon name='arrow-back' style={{ color: isLoading ? '#EEEEEE' : '#FFF', }} />
                            <Text style={{ color: isLoading ? "#EEEEEE" : "#FFF" }}>About You</Text>
                        </Button>
                        <Title style={{ color: isLoading ? '#EEEEEE' : '#FFF', fontSize: wp(7) }}>Formation</Title>
                    </Left>
                    <Right>
                        <AnimateNumber
                            style={{ color: "#FFF", fontSize: wp(5), textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}
                            value={_.sum([coinSchools,
                                coinUniversity,
                                coinLevelAchivied,
                                coinOccupation,
                                coinSocioeconomicLevel,
                                coinRentOrOwnCar,
                                coinRentOrOwnHouse])}
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
                            <Text style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>{userData.name}</Text> {'\n'}Tell us about your personal training!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content
                                scrollEnabled={!isLoading}
                                contentContainerStyle={{ paddingTop: 10 }}
                                keyboardShouldPersistTaps={'always'}>
                                <List>
                                    {/* SCHOOLS */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#757575" }}>
                                                <Icon type="FontAwesome" name="university" style={{ fontSize: wp(5), left: 1.3, top: -1 }} />
                                            </Button>
                                        </Left>
                                        <Body style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Choose your school name</Text>
                                            <Button small transparent style={{ right: 25, paddingRight: 30 }}
                                                onPress={() => Alert.alert(
                                                    `${userData.name}`,
                                                    'If your school does not appear on the list, please let us know.',
                                                    [
                                                        {
                                                            text: 'Send Feedback',
                                                            onPress: () => { },
                                                            style: 'cancel',
                                                        },
                                                        { text: 'Cancel', onPress: () => { } },
                                                    ],
                                                    { cancelable: false },
                                                )}>
                                                <Icon type="Feather" name="alert-circle" style={{ fontSize: wp(4.5), color: '#3333' }} />
                                            </Button>
                                        </Body>
                                        <Right>
                                            <Text>{schools === 'Not specified' ? 'Not specified' : _.truncate(schools, { length: 10, separate: '...' })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                renderHeader={backAction =>
                                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                                        <Button transparent small onPress={backAction}>
                                                            <Text style={{ color: '#D81B60', fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                                        </Button>
                                                        <Item style={{ backgroundColor: '#F5F5F5' }}>
                                                            <Icon name="ios-search" />
                                                            <Input
                                                                placeholder="Filter"
                                                                value={inputTextSchools}
                                                                onChangeText={(value) => this.setState({ inputTextSchools: value })} />
                                                            <Icon type="FontAwesome" name="university" style={{ fontSize: wp(3) }} />
                                                        </Item>
                                                    </Header>}
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 150, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={schools}
                                                onValueChange={(value) => this.setState({ schools: value, coinSchools: 50 })}>
                                                {filterSchoolsList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                            </Picker>}
                                    </ListItem>

                                    {/* UNIVERSITY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#795548" }}>
                                                <Icon type="FontAwesome" name="university" style={{ fontSize: wp(5), left: 1.3, top: -1 }} />
                                            </Button>
                                        </Left>
                                        <Body style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Choose your university name</Text>
                                            <Button small transparent style={{ right: 25, paddingRight: 30 }}
                                                onPress={() => Alert.alert(
                                                    `${userData.name}`,
                                                    'If your university does not appear on the list, please let us know.',
                                                    [
                                                        {
                                                            text: 'Send Feedback',
                                                            onPress: () => { },
                                                            style: 'cancel',
                                                        },
                                                        { text: 'Cancel', onPress: () => { } },
                                                    ],
                                                    { cancelable: false },
                                                )}>
                                                <Icon type="Feather" name="alert-circle" style={{ fontSize: wp(4.5), color: '#3333' }} />
                                            </Button>
                                        </Body>
                                        <Right>
                                            <Text>{university === 'Not specified' ? 'Not specified' : _.truncate(university, { length: 10, separate: '...' })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                renderHeader={backAction =>
                                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                                        <Button transparent small onPress={backAction}>
                                                            <Text style={{ color: '#D81B60', fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                                        </Button>
                                                        <Item style={{ backgroundColor: '#F5F5F5' }}>
                                                            <Icon name="ios-search" />
                                                            <Input
                                                                placeholder="Filter"
                                                                value={inputTextUniversity}
                                                                onChangeText={(value) => this.setState({ inputTextUniversity: value })} />
                                                            <Icon type="FontAwesome" name="university" style={{ fontSize: wp(3) }} />
                                                        </Item>
                                                    </Header>}
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 150, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={university}
                                                onValueChange={(value) => this.setState({ university: value, coinUniversity: 50 })}>
                                                {filterUniversityList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                            </Picker>}
                                    </ListItem>

                                    {/* LEVEL ACHIVIED*/}
                                    <ListItem last icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#009688" }}>
                                                <Icon type="Entypo" name="bookmark" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Level achivied reached</Text>
                                        </Body>
                                        <Right>
                                            <Text>{levelAchivied === 'Not specified' ? 'Not specified' : _.truncate(levelAchivied, { length: 15, separate: '...' })}</Text>
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
                                                selectedValue={levelAchivied}
                                                onValueChange={(value) => this.setState({ levelAchivied: value, coinLevelAchivied: 50 })}>
                                                {levelachievedList[0].children.map((item, key) => <Picker.Item key={key} label={item.name} value={item.name} />)}
                                            </Picker>}
                                    </ListItem>

                                    <Separator bordered />

                                    {/* OCUPPATION */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#3F51B5" }}>
                                                <Icon type="Entypo" name="briefcase" style={{ fontSize: wp(5) }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>What is your occupation</Text>
                                        </Body>
                                        <Right>
                                            <Text>{occupation === 'Not specified' ? 'Not specified' : _.truncate(occupation, { length: 15, separate: '...' })}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                        {isLoading ? null :
                                            <Picker
                                                mode="dropdown"
                                                renderHeader={backAction =>
                                                    <Header searchBar transparent rounded style={{ left: -20 }}>
                                                        <Button transparent small onPress={backAction}>
                                                            <Text style={{ color: '#D81B60', fontSize: wp(5), fontWeight: '400' }}>Back</Text>
                                                        </Button>
                                                        <Item style={{ backgroundColor: '#F5F5F5' }}>
                                                            <Icon name="ios-search" />
                                                            <Input
                                                                placeholder="Filter"
                                                                value={inputTextOcuppation}
                                                                onChangeText={(value) => this.setState({ inputTextOcuppation: value })} />
                                                            <Icon type="Entypo" name="briefcase" style={{ fontSize: wp(3) }} />
                                                        </Item>
                                                    </Header>}
                                                style={{ backgroundColor: 'rgba(0,0,0,0.0)', position: 'absolute', right: 150, top: -25 }}
                                                headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                                headerTitleStyle={{ color: "#D81B60" }}
                                                headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                                                textStyle={{ color: 'rgba(0,0,0,0.0)' }}
                                                selectedValue={occupation}
                                                onValueChange={(value) => this.setState({ occupation: value, coinOccupation: 50 })}>
                                                {filterOcuppationList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                            </Picker>}
                                    </ListItem>

                                    {/* SOCIOECONOMIC LEVEL */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#43A047" }}>
                                                <Icon type="FontAwesome" name="money" style={{ fontSize: wp(5) }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>What is your socialeconomic level</Text>
                                        </Body>
                                        <Right>
                                            <Text>{socioeconomicLevel === 'Not specified' ? 'Not specified' : _.truncate(socioeconomicLevel, { length: 15, separate: '...' })}</Text>
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
                                                selectedValue={socioeconomicLevel}
                                                onValueChange={(value) => this.setState({ socioeconomicLevel: value, coinSocioeconomicLevel: 50 })}>
                                                {socioeconomicLevelList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                            </Picker>}
                                    </ListItem>

                                    {/* RENT CAR OR OWN */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#BF360C" }}>
                                                <Icon type="AntDesign" name="car" style={{ fontSize: wp(5) }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Rent or own car?</Text>
                                        </Body>
                                        <Right>
                                            <Text>{rentOrOwnCar === 'Not specified' ? 'Not specified' : _.truncate(rentOrOwnCar, { length: 15, separate: '...' })}</Text>
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
                                                selectedValue={rentOrOwnCar}
                                                onValueChange={(value) => this.setState({ rentOrOwnCar: value, coinRentOrOwnCar: 25 })}>
                                                {rentOrOwnCarList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                            </Picker>}
                                    </ListItem>

                                    {/* RENT HOUSE OR OWN */}
                                    <ListItem last icon>
                                        <Left>
                                            <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FB8C00" }}>
                                                <Icon type="FontAwesome" name="home" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Rent or own house?</Text>
                                        </Body>
                                        <Right>
                                            <Text>{rentOrOwnHouse === 'Not specified' ? 'Not specified' : _.truncate(rentOrOwnHouse, { length: 15, separate: '...' })}</Text>
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
                                                selectedValue={rentOrOwnHouse}
                                                onValueChange={(value) => this.setState({ rentOrOwnHouse: value, coinRentOrOwnHouse: 25 })}>
                                                {rentOrOwnHouseList.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
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
                                backgroundColor: '#E91E63'
                            }}>
                            <Text style={{ fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#EEEEEE" : "#FFF" }}>Continue</Text>
                            {isLoading ? <Spinner color={isLoading ? "#EEEEEE" : "#FFF"} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>

            </Container>
        );
    }
}

export default AbouttheirOccupations