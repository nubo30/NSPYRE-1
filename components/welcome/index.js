import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Container, Header, Content, Button, Left, Right, Icon, Text } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable';
import _ from 'lodash'

// Gradients
import { GadrientsAuth } from '../global/gradients/index'
import { MyStatusBar } from '../global/statusBar/index'
import { colors } from "../global/static/colors"

const engage = `Now tell us a little about yourself so we can get you started on your first contest! 😁`
const createContest = `Tell us about yourself and the contest you want to build! 🔥 \nIf you want to use our community to promote your contest we will let you know the prize as you build... and you can use our prize center for FREE for any size compaign! ❤`
const submitPrize = `Hi! Thanks for being a part of our community! \nTell us a little about yourself, your business and your prize and we'll share it with our community and the winners will get extra points from us if they promote your prize on their social media when they recieve it! 😉`

class Welcome extends Component {

    _navigateToForm = (scope) => {
        const { navigate } = this.props.navigation
        switch (scope) {
            case "engage":
                navigate("EngageForm")
                break;
            case "createContest":
                navigate("CreateAContestForm")
                break;
            case "submitPrize":
                navigate("SubmitAPrizeForm")
                break;
            default:
                null
        }
    }

    render() {
        const scope = this.props.navigation.getParam('scope')
        const nameUser = this.props.navigation.getParam('nameUser')
        return (
            <Container>
                <GadrientsAuth />
                <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ width: "100%" }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: "#FFF" }} />
                            <Text style={{ color: "#FFF" }}>Home</Text>
                        </Button>
                    </Left>
                    <Right />
                </Header>
                <Content
                    alwaysBounceVertical={true}
                    scrollEnabled={false}
                    contentContainerStyle={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                    <Animatable.View
                        duration={2000}
                        animation="bounceIn"
                        style={{
                            backgroundColor: '#FFF',
                            height: '70%',
                            width: '80%',
                            borderRadius: "20%",
                            padding: 20,
                            shadowOpacity: 1,
                            shadowColor: "rgba(0,0,0,0.3)",
                            shadowOffset: { width: 0, height: 0 }
                        }}>
                        <Container>
                            <Grid>
                                <Row size={25} style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: wp(14), alignSelf: 'center' }}>🎉</Text>
                                </Row>
                                <Row size={55} style={{ alignItems: 'center' }}>
                                    <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ color: "#333", fontSize: wp(6), textAlign: 'center', fontWeight: '500', letterSpacing: 1, top: -15 }}>
                                            Welcome {_.truncate(nameUser, { length: 12, omission: "..." })}!
                                        </Text>
                                        <Text style={{ color: "#333", fontSize: wp(5), textAlign: 'center', fontWeight: '100' }}>
                                            {scope === 'engage' ? engage : null}
                                            {scope === 'createContest' ? createContest : null}
                                            {scope === 'submitPrize' ? submitPrize : null}
                                        </Text>
                                    </Content>
                                </Row>
                                <Row size={20} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        full
                                        onPress={() => this._navigateToForm(scope)}
                                        style={{
                                            borderRadius: 5,
                                            alignSelf: 'center',
                                            width: wp(60),
                                            height: hp(7),
                                            backgroundColor: colors.elementPrimary,
                                            shadowOpacity: 1,
                                            shadowColor: "rgba(0,0,0,0.3)",
                                            shadowOffset: { width: 0, height: 0 }
                                        }}>
                                        <Text style={{ letterSpacing: 3 }}>START NOW</Text>
                                    </Button>
                                </Row>
                            </Grid>
                        </Container>
                    </Animatable.View>
                </Content>
            </Container>
        );
    }
}

export default withNavigation(Welcome)