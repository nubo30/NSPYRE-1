import React, { Component } from 'react';
import { Dimensions, Modal, Keyboard } from 'react-native'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, ListItem, Input, Item, Spinner, Switch, CheckBox } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'
import Swiper from 'react-native-swiper'

// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

// Icons
import { Entypo, Feather, AntDesign } from '@expo/vector-icons'
import { colorsPalette } from '../../../global/static/colors';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class Share extends Component {
    state = {
        // Inputs
        contentUserShare: "",
        footerContent: "",
        whatUserDo: "",
        socialMediaHandle: {
            facebook: "",
            twitter: "",
            instagram: "",
            snapchat: ""
        },

        isLoading: false,
        messageFlash: { cognito: null },

        // Modal
        visibleModalSocialMediaHandleChoose: false,
        visibleModaltTypeContent: false,

        // Actions
        mentionInTheSocialMedias: false,
        checkBoxVideos: false,
        checkBoxImagen: false
    }

    // Modal
    _visibleModalSocialMediaHandleChoose = (visible) => this.setState({ visibleModalSocialMediaHandleChoose: visible })

    // Unir datos al objeto global
    _submit = async () => {
        this.setState({ isLoading: true })
        const { _indexChangeSwiper, _dataFromForms } = this.props
        const { footerContent, contentUserShare, whatUserDo, socialMediaHandle, mentionInTheSocialMedias } = this.state
        const data = { share: mentionInTheSocialMedias ? { footerContent, contentUserShare, whatUserDo, socialMediaHandle: JSON.stringify(socialMediaHandle) } : null }
        try {
            await _dataFromForms(data)
            await _indexChangeSwiper(1)
            this.setState({ isLoading: false })
        } catch (error) {
            alert(error)
            this.setState({ isLoading: false })
        }
    }


    changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _validateData = () => {
        const { socialMediaHandle, footerContent, contentUserShare, whatUserDo, checkBoxImagen, checkBoxVideos } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram
                ? footerContent
                    ? contentUserShare && checkBoxImagen || checkBoxVideos
                        ? whatUserDo
                            ? this._submit()
                            : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Indicates what the user will share" } } })
                        : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid type user share" } } })
                    : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid footer content" } } })
                : this.setState({ isvalidFormAnimation: true, isLoading: false, messageFlash: { cognito: { message: "Invalid social media handle" } } })
        }, 500);
    }

    render() {
        const {
            // input
            footerContent,
            socialMediaHandle,
            whatUserDo,

            isvalidFormAnimation,
            isLoading,
            messageFlash,

            // Actions
            mentionInTheSocialMedias,
            checkBoxVideos,
            checkBoxImagen,

            // modal
            visibleModalSocialMediaHandleChoose,
            visibleModaltTypeContent

        } = this.state
        const { userData, _indexChangeSwiper } = this.props
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
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: isLoading ? "#EEEEEE" : "#FFF", fontSize: wp(4) }}>About the prize</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: isLoading ? '#EEEEEE' : '#FFF', fontSize: wp(5) }}>Share</Title>
                    </Left>
                </Header>

                <Grid style={{ top: -10 }}>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4), fontSize: wp(4.5), color: isLoading ? '#EEEEEE' : '#FFF', fontWeight: '100' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), fontSize: wp(11), fontWeight: 'bold', color: isLoading ? "#EEEEEE" : "#FFF" }}>Tell us something else</Text> {'\n'}This could create mention of your brand.
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content contentContainerStyle={{ paddingTop: 10 }}
                                keyboardShouldPersistTaps={'always'}>

                                {/* MENTION IN THE SOCIAL MEDIA? */}
                                <ListItem icon style={{ minHeight: 60 }}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#2979FF" }}>
                                            <Feather active name="share-2" style={{ fontSize: wp(5.5), color: '#FFF', top: 0.2, left: 0.5 }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ minHeight: 60 }}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), fontWeight: 'bold' }}>Do you want the recipient to make a mention of you and your gift on social media?</Text>
                                    </Body>
                                    <Right style={{ minHeight: 60 }}>
                                        <Switch
                                            value={mentionInTheSocialMedias}
                                            onChange={() => this.setState({
                                                mentionInTheSocialMedias: !mentionInTheSocialMedias,
                                            })} />
                                    </Right>
                                </ListItem>

                                {/* SELECT SOCIALS MEDIAS */}
                                <ListItem
                                    underlayColor="rgba(0,0,0,0.0)"
                                    onPress={() => this._visibleModalSocialMediaHandleChoose(true)}
                                    icon style={{ top: 15 }} disabled={!mentionInTheSocialMedias}>
                                    <Left>
                                        <Button disabled style={{ backgroundColor: !mentionInTheSocialMedias ? "#FF9100" : "#FF6D00" }}>
                                            <AntDesign active name="select1" style={{ fontSize: wp(5.5), color: '#FFF', top: 0.2, left: 0.5 }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: !mentionInTheSocialMedias ? "#E0E0E0" : null }}>Select the plataform</Text>
                                    </Body>
                                    <Right>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4) }}> {mentionInTheSocialMedias ? socialMediaHandle.twitter || socialMediaHandle.instagram || socialMediaHandle.facebook ? "Specified" : null : null}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>

                                {/* TYPE OF CONTENT */}
                                <ListItem
                                    underlayColor="rgba(0,0,0,0.0)"
                                    onPress={() => this.setState({ visibleModaltTypeContent: true })}
                                    icon style={{ top: 15 }} disabled={!mentionInTheSocialMedias}>
                                    <Left>
                                        <Button disabled style={{ backgroundColor: !mentionInTheSocialMedias ? "#B0BEC5" : "#78909C" }}>
                                            <Icon type="Entypo" active name="attachment" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: !mentionInTheSocialMedias ? "#E0E0E0" : null }}>Type content</Text>
                                    </Body>
                                    <Right>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4) }}> {mentionInTheSocialMedias ? footerContent && whatUserDo && checkBoxImagen || checkBoxVideos ? 'Specified' : null : null}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            </Content>
                        </View>
                        <Text allowFontScaling={false} style={{ color: '#F44336', fontSize: wp(4), top: 10 }}>
                            {messageFlash.cognito && messageFlash.cognito.message}
                        </Text>
                    </Row>
                </Grid>

                {/* SUBMIT DATA TO AWS */}
                <Footer style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)' }
                }>
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
                            onPress={() => { mentionInTheSocialMedias ? this._validateData() : this._submit() }}
                            iconRight style={{
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: '#E91E63'
                            }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), fontWeight: 'bold', letterSpacing: 2, color: isLoading ? "#EEEEEE" : "#FFF" }}>Continue</Text>
                            {isLoading ? <Spinner color={isLoading ? "#EEEEEE" : "#FFF"} size="small" style={{ left: -10 }} /> : <Icon name='arrow-forward' />}
                        </Button>
                    </Animatable.View>
                </Footer>

                {/* COMPANY SOCIAL MEDIA HANDLE */}
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={visibleModalSocialMediaHandleChoose}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Write in one social...</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() => { this._visibleModalSocialMediaHandleChoose(false); socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram ? null : this.setState({ socialMediaHandle: { facebook: "", twitter: "", instagram: "" } }) }}>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram ? "#E91E63" : "#3333"
                                    }}>{socialMediaHandle.facebook || socialMediaHandle.twitter || socialMediaHandle.instagram ? "Done" : "Cancel"
                                        }</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* FACEBOOK */}
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#3b5998" }}>
                                        <Feather active name="facebook" style={{ color: '#FFF', fontSize: wp(5.5) }} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Input
                                        allowFontScaling={false}
                                        onChangeText={(facebook) => this.setState({ socialMediaHandle: { facebook } })}
                                        value={socialMediaHandle.facebook}
                                        placeholder='https://www.facebook.com/your-facebook' />
                                    {socialMediaHandle.twitter || socialMediaHandle.instagram ? <View style={{ width: "100%", position: 'absolute', height: "100%" }} /> : null}
                                </Body>
                                <Right />
                            </ListItem>

                            {/* TWITTER */}
                            <ListItem icon style={{ borderBottomColor: 'rgba(0,0,0,0.0)', top: 5 }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#00acee" }}>
                                        <Entypo active name="twitter" style={{ color: '#FFF', fontSize: wp(5.5), top: 2 }} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Input
                                        allowFontScaling={false}
                                        onChangeText={(twitter) => this.setState({ socialMediaHandle: { twitter } })}
                                        value={socialMediaHandle.twitter}
                                        placeholder='https://www.twitter.com/your-twitter' />
                                    {socialMediaHandle.facebook || socialMediaHandle.instagram ? <View style={{ width: "100%", position: 'absolute', height: "100%" }} /> : null}
                                </Body>
                                <Right />
                            </ListItem>

                            {/* INSTAGRAM */}
                            <ListItem icon style={{ borderBottomColor: 'rgba(0,0,0,0.0)', top: 10 }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#E1306C" }}>
                                        <AntDesign active name="instagram" style={{ color: '#FFF', fontSize: wp(5.5), top: 1, left: 0.5 }} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Input
                                        allowFontScaling={false}
                                        onChangeText={(instagram) => this.setState({ socialMediaHandle: { instagram } })}
                                        value={socialMediaHandle.instagram}
                                        placeholder='https://www.instagram.com/your-instagram' />
                                    {socialMediaHandle.facebook || socialMediaHandle.twitter ? <View style={{ width: "100%", position: 'absolute', height: "100%" }} /> : null}
                                </Body>
                                <Right />
                            </ListItem>
                            <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, textAlign: 'center', alignSelf: 'center', top: 20 }}>We will use the selected social network to redirect users</Text>
                        </Content>
                    </Container>
                </Modal>

                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModaltTypeContent}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Swiper
                        scrollEnabled={false}
                        activeDotColor={colorsPalette.primaryColor}
                        dotColor={colorsPalette.gradientGray}
                        ref={r => this.swiper = r}
                        loop={false}>
                        <Container>
                            <Header transparent>
                                <Left style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', left: 30 }}>
                                    <Button iconRight transparent onPress={() => this.setState({ visibleModaltTypeContent: false })}>
                                        <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                        <Text
                                            allowFontScaling={false}
                                            minimumFontScale={wp(4)}
                                            style={{ color: colorsPalette.primaryColor, fontSize: wp(4) }}>Close</Text>
                                    </Button>
                                    <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(6) }}>Content to share</Title>
                                </Left>
                                <Right>
                                    <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() => {
                                        Keyboard.dismiss();
                                        footerContent
                                            ? this.changeSwiper(1)
                                            : this.setState({ footerContent: "", visibleModaltTypeContent: false })
                                    }}>
                                        <Text allowFontScaling={false} style={{
                                            fontSize: wp(4),
                                            letterSpacing: 1,
                                            color: footerContent ? "#E91E63" : "#3333"
                                        }}>{footerContent ? "Continue" : "Cancel"}</Text>
                                    </Button>
                                </Right>
                            </Header>
                            <Content scrollEnabled={false}>
                                <Item style={{ width: "100%", padding: 10, borderBottomColor: colorsPalette.transparent }}>
                                    <Input
                                        allowFontScaling={false}
                                        maxLength={1024}
                                        multiline
                                        numberOfLines={3}
                                        placeholderTextColor="#EEEE"
                                        autoFocus={true}
                                        value={footerContent}
                                        keyboardType="ascii-capable"
                                        selectionColor="#E91E63"
                                        style={{ padding: 5, maxHeight: 2220 }}
                                        onChangeText={(value) => this.setState({ footerContent: value })} />
                                </Item>
                                <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, textAlign: 'center', alignSelf: 'center', top: 20 }}>
                                    Before continuing, you should indicate the content that would appear in the footer at the time the users share what you want.
                                    For example: "Visit our website, we have more of this!"
                            </Text>
                            </Content>
                        </Container>
                        <Container>
                            <Header transparent>
                                <Left style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', left: 22 }}>
                                    <Button iconRight transparent onPress={() => this.changeSwiper(-1)}>
                                        <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                        <Text
                                            allowFontScaling={false}
                                            minimumFontScale={wp(4)}
                                            style={{ color: colorsPalette.primaryColor, fontSize: wp(4) }}>Back</Text>
                                    </Button>
                                    <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Type content</Title>
                                </Left>
                                <Right>
                                    <Button
                                        disabled={checkBoxVideos || checkBoxImagen ? false : true}
                                        small transparent style={{ alignSelf: 'flex-end' }} onPress={() => checkBoxVideos || checkBoxImagen ? this.changeSwiper(1) : null}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), letterSpacing: 1, color: checkBoxVideos || checkBoxImagen ? "#E91E63" : "#3333" }}>Continue</Text>
                                    </Button>
                                </Right>
                            </Header>
                            <Grid>
                                <Row size={20} style={{ justifyContent: 'center' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(5), color: colorsPalette.darkFont, textAlign: 'center', alignSelf: 'center', width: "80%" }}>
                                        What kind of content do you want users to share?
                                    </Text>
                                </Row>
                                <Row size={35} style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <Button
                                        onPress={() => this.setState({ checkBoxVideos: !checkBoxVideos, checkBoxImagen: false, contentUserShare: "videos" })}
                                        transparent icon style={{ width: '40%', height: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'column', top: 5 }}>
                                        <Icon type="Ionicons" name="ios-videocam" style={{ fontSize: wp(20), color: "#3333" }} />
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: '#3333' }}>Videos</Text>
                                    </Button>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(5), fontWeight: 'bold', color: '#333' }}>OR</Text>
                                    <Button
                                        onPress={() => this.setState({ checkBoxVideos: false, checkBoxImagen: !checkBoxImagen, contentUserShare: "imagen" })}
                                        transparent icon style={{ width: '40%', height: '40%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'column', top: 5 }}>
                                        <Icon type="Entypo" name="images" style={{ fontSize: wp(20), color: "#3333" }} />
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: '#3333' }}>Imagen</Text>
                                    </Button>
                                </Row>
                                <Row size={45} style={{ justifyContent: 'space-around', top: -40 }}>
                                    <CheckBox checked={checkBoxVideos} color={colorsPalette.primaryColor} style={{ left: -5 }} />
                                    <CheckBox checked={checkBoxImagen} color={colorsPalette.primaryColor} />
                                </Row>
                            </Grid>
                        </Container>
                        <Container>
                            <Header transparent>
                                <Left style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button iconRight transparent onPress={() => this.changeSwiper(-1)}>
                                        <Icon name='arrow-back' style={{ color: colorsPalette.primaryColor }} />
                                        <Text
                                            allowFontScaling={false}
                                            minimumFontScale={wp(4)}
                                            style={{ color: colorsPalette.primaryColor, fontSize: wp(4) }}>Back</Text>
                                    </Button>
                                    <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Describe</Title>
                                </Left>
                                <Right>
                                    <Button
                                        disabled={whatUserDo ? false : true}
                                        small transparent style={{ alignSelf: 'flex-end' }} onPress={() => whatUserDo ? this.setState({ visibleModaltTypeContent: false }) : null}>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), letterSpacing: 1, color: whatUserDo ? "#E91E63" : "#3333" }}>Done</Text>
                                    </Button>
                                </Right>
                            </Header>
                            <Grid style={{ padding: 10 }}>
                                <Row size={10}>
                                    <Text allowFontScaling={false} style={{ width: "90%", fontSize: wp(4) }}>As a last step, please describe or if possible give examples of what you want users to share on their social networks</Text>
                                </Row>
                                <Row size={90} style={{ alignItems: 'flex-start' }}>
                                    <Item style={{ width: "100%", borderBottomColor: colorsPalette.transparent }}>
                                        <Input
                                            allowFontScaling={false}
                                            maxLength={1024}
                                            multiline
                                            numberOfLines={3}
                                            placeholderTextColor="#EEEE"
                                            value={whatUserDo}
                                            keyboardType="ascii-capable"
                                            selectionColor="#E91E63"
                                            style={{ padding: 5, maxHeight: 220 }}
                                            onChangeText={(value) => this.setState({ whatUserDo: value })} />
                                    </Item>
                                </Row>
                            </Grid>
                        </Container>
                    </Swiper>
                </Modal>

            </Container>
        );
    }
}

export default Share