import React, { Component } from 'react';
import { StatusBar, FlatList } from "react-native"
import Placeholder from 'rn-placeholder'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Header, Title, Content, Button, Left, Icon, Text, View } from 'native-base';
import _ from 'lodash'

import { GadrientsHome } from "../../Global/gradients/index"

export default class PlaceholderHome extends Component {
    render() {
        return (
            <Container>
                <StatusBar barStyle='light-content' />
                <GadrientsHome />
                <Header style={{ backgroundColor: "#D81B60", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                    <Left style={{ flexDirection: "row", alignItems: "center" }}>
                        <Button style={{ minWidth: wp(11) }} transparent>
                            <Icon name='menu' style={{ color: "#fff", fontSize: wp(9.5), top: -2 }} />
                        </Button>
                        <Title style={{ color: "#fff", fontSize: wp('7%') }}>INFLUENCE ME NOW</Title>
                    </Left>
                </Header>
                <Header span style={{ height: hp(35), flexDirection: "column", borderBottomColor: 'rgba(0,0,0,0.0)', left: 2.5 }}>
                    <StatusBar barStyle='light-content' />
                    <Content scrollEnabled={false} contentContainerStyle={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Placeholder.Media style={{ alignSelf: "center", width: "27%", height: "21%", borderRadius: "50%", right: 7 }} />
                        <Placeholder.Media animate="fade" style={{ width: 105, height: 105, borderRadius: 52.2, overflow: 'hidden' }} />
                        <Placeholder.Media style={{ alignSelf: "center", width: "27%", height: "21%", borderRadius: "50%", left: 7 }} />
                    </Content>
                    <Button rounded transparent style={{ alignSelf: "center" }}>
                        <Placeholder.Media style={{ alignSelf: "center", width: "20%", height: "60%", borderRadius: "50%" }} />
                    </Button>
                    <Text style={{ fontSize: wp('8%'), fontWeight: "200", color: "#333", textAlign: "center", top: -5 }}>
                        LIST OF CONTESTS
                    </Text>
                </Header>
                <Content padder showsVerticalScrollIndicator={false}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={_.times(9, () => [{ id: 1 }])}
                        renderItem={() =>
                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.0)' }}>
                                <Placeholder.Media
                                    style={{ width: "95%", alignSelf: "center", marginBottom: 10, height: 100, borderRadius: 10 }}
                                    hasRadius={false} animate="fade" />
                            </View>
                        }
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                    />
                </Content>
            </Container>
        );
    }
}