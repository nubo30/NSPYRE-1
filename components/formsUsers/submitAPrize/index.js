import React, { Component } from 'react';
import { Dimensions, ScrollView, Alert } from 'react-native'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { connect } from 'react-redux'
import { Container, Footer, Button, Text, View, Spinner, Grid, Input, Toast } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import _ from 'lodash'


// Components child
import FormSubmitAPrizeHeader from './header/index'
import FormSubmitAPrize from './formSubmitAPrize'
import Summary from './summary/index'

// Styles
import { colors } from "../../Global/static/colors"
import { Ionicons } from '@expo/vector-icons'

// GraphQL
import * as queries from "../../../src/graphql/queries"

const fullHeight = Dimensions.get('window').height;

class RootFormSubmitAPrize extends Component {

    state = { loading: false, isReady: false, userData: null, formData: null, input: [], openModal: false, indexSwiperButtons: 0, erasePrizesList: false, openModalSummary: false, clearForm: false }

    async componentDidMount() {
        try {
            const { idToken } = await Auth.currentSession()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: idToken.payload.sub }));
            this.setState({ userData, isReady: true })
        } catch (error) {
            Toast.show({
                text: `${error.errors[0]}`,
                buttonText: "Okay",
                duration: 3000
            })
        }
    }


    // System ear points
    componentWillReceiveProps(nextProps) {
        if (nextProps.submitAPrizeFormData !== this.props.submitAPrizeFormData) {
            this.setState({ formData: nextProps.submitAPrizeFormData })
        }
    }

    _dataform = () => {
        const { formData, userData } = this.state
        function UUID() {
            let dt = new Date().getTime();
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = (dt + Math.random() * 16) % 16 | 0; dt = Math.floor(dt / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        let input = [{
            aboutTheUser: {
                phone: formData === null ? null : formData.phone === "" ? null : formData.phone,
                companyName: formData === null ? null : formData.companyName === "" ? null : formData.companyName,
                businessAddress: formData === null ? null : formData.businessAddress,
                businessSocialMedia: formData === null ? null : formData.businessSocialMedia
            },
            aboutThePrize: {
                price: formData === null ? 'NO_SELECT' : formData.price,
                nameOfPrize: formData === null ? null : formData.nameOfPrize === "" ? null : formData.nameOfPrize,
                shortDescriptionOfThePrize: formData === null ? null : formData.shortDescriptionOfThePrize === "" ? null : formData.shortDescriptionOfThePrize,
                picture: formData === null ? 'null' : formData.picture === "" ? ' null' : formData.picture,
                prizeSocialMedia: formData === null ? null : formData.prizeSocialMedia === "" ? null : formData.prizeSocialMedia,
                companyNamePrize: formData === null ? null : formData.companyNamePrize === "" ? null : formData.companyNamePrize,
                specialInstructions: formData === null ? null : formData.specialInstructions === "" ? null : formData.specialInstructions
            },
            category: formData === null ? 'NO_SELECT' : formData.category,
            userId: userData.data.getUser.id,
            formSubmitAPrizeUserId: userData.data.getUser.id,
            createdAt: new Date,
            itemId: UUID()
        }, ...this.state.input]
        this.setState({ input })
        this._scrollView(0)
        Alert.alert(
            'Choose an option',
            'Choose an option to continue',
            [
                { text: 'Create Another Prize', onPress: () => this._clearForm() },
                { text: 'Show Summary', onPress: () => this._openModalSummary() },
            ],
            { cancelable: false },
        );
    }

    _openModalSummary = (action) => { this.setState({ openModal: action, loading: false }) }

    _deleteItemFromSummary = (item) => {
        _.remove(this.state.input, { itemId: item.itemId })
        this.setState({ erasePrizesList: !this.state.erasePrizesList })
        this.forceUpdate()
    }

    // Change swiper index
    _changeSwiper = (i) => { this.swiper.scrollBy(i) }

    _scrollView = (numberToScroll) => {
        this.scroll.scrollTo({ x: 0, y: numberToScroll, animated: true });
        this.setState({ loading: false })
    }

    // Limpiador de formulario
    _clearForm = () => {
        this.setState({ clearForm: !this.state.clearForm, input: [] })
    }

    render() {
        const { loading, openModal, userData, input, isReady, indexSwiperButtons, erasePrizesList, openModalSummary, formData, clearForm } = this.state
        const { navigation } = this.props;
        const fromWhere = navigation.getParam('fromWhere', 'none');
        return (
            <Container>
                <FormSubmitAPrizeHeader formData={formData} isReady={this.state.isReady} />
                <ScrollView ref={(c) => { this.scroll = c }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ backgroundColor: colors.BOTTOM_COLOR, height: fullHeight, position: 'absolute', top: -fullHeight, left: 0, right: 0 }} />
                    <FormSubmitAPrize
                        _scrollView={this._scrollView}
                        _openModalSummary={this._openModalSummary}
                        _dataform={this._dataform}

                        clearForm={clearForm}
                        openModalSummary={openModalSummary}
                        erasePrizesList={erasePrizesList}
                        prizesList={input}
                        isReady={this.state.isReady}
                        userData={userData} />
                </ScrollView>
                <Footer style={{ backgroundColor: '#fff', borderTopColor: 'rgba(0,0,0,0.0)' }}>
                    <Button style={{
                        backgroundColor: colors.elementPrimary,
                        width: wp(60),
                        justifyContent: "center",
                        borderRadius: wp(50),
                        shadowOpacity: 10,
                        shadowOffset: { width: 0, height: 0 },
                        shadowColor: "#9E9E9E",
                        top: 5
                    }}
                        disabled={!isReady}
                        onPressIn={() => this.setState({ loading: true })}
                        onPress={() => this.setState({ openModalSummary: !openModalSummary })}>
                        {!loading
                            ? <Text style={{ color: "#fff", left: 10, letterSpacing: 3 }}>CREATE PRIZE</Text>
                            : <Spinner color='#FFF' size="small" hidesWhenStopped={true} />
                        }
                    </Button>
                </Footer>
                <Summary
                    _clearForm={this._clearForm}
                    _changeSwiper={this._changeSwiper}
                    _openModalSummary={this._openModalSummary}
                    _deleteItemFromSummary={this._deleteItemFromSummary}

                    userData={userData}
                    input={input}
                    fromWhere={fromWhere} indexSwiperButtons={indexSwiperButtons}
                    openModal={openModal} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submitAPrizeFormData: state.project.submitAPrizeFormData
    }
}
export default connect(mapStateToProps)(RootFormSubmitAPrize)