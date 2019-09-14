import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import { AfterInteractions } from 'react-native-interactions';
import { View } from 'react-native'

// Child Component
import AboutYou from './views/aboutYou'
import AboutTheContest from './views/aboutTheContest'
import Prizes from './views/prizes'
import Summary from './views/summary'

// GraphQL
import * as queries from "../../../src/graphql/queries"

// Childcomponent
import AboutYouPlaceholder from './placeholder/index'

export default class CreateContest extends Component {
    state = {
        userData: {},
        dataFromThePreviousContest: {},
        wantSuggestedFields: false,
        contest: {},

    }
    async componentDidMount() {
        try {
            const data = await Auth.currentAuthenticatedUser()
            const userData = await API.graphql(graphqlOperation(queries.getUser, { id: data.id || data.attributes.sub }))
            await this.setState({ userData: userData.data.getUser, dataFromThePreviousContest: _.last(userData.data.getUser.createContest.items) })
            await userData.data.getUser.createContest.items.length ? Alert.alert(
                `${userData.data.getUser.name}`,
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

    _dataFromForms = (data) => {
        const { contest } = this.state
        this.setState({
            contest: Object.assign(contest, data),
        })
    }

    render() {
        const { contest, userData, dataFromThePreviousContest, wantSuggestedFields } = this.state
        return (
            <AfterInteractions placeholder={<View style={{ flex: 1 }}><AboutYouPlaceholder /></View>}>
                <Swiper
                    scrollEnabled={true}
                    ref={(swiper) => this.swiper = swiper}
                    loop={false} showsButtons={false} showsPagination={false}>

                    {/* ABOUT YOU */}
                    <AboutYou
                        // Data
                        userData={userData}
                        dataFromThePreviousContest={dataFromThePreviousContest}

                        // Actions
                        wantSuggestedFields={wantSuggestedFields}

                        // Functions
                        _dataFromForms={this._dataFromForms}
                        _indexChangeSwiper={this._indexChangeSwiper} />

                    {/* ABOUT THE CONTEST */}
                    <AboutTheContest
                        // Data
                        userData={userData}
                        dataFromThePreviousContest={dataFromThePreviousContest}

                        // Actions
                        wantSuggestedFields={wantSuggestedFields}

                        // Functions
                        _dataFromForms={this._dataFromForms}
                        _indexChangeSwiper={this._indexChangeSwiper} />

                    {/* PRIZES */}
                    <Prizes
                        // Data
                        userData={userData}

                        // Functions
                        _dataFromForms={this._dataFromForms}
                        _indexChangeSwiper={this._indexChangeSwiper} />

                    {/* Summary */}
                    <Summary
                        userData={userData}
                        contest={contest}
                        _indexChangeSwiper={this._indexChangeSwiper} />
                </Swiper>
            </AfterInteractions>
        );
    }
}