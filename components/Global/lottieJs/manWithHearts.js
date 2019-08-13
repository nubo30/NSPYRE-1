import React, { Component } from 'react';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

export default class AnimationManWihtHearts extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <Lottie
                ref={animation => this.animation = animation}
                style={{ width: "100%", height: 220, position: 'absolute'}}
                source={require('./animations/animationManWihtHearts.json')}
                autoPlay
                loop={true}/>
        )
    }
}