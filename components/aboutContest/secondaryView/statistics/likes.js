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
        disable: false
    }
    componentWillReceiveProps(prevProps) {
        const isUserExists = prevProps.contest.statistics === null ? [] : prevProps.contest.statistics.userLikes === null ? [] : prevProps.contest.statistics.userLikes.filter(item => item.idUserLike.indexOf(prevProps.userData.id) !== -1) // Se verifica si el suaurio existe
        this.setState({ actionlike: isUserExists === null ? 0 : isUserExists.length ? true : false })
    }

    _likes = async (value) => {
        const { userData, contest } = this.props
        omitDeep(contest, ['__typename'])
        try {
            if (contest.statistics !== null) {
                if (value) {
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
                    remove(contest.statistics.userLikes, { idUserLike: userData.id }) // Elimina un "Like" usando el id del usuario
                    const input = {
                        id: contest.id,
                        statistics: {
                            userSharing: contest.statistics.userSharing,
                            userLikes: contest.statistics.userLikes
                        }
                    }
                    await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
                }
            } else if (contest.statistics === null) {
                const input = {
                    id: contest.id,
                    statistics: {
                        userSharing: null,
                        userLikes: [{
                            avatar: userData.avatar,
                            createdAt: moment().toISOString(),
                            idUserLike: userData.id,
                            name: userData.name
                        }]
                    }
                }
                await API.graphql(graphqlOperation(mutations.updateCreateContest, { input }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    _disableButton = () => {
        this.setState({ disable: true })
        setTimeout(() => {
            this.setState({ disable: false })
        }, 2500);
    }

    render() {
        const { actionlike, disable } = this.state
        const { contest } = this.props
        // console.log(contest.statistics, "<-------------------------[][][][]")

        return (
            <Button
                disabled={disable}
                iconLeft
                transparent
                onPressIn={() => { this.setState({ actionlike: !actionlike }); this._disableButton() }}
                onPress={() => { this._likes(actionlike) }}>
                <Icon type="Ionicons" name='ios-heart' style={{ color: actionlike ? colorsPalette.heartColor : colorsPalette.gradientGray }} />
                <Text allowFontScaling={false} style={{ fontSize: wp(3.5), left: -5, color: actionlike ? colorsPalette.underlinesColor : colorsPalette.gradientGray }}>{contest.statistics === null ? 0 : contest.statistics.userLikes === null ? 0 : contest.statistics.userLikes.length}</Text>
            </Button>
        );
    }
}