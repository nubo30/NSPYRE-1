import React, { Component } from "react"
import { Modal, TextInput, View, Platform, KeyboardAvoidingView } from 'react-native'
import { Container, Text } from 'native-base';
import { Grid, Row } from "react-native-easy-grid";
import Swiper from 'react-native-swiper';

// child Components
import HeaderCreateContests from "./header"

// Gradients
import { GadrientsCreateAContest } from "../../../Global/gradients/index"

export default class CreateAContest extends Component {
    state = {
        nameOfContenstInput: "",
        descriptionOfTheContestInput: "",
        howParticipateInTheContestInput: "",
        indexSwiper: 0,
        maxLengthDescriptionOfTheContest: 199,
        maxLengthHowParticipeInTheContest: 99
    }

    componentDidMount() {
        this.nameOfTheContest && this.nameOfTheContest.focus()
    }

    changeInputfocus = (indexSwiper) => {
        switch (indexSwiper) {
            case 1:
                this.descriptionInput && this.descriptionInput.focus()
                break;
            case 2:
                this.participeInput && this.participeInput.focus()
                break;
            default:
                this.nameOfTheContest && this.nameOfTheContest.focus()
        }
    }

    _createAcontest = () => {
        const { nameOfContenstInput, descriptionOfTheContestInput, howParticipateInTheContestInput } = this.state
        const dataContest = {
            nameContest: nameOfContenstInput,
            descriptionContest: descriptionOfTheContestInput,
            howParticipeContest: howParticipateInTheContestInput
        }
    }

    render() {
        const {
            indexSwiper,
            nameOfContenstInput,
            descriptionOfTheContestInput,
            maxLengthDescriptionOfTheContest,
            howParticipateInTheContestInput,
            maxLengthHowParticipeInTheContest } = this.state
        return (
            <Modal
                transparent={false}
                hardwareAccelerated={true}
                transparent={false}
                visible={this.props.modalVisible}
                animationType="slide"
                presentationStyle="fullScreen"
                onRequestClose={() => null}>
                <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                    <Container>
                        {/* Gradients BAckground */}
                        <GadrientsCreateAContest />

                        {/* Header */}
                        <HeaderCreateContests
                            indexSwiper={indexSwiper}
                            nameOfContenstInput={nameOfContenstInput}
                            setModalVisibleCreateContest={this.props.setModalVisibleCreateContest} />
                        <Swiper
                            dotColor="rgba(0,0,0,0.0)"
                            activeDotColor="rgba(0,0,0,0.0)"
                            loop={false} bounces={true}
                            index={indexSwiper}
                            scrollEnabled={false}
                            removeClippedSubviews={true}
                            showsButtons={nameOfContenstInput ? true : false}
                            onIndexChanged={(indexSwiper) => { this.setState({ indexSwiper }); this.changeInputfocus(indexSwiper) }}
                            nextButton={<Text style={{ fontSize: 18, color: "#FFF" }}>Next</Text>}
                            prevButton={<Text style={{ fontSize: 18, color: "#FFF" }}>Back</Text>}
                            buttonWrapperStyle={{
                                flexDirection: 'row', flex: 1,
                                justifyContent: 'space-between',
                                alignItems: 'flex-end', position: 'absolute',
                                paddingHorizontal: 10, paddingVertical: 10,
                                top: 0, left: 0, backgroundColor: 'transparent'
                            }}>

                            {/* Name of contest */}
                            <Grid style={{ flex: 1 }}>
                                <Row size={50} style={{ justifyContent: "center", alignItems: 'flex-end' }}>
                                    <TextInput
                                        placeholder="Name Of Contest"
                                        maxLength={30} autoCapitalize="words"
                                        autoFocus={true} ref={(ref) => { this.nameOfTheContest = ref; }} keyboardType="ascii-capable"
                                        onChangeText={(nameOfContenstInput) => this.setState({ nameOfContenstInput })}
                                        selectionColor="#fff"
                                        placeholderTextColor="#fff"
                                        style={{ fontSize: 35, width: "95%", bottom: 20, fontWeight: "100", color: "#fff" }}
                                        value={nameOfContenstInput} />
                                </Row>
                                <Row size={40}>
                                    <Text style={{ color: "#EEEEEE", left: 10 }}>Please, choose the name for your contest, this can be updated later.</Text>
                                </Row>
                                <Row size={10}>
                                    {!nameOfContenstInput
                                        ? <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'flex-end' }}>
                                            <Text style={{ fontSize: 18, color: indexSwiper !== 0 ? "#F8BBD0" : "rgba(0,0,0,0.0)", padding: 10 }}>Back</Text>
                                            <Text style={{ fontSize: 18, color: "#757575", padding: 10 }}>Next</Text>
                                        </View>
                                        : null}
                                </Row>
                            </Grid>

                            {/* Description of contest */}
                            <Grid style={{ flex: 1 }}>
                                <Row size={50} style={{ justifyContent: "center", alignItems: 'flex-end' }}>
                                    <TextInput
                                        placeholder="Brief description of the contest"
                                        maxLength={200} autoCapitalize="sentences" multiline numberOfLines={2}
                                        autoFocus={true} ref={(ref) => { this.descriptionInput = ref; }} keyboardType="ascii-capable"
                                        onChangeText={(descriptionOfTheContestInput) => this.setState({ descriptionOfTheContestInput })}
                                        value={descriptionOfTheContestInput}
                                        selectionColor="#FFF"
                                        placeholderTextColor="#FFF"
                                        style={{ fontSize: 25, width: "95%", fontWeight: "100", color: "#FFF" }} />
                                </Row>
                                <Row size={40}>
                                    <Text style={{ color: "#FFF", left: 10 }}>
                                        {`Describe concisely what the contest is about (${maxLengthDescriptionOfTheContest - descriptionOfTheContestInput.length}).`}
                                    </Text>
                                </Row>
                                <Row size={10}>
                                    {!nameOfContenstInput
                                        ? <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'flex-end' }}>
                                            <Text style={{ fontSize: 18, color: indexSwiper !== 0 ? "#F8BBD0" : "rgba(0,0,0,0.0)", padding: 10 }}>Back</Text>
                                            <Text style={{ fontSize: 18, color: "#757575", padding: 10 }}>Next</Text>
                                        </View>
                                        : null}
                                </Row>
                            </Grid>

                            {/* How participe */}
                            <Grid style={{ flex: 1 }}>
                                <Row size={50} style={{ justifyContent: "center", alignItems: 'flex-end' }}>
                                    <TextInput
                                        placeholder="Explain how to participe"
                                        maxLength={99} autoCapitalize="sentences" multiline numberOfLines={2}
                                        autoFocus={true} ref={(ref) => { this.participeInput = ref; }} keyboardType={Platform.OS === 'ios' ? "ascii-capable" : "default"}
                                        onChangeText={(howParticipateInTheContestInput) => this.setState({ howParticipateInTheContestInput })}
                                        selectionColor="#fff"
                                        placeholderTextColor="#fff"
                                        style={{ fontSize: 25, width: "95%", fontWeight: "100", color: "#fff" }}
                                        value={howParticipateInTheContestInput} />
                                </Row>
                                <Row size={40}>
                                    <Text style={{ color: "#F5F5F5", left: 10 }}>
                                        {`How can users participate in this contest? (${maxLengthHowParticipeInTheContest - howParticipateInTheContestInput.length}).`}
                                    </Text>
                                </Row>
                                <Row size={10}>
                                    {howParticipateInTheContestInput
                                        ? <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'flex-end' }}>
                                            <Text style={{ fontSize: 18, color: "rgba(0,0,0,0.0)", padding: 10 }}>Back</Text>
                                            <Text onPress={() => this._createAcontest()} style={{ fontSize: 18, color: "#FFF", padding: 10 }}>Create a Contest</Text>
                                        </View>
                                        : null}
                                </Row>
                            </Grid>
                        </Swiper>
                    </Container>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}