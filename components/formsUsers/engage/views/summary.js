import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Separator, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'
import _ from 'lodash'
import { normalizeEmail } from 'validator'
import moment from 'moment'

// Gradients
import { GadrientsAuth } from '../../../Global/gradients/index'
import { MyStatusBar } from '../../../Global/statusBar/index'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

import { randomColors } from '../../../Global/data/index'

// GraphQL
import * as mutations from '../../../../src/graphql/mutations'

class Summary extends Component {
    state = {
        isLoading: false,
        errSubmitdata: false,
    }

    _submit = async () => {
        this.setState({ isLoading: true })
        const { navigation, userData, engage } = this.props
        try {
            await API.graphql(graphqlOperation(mutations.createEngage, { input: engage }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.sub } }))
            this.setState({ isLoading: false })
            navigation.navigate("Home")
        } catch (error) {
            console.log(error)
            this.setState({ isLoading: false, errSubmitdata: true })
        }
    }

    render() {
        const { isLoading, errSubmitdata } = this.state
        const { _indexChangeSwiper, userData, engage } = this.props
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
                            <Text style={{ color: isLoading ? "#EEEEEE" : "#FFF" }}>Interest</Text>
                        </Button>
                        <Title style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(7) }}>Summary</Title>
                    </Left>
                </Header>

                {/* Forms */}
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text style={{ fontSize: wp(4), color: isLoading ? "#EEEEEE" : "#FFF", textAlign: 'left', fontWeight: '100' }}>
                            <Text style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>We done!</Text> {'\n'}Please verify all your information and confirm that everything is fine!</Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -20 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            {Object.keys(engage).length !== 0 ?
                                <Content contentContainerStyle={{ paddingTop: 10 }} scrollEnabled={!isLoading}>
                                    <List>
                                        <View style={{ backgroundColor: '#F5F5F5', height: screenHeight, position: 'absolute', top: -screenHeight + 5, left: 0, right: 0 }} />
                                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                                            <Text>ABOUT YOU</Text>
                                        </Separator>

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
                                                <Text>{userData.name}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Lastname</Text>
                                            </Body>
                                            <Right>
                                                <Text>{userData.middle_name}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Number phone</Text>
                                            </Body>
                                            <Right>
                                                <Text>{userData.phone_number}</Text>
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
                                        <ListItem icon last>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FFD600" }}>
                                                    <Icon type="MaterialIcons" name="child-care" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Birthdate</Text>
                                            </Body>
                                            <Right>
                                                <Text>{moment(new Date(engage.aboutThePersonality.birthDate)).calendar()}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text>LOCATION</Text>
                                        </Separator>

                                        {/* PLACES YOU BORN */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#D500F9" }}>
                                                    <Icon type="MaterialCommunityIcons" name="baby" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Places you born</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(`${engage.aboutThePersonality.location.born.country}, ${engage.aboutThePersonality.location.born.city}`, { length: 30, separator: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* CURRENT PLACE */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#4527A0" }}>
                                                    <Icon type="Entypo" name="location" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Current place</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(`${engage.aboutThePersonality.location.currentPlace.country}, ${engage.aboutThePersonality.location.currentPlace.city}`, { length: 30, separator: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Region</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutThePersonality.regionalIdentity, { length: 30, separate: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Cacionality</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutThePersonality.nacionality, { length: 30, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text>PREFERENCES</Text>
                                        </Separator>

                                        {/* GENDER */}
                                        <ListItem icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#90A4AE" }}>
                                                    <Icon type="MaterialCommunityIcons" name="gender-male-female" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>gender</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutThePersonality.gender, { length: 30, separate: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Sexual preference</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutThePersonality.sexuality, { length: 30, separate: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Marital status</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutThePersonality.maritalStatus, { length: 30, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text>FAMILY</Text>
                                        </Separator>

                                        {/* PARENT'S CONDITION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#EF5350" }}>
                                                    <Icon type="Feather" name="users" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Parent's conditional</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutThePersonality.parentalCondition, { length: 30, separate: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Amount of simblings</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutThePersonality.amountOfSimblings, { length: 30, separate: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Amount of childrens</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutThePersonality.amountOfChildren, { length: 30, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text>FORMATION</Text>
                                        </Separator>

                                        {/* SCHOOLS */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#757575" }}>
                                                    <Icon type="FontAwesome" name="university" style={{ fontSize: wp(5), left: 1.3, top: -1 }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>school name</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.schools, { length: 30, separate: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>university name</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.university, { length: 30, separate: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Level achivied reached</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.levelAchivied, { length: 30, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text>STATUS</Text>
                                        </Separator>

                                        {/* OCUPPATION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#3F51B5" }}>
                                                    <Icon type="Entypo" name="briefcase" style={{ fontSize: wp(5) }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Your occupation</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.occupation, { length: 30, separate: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Your socialeconomic level</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.socioeconomicLevel, { length: 30, separate: '...' })}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Car</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.rentOrOwnCar, { length: 30, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* RENT HOUSE OR OWN */}
                                        <ListItem last icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FB8C00" }}>
                                                    <Icon type="FontAwesome" name="home" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>House</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.aboutTheOccupations && engage.aboutTheOccupations.rentOrOwnHouse, { length: 30, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5' }}>
                                            <Text>INTERESTS</Text>
                                        </Separator>

                                        {/* GENRE MUSICALS */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#FFD600" }}>
                                                    <Icon type="Feather" name="music" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Musical genre</Text>
                                            </Body>
                                            <Right style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', }}>
                                                <Content showsHorizontalScrollIndicator={false} horizontal>
                                                    {engage.interests && engage.interests.musicalGenre.map((item, key) =>
                                                        <View key={key} style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item}</Text>
                                                        </View>
                                                    )}
                                                </Content>
                                            </Right>
                                        </ListItem>

                                        {/* SPORT LIKE */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#00C853" }}>
                                                    <Icon type="FontAwesome" name="soccer-ball-o" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Sports you like</Text>
                                            </Body>
                                            <Right style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', }}>
                                                <Content showsHorizontalScrollIndicator={false} horizontal>
                                                    {engage.interests && engage.interests.sports.map((item, key) =>
                                                        <View key={key} style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item}</Text>
                                                        </View>
                                                    )}
                                                </Content>
                                            </Right>
                                        </ListItem>

                                        {/* CATEGORY PRIZE */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#1E88E5" }}>
                                                    <Icon type="Feather" name="award" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Categories of your prize</Text>
                                            </Body>
                                            <Right style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', }}>
                                                <Content showsHorizontalScrollIndicator={false} horizontal>
                                                    {engage.interests && engage.interests.categoryPrize.map((item, key) =>
                                                        <View key={key} style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item}</Text>
                                                        </View>
                                                    )}
                                                </Content>
                                            </Right>
                                        </ListItem>

                                        {/* CATEGORY CONTEST */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#EF5350" }}>
                                                    <Icon type="Feather" name="star" style={{ top: -1, left: 1 }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Categories of your contest</Text>
                                            </Body>
                                            <Right style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, flexDirection: 'row', }}>
                                                <Content showsHorizontalScrollIndicator={false} horizontal>
                                                    {engage.interests && engage.interests.categoryContest.map((item, key) =>
                                                        <View key={key} style={{
                                                            backgroundColor: isLoading ? "#BDBDBD" : `${randomColors[key]}`,
                                                            margin: 3, padding: 5, borderRadius: '50%', flex: 1,
                                                            borderColor: '#3333',
                                                            borderWidth: 0.5
                                                        }}>
                                                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item}</Text>
                                                        </View>
                                                    )}
                                                </Content>
                                            </Right>
                                        </ListItem>

                                        {/* POLITICAL */}
                                        <ListItem icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#78909C" }}>
                                                    <Icon type="Entypo" name="news" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Political</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.interests && _.startCase(_.lowerCase(engage.interests.political)), { length: 30, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* VOTE */}
                                        <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#BDBDBD" : "#424242" }}>
                                                    <Icon type="MaterialCommunityIcons" name="vote" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#BDBDBD" : null }}>Vote</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(engage.interests && _.startCase(_.lowerCase(engage.interests.vote)), { length: 30, separate: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                    </List>
                                </Content> : null}
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
                                    <Text style={{ color: "#EEEEEE" }}>Creating engage, please wait...  </Text>
                                    <Spinner size="small" color="#EEEEEE" />
                                </View>
                                : <Text style={{ fontWeight: 'bold', letterSpacing: 2 }}>Create</Text>}
                        </Button>
                    </Animatable.View>
                </Footer>
            </Container>
        );
    }
}

export default withNavigation(Summary)