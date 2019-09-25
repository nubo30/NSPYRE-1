import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { View, Text } from 'native-base';
import _ from 'lodash'
import flatten from 'lodash/flatten'
import { BarChart } from 'react-native-chart-kit'
import numeraljs from 'numeraljs'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// each value represents a goal ring in Progress chart

const screenWidth = Dimensions.get('screen').width

let less20 = 0
let between20_40 = 0
let between40_80 = 0
let between80_100 = 0
export default class Progress extends Component {
    state = { heightView: 0 }

    _getPorcentageOfNum = (num, amount) => {
        return num * amount / 100;
    }

    componentDidMount() {
        const { viewsVideo } = this.props
        const viewsArray = viewsVideo.items.map(item => Object.values(item.dataVideo)) // Extrae todos los viws de los usuarios
        const viewsArrayToObj = flatten(viewsArray).map(item => JSON.parse(item)) // Convierte los elementos a un objeto

        // Se determina la cantidad de tiempo que un usaurio ve el video
        viewsArrayToObj.map(item => {
            if (item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 20)) {
                less20++ + 1
            } else if (item.positionMillis >= this._getPorcentageOfNum(item.durationMillis, 20) && item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 40)) {
                between20_40++ + 1
            } else if (item.positionMillis >= this._getPorcentageOfNum(item.durationMillis, 40) && item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 80)) {
                between40_80++ + 1
            } else if (item.positionMillis >= this._getPorcentageOfNum(item.durationMillis, 80) && item.positionMillis <= this._getPorcentageOfNum(item.durationMillis, 100)) {
                between80_100++ + 1
            }
        })

    }

    render() {
        const { heightView } = this.state
        const data = {
            labels: ['80% - 100%', '40% - 80%', '20% - 40%', '0% - 20%'].reverse(),
            datasets: [{
                data: [less20, between20_40, between40_80, between80_100]
            }]
        }
        return (
            <View
                onLayout={(event) => { this.setState({ heightView: { height } = event.nativeEvent.layout }) }}
                style={{ flex: 1, right: 15 }}>
                <View style={{ height: '100%', position: 'absolute', backgroundColor: '#FFF', zIndex: 1000, left: 15, width: 18 }} />
                {heightView.height ?
                    <BarChart
                        data={data}
                        width={screenWidth}
                        height={heightView.height}
                        chartConfig={{
                            decimalPlaces: 0, // optional, defaults to 2dp
                            backgroundGradientFrom: '#FFF',
                            backgroundGradientTo: '#FFF',
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            color: (opacity = 1) => `rgba(216, 43, 96, ${opacity})`,// rgb(216,43,96)
                            strokeWidth: 0 // optional, default 3
                        }}
                    /> : null}
            </View>
        );
    }
}