import React, { Component } from 'react';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

export default class Instructions extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <Lottie
                ref={animation => this.animation = animation}
                style={{ width: "100%", height: 190, top: -20 }}
                source={require('./animations/instructions.json')}
                autoPlay
                loop={true} />
        )
    }
}