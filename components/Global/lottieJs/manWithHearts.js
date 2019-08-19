import React, { Component } from 'react';
import LottieView from "lottie-react-native";

export default class AnimationManWihtHearts extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <LottieView
                ref={animation => this.animation = animation}
                style={{ width: "100%", height: 220, position: 'absolute'}}
                source={require('./animations/animationManWihtHearts.json')}
                autoPlay
                loop={true}/>
        )
    }
}