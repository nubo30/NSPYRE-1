import React, { Component } from 'react';
import LottieView from "lottie-react-native";

export default class ParticleRain extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        const { screenWidth } = this.props
        return (
            <LottieView
                loop={true}
                ref={animation => this.animation = animation}
                style={{ width: screenWidth, height: 140, left: 5, top: -5 }}
                source={require('./animations/welcomeHome.json')} />
        )
    }
}