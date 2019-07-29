import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Text, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'
import { BarChart } from 'react-native-chart-kit'


export default class Charts extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, flexDirection: 'column' }}>
                <Text style={{ alignSelf: 'center', padding: 10, fontWeight: 'bold' }}>Monthly Money</Text>
                <BarChart
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }]
                    }}
                    width={Dimensions.get('window').width - 40} // from react-native
                    height={wp(50)}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor: '#FFF',
                        backgroundGradientFrom: '#FFF',
                        backgroundGradientTo: '#FFF',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => "#D82B60",
                        style: {
                            borderRadius: 16,
                        }
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 15,
                        shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0 }, shadowOpacity: 1
                    }}
                />
            </View>
        );
    }
}