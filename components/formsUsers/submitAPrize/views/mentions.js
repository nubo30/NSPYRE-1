import React, { Component } from 'react';
import { Dimensions, Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, ListItem, Input, Item, Spinner, Switch } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row, Col } from 'react-native-easy-grid'
import _ from 'lodash'

// Gradients
import { GadrientsAuth } from '../../../Global/gradients/index'
import { MyStatusBar } from '../../../Global/statusBar/index'

// Icons
import { Ionicons, MaterialCommunityIcons, Entypo, Feather, AntDesign } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class SomethingMore extends Component {
    state = {
        // Inputs
        description: "",
        socialMediaHandle: {
            facebook: "",
            twitter: "",
            instagram: "",
            snapchat: ""
        },
        socialMediaHandleSeleted: '',

        isLoading: false,

        // Modal
        visibleModalSocialMediaHandleChoose: false,
        visibleModalDescription: false,

        // Actions
        mentionInTheSocialMedias: false,
        facebookSwitch: false,
        twitterSwitch: false,
        instagramSwitch: false,
        snapchatSwitch: false,
        typeOfSocialNetwork: ''
    }

    // Modal
    _visibleModalSocialMediaHandleChoose = (visible) => this.setState({ visibleModalSocialMediaHandleChoose: visible })

    // Unir datos al objeto global
    _submit = async () => {
        this.setState({ isLoading: true })
        const { _indexChangeSwiper, _dataFromForms } = this.props
        const { description, socialMediaHandleSeleted, typeOfSocialNetwork } = this.state
        const data = { delivery: { description, socialMediaSelected: socialMediaHandleSeleted, typeOfSocialNetwork } }
        try {
            await _dataFromForms(data)
            await _indexChangeSwiper(1)
            this.setState({ isLoading: false })
        } catch (error) {
            alert(error)
            this.setState({ isLoading: false })
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.wantSuggestedFields) {
            const { dataFromThePreviousSubmitPrize } = nextProps
            this.setState({
                description: dataFromThePreviousSubmitPrize.delivery.description
            })
        }
    }

    render() {
        const {
            description,

            isvalidFormAnimation,
            isLoading,

            // Actions
            mentionInTheSocialMedias,
            facebookSwitch,
            twitterSwitch,
            instagramSwitch,
            snapchatSwitch,

            // modal
            visibleModalSocialMediaHandleChoose,
            visibleModalDescription

        } = this.state
        const { userData, prize, _indexChangeSwiper } = this.props
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
                        <Title allowFontScaling={false} style={{ color: isLoading ? '#EEEEEE' : '#FFF', fontSize: wp(5) }}>Prize Delivery</Title>
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
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4) }}> Do you want the recipient to make a mention of you and your gift on social media?</Text>
                                    </Body>
                                    <Right style={{ minHeight: 60 }}>
                                        <Switch
                                            value={mentionInTheSocialMedias}
                                            onChange={() => this.setState({
                                                mentionInTheSocialMedias: !mentionInTheSocialMedias,
                                                facebookSwitch: mentionInTheSocialMedias ? true : false,
                                                twitterSwitch: mentionInTheSocialMedias ? true : false,
                                                instagramSwitch: mentionInTheSocialMedias ? true : false,
                                                snapchatSwitch: mentionInTheSocialMedias ? true : false,
                                            })} />
                                    </Right>
                                </ListItem>

                                {/* SELECT SOCIALS MEDIAs */}
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
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4) }}> {mentionInTheSocialMedias ? facebookSwitch || twitterSwitch || instagramSwitch || snapchatSwitch ? "Selected" : null : null}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>

                                {/* SELECT SOCIALS MEDIAs */}
                                <ListItem
                                    underlayColor="rgba(0,0,0,0.0)"
                                    onPress={() => this.setState({ visibleModalDescription: true })}
                                    icon style={{ top: 15 }} disabled={!mentionInTheSocialMedias}>
                                    <Left>
                                        <Button disabled style={{ backgroundColor: !mentionInTheSocialMedias ? "#B0BEC5" : "#78909C" }}>
                                            <MaterialCommunityIcons active name="comment-outline" style={{ fontSize: wp(5.5), color: '#FFF', top: 0.2, left: 0.5 }} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: !mentionInTheSocialMedias ? "#E0E0E0" : null }}>Make a comment</Text>
                                    </Body>
                                    <Right>
                                        <Text allowFontScaling={false} style={{ fontSize: wp(4) }}> {mentionInTheSocialMedias ? description ? 'Specified' : null : null}</Text>
                                        <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            </Content>
                        </View>
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
                            onPress={() => { this._submit() }}
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
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Choose One Social...</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={
                                    facebookSwitch ||
                                        twitterSwitch ||
                                        instagramSwitch ||
                                        snapchatSwitch
                                        ? () => this._visibleModalSocialMediaHandleChoose(false)
                                        : () => {
                                            this.setState({ socialMediaHandle: { facebook: "", twitter: "", instagram: "", snapchat: "" } });
                                            this._visibleModalSocialMediaHandleChoose(false)
                                        }
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: facebookSwitch ||
                                            twitterSwitch ||
                                            instagramSwitch ||
                                            snapchatSwitch ? "#E91E63" : "#3333"
                                    }}>{
                                            facebookSwitch ||
                                                twitterSwitch ||
                                                instagramSwitch ||
                                                snapchatSwitch ? "Done" : "Cancel"
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
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4), fontSize: wp(5) }}>{prize && prize.aboutTheCompany && prize.aboutTheCompany.socialMediaHandle && prize.aboutTheCompany.socialMediaHandle.facebook}</Text>
                                </Body>
                                <Right>
                                    <Switch
                                        value={facebookSwitch}
                                        onChange={() => this.setState({
                                            facebookSwitch: !facebookSwitch,
                                            twitterSwitch: false,
                                            instagramSwitch: false,
                                            snapchatSwitch: false,
                                            socialMediaHandleSeleted: !facebookSwitch ? prize.aboutTheCompany.socialMediaHandle.facebook : "",
                                            typeOfSocialNetwork: 'fb'
                                        })} />
                                </Right>
                            </ListItem>

                            {/* TWITTER */}
                            <ListItem icon style={{ borderBottomColor: 'rgba(0,0,0,0.0)', top: 5 }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#00acee" }}>
                                        <Entypo active name="twitter" style={{ color: '#FFF', fontSize: wp(5.5), top: 2 }} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4), fontSize: wp(5) }}>{prize && prize.aboutTheCompany && prize.aboutTheCompany.socialMediaHandle && prize.aboutTheCompany.socialMediaHandle.twitter}</Text>
                                </Body>
                                <Right>
                                    <Switch
                                        value={twitterSwitch}
                                        onChange={() => this.setState({
                                            twitterSwitch: !twitterSwitch,
                                            facebookSwitch: false,
                                            instagramSwitch: false,
                                            snapchatSwitch: false,
                                            socialMediaHandleSeleted: !twitterSwitch ? prize.aboutTheCompany.socialMediaHandle.twitter : "",
                                            typeOfSocialNetwork: 'tt'
                                        })} />
                                </Right>
                            </ListItem>

                            {/* INSTAGRAM */}
                            <ListItem icon style={{ borderBottomColor: 'rgba(0,0,0,0.0)', top: 10 }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#E1306C" }}>
                                        <AntDesign active name="instagram" style={{ color: '#FFF', fontSize: wp(5.5), top: 1, left: 0.5 }} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4), fontSize: wp(5) }}>{prize && prize.aboutTheCompany && prize.aboutTheCompany.socialMediaHandle && prize.aboutTheCompany.socialMediaHandle.instagram}</Text>
                                </Body>
                                <Right>
                                    <Switch
                                        value={instagramSwitch}
                                        onChange={() => this.setState({
                                            instagramSwitch: !instagramSwitch,
                                            twitterSwitch: false,
                                            facebookSwitch: false,
                                            snapchatSwitch: false,
                                            socialMediaHandleSeleted: !instagramSwitch ? prize.aboutTheCompany.socialMediaHandle.instagram : "",
                                            typeOfSocialNetwork: 'ig'
                                        })} />
                                </Right>
                            </ListItem>

                            {/* SNACPCHAT */}
                            <ListItem icon style={{ borderBottomColor: 'rgba(0,0,0,0.0)', top: 15 }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#FFEA00" }}>
                                        <Ionicons active name="logo-snapchat" style={{ color: '#FFF', fontSize: wp(5.5), top: 1, left: 0.5 }} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text allowFontScaling={false} style={{ fontSize: wp(4), fontSize: wp(5) }}>{prize && prize.aboutTheCompany && prize.aboutTheCompany.socialMediaHandle && prize.aboutTheCompany.socialMediaHandle.snapchat}</Text>
                                </Body>
                                <Right>
                                    <Switch
                                        value={snapchatSwitch}
                                        onChange={() => this.setState({
                                            snapchatSwitch: !snapchatSwitch,
                                            twitterSwitch: false,
                                            instagramSwitch: false,
                                            facebookSwitch: false,
                                            socialMediaHandleSeleted: !snapchatSwitch ? prize.aboutTheCompany.socialMediaHandle.snapchat : "",
                                            typeOfSocialNetwork: 'sc'
                                        })} />
                                </Right>
                            </ListItem>
                        </Content>
                    </Container>
                </Modal>

                {/* DESCRIPTION */}
                <Modal
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={visibleModalDescription}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <Container>
                        <Header transparent>
                            <Left>
                                <Title allowFontScaling={false} style={{ color: "#E91E63", fontSize: wp(7) }}>Description</Title>
                            </Left>
                            <Right style={{ position: 'absolute', right: 0, width: '100%', height: '100%' }}>
                                <Button small transparent style={{ alignSelf: 'flex-end' }} onPress={() =>
                                    description
                                        ? this.setState({ visibleModalDescription: false })
                                        : this.setState({ description: "", visibleModalDescription: false })
                                }>
                                    <Text allowFontScaling={false} style={{
                                        fontSize: wp(4),
                                        letterSpacing: 1,
                                        color: description ? "#E91E63" : "#3333"
                                    }}>{description ? "Done" : "Cancel"}</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content scrollEnabled={false}>
                            {/* DESCRIPTION */}
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#3333', padding: 15 }}>Write what you want them to write in the body of the post. Any special instructions?(ex: take a photo of the gift and post, or, make a video of you talking about your gift!)</Text>
                            <Item
                                style={{ width: "90%", top: 15, alignSelf: "center" }}>
                                <Input
                                    allowFontScaling={false}
                                    onSubmitEditing={() => description ? this.setState({ visibleModalDescription: false }) : Keyboard.dismiss()}
                                    returnKeyType='done'
                                    multiline
                                    numberOfLines={3}
                                    placeholder="Description"
                                    placeholderTextColor="#EEEE"
                                    autoFocus={true}
                                    value={description}
                                    keyboardType="ascii-capable"
                                    selectionColor="#E91E63"
                                    style={{ padding: 5, maxHeight: 170 }}
                                    onChangeText={(value) => this.setState({ description: value })} />
                            </Item>
                        </Content>
                    </Container>
                </Modal>

            </Container>
        );
    }
}

export default SomethingMore