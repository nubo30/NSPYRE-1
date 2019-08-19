import React, { Component } from 'react';
import LottieView from "lottie-react-native";


export default class Instructions extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <LottieView
                ref={animation => this.animation = animation}
                style={{ width: "100%", height: 190, position: "absolute" }}
                source={require('./animations/instructions.json')}
                autoPlay
                loop={true} />
        )
    }
}