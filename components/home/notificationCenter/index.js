import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { MyStatusBar } from '../../Global/statusBar/index'


export default class NotificationCenter extends Component {

    render() {

        const { _changeSwiper } = this.props

        return (
            <Container style={{ backgroundColor: "#FAFAFA" }}>
                <Header noLeft style={{ backgroundColor: "#D81B60", justifyContent: 'center', alignItems: 'center' }}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => _changeSwiper(-1)}>
                            <Icon name='arrow-back' style={{ color: "#FFF" }} />
                            <Text style={{ left: 5, color: "#FFF" }}>Back</Text>
                        </Button>
                        <Title style={{ fontSize: wp(7), color: "#FFF", left: 20 }}>Notification Center</Title>
                    </Left>
                </Header>
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                <Content contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: wp(8), color: '#333' }}>
                        Nothing over here...
                        </Text>
                </Content>
                <Footer />
            </Container>

        );
    }
}