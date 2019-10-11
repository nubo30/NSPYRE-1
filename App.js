import React, { Component } from 'react';
import Amplify from 'aws-amplify'
import { NetInfo, YellowBox } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Root, Toast } from "native-base";
import thunk from "redux-thunk"
import { AppLoading } from "expo";
import { createAppContainer, createStackNavigator } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
// import awsconfig from './aws-exports'
// import Sentry from 'sentry-expo';

// Sentry config
// Sentry.enableInExpoDevelopment = false;
// Sentry.config('https://850709ab67944debb49e9305541df7dc@sentry.io/1458405').install();

// Amplify config
Amplify.configure({
    // API
    "aws_project_region": "us-east-1",
    "aws_appsync_graphqlEndpoint": "https://kznse54eyjh5hhzqgu5adedusy.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-tuocm6kvjvb57iw3kxvbz7zptu",
    // AUTH
    Auth: {
        identityPoolId: 'us-east-1:69f86b8c-2d0e-4ad9-b69d-e74c70c777d2', //REQUIRED - Amazon Cognito Identity Pool ID
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

console.disableYellowBox = true;
YellowBox.ignoreWarnings(["ReactNative.NativeModules.LottieAnimationView.getConstants"]);


// Redux
import rootReducer from "./store/reducers/rootReducer"
import { networkStatusOnline, networkStatusOffline } from './store/network/actions'

// Child Components
import AuthLoadingScreen from "./components/authLoadingScreen"
import FirstAuth from "./components/introToApp/auth"
import IntroToApp from "./components/introToApp"
import SignInOrSingUp from "./components/auth"
import Welcome from "./components/welcome"
import Engage from "./components/formsUsers/engage"
import CreateContest from "./components/formsUsers/createAContest"
import SubmitPrize from "./components/formsUsers/submitAPrize"
import Congratulation from "./components/congratulations"
import PromoteMyContest from "./components/promoteMyContest"
import Home from "./components/home"
import Contests from "./components/home/listContest/showContests"
import AboutContest from "./components/aboutContest"
import Prizes from "./components/home/photoAndButtom/categoryOfPrizes/listPrizes"
import AboutThePrize from "./components/home/photoAndButtom/categoryOfPrizes/listPrizes/aboutThePrize"
import UserProfile from "./components/userProfile/index"
import Trending from "./components/home/listContest/trending"
import CaseOfSuccess from './components/home/listContest/caseOfSuccess'
import AboutContestSuccess from './components/home/listContest/caseOfSuccess/aboutTheContest'

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
        'Prizes': { screen: Prizes, navigationOptions },
        'AboutThePrize': { screen: AboutThePrize, navigationOptions },
        'UserProfile': { screen: UserProfile, navigationOptions: { header: null } },
        'Trending': { screen: Trending, navigationOptions: { header: null } },
        'CaseOfSuccess': { screen: CaseOfSuccess, navigationOptions: { header: null } },
        'AboutContestSuccess': { screen: AboutContestSuccess, navigationOptions: { header: null } }
    }
)

const AuthStack = createStackNavigator({
    Auth: { screen: InfluencemeNow, navigationOptions },
    IntroToApp: { screen: IntroToApp, navigationOptions },
    FirstAuth: { screen: FirstAuth,  navigationOptions }
})

const AppContainer = createAppContainer(createAnimatedSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack
}, {
    initialRouteName: "AuthLoading",
    // transitionConfig: (nav) => handleCustomTransition(nav)
    transition: (
        <Transition.Together>
            <Transition.Out type="slide-bottom" durationMs={300} interpolation="easeIn" />
            <Transition.In type="fade" durationMs={100} />
        </Transition.Together>
    ),
}
));

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

class App extends Component {
    componentDidMount() {
        // Subscribe to the network
        NetInfo.addEventListener('connectionChange', (connectionInfo) => {
            if (connectionInfo.type === 'none') {
                store.dispatch(networkStatusOffline())
                Toast.show({ text: "There is no network connection.", type: "warning", duration: 5000 })
            } else {
                store.dispatch(networkStatusOnline())
            }
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

export default App
