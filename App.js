import React, { Component } from 'react';
import Amplify from 'aws-amplify'
import { NetInfo } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Root, Toast } from "native-base";
import thunk from "redux-thunk"
import Sentry from 'sentry-expo';
import { AppLoading } from "expo";
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
// import awsconfig from './aws-exports'

// Sentry config
Sentry.enableInExpoDevelopment = false;
Sentry.config('https://850709ab67944debb49e9305541df7dc@sentry.io/1458405').install();

// Amplify config
Amplify.configure({
    // API
    "aws_project_region": "us-east-1",
    "aws_appsync_graphqlEndpoint": "https://kznse54eyjh5hhzqgu5adedusy.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-ernsefrq5vglvhrcmjuht6abza",
    // AUTH
    Auth: {
        identityPoolId: 'us-east-1_J52Fp9oFz', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-east-1',
        identityPoolRegion: 'us-east-1',
        userPoolId: 'us-east-1_J52Fp9oFz',
        userPoolWebClientId: '7mmqhgkhcqhbppklkvulg8q1r',
    },
    Storage: {
        AWSS3: {
            bucket: 'influencemenow-statics-files-env', //REQUIRED -  Amazon S3 bucket
            region: 'us-east-1', //OPTIONAL -  Amazon service region
            identityPoolId: 'us-east-1_J52Fp9oFz'
        }
    }
});

// Disabled warnigns
console.disableYellowBox = true;

// Redux
import rootReducer from "./store/reducers/rootReducer"

// Child Components
import AuthLoadingScreen from "./components/authLoadingScreen/index"
import IntroToApp from "./components/introToApp/index"
import SignInOrSingUp from "./components/auth"
import Welcome from "./components/welcome/index"
import Engage from "./components/formsUsers/engage/index"
import CreateContest from "./components/formsUsers/createAContest/index"
import SubmitPrize from "./components/formsUsers/submitAPrize/index"
import Congratulation from "./components/congratulations/index"
import PromoteMyContest from "./components/promoteMyContest/index"
import Home from "./components/home/index"
import Contests from "./components/home/listContest/showContests/index"
import AboutContest from "./components/aboutContest/index"
import CreateAContest from "./components/home/drawer/createAContest/index"
import Prizes from "./components/home/photoAndButtom/categoryOfPrizes/listPrizes/index"
import AboutThePrize from "./components/home/photoAndButtom/categoryOfPrizes/listPrizes/aboutThePrize/index"

class InfluencemeNow extends Component {
    state = { isReady: false }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ isReady: true })
    }

    render() {
        return this.state.isReady ? <SignInOrSingUp /> : <AppLoading />
    }
}

const navigationOptions = { header: null, gesturesEnabled: false }

// Scenes
const RootStack = createStackNavigator(
    {
        'Home': { screen: Home, navigationOptions },
        'Sliders': { screen: IntroToApp, navigationOptions },
        'Welcome': { screen: Welcome, navigationOptions },
        'Engage': { screen: Engage, navigationOptions },
        'CreateContest': { screen: CreateContest, navigationOptions },
        'SubmitPrize': { screen: SubmitPrize, navigationOptions },
        'Congratulation': { screen: Congratulation, navigationOptions },
        'PromoteMyContest': { screen: PromoteMyContest, navigationOptions },
        'Contests': { screen: Contests, navigationOptions },
        'AboutContest': { screen: AboutContest, navigationOptions },
        'CreateAContest': { screen: CreateAContest, navigationOptions },
        'Prizes': { screen: Prizes, navigationOptions },
        'AboutThePrize': { screen: AboutThePrize, navigationOptions },
    }
)

const AuthStack = createStackNavigator({
    Auth: { screen: InfluencemeNow, navigationOptions }
})

const AppContainer = createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack
}, {
        initialRouteName: "AuthLoading",
        // transitionConfig: (nav) => handleCustomTransition(nav)
    }
));

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

export default class App extends Component {

    componentDidMount() {
        // Subscribe to the network
        NetInfo.addEventListener('connectionChange', (connectionInfo) => {
            if (connectionInfo.type === 'none') { Toast.show({ text: "There is no network connection.", type: "warning", duration: 5000 }) }
        })
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', () => { });
    }

    render() {
        return (
            <Provider store={store}>
                <Root>
                    <AppContainer />
                </Root>
            </Provider>
        )
    }
}
