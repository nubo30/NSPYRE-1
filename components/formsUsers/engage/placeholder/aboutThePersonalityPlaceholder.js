import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem, Separator } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import _ from 'lodash'

// Gradients
import { GadrientsAuth } from '../../../global/gradients/index'
import { MyStatusBar } from '../../../global/statusBar/index'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutThePersonalityPlaceholder extends Component {
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
                    <Right />
                </Header>

                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#FFF', fontWeight: '100' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), fontWeight: 'bold', color: "#FFF" }}>Let's get started!</Text> {'\n'}Tell us about yourself and a little more! 🤗
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
                                                <Icon type="Ionicons" name="md-person" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                        </Right>
                                    </ListItem>

                                    {/* LASTNAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#009688" }}>
                                                <Icon type="Ionicons" name="md-person" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Lastname</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                        </Right>
                                    </ListItem>

                                    {/* PHONE */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#F4511E" }}>
                                                <Icon type="Foundation" name="telephone" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Number Phone</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                        </Right>
                                    </ListItem>

                                    {/* EMAIL */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#4DB6AC" }}>
                                                <Icon type="Ionicons" name="md-mail" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Email</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                        </Right>
                                    </ListItem>

                                    {/* BIRHTDAY */}
                                    <ListItem last icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: "#FFD600" }}>
                                                <Icon type="MaterialIcons" name="child-care" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Birthdate</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    <Separator bordered />

                                    {/* LOCATION */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#FBC02D" }}>
                                                <Icon type="Entypo" name="location-pin" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Location</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* REGION*/}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#00897B" }}>
                                                <Icon type="FontAwesome" name="globe" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>What region do you identify with?</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* NACIONALITY */}
                                    <ListItem last icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: "#6200EA" }}>
                                                <Icon type="MaterialCommunityIcons" name="earth" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>What nacionality do you identify with?</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    <Separator bordered />

                                    {/* GENDER */}
                                    <ListItem icon style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: "#90A4AE" }}>
                                                <Icon type="MaterialCommunityIcons" name="gender-male-female" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>What gender do you identify with?</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* SEXUALITY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#D81B60" }}>
                                                <Icon type="FontAwesome" name="genderless" style={{ fontSize: wp(8), top: -4, left: 1.5 }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Identify according to your sexual preference</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* MARITAL STATUS */}
                                    <ListItem last icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#00BCD4" }}>
                                                <Icon type="Entypo" name="slideshare" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>What is your marital status?</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    <Separator bordered />

                                    {/* PARENT'S CONDITION */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#EF5350" }}>
                                                <Icon type="Feather" name="users" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Parent's conditional</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* AMOUNT OF SIMBLINGS */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#AA00FF" }}>
                                                <Icon type="Entypo" name="users" style={{ fontSize: wp(5) }} />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Amount of simblings</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* AMOUNT OF CHILDREN */}
                                    <ListItem icon last style={{ maxHeight: 45, backgroundColor: '#FFF' }}>
                                        <Left>
                                            <Button style={{ backgroundColor: "#1E88E5" }}>
                                                <Icon type="FontAwesome" name="child" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Amount of childrens</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                </List>
                            </Content>
                        </View>
                    </Row>
                </Grid>

                {/* SUBMIT DATA TO AWS */}
                <Footer style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                    <Animatable.View
                        duration={1000}
                        style={{ justifyContent: 'center', alignItems: 'center', width: "80%", shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1 }}>
                        <Button
                            iconRight style={{
                                width: "100%",
                                alignSelf: 'center',
                                backgroundColor: '#E91E63',
                                shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1
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

export default (AboutThePersonalityPlaceholder)