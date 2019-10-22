import React, { Component } from 'react';
import { Platform } from 'react-native'
import { Container, Header, Content, Button, Text, Left, Icon, Title, Right } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'

// Icons
import { Ionicons } from '@expo/vector-icons'

export default class AudiencePlaceholder extends Component {
    render() {
        return (
            <Container>
                <Header style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, width: "100%", borderBottomColor: "rgba(0,0,0,0.0)", backgroundColor: 'transparent', height: Platform.OS === 'ios' ? 70 : 50 }}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Button transparent onPress={() => { this._modalVisibleAudienceSelect(false); }}>
                            <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                            <Text allowFontScaling={false} style={{ left: 5, color: "#D81B60", fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp(6) }}>
                            ...
                                    </Title>
                    </Left>
                    <Right />
                </Header>
                <Content contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
                    <Grid style={{ padding: 20 }}>
                        <Row size={40} style={{ justifyContent: 'center', alignItems: 'flex-end', top: -20 }}>
                            <Text allowFontScaling={false} style={{ color: "#E0E0E0", fontSize: wp(9), textAlign: 'center' }}>...</Text>
                        </Row>
                        <Row size={20} style={{ justifyContent: 'space-evenly' }}>
                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='logo-facebook' style={{ fontSize: wp(12), color: '#3b5998' }} />
                            </Button>
                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='logo-twitter' style={{ fontSize: wp(12), color: '#0084b4' }} />
                            </Button>
                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='logo-instagram' style={{ fontSize: wp(12), color: '#E1306C' }} />
                            </Button>
                            <Button large transparent style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='logo-snapchat' style={{ fontSize: wp(12), color: '#FFEA00' }} />
                            </Button>
                        </Row>
                        <Row size={40} style={{ justifyContent: 'center' }}>
                            <Text allowFontScaling={false} style={{ color: '#E0E0E0', fontSize: wp(4.5), textAlign: 'center' }}>...</Text>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}