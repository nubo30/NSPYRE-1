import React, { Component } from 'react';
import { Dimensions, Alert } from 'react-native'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'

// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

// Icons
import { Ionicons, Foundation, Entypo, FontAwesome } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutYouPlaceholder extends Component {
    render() {
        return (
            <Container>
                <GadrientsAuth />
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />

                <Header style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button

                            transparent
                            onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: '#FFF', }} />
                            <Text allowFontScaling={false} style={{ color: "#FFF", fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(6) }}>About You</Title>
                    </Left>
                </Header>

                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4.5), color: '#FFF', fontWeight: 'normal' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(11), fontWeight: 'bold', color: "#FFF" }}>Let's get started!</Text> {'\n'}Tell us a little more!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content
                                contentContainerStyle={{ paddingTop: 10 }}
                                keyboardShouldPersistTaps={'always'}>
                                <List>

                                    {/* NAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#007AFF" }}>
                                                <Ionicons style={{ fontSize: wp(5), color: '#FFF' }} active name="md-person" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: null, fontSize: wp(4) }}>Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                        </Right>
                                    </ListItem>

                                    {/* LASTNAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#009688" }}>
                                                <Ionicons style={{ fontSize: wp(5), color: '#FFF' }} active name="md-person" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: null, fontSize: wp(4) }}>Lastname</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                        </Right>
                                    </ListItem>

                                    {/* PHONE */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#F4511E" }}>
                                                <Foundation style={{ fontSize: wp(5.6), color: '#FFF' }} active name="telephone" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: null, fontSize: wp(4) }}>Number Phone</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                        </Right>
                                    </ListItem>

                                    {/* EMAIL */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#4DB6AC" }}>
                                                <Ionicons style={{ fontSize: wp(5), color: '#FFF' }} active name="md-mail" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: null, fontSize: wp(4) }}>Email</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                        </Right>
                                    </ListItem>

                                    {/* GENERAL INFORMATION */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#757575" }}>
                                                <Icon type="Ionicons" active name="ios-information-circle" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: null, fontSize: wp(4) }}>General information</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* COMPANY NAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#EC407A" }}>
                                                <FontAwesome style={{ fontSize: wp(4.5), color: '#FFF', left: 2 }} active name="building" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: null, fontSize: wp(4) }}>Company Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* COMPANY SOCIAL MEDIA HANDLE */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#FF9800" }}>
                                                <Entypo style={{ fontSize: wp(6), color: '#FFF', left: 1, top: 1 }} active name="network" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ color: null, fontSize: wp(4) }}>Company social media handles</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    <Button
                                        disabled
                                        iconRight small transparent style={{ alignSelf: 'center', top: 10 }}
                                        onPress={() => Alert.alert(
                                            'Why we need this?',
                                            'We need this information to be able to get other users to find your contest!',
                                            [
                                                { text: 'OK', onPress: () => null },
                                            ],
                                        )}>
                                        <Text allowFontScaling={false} style={{ left: 5, color: "#E0E0E0" }}>Why we need this?</Text>
                                        <Icon name="alert" style={{ right: 5, color: "#E0E0E0" }} />
                                    </Button>
                                </List>
                            </Content>
                        </View>
                        <Text allowFontScaling={false} style={{ color: '#F44336', fontSize: wp(4), top: 10 }} />
                    </Row>
                </Grid>

                {/* SUBMIT DATA TO AWS */}
                <Footer style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                    <Animatable.View
                        onAnimationEnd={() => this.setState({ isvalidFormAnimation: false })}
                        duration={1000}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "80%",
                            shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                        }}>
                        <Button
                            disabled
                            iconRight style={{
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: '#E91E63'
                            }}>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', letterSpacing: 2, color: "#FFF", fontSize: wp(4) }}>Continue</Text>
                            <Icon name='arrow-forward' />
                        </Button>
                    </Animatable.View>
                </Footer>
            </Container>

        );
    }
}

export default (AboutYouPlaceholder)