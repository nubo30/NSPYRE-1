import React, { Component } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import { AfterInteractions } from 'react-native-interactions';
import { View } from 'react-native'


// Child Component
import AboutThePersonality from './views/aboutThePersonality'
import AbouttheirOccupations from './views/aboutTheirOccupations'
import Summary from './views/summary'
import AboutThePersonalityPlaceholder from './placeholder/aboutThePersonalityPlaceholder'

// Grapql
import * as queries from '../../../src/graphql/queries'

export default class SubmitPrize extends Component {
    state = {
        userData: {},
        engage: {},
        coins: {}
    }

    async componentDidMount() {
        try {
            const data = await Auth.currentAuthenticatedUser()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: data.id || data.attributes.sub }))
            this.setState({ userData: userData.data.getUser })
        } catch (error) {
            alert(error)
        }
    }

    _indexChangeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _dataFromForms = (data, coinsFromParams) => {
        const { engage, coins } = this.state
        this.setState({ engage: Object.assign(engage, data) })
        this.setState({ coins: Object.assign(coins, coinsFromParams) })
    }

    render() {
        const { engage, coins, userData } = this.state
        return (
            <AfterInteractions placeholder={<View style={{ flex: 1 }}><AboutThePersonalityPlaceholder /></View>}>
                <Swiper
                    scrollEnabled={false}
                    ref={(swiper) => this.swiper = swiper}
                    loop={false}
                    showsButtons={false}
                    showsPagination={false}>
                    
                    {/* ABOUT THE PERSONALITY*/}
                    <AboutThePersonality
                        userData={userData}

                        _dataFromForms={this._dataFromForms}
                        _indexChangeSwiper={this._indexChangeSwiper} />

                    {/* ABOUT THEIR OCCUPATIONS */}
                    <AbouttheirOccupations
                        userData={userData}

                        _dataFromForms={this._dataFromForms}
                        _indexChangeSwiper={this._indexChangeSwiper} />

                    {/* SUMMARY */}
                    <Summary
                        userData={userData}
                        engage={engage}
                        coins={coins}

                        _indexChangeSwiper={this._indexChangeSwiper} />
                </Swiper>
            </AfterInteractions>
        );
    }
}