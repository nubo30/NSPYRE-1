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
import Placeholder from 'rn-placeholder'
import * as WebBrowser from 'expo-web-browser';

// child component
import ModifyProfile from './updateProfile/index';

// GRAPHQL
import * as mutations from '../../../src/graphql/mutations'


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
    handleSignOut = async () => { try { await Auth.signOut({ global: true }); this.props.navigation.navigate("Auth") } catch (error) { console.log(error) } }

    // Politicis
    _politicis = async () => {
        let result = await WebBrowser.openBrowserAsync('https://expo.io');
        this.setState({ result });
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
            console.log(data)
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
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: '#F5F5F5', justifyContent: 'space-between' }}>
                    <List style={{ backgroundColor: '#FFF' }}>
                        <ListItem style={{ borderBottomColor: "#CFD8DC", borderBottomWidth: 0.5 }} thumbnail itemDivider>
                            {
                                Object.keys(userData).length !== 0
                                    ? userData.avatar !== null
                                        ? <Thumbnail style={{ width: 45, height: 45, borderRadius: 22.5 }} source={{ uri: userData.avatar }} />
                                        : <UserAvatar size="45" name={userData.name} />
                                    : <Placeholder.Media animate="fade" style={{ width: 45, height: 45, borderRadius: 22.5 }} />
                            }
                            <Body style={{ borderBottomColor: "rgba(0,0,0,0.0)" }}>
                                <Text>{userData.name}</Text>
                                <Text note numberOfLines={1}>Coins {userData.coins}</Text>
                            </Body>
                        </ListItem>

                        {/* NOTIFICATIONS */}
                        <ListItem icon style={{ backgroundColor: '#FFF' }}>
                            <Left>
                                <Button style={{ backgroundColor: "#F44336" }}>
                                    <Icon type="MaterialIcons" active name="photo-filter" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Notifications</Text>
                            </Body>
                            <Right>
                                <Switch value={notificationsActions} onValueChange={() => this._getTokenNotification()} />
                            </Right>
                        </ListItem>

                        {/* Modify Profile */}
                        <ListItem icon last onPress={() => this._setModalVisibleModidfyProfile(true)} style={{ backgroundColor: '#FFF' }}>
                            <Left>
                                <Button style={{ backgroundColor: "#2979FF" }}>
                                    <Icon type="MaterialCommunityIcons" name="account-edit" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={{ color: "#333" }}>Update profile</Text>
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
                                backgroundColor: '#FFF'
                            }}>
                            <Text style={{ color: "#F44336", fontSize: 22 }}>Sign Out</Text>
                        </ListItem>
                    </List>
                    <Button
                        onPress={() => this._politicis()}
                        style={{ alignSelf: 'center' }} transparent>
                        <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 12, textDecorationLine: 'underline' }}>Security politics</Text>
                    </Button>
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

export default withNavigation(DrawerRight)