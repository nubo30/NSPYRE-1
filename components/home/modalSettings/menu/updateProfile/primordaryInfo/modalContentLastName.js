import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { API, graphqlOperation } from "aws-amplify"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Icon, Item, Input, Text, Button, Left, Header, Title, Spinner, Toast, Container, Right, Content } from 'native-base'

// Max lenght of the form
const maxLength = 20

// GraphQL
import * as mutations from '../../../../../../src/graphql/mutations'

// this function show the content of modals
export default class UpdateLastName extends Component {
    state = { lastName: "" }

    _updateLastNameAWS = async () => {
        const { userData, _isLoading, setModalVisibleLastName } = this.props
        const input = { lastname: this.state.lastName, id: userData.id }
        _isLoading(true)
        try {
            await API.graphql(graphqlOperation(mutations.updateUser, { input }))
            _isLoading(false)
            setModalVisibleLastName(false)
        } catch (error) {
            _isLoading(false)
            Toast.show({ text: "Oops! Something went wrong, please try again.", buttonText: "Okay", type: "danger", duration: 3000, position: 'top' })
        }
    }

    render() {
        const { lastName } = this.state
        const { userData, isLoading, setModalVisibleLastName } = this.props
        return (
            <Container>
                <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", elevation: 0 }}>
                    <Left>
                        <Title
                            allowFontScaling={false}
                            minimumFontScale={wp(6)}
                            style={{ color: "#D81B60", fontSize: wp(6) }}>Edit your last name</Title>
                    </Left>
                    <Right>
                        <Button
                            onPress={() => lastName ? this._updateLastNameAWS() : setModalVisibleLastName(false)}
                            disabled={isLoading}
                            small transparent style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {isLoading ? <Spinner size="small" color="#3333" style={{ right: 5 }} /> : <Text
                                allowFontScaling={false}
                                style={{ fontSize: wp(4), color: lastName ? '#D81B60' : '#3333', letterSpacing: 1 }}>{lastName ? "Done" : "Cancel"}</Text>}
                        </Button>
                    </Right>
                </Header>
                <Content scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
                    <Item
                        error={lastName ? false : true}
                        success={lastName ? true : false}
                        style={{ width: "90%", alignSelf: "center" }}>
                        <Input
                            onSubmitEditing={() => lastName ? this._updateLastNameAWS() : Keyboard.dismiss()}
                            returnKeyType='done'
                            autoFocus={true}
                            allowFontScaling={false}
                            minimumFontScale={wp(4)}
                            placeholder={userData && userData.lastname}
                            maxLength={20}
                            value={lastName}
                            keyboardType="ascii-capable"
                            selectionColor="#D81B60"
                            onChangeText={(lastName) => this.setState({ lastName })} />
                        <Text
                            allowFontScaling={false}
                            minimumFontScale={wp(4)}
                            style={{ right: 15, color: "#E0E0E0", fontSize: wp(4) }}>
                            {maxLength - lastName.length}
                        </Text>
                        <Icon
                            style={{ color: lastName ? '#4CAF50' : '#EF5350' }}
                            lastName={lastName ? 'checkmark-circle' : 'close-circle'} />
                    </Item>
                </Content>
            </Container>
        )
    }
}