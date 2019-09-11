import React, { Component } from 'react';
import { Dimensions, Alert } from 'react-native'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon, Text, View, List, ListItem } from 'native-base';
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'

import { GadrientsAuth } from '../../../global/gradients'
import { MyStatusBar } from '../../../global/statusBar'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class AboutYouPlaceholder extends Component {

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <GadrientsAuth />
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />

                <Header style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            transparent
                            onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: '#FFF' }} />
                            <Text allowFontScaling={false} style={{ color: "#FFF", fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(6) }}>About You</Title>
                    </Left>
                    <Right />
                </Header>

                <Grid>
                    <Row size={20} style={{ padding: 20 }}>
                        <Text allowFontScaling={false} style={{ fontSize: wp(3.5), color: '#FFF', fontWeight: '100' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(10), fontWeight: 'bold', color: "#FFF" }}>Let's get started!</Text> {'\n'}Tell us a little about yourself!
                        </Text>
                    </Row>
                    <Row size={80} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', top: -10 }}>
                        <View style={{ backgroundColor: '#FFF', width: screenWidth - 30, height: screenHeight / 2 + 40, borderRadius: 5, shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 0 }, shadowOpacity: 1 }}>
                            <Content contentContainerStyle={{ paddingTop: 10 }} keyboardShouldPersistTaps={'always'}>
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

                                    {/* COMPANY NAME */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#EC407A" }}>
                                                <Icon type="FontAwesome" name="building-o" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Company Name</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>

                                    {/* TITLE IN THE OCMPANY */}
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#009688" }}>
                                                <Icon type="Entypo" name="creative-commons-attribution" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>Title in the company</Text>
                                        </Body>
                                        <Right>
                                            <Text allowFontScaling={false} style={{ fontSize: wp(4) }}>...</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>


                                    <Button iconRight small transparent disabled style={{ alignSelf: 'center', top: 10 }}
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
                    </Row>
                </Grid>

                {/* SUBMIT DATA TO AWS */}
                <Footer style={{ backgroundColor: 'rgba(0,0,0,0.0)', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                    <Animatable.View
                        duration={1000}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "80%",
                            shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { width: 1 }, shadowOpacity: 1,
                        }}>
                        <Button
                            disabled={true}
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

export default AboutYouPlaceholder