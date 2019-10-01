import React, { Component } from 'react';
import LottieView from "lottie-react-native";

export default class Prizes extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <LottieView
                ref={animation => this.animation = animation}
                style={{ width: "100%", height: 200 }}
                source={require('./animations/prizePresentation.json')}
                loop={false}
            />
        )
    }
}