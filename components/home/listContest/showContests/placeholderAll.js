import React, { Component } from 'react';
import { View, Card, CardItem } from 'native-base';
import { PlaceholderMedia } from 'rn-placeholder'

const timesRepeat = [{ id: 1 }, { id: 2 }, { id: 3 }]

export default class PlaceholderAll extends Component {
    render() {
        return (
            timesRepeat.map((item) => (
                <Card key={item.id} style={{
                    flex: 0,
                    borderRadius: 5,
                    marginBottom: 10,
                    width: "95%",
                    alignSelf: "center",
                    marginTop: 20
                }}>
                    <CardItem cardBody style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                        <View style={{
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            overflow: 'hidden', flex: 1
                        }}>
                            <PlaceholderMedia animate="fade" size={120} style={{ width: "100%" }} />
                        </View>
                    </CardItem>
                </Card>
            )))
    }
}