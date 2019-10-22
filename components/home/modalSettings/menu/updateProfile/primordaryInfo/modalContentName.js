import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { API, graphqlOperation } from "aws-amplify"
import { Icon, Item, Input, Text, Button, Left, Header, Title, Spinner, Toast, Container, Right, Content } from 'native-base'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Max lenght of the form
const maxLength = 20

// GraphQL
import * as mutations from '../../../../../../src/graphql/mutations'

// this function show the content of modals
export default class UpdateName extends Component {
    state = { name: "" }

    _updateNameAWS = async () => {
        const { userData, _isLoading, setModalVisibleName } = this.props
        const input = { name: this.state.name, id: userData.id }
        _isLoading(true)
        try {
            await API.graphql(graphqlOperation(mutations.updateUser, { input }))
            _isLoading(false)
            setModalVisibleName(false)
        } catch (error) {
            _isLoading(false)
            Toast.show({ text: "Oops! Something went wrong, please try again.", buttonText: "Okay", type: "danger", duration: 3000, position: 'top' })
        }
    }

    render() {
        const { name } = this.state
        const { userData, isLoading, setModalVisibleName } = this.props
        return (
            <Container>
                <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", elevation: 0 }}>
                    <Left>
                        <Title
                            allowFontScaling={false}
                            minimumFontScale={wp(6)}
                            style={{ color: "#D81B60", fontSize: wp(6) }}>Edit your name</Title>
                    </Left>
                    <Right>
                        <Button
                            onPress={() => name ? this._updateNameAWS() : setModalVisibleName(false)}
                            disabled={isLoading}
                            small transparent style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {isLoading ? <Spinner size="small" color="#3333" style={{ right: 5 }} /> : <Text
                                allowFontScaling={false}
                                style={{ fontSize: wp(4), color: name ? '#D81B60' : '#3333', letterSpacing: 1 }}>{name ? "Done" : "Cancel"}</Text>}
                        </Button>
                    </Right>
                </Header>
                <Content scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
                    <Item
                        error={name ? false : true}
                        success={name ? true : false}
                        style={{ width: "90%", alignSelf: "center" }}>
                        <Input
                            onSubmitEditing={() => name ? this._updateNameAWS() : Keyboard.dismiss()}
                            returnKeyType='done'
                            autoFocus={true}
                            allowFontScaling={false}
                            minimumFontScale={wp(4)}
                            placeholder={userData && userData.name}
                            maxLength={20}
                            value={name}
                            keyboardType="ascii-capable"
                            selectionColor="#D81B60"
                            onChangeText={(name) => this.setState({ name })} />
                        <Text
                            allowFontScaling={false}
                            minimumFontScale={wp(4)}
                            style={{ right: 15, color: "#E0E0E0", fontSize: wp(4) }}>
                            {maxLength - name.length}
                        </Text>
                        <Icon
                            style={{ color: name ? '#4CAF50' : '#EF5350' }}
                            name={name ? 'checkmark-circle' : 'close-circle'} />
                    </Item>
                </Content>
            </Container>
        )
    }
}