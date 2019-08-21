import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { API, graphqlOperation } from "aws-amplify"
import { isAscii } from 'validator';
import { Grid, Col } from 'react-native-easy-grid'
import { Icon, Item, Input, Text, Button, Left, Header, Title, Spinner } from 'native-base'

// Max lenght of the form
const maxLength = 20

// GraphQL
import * as mutations from '../../../../../src/graphql/mutations'

// this function show the content of modals
export default class UpdateLastName extends Component {
    state = { lastName: "" }

    _updateLastNameAWS = async () => {
        const { userData, _isLoading, setModalVisibleLastName } = this.props
        const input = { lastname: this.state.lastName, id: userData.id }
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
        const { userData, isLoading, _isLoading } = this.props
        return (
            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", elevation: 0 }}>
                    <Left>
                        <Title style={{ color: "#333", fontSize: 22 }}>Edit your last name</Title>
                    </Left>
                </Header>
                <Item
                    error={isAscii(this.state.lastName) ? false : true}
                    success={isAscii(this.state.lastName) ? true : false}
                    style={{ width: "90%", top: 15, alignSelf: "center" }}>
                    <Input
                        placeholder={userData && userData.lastname}
                        autoCapitalize="words" autoFocus={true} ref={(ref) => { lastName = ref }}
                        maxLength={20} value={this.state.lastName} keyboardType="ascii-capable" selectionColor="#333"
                        onChangeText={(lastName) => this.setState({ lastName })} />
                    <Text style={{ right: 15, color: "#E0E0E0" }}>
                        {maxLength - this.state.lastName.length}
                    </Text>
                    <Icon
                        style={{ color: isAscii(this.state.lastName) ? '#4CAF50' : '#EF5350' }}
                        name={isAscii(this.state.lastName) ? 'checkmark-circle' : 'close-circle'} />
                </Item>
                <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                        <Button
                            bordered
                            onPress={() => this.props.setModalVisibleLastName(false)}
                            style={{
                                borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                            <Text style={{ color: "#333" }}>CANCEL</Text>
                        </Button>
                    </Col>
                    <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                        <Button
                            bordered
                            disabled={isLoading || this.state.lastName === "" ? true : false}
                            onPressIn={() => _isLoading(true)}
                            onPress={this.state.lastName ? () => this._updateLastNameAWS() : null}
                            style={{
                                borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                            {isLoading ? <Spinner size="small" color="#BDBDBD" /> : <Text style={{ color: isAscii(this.state.lastName) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>}
                        </Button>
                    </Col>
                </Grid>
            </KeyboardAvoidingView>
        )
    }
}