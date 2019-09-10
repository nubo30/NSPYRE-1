import React, { Component } from 'react';
import { View } from 'native-base';
import { PlaceholderLine, PlaceholderMedia } from 'rn-placeholder'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default class PlaceholderCardContest extends Component {
    state = { repeat: [{ id: 1, id: 2, id: 3 }] }
    render() {
        const { repeat } = this.state
        return repeat.map(item => (
            <View key={item.id} style={{
                flex: 0,
                borderRadius: 13,
                marginBottom: 80,
                width: "90%", height: 200,
                alignSelf: "center",
                marginTop: 30,
            }}>
                <PlaceholderLine animate="fade" width={wp(50)} textSize={hp(3.7)} style={{ top: -10 }} />
                <PlaceholderLine animate="fade" width={wp(30)} textSize={hp(2.5)} style={{ top: -3 }} />
                <PlaceholderLine animate="fade" width={wp(42)} textSize={hp(2)} style={{ top: 4 }} />
                <PlaceholderMedia animate="fade" style={{ height: 190, width: "100%", borderRadius: 10, top: 20 }} />
                <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 0.5, width: "100%", alignSelf: 'center', top: 30 }} />
            </View>
        ))
    }
}