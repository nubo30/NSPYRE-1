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
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Little presentation of the prizes
export default function Prizes(props) {
    const { _setModalVisiblePrizes, contest } = props
    return (
        <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: -10 }}
            onPress={() => {
                setTimeout(() => {
                    _setModalVisiblePrizes(true)
                }, 500)
            }}
            underlayColor="rgba(0,0,0,0.0)">
            <Card style={{ borderRadius: 5, elevation: 5, width: "80%" }}>
                <CardItem header bordered style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <H1
                        minimumFontScale={wp(4)}
                        allowFontScaling={false}
                        style={{ color: "#D82B60", fontSize: wp(5) }}>Prizes</H1>
                    <Badge style={{ backgroundColor: '#D82B60', width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            minimumFontScale={wp(3)}
                            allowFontScaling={false}
                            style={{ fontSize: wp(3), right: 2, top: -2 }}>{contest.prizes.length}</Text>
                    </Badge>
                </CardItem>
                <CardItem
                    style={{ borderBottomLeftRadius: 5, borderBottomEndRadius: 5 }}>
                    <List style={{ width: "100%" }}>
                        <ListItem avatar onPress={() => setTimeout(() => {
                            _setModalVisiblePrizes(true)
                        }, 500)}>
                            <Left>
                                <Thumbnail
                                    style={{ bottom: 5 }} source={{ uri: "https://livra.com/Portals/0/new_skin/FRANK/assets/img/prototype/content/prize-bundle.png" }} />
                            </Left>
                            <Body style={{ borderBottomColor: "#fff" }}>
                                <Text
                                    minimumFontScale={wp(4)}
                                    allowFontScaling={false}
                                    style={{ color: "#BDBDBD", fontSize: wp(4) }}>{`This contest has ${contest.prizes.length} prize, touch to see!`}</Text>
                                <Text
                                    minimumFontScale={wp(3)}
                                    allowFontScaling={false}
                                    style={{ color: "#D82B60", textDecorationLine: "underline", top: 3, fontSize: wp(3) }}>See the prizes</Text>
                            </Body>
                        </ListItem>
                    </List>
                </CardItem>
            </Card>
        </TouchableHighlight>
    );
}