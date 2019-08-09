import React, { Component } from "react";
import { Dimensions, Clipboard } from "react-native";
import { Button, View, Text, Toast, Content } from 'native-base'
import Modal from "react-native-modal";
import { Grid, Row } from 'react-native-easy-grid'
import Swiper from 'react-native-swiper'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import _ from 'lodash'

const widthScreen = Dimensions.get('screen').width
const heightScreen = Dimensions.get('screen').height

// Icons
import { Ionicons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons'

export default class RedeemPrizes extends Component {
    state = {
        isModalVisible: false,

        clipboardText: "",
        textInputText: ""
    }

    // Copia el texgto y lo almacena en el portapapeles
    setTextIntoClipboard = async () => {
        await Clipboard.setString("FT$qnwU1g&Dm");
        Toast.show({ text: 'Code copy to the Clipboard.' })
    }

    _changeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    render() {
        const {
            // Data
            prize,

            // Actions
            modalRedeemPrizeAction,

            // Functions
            _modalRedeemPrizeAction
        } = this.props
        return (
            <Modal
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                isVisible={modalRedeemPrizeAction}>
                <View style={{ width: widthScreen - 80, maxHeight: heightScreen / 2, alignSelf: 'center', backgroundColor: '#FFF', borderRadius: 15, flex: 1, padding: 20 }}>
                    <Swiper
                        ref={(swiper) => this.swiper = swiper}
                        //scrollEnabled={true}
                        showsPagination={false}
                        showsButtons={false}
                        loop={false}>

                        {/* TERMS */}
                        <Grid>
                            <Row size={15}>
                                <Text style={{ fontSize: wp(11), color: '#333' }}>Terms</Text>
                            </Row>
                            <Row size={80}>
                                <Content>
                                    <Text style={{ fontSize: wp(4), color: '#333' }}>
                                        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
                                    </Text>
                                </Content>
                            </Row>
                            <Row size={15} style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Button small style={{ alignSelf: 'flex-end', backgroundColor: '#3333' }} onPress={() => _modalRedeemPrizeAction(false)}>
                                    <Text>Decline</Text>
                                </Button>
                                <Button small style={{ alignSelf: 'flex-end', backgroundColor: '#D81B60' }} onPress={() => this._changeSwiper(1)}>
                                    <Text>Agreed</Text>
                                </Button>
                            </Row>
                        </Grid>

                        {/* SHARE WITH THE SOCIALS MEDIAS */}
                        <Grid style={{ flex: 1 }}>
                            <Row size={75} style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                {prize.general.instructions.typeContentInstructionsValue === 'videos'
                                    ? <Button transparent icon style={{ width: '50%', height: '50%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <Feather name="video" style={{ fontSize: wp(20), color: '#3333' }} />
                                    </Button>
                                    : <Button transparent icon style={{ width: '50%', height: '50%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <Feather name="image" style={{ fontSize: wp(20), color: '#3333' }} />
                                    </Button>
                                }
                                <Text style={{ alignSelf: 'center', fontWeight: '100', color: '#3333' }}>Upload your {_.replace(prize.general.instructions.typeContentInstructionsValue, 's', '')}</Text>
                            </Row>

                            <Row size={15} style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                {prize.delivery.typeOfSocialNetwork === 'fb' ?
                                    <Button icon style={{
                                        width: '80%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#3b5998',
                                        shadowColor: 'rgba(0,0,0,0.2)',
                                        shadowOffset: { width: 0 },
                                        shadowOpacity: 1,
                                    }}>
                                        <FontAwesome name="facebook" style={{ fontSize: wp(7), color: '#FFF' }} />
                                    </Button> : null}
                                {prize.delivery.typeOfSocialNetwork === 'tt' ?
                                    <Button icon style={{
                                        width: '80%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#00acee',
                                        shadowColor: 'rgba(0,0,0,0.2)',
                                        shadowOffset: { width: 0 },
                                        shadowOpacity: 1,
                                    }}>
                                        <Ionicons name="logo-twitter" style={{ fontSize: wp(8), color: '#FFF' }} />
                                    </Button> : null}
                                {prize.delivery.typeOfSocialNetwork === 'ig' ?
                                    <Button icon style={{
                                        width: '80%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#E1306C',
                                        shadowColor: 'rgba(0,0,0,0.2)',
                                        shadowOffset: { width: 0 },
                                        shadowOpacity: 1,
                                    }}>
                                        <Ionicons name="logo-instagram" style={{ fontSize: wp(10), color: '#FFF', top: -3 }} />
                                    </Button> : null}
                                {prize.delivery.typeOfSocialNetwork === 'sc' ?
                                    <Button icon style={{
                                        width: '80%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#FFD600',
                                        shadowColor: 'rgba(0,0,0,0.2)',
                                        shadowOffset: { width: 0 },
                                        shadowOpacity: 1,
                                    }}>
                                        <Ionicons name="logo-snapchat" style={{ fontSize: wp(10), color: '#FFF' }} />
                                    </Button> : null}
                            </Row>

                            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button transparent small onPress={() => _modalRedeemPrizeAction()} style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: '#3333', fontWeight: '100' }}>No, thnaks</Text>
                                </Button>
                            </Row>
                        </Grid>

                        {/* GET CODE */}
                        <Grid>
                            <Row size={50} style={{ justifyContent: 'center', alignItems: 'flex-end', top: -40 }}>
                                <Feather name="check-circle" style={{ fontSize: wp(15), color: '#00C853' }} />
                            </Row>
                            <Row size={50} style={{ justifyContent: 'center', left: 10 }}>
                                <View style={{ padding: 5, borderRadius: 5, borderWidth: 1, height: 30, justifyContent: 'center', alignItems: 'center', width: '80%', borderColor: '#D81B60' }}>
                                    <Text style={{ color: '#D81B60', fontWeight: 'bold' }}>FT$qnwU1g&Dm</Text>
                                </View>
                                <Button
                                    onPress={() => this.setTextIntoClipboard()}
                                    icon transparent style={{ width: '12%', height: '22%', alignItems: 'center', justifyContent: 'center' }}>
                                    <AntDesign name="copy1" style={{ fontSize: wp(5), color: '#3333' }} />
                                </Button>
                            </Row>
                        </Grid>

                    </Swiper>
                </View>
            </Modal>

        );
    }
}