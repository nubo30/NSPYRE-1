import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify';
import { Video } from 'expo-av';
import { Container, Text, View } from 'native-base';
import moment from 'moment'

// AWS
import * as queries from '../../../src/graphql/queries'
import * as mutations from '../../../src/graphql/mutations'

class VideoExplainTheContest extends Component {

    state = {
        isUserSeeBefore: false,
        time: new Date().toLocaleString(),
        seconds: 0
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.swiperIndex === 1) {
    //         this._getViews()
    //         this._timer()
    //     } else if (nextProps.swiperIndex !== 1) {
    //         this._clearTimer()
    //     }
    // }
    componentWillMount() {
        // Se determina si el usaurio esta registrado o no, también se determinará si este usaurio ha visto o no el video
        // this._isThisUserSeeTheVideoIBefore()
    }

    // componentWillUpdate(nextProps, nextState) {
    //     if (nextState.seconds <= 60) {
    //         this._dataConstruction(nextState.seconds)
    //     } else if (nextState.seconds > 60) {
    //         this._clearTimer()
    //     }
    // }


    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    _isThisUserSeeTheVideoIBefore = async () => {
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        try {
            const response = await API.graphql(graphqlOperation(queries.getViewsVideo, { id: userData.id + contest.id }))
            this.setState({ isUserSeeBefore: response.data.getViewsVideo === null ? false : true })
        } catch (error) {
            console.log(error)
        }
    }

    _getViews = async () => {
        // Se determinará la cantidad de views que tendra este video
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        if (this.state.isUserSeeBefore === false) {
            try {
                const input = {
                    id: userData.id + contest.id,
                    name: userData.name,
                    idUserView: userData.id,
                    createdAt: moment().toISOString(),
                    avatar: userData.avatar,
                    viewsVideoCreateContestId: contest.id
                }
                await API.graphql(graphqlOperation(mutations.createViewsVideo, { input }))
                await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
            } catch (error) {
            }
        }
    }

    _timer = () => {
        this.intervalID = setInterval(() => this._tick(), 1000);
    }

    _clearTimer = () => {
        clearInterval(this.intervalID)
        this.setState({ seconds: 0 })
    }

    _tick = () => {
        this.setState({
            seconds: this.state.seconds + 1
        });
    }

    _dataConstruction = (seconds) => {
        // Se análiza el tiempo que dura el usuario en esta sección
        console.log(seconds, "<----")
        switch (seconds) {
            case 10:
                console.log(`Ha durado ${seconds} segundos viendo el video`)
            case 20:
                console.log(`Ha durado ${seconds} segundos viendo el video`)
            case 30:
                console.log(`Ha durado ${seconds} segundos viendo el video`)
            case 40:
                console.log(`Ha durado ${seconds} segundos viendo el video`)
                break;
            case 50:
                console.log(`Ha durado ${seconds} segundos viendo el video`)
                break;
            case 60:
                console.log(`Ha durado ${seconds} segundos viendo el video`)
                break;
            default:
                break;
        }
    }

    render() {
        const { contest, swiperIndex } = this.props
        return (
            <Container>
                <Video
                    ref={video => this.videoRef = video}
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