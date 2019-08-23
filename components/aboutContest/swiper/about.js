import React from 'react';
import { TouchableHighlight } from 'react-native'
import {
    Text,
    H1,
    Card,
    CardItem, Left, Thumbnail, Body
} from 'native-base';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// I sinned contest introduction
export default function About(props) {
    const { contest, _setModalVisibleAboutTheContest } = props
    return (
        <TouchableHighlight style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            top: -10,
        }}
            onLongPress={() => { _setModalVisibleAboutTheContest(true) }}
            underlayColor="rgba(0,0,0,0.0)">
            <Card style={{ borderRadius: 5, elevation: 5, width: "80%" }}>
                <CardItem
                    header bordered
                    onLongPress={() => { _setModalVisibleAboutTheContest(true) }} header bordered
                    style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }}>
                    <H1
                        minimumFontScale={wp(5)}
                        allowFontScaling={false}
                        onLongPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ color: "#D82B60", fontSize: wp(5) }}>About the Contest</H1>
                </CardItem>
                <CardItem>
                    <Left>
                        {contest && contest.user.avatar !== null
                            ? <Thumbnail source={{ uri: contest && contest.user.avatar }} />
                            : <UserAvatar size="55" name={contest && contest.user.name} />}
                        <Body>
                            <Text
                                minimumFontScale={wp(4)}
                                allowFontScaling={false}
                                note onLongPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ color: "#BDBDBD" }}>
                                {_.truncate(contest.general.description, { length: 80, separate: '...' })}
                            </Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem onLongPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ borderBottomLeftRadius: 5, borderBottomEndRadius: 5, flexDirection: 'column', padding: 5 }}>
                    <Text
                        minimumFontScale={wp(3)}
                        allowFontScaling={false}
                        onPress={() => { _setModalVisibleAboutTheContest(true) }}
                        style={{ color: "#D82B60", textDecorationLine: "underline", top: -10, fontSize: wp(3) }}>Know more</Text>
                </CardItem>
            </Card>
        </TouchableHighlight>
    );
}