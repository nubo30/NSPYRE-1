import React from 'react'
import { Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    Left,
    Body,
    Button,
    Header,
    Right,
    Title,
    Text,
    Icon,
} from "native-base"

// Icon
import { Feather, Ionicons } from "@expo/vector-icons"

// This header show properties of section "Contest created by user"
function HeaderContest(props) {
    const { _setModalVisibleYourContest } = props
    return Platform.OS === 'ios'
        ? (
            <Header style={{ height: 70, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                <Left style={{ flexDirection: 'row' }}>
                    <Button transparent onPress={() => _setModalVisibleYourContest(false)}>
                        <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                        <Text style={{ left: 5, color: "#D81B60" }}>Back</Text>
                    </Button>
                    <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp('7%') }}>Yours Contests</Title>
                </Left>
                <Right>
                    <Button transparent onPress={() => props._openSearchBar()}>
                        <Ionicons color="#D81B60" size={24} name="ios-search" />
                    </Button>
                </Right>
            </Header>
        )
        : (
            <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                <Left>
                    <Button transparent onPress={() => _setModalVisibleYourContest(false)}>
                        <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: "#D81B60", fontSize: wp('7%') }}>Yours Contests</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => props._openSearchBar()}>
                        <Feather color="#D81B60" size={24} name="search" />
                    </Button>
                </Right>
            </Header>
        )
}

export default withNavigation(HeaderContest)