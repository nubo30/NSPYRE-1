import React, { Component } from 'react';
import { Modal, KeyboardAvoidingView, Alert, ImageBackground, Platform } from "react-native"
import { ImagePicker, Permissions } from 'expo';
import { API, graphqlOperation, Storage } from 'aws-amplify'
import {
    Header,
    Left,
    Button,
    Icon,
    Text,
    Spinner,
    Title,
    Container,
    View,
    Input,
    Item,
    Picker,
    ListItem
} from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid'
import Swiper from 'react-native-swiper';
import _ from 'lodash'
import moment from 'moment'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Child Component
import { DataNotFound } from '../../../Global/emojis/index'

// GraphQL
import * as queries from '../../../../src/graphql/queries'
import * as mutations from '../../../../src/graphql/mutations'
import * as subscriptions from '../../../../src/graphql/subscriptions'

// Icons
import { Ionicons } from "@expo/vector-icons"

class MyPrizes extends Component {
    state = {
        thumbnailLoading: false,
        thumbnailPictureLoading: false,
        imageLoading: false,
        prizesData: [],
        updatePrizeAction: false,
        openEditModal: false,
        textToUpdate: "",
        itemToUpdate: {},
        typeElement: "",
        placeholderEdit: "",
        price: "P0_25",
        isPicker: false,
        loadingUpdate: false,
        upLoadingImagen: false,
        picture: { url: "", fileUri: "" },
        changeImagenData: null,
        imageToUpdate: { id: "", fileUri: "" },
        itemIdForSpinner: ""
    }


    render() {
        const { itemIdForSpinner, imageLoading, prizesData, updatePrizeAction, openEditModal, textToUpdate, placeholderEdit, price, isPicker, loadingUpdate, typeElement, imageToUpdate } = this.state
        const { openModalMyPrizes, setModalVisible } = this.props
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={openModalMyPrizes}>
                <Container>
                    <Header style={{ width: "100%", height: Platform.OS === 'android' ? 55 : 70, backgroundColor: "#FFF", borderBottomColor: "#FFF" }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent onPress={() => { setModalVisible(false); this.setState({ updatePrizeAction: false }) }}>
                                <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                <Text style={{ left: 5, color: "#D81B60" }}>Back</Text>
                            </Button>
                            <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp('7%') }}>Your Prizes</Title>
                        </Left>
                    </Header>
       
                </Container>
            </Modal>
        )
    }
}

export default MyPrizes