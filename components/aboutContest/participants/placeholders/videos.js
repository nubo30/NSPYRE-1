import React, { Component } from 'react';
import { Placeholder, Fade, PlaceholderMedia } from 'rn-placeholder'
import { Container } from 'native-base';
import _ from 'lodash'

export default class PlaceholderVideos extends Component {
    render() {
        return (
            <Container style={{ height: 200, position: 'absolute' }}>
                <Placeholder Animation={Fade} style={{ width: "100%", height: 200 }}>
                    <PlaceholderMedia style={{ width: "109.5%", height: "100%", borderRadius: 0, alignSelf: 'center', position: 'absolute' }} />
                </Placeholder>
            </Container>
        );
    }
}