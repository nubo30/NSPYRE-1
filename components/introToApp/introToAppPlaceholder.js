import React, { Component } from 'react';
import { Text, View, Spinner } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

class IntroToAppPlaceholder extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor:'#000' }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
                    <Grid>
                        <Row size={30} style={{ padding: 20, flexDirection: "column", justifyContent: 'center' }}>
                            <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(20) }}>Gaming</Text>
                            <View style={{ borderWidth: 1, borderColor: '#FFF', width: '75%' }} />
                            <View style={{ width: '75%', alignItems: 'flex-end' }}>
                                <Text allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(8), right: 5 }}>Contest videos</Text>
                            </View>
                        </Row>
                        <Row size={60} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner color="#FFF" style={{ top: -50 }} />
                        </Row>
                        <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(7), fontWeight: '700', color: '#FFF' }}>Swipe left for more</Text>
                        </Row>
                    </Grid>
                </View>
            </View>
        )
    }
}
export default (IntroToAppPlaceholder)