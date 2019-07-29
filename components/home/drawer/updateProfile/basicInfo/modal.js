import React from 'react'
import { Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { isEmail, isMobilePhone, isAscii } from 'validator';
import { Grid, Col } from 'react-native-easy-grid'
import { Icon, Item, Input, Text, Button, Left, Right, Header, Title, Body } from 'native-base'

// Max lenght of the form
const maxLength = 20

// this function show the content of modals
export default function ModalsContent(props) {
    switch (props.typeModal) {
        case 'email':
            return (
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={props.modalVisibleName}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", elevation: 0 }}>
                            <Left />
                            <Body>
                                <Title style={{ color: "#333", fontSize: 22, right: 40 }}>{props.headerTitle}</Title>
                            </Body>
                            <Right />
                        </Header>
                        <Item
                            error={isEmail(props.dataToChange) ? false : true}
                            success={isEmail(props.dataToChange) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                autoCapitalize="words" autoFocus={true} ref={(ref) => { email = ref }}
                                maxLength={30} value={props.dataToChange} selectionColor="#333" keyboardType="email-address"
                                onChangeText={(text) => props.dataWillChange(text)} />
                            <Text style={{ right: 15, color: "#E0E0E0" }}>
                                {(maxLength + 10) - props.dataToChange.length}
                            </Text>
                            <Icon
                                style={{ color: isEmail(props.dataToChange) ? '#4CAF50' : '#EF5350' }}
                                name={isEmail(props.dataToChange) ? 'checkmark-circle' : 'close-circle'} />
                        </Item>
                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => props.setModalVisibleName(false)}
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
                                    onPress={props.dataToChange ? () => props.setModalVisibleName(false) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isEmail(props.dataToChange) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>
            )
        case 'numberPhone':
            return (
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={props.modalVisibleName}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", elevation: 0 }}>
                            <Left />
                            <Body>
                                <Title style={{ color: "#333", fontSize: 22, right: 40 }}>{props.headerTitle}</Title>
                            </Body>
                            <Right />
                        </Header>
                        <Item
                            error={isMobilePhone(props.dataToChange) ? false : true}
                            success={isMobilePhone(props.dataToChange) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                autoCapitalize="words" autoFocus={true} ref={(ref) => { email = ref }}
                                maxLength={17} value={props.dataToChange} selectionColor="#333" keyboardType="number-pad"
                                onChangeText={(text) => props.dataWillChange(text)} />
                            <Text style={{ right: 15, color: "#E0E0E0" }}>
                                {(maxLength - 3) - props.dataToChange.length}
                            </Text>
                            <Icon
                                style={{ color: isMobilePhone(props.dataToChange) ? '#4CAF50' : '#EF5350' }}
                                name={isMobilePhone(props.dataToChange) ? 'checkmark-circle' : 'close-circle'} />
                        </Item>
                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => props.setModalVisibleName(false)}
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
                                    onPress={props.dataToChange ? () => props.setModalVisibleName(false) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isMobilePhone(props.dataToChange) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>
            )
        case 'school':
            return (
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={props.modalVisibleName}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", elevation: 0 }}>
                            <Left />
                            <Body>
                                <Title style={{ color: "#333", fontSize: 22, right: 40 }}>{props.headerTitle}</Title>
                            </Body>
                            <Right />
                        </Header>
                        <Item
                            error={isAscii(props.dataToChange) ? false : true}
                            success={isAscii(props.dataToChange) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                autoCapitalize="words" autoFocus={true} ref={(ref) => { email = ref }}
                                maxLength={30} value={props.dataToChange} selectionColor="#333" keyboardType="ascii-capable"
                                onChangeText={(text) => props.dataWillChange(text)} />
                            <Text style={{ right: 15, color: "#E0E0E0" }}>
                                {(maxLength + 10) - props.dataToChange.length}
                            </Text>
                            <Icon
                                style={{ color: isAscii(props.dataToChange) ? '#4CAF50' : '#EF5350' }}
                                name={isAscii(props.dataToChange) ? 'checkmark-circle' : 'close-circle'} />
                        </Item>
                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => props.setModalVisibleName(false)}
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
                                    onPress={props.dataToChange ? () => props.setModalVisibleName(false) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(props.dataToChange) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>
            )
        case 'university':
            return (
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={props.modalVisibleName}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", elevation: 0 }}>
                            <Left />
                            <Body>
                                <Title style={{ color: "#333", fontSize: 22, right: 40 }}>{props.headerTitle}</Title>
                            </Body>
                            <Right />
                        </Header>
                        <Item
                            error={isAscii(props.dataToChange) ? false : true}
                            success={isAscii(props.dataToChange) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                autoCapitalize="words" autoFocus={true} ref={(ref) => { email = ref }}
                                maxLength={30} value={props.dataToChange} selectionColor="#333" keyboardType="ascii-capable"
                                onChangeText={(text) => props.dataWillChange(text)} />
                            <Text style={{ right: 15, color: "#E0E0E0" }}>
                                {(maxLength + 10) - props.dataToChange.length}
                            </Text>
                            <Icon
                                style={{ color: isAscii(props.dataToChange) ? '#4CAF50' : '#EF5350' }}
                                name={isAscii(props.dataToChange) ? 'checkmark-circle' : 'close-circle'} />
                        </Item>
                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => props.setModalVisibleName(false)}
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
                                    onPress={props.dataToChange ? () => props.setModalVisibleName(false) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(props.dataToChange) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>
            )
        case 'otherStudies':
            return (
                <Modal
                    transparent={false}
                    hardwareAccelerated={true}
                    transparent={false}
                    visible={props.modalVisibleName}
                    animationType="fade"
                    presentationStyle="fullScreen"
                    onRequestClose={() => null}>
                    <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)", elevation: 0 }}>
                            <Left />
                            <Body>
                                <Title style={{ color: "#333", fontSize: 22, right: 40 }}>{props.headerTitle}</Title>
                            </Body>
                            <Right />
                        </Header>
                        <Item
                            error={isAscii(props.dataToChange) ? false : true}
                            success={isAscii(props.dataToChange) ? true : false}
                            style={{ width: "90%", top: 15, alignSelf: "center" }}>
                            <Input
                                autoCapitalize="words" autoFocus={true} ref={(ref) => { email = ref }}
                                maxLength={30} value={props.dataToChange} selectionColor="#333" keyboardType="ascii-capable"
                                onChangeText={(text) => props.dataWillChange(text)} />
                            <Text style={{ right: 15, color: "#E0E0E0" }}>
                                {(maxLength + 10) - props.dataToChange.length}
                            </Text>
                            <Icon
                                style={{ color: isAscii(props.dataToChange) ? '#4CAF50' : '#EF5350' }}
                                name={isAscii(props.dataToChange) ? 'checkmark-circle' : 'close-circle'} />
                        </Item>
                        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                <Button
                                    bordered
                                    onPress={() => props.setModalVisibleName(false)}
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
                                    onPress={props.dataToChange ? () => props.setModalVisibleName(false) : null}
                                    style={{
                                        borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: isAscii(props.dataToChange) ? "#333" : "#E0E0E0" }}>ACCEPT</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </KeyboardAvoidingView>
                </Modal>
            )
        default:
            return null
    }
}    