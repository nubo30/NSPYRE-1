import React, { Component } from 'react';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

export default class CongratsParticipate extends Component {
    componentDidMount() {
        this.animation.play();
    }

    resetAnimation = () => {
        this.animation.reset();
        this.animation.play();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.swiperIndex === 2) {
            this.resetAnimation()
        }
    }

    render() {
        const { swiperIndex } = this.props
        return (
            <Lottie
                loop={false}
                ref={animation => this.animation = animation}
                style={{ width: "100%", height: 220, top: -40 }}
                source={require('./animations/congrats.json')} />
        )
    }
}