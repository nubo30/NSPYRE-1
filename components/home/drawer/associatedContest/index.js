import React, { Component } from 'react'
import { Modal, ImageBackground, FlatList } from "react-native"
import Placeholder from 'rn-placeholder';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash'
import { Text, Card, CardItem, View, Header, Left, Button, Icon, Item, Input, Title } from "native-base"
import { Grid, Row } from "react-native-easy-grid"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Child Componets
import { DataNotFound } from "../../../Global/emojis/index"
import { MyStatusBar } from '../../../Global/statusBar/index'

const data = [
    { id: "1", name: "Destiny", image: "https://i.imgur.com/OsrvIXF.jpg" },
    { id: "2", name: "Call Of Duty", image: "https://i.imgur.com/OsrvIXF.jpg" },
    { id: "3", name: "Assasing's Creed", image: "https://i.imgur.com/OsrvIXF.jpg" }
]

export default class AssociatedContests extends Component {
    state = { inputText: "" }

    render() {
        const { setModalVisibleAssociatedContest } = this.props
        const { inputText } = this.state
        return (
            <Modal
                transparent={false}
                hardwareAccelerated={true}
                transparent={false}
                visible={this.props.modalVisible}
                animationType="slide"
                presentationStyle="fullScreen"
                onRequestClose={() => null}>
                <Header span style={{ backgroundColor: "#D82B60", borderBottomColor: "rgba(0,0,0,0.0)", height: 110 }}>
                    <Grid>
                        <Row size={50}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => { setModalVisibleAssociatedContest(false) }}>
                                    <Icon name='arrow-back' style={{ color: "#FFF" }} />
                                    <Text style={{ left: 5, color: "#FFF" }}>Back</Text>
                                </Button>
                                <Title style={{ alignSelf: "center", left: 15, color: "#FFF", fontSize: wp(8.5) }}>{_.truncate(_.startCase("Associated Contests"), { length: 18, separator: "..." })}</Title>
                            </Left>
                        </Row>
                        <Row size={50} style={{ paddingLeft: 15 }}>
                            <Header searchBar rounded style={{ height: "100%", width: 300, backgroundColor: "#D82B60", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                                <Item style={{ backgroundColor: '#fff', top: -10 }}>
                                    <Icon name="ios-search" style={{ color: !inputText ? "#E0E0E0" : "#333" }} />
                                    <Input
                                        onChangeText={(inputText) => this.setState({ inputText })}
                                        placeholderTextColor="#E0E0E0"
                                        placeholder="Filter by name of contest" />
                                </Item>
                            </Header>
                        </Row>
                    </Grid>
                </Header>
                <MyStatusBar backgroundColor="#FFF" barStyle="light-content" />
                {data.length
                    ? <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) =>
                            <Card key={item.id} style={{ borderRadius: 15, width: "90%", alignSelf: "center", marginTop: 20 }}>
                                <Placeholder.Box
                                    style={{ height: 100, width: "100%", borderRadius: 10 }}
                                    animate="fade"
                                    hasRadius={false}
                                    onReady={!this.state.isReady}>
                                    <Animatable.View animation="fadeIn">
                                        <CardItem cardBody style={{ borderRadius: 15 }}>
                                            <ImageBackground
                                                borderRadius={15}
                                                source={{ uri: item.image }}
                                                style={{ height: 100, width: "100%" }}>
                                                <View style={{
                                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                                    width: "100%", height: "100%",
                                                    borderRadius: 13
                                                }}>
                                                    <Text style={{ color: "#FFF", fontSize: 28, position: "absolute", bottom: 0, padding: 10 }}>
                                                        {item.name}<Text style={{ color: "#fff", fontSize: 15 }}>Created by Barack Obama</Text>
                                                    </Text>
                                                </View>
                                            </ImageBackground>
                                        </CardItem>
                                    </Animatable.View>
                                </Placeholder.Box>
                            </Card>
                        } />
                    : <View style={{ flex: 1, alignSelf: 'center' }}><DataNotFound /></View>
                }
            </Modal>
        )
    }
}