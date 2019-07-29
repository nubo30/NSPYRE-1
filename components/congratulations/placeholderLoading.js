import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Container, Header, Content, Footer, Left, Right, Body, FooterTab } from 'native-base';
import Placeholder from 'rn-placeholder'

import { MyStatusBar } from '../Global/statusBar/index'

export default function PlaceholderLoading() {
    return (
        <Container>
            <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                <Left />
                <Body>
                    <Placeholder.Media size={wp(15)} hasRadius animate="fade" />
                </Body>
                <Right />
            </Header>
            <Content
                scrollEnabled={false}
                contentContainerStyle={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Placeholder.Line animate="fade" style={{ width: wp(35), height: hp(3.5), alignSelf: 'center', top: 0 }} />
                <Placeholder.Line animate="fade" style={{ width: wp(60), height: hp(2.5), alignSelf: 'center', top: 0 }} />
                <Placeholder.Line animate="fade" style={{ width: wp(56), height: hp(2.5), alignSelf: 'center', top: -5 }} />
                <Placeholder.Line animate="fade" style={{ width: wp(40), height: hp(2.5), alignSelf: 'center', top: -10 }} />
            </Content>
            <Footer style={{ borderTopColor: 'rgba(0,0,0,0.0)', backgroundColor: 'rgba(0,0,0,0.0)' }}>
                <FooterTab>
                    <Placeholder.Media animate="fade" style={{ width: wp(33), height: hp(8), borderRadius: "50%" }} />
                    <Placeholder.Media animate="fade" style={{ width: wp(33), height: hp(8), borderRadius: "50%" }} />
                </FooterTab>
            </Footer>
        </Container>
    )
}