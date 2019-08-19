import React, { Component } from 'react';
import LottieView from "lottie-react-native";
import { View } from 'native-base'

export default class AnimationManWihtHearts extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <LottieView
                ref={animation => this.animation = animation}
                style={{ width: "100%", height: 220 }}
                source={require('./animations/animationManWihtHearts.json')}
                loop={true}
            />
        )
    }
}