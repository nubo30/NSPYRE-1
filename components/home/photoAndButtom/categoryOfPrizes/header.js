import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    Left,
    Button,
    Header,
    Title,
    Text,
    Icon
} from "native-base"

// This header show properties of section "Contest created by user"
function HeaderCategoryOfPrizes(props) {
    const { _setModalVisibleRedeemPoints } = props
    return (
        <Header hasTabs style={{ height: 70, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
            <Left style={{ flexDirection: 'row' }}>
                <Button transparent onPress={() => { _setModalVisibleRedeemPoints(false, false) }}>
                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                    <Text
                        minimumFontScale={wp(4)}
                        allowFontScaling={false}
                        style={{ left: 5, color: "#D81B60", fontSize: wp(4) }}>Back</Text>
                </Button>
                <Title
                    minimumFontScale={wp(6)}
                    allowFontScaling={false}
                    style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>Prizes</Title>
            </Left>
        </Header>
    )
}

export default HeaderCategoryOfPrizes