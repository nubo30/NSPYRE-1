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
            <Card style={{ borderRadius: 15, elevation: 15, width: "80%" }}>
                <CardItem onLongPress={() => { _setModalVisibleAboutTheContest(true) }} header bordered style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <H1 onLongPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ color: "#D82B60" }}>About the Contest</H1>
                </CardItem>
                <CardItem>
                    <Left>
                        {contest && contest.user.avatar !== null
                            ? <Thumbnail source={{ uri: contest && contest.user.avatar }} />
                            : <UserAvatar size="55" name={contest && contest.user.name} />}
                        <Body>
                            <Text note onLongPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ color: "#BDBDBD" }}>
                                {_.truncate(contest.general.description, { length: 80, separate: '...' })}
                            </Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem onLongPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ borderBottomLeftRadius: 15, borderBottomEndRadius: 15, flexDirection: 'column', padding: 5 }}>
                    <Text onPress={() => { _setModalVisibleAboutTheContest(true) }}
                        style={{ color: "#D82B60", textDecorationLine: "underline", top: -10 }}>Know more</Text>
                </CardItem>
            </Card>
        </TouchableHighlight>
    );
}