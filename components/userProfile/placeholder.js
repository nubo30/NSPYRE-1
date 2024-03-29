import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { Container, Header, Title, Content, Button, Left, Icon, Text, View } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Row } from 'react-native-easy-grid'
import { PlaceholderMedia } from 'rn-placeholder'
import _ from 'lodash'

import { MyStatusBar } from '../global/statusBar/index'

class UserProfilePlaceholder extends Component {
    render() {
        return (
            <Container>
                <Header transparent style={{ backgroundColor: '#E91E63' }}>
                    <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: '#FFF', }} />
                            <Text allowFontScaling={false} style={{ color: "#FFF", fontSize: wp(4) }}>Back</Text>
                        </Button>
                        <Title allowFontScaling={false} style={{ color: '#FFF', fontSize: wp(6), alignSelf: 'center' }}>...</Title>
                    </Left>
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={25} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
                            <PlaceholderMedia animate="fade" style={{ width: 105, height: 105, borderRadius: 52.5 }} />
                        </Row>
                        <Row size={5} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(5), color: '#FFF', fontWeight: 'bold' }}>...</Text>
                        </Row>
                        <Row size={5} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
                            <Text allowFontScaling={false} style={{ fontSize: wp(4), color: '#F48FB1', fontWeight: 'bold' }}>...</Text>
                        </Row>

                        <Row size={10} style={{ backgroundColor: '#E91E63', justifyContent: 'center', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ color: '#F48FB1', fontSize: wp(4), top: 5 }}>...</Text>
                        </Row>

                        <Row size={65} style={{ paddingRight: 20, paddingLeft: 20, flexDirection: 'column' }}>
                            <Content padder contentContainerStyle={{ justifyContent: 'space-evenly', flex: 1 }}>
                                <Text allowFontScaling={false} style={{ fontSize: wp(5), fontWeight: 'bold' }}>About me</Text>
                                <Text allowFontScaling={false} style={{ fontSize: wp(4), }}>...</Text>
                                <Text allowFontScaling={false} style={{ fontSize: wp(5), fontWeight: 'bold' }}>Hobbies</Text>
                                <View style={{ flexDirection: 'row', right: 5 }}>
                                    <View style={{ backgroundColor: '#E0E0E0', padding: 5, borderRadius: 5, margin: 5 }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', color: '#333' }}>           </Text>
                                    </View>
                                    <View style={{ backgroundColor: '#E0E0E0', padding: 5, borderRadius: 5, margin: 5 }}>
                                        <Text allowFontScaling={false} style={{ color: '#FFF', fontWeight: 'bold', color: '#333' }}>     </Text>
                                    </View>
                                </View>
                            </Content>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default withNavigation(UserProfilePlaceholder)