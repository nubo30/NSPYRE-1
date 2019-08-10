import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native'
import { Video } from 'expo';
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Separator, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'
import _ from 'lodash'
import { normalizeEmail } from 'validator'
import Swiper from 'react-native-swiper'
import AWS from 'aws-sdk'

// Gradients
import { GadrientsAuth } from '../../../Global/gradients/index'
import { MyStatusBar } from '../../../Global/statusBar/index'

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
        const { navigation, userData, contest } = this.props

        AWS.config.update({
            accessKeyId: "AKIAIQA34573X4TITQEQ",
            secretAccessKey: "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",
            "region": "sa-east-1"
        })

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

                // VIDEO OF THE CONTEST
                const blobVideo_ = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () { resolve(xhr.response) };
                    xhr.onerror = function () { reject(new TypeError("Network request failed")) };
                    xhr.responseType = "blob";
                    xhr.open("GET", item.video.localUrl, true);
                    xhr.send(null);
                });
                try {
                    await Storage.put(`users/${userData.email}/contest/prizes/pictures/owner/${item.picture.name}`, blobPicture_, { contentType: item.picture.type })
                    await Storage.put(`users/${userData.email}/contest/prizes/videos/owner/${item.video.name}`, blobVideo_, { contentType: item.video.type })
                } catch (error) {
                    console.log('Error al crear los premios');
                }
            })

            const newContest = await API.graphql(graphqlOperation(mutations.createCreateContest, { input: contest }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.sub } }))
            navigation.navigate("AboutContest", {
                contest: newContest.data.createCreateContest,
                fromWhere: 'createContest',
                userData
            })
        } catch (error) {
            this.setState({ isLoading: false, errSubmitdata: true })
            console.log(error)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { isLoading, errSubmitdata } = this.state
        const { _indexChangeSwiper, contest, userData } = this.props
        let prizes = contest.prizes === undefined ? [] : contest.prizes
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
                            <Text style={{ color: isLoading ? "#EEEEEE" : "#FFF" }}>Back</Text>
                        </Button>
                        <Title style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(7) }}>Summary</Title>
                    </Left>
                </Header>

                {/* Forms */}
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text style={{ fontSize: wp(4), color: isLoading ? "#EEEEEE" : "#FFF", textAlign: 'left', fontWeight: '100' }}>
                            <Text style={{ fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>We done!</Text> {'\n'}Please, check all the content that you have chosen, if there is something that you do not think you can go back and edit it</Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -20 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            {Object.keys(contest).length !== 0 ?
                                <Content contentContainerStyle={{ paddingTop: 10 }} scrollEnabled={!isLoading}>
                                    <List>
                                        <View style={{ backgroundColor: '#F5F5F5', height: screenHeight, position: 'absolute', top: -screenHeight + 5, left: 0, right: 0 }} />
                                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: '#F5F5F5' }}>
                                            <Text>ABOUT YOU</Text>
                                        </Separator>

                                        {/* NAME */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#007AFF" }}>
                                                    <Ionicons style={{ fontSize: wp(5), color: '#FFF' }} active name="md-person" />
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
                                                    <Ionicons style={{ fontSize: wp(5), color: '#FFF' }} active name="md-person" />
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
                                                    <Foundation style={{ fontSize: wp(5.6), color: '#FFF' }} active name="telephone" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Number Phone</Text>
                                            </Body>
                                            <Right>
                                                <Text>{userData.phone_number}</Text>
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
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Email</Text>
                                            </Body>
                                            <Right>
                                                <Text>{userData.email === undefined ? null : normalizeEmail(userData.email)}</Text>
                                                <Icon active name="arrow-forward" />
                                            </Right>
                                        </ListItem>

                                        {/* LOCATION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D" }}>
                                                    <Entypo style={{ fontSize: wp(6), color: '#FFF' }} active name="location-pin" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Location</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(`${contest.aboutTheUser.location.city}, ${contest.aboutTheUser.location.country}, ${contest.aboutTheUser.location.state}, ${contest.aboutTheUser.location.street}`, { length: 29, separator: '...' })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* COMPANY NAME */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#EC407A" }}>
                                                    <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF', left: 2 }} active name="building" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Company Name</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(`${contest.aboutTheUser.companyName}`, { separator: '...', length: 15 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* TITTLE IN THE COMPANY */}
                                        <ListItem icon last>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                                    <Entypo style={{ fontSize: wp(5.5), color: '#FFF', left: 1, top: 1 }} active name="creative-commons-attribution" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Title in the company</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(`${contest.aboutTheUser.titleInTheCompany}`, { separator: '...', length: 20 })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: '#F5F5F5' }}>
                                            <Text>ABOUT THE CONTEST</Text>
                                        </Separator>

                                        {/* Category */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#007AFF" }}>
                                                    <AntDesign style={{ fontSize: wp(5), color: '#FFF' }} active name="select1" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Category</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.startCase(_.lowerCase(contest && contest.general && contest.general.category))}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* NAME CONTEST */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                                    <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Name Of Contest</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.startCase(contest && contest.general && contest.general.nameOfContest)}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* DESCRIPTION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#F4511E" }}>
                                                    <MaterialIcons style={{ fontSize: wp(5.6), color: '#FFF' }} active name="description" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Description</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(`${contest && contest.general && contest.general.description}`, { separator: '...', length: 20 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* INSTRUCTION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#EC407A" }}>
                                                    <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF', left: 1 }} active name="warning" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Instructions</Text>
                                            </Body>
                                            <Right>
                                                <Text>{_.truncate(`${contest && contest.general && contest.general.instructions}`, { separator: '...', length: 20 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* IMAGEN */}
                                        <ListItem icon style={{ justifyContent: 'space-between', height: 110, padding: 10 }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#4DB6AC", right: 10 }}>
                                                    <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF', left: 1 }} active name="picture-o" />
                                                </Button>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Picture</Text>
                                            </Left>
                                            <Image style={{ height: "100%", width: "60%" }} source={{ uri: contest && contest.general && contest.general.picture.localUrl }} />
                                        </ListItem>

                                        <View style={{ borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', width: '83%', alignSelf: 'flex-end' }} />

                                        {/* VIDEO */}
                                        <ListItem icon style={{ justifyContent: 'space-between', height: 110, padding: 10 }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D", right: 10 }}>
                                                    <Feather style={{ fontSize: wp(5), color: '#FFF' }} active name="video" />
                                                </Button>
                                                <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Video</Text>
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

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: '#F5F5F5', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>PRIZES</Text>
                                            <Text style={{ right: 15 }}>{prizes === undefined ? 0 : prizes.length} Prizes Created</Text>
                                        </Separator>

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
                                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                                                <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                                            </Button>
                                                        </Left>
                                                        <Body>
                                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Name Of Prize</Text>
                                                        </Body>
                                                        <Right>
                                                            <Text>{item.name}</Text>
                                                        </Right>
                                                    </ListItem>

                                                    {/* DESCRIPTION */}
                                                    <ListItem icon>
                                                        <Left>
                                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#F4511E" }}>
                                                                <MaterialIcons style={{ fontSize: wp(5.6), color: '#FFF' }} active name="description" />
                                                            </Button>
                                                        </Left>
                                                        <Body>
                                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Description</Text>
                                                        </Body>
                                                        <Right>
                                                            <Text>{_.truncate(item.description, { separator: "...", length: 20 })}</Text>
                                                        </Right>
                                                    </ListItem>

                                                    {/* PRICE */}
                                                    <ListItem icon>
                                                        <Left>
                                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#F4511E" }}>
                                                                <Ionicons style={{ fontSize: wp(5.6), color: '#FFF' }} active name="ios-pricetag" />
                                                            </Button>
                                                        </Left>
                                                        <Body>
                                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Price</Text>
                                                        </Body>
                                                        <Right>
                                                            <Text>{_.replace(_.replace(_.startCase(_.lowerCase(_.replace(item.price, new RegExp("_", "g"), " "))), new RegExp("P", "g"), ""), '0 ', "0$ - ")}{item.price === 'OTHERS' || item.price === 'NO_SELECT' ? '' : '$'}</Text>
                                                        </Right>
                                                    </ListItem>

                                                    {/* IMAGEN */}
                                                    <ListItem icon style={{ justifyContent: 'space-between', height: 110, padding: 10 }}>
                                                        <Left>
                                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#4DB6AC", right: 10 }}>
                                                                <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF', left: 1 }} active name="picture-o" />
                                                            </Button>
                                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Picture</Text>
                                                        </Left>
                                                        <Image style={{ height: "100%", width: "60%" }} source={{ uri: item.picture.localUrl }} />
                                                    </ListItem>

                                                    <View style={{ borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', width: '83%', alignSelf: 'flex-end' }} />

                                                    {/* VIDEO */}
                                                    <ListItem icon style={{ justifyContent: 'space-between', height: 110, padding: 10 }}>
                                                        <Left>
                                                            <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D", right: 10 }}>
                                                                <Feather style={{ fontSize: wp(5), color: '#FFF' }} active name="video" />
                                                            </Button>
                                                            <Text style={{ color: isLoading ? "#EEEEEE" : null }}>Video</Text>
                                                        </Left>
                                                        <Video
                                                            source={{ uri: item.video.localUrl }}
                                                            useNativeControls
                                                            rate={1.0}
                                                            volume={1.0}
                                                            isMuted={false}
                                                            resizeMode="cover"
                                                            shouldPlay={false}
                                                            isLooping={false}
                                                            style={{ width: "60%", height: "100%" }} />
                                                    </ListItem>
                                                </List>)}
                                        </Swiper>
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
                            onPressIn={() => this.setState({ isLoading: true })}
                            onPress={() => this._submit()}
                            iconRight style={{
                                width: "80%",
                                alignSelf: 'center',
                                backgroundColor: '#E91E63',
                                justifyContent: 'center',
                            }}>
                            {isLoading
                                ? <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#EEEEEE" }}>Creating contest, please wait...  </Text>
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