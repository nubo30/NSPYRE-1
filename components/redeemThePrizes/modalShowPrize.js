import React, { Component } from 'react';
import { Modal } from "react-native"
import { withNavigation } from 'react-navigation';
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Text,
    Spinner,
    ListItem,
    List,
    View,
    Thumbnail
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Platform } from 'expo-core';
import _ from 'lodash'
import moment from 'moment'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

class ModalShowPrize extends Component {
    state = { thumbnailLoading: false, thumbnailPictureLoading: false }

    render() {
        const { thumbnailLoading, thumbnailPictureLoading } = this.state
        const { itemToShowinTheModal, modalVisible, setModalVisible } = this.props
        return itemToShowinTheModal !== null ? (
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}>
                <Grid style={{ flex: 1 }}>
                    {/* Sub Header */}
                    <Header style={{
                        width: "100%",
                        height: Platform.OS === 'android' ? 55 : 70,
                        backgroundColor: "#FFF", borderBottomColor: "#FFF"
                    }}>
                        <Left>
                            <Button
                                disabled={this.props.confirmData}
                                onPress={() => setModalVisible(false)} transparent>
                                <Icon name='close' style={{
                                    fontSize: Platform.OS === 'android' ? 30 : 45,
                                    top: Platform.OS === 'android' ? -2 : -7,
                                    color: this.props.confirmData ? "#F48FB1" : "#D82B60"
                                }} />
                            </Button>
                        </Left>
                        <Body />
                        <Right />
                    </Header>
                    <Row size={30} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ shadowColor: 'rgba(0,0,0,0.3)', shadowOpacity: 1, shadowOffset: { width: 0 }, justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner color="#D82B60" size="small" animating={thumbnailLoading} style={{ position: 'absolute' }} />
                            <Thumbnail
                                onLoadStart={() => this.setState({ thumbnailLoading: true })}
                                onLoadEnd={() => this.setState({ thumbnailLoading: false })}
                                style={{ width: 110, height: 110, borderRadius: 55 }} source={{ uri: itemToShowinTheModal.user.avatar }} />
                        </View>
                        <Text style={{ color: '#333', top: 5 }}>{`${_.startCase(_.truncate(itemToShowinTheModal.user.name, { omission: '...', length: 17 }))} ${_.startCase(itemToShowinTheModal.user.lastName)} / @${_.capitalize(_.truncate(itemToShowinTheModal.user.username, { omission: '...', length: 17 }))}`}</Text>
                        <Text style={{ color: '#333', top: 5 }}>{`${_.capitalize(_.truncate(itemToShowinTheModal.user.email, { omission: '...', length: 25 }))}`}</Text>
                        <Text style={{ color: '#333', top: 5 }}>{`${_.truncate(itemToShowinTheModal.aboutTheUser.phone, { omission: '...', length: 25 })}`}</Text>
                    </Row>
                    <Row size={60}>
                        <Grid style={{ padding: "2%" }}>
                            <Col size={40} style={{ alignItems: 'center' }}>
                                <Spinner color="#D82B60" size="small" animating={thumbnailPictureLoading} style={{ position: 'absolute', top: 25 }} />
                                <Thumbnail
                                    onLoadStart={() => this.setState({ thumbnailPictureLoading: true })}
                                    onLoadEnd={() => this.setState({ thumbnailPictureLoading: false })}
                                    style={{ width: 150, height: 150 }} square
                                    source={{ uri: itemToShowinTheModal.aboutThePrize.picture }} />
                                <Text style={{ alignSelf: 'flex-end', padding: 2, color: "#E0E0E0", fontStyle: 'italic', fontWeight: '100', fontSize: wp(4), left: 5 }}>
                                    Published {moment(itemToShowinTheModal.createdAt).fromNow()}
                                </Text>
                            </Col>
                            <Col size={60}>
                                <List style={{ width: "100%", left: "3%" }}>
                                    <ListItem itemDivider>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Article</Text>
                                    </ListItem>
                                    <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                        <Text style={{ fontWeight: "bold", color: "#333" }}>Name:
                                            <Text style={{ fontWeight: "100" }}>  {_.startCase(_.truncate(itemToShowinTheModal.aboutThePrize.nameOfPrize, { omission: '...', length: 17 }))}</Text>
                                        </Text>
                                    </ListItem>
                                    <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                        <Text style={{ fontWeight: "bold", color: "#333" }}>Points:
                                            <Text style={{ fontWeight: "100" }}>{`  ${_.replace(_.replace(itemToShowinTheModal.aboutThePrize.price, "P", ""), "_", " - ")}$`}</Text>
                                        </Text>
                                    </ListItem>
                                    <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                        <Text style={{ fontWeight: "bold", color: "#333" }}>Description:
                                            <Text style={{ fontWeight: "100" }}>  {_.capitalize(_.truncate(itemToShowinTheModal.aboutThePrize.shortDescriptionOfThePrize, { omission: '...', length: 17 }))}</Text>
                                        </Text>
                                    </ListItem>
                                    <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                        <Text style={{ fontWeight: "bold", color: "#333" }}>Instructions:
                                            <Text style={{ fontWeight: "100" }}>  {_.capitalize(_.truncate(itemToShowinTheModal.aboutThePrize.specialInstructions, { omission: '...', length: 17 }))}</Text>
                                        </Text>
                                    </ListItem>
                                    <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                        <Text style={{ fontWeight: "bold", color: "#333" }}>Name Company:
                                            <Text style={{ fontWeight: "100" }}>  {_.capitalize(_.truncate(itemToShowinTheModal.aboutThePrize.companyNamePrize, { omission: '...', length: 17 }))}</Text>
                                        </Text>
                                    </ListItem>
                                </List>
                            </Col>
                        </Grid>
                    </Row>
                    <Row size={10} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Button
                            onPress={() => this.props.handleConfimation(true)}
                            style={{ width: "80%", backgroundColor: "#D82B60", alignContent: "center", justifyContent: "center" }}>
                            <Text style={{ color: "#fff", alignSelf: "center", left: 10 }}>Confirm</Text>
                            <Spinner color='#FFF' size="small" hidesWhenStopped={true} animating={this.props.confirmData} />
                        </Button>
                    </Row>
                </Grid>
            </Modal>
        ) : null
    }
}

export default withNavigation(ModalShowPrize)