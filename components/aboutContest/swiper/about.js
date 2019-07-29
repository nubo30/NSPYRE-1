import React from 'react';
import { TouchableHighlight } from 'react-native'
import {
    Text,
    Left,
    Body,
    H1,
    Card,
    CardItem,
    List,
    ListItem,
    Thumbnail,
} from 'native-base';
import _ from 'lodash'

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
            onPress={() => { _setModalVisibleAboutTheContest(true) }}
            underlayColor="rgba(0,0,0,0.0)">
            <Card style={{ borderRadius: 15, elevation: 15, width: "80%" }}>
                <CardItem onPress={() => { _setModalVisibleAboutTheContest(true) }} header bordered style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <H1 onPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ color: "#D82B60" }}>About the Contest</H1>
                </CardItem>
                <CardItem onPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ borderBottomLeftRadius: 15, borderBottomEndRadius: 15 }}>
                    <List onPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ width: "100%" }}>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail onPress={() => { _setModalVisibleAboutTheContest(true) }}
                                    style={{ bottom: 5 }} source={{ uri: "https://i-h1.pinimg.com/564x/e3/2d/b2/e32db2260c53dddbce0219f94b0a9880.jpg?b=t" }} />
                            </Left>
                            <Body style={{ borderBottomColor: "#fff" }}>
                                <Text onPress={() => { _setModalVisibleAboutTheContest(true) }} style={{ color: "#BDBDBD" }}>
                                    {_.truncate(contest.general.description, { length: 40, separate: '...' })}
                                </Text>
                                <Text onPress={() => { _setModalVisibleAboutTheContest(true) }}
                                    style={{ color: "#D82B60", textDecorationLine: "underline", top: 3 }}>Know more</Text>
                            </Body>
                        </ListItem>
                    </List>
                </CardItem>
            </Card>
        </TouchableHighlight>
    );
}