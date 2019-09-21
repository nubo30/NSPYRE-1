import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { withNavigation } from 'react-navigation'
import { Button, Icon, Text } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'


// AWS
import * as mutations from '../../../src/graphql/mutations'
import * as queries from '../../../src/graphql/queries'

// Colors
import { colorsPalette } from '../../global/static/colors'

class Likes extends Component {
    state = {
        disable: false,
        actionLike: false
    }

    componentWillMount() {
        this._isThisUserLikeBefore()
    }

    _isThisUserLikeBefore = async () => {
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        try {
            const response = await API.graphql(graphqlOperation(queries.getUsersLikes, { id: userData.id + contest.id }))
            this.setState({ actionLike: response.data.getUsersLikes === null ? false : true })
        } catch (error) {
            console.log(error)
        }
    }

    _likes = async () => {
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        try {
            if (this.state.actionLike) {
                const like = {
                    id: userData.id + contest.id,
                    name: userData.name,
                    idUserLike: userData.id,
                    createdAt: moment().toISOString(),
                    avatar: userData.avatar, // Avatar del usuario que ha dado like al concurso
                    usersLikesCreateContestId: contest.id,
                }
                await API.graphql(graphqlOperation(mutations.createUsersLikes, { input: like }))
                await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            } else {
                await API.graphql(graphqlOperation(mutations.deleteUsersLikes, { input: { id: userData.id + contest.id } }))
                await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    _actionLike = () => {
        this.setState({ actionLike: !this.state.actionLike })
        setTimeout(() => { this._likes() }, 500);
    }

    _disableButton = () => {
        this.setState({ disable: true })
        setTimeout(() => {
            this.setState({ disable: false })
        }, 2500);
    }

    render() {
        const { disable, actionLike } = this.state
        const { contest } = this.props
        return (
            <Button
                disabled={disable}
                iconLeft
                transparent
                onPressIn={() => { this._disableButton() }}
                onPress={() => { this._actionLike() }}>
                <Icon type="Ionicons" name='ios-heart' style={{ color: actionLike ? colorsPalette.heartColor : colorsPalette.gradientGray }} />
                <Text allowFontScaling={false} style={{ fontSize: wp(3.5), left: -5, color: actionLike ? colorsPalette.underlinesColor : colorsPalette.gradientGray }}>
                    {contest.usersLikes === null ? 0 : contest.usersLikes.items.length}
                </Text>
            </Button>
        );
    }
}

export default withNavigation(Likes)