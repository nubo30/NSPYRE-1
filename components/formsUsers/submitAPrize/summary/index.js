import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Text, Platform, Modal, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import Swiper from 'react-native-swiper';
import { API, graphqlOperation } from 'aws-amplify'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from "lodash"
import {
    Left,
    Right,
    Icon,
    Button,
    Header,
    Container,
    ListItem,
    List,
    View,
    Content,
    Spinner
} from "native-base"
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'

// GraphQl
import * as mutations from '../../../../src/graphql/mutations'

class Summary extends Component {
    state = { loading: false }

    sendDataToAWS = () => {
        const { input, fromWhere, userData, navigation, _openModalSummary, _clearForm } = this.props
        input.map(async input => {
            try {
                await API.graphql(graphqlOperation(mutations.createFormSubmitAPrize, { input }))
                await fromWhere === 'fromHome' ? Alert.alert(
                    'Choose an option',
                    `Please ${_.startCase(userData.data.getUser.name)}, select an option to continue!`,
                    [
                        { text: 'Create Another Prize', onPress: () => { _clearForm(); _openModalSummary(false) } },
                        { text: 'Go Home', onPress: () => { navigation.navigate("Home"); _openModalSummary(false) } },
                    ],
                    { cancelable: false },
                )
                    : Alert.alert(
                        'Choose an option',
                        `Please ${_.startCase(userData.data.getUser.name)}, select an option to continue!`,
                        [
                            { text: 'Create Another Prize', onPress: () => { _clearForm(); _openModalSummary(false) } },
                            { text: 'Continue', onPress: () => { navigation.navigate("Congratulation"); _openModalSummary(false) } },
                        ],
                        { cancelable: false },
                    )
            } catch (error) {
                console.log(error, "<--- Ha habido un error")
            } finally {
                this.setState({ loading: false })
            }
        })
    }

    render() {
        const {
            openModal,
            input,
            userData,
            indexSwiperButtons,

            _openModalSummary,
            _deleteItemFromSummary,
            _changeSwiper,
            _clearForm
        } = this.props
        const { loading } = this.state
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={openModal}>
                <Container>
                    <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent onPress={() => { _openModalSummary(false); _clearForm(); indexSwiperButtons === 0 ? null : _changeSwiper(-1) }}>
                                <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                <Text style={{ left: 5, color: "#D81B60" }}>{input.length ? 'ADD ANOTHER' : 'ADD PRIZE'}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button disabled={!input.length} transparent onPress={() => { this.sendDataToAWS(); this.setState({ loading: true }) }}>
                                {loading
                                    ? <Spinner size="small" color="#D81B60" style={{ right: 18 }} />
                                    : <Text style={{ fontSize: wp(5), color: input.length ? "#D81B60" : "#fff" }}>SUBMIT</Text>}
                            </Button>
                        </Right>
                    </Header>
                    <View>
                        <Text style={{ fontSize: wp(10), alignSelf: 'center', color: "#333", fontWeight: '400' }}>Summary</Text>
                        <Text style={{ fontSize: wp(4.5), alignSelf: 'center', color: "#333", fontWeight: '100', padding: 5 }}>{input.length} prize created</Text>
                    </View>

                    <Swiper
                        onIndexChanged={(index) => this.setState({ index: index + 1 })}
                        showsButtons={false} loop={false} showsPagination={false}>
                        {input.map((item, key) =>
                            <Grid key={key} style={{ justifyContent: "center", alignItems: "center" }}>
                                <Row size={90}>
                                    <Col size={40} style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Image style={{ width: 150, height: 150 }} source={{ uri: item.aboutThePrize.picture }} />
                                    </Col>
                                    <Col size={60}>
                                        <Content>
                                            <List>
                                                <ListItem itemDivider>
                                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>ABOUT OF YOU</Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>1. Name: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(userData.data.getUser.name, { length: 15, omission: "..." })}
                                                    </Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>2. Username: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(userData.data.getUser.username, { length: 15, omission: "..." })}
                                                    </Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>3. Phone: <Text style={{ fontWeight: '100' }}>{item.aboutTheUser.phone}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>4. Company Name: <Text style={{ fontWeight: '100' }}>{item.aboutTheUser.companyName}</Text></Text>
                                                </ListItem>
                                                <ListItem itemDivider style={{ backgroundColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>5. Company Social Media</Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Facebook: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(item.aboutTheUser.businessSocialMedia.businessFacebook, { length: 17, omission: "..." })}
                                                    </Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Instagram: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(item.aboutTheUser.businessSocialMedia.businessInstagram, { length: 18, omission: "..." })}
                                                    </Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Twitter: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(item.aboutTheUser.businessSocialMedia.businessTwitter, { length: 20, omission: "..." })}
                                                    </Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Snapchat: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(item.aboutTheUser.businessSocialMedia.businessSnapchat, { length: 18, omission: "..." })}
                                                    </Text></Text>
                                                </ListItem>
                                                <ListItem itemDivider style={{ backgroundColor: '#fff' }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>6. Business Address</Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Street: <Text style={{ fontWeight: '100' }}>{_.truncate(item.aboutTheUser.businessAddress.street, { length: 20, omission: "..." })}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• City: <Text style={{ fontWeight: '100' }}>{_.truncate(item.aboutTheUser.businessAddress.city, { length: 23, omission: "..." })}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• State: <Text style={{ fontWeight: '100' }}>{_.truncate(item.aboutTheUser.businessAddress.businessAddressState, { length: 23, omission: "..." })}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Country: <Text style={{ fontWeight: '100' }}>{_.truncate(item.aboutTheUser.businessAddress.country, { length: 19, omission: "..." })}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Postal Code: <Text style={{ fontWeight: '100' }}>{item.aboutTheUser.businessAddress.postalCode}</Text></Text>
                                                </ListItem>
                                                <ListItem itemDivider>
                                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>ARTICLE</Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>1. Category: <Text style={{ fontWeight: '100' }}>{_.capitalize(_.startCase(item.aboutThePrize.category))}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>2. Title: <Text style={{ fontWeight: '100' }}>{item.aboutThePrize.nameOfPrize}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>3. Description: <Text style={{ fontWeight: '100' }}>{item.aboutThePrize.shortDescriptionOfThePrize}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>4. Price: <Text style={{ fontWeight: '100' }}>{_.replace(item.aboutThePrize.price, "-", "$ - ")}$</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>5. Company Name: <Text style={{ fontWeight: '100' }}>{item.aboutThePrize.companyNamePrize}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>6. Instructions: <Text style={{ fontWeight: '100' }}>{item.aboutThePrize.specialInstructions}</Text></Text>
                                                </ListItem>
                                                <ListItem itemDivider style={{ backgroundColor: '#fff' }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333" }}>7. Social Media</Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Facebook: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(item.aboutThePrize.prizeSocialMedia.prizeFacebook, { length: 17, omission: "..." })}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Instagram: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(item.aboutThePrize.prizeSocialMedia.prizeInstagram, { length: 18, omission: "..." })}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Twitter: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(item.aboutThePrize.prizeSocialMedia.prizeTwitter, { length: 20, omission: "..." })}</Text></Text>
                                                </ListItem>
                                                <ListItem style={{ maxHeight: 41, borderBottomColor: "#fff" }}>
                                                    <Text style={{ fontWeight: "bold", color: "#333", left: 15 }}>• Snapchat: <Text style={{ fontWeight: '100' }}>
                                                        {_.truncate(item.aboutThePrize.prizeSocialMedia.prizeSnapchat, { length: 18, omission: "..." })}</Text></Text>
                                                </ListItem>
                                            </List>
                                        </Content>
                                    </Col>
                                </Row>
                                <Row size={10}>
                                    <Button transparent onPress={() => Alert.alert(
                                        `${item.aboutThePrize.nameOfPrize}`,
                                        `Surely you want to eliminate the prize?`,
                                        [
                                            {
                                                text: 'NO',
                                                style: 'cancel',
                                            },
                                            { text: 'YES', onPress: () => _deleteItemFromSummary(item) },
                                        ],
                                        { cancelable: false },
                                    )}>
                                        <Ionicons name="md-trash" style={{ fontSize: wp(7), color: "#F44336" }} />
                                    </Button>
                                </Row>
                            </Grid>
                        )}
                    </Swiper>

                </Container>
            </Modal>
        )
    }
}

export default withNavigation(Summary);
