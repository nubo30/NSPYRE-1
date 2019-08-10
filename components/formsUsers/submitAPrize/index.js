import React, { Component } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import Swiper from 'react-native-swiper'
import _ from 'lodash'

// Child Component
import AboutYou from './views/aboutYou'
import AboutThePrize from './views/aboutThePrize'
import Mentions from './views/mentions'
import Summary from './views/summary'

import * as queries from '../../../src/graphql/queries'

export default class SubmitPrize extends Component {
    state = {
        userData: {},
        userDataAPI: {},
        prize: {},
    }

    async componentDidMount() {
        try {
            const { attributes } = await Auth.currentUserInfo()
            const userDataAPI = await API.graphql(graphqlOperation(queries.getUser, { id: attributes.sub }))
            this.setState({ userData: attributes, userDataAPI: userDataAPI.data.getUser })
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
        const { prize, userData, userDataAPI } = this.state
        return (
            <Swiper
                scrollEnabled={false}
                ref={(swiper) => this.swiper = swiper}
                loop={false} showsButtons={false} showsPagination={false}>

                {/* ABOUT YOU */}
                <AboutYou
                    userData={userData}

                    _dataFromForms={this._dataFromForms}
                    _indexChangeSwiper={this._indexChangeSwiper} />

                {/* ABOUT YOU */}
                <AboutThePrize
                    userData={userData}

                    _dataFromForms={this._dataFromForms}
                    _indexChangeSwiper={this._indexChangeSwiper} />

                {/* MENTIONS */}
                <Mentions
                    userData={userData}
                    prize={prize}

                    _dataFromForms={this._dataFromForms}
                    _indexChangeSwiper={this._indexChangeSwiper} />

                {/* Summary */}
                <Summary
                    userDataAPI={userDataAPI}
                    userData={userData}
                    prize={prize}
                    _indexChangeSwiper={this._indexChangeSwiper} />
            </Swiper>
        );
    }
}