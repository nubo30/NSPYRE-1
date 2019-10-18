import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native'
import { Video } from 'expo-av';
import { API, graphqlOperation, Storage } from 'aws-amplify'
import AWS from 'aws-sdk'
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Separator, Spinner } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'
import _ from 'lodash'
import truncate from 'lodash/truncate'
import { normalizeEmail } from 'validator'

import { securityCredentials } from '../../../global/aws/credentials'

// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

// Icons
import { Ionicons, Entypo, FontAwesome, MaterialIcons, Feather, Foundation, AntDesign } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

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
        const { navigation, userData, prize } = this.props

        AWS.config.update({ accessKeyId: securityCredentials.accessKeyId, secretAccessKey: securityCredentials.secretAccessKey, region: securityCredentials.region })

        // PICTURE OF THE CONTEST
        const blobPicture = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", prize.general.picture.localUrl, true);
            xhr.send(null);
        });

        // VIDEO OF THE CONTEST
        const blobVideo = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", prize.general.video.localUrl, true);
            xhr.send(null);
        });
        try {
            await Storage.put(`users/${userData.email}/prize/pictures/owner/${prize.general.picture.name}`, blobPicture, { contentType: prize.general.picture.type })
            await Storage.put(`users/${userData.email}/prize/videos/owner/${prize.general.video.name}`, blobVideo, { contentType: prize.general.video.type })
            await API.graphql(graphqlOperation(mutations.createSubmitPrize, { input: prize }))
            await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id } }))
            navigation.navigate("AboutThePrize", {
                prize: Object.assign(prize, { user: { name: userData.name, avatar: userData.avatar } }),
                fromWhere: 'fromSubmitPrize',
                userData
            })

            this.setState({ isLoading: false })
        } catch (error) {
            this.setState({ isLoading: false, errSubmitdata: true })
            console.log(error)
        }
    }

    render() {
        const { isLoading, errSubmitdata } = this.state
        const { _indexChangeSwiper, userData, prize } = this.props
        console.log(prize)
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
                            <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(6) }}>Check</Title>
                    </Left>
                </Header>

                {/* Forms */}
                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(3), color: isLoading ? "#EEEEEE" : "#FFF", textAlign: 'left', fontWeight: 'normal' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>We done!</Text> {'\n'}Please, check all the prize that you have chosen, if there is something that you do not think you can go back and edit it</Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -20 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            {Object.keys(prize).length !== 0 ?
                                <Content contentContainerStyle={{ paddingTop: 10 }} scrollEnabled={!isLoading}>
                                    <List>
                                        <View style={{ backgroundColor: '#F5F5F5', height: screenHeight, position: 'absolute', top: -screenHeight + 5, left: 0, right: 0 }} />
                                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: '#F5F5F5' }}>
                                            <Text allowFontScaling={false}>ABOUT YOU</Text>
                                        </Separator>

                                        {/* NAME */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#007AFF" }}>
                                                    <Ionicons style={{ fontSize: wp(5), color: '#FFF' }} active name="md-person" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{truncate(userData.name, { length: 15, separator: "..." })}</Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Last name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{truncate(userData.lastname, { length: 15, separator: "..." })}</Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Number phone</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{userData.phone === null ? 'Not specified' : userData.phone}</Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Email</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{userData.email === undefined ? null : truncate(normalizeEmail(userData.email), { length: 15, separator: "..." })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* GENERAL INFORMATION */}
                                        <ListItem disabled={isLoading} icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#757575" }}>
                                                    <Icon type="Ionicons" active name="ios-information-circle" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>General information</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(`${prize.aboutTheCompany.generalInformation}`, { separator: '...', length: 15 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* BUSINESS LOCATION */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D" }}>
                                                    <Entypo style={{ fontSize: wp(6), color: '#FFF' }} active name="location-pin" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Business location</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(`${prize.aboutTheCompany.businessLocation.country}, ${prize.aboutTheCompany.businessLocation.city}, ${prize.aboutTheCompany.businessLocation.state}, ${prize.aboutTheCompany.businessLocation.street}`, { length: 29, separator: '...' })}</Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Company Name</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(`${prize.aboutTheCompany.companyName}`, { separator: '...', length: 15 })}</Text>
                                            </Right>
                                        </ListItem>

                                        <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: '#F5F5F5' }}>
                                            <Text allowFontScaling={false}>ABOUT THE PRIZE</Text>
                                        </Separator>

                                        {/* Category */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#007AFF" }}>
                                                    <AntDesign style={{ fontSize: wp(5), color: '#FFF' }} active name="select1" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Category</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.startCase(_.lowerCase(prize && prize.category))}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* PRICE */}
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#43A047" }}>
                                                    <MaterialIcons style={{ fontSize: wp(6), color: '#FFF', left: 1 }} active name="attach-money" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Price</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.startCase(prize && prize.general && prize.general.price)}</Text>
                                            </Right>
                                        </ListItem>

                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#009688" }}>
                                                    <Entypo style={{ fontSize: wp(5), color: '#FFF' }} active name="star" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Name of prize</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.startCase(prize && prize.general && prize.general.nameOfPrize)}</Text>
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
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Description</Text>
                                            </Body>
                                            <Right>
                                                <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(`${prize && prize.general && prize.general.description}`, { separator: '...', length: 20 })}</Text>
                                            </Right>
                                        </ListItem>

                                        {/* IMAGEN */}
                                        <ListItem icon style={{ justifyContent: 'space-between', height: 110, padding: 10 }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#4DB6AC", right: 10 }}>
                                                    <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF', left: 1 }} active name="picture-o" />
                                                </Button>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Picture</Text>
                                            </Left>
                                            <Image style={{ height: "100%", width: "60%" }} source={{ uri: prize && prize.general && prize.general.picture.localUrl }} />
                                        </ListItem>

                                        <View style={{ borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', width: '83%', alignSelf: 'flex-end' }} />

                                        {/* VIDEO */}
                                        <ListItem icon style={{ justifyContent: 'space-between', height: 110, padding: 10 }}>
                                            <Left>
                                                <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FBC02D", right: 10 }}>
                                                    <Feather style={{ fontSize: wp(5), color: '#FFF' }} active name="video" />
                                                </Button>
                                                <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Video</Text>
                                            </Left>
                                            <Video
                                                source={{ uri: prize && prize.general && prize.general.video.localUrl }}
                                                useNativeControls
                                                rate={1.0}
                                                volume={1.0}
                                                isMuted={false}
                                                resizeMode="cover"
                                                shouldPlay={false}
                                                isLooping={false}
                                                style={{ width: "60%", height: "100%" }} />
                                        </ListItem>
                                        {prize.share === null || prize.share === undefined ? null :
                                            <View>
                                                <Separator bordered style={{ backgroundColor: '#F5F5F5', borderTopColor: '#F5F5F5' }}>
                                                    <Text allowFontScaling={false}>SHARE</Text>
                                                </Separator>

                                                <ListItem icon>
                                                    <Left>
                                                        <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#607D8B" }}>
                                                            <Icon type="MaterialCommunityIcons" name="page-layout-footer" active />
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Footer content</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(`${prize && prize.share && prize.share.footerContent}`, { separator: '...', length: 20 })}</Text>
                                                    </Right>
                                                </ListItem>

                                                <ListItem icon>
                                                    <Left>
                                                        <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#FF3D00" }}>
                                                            <Icon type="FontAwesome" name="slideshare" active />
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Content user share</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(`${prize && prize.share && prize.share.contentUserShare}`, { separator: '...', length: 20 })}</Text>
                                                    </Right>
                                                </ListItem>

                                                <ListItem icon>
                                                    <Left>
                                                        <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#2962FF" }}>
                                                            <Icon type="Entypo" name="user" active />
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>What user do</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{_.truncate(`${prize && prize.share && prize.share.whatUserDo}`, { separator: '...', length: 20 })}</Text>
                                                    </Right>
                                                </ListItem>

                                                <ListItem icon>
                                                    <Left>
                                                        <Button style={{ backgroundColor: isLoading ? "#EEEEEE" : "#E65100" }}>
                                                            <Icon type="MaterialCommunityIcons" name="earth" active />
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Text allowFontScaling={false} style={{ color: isLoading ? "#EEEEEE" : colorsPalette.darkFont, fontSize: wp(4), fontWeight: 'bold' }}>Social media</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: colorsPalette.darkFont }}>{Object.keys(JSON.parse(prize.share.socialMediaHandle))}</Text>
                                                    </Right>
                                                </ListItem>
                                            </View>}
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
                                    <Text allowFontScaling={false} style={{ color: "#EEEEEE", fontSize: wp(3) }}>Creating prize, please wait...  </Text>
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