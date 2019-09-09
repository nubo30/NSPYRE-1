import React, { Component } from 'react';
import { View } from 'native-base';
import { PlaceholderMedia } from 'rn-placeholder'

const timesRepeat = [{ id: 1 }, { id: 2 }, { id: 3 }]

export default class PlaceholderAllPrizes extends Component {
    render() {
        return (
            timesRepeat.map((item) => (
                <View key={item.id} style={{
                    shadowColor: 'rgba(0,0,0,0.3)',
                    shadowOffset: { width: 0 }, shadowOpacity: 1,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 15,
                    borderRadius: 15,
                    height: 100
                }}>
                    <PlaceholderMedia animate="fade" size={120} style={{ width: "100%", borderRadius: 15, height: 100 }} />
                </View>
            )))
    }
}