import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Separator, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'
import _ from 'lodash'
import truncate from 'lodash/truncate'
import { normalizeEmail } from 'validator'
import moment from 'moment'
import Axios from 'axios'
import OmitDeep from 'omit-deep'
import { showMessage } from "react-native-flash-message";

// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

// import { randomColors } from '../../../global/static/colors'

// GraphQL
import * as mutations from '../../../../src/graphql/mutations'
import { colorsPalette } from '../../../global/static/colors';

class Summary extends Component {
    state = {
        isLoading: false,
        errSubmitdata: false,
    }

    _submit = async () => {
        this.setState({ isLoading: true })
        const { navigation, userData, engage, coins } = this.props
        try {
            showMessage({
                animated: false,
                message: "Preparing....",
                description: "I am preparing your valuable data, give me a moment!",
                type: "default",
                backgroundColor: colorsPalette.uploadingData,
                color: colorsPalette.secondaryColor, // text color
            });
            await API.graphql(graphqlOperation(mutations.createEngage, { input: engage }))
            showMessage({
                animated: false,
                message: "Almost....",
                description: "Don't despair, I'm almost done!",
                type: "default",
                backgroundColor: colorsPalette.uploadingData,
                color: colorsPalette.secondaryColor, // text color
            });
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id, coins: _.sum([coins.coinsOccupations, coins.coinsPersonality, coins.interestsCoins, userData.coins]) } }))
            OmitDeep(userData, ['submitPrize', 'createContest', 'engage', 'coins'])
            await Axios.put(`https://search-influencemenowtest-pirbhpqtqvcumgt6ze4spjupba.us-east-1.es.amazonaws.com/engages/_doc/${userData.id}`, {
                'engages': {
                    "expoPushToken": engage.expoPushToken,
                    "createdAt": engage.createdAt,
                    'user': userData,
                    'aboutThePersonality': engage.aboutThePersonality,
                    'aboutTheOccupations': engage.aboutTheOccupations
                }
            })
            showMessage({
                message: "Profile Created...",
                description: "Your profile has been created successfully!",
                type: "default",
                backgroundColor: colorsPalette.validColor,
                color: colorsPalette.secondaryColor, // text color
            });
            this.setState({ isLoading: false })
            navigation.navigate("Home")
        } catch (error) {
            this.setState({ isLoading: false, errSubmitdata: true })
            showMessage({
                message: "Oops! Something has happened.",
                description: "Apparently I lost connection to your network, please try again.",
                type: "default",
                backgroundColor: colorsPalette.validColor,
                color: colorsPalette.secondaryColor, // text color
            });
        }
    }

    render() {
        const { isLoading, errSubmitdata } = this.state
        const { _indexChangeSwiper, userData, engage, coins } = this.props
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
                            <Icon name='arrow-back' style={{ color: isLoading ? "#EEEEEE" : "#FFF" }} />
                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(4) }}>More ab...</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(6) }}>Summary</Title>
                    </Left>
                    <Right>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont, color: '#FFF' }}>Total points: {_.sum([coins.coinsOccupations, coins.coinsPersonality, coins.interestsCoins])}</Text>
                    </Right>
                </Header>

                {/* Forms */}
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: isLoading ? "#EEEEEE" : "#FFF", textAlign: 'left' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>We done!</Text> {'\n'}Please confirm all information is correct!</Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -20 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            {Object.keys(engage).length !== 0 ?
                                <Content contentContainerStyle={{ paddingTop: 10 }} scrollEnabled={!isLoading}>
                                    <List>
                                        <View style={{ backgroundColor: '#F5F5F5', height: screenHeight, position: 'absolute', top: -screenHeight + 5, left: 0, right: 0 }} />
                                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                                            <Text allowFontScaling={false}>ABOUT YOU</Text>
                                        </Separator>

                                        {/* NAME */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#007AFF" }}>
                                                    <Icon type="Ionicons" name="md-person" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{truncate(userData.name, { separator: "...", length: 15 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* Lastname */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                                    <Icon type="Ionicons" name="md-person" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Last name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{truncate(userData.lastname, { separator: "...", length: 15 })}</Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Number phone</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{userData.phone === null ? '-' : userData.phone}</Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Email</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{userData.email === undefined ? null : truncate(normalizeEmail(userData.email), { separator: "...", length: 15 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* BIRHTDAY */}
                                        <ListItem icon last>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FFD600" }}>
                                                    <Icon type="MaterialIcons" name="child-care" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Birthdate</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{moment(new Date(engage.aboutThePersonality.birthDate)).calendar()}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text allowFontScaling={false}>LOCATION</Text>
                                        </Separator>

                                        {/* Location*/}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#D500F9" }}>
                                                    <Icon type="Entypo" name="location-pin" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Location</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(`${engage.aboutThePersonality.location.country}, ${engage.aboutThePersonality.location.state}`, { length: 15, separator: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* REGION*/}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#00897B" }}>
                                                    <Icon type="Entypo" name="location-pin" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Identity do you associated with?</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutThePersonality.regionalIdentity, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* NACIONALITY */}
                                        <ListItem last icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#6200EA" }}>
                                                    <Icon type="MaterialCommunityIcons" name="earth" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Nacionality do you identify with?</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutThePersonality.nacionality, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text allowFontScaling={false}>PREFERENCES</Text>
                                        </Separator>

                                        {/* GENDER */}
                                        <ListItem icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#90A4AE" }}>
                                                    <Icon type="MaterialCommunityIcons" name="gender-male-female" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Gender do you identify with?</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutThePersonality.gender, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* SEXUALITY */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#D81B60" }}>
                                                    <Icon type="FontAwesome" name="genderless" style={{ fontSize: wp(8), top: -4, left: 1.5 }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Sexual preference</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutThePersonality.sexuality, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* MARITAL STATUS */}
                                        <ListItem last icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#00BCD4" }}>
                                                    <Icon type="Entypo" name="slideshare" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>What is your marital status?</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutThePersonality.maritalStatus, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text allowFontScaling={false}>FAMILY</Text>
                                        </Separator>

                                        {/* PARENT'S CONDITION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#EF5350" }}>
                                                    <Icon type="Feather" name="users" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Parental status</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutThePersonality.parentalCondition, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* AMOUNT OF SIMBLINGS */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#AA00FF" }}>
                                                    <Icon type="Entypo" name="users" style={{ fontSize: wp(5) }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Amount of simblings</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutThePersonality.amountOfSimblings, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* AMOUNT OF CHILDREN */}
                                        <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#1E88E5" }}>
                                                    <Icon type="FontAwesome" name="child" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4), fontWeight: 'bold' }}>Amount of children</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutThePersonality.amountOfChildren, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text allowFontScaling={false}>FORMATION</Text>
                                        </Separator>

                                        {/* SCHOOLS */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#757575" }}>
                                                    <Icon type="FontAwesome" name="university" style={{ fontSize: wp(5), left: 1.3, top: -1 }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Hight school name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.schools, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* UNIVERSITY */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#795548" }}>
                                                    <Icon type="FontAwesome" name="university" style={{ fontSize: wp(5), left: 1.3, top: -1 }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>University name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.university, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* LEVEL ACHIVIED*/}
                                        <ListItem last icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#009688" }}>
                                                    <Icon type="Entypo" name="bookmark" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Academic level achieved</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.levelAchivied, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text allowFontScaling={false}>STATUS</Text>
                                        </Separator>

                                        {/* OCUPPATION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#3F51B5" }}>
                                                    <Icon type="Entypo" name="briefcase" style={{ fontSize: wp(5) }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Your occupation</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.occupation, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* SOCIOECONOMIC LEVEL */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#43A047" }}>
                                                    <Icon type="FontAwesome" name="money" style={{ fontSize: wp(5) }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Your socialeconomic level</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.socioeconomicLevel, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* RENT CAR OR OWN */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#BF360C" }}>
                                                    <Icon type="AntDesign" name="car" style={{ fontSize: wp(5) }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Method of transportation</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.rentOrOwnCar, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* RENT HOUSE OR OWN */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FB8C00" }}>
                                                    <Icon type="FontAwesome" name="home" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : null, fontSize: wp(4), fontWeight: 'bold' }}>Living arrangements</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.rentOrOwnHouse, { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>
                                        {/* 
                                        {/* VOTE */}
                                        <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#424242" }}>
                                                    <Icon type="MaterialCommunityIcons" name="vote" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#BDBDBD" : null, fontSize: wp(4), fontWeight: 'bold' }}>Vote</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(engage.aboutTheOccupations && _.startCase(_.lowerCase(engage.aboutTheOccupations.political)), { length: 15, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                    </List>
                                </Content> : null}
                            <Text allowFontScaling={false} style={{ color: colorsPalette.darkFont, fontSize: wp(3), alignSelf: 'center' }}>
                                Scroll down to see everything
                            </Text>
                        </View>
                    </Row>
                </Grid>

                <Footer style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                    <Animatable.View
                        animation={errSubmitdata ? "shake" : undefined}
                        onAnimationEnd={() => this.setState({ errSubmitdata: false })}
                        duration={1000}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "80%",
                            shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                        }}>
                        <Button
                            disabled={isLoading}
                            onPress={() => this._submit()}
                            iconRight style={{
                                width: "80%",
                                alignSelf: 'center',
                                backgroundColor: '#E91E63',
                                justifyContent: 'center',
                            }}>
                            {isLoading
                                ? <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text allowFontScaling={false} style={{ color: "#EEEEEE", fontSize: wp(3) }}>Creating engage, please wait...  </Text>
                                    <Spinner size="small" color="#EEEEEE" />
                                </View>
                                : <Text allowFontScaling={false} style={{ fontWeight: 'bold', letterSpacing: 2, fontSize: wp(4) }}>Create</Text>}
                        </Button>
                    </Animatable.View>
                </Footer>
            </Container>
        );
    }
}

export default withNavigation(Summary)