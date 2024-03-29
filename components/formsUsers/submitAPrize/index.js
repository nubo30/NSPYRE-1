import React, { Component } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { Alert } from 'react-native'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import { AfterInteractions } from 'react-native-interactions';
import { View } from 'react-native'

// Child Component
import AboutYou from './views/aboutYou'
import AboutThePrize from './views/aboutThePrize'
import Sharing from './views/sharing'
import Summary from './views/summary'
import AboutYouPlaceholder from './placeholder/index'

import * as queries from '../../../src/graphql/queries'

export default class SubmitPrize extends Component {
    state = {
        userData: {},
        prize: {},
        dataFromThePreviousSubmitPrize: {},
        wantSuggestedFields: false,
    }

    async componentDidMount() {
        try {
            const data = await Auth.currentAuthenticatedUser()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: data.id || data.attributes.sub }))
            this.setState({ userData: userData.data.getUser, dataFromThePreviousSubmitPrize: _.last(userData.data.getUser.submitPrize.items) })
            await userData.data.getUser.submitPrize.items.length ? Alert.alert(
                `${userData.data.getUser.name}`,
                'We have seen that this is not your first prize, do you want to fill in the suggested fields?',
                [{ text: 'Ok', onPress: () => this.setState({ wantSuggestedFields: true }), style: 'cancel', }, { text: 'No', onPress: () => { } }], { cancelable: false },
            ) : null
        } catch (error) {
            alert(error)
        }
    }

    _indexChangeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _dataFromForms = (data) => {
        const { prize } = this.state
        this.setState({ prize: Object.assign(prize, data) })
    }

    render() {
        const { prize, userData, dataFromThePreviousSubmitPrize, wantSuggestedFields } = this.state
        return (
            <AfterInteractions placeholder={<View style={{ flex: 1 }}><AboutYouPlaceholder /></View>}>
                <Swiper
                    scrollEnabled={false}
                    ref={(swiper) => this.swiper = swiper}
                    loop={false} showsButtons={false} showsPagination={false}>

                    {/* ABOUT YOU */}
                    <AboutYou
                        userData={userData}
                        dataFromThePreviousSubmitPrize={dataFromThePreviousSubmitPrize}

                        // Actions
                        wantSuggestedFields={wantSuggestedFields}

                        _dataFromForms={this._dataFromForms}
                        _indexChangeSwiper={this._indexChangeSwiper} />

                    {/* ABOUT YOU */}
                    <AboutThePrize
                        userData={userData}
                        dataFromThePreviousSubmitPrize={dataFromThePreviousSubmitPrize}

                        // Actions
                        wantSuggestedFields={wantSuggestedFields}

                        _dataFromForms={this._dataFromForms}
                        _indexChangeSwiper={this._indexChangeSwiper} />

                    {/* Sharing */}
                    <Sharing
                        userData={userData}
                        prize={prize}
                        dataFromThePreviousSubmitPrize={dataFromThePreviousSubmitPrize}

                        // Actions
                        wantSuggestedFields={wantSuggestedFields}

                        _dataFromForms={this._dataFromForms}
                        _indexChangeSwiper={this._indexChangeSwiper} />

                    {/* Summary */}
                    <Summary
                        userData={userData}
                        prize={prize}
                        _indexChangeSwiper={this._indexChangeSwiper} />
                </Swiper>
            </AfterInteractions>
        );
    }
}