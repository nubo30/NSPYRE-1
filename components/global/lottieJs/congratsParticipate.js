import React, { Component } from 'react';
import LottieView from "lottie-react-native";

export default class CongratsParticipate extends Component {
    componentDidMount() {
        this.animation.play();
    }

    resetAnimation = () => {
        this.animation.reset();
        this.animation.play();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.swiperIndex === 4) {
            this.resetAnimation()
        }
    }

    render() {
        return (
            <LottieView
                loop={false}
                ref={animation => this.animation = animation}
                style={{ width: "100%", height: 220 }}
                source={require('./animations/congrats.json')} />
        )
    }
}