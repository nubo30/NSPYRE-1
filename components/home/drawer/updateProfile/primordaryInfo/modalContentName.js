import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { API, graphqlOperation } from "aws-amplify"
import { isAscii } from 'validator';
import { Grid, Col } from 'react-native-easy-grid'
import { Icon, Item, Input, Text, Button, Left, Header, Title, Spinner, Toast } from 'native-base'

// Max lenght of the form
const maxLength = 20

// GraphQL
import * as mutations from '../../../../../src/graphql/mutations'

// this function show the content of modals
export default class UpdateName extends Component {
    state = { name: "" }

    _updateNameAWS = async () => {
        const { userData, _isLoading, setModalVisibleName } = this.props
        const input = {
            name: this.state.name,
            id: userData.id,
        }
        try {
            await API.graphql(graphqlOperation(mutations.updateUser, { input }))
            _isLoading(false)
            setModalVisibleName(false)
        } catch (error) {
            _isLoading(false)
            Toast.show({ text: "Oops! Something went wrong, please try again.", buttonText: "Okay", type: "danger", duration: 3000, position: 'top' })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { userData } = nextProps
        this.setState({
            name: userData && userData.name
        })
    }


    render() {
        const { userData, isLoading, _isLoading } = this.props
        return (
            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", elevation: 0 }}>
                    <Left>
                        <Title style={{ color: "#333", fontSize: 22 }}>Edit your name</Title>
                    </Left>
                </Header>
                <Item
                    error={isAscii(this.state.name) ? false : true}
                    success={isAscii(this.state.name) ? true : false}
                    style={{ width: "90%", top: 15, alignSelf: "center" }}>
                    <Input
                        placeholder={userData && userData.name}
                        autoCapitalize="words" autoFocus={true} ref={(ref) => { name = ref }}
                        maxLength={20} value={this.state.name} keyboardType="ascii-capable" selectionColor="#333"
                        onChangeText={(name) => this.setState({ name })} />
                    <Text style={{ right: 15, color: "#E0E0E0" }}>
                        {maxLength - this.state.name.length}
                    </Text>
                    <Icon
                        style={{ color: isAscii(this.state.name) ? '#4CAF50' : '#EF5350' }}
                        name={isAscii(this.state.name) ? 'checkmark-circle' : 'close-circle'} />
                </Item>
                <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                        <Button
                            bordered
                            onPress={() => this.props.setModalVisibleName(false)}
                            style={{
                                borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                            <Text style={{ color: "#333" }}>CANCEL</Text>
                        </Button>
                    </Col>
                    <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                        <Button
                            disabled={isLoading || this.state.name === "" ? true : false}
                            bordered
                            onPressIn={() => _isLoading(true)}
                            onPress={this.state.name ? () => this._updateNameAWS() : null}
                            style={{
                                borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                            {isLoading ? <Spinner size="small" color="#BDBDBD" /> : <Text style={{ color: isAscii(this.state.name) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>}
                        </Button>
                    </Col>
                </Grid>
            </KeyboardAvoidingView>
        )
    }
}