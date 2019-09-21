import React, { Component } from 'react';
import { Share } from 'react-native';
import { withNavigation } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify'
import { Button, Icon } from "native-base"
import moment from 'moment'

// AWS
import * as mutations from '../../../src/graphql/mutations'
import * as queries from '../../../src/graphql/queries'

// Colors
import { colorsPalette } from '../../global/static/colors'

class Shares extends Component {

    state = { userSharing: {} }

    componentDidMount() {
        this._isThisUserSharingBefore()
    }

    _isThisUserSharingBefore = async () => {
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        try {
            const response = await API.graphql(graphqlOperation(queries.getUsersSharing, { id: userData.id + contest.id }))
            this.setState({ userSharing: response.data.getUsersSharing })
        } catch (error) {
            console.log(error)
        }
    }

    _share = async () => {
        const userData = this.props.navigation.getParam('userData')
        const { contest } = this.props
        this._isThisUserSharingBefore()
        try {
            const result = await Share.share({
                message: contest.general.description,
                title: contest.general.nameOfContest,
            }, {
                tintColor: "red",
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.Print',
                    'com.apple.UIKit.activity.CopyToPasteboard',
                    'com.apple.UIKit.activity.SaveToCameraRoll',
                    'com.apple.UIKit.activity.AirDrop',
                    'com.apple.UIKit.activity.PostToWeibo',
                    'com.apple.UIKit.activity.AssignToContact',
                    'com.apple.UIKit.activity.AddToReadingList',
                    'com.apple.UIKit.activity.PostToFlickr',
                    'com.apple.UIKit.activity.PostToVimeo',
                    'com.apple.UIKit.activity.PostToTencentWeibo',
                    'com.apple.UIKit.activity.OpenInIBooks',
                    'com.apple.UIKit.activity.MarkupAsPDF',
                    'com.apple.reminders.RemindersEditorExtension',
                    'com.apple.mobilenotes.SharingExtension',
                    'com.apple.mobileslideshow.StreamShareService',
                    'com.linkedin.LinkedIn.ShareExtension',
                    'pinterest.ShareExtension',
                    'com.google.GooglePlus.ShareExtension',
                    'com.tumblr.tumblr.Share-With-Tumblr',
                    'net.whatsapp.WhatsApp.ShareExtension',
                ],

            });

            if (result.action === Share.sharedAction) {
                if (this.state.userSharing !== null) {
                    const sharing = {
                        id: userData.id + contest.id, // Se determina el id del concurso para el objeto
                        name: userData.name, // Nombre del usuario que ha compartido el concurso
                        idUserSharing: userData.id, // id del usuario que comparte el concurso
                        whereItHasBeenShared: [...this.state.userSharing.whereItHasBeenShared, result.activityType], // aplicacion donde se ha compartido el concurso
                        createdAt: moment().toISOString(),
                        avatar: userData.avatar, // Avatar del usuario que ha compartido el concurso
                        usersSharingCreateContestId: contest.id // relacion entre el concurso y el objecto a crear
                    }
                    await API.graphql(graphqlOperation(mutations.updateUsersSharing, { input: sharing }))
                    await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
                } else if (this.state.userSharing === null) {
                    const sharing = {
                        id: userData.id + contest.id, // Se determina el id del concurso para el objeto
                        name: userData.name, // Nombre del usuario que ha compartido el concurso
                        idUserSharing: userData.id, // id del usuario que comparte el concurso
                        whereItHasBeenShared: result.activityType, // aplicacion donde se ha compartido el concurso
                        createdAt: moment().toISOString(),
                        avatar: userData.avatar, // Avatar del usuario que ha compartido el concurso
                        usersSharingCreateContestId: contest.id // relacion entre el concurso y el objecto a crear
                    }
                    await API.graphql(graphqlOperation(mutations.createUsersSharing, { input: sharing }))
                    await API.graphql(graphqlOperation(mutations.updateCreateContest, { input: { id: contest.id } }))
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log(result, "No se ha compartido")
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <Button icon transparent onPress={() => this._share()}>
                <Icon type="FontAwesome" name='share-square-o' style={{ color: colorsPalette.primaryColor }} />
            </Button>
        );
    }
}

export default withNavigation(Shares)