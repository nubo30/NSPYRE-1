import React, { Component } from 'react';
import { View } from 'react-native'
import LottieView from "lottie-react-native";

export default class Logo extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <View style={{ width: '100%' }}>
                <LottieView
                    ref={animation => this.animation = animation}
                    style={{ width: "100%", alignSelf: 'center', position: 'absolute', height: 200, top: 10 }}
                    source={require('./animations/dev.json')} />
            </View>
        )
    }
}