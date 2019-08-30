import React, { Component } from 'react';
import { View } from 'react-native'
import LottieView from "lottie-react-native";

export default class IntroToApp1 extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <View style={{ width: '100%' }}>
                <LottieView
                    ref={animation => this.animation = animation}
                    style={{ width: "100%", alignSelf: 'center', position: 'absolute', height: 240 }}
                    source={require('./animations/planing.json')} />
            </View>
        )
    }
}