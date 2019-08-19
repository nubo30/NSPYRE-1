import React, { Component } from 'react';
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, List } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'

export default class BasicInfo extends Component {


    render() {
        const { userData } = this.props

        return (
            <Container>
                <Content scrollEnabled={false} contentContainerStyle={{ backgroundColor: '#F5F5F5', flex: 1 }}>
                    <List style={{ width: '100%', backgroundColor: '#FFF' }}>
                        {/* EMAIL */}
                        <ListItem icon style={{ backgroundColor: '#FFF' }}>
                            <Left>
                                <Button style={{ backgroundColor: "#FF9501" }}>
                                    <Icon active name="mail" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Email</Text>
                            </Body>
                            <Right>
                                <Text>{userData.email}</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>

                        {/* PHONE */}
                        <ListItem icon last style={{ backgroundColor: '#FFF' }}>
                            <Left>
                                <Button style={{ backgroundColor: "#007AFF" }}>
                                    <Icon active type="Entypo" name="phone" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Phone</Text>
                            </Body>
                            <Right>
                                <Text>{userData.phone === null ? 'Not Specified' : userData.phone}</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                    <Text style={{ color: "#333", alignSelf: 'center', top: 10, fontSize: wp(3) }}>Account created {moment(userData.datetime).calendar()}</Text>
                </Content>

            </Container>
        );
    }
}