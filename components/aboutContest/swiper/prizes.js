import React from 'react';
import { TouchableHighlight } from 'react-native'
import {
    Text,
    Body,
    H1,
    Card,
    CardItem,
    List,
    Left,
    ListItem,
    Thumbnail,
    Badge
} from 'native-base';

// Little presentation of the prizes
export default function Prizes(props) {
    const { _setModalVisiblePrizes, contest } = props
    return (
        <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: -10 }}
            onLongPress={() => { _setModalVisiblePrizes(true) }}
            underlayColor="rgba(0,0,0,0.0)">
            <Card style={{ borderRadius: 15, elevation: 15, width: "80%" }}>
                <CardItem header bordered style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <H1 onLongPress={() => { _setModalVisiblePrizes(true) }} style={{ color: "#D82B60" }}>Prizes</H1>
                    <Badge style={{ backgroundColor: '#D82B60', width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text onLongPress={() => { _setModalVisiblePrizes(true) }} style={{ fontSize: 12, right: 2, top: -2 }}>{contest.prizes.length}</Text>
                    </Badge>
                </CardItem>
                <CardItem
                    onLongPress={() => { _setModalVisiblePrizes(true) }}
                    style={{ borderBottomLeftRadius: 15, borderBottomEndRadius: 15 }}>
                    <List style={{ width: "100%" }}>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail
                                    onLongPress={() => { _setModalVisiblePrizes(true) }}
                                    style={{ bottom: 5 }} source={{ uri: "https://livra.com/Portals/0/new_skin/FRANK/assets/img/prototype/content/prize-bundle.png" }} />
                            </Left>
                            <Body style={{ borderBottomColor: "#fff" }}>
                                <Text onLongPress={() => { _setModalVisiblePrizes(true) }}
                                    style={{ color: "#BDBDBD" }}>{`This contest has ${contest.prizes.length} prize, touch to see!`}</Text>
                                <Text onPress={() => { _setModalVisiblePrizes(true) }}
                                    style={{ color: "#D82B60", textDecorationLine: "underline", top: 3 }}>See the prizes</Text>
                            </Body>
                        </ListItem>
                    </List>
                </CardItem>
            </Card>
        </TouchableHighlight>
    );
}