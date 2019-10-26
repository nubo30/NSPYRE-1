import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    Left,
    Button,
    Header,
    Title,
    Text,
    Icon,
    View
} from "native-base"

// Colors
import { colorsPalette } from '../../../global/static/colors'
import { MyStatusBar } from '../../../global/statusBar'


// This header show properties of section "Contest created by user"
function HeaderCategoryOfPrizes(props) {
    const { _setModalVisibleRedeemPoints } = props
    return (
        <Header hasTabs transparent>
            <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
            <View style={{ height: "100%", width: "100%", position: "absolute", justifyContent: 'center', alignItems: 'center', bottom: 0 }}>
                <Title
                    minimumFontScale={wp(6)}
                    allowFontScaling={false}
                    style={{ alignSelf: "center", color: colorsPalette.secondaryColor, fontSize: wp(6) }}>Prizes</Title>
            </View>
            <Left style={{ flexDirection: 'row' }}>
                <Button transparent onPress={() => { _setModalVisibleRedeemPoints(false, false) }}>
                    <Icon name='arrow-back' style={{ color: colorsPalette.secondaryColor }} />
                    <Text
                        minimumFontScale={wp(4)}
                        allowFontScaling={false}
                        style={{ left: 5, color: colorsPalette.secondaryColor, fontSize: wp(4) }}>Back</Text>
                </Button>
            </Left>
        </Header>
    )
}

export default HeaderCategoryOfPrizes