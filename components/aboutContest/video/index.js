import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify';
import { Video } from 'expo-av';
import { Container } from 'native-base';
import moment from 'moment'

// AWS
import * as queries from '../../../src/graphql/queries'
import * as mutations from '../../../src/graphql/mutations'

let count = 0

class VideoExplainTheContest extends Component {

    state = {
        videoData: undefined,
        thisUserHasAlreadySeenTheVideo: null,
        oldView: {}
    }

    componentWillMount() {
        this._thisUserHasAlreadySeenTheVideo()
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log(nextState.videoData)
        if (nextState.videoData && nextState.videoData.isPlaying === true) {
            if (nextState.thisUserHasAlreadySeenTheVideo === false) {
                if (count++ < 1) { this._createView(nextState.videoData) }
            }
        }
    }

    _thisUserHasAlreadySeenTheVideo = async () => {
        // Se verifica si el usuario en sesion ha visto ay este videoI
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        try {
            const response = await API.graphql(graphqlOperation(queries.getViewsVideo, { id: userData.id + contest.id }))
            this.setState({ thisUserHasAlreadySeenTheVideo: response.data.getViewsVideo === null ? false : true, oldView: response.data.getViewsVideo })
        } catch (error) {
            console.log(error)
        }
    }

    _createView = async (videoData) => {
        // Se crea la vista en AWS si esta no existe
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        const input = {
            viewsVideoCreateContestId: contest.id,
            id: userData.id + contest.id,
            name: userData.name,
            idUserView: userData.id,
            createdAt: moment().toISOString(),
            avatar: userData.avatar,
            dataVideo: [JSON.stringify({
                createdAt: moment().toISOString(),
                didJustFinish: videoData.didJustFinish,
                durationMillis: videoData.durationMillis,
                hasJustBeenInterrupted: videoData.hasJustBeenInterrupted,
                positionMillis: videoData.positionMillis,
                uri: videoData.uri
            })]

        }
        try {
            await API.graphql(graphqlOperation(mutations.createViewsVideo, { input }))
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
        } catch (error) {
            console.log(error)
        }
    }

    _updateCreateView = async () => {
        // Se actualzia la vista en AWS
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        const { oldView, videoData } = this.state
        const newView = {
            id: userData.id + contest.id,
            name: userData.name,
            idUserView: userData.id,
            createdAt: moment().toISOString(),
            avatar: videoData.createdAt,
            dataVideo: [...oldView.dataVideo, JSON.stringify({
                createdAt: moment().toISOString(),
                didJustFinish: videoData.didJustFinish,
                durationMillis: videoData.durationMillis,
                hasJustBeenInterrupted: videoData.hasJustBeenInterrupted,
                positionMillis: videoData.positionMillis,
                uri: videoData.uri
            })]

        }
        try {
            await API.graphql(graphqlOperation(mutations.updateViewsVideo, { input: newView }))
            await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
        } catch (error) {
            console.log(error)
        }
    }

    componentWillUnmount() {
        if (this.state.thisUserHasAlreadySeenTheVideo === true) {
            this._updateCreateView()
        }
    }

    render() {
        const { contest, swiperIndex } = this.props
        return (
            <Container>
                <Video
                    ref={r => this.videoRef = r}
                    onPlaybackStatusUpdate={swiperIndex === 1 ? (videoData) => { this.setState({ videoData }) } : () => { }}
                    source={{ uri: contest && contest.general.video.url }}
                    useNativeControls={true}
                    usePoster={true}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={swiperIndex ? true : false}
                    isLooping={false}
                    style={{ width: "100%", height: "100%" }} />
            </Container>
        );
    }
}

export default withNavigation(VideoExplainTheContest)