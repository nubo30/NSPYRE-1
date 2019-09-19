import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import remove from 'lodash/remove'
import omitDeep from 'omit-deep'


// AWS
import * as mutations from '../../../../src/graphql/mutations'

// Colors
import { colorsPalette } from '../../../global/static/colors'

export default class Likes extends Component {
    state = {
        actionlike: false,
    }

    componentWillReceiveProps(prevProps) {
        const isUserExists = prevProps.contest.statistics === [] ? null : prevProps.contest.statistics && prevProps.contest.statistics.userLikes.filter(item => item.idUserLike.indexOf(prevProps.userData.id) !== -1) // Se verifica si el suaurio existe
        this.setState({ actionlike: isUserExists === null ? 0 : isUserExists.length ? true : false })
    }

    _likes = async (action) => {
        const { userData, contest } = this.props
        omitDeep(contest, ['__typename'])
        try {
            if (action) {
                const input = {
                    id: contest.id,
                    statistics: {
                        userSharing: contest.statistics.userSharing,
                        userLikes: contest.statistics.userLikes === null ? [{
                            avatar: userData.avatar,
                            createdAt: moment().toISOString(),
                            idUserLike: userData.id,
                            name: userData.name
                        }] : [...contest.statistics.userLikes, {
                            avatar: userData.avatar,
                            createdAt: moment().toISOString(),
                            idUserLike: userData.id,
                            name: userData.name
                        }]
                    }
                }
                await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
            } else {
                const input = {
                    id: contest.id,
                    statistics: {
                        userSharing: contest.statistics.userSharing,
                        userLikes: remove(contest.statistics.userLikes.idUserLike, { idUserLike: userData.id })
                    }
                }
                await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { actionlike } = this.state
        const { contest } = this.props
        return (
            <Button
                iconLeft
                transparent
                onPressIn={() => this.setState({ actionlike: !actionlike })}
                onPress={() => this._likes(actionlike)}>
                <Icon type="Ionicons" name='ios-heart' style={{ color: actionlike ? colorsPalette.heartColor : colorsPalette.gradientGray }} />
                <Text allowFontScaling={false} style={{ fontSize: wp(3.5), left: -5, color: actionlike ? colorsPalette.underlinesColor : colorsPalette.gradientGray }}>{contest.statistics === null ? 0 : contest.statistics.userLikes === null ? 0 : contest.statistics.userLikes.length}</Text>
            </Button>
        );
    }
}