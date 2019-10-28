import React, { Component } from 'react';
import { View } from 'react-native'
// import LottieView from "lottie-react-native";
import { Text } from 'native-base'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default class Logo extends Component {
    // componentDidMount() {
    //     this.animation.play();
    // }

    render() {
        return (
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                {/* <LottieView
                    ref={animation => this.animation = animation}
                    style={{ width: "100%", alignSelf: 'center', position: 'absolute', height: 200, top: 10 }}
                    source={require('./animations/dev.json')} /> */}
                <Text allowFontScaling={false} style={{ fontSize: wp(13), fontWeight: 'bold', color: "#FFF", fontFamily: 'Montserrat_Subrayada' }}>Nspyre</Text>
            </View>
        )
    }
}