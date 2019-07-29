import React, { Component } from 'react';
import { StatusBar, Image } from "react-native"
import { API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from 'react-navigation';
import {
    Container, Header, Left,
    Body, Right, Button, Icon,
    Title, Text, H2, H1,
    Spinner, View, Toast
} from 'native-base';
import Swiper from 'react-native-swiper';
import { Grid, Row } from 'react-native-easy-grid'
import { Platform } from 'expo-core';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'

// Child Component
import ModalShowPrize from './modalShowPrize';
import { DataNotFound } from '../Global/emojis/index'

// Data
import * as queries from '../../src/graphql/queries'

class RedeemThePrizes extends Component {
    state = {
        isReady: false,
        modalVisible: false,
        confirmData: false,
        itemToShowinTheModal: null,
        prizesData: null,
        imageLoading: false
    }

    async componentDidMount() {
        const categoryPrizes = this.props.navigation.getParam('categoryPrizes');
        try {
            const { data } = await API.graphql(graphqlOperation(queries.listFormSubmitAPrizes, { filter: { category: { eq: categoryPrizes } } }))
            this.setState({ prizesData: data.listFormSubmitAPrizes.items })
        } catch (error) {
            console.log(error, "Ha habido un error")
        } finally {
            console.log("Terminado!")
        }
    }

    setModalVisible = (visible) => { this.setState({ modalVisible: visible }) }

    handleConfimation = (value) => {
        setTimeout(() => {
            this.setState({
                confirmData: false,
                modalVisible: false,
                imageLoading: false
            })
            Toast.show({
                text: 'Redeem successfully!',
                textStyle: { color: "#fff" },
                buttonText: "Close",
                type: "success",
                position: "top",
                duration: 2000,
            })

        }, 3000);
        this.setState({ confirmData: value })
    }

    render() {
        const { prizesData, imageLoading } = this.state
        return (
            <Container>
                {/* First Header */}
                <Header style={Platform.OS === 'ios'
                    ? { height: 70, backgroundColor: "#FFF", borderBottomColor: "#FFF" }
                    : { paddingTop: StatusBar.currentHeight, height: 80, backgroundColor: "#FFF" }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: "#D82B60" }} />
                            <Text style={{ color: "#D82B60" }}>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#D82B60", fontSize: wp('5.2%') }}>Redeem Prizes</Title>
                    </Body>
                    <Right />
                </Header>
                <Grid style={{ flex: 1 }}>
                    <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#333" }}>You have 1, 700 points earns!</Text>
                    </Row>
                    <Row size={90}>
                        <Swiper
                            loop={false} index={0}
                            activeDotColor="#D82B60"
                            showsPagination={false}
                            showsButtons={false}>
                            {prizesData ? prizesData.length ?
                                prizesData.map((item, key) =>
                                    <Grid key={key} style={{ flex: 1 }}>
                                        <Row size={40} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Spinner color="#D82B60" size="large" animating={imageLoading} style={{ position: 'absolute' }} />
                                            <Image
                                                onLoadStart={() => this.setState({ imageLoading: true })}
                                                onLoadEnd={() => this.setState({ imageLoading: false })}
                                                style={{ width: "100%", height: 240 }}
                                                source={{ uri: item.aboutThePrize.picture }}
                                            />
                                        </Row>
                                        <Row size={25} style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                            <H1 style={{ color: '#D82B60', fontSize: 22 }}>{`${item.aboutThePrize.nameOfPrize}`}</H1>
                                            <H2 style={{ color: '#D82B60', fontSize: 16 }}>{`${_.replace(_.replace(item.aboutThePrize.price, "P", ""), "_", " - ")}$`}</H2>
                                            <Button
                                                onPress={() => { this.setModalVisible(true); this.setState({ itemToShowinTheModal: item }) }}
                                                style={{ alignSelf: "center", top: 10, backgroundColor: "#D82B60" }} small>
                                                <Text>REDEEN</Text>
                                            </Button>
                                        </Row>
                                        <Row size={35} style={{ padding: 10, alignContent: "center", justifyContent: "space-between", flexDirection: 'column' }}>
                                            <Text style={{ color: "#BDBDBD", textAlign: "center", fontSize: 20, top: 10 }}>{item.aboutThePrize.shortDescriptionOfThePrize}</Text>
                                            <Text style={{ color: "#D82B60", textAlign: "center", fontSize: 20, top: -30 }}>{`${key + 1}/${prizesData.length}`}</Text>
                                        </Row>
                                    </Grid>
                                )
                                : <DataNotFound />
                                : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <Spinner color="#D82B60" size="large" style={{ top: "-10%" }} />
                                    <Text style={{ top: "-10%" }}>Loading...</Text>
                                </View>}
                        </Swiper>
                    </Row>
                </Grid>
                {/* Modal */}
                <ModalShowPrize
                    handleConfimation={this.handleConfimation}
                    itemToShowinTheModal={this.state.itemToShowinTheModal}
                    setModalVisible={this.setModalVisible}
                    confirmData={this.state.confirmData}
                    modalVisible={this.state.modalVisible} />
            </Container>
        )
    }
}

export default withNavigation(RedeemThePrizes)