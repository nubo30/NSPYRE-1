import React, { Component } from 'react';
import { Video } from "expo"
import { Container, Header, Content, Tab, Tabs, Text, Left, Body, Title, Subtitle, View, Icon, Button, List, ListItem, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Grid, Col } from 'react-native-easy-grid'

export default class Participants extends Component {
    render() {
        const { _setModalVisibleJoinToTheContest } = this.props
        return (
            <Container>
                <Header hasTabs style={{ backgroundColor: '#F5F5F5' }}>
                    <Left>
                        <Title style={{ fontSize: wp(10), color: "#D82B60" }}>Participations 🔥 </Title>
                        <Subtitle>The content that participants have created for this contest is shown.</Subtitle>
                    </Left>
                </Header>
                <Tabs style={{ flex: 1 }} tabBarUnderlineStyle={{ backgroundColor: '#D82B60' }}>
                    <Tab
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}
                        activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                        tabStyle={{ backgroundColor: '#F5F5F5' }}
                        heading="GLOBAL">
                        <Content padder contentContainerStyle={{ flex: 1 }}>
                            <View style={{ height: 150, borderBottomWidth: 0.5, borderBottomColor: 'rgba(0,0,0,0.2)', padding: 5 }}>
                                <Grid style={{ height: 100, flex: 1 }}>
                                    <Col size={40}>
                                        <View style={{
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            flex: 1,
                                        }}>
                                            <Video
                                                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                                                useNativeControls={true}
                                                rate={1.0}
                                                volume={1.0}
                                                isMuted={false}
                                                resizeMode="cover"
                                                shouldPlay={false}
                                                isLooping={false}
                                                style={{ width: "100%", height: "100%" }}
                                            />
                                        </View>
                                    </Col>
                                    <Col size={60} style={{ paddingStart: 10 }}>
                                        <List style={{ height: 50 }}>
                                            <ListItem thumbnail style={{ height: '100%', right: 15 }}>
                                                <Left>
                                                    <Thumbnail small source={{ uri: 'https://images.unsplash.com/photo-1556741564-a0e2cc7e2b79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' }} />
                                                </Left>
                                                <Body style={{ right: 5, borderBottomColor: 'rgba(0,0,0,0.0)' }}>
                                                    <Text style={{ color: '#333' }}>Yank Carlos</Text>
                                                    <Text note numberOfLines={1} style={{ fontStyle: 'italic', fontSize: wp(3.5) }}>Publicado ayer</Text>
                                                </Body>
                                            </ListItem>
                                        </List>
                                        <Content>
                                            <Text style={{ fontSize: wp(3.5), color: "#BDBDBD" }}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta)</Text>
                                        </Content>
                                        <Button iconLeft small transparent style={{ right: 10 }}>
                                            <Icon name='heart' style={{ color: '#EF5350' }} />
                                            <Text style={{ right: 8, color: '#EF5350' }}>10mil Like</Text>
                                        </Button>
                                    </Col>
                                </Grid>
                            </View>
                        </Content>
                    </Tab>
                    <Tab
                        activeTextStyle={{ color: '#D82B60', fontWeight: 'bold' }}
                        activeTabStyle={{ backgroundColor: '#F5F5F5' }}
                        tabStyle={{ backgroundColor: '#F5F5F5' }}
                        heading="YOURS">
                        <View style={{ height: 150, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#333", fontSize: wp(4.5) }}>You still have no participation!</Text>
                            <Button
                                onPress={() => _setModalVisibleJoinToTheContest(true)}
                                style={{ backgroundColor: '#D82B60', alignSelf: 'center', top: 20, width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ letterSpacing: 2 }}>PARTICIPATE NOW</Text>
                            </Button>
                        </View>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}