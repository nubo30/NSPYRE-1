import React from "react"
import { Header, Button, Title, View, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

// Child component
import PrimordaryInfo from './primordaryInfo/index'

// Colors
import { colorsPalette } from "../../../global/static/colors"

// This function is the header of slide modify the profile user
export default function HeaderModifyProfile(props) {
    const { userData, _setModalVisibleModidfyProfile, isLoading, _isLoading } = props
    return (
        <Header span style={{ elevation: 0, flexDirection: "column", height: hp(33) }}>
            <View style={{ flex: 0.2, flexDirection: 'row' }}>
                <Button icon style={{ alignSelf: 'center' }}
                    transparent
                    disabled={isLoading}
                    onPress={() => _setModalVisibleModidfyProfile(false)}>
                    <Icon type="Feather" name='x' style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.primaryColor, fontSize: wp(8), left: -10 }} />
                </Button>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.9 }}>
                    <Title
                        allowFontScaling={false}
                        minimumFontScale={wp(7)}
                        style={{ color: isLoading ? colorsPalette.opaqueWhite : colorsPalette.primaryColor, fontSize: wp(7) }}>Profile</Title>
                </View>
            </View>
            <PrimordaryInfo userData={userData} isLoading={isLoading} _isLoading={_isLoading} />
        </Header>
    )
}