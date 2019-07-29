import React from "react"
import { Header, Button, Title, View } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

// Child component
import PrimordaryInfo from './primordaryInfo/index'

// Icons
import { Feather } from "@expo/vector-icons"

// This function is the header of slide modify the profile user
export default function HeaderModifyProfile(props) {
    const { userData, _setModalVisibleModidfyProfile, isLoading, _isLoading } = props
    return (
        <Header span style={{ elevation: 0, flexDirection: "column", height: hp(33) }}>
            <View style={{ flex: 0.2, flexDirection: 'row', }}>
                <Button style={{ alignSelf: 'center' }}
                    transparent
                    disabled={isLoading}
                    onPress={() => _setModalVisibleModidfyProfile(false)}>
                    <Feather name='x' style={{ color: isLoading ? "#BDBDBD" : "#D82B60", fontSize: wp(8) }} />
                </Button>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.9 }}>
                    <Title style={{ color: isLoading ? "#BDBDBD" : "#D82B60", fontSize: wp(10) }}>Profile</Title>
                </View>
            </View>
            <PrimordaryInfo userData={userData} isLoading={isLoading} _isLoading={_isLoading} />
        </Header>
    )
}