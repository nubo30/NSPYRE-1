import React, { Component } from 'react';
import { Placeholder, Fade, PlaceholderMedia } from 'rn-placeholder'
import { Container } from 'native-base';
import _ from 'lodash'

export default class PlaceholderParticipants extends Component {
    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Placeholder Animation={Fade} style={{ height: '65%', padding: 10, top: 5 }}>
                    <PlaceholderMedia style={{ width: "100%", height: "100%", alignSelf: 'center' }} />
                </Placeholder>
                <Placeholder Animation={Fade} style={{ height: '70%', padding: 10, top: 5 }}>
                    <PlaceholderMedia style={{ width: "100%", height: "100%", alignSelf: 'center' }} />
                </Placeholder>
            </Container>
        );
    }
}