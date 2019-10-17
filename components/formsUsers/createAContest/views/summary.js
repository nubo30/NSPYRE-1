import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native'
import { Video } from 'expo-av';
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Separator, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'
import _ from 'lodash'
import truncate from 'lodash/truncate'
import { normalizeEmail } from 'validator'
import Swiper from 'react-native-swiper'
import AWS from 'aws-sdk'
import moment from 'moment'

import { securityCredentials } from '../../../global/aws/credentials'

// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

// Colors
import { colorsPalette } from '../../../global/static/colors'

// Icons
import { Ionicons, Entypo, FontAwesome, MaterialIcons, Feather, Foundation, AntDesign } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

// GraphQL
import * as mutations from '../../../../src/graphql/mutations'

class Summary extends Component {
    state = {
        isLoading: false,
        errSubmitdata: false,
    }

    _submit = async () => {
        this.setState({ isLoading: true })
        const { navigation, userData, contest } = this.props

        AWS.config.update({ accessKeyId: securityCredentials.accessKeyId, secretAccessKey: securityCredentials.secretAccessKey, region: securityCredentials.region })

        // PICTURE OF THE CONTEST
        const blobPicture = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", contest.general.picture.localUrl, true);
            xhr.send(null);
        });

        // VIDEO OF THE CONTEST
        const blobVideo = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", contest.general.video.localUrl, true);
            xhr.send(null);
        });

        try {
            await Storage.put(`users/${userData.email}/contest/pictures/owner/${contest.general.picture.name}`, blobPicture, { contentType: contest.general.picture.type })
            await Storage.put(`users/${userData.email}/contest/videos/owner/${contest.general.video.name}`, blobVideo, { contentType: contest.general.video.type })

            contest.prizes.map(async (item) => {
                // PICTURE OF THE PRIZE
                const blobPicture_ = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () { resolve(xhr.response) };
                    xhr.onerror = function () { reject(new TypeError("Network request failed")) };
                    xhr.responseType = "blob";
                    xhr.open("GET", item.picture.localUrl, true);
                    xhr.send(null);
                });
                try {
                    await Storage.put(`users/${userData.email}/contest/prizes/pictures/owner/${item.picture.name}`, blobPicture_, { contentType: item.picture.type })
                } catch (error) {
                    console.log('Error al crear los premios');
                }
            })

            const newContest = await API.graphql(graphqlOperation(mutations.createCreateContest, { input: contest }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
            navigation.navigate("AboutContest", {
                contest: newContest.data.createCreateContest,
                fromWhere: 'createContest',
                userData,
                disableParticipants: true
            })
            this.setState({ isLoading: false })
        } catch (error) {
            this.setState({ isLoading: false, errSubmitdata: true })
            console.log(error)
        }
    }

    render() {
        const { isLoading, errSubmitdata } = this.state
        const { _indexChangeSwiper, contest, userData } = this.props
        let prizes = contest.prizes === undefined ? [] : contest.prizes
        return (
            <Container>
                <GadrientsAuth />
                <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                <Header transparent>
                    <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            disabled={isLoading}
                            transparent
                            onPress={() => _indexChangeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor }} />
                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, fontSize: wp(6) }}>Check</Title>
                    </Left>
                </Header>

                {/* Forms */}
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(3), color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor, textAlign: 'left' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), fontWeight: 'bold', color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.secondaryColor }}>We done!</Text> {'\n'}Done! Please check all fields below and confirm if you’re ready to go live!</Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -20 }}>
                        <View style={{ backgroundColor: colorsPalette.secondaryColor, width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            {Object.keys(contest).length !== 0 ?
                                <Content contentContainerStyle={{ paddingTop: 10 }} scrollEnabled={!isLoading}>
                                    <List>
                                        <View style={{ backgroundColor: colorsPalette.opaqueWhite2, height: screenHeight, position: 'absolute', top: -screenHeight + 5, left: 0, right: 0 }} />
                                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderTopColor: colorsPalette.opaqueWhite2 }}>
                                            <Text allowFontScaling={false}>ABOUT YOU</Text>
                                        </Separator>

                                        {/* NAME */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#007AFF" }}>
                                                    <Ionicons style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="md-person" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{truncate(userData.name, { length: 15, separator: "..." })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* Lastname */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#009688" }}>
                                                    <Ionicons style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="md-person" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Last name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{truncate(userData.lastname, { length: 15, separator: "..." })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* PHONE */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#F4511E" }}>
                                                    <Foundation style={{ fontSize: wp(5.6), color: colorsPalette.secondaryColor }} active name="telephone" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Number phone</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{userData.phone === null ? '-' : userData.phone}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* EMAIL */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#4DB6AC" }}>
                                                    <Ionicons style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="md-mail" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Email</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{userData.email === undefined ? null : truncate(normalizeEmail(userData.email), { length: 15, separator: "..." })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* LOCATION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#FBC02D" }}>
                                                    <Entypo style={{ fontSize: wp(6), color: colorsPalette.secondaryColor }} active name="location-pin" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Location</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{_.truncate(`${contest.aboutTheUser.location.street}, ${contest.aboutTheUser.location.country}`, { length: 15, separator: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* COMPANY NAME */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#EC407A" }}>
                                                    <FontAwesome style={{ fontSize: wp(4.5), color: colorsPalette.secondaryColor, left: 2 }} active name="building" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Company name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{_.truncate(`${contest.aboutTheUser.companyName}`, { separator: '...', length: 15 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* TITTLE IN THE COMPANY */}
                                        <ListItem icon last>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#009688" }}>
                                                    <Entypo style={{ fontSize: wp(5.5), color: colorsPalette.secondaryColor, left: 1, top: 1 }} active name="creative-commons-attribution" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Title in the company</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{_.truncate(`${contest.aboutTheUser.titleInTheCompany}`, { separator: '...', length: 15 })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderTopColor: colorsPalette.opaqueWhite2 }}>
                                            <Text allowFontScaling={false} >ABOUT THE CONTEST</Text>
                                        </Separator>

                                        {/* Category */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#007AFF" }}>
                                                    <AntDesign style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="select1" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Category</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{truncate(_.startCase(_.lowerCase(contest && contest.category)), { length: 15, separator: "..." })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* NAME CONTEST */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#009688" }}>
                                                    <Entypo style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="star" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Name of contest</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{truncate(_.startCase(contest && contest.general && contest.general.nameOfContest), { length: 15, separator: "..." })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* DESCRIPTION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#F4511E" }}>
                                                    <MaterialIcons style={{ fontSize: wp(5.6), color: colorsPalette.secondaryColor }} active name="description" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Description</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{_.truncate(`${contest && contest.general && contest.general.description}`, { separator: '...', length: 15 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* INSTRUCTION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#EC407A" }}>
                                                    <FontAwesome style={{ fontSize: wp(4.5), color: colorsPalette.secondaryColor, left: 1 }} active name="warning" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Instructions</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{_.truncate(`${contest && contest.general && contest.general.instructions}`, { separator: '...', length: 15 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* TIMER */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#FF9501" }}>
                                                    <Ionicons active name="md-timer" style={{ fontSize: wp(6), color: "#FFF", top: 1.5 }} />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Timer</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{truncate(contest && contest.timer && moment(contest.timer.end).format('LLLL'), { length: 15, separator: "..." })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* IMAGEN */}
                                        <ListItem icon style={{ justifyContent: 'space-between', height: 110, padding: 10 }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#4DB6AC", right: 10 }}>
                                                    <FontAwesome style={{ fontSize: wp(4.5), color: colorsPalette.secondaryColor, left: 1 }} active name="picture-o" />
                                                </Button>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Picture</Text>
                                            </Left>
                                            <Image style={{ height: "100%", width: "60%" }} source={{ uri: contest && contest.general && contest.general.picture.localUrl }} />
                                        </ListItem>

                                        <View style={{ borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', width: '83%', alignSelf: 'flex-end' }} />

                                        {/* VIDEO */}
                                        <ListItem icon style={{ justifyContent: 'space-between', height: 110, padding: 10 }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#FBC02D", right: 10 }}>
                                                    <Feather style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="video" />
                                                </Button>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Video</Text>
                                            </Left>
                                            <Video
                                                source={{ uri: contest && contest.general && contest.general.video.localUrl }}
                                                useNativeControls
                                                rate={1.0}
                                                volume={1.0}
                                                isMuted={false}
                                                resizeMode="cover"
                                                shouldPlay={false}
                                                isLooping={false}
                                                style={{ width: "60%", height: "100%" }} />
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: colorsPalette.opaqueWhite2, borderTopColor: colorsPalette.opaqueWhite2, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text allowFontScaling={false}>PRIZES</Text>
                                            <Text allowFontScaling={false} style={{ right: 15 }}>{prizes === undefined ? 0 : prizes.length} Prizes Created</Text>
                                        </Separator>

                                        {/* PRIZES */}
                                        <Swiper
                                            style={{ height: 350 }}
                                            loop={false}
                                            showsPagination={false}
                                            showsButtons={false}>
                                            {prizes.map(item =>
                                                <List key={item.prizeId}>
                                                    {/* NAME PRIZE */}
                                                    <ListItem icon>
                                                        <Left>
                                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#009688" }}>
                                                                <Entypo style={{ fontSize: wp(5), color: colorsPalette.secondaryColor }} active name="star" />
                                                            </Button>
                                                        </Left>
                                                        <Body>
                                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Name of prize</Text>
                                                        </Body>
                                                        <Right>
                                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{truncate(item.name, { length: 15, separator: "..." })}</Text>
                                                        </Right>
                                                    </ListItem>

                                                    {/* DESCRIPTION */}
                                                    <ListItem icon>
                                                        <Left>
                                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#F4511E" }}>
                                                                <MaterialIcons style={{ fontSize: wp(5.6), color: colorsPalette.secondaryColor }} active name="description" />
                                                            </Button>
                                                        </Left>
                                                        <Body>
                                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Description</Text>
                                                        </Body>
                                                        <Right>
                                                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }} >{_.truncate(item.description, { separator: "...", length: 15 })}</Text>
                                                        </Right>
                                                    </ListItem>

                                                    {/* IMAGEN */}
                                                    <ListItem icon style={{ justifyContent: 'space-between', height: 110, padding: 10 }}>
                                                        <Left>
                                                            <Button style={{ backgroundColor: isLoading ? colorsPalette.opaqueWhite : "#4DB6AC", right: 10 }}>
                                                                <FontAwesome style={{ fontSize: wp(4.5), color: colorsPalette.secondaryColor, left: 1 }} active name="picture-o" />
                                                            </Button>
                                                            <Text allowFontScaling={false} style={{ color: isLoading ? colorsPalette.opaqueWhite : null, fontSize: wp(4), fontWeight: 'bold' }}>Picture</Text>
                                                        </Left>
                                                        <Image style={{ height: "100%", width: "60%" }} source={{ uri: item.picture.localUrl }} />
                                                    </ListItem>

                                                    <View style={{ borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', width: '83%', alignSelf: 'flex-end' }} />
                                                </List>)}
                                        </Swiper>
                                    </List>
                                </Content> : null}
                        </View>
                    </Row>
                </Grid>

                <Footer style={{ backgroundColor: colorsPalette.transparent, borderTopColor: colorsPalette.transparent }}>
                    <Animatable.View
                        animation={errSubmitdata ? "shake" : undefined}
                        onAnimationEnd={() => this.setState({ errSubmitdata: false })}
                        duration={1000}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "80%",
                            shadowColor: colorsPalette.primaryShadowColor, shadowOffset: { width: 1 }, shadowOpacity: 1,
                        }}>
                        <Button
                            disabled={isLoading}
                            onPress={() => this._submit()}
                            iconRight style={{
                                width: "80%",
                                alignSelf: 'center',
                                backgroundColor: colorsPalette.primaryColor,
                                justifyContent: 'center',
                            }}>
                            {isLoading
                                ? <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text allowFontScaling={false} style={{ color: colorsPalette.opaqueWhite, fontSize: wp(3) }}>Creating contest, please wait...  </Text>
                                    <Spinner size="small" color={colorsPalette.opaqueWhite} />
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