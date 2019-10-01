import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify';
import { Video } from 'expo-av';
import { Container } from 'native-base';
import moment from 'moment'

// AWS
import * as queries from '../../../src/graphql/queries'
import * as mutations from '../../../src/graphql/mutations'

let durationVideo = 1

class VideoExplainTheContest extends Component {

    state = {
        videoData: undefined,
        thisUserHasAlreadySeenTheVideo: null,
        oldView: {},
        swiperIndexState: 0,
        playVideo: false
    }


    _getPorcentageOfNum = (num, amount) => {
        return num * amount / 100;
    }

    _onPlaybackStatusUpdate = async (playbackStatus) => {
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        const views = {
            name: userData.name,
            idUserView: userData.id,
            createdAt: moment().toISOString(),
            avatar: userData.avatar,
            uri: playbackStatus.uri,
            didJustFinish: playbackStatus.durationMillis === playbackStatus.positionMillis ? true : false,
            durationMillis: playbackStatus.durationMillis,
            positionMillis: playbackStatus.positionMillis,
            isPaused: playbackStatus.durationMillis !== playbackStatus.positionMillis ? true : false,
            viewsVideoCreateContestId: contest.id
        }

        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state
            if (playbackStatus.isPlaying) {
                // El video se esta reproduciendo
            } else {
                // if (fullscreenVideo > 1) { fullscreenVideo = 0 }
            }
            if (playbackStatus.isBuffering) {
                // Update your UI for the buffering state
                // console.log('El vieeo esta en el buffer')
            }
            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing and will stop. Maybe you want to play something else?
                try {
                    await API.graphql(graphqlOperation(mutations.createViewsVideo, { input: views }))
                } catch (error) {
                    console.log(error)
                }
            }

        }
    };

    _durationVideo = async (playbackStatus) => {
        if (playbackStatus.durationMillis !== playbackStatus.positionMillis) {
            if (playbackStatus.positionMillis >= this._getPorcentageOfNum(5, playbackStatus.durationMillis)) {
                const userData = this.props.navigation.getParam('userData')
                const { contest } = this.props
                const views = {
                    name: userData.name,
                    idUserView: userData.id,
                    createdAt: moment().toISOString(),
                    avatar: userData.avatar,
                    uri: playbackStatus.uri,
                    didJustFinish: playbackStatus.durationMillis === playbackStatus.positionMillis ? true : false,
                    durationMillis: playbackStatus.durationMillis,
                    positionMillis: playbackStatus.positionMillis,
                    isPaused: playbackStatus.durationMillis !== playbackStatus.positionMillis ? true : false,
                    viewsVideoCreateContestId: contest.id
                }
                try {
                    await API.graphql(graphqlOperation(mutations.createViewsVideo, { input: views }))
                } catch (error) {
                    console.log(error)
                }
                this.videoRef.stopAsync()
            }
        }
    }

    componentWillReceiveProps(props) {
        if (props.swiperIndex === 0) {
            this.videoRef.stopAsync()
            this.videoRef.getStatusAsync().then(item => { this._durationVideo(item) })
        }
    }


    render() {
        const { contest, swiperIndex } = this.props
        return (
            <Container>
                <Video
                    onPlaybackStatusUpdate={(s) => this._onPlaybackStatusUpdate(s)}
                    ref={r => this.videoRef = r}
                    source={{ uri: contest && contest.general.video.url }}
                    useNativeControls={true}
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