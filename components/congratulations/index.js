import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { graphqlOperation, Auth } from "aws-amplify";
import { Connect } from 'aws-amplify-react-native'
import { Container, Header, Content, Footer, Button, Left, Right, Icon, Text, Body, FooterTab } from 'native-base';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash'

// Gradients
import { GadrientsAuth } from '../global/gradients/index'
import { MyStatusBar } from '../global/statusBar/index'

// GraphQl
import * as queries from '../../src/graphql/queries'
import * as subscriptions from '../../src/graphql/subscriptions'

// Buttons
import ButtomsEngage from './engage'
import ButtomsCreateAContest from './create_a_contest'
import ButtomsSubmitAPrize from './submit_a_prize'

// Child Component
import PlaceholderLoading from './placeholderLoading'

class Congratulations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            userId: "",
            isReady: false
        }
        this.getDataFromAWS()
    }

    async getDataFromAWS() {
        try {
            const { idToken } = await Auth.currentSession()
            this.setState({ isReady: true, userId: idToken.payload.sub })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { userId } = this.state
        return (
            <Container>
                <GadrientsAuth />
                <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ width: "100%" }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: "#FFF" }} />
                            <Text style={{ color: "#FFF" }}>Back</Text>
                        </Button>
                    </Left>
                    <Right />
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                    <Animatable.View
                        duration={1500}
                        style={{ backgroundColor: '#fff', height: hp(48), width: wp(80), borderRadius: "40%", padding: 20 }}
                        animation="bounceIn">
                        {userId ?
                            <Connect query={graphqlOperation(queries.getUser, { id: userId })}
                                subscription={graphqlOperation(subscriptions.onUpdateUser)}
                                onSubscriptionMsg={(prev, newData) => { _.merge(prev.getUser, newData.onUpdateUser); return prev }}>
                                {({ data: { getUser }, loading, error }) => {
                                    if (error) return (<Text>Error</Text>);
                                    if (loading || !getUser) return <PlaceholderLoading />
                                    return (<Connect
                                        query={graphqlOperation(queries.listCongratulations, { filter: { typeUser: { eq: getUser.typeUser } } })}>
                                        {({ data: { listCongratulations }, loading, error }) => {
                                            if (error) return (<Text>Error</Text>);
                                            if (loading || !listCongratulations) return <PlaceholderLoading />
                                            return (
                                                <Container>
                                                    <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                        <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                                                        <Left />
                                                        <Body>
                                                            <Text style={{ fontSize: wp(13) }}>🎉</Text>
                                                        </Body>
                                                        <Right />
                                                    </Header>
                                                    <Content
                                                        scrollEnabled={false}
                                                        contentContainerStyle={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                                                        <Text style={{ color: "#333", fontSize: wp(5.5), textAlign: 'center', fontWeight: '500', letterSpacing: 1, top: -5 }}>
                                                            Congratulation {_.truncate(getUser.name, { length: 12, omission: "..." })}!
                                                        </Text>
                                                        <Text style={{ color: "#333", fontSize: wp(5), textAlign: 'center', fontWeight: '100', top: -10 }}>{listCongratulations.items[0].content}</Text>
                                                    </Content>
                                                    <Footer style={{ borderTopColor: 'rgba(0,0,0,0.0)', backgroundColor: 'rgba(0,0,0,0.0)' }}>
                                                        <FooterTab>
                                                            {getUser.typeUser === 'CREATE_A_CONTEST' ? <ButtomsCreateAContest /> : null}
                                                            {getUser.typeUser === 'SUBMIT_A_PRIZE' ? <ButtomsSubmitAPrize getUser={getUser} /> : null}
                                                            {getUser.typeUser === 'ENGAGE' ? <ButtomsEngage getUser={getUser} /> : null}
                                                        </FooterTab>
                                                    </Footer>
                                                </Container>
                                            )
                                        }}
                                    </Connect>)
                                }}
                            </Connect>
                            : <PlaceholderLoading />}
                    </Animatable.View>
                </Content>
                <Footer style={{ backgroundColor: "rgba(0,0,0,0.0)", borderTopColor: "rgba(0,0,0,0.0)" }} />
            </Container>
        );
    }
}

export default withNavigation(Congratulations)
