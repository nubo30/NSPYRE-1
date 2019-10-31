import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { Text, Button, Thumbnail, View, Spinner, ActionSheet } from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import _ from 'lodash'
import UserAvatar from "react-native-user-avatar"
import AWS from 'aws-sdk'
import bytes from 'bytes'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { showMessage } from "react-native-flash-message";

import * as mutations from '../../../../../../src/graphql/mutations'
import { securityCredentials } from '../../../../../global/aws/credentials'

import { colorsPalette } from '../../../../../global/static/colors'

// This function change the avatar user
class Avatar extends Component {
    state = {
        avatar: { name: "", type: "", localUrl: "", blob: {} }
    }

    // permission to access the user's phone library
    askPermissionsAsync = async () => {
        const statusCameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const statusCamera = await Permissions.askAsync(Permissions.CAMERA);
        if (statusCameraRoll.status === 'denied' || statusCamera.status === 'denied') {
            Alert.alert(
                'Denial',
                'You have denied access to the camera and roll camera, please enable it in your phone settings to continue',
                [{ text: 'Ok', onPress: () => { } }],
                { cancelable: false },
            )
        }
    }

    useLibraryHandler = async () => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] })
        if (!result.cancelled) {
            this._getNameOfLocalUrlAvatar(result.uri)
        }
    }

    _getNameOfLocalUrlAvatar = async (fileUri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", fileUri, true);
            xhr.send(null);
        });
        const { name, type } = blob._data;
        this.setState({ avatar: { ...this.state.avatar, localUrl: fileUri, name, type, blob } })
        this._updateAvatar()
    }

    _updateAvatar = async () => {
        const { avatar } = this.state
        const { _isLoading, userData } = this.props
        AWS.config.update({ accessKeyId: securityCredentials.accessKeyId, secretAccessKey: securityCredentials.secretAccessKey, region: securityCredentials.region })
        try {
            _isLoading(true)
            await Storage.put(`users/${userData.email}/avatar/${avatar.name}`, avatar.blob, {
                progressCallback(progress) {
                    showMessage({
                        autoHide: progress.loaded === progress.total ? true : false,
                        message: "Uploading...",
                        description: `Please wait until the following load is finished: ${bytes(progress.loaded * 1.7, { decimalPlaces: 0 })}/${bytes(progress.total * 1.7, { decimalPlaces: 0 })}`,
                        type: "default",
                        backgroundColor: colorsPalette.uploadingData,
                        color: colorsPalette.secondaryColor, // text color
                    });
                },
            }, { contentType: avatar.type })
            await API.graphql(graphqlOperation(mutations.updateUser, {
                input: {
                    id: userData.userId,
                    avatar: `https://influencemenow-statics-files-env.s3.amazonaws.com/public/users/${userData.email}/avatar/${avatar.name}`,
                }
            }))
            showMessage({
                message: "Successfully",
                description: "The pinture has been loaded successfully!",
                type: "default",
                backgroundColor: colorsPalette.validColor,
                color: colorsPalette.secondaryColor, // text color
            });
            _isLoading(false)
        } catch (error) {
            this.setState({ avatar: { name: "", type: "", localUrl: userData.avatar, blob: {} } })
            showMessage({
                message: "An error has occurred.",
                description: "Please verify your network connection, then try again!",
                type: "default",
                backgroundColor: colorsPalette.dangerColor,
                color: colorsPalette.secondaryColor, // text color
            });
            _isLoading(false)
        }
    }

    componentWillUnmount() {
        ActionSheet.actionsheetInstance = null;
    }

    render() {
        const { avatar } = this.state
        const { userData, isLoading, newName } = this.props
        return (
            <View style={{ flex: 1, minHeight: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                <View>
                    {
                        avatar.localUrl
                            ? <Thumbnail style={{ width: 105, height: 105, borderRadius: 50.5 }} source={{ uri: avatar.localUrl }} />
                            : userData.avatar === null ? <UserAvatar size="105" name={newName === null ? userData.name : newName} />
                                : <Thumbnail style={{ width: 105, height: 105, borderRadius: 50.5 }} source={{ uri: userData.avatar }} />
                    }

                </View>
                <Button
                    disabled={isLoading}
                    small bordered
                    onPress={() => { this.useLibraryHandler() }}
                    style={{ borderColor: isLoading ? "#BDBDBD" : "#D81B60", alignSelf: "center", width: 110, justifyContent: 'center' }}>
                    {isLoading
                        ? <Spinner color='#BDBDBD' size="small" hidesWhenStopped={true} />
                        : <Text
                            allowFontScaling={false}
                            minimumFontScale={wp(3)}
                            style={{ color: "#D81B60", fontSize: wp(3) }}>Update avatar</Text>}
                </Button>
            </View>
        )
    }
}

export default Avatar