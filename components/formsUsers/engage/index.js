import React, { Component } from 'react';
import { Auth } from 'aws-amplify'
import Swiper from 'react-native-swiper'
import _ from 'lodash'

// Child Component
import AboutThePersonality from './views/aboutThePersonality'
import AbouttheirOccupations from './views/aboutTheirOccupations'
import Interests from './views/interests'
import Summary from './views/summary'

export default class SubmitPrize extends Component {
    state = {
        userData: {},
        engage: {},
        coins: {}
    }

    async componentDidMount() {
        try {
            const { attributes } = await Auth.currentUserInfo()
            this.setState({ userData: attributes })
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
            <Swiper
                scrollEnabled={false}
                ref={(swiper) => this.swiper = swiper}
                loop={false} showsButtons={false} showsPagination={false}>

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

                {/* INTEREST */}
                <Interests
                    userData={userData}

                    _dataFromForms={this._dataFromForms}
                    _indexChangeSwiper={this._indexChangeSwiper} />

                {/* INTEREST */}
                <Summary
                    userData={userData}
                    engage={engage}
                    coins={coins}

                    _indexChangeSwiper={this._indexChangeSwiper} />
            </Swiper>
        );
    }
}