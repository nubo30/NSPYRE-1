import React from 'react'
import { Platform } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    Left,
    Body,
    Button,
    Header,
    Title,
    Text,
    Icon
} from "native-base"

// This header show properties of section "Contest created by user"
function HeaderCategoryOfPrizes(props) {
    const { _setModalVisibleRedeemPoints } = props
    return Platform.OS === 'ios'
        ? (
            <Header style={{ height: 70, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                <Left style={{ flexDirection: 'row' }}>
                    <Button transparent onPress={() => { _setModalVisibleRedeemPoints(false) }}>
                        <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                        <Text style={{ left: 5, color: "#D81B60" }}>Back</Text>
                    </Button>
                    <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp('7%') }}>Category Of Prizes</Title>
                </Left>
            </Header>
        )
        : (
            <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                <Left>
                    <Button transparent onPress={() => { _setModalVisibleRedeemPoints(false) }}>
                        <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: "#D81B60", fontSize: wp('7%') }}>Category Of Prizes</Title>
                </Body>
            </Header>
        )
}

export default HeaderCategoryOfPrizes