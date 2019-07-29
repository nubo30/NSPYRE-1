import React, { Component } from 'react';
import { View, Card, CardItem, Left, Body } from 'native-base';
import Placeholder from 'rn-placeholder'

const timesRepeat = [{ id: 1 }, { id: 2 }, { id: 3 }]

export default class PlaceholderAll extends Component {
    render() {
        return (
            timesRepeat.map((item) => (
                <Card key={item.id} style={{
                    flex: 0,
                    borderRadius: 15,
                    marginBottom: 10,
                    width: "90%",
                    alignSelf: "center",
                    marginTop: 20
                }}>
                    <CardItem style={{ borderTopEndRadius: 15, borderTopStartRadius: 15 }}>
                        <Left>
                            <Placeholder.Media animate="fade" size={40} hasRadius />
                            <Body>
                                <Placeholder.Line animate="fade" width="61%" textSize={14} style={{ top: -3 }} />
                                <Placeholder.Line animate="fade" width="47%" textSize={14} style={{ top: 3 }} />
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                        <View style={{
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15,
                            overflow: 'hidden', flex: 1
                        }}>
                            <Placeholder.Media animate="fade" size={120} style={{ width: "100%" }} />
                        </View>
                    </CardItem>
                </Card>
            )))
    }
}