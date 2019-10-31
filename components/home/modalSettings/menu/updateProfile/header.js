import React from "react"
import { withNavigation } from 'react-navigation'
import { Header, Button, Title, View, Icon, Left, Text, Right } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

// Child component
import PrimordaryInfo from './primordaryInfo/index'

// Colors
import { colorsPalette } from "../../../../global/static/colors"

// This function is the header of slide modify the profile user
function HeaderModifyProfile(props) {
    const { userData, isLoading, _isLoading } = props
    return (
        <Header span style={{ elevation: 0, flexDirection: "column", height: hp(33) }}>
            <View style={{ flex: 0.2, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', width: "100%", height: "100%" }}>
                    <Title
                        allowFontScaling={false}
                        minimumFontScale={wp(7)}
                        style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.primaryColor, fontSize: wp(7) }}>Update Profile</Title>
                </View>
                <Left>
                    <Button transparent iconLeft style={{ right: 10 }}
                        onPress={() => props.navigation.goBack()}>
                        <Icon name='arrow-back' style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.primaryColor }} />
                        <Text
                            minimumFontScale={wp(4)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(4), color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.primaryColor, right: 10 }}>Back</Text>
                    </Button>
                </Left>
                <Right />
            </View>
            <PrimordaryInfo userData={userData} isLoading={isLoading} _isLoading={_isLoading} />
        </Header>
    )
}

export default withNavigation(HeaderModifyProfile)