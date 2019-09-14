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

// Colors
import { colorsPalette } from '../../../global/static/colors'
import { MyStatusBar } from '../../../global/statusBar'

// This header show properties of section "Contest created by user"
function HeaderContest(props) {
    const { _setModalVisibleYourContest } = props
    return (
        <Header transparent>
            <MyStatusBar backgroundColor={colorsPalette.lightSB} barStyle="light-content" />
            <Left style={{ flexDirection: 'row' }}>
                <Button transparent onPress={() => _setModalVisibleYourContest(false)}>
                    <Icon name='arrow-back' style={{ color: colorsPalette.secondaryColor }} />
                    <Text
                        allowFontScaling={false}
                        minimumFontScale={wp(4)}
                        style={{ left: 5, color: colorsPalette.secondaryColor, fontSize: wp(4) }}>Back</Text>
                </Button>
                <Title
                    allowFontScaling={false}
                    minimumFontScale={wp(6)}
                    style={{ alignSelf: "center", left: 15, color: colorsPalette.secondaryColor, fontSize: wp(6) }}>Yours Contests</Title>
            </Left>
            <Right />
        </Header>
    )
}

export default withNavigation(HeaderContest)