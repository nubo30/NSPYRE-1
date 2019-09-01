import React from 'react'
import { withNavigation } from 'react-navigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    Left,
    Button,
    Header,
    Right,
    Title,
    Text,
    Icon,
} from "native-base"

// This header show properties of section "Contest created by user"
function HeaderContest(props) {
    const { _setModalVisibleYourContest } = props
    return (
        <Header transparent style={{ height: 70 }}>
            <Left style={{ flexDirection: 'row' }}>
                <Button transparent onPress={() => _setModalVisibleYourContest(false)}>
                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                    <Text
                        allowFontScaling={false}
                        minimumFontScale={wp(4)}
                        style={{ left: 5, color: "#D81B60", fontSize: wp(4) }}>Back</Text>
                </Button>
                <Title
                    allowFontScaling={false}
                    minimumFontScale={wp(6)}
                    style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>Yours Contests</Title>
            </Left>
            <Right>
                <Button transparent onPress={() => props._openSearchBar()}>
                    <Icon type="Ionicons" name="ios-search" style={{ fontSize: wp(6), color: "#D81B60" }} />
                </Button>
            </Right>
        </Header>
    )
}

export default withNavigation(HeaderContest)