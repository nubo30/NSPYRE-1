import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Text, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import { BarChart } from 'react-native-chart-kit'


export default class Charts extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1 }}>
                <Text
                    minimumFontScale={wp(4)}
                    allowFontScaling={false}
                    style={{ alignSelf: 'center', padding: 10, fontWeight: 'bold', top: -20 }}>Monthly Money</Text>
                <BarChart
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                        datasets: [{
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }]
                    }}
                    width={Dimensions.get('window').width - 70} // from react-native
                    height={190}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor: '#FFF',
                        backgroundGradientFrom: '#FFF',
                        backgroundGradientTo: '#FFF',
                        decimalPlaces: 1, // optional, defaults to 2dp
                        color: (opacity = 1) => "#D82B60",
                    }}
                    style={{
                        borderRadius: 10,
                        shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0 }, shadowOpacity: 1
                    }}
                />
            </View>
        );
    }
}