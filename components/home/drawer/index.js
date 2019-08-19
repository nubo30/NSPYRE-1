import React, { Component } from 'react';
import { withNavigation } from "react-navigation"
import { Auth } from 'aws-amplify';
import { Text, List, ListItem, Left, Body, Right, Container, Thumbnail, Content, Button, Icon } from 'native-base';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import Placeholder from 'rn-placeholder'
import * as WebBrowser from 'expo-web-browser';

// child component
import ModifyProfile from './updateProfile/index';

class DrawerRight extends Component {
    state = {
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

    render() {
        const {
            // Modals
            modalVisibleModidfyProfile
        } = this.state
        const { userData } = this.props
        return (
            <Container>
                <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: '#F5F5F5', justifyContent: 'space-between' }}>
                    <List>
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

                        {/* Modify Profile */}
                        <ListItem icon last onPress={() => this._setModalVisibleModidfyProfile(true)} style={{ backgroundColor: '#FFF' }}>
                            <Left>
                                <Icon type="Feather" name="user" style={{ color: "#333", fontSize: 25 }} />
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