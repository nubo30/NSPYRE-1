import React, { Component } from 'react';
import { Platform } from 'react-native'
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

export default class Logo extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <Lottie
                ref={animation => this.animation = animation}
                style={{ width: "100%", height: 200, top: "3%" }}
                source={require('./animations/dev.json')}
                autoPlay
                loop={true}
            />
        )
    }
}