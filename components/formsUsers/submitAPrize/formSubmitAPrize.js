import React, { Component } from 'react'
import { Text, View, Platform, Modal, Image } from 'react-native'
import { ImagePicker, Permissions } from 'expo';
import { connect } from 'react-redux'
import { Storage } from 'aws-amplify'
import PhoneInput from 'react-native-phone-input'
import { Grid, Row } from 'react-native-easy-grid'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Placeholder from 'rn-placeholder'
import _ from "lodash"
import {
    List,
    ListItem,
    Input,
    Left,
    Right,
    Picker,
    Icon,
    Button,
    Header,
    Spinner,
    Body
} from "native-base"

// redux
import { submitAPrizeFormData } from "../../../store/actions/projectsActions"

// Style
import { colors } from '../../Global/static/colors'
import { fontSize } from '../../Global/static/fontSize'

// Icons
import { Ionicons } from '@expo/vector-icons'

class SubmitAPrize extends Component {
    state = {
        name: "",
        phone: "+1",
        shortDescriptionOfThePrize: "",
        companyName: "",
        nameOfPrize: "",
        specialInstructions: "",
        titleInTheCompany: "",
        image: "",
        nameOfImagen: "",
        companyNamePrize: "",
        businessStreet: "",
        businessCity: "",
        businessAddressState: "",
        businessCountry: "",
        businessPostalCode: "",
        businessFacebook: "",
        businessInstagram: "",
        businessTwitter: "",
        businessSnapchat: "",
        prizeFacebook: "",
        prizeInstagram: "",
        prizeTwitter: "",
        prizeSnapchat: "",


        // Listas
        prizes: [],

        // Picker
        typeOfPrize: "NO_SELECT",
        price: "NO_SELECT",
        category: "NO_SELECT",

        // Actions
        phoneErr: null,
        colorElementsImagePrizes: false,
        loading: false,
        isLoadingUploadImagenToAWS: false,

        // Modal
        modalVisibleBusinessAddress: false,
        modalVisibleBusinessSocialNetwork: false,
        modalVisibleAddPrizes: false,
        modalVisiblePrizeReview: false,
        modalVisiblePrizeSocialNetwork: false,
        modalVisibleSpecialInstructions: false,
        modalVisibleAddPicture: false,

        // Objetcs
        businessAddress: {},
        businessSocialMedia: {},
        prizeSocialMedia: {},

        // Validador
        isPhoneValid: null,
        isBusinessAddressValid: null,
        isCompanyNameValid: null,
        isComapnySocialMeHandles: null,
        isCategoryValid: null,
        isNameOfThePrizeValid: null,
        isShortDescriptionOfThePrizeValid: null,
        isSocialMediaHandlesPrizeValid: null,
        isCompanyNamePrizeValid: null,
        isSpecialInstructionsValid: null
    }

    componentWillUpdate(none, prevState) { this.props.submitAPrizeFormData(prevState) }

    componentWillReceiveProps(nextProps) {
        if (nextProps.openModalSummary !== this.props.openModalSummary) { this._isValidForm() }
        if (nextProps.clearForm !== this.props.clearForm) { this._clearForm() }
    }

    // Limpiar formulario
    _clearForm = () => {
        this.setState({
            name: "",
            phone: "+1",
            shortDescriptionOfThePrize: "",
            companyName: "",
            nameOfPrize: "",
            specialInstructions: "",
            titleInTheCompany: "",
            image: "",
            nameOfImagen: "",
            companyNamePrize: "",
            businessStreet: "",
            businessCity: "",
            businessAddressState: "",
            businessCountry: "",
            businessPostalCode: "",
            businessFacebook: "",
            businessInstagram: "",
            businessTwitter: "",
            businessSnapchat: "",
            prizeFacebook: "",
            prizeInstagram: "",
            prizeTwitter: "",
            prizeSnapchat: "",


            // Listas
            prizes: [],

            // Picker
            typeOfPrize: "NO_SELECT",
            price: "NO_SELECT",
            category: "NO_SELECT",

            // Actions
            phoneErr: null,
            colorElementsImagePrizes: false,
            loading: false,
            isLoadingUploadImagenToAWS: false,

            // Modal
            modalVisibleBusinessAddress: false,
            modalVisibleBusinessSocialNetwork: false,
            modalVisibleAddPrizes: false,
            modalVisiblePrizeReview: false,
            modalVisiblePrizeSocialNetwork: false,
            modalVisibleSpecialInstructions: false,
            modalVisibleAddPicture: false,

            // Objetcs
            businessAddress: {},
            businessSocialMedia: {},
            prizeSocialMedia: {},

            // Validador
            isPhoneValid: null,
            isBusinessAddressValid: null,
            isCompanyNameValid: null,
            isComapnySocialMeHandles: null,
            isCategoryValid: null,
            isNameOfThePrizeValid: null,
            isShortDescriptionOfThePrizeValid: null,
            isSocialMediaHandlesPrizeValid: null,
            isCompanyNamePrizeValid: null,
            isSpecialInstructionsValid: null
        })
    }

    _isValidForm = () => {
        const { _scrollView, _dataform } = this.props
        const {
            isBusinessAddressValid,
            isCompanyNameValid,
            isComapnySocialMeHandles,
            isCategoryValid,
            isNameOfThePrizeValid,
            isShortDescriptionOfThePrizeValid,
            isSocialMediaHandlesPrizeValid,
            isCompanyNamePrizeValid,
            isSpecialInstructionsValid
        } = this.state
        this.setState({
            isPhoneValid: this.phone.isValidNumber(),
            isBusinessAddressValid: this.state.businessStreet && this.state.businessCity && this.state.businessCountry && this.state.businessPostalCode ? true : false,
            isCompanyNameValid: this.state.companyName ? true : false,
            isComapnySocialMeHandles: this.state.businessFacebook && this.state.businessTwitter && this.state.businessSnapchat && this.state.businessInstagram ? true : false,
            isCategoryValid: this.state.category !== 'NO_SELECT' ? true : false,
            isNameOfThePrizeValid: this.state.nameOfPrize ? true : false,
            isShortDescriptionOfThePrizeValid: this.state.shortDescriptionOfThePrize ? true : false,
            isSocialMediaHandlesPrizeValid: this.state.prizeFacebook && this.state.prizeSnapchat && this.state.prizeInstagram && this.state.prizeTwitter ? true : false,
            isCompanyNamePrizeValid: this.state.companyNamePrize ? true : false,
            isSpecialInstructionsValid: this.state.specialInstructions ? true : false
        })
        this.phone.isValidNumber()
            ? isBusinessAddressValid
                ? isCompanyNameValid
                    ? isComapnySocialMeHandles
                        ? isCategoryValid
                            ? isNameOfThePrizeValid
                                ? isShortDescriptionOfThePrizeValid
                                    ? isSocialMediaHandlesPrizeValid
                                        ? isSpecialInstructionsValid
                                            ? isCompanyNamePrizeValid
                                                ? _dataform()
                                                : _scrollView(370)
                                            : _scrollView(370)
                                        : _scrollView(370)
                                    : _scrollView(370)
                                : _scrollView(370)
                            : _scrollView(370)
                        : _scrollView(300)
                    : _scrollView(250)
                : _scrollView(210)
            : _scrollView(165);

    }

    // Picker 'Category'
    onValueChangeCategory = (value: string) => { this.setState({ category: value, isCategoryValid: true }) }

    // Price
    onValueChangePrice = (value: string) => { this.setState({ price: value }) }

    // Number Phone
    handlePhone = () => {
        this.setState({ phone: this.phone.getValue(), isPhoneValid: true })
    }

    // Picker Choose prizes
    onValueChangePrizes = (value: string) => { this.setState({ typeOfPrize: value }) }

    // permission to access the user's phone library
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    useLibraryHandler = async () => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] })
        if (!result.cancelled) {
            this.setState({ image: result.uri })
        }
    }

    storeFileInS3 = async (fileUri, access = "public") => {
        const { userData } = this.props
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () { resolve(xhr.response) };
            xhr.onerror = function () { reject(new TypeError("Network request failed")) };
            xhr.responseType = "blob";
            xhr.open("GET", fileUri, true);
            xhr.send(null);
        });
        const { name, type } = blob._data;
        const options = { contentType: type };
        try {
            await Storage.put(`users/${userData.data.getUser.email}/prizes/${name}`, blob, options);
            this.setState({
                modalVisibleAddPicture: false,
                nameOfImagen: name,
                picture: `https://s3.amazonaws.com/influencemenow-statics-files-env/${access}/users/${userData.data.getUser.email}/prizes/${name}`
            })
        } catch (err) {
            console.log(err)
        } finally {
            this.setState({ isLoadingUploadImagenToAWS: false })
        }
    };

    render() {
        const { userData, prizesList, _openModalSummary, erasePrizesList } = this.props
        const { isPhoneValid, isCompanyNameValid,
            isCategoryValid, isComapnySocialMeHandles, isNameOfThePrizeValid,
            isShortDescriptionOfThePrizeValid, isSocialMediaHandlesPrizeValid, isSpecialInstructionsValid,
            isCompanyNamePrizeValid, isBusinessAddressValid } = this.state
        return (
            <List style={{ width: "100%", backgroundColor: colors.fontPrimary }}>
                <ListItem itemDivider style={{ maxHeight: 40 }}>
                    <Left>
                        <Text style={{ color: colors.fontSecondary, fontSize: fontSize.subHeader }}>ABOUT OF YOU</Text>
                    </Left>
                    <Body style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button transparent iconRight onPress={() => _openModalSummary(true)}>
                            <Text style={{ color: colors.fontSecondary, fontSize: 12, color: prizesList.length ? '#00C853' : colors.fontSecondary, right: 5 }}>{`${erasePrizesList ? prizesList.length : prizesList.length} SUMMARY`}</Text>
                            <Ionicons name="ios-eye" style={{ color: prizesList.length ? '#00C853' : colors.fontSecondary, fontSize: 25 }} />
                        </Button>
                    </Body>
                </ListItem>

                {/* Email of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left>
                        <Text style={{ fontWeight: "700", color: colors.fontTitle, fontSize: 17 }}>Email:  </Text>
                        <Placeholder.Media
                            animate="fade"
                            style={{ width: wp(55), height: wp(4.5) }}
                            onReady={this.props.isReady}>
                            <Text style={{ fontWeight: "100", fontSize: wp(4.5) }}>{userData && _.upperFirst(userData.data.getUser.email)}</Text>
                        </Placeholder.Media>
                    </Left>
                </ListItem>

                {/* name of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left>
                        <Text style={{ fontWeight: "700", color: colors.fontTitle, fontSize: 17 }}>Name:  </Text>
                        <Placeholder.Media
                            animate="fade"
                            style={{ width: wp(38), height: wp(4.5) }}
                            onReady={this.props.isReady}>
                            <Text style={{ fontWeight: "100", fontSize: wp(4.5) }}>{userData && _.startCase(userData.data.getUser.name)}</Text>
                        </Placeholder.Media>
                    </Left>
                </ListItem>

                {/* name of the users */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left>
                        <Text style={{ fontWeight: "700", color: colors.fontTitle, fontSize: 17 }}>Username:  </Text>
                        <Placeholder.Media
                            animate="fade"
                            style={{ width: wp(38), height: wp(4.5) }}
                            onReady={this.props.isReady}>
                            <Text style={{ fontWeight: "100", fontSize: wp(4.5) }}>{userData && userData.data.getUser.username}</Text>
                        </Placeholder.Media>
                    </Left>
                </ListItem>

                {/* Phone of the user */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            color: isPhoneValid === null ? null : isPhoneValid ? colors.fontTitle : colors.textError,
                            fontWeight: "700"
                        }}>Phone: </Text>
                        <PhoneInput
                            ref={ref => { this.phone = ref }}
                            textStyle={{
                                fontSize: 17,
                                fontWeight: '100',
                                color: this.state.phone === "+1" ? colors.fontPlaceholder : isPhoneValid ? colors.fontTitle : colors.textError
                            }}
                            style={{ width: "80%" }}
                            initialCountry='us' cancelText='CANCEL' confirmText='CONFIRM'
                            onChangePhoneNumber={this.handlePhone}
                            value={this.state.phone}
                        />
                    </Left>
                    <Right />
                </ListItem>

                {/* Business Address */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.setState({ modalVisibleBusinessAddress: true })}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: isBusinessAddressValid === null ? null : isBusinessAddressValid ? colors.fontTitle : colors.textError,
                        }}>Business Address: </Text>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "100",
                            color: isBusinessAddressValid === null ? colors.fontPlaceholder : isBusinessAddressValid ? colors.fontTitle : colors.textError
                        }}> Street, City, State, Country, Po...</Text>
                    </Left>
                    <Right />
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisibleBusinessAddress}>
                        <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => {
                                    this.setState({
                                        isBusinessAddressValid: false,
                                        modalVisibleBusinessAddress: false,
                                        businessAddress: {},
                                        businessStreet: "",
                                        businessCity: "",
                                        businessAddressState: "",
                                        businessCountry: "",
                                        businessPostalCode: ""
                                    })
                                }}>
                                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                    <Text style={{ left: 5, color: "#D81B60" }}>CANCEL</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent
                                    disabled={
                                        this.state.businessStreet
                                            && this.state.businessCity
                                            && this.state.businessAddressState
                                            && this.state.businessCountry
                                            && this.state.businessPostalCode
                                            ? false : true}
                                    onPress={() => {
                                        this.setState({
                                            isBusinessAddressValid: true,
                                            modalVisibleBusinessAddress: false,
                                            businessAddress: {
                                                businessStreet: this.state.businessStreet,
                                                businessCity: this.state.businessCity,
                                                businessAddressState: this.state.businessAddressState,
                                                businessCountry: this.state.businessCountry,
                                                businessPostalCode: this.state.businessPostalCode,
                                            }
                                        })
                                    }}>
                                    <Text style={{
                                        fontSize: wp(5),
                                        color: this.state.businessStreet
                                            && this.state.businessCity
                                            && this.state.businessAddressState
                                            && this.state.businessCountry
                                            && this.state.businessPostalCode
                                            ? colors.elementPrimary : colors.fontPlaceholder
                                    }}>OK</Text>
                                </Button>
                            </Right>
                        </Header>

                        {/* Street */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>Street: </Text>
                                <Input
                                    placeholder="Quisqueya nueva, calle 31" autoFocus={true}
                                    keyboardType="ascii-capable" maxLength={60}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.businessStreet}
                                    onChangeText={(businessStreet) => this.setState({ businessStreet })}
                                />
                            </Left>
                        </ListItem>

                        {/* City */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>City: </Text>
                                <Input
                                    placeholder="La Romana"
                                    keyboardType="ascii-capable" maxLength={60}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.businessCity} onChangeText={(businessCity) => this.setState({ businessCity })} />
                            </Left>
                        </ListItem>

                        {/* State */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>State: </Text>
                                <Input
                                    placeholder="La Romana"
                                    keyboardType="ascii-capable" maxLength={60}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.businessAddressState} onChangeText={(businessAddressState) => this.setState({ businessAddressState })} />
                            </Left>
                        </ListItem>

                        {/* Country */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>Country: </Text>
                                <Input
                                    placeholder="República Dominicana"
                                    keyboardType="ascii-capable" maxLength={60}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.businessCountry} onChangeText={(businessCountry) => this.setState({ businessCountry })} />
                            </Left>
                        </ListItem>

                        {/* Postal Code */}
                        <ListItem style={{ maxHeight: 45 }}>
                            <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 17,
                                    color: colors.fontTitle,
                                    fontWeight: "700"
                                }}>Postal Code: </Text>
                                <Input
                                    placeholder="07985"
                                    keyboardType="numeric" maxLength={5}
                                    placeholderTextColor={colors.fontPlaceholder}
                                    style={{ fontWeight: "100" }}
                                    value={this.state.businessPostalCode} onChangeText={(businessPostalCode) => this.setState({ businessPostalCode })} />
                            </Left>
                            <Right />
                        </ListItem>

                        <Text style={{ fontStyle: 'italic', alignSelf: 'center', top: 10, color: colors.fontPlaceholder, textDecorationLine: 'underline' }}>We need it for our files</Text>

                    </Modal>
                </ListItem>

                {/* Company Name */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: isCompanyNameValid === null ? null : isCompanyNameValid ? colors.fontTitle : colors.textError,
                        }}>Company Name: </Text>
                        <Input
                            style={{ fontWeight: '100', fontSize: 17 }}
                            placeholder="Example Inc."
                            keyboardType="ascii-capable" maxLength={30}
                            placeholderTextColor={isCompanyNameValid === null ? null : isCompanyNameValid ? colors.fontPlaceholder : colors.textError}
                            value={this.state.companyName} onChangeText={(companyName) => this.setState({ companyName, isCompanyNameValid: true })} />
                    </Left>
                    <Right />
                </ListItem>

                {/* Company Social Medias */}
                <ListItem last style={{ maxHeight: 45 }} onPress={() => this.setState({ modalVisibleBusinessSocialNetwork: true })}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: isComapnySocialMeHandles === null ? null : isComapnySocialMeHandles ? colors.fontTitle : colors.textError
                        }}>Comapany Social media handles: </Text>
                        <Text style={{ color: isComapnySocialMeHandles === null ? colors.fontPlaceholder : isComapnySocialMeHandles ? colors.fontTitle : colors.textError, fontSize: 17, fontWeight: "100" }}> Facebook,</Text>
                        <Text style={{ color: isComapnySocialMeHandles === null ? colors.fontPlaceholder : isComapnySocialMeHandles ? colors.fontTitle : colors.textError, fontSize: 17, fontWeight: "100" }}> Ins...</Text>
                    </Left>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisibleBusinessSocialNetwork}>
                        <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => {
                                    this.setState({
                                        isComapnySocialMeHandles: false,
                                        modalVisibleBusinessSocialNetwork: false,
                                        businessFacebook: "",
                                        businessTwitter: "",
                                        businessSnapchat: "",
                                        businessInstagram: ""
                                    })
                                }}>
                                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                    <Text style={{ left: 5, color: "#D81B60" }}>CANCEL</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button
                                    transparent
                                    onPress={() => {
                                        this.setState({
                                            isComapnySocialMeHandles: true,
                                            businessSocialMedia: {
                                                businessFacebook: this.state.businessFacebook,
                                                businessTwitter: this.state.businessTwitter,
                                                businessSnapchat: this.state.businessSnapchat,
                                                businessInstagram: this.state.businessInstagram,
                                            },
                                            modalVisibleBusinessSocialNetwork: false
                                        })
                                    }}>
                                    <Text style={{
                                        fontSize: wp(5),
                                        color: this.state.businessFacebook
                                            && this.state.businessTwitter
                                            && this.state.businessSnapchat
                                            && this.state.businessInstagram
                                            ? colors.elementPrimary : colors.fontPlaceholder
                                    }}>OK</Text>
                                </Button>
                            </Right>
                        </Header>
                        <List style={{ width: "100%", backgroundColor: colors.fontPrimary }}>

                            {/* Facebook */}
                            <ListItem style={{ maxHeight: 50 }}>
                                <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-facebook" style={{
                                        fontSize: fontSize.iconsPrimary,
                                        color: colors.iconsPrimary
                                    }} />
                                    <Input
                                        placeholder="Enter company facebook" autoFocus={true}
                                        keyboardType="ascii-capable" maxLength={30}
                                        placeholderTextColor={colors.fontPlaceholder} style={{ left: 5 }}
                                        value={this.state.businessFacebook} onChangeText={(businessFacebook) => this.setState({ businessFacebook })} />
                                </Left>
                            </ListItem>

                            {/* Instagram */}
                            <ListItem style={{ maxHeight: 50 }}>
                                <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-instagram" style={{
                                        fontSize: fontSize.iconsPrimary,
                                        color: colors.iconsPrimary
                                    }} />
                                    <Input
                                        placeholder="Enter company instagram"
                                        keyboardType="ascii-capable" maxLength={30}
                                        placeholderTextColor={colors.fontPlaceholder} style={{ left: 5 }}
                                        value={this.state.businessInstagram} onChangeText={(businessInstagram) => this.setState({ businessInstagram })} />
                                </Left>
                            </ListItem>

                            {/* Twitter */}
                            <ListItem style={{ maxHeight: 50 }}>
                                <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-twitter" style={{
                                        fontSize: fontSize.iconsPrimary,
                                        color: colors.iconsPrimary
                                    }} />
                                    <Input
                                        placeholder="Enter company Twitter"
                                        keyboardType="ascii-capable" maxLength={30}
                                        placeholderTextColor={colors.fontPlaceholder} style={{ left: 5 }}
                                        value={this.state.businessTwitter} onChangeText={(businessTwitter) => this.setState({ businessTwitter })} />
                                </Left>
                            </ListItem>

                            {/* SnapChap */}
                            <ListItem style={{ maxHeight: 50 }}>
                                <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-snapchat" style={{
                                        fontSize: fontSize.iconsPrimary,
                                        color: colors.iconsPrimary
                                    }} />
                                    <Input
                                        placeholder="Enter company SnapChat"
                                        keyboardType="ascii-capable" maxLength={30}
                                        placeholderTextColor={colors.fontPlaceholder} style={{ left: 5 }}
                                        value={this.state.businessSnapchat} onChangeText={(businessSnapchat) => this.setState({ businessSnapchat })} />
                                </Left>
                            </ListItem>
                        </List>
                    </Modal>
                </ListItem>

                <ListItem itemDivider>
                    <Text style={{ color: colors.fontSecondary, fontSize: fontSize.subHeader }}>ABOUT YOUR PRIZE</Text>
                </ListItem>

                {/* Category */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{
                            color: isCategoryValid === null ? null : isCategoryValid ? colors.fontTitle : colors.textError,
                            fontWeight: "700", fontSize: 17
                        }}>Category: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={isCategoryValid === null
                                ? { right: 10, fontWeight: "100", fontSize: 17, color: this.state.category === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }
                                : { right: 10, fontWeight: "100", fontSize: 17, color: this.state.category === 'NO_SELECT' ? colors.textError : colors.fontTitle }}
                            selectedValue={this.state.category}
                            onValueChange={this.onValueChangeCategory}>
                            <Picker.Item label="Apparel Clothing" value="APPAREL_CLOTHING" />
                            <Picker.Item label="Trips" value="TRIPS" />
                            <Picker.Item label="Cryptocurrency" value="CRYPTOCURRENCY" />
                            <Picker.Item label="Shoes" value="SHOES" />
                            <Picker.Item label="Electronics" value="ELECTRONICS" />
                            <Picker.Item label="Gaming" value="GAMING" />
                            <Picker.Item label="Tickets" value="TICKETS" />
                            <Picker.Item label="Amazon Products" value="AMAZON_PRODUCTS" />
                            <Picker.Item label="Cars" value="CARS" />
                            <Picker.Item label="Miles" value="MILES" />
                            <Picker.Item label="Coupon Codes" value="COUPON_CODES" />
                            <Picker.Item label="Hats" value="HATS" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                </ListItem>

                {/* NAME Of The PRIZE */}
                <ListItem last style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: isNameOfThePrizeValid === null ? null : isNameOfThePrizeValid ? colors.fontTitle : colors.textError,
                        }}>Title: </Text>
                        <Input
                            placeholder="The best language of programming"
                            keyboardType="ascii-capable" maxLength={30}
                            placeholderTextColor={isNameOfThePrizeValid === null ? null : isNameOfThePrizeValid ? colors.fontTitle : colors.textError}
                            style={{
                                height: 40,
                                fontWeight: "100",
                                color: colors.fontTitle
                            }}
                            value={this.state.nameOfPrize}
                            onChangeText={(nameOfPrize) => this.setState({ nameOfPrize, isNameOfThePrizeValid: true })} />
                    </Left>
                    <Right />
                </ListItem>

                {/* Name Company */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: isCompanyNamePrizeValid === null ? null : isCompanyNamePrizeValid ? colors.fontTitle : colors.textError,
                        }}>Company Name: </Text>
                        <Input
                            style={{ fontWeight: '100', fontSize: 17 }}
                            placeholder="Example Inc."
                            keyboardType="ascii-capable" maxLength={30}
                            placeholderTextColor={isCompanyNamePrizeValid === null ? null : isCompanyNamePrizeValid ? colors.fontTitle : colors.textError}
                            value={this.state.companyNamePrize} onChangeText={(companyNamePrize) => this.setState({ companyNamePrize, isCompanyNamePrizeValid: true })} />
                    </Left>
                    <Right />
                </ListItem>

                {/* SHORT DESCRIPTION */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.setState({ modalVisiblePrizeReview: true })}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: isShortDescriptionOfThePrizeValid === null ? null : isShortDescriptionOfThePrizeValid ? colors.fontTitle : colors.textError
                        }}>Short Description: </Text>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "100",
                            color: isShortDescriptionOfThePrizeValid === null ? colors.fontPlaceholder : isShortDescriptionOfThePrizeValid ? colors.fontTitle : colors.textError
                        }}>{this.state.shortDescriptionOfThePrize !== "" ? `  ${_.truncate(this.state.shortDescriptionOfThePrize, { length: 22, omission: "..." })}` : '  this prize is about..'}</Text>
                    </Left>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisiblePrizeReview}>
                        <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => { this.setState({ modalVisiblePrizeReview: false, shortDescriptionOfThePrize: "", isShortDescriptionOfThePrizeValid: false }) }}>
                                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                    <Text style={{ left: 5, color: "#D81B60" }}>CANCEL</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent
                                    disabled={this.state.shortDescriptionOfThePrize ? false : true}
                                    onPress={() => { this.setState({ modalVisiblePrizeReview: false, isShortDescriptionOfThePrizeValid: true }) }}>
                                    <Text style={{
                                        fontSize: wp(5),
                                        color: this.state.shortDescriptionOfThePrize ? colors.elementPrimary : colors.fontPlaceholder
                                    }}>OK</Text>
                                </Button>
                            </Right>
                        </Header>

                        {/* Contest Review */}
                        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                            <Text style={{
                                fontSize: 17,
                                color: colors.fontTitle,
                                fontWeight: "700",
                                top: 5
                            }}>Short description: </Text>
                            <Input
                                placeholder="This prize is about..."
                                keyboardType="ascii-capable" maxLength={160}
                                placeholderTextColor={colors.fontPlaceholder} multiline
                                style={{ fontWeight: "100", height: hp(25) }} numberOfLines={5}
                                value={this.state.shortDescriptionOfThePrize} autoFocus={true}
                                onChangeText={(shortDescriptionOfThePrize) => this.setState({ shortDescriptionOfThePrize })} />
                        </View>
                    </Modal>
                </ListItem>

                {/* Picture */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.setState({ modalVisibleAddPicture: true })}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, fontWeight: "700" }}>Picture: </Text>
                        <Text style={{ fontSize: 17, fontWeight: "100", color: this.state.nameOfImagen ? "#333" : colors.fontPlaceholder }}>
                            {this.state.nameOfImagen
                                ? _.truncate(this.state.nameOfImagen, { length: 30, omission: "....jpg" })
                                : "imagen_example.jpg"
                            } </Text>
                    </Left>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisibleAddPicture}>
                        <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => { this.setState({ modalVisibleAddPicture: false }) }}>
                                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                    <Text style={{ left: 5, color: "#D81B60" }}>CANCEL</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button
                                    disabled={this.state.image ? false : true}
                                    transparent
                                    onPress={() => { this.setState({ isLoadingUploadImagenToAWS: true }); this.storeFileInS3(this.state.image) }}>
                                    {this.state.isLoadingUploadImagenToAWS ? <Spinner size="small" color="#D81B60" />
                                        : <Text style={{
                                            color: this.state.image ? colors.elementPrimary : colors.fontPlaceholder,
                                            fontSize: wp(5)
                                        }}>OK</Text>}
                                </Button>
                            </Right>
                        </Header>
                        <Grid>
                            <Row size={70} style={{ flexDirection: 'column' }}>
                                <Image
                                    style={{ width: "100%", height: "90%" }}
                                    source={{ uri: this.state.image ? this.state.image : "https://images.unsplash.com/photo-1485336044006-82cc74be5156?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" }}
                                />
                                <Text style={{ fontSize: wp(4), textAlign: 'center', color: colors.fontPlaceholder, top: 5, fontStyle: 'italic' }}>
                                    This is a default image, it will not be shown at the moment you decide to create your prize, please select an image to change it!
                                </Text>
                            </Row>
                            <Row size={30} style={{ flexDirection: 'column' }}>
                                <Button
                                    onPress={() => this.useLibraryHandler()}
                                    transparent
                                    style={{
                                        top: 10,
                                        backgroundColor: colors.elementPrimary,
                                        borderRadius: 10, width: "80%", alignSelf: 'center', justifyContent: 'center'
                                    }}>
                                    <Text style={{ fontSize: wp(4.5), color: "#fff" }}>{this.state.image ? "Upload Another" : "Upload Imagen"}</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </Modal>
                </ListItem>

                {/* PRICE */}
                <ListItem style={{ maxHeight: 45 }}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: colors.fontTitle, fontWeight: "700", fontSize: 17 }}>Price: </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="SELECT ONE"
                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                            headerTitleStyle={{ color: "#D81B60" }}
                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
                            textStyle={{ right: 10, fontWeight: "100", fontSize: 17, color: this.state.price === 'NO_SELECT' ? colors.fontPlaceholder : colors.fontTitle }}
                            selectedValue={this.state.price}
                            onValueChange={this.onValueChangePrice}>
                            <Picker.Item label="0$ - 25$" value="P0_25" />
                            <Picker.Item label="50$ - 100$" value="P50_100" />
                            <Picker.Item label="100$ - 200$" value="P100_200" />
                            <Picker.Item label="200$ - 350$" value="P200_250" />
                            <Picker.Item label="350$ - 400$" value="P350_400" />
                            <Picker.Item label="400$ - 750$" value="P400_750" />
                            <Picker.Item label="750$ - 1250$" value="P750_1250" />
                            <Picker.Item label="Others" value="OTHERS" />
                            <Picker.Item label="No select" value="NO_SELECT" />
                        </Picker>
                    </Left>
                </ListItem>

                {/* Social Handles */}
                <ListItem style={{ maxHeight: 45 }} onPress={() => this.setState({ modalVisiblePrizeSocialNetwork: true })}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: isSocialMediaHandlesPrizeValid === null ? null : isSocialMediaHandlesPrizeValid ? colors.fontTitle : colors.textError
                        }}>Social media handles (or same as user): </Text>
                        <Text style={{
                            color: isSocialMediaHandlesPrizeValid === null ? colors.fontPlaceholder : isSocialMediaHandlesPrizeValid ? colors.fontTitle : colors.textError,
                            fontSize: 17,
                            fontWeight: "100"
                        }}> Facebook...</Text>
                    </Left>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisiblePrizeSocialNetwork}>
                        <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => {
                                    this.setState({
                                        isSocialMediaHandlesPrizeValid: false,
                                        modalVisiblePrizeSocialNetwork: false,
                                        prizeFacebook: "",
                                        prizeTwitter: "",
                                        prizeSnapchat: "",
                                        prizeInstagram: ""
                                    })
                                }}>
                                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                    <Text style={{ left: 5, color: "#D81B60" }}>CANCEL</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button
                                    transparent
                                    onPress={() => {
                                        this.setState({
                                            isSocialMediaHandlesPrizeValid: true,
                                            prizeSocialMedia: {
                                                prizeFacebook: this.state.prizeFacebook,
                                                prizeTwitter: this.state.prizeTwitter,
                                                prizeSnapchat: this.state.prizeSnapchat,
                                                prizeInstagram: this.state.prizeInstagram,
                                            },
                                            modalVisiblePrizeSocialNetwork: false
                                        })
                                    }}>
                                    <Text style={{
                                        fontSize: wp(5),
                                        color: this.state.prizeFacebook
                                            && this.state.prizeTwitter
                                            && this.state.prizeSnapchat
                                            && this.state.prizeInstagram
                                            ? colors.elementPrimary : colors.fontPlaceholder
                                    }}>OK</Text>
                                </Button>
                            </Right>
                        </Header>

                        <List style={{ width: "100%", backgroundColor: colors.fontPrimary }}>

                            {/* Facebook */}
                            <ListItem style={{ maxHeight: 50 }}>
                                <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-facebook" style={{ fontSize: fontSize.iconsPrimary, color: colors.iconsPrimary }} />
                                    <Input
                                        placeholder="Enter prize facebook" autoFocus={true}
                                        keyboardType="ascii-capable" maxLength={30}
                                        placeholderTextColor={colors.fontPlaceholder} style={{ left: 5 }}
                                        value={this.state.prizeFacebook} onChangeText={(prizeFacebook) => this.setState({ prizeFacebook })} />
                                </Left>
                            </ListItem>

                            {/* Instagram */}
                            <ListItem style={{ maxHeight: 50 }}>
                                <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-instagram" style={{
                                        fontSize: fontSize.iconsPrimary,
                                        color: colors.iconsPrimary
                                    }} />
                                    <Input
                                        placeholder="Enter your user of instagram"
                                        keyboardType="ascii-capable" maxLength={30}
                                        placeholderTextColor={colors.fontPlaceholder} style={{ left: 5 }}
                                        value={this.state.prizeInstagram} onChangeText={(prizeInstagram) => this.setState({ prizeInstagram })} />
                                </Left>
                            </ListItem>

                            {/* Twitter */}
                            <ListItem style={{ maxHeight: 50 }}>
                                <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-twitter" style={{
                                        fontSize: fontSize.iconsPrimary,
                                        color: colors.iconsPrimary
                                    }} />
                                    <Input
                                        placeholder="Enter prize Twitter"
                                        keyboardType="ascii-capable" maxLength={30}
                                        placeholderTextColor={colors.fontPlaceholder} style={{ left: 5 }}
                                        value={this.state.prizeTwitter} onChangeText={(prizeTwitter) => this.setState({ prizeTwitter })} />
                                </Left>
                            </ListItem>

                            {/* SnapChap */}
                            <ListItem style={{ maxHeight: 50 }}>
                                <Left style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="logo-snapchat" style={{
                                        fontSize: fontSize.iconsPrimary,
                                        color: colors.iconsPrimary
                                    }} />
                                    <Input
                                        placeholder="Enter prize SnapChat"
                                        keyboardType="ascii-capable" maxLength={30}
                                        placeholderTextColor={colors.fontPlaceholder} style={{ left: 5 }}
                                        value={this.state.prizeSnapchat} onChangeText={(prizeSnapchat) => this.setState({ prizeSnapchat })} />
                                </Left>
                            </ListItem>
                        </List>
                    </Modal>
                </ListItem>

                {/* Special Instruction */}
                <ListItem last style={{ maxHeight: 45, borderBottomColor: "rgba(0,0,0,0.0)" }} onPress={() => this.setState({ modalVisibleSpecialInstructions: true })}>
                    <Left style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "700",
                            color: isSpecialInstructionsValid === null ? null : isSpecialInstructionsValid ? colors.fontTitle : colors.textError
                        }}>Special Instructions: </Text>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "100",
                            color: isSpecialInstructionsValid === null ? colors.fontPlaceholder : isSpecialInstructionsValid ? colors.fontTitle : colors.textError
                        }}>{` ${this.state.specialInstructions !== "" ? _.truncate(this.state.specialInstructions, { length: 22, omission: "..." }) : 'The role is...'}`}</Text>
                    </Left>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisibleSpecialInstructions}>
                        <Header style={{ height: Platform.OS === 'ios' ? 70 : 50, backgroundColor: "rgba(0,0,0,0.0)", borderBottomColor: "rgba(0,0,0,0.0)" }}>
                            <Left style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => { this.setState({ modalVisibleSpecialInstructions: false, specialInstructions: "", isSpecialInstructionsValid: false }) }}>
                                    <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                    <Text style={{ left: 5, color: "#D81B60" }}>CANCEL</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent
                                    disabled={this.state.specialInstructions ? false : true}
                                    onPress={() => { this.setState({ modalVisibleSpecialInstructions: false, isSpecialInstructionsValid: true }) }}>
                                    <Text style={{
                                        fontSize: wp(5),
                                        color: this.state.specialInstructions ? colors.elementPrimary : colors.fontPlaceholder
                                    }}>OK</Text>
                                </Button>
                            </Right>
                        </Header>

                        {/* Contest Review */}
                        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                            <Text style={{
                                fontSize: 17,
                                color: colors.fontTitle,
                                fontWeight: "700",
                                top: 5
                            }}>Special Instructions: </Text>
                            <Input
                                placeholder="This rule is..."
                                keyboardType="ascii-capable" maxLength={160}
                                placeholderTextColor={colors.fontPlaceholder} multiline
                                style={{ fontWeight: "100", height: hp(25) }} numberOfLines={5}
                                value={this.state.specialInstructions} autoFocus={true}
                                onChangeText={(specialInstructions) => this.setState({ specialInstructions })} />
                        </View>
                    </Modal>
                </ListItem>
            </List>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitAPrizeFormData: (submitAPrizeFormDataParams) => dispatch(submitAPrizeFormData(submitAPrizeFormDataParams))
    }
}

export default connect(null, mapDispatchToProps)(SubmitAPrize)