import React from 'react'
import { Text, View } from 'native-base'
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { colorsPalette } from '../static/colors'

// Data not found
var emojis = ['😫', '😣', '😥', '😯', '😓', '😔', '😕', '🙃', '🙁', '😞', '😟', '😢', '😭', '😰', '😩', '😧', '😦', '😱'];
export const DataNotFound = (props) => {
    const { inputText } = props
    return (
        <View style={{ justifyContent: "flex-start", flex: 1, alignItems: 'center', top: 60 }}>
            <Animatable.View animation="fadeIn">
                <Text
                    allowFontScaling={false}
                    minimumFontScale={80}
                    style={{ fontSize: 60 }}>{`${emojis[Math.floor(Math.random() * emojis.length)]}`}</Text>
            </Animatable.View>
            <Text
                allowFontScaling={false}
                minimumFontScale={14}
                style={{ color: "#9E9E9E", fontSize: 14 }}>We could not find <Text style={{ fontWeight: 'bold', color: "#9E9E9E" }}>{inputText}</Text></Text>
            <Text allowFontScaling={false} style={{ fontSize: wp(2.5), color: colorsPalette.darkFont, alignSelf: 'center', top: 10 }}>Slide down to refresh</Text>
        </View>
    )
}

// Search data
export const DataSearch = () => {
    return (
        <View style={{ justifyContent: "flex-start", flex: 1, alignItems: 'center', top: 60, backgroundColor: 'red' }}>
            <Text
                allowFontScaling={false}
                minimumFontScale={80}
                style={{ fontSize: 60 }}>{`${emojis[Math.floor(Math.random() * emojis.length)]}`}</Text>
            <Text
                allowFontScaling={false}
                minimumFontScale={16}
                style={{ fontSize: 14 }}
            >No encontrado</Text>
        </View>
    )
}