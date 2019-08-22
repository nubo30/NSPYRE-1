import React, { Component } from 'react';
import { Video } from 'expo-av';
import { Container } from 'native-base';
export default class VideoExplainTheContest extends Component {
    render() {
        const { contest, swiperIndex } = this.props
        return (
            <Container>
                <Video
                    source={{ uri: contest && contest.general.video.url }}
                    useNativeControls={true}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={swiperIndex ? true : false}
                    isLooping={false}
                    style={{ width: "100%", height: "100%" }} />
            </Container>
        );
    }
}