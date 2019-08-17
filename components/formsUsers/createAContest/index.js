import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import Swiper from 'react-native-swiper'
import _ from 'lodash'

// Child Component
import AboutYou from './views/aboutYou'
import AboutTheContest from './views/aboutTheContest'
import Prizes from './views/prizes'
import Summary from './views/summary'

// GraphQL
import * as queries from "../../../src/graphql/queries"

export default class CreateContest extends Component {
    state = {
        userData: {},
        dataFromThePreviousContest: {},
        wantSuggestedFields: false,
        contest: {},
    }

    async componentDidMount() {
        try {
            const { attributes } = await Auth.currentUserInfo()
            const { data } = await API.graphql(graphqlOperation(queries.getUser, { id: attributes.sub }))
            await this.setState({ userData: attributes, dataFromThePreviousContest: _.last(data.getUser.createContest.items) })
            await data.getUser.createContest.items.length ? Alert.alert(
                `${attributes.name}`,
                'We have seen that this is not your first contest, do you want to fill in the suggested fields?',
                [{ text: 'OK', onPress: () => this.setState({ wantSuggestedFields: true }), style: 'cancel', }, { text: 'No', onPress: () => { } },], { cancelable: false },
            ) : null
        } catch (error) {
            console.log(error)
        }
    }

    _indexChangeSwiper = (i) => {
        this.swiper.scrollBy(i)
    }

    _dataFromForms = (data, coinsParams) => {
        const { contest } = this.state
        this.setState({
            contest: Object.assign(contest, data),
        })
    }

    render() {
        const { contest,  userData, dataFromThePreviousContest, wantSuggestedFields } = this.state
        return (
            <Swiper
                scrollEnabled={false}
                ref={(swiper) => this.swiper = swiper}
                loop={false} showsButtons={false} showsPagination={false}>

                {/* ABOUT YOU */}
                <AboutYou
                    userData={userData}
                    dataFromThePreviousContest={dataFromThePreviousContest}

                    // Actions
                    wantSuggestedFields={wantSuggestedFields}

                    _dataFromForms={this._dataFromForms}
                    _indexChangeSwiper={this._indexChangeSwiper} />

                {/* ABOUT THE CONTEST */}
                <AboutTheContest
                    userData={userData}
                    dataFromThePreviousContest={dataFromThePreviousContest}

                    // Actions
                    wantSuggestedFields={wantSuggestedFields}

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