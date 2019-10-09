import React, { Component } from 'react';
import { AppState } from 'react-native'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { withNavigation } from "react-navigation"
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { Text, List, ListItem, Left, Body, Right, Container, Thumbnail, Content, Button, Icon, Switch } from 'native-base';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import { PlaceholderMedia } from "rn-placeholder"
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Redux
import { isNotExistUserInTheAPI } from "../../../store/actions/authActions"

// child component
import ModifyProfile from './updateProfile/index';

// GRAPHQL
import * as mutations from '../../../src/graphql/mutations'

// Colors
import { colorsPalette } from '../../global/static/colors'

class DrawerRight extends Component {
    state = {
        // Actions
        notificationsActions: false,
        appState: AppState.currentState,
        modalVisibleModidfyProfile: false,
    }

    // Open modals
    _setModalVisibleModidfyProfile = (visible) => this.setState({ modalVisibleModidfyProfile: visible })

    // Sign Out
    handleSignOut = async () => {
        const { isNotExistUserInTheAPI } = this.props
        try {
            isNotExistUserInTheAPI(0)
            await Auth.signOut({ global: true }); this.props.navigation.navigate("Auth")
        }
        catch (error) { console.log(error) }
    }

    // Privacy Policies
    _privacyPolicies = async () => {
        await WebBrowser.openBrowserAsync('https://nubo30.github.io/influencemenowProvacyPolicy/terms_and_conditions.html');
    };

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this._getTokenNotification()
        this.listener = Notifications.addListener(this.handleNotification);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this.listener && this.listener.remove();
    }

    _handleAppStateChange = nextAppState => {
        // Condificon que determina cuando el usaurio ha vuelto a abrir la app
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') { }
        this.setState({ appState: nextAppState });

    };

    handleNotification = ({ origin, data }) => {
        const { navigation, userData } = this.props
        if (this.state.appState !== 'active') {
            switch (data.type) {
                case 'participantsInTheContest':
                    navigation.navigate('AboutContest', { userData, contest: data.contest })
                    break;
                default:
                    break;
            }
        }

    };

    // Notifications
    _getTokenNotification = async () => {
        const { userData } = this.props
        this.setState({ notificationsActions: true })
        if (!Constants.isDevice) { return }
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            try {
                this.setState({ notificationsActions: false })
                await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id, notificationToken: null } }))
            } catch (error) { this.setState({ notificationsActions: false }) }
        } else if (status === 'granted') {
            if (userData.notificationToken === null) {
                let token = await Notifications.getExpoPushTokenAsync();
                try {
                    await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id, notificationToken: token } }))
                } catch (error) { this.setState({ notificationsActions: false }) }
            } else {
                try {
                    this.setState({ notificationsActions: false })
                    await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: userData.id, notificationToken: null } }))
                } catch (error) { this.setState({ notificationsActions: true }) }
            }
        }
    }

    componentWillReceiveProps(nextProps) { this.setState({ notificationsActions: nextProps.userData.notificationToken === null ? false : true }) }

    render() {
        const {
            // Actions
            notificationsActions,

            // Modals
            modalVisibleModidfyProfile
        } = this.state
        const { userData } = this.props
        return (
            <Container>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: colorsPalette.opaqueWhite2, justifyContent: 'space-between' }}>
                    <List style={{ backgroundColor: colorsPalette.secondaryColor }}>
                        <ListItem style={{ borderBottomColor: "#CFD8DC", borderBottomWidth: 0.5 }} thumbnail itemDivider>
                            {
                                Object.keys(userData).length !== 0
                                    ? userData.avatar !== null
                                        ? <Thumbnail style={{ width: 45, height: 45, borderRadius: 22.5 }} source={{ uri: userData.avatar }} />
                                        : <UserAvatar size="45" name={userData.name} />
                                    : <PlaceholderMedia animate="fade" style={{ width: 45, height: 45, borderRadius: 22.5 }} />
                            }
                            <Body style={{ borderBottomColor: colorsPalette.transparent }}>
                                <Text
                                    allowFontScaling={false}
                                    minimumFontScale={wp(4)}
                                    style={{ fontSize: wp(4) }}
                                >{userData.name}</Text>
                                <Text
                                    allowFontScaling={false}
                                    minimumFontScale={wp(3)}
                                    style={{ fontSize: wp(3), fontWeight: '500' }}
                                    note numberOfLines={1}>{userData.coins} Points</Text>
                            </Body>
                        </ListItem>

                        {/* NOTIFICATIONS */}
                        <ListItem icon style={{ backgroundColor: colorsPalette.secondaryColor }}>
                            <Left>
                                <Button style={{ backgroundColor: "#F44336" }}>
                                    <Icon type="MaterialIcons" active name="photo-filter" />
                                </Button>
                            </Left>
                            <Body>
                                <Text
                                    allowFontScaling={false}
                                    minimumFontScale={wp(4)}
                                    style={{ fontSize: wp(4) }}
                                >Notifications</Text>
                            </Body>
                            <Right>
                                <Switch value={notificationsActions} onValueChange={() => this._getTokenNotification()} />
                            </Right>
                        </ListItem>

                        {/* Modify Profile */}
                        <ListItem icon last onPress={() => this._setModalVisibleModidfyProfile(true)} style={{ backgroundColor: colorsPalette.secondaryColor }}>
                            <Left>
                                <Button style={{ backgroundColor: "#2979FF" }}>
                                    <Icon type="MaterialCommunityIcons" name="account-edit" />
                                </Button>
                            </Left>
                            <Body>
                                <Text
                                    allowFontScaling={false}
                                    minimumFontScale={wp(4)}
                                    style={{ color: colorsPalette.darkFont, fontSize: wp(4) }}>Update profile</Text>
                            </Body>
                            <Right>
                                <Icon type="Feather" name="arrow-right" size={20} color="#E0E0E0" />
                            </Right>
                        </ListItem>

                        <ListItem itemDivider style={{ height: 20, borderTopColor: "#CFD8DC", borderBottomColor: "#CFD8DC", borderBottomWidth: 0.5, borderTopWidth: 0.5 }} />

                        {/* Salir de la aplicacion */}
                        <ListItem
                            onPress={() => this.handleSignOut()}
                            last style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: colorsPalette.secondaryColor
                            }}>
                            <Text
                                allowFontScaling={false}
                                minimumFontScale={wp(4)}
                                style={{ fontSize: wp(4), color: colorsPalette.errColor }}>Sign Out</Text>
                        </ListItem>
                    </List>
                    <Button
                        onPress={() => this._privacyPolicies()}
                        style={{ alignSelf: 'center' }} transparent>
                        <Text
                            allowFontScaling={false}
                            minimumFontScale={wp(2)}
                            style={{ color: colorsPalette.darkFont, fontWeight: 'bold', fontSize: wp(2), textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                    </Button>
                    <Text allowFontScaling={false} style={{ fontSize: wp(2), alignSelf: 'center', position: 'absolute', bottom: 0 }}>Version 1.0.0</Text>
                </Content>
                {/* Modify Profile User */}
                <ModifyProfile
                    // Data
                    userData={userData}

                    // Actions
                    modalVisibleModidfyProfile={modalVisibleModidfyProfile}

                    // Function
                    _setModalVisibleModidfyProfile={this._setModalVisibleModidfyProfile} />
            </Container>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        isNotExistUserInTheAPI: (isNotExistUserInTheAPIParams) => dispatch(isNotExistUserInTheAPI(isNotExistUserInTheAPIParams))
    }
}

export default connect(null, mapDispatchToProps)(withNavigation(DrawerRight))