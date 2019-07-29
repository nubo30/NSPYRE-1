import React, { Component } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import Swiper from 'react-native-swiper'
import _ from 'lodash'

// Child Component
import AboutYou from './views/aboutYou'
import AboutTheContest from './views/aboutTheContest'
import Prizes from './views/prizes'
import Summary from './views/summary'

// GraphQL
import * as queries from '../../../src/graphql/queries'

export default class CreateContest extends Component {
    state = {
        userData: {},
        contest: {}
    }

    async componentDidMount() {
        try {
            const { attributes } = await Auth.currentUserInfo()
            this.setState({ userData: attributes })
        } catch (error) {
            console.log(error)
        }
    }

    _indexChangeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _dataFromForms = (data) => {
        const { contest } = this.state
        this.setState({ contest: Object.assign(contest, data) })
    }

    render() {
        const { contest, userData } = this.state
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

                {/* ABOUT THE CONTEST */}
                <AboutTheContest
                    userData={userData}

                    _dataFromForms={this._dataFromForms}
                    _indexChangeSwiper={this._indexChangeSwiper} />

                {/* PRIZES */}
                <Prizes
                    userData={userData}

                    _dataFromForms={this._dataFromForms}
                    _indexChangeSwiper={this._indexChangeSwiper} />

                {/* Summary */}
                <Summary
                    userData={userData}
                    contest={contest}
                    _indexChangeSwiper={this._indexChangeSwiper} />
            </Swiper>
        );
    }
}