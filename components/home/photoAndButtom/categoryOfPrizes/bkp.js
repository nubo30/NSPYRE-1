import React, { Component } from 'react';
import { Modal, KeyboardAvoidingView, Alert, ImageBackground, Platform } from "react-native"
import { ImagePicker, Permissions } from 'expo';
import { API, graphqlOperation, Storage } from 'aws-amplify'
import {
    Header,
    Left,
    Button,
    Icon,
    Text,
    Spinner,
    Title,
    Container,
    View,
    Input,
    Item,
    Picker,
    ListItem
} from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid'
import Swiper from 'react-native-swiper';
import _ from 'lodash'
import moment from 'moment'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Child Component
import { DataNotFound } from '../../../Global/emojis/index'

// GraphQL
import * as queries from '../../../../src/graphql/queries'
import * as mutations from '../../../../src/graphql/mutations'
import * as subscriptions from '../../../../src/graphql/subscriptions'

// Icons
import { Ionicons } from "@expo/vector-icons"

class MyPrizes extends Component {
    state = {
        thumbnailLoading: false,
        thumbnailPictureLoading: false,
        imageLoading: false,
        prizesData: [],
        updatePrizeAction: false,
        openEditModal: false,
        textToUpdate: "",
        itemToUpdate: {},
        typeElement: "",
        placeholderEdit: "",
        price: "P0_25",
        isPicker: false,
        loadingUpdate: false,
        upLoadingImagen: false,
        picture: { url: "", fileUri: "" },
        changeImagenData: null,
        imageToUpdate: { id: "", fileUri: "" },
        itemIdForSpinner: ""
    }

    componentDidMount() {
        // Se lista los premios
        this.getPrizesList();

        // Se activa la consulta en tiempo real con la base de datos AWS
        API.graphql(graphqlOperation(subscriptions.onDeleteFormSubmitAPrize)).subscribe({
            next: (data) => {

                // Elimina en tiempo real el item seleccionado del estado global de la clase 
                const removedPrize = data.value.data.onDeleteFormSubmitAPrize;
                const prizesDataList = this.state.prizesData.filter((prize => { return prize.id !== removedPrize.id })); this.setState({ prizesData: prizesDataList })
            }
        })
        API.graphql(graphqlOperation(subscriptions.onUpdateFormSubmitAPrize)).subscribe({
            next: (data) => {

                // Se actualiza el elemento seleccionado dentro de la lista que se encuentra en el estado global de la clase
                const getNewData = data.value.data.onUpdateFormSubmitAPrize
                delete getNewData.__typename; delete getNewData.aboutThePrize.__typename; delete getNewData.aboutTheUser.__typename
                let prizesNewDataList = _.map(this.state.prizesData, (i) => { return i.id === getNewData.id ? getNewData : i });
                this.setState({ prizesData: prizesNewDataList, textToUpdate: "" })
            }
        })
    }

    // Obtiene una lista de los premios ya creados, estos se filtraran por usuarios
    getPrizesList = async () => {
        const { userData } = this.props
        try {
            // Consulta al a base de datos AWS
            const { data } = await API.graphql(graphqlOperation(queries.listFormSubmitAPrizes, { filter: { userId: { eq: userData.id } } }))
            this.setState({ prizesData: data.listFormSubmitAPrizes.items })
        } catch (error) {
            // Muestra un error siempre y cuando el 'try' no se cumpla
            console.log(error)
        }
    }

    // Elimina un premio de la base de datos AWS
    ereasePrize = async (item) => {
        try {

            // Consulta si existe el elemento, si existe lo elimina
            await API.graphql(graphqlOperation(mutations.deleteFormSubmitAPrize, { input: { id: item.id } }))
        }
        catch (error) {
            console.log(error)
        }
    }

    // Actualizador de los elementos que estan en el objeto global de la lista submitAPrize
    _updateSubmitAPrizeItem = async () => {
        const { itemToUpdate, textToUpdate, typeElement, price, picture, changeImagenData } = this.state
        let input
        switch (typeElement) {
            case 'nameOfPrize':
                input = _.merge({}, itemToUpdate, { aboutThePrize: { nameOfPrize: textToUpdate } })
                break;
            case 'price':
                input = _.merge({}, itemToUpdate, { aboutThePrize: { price: price } })
                break;
            case 'shortDescriptionOfThePrize':
                input = _.merge({}, itemToUpdate, { aboutThePrize: { shortDescriptionOfThePrize: textToUpdate } })
                break;
            case 'specialInstructions':
                input = _.merge({}, itemToUpdate, { aboutThePrize: { specialInstructions: textToUpdate } })
                break;
            case 'companyNamePrize':
                input = _.merge({}, itemToUpdate, { aboutThePrize: { companyNamePrize: textToUpdate } })
                break;
            case 'picture':
                input = _.merge({}, changeImagenData, { aboutThePrize: { picture: picture.url } })
                break;
            default:
                input = ""
        }
        delete input.user
        try {
            await API.graphql(graphqlOperation(mutations.updateFormSubmitAPrize, { input }))
            this.setState({ openEditModal: false, imageToUpdate: { fileUri: picture.fileUri, id: changeImagenData.id } })
        } catch (error) {
            console.log(error)
        } finally {
            this.setState({ loadingUpdate: false, textToUpdate: "", openEditModal: false })
        }
    }

    // Price
    onValueChangePrice = (value: string) => { this.setState({ price: value, typeElement: 'price' }) }

    // permission to access the user's phone library
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    // Open library from Phone
    useLibraryHandler = async (itemId) => {
        await this.askPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] })
        if (!result.cancelled) {
            this.setState({ itemIdForSpinner: itemId })
            this.storeFileInS3(result.uri)
        }
    }

    storeFileInS3 = async (fileUri, access = "public") => {
        const { userData } = this.props
        this.setState({ upLoadingImagen: true })
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
            await Storage.put(`users/${userData.email}/prizes/${name}`, blob, options);
            await this.setState({
                typeElement: "picture",
                picture: { url: `https://s3.amazonaws.com/influencemenow-statics-files-env/${access}/users/${userData.email}/prizes/${name}`, fileUri }
            })
            this._updateSubmitAPrizeItem()
        } catch (err) {
            console.log(err)
        } finally {
            this.setState({ upLoadingImagen: false })
        }
    };

    render() {
        const { itemIdForSpinner, imageLoading, prizesData, updatePrizeAction, openEditModal, textToUpdate, placeholderEdit, price, isPicker, loadingUpdate, typeElement, imageToUpdate } = this.state
        const { openModalMyPrizes, setModalVisible } = this.props
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={openModalMyPrizes}>
                <Container>
                    <Header style={{ width: "100%", height: Platform.OS === 'android' ? 55 : 70, backgroundColor: "#FFF", borderBottomColor: "#FFF" }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Button transparent onPress={() => { setModalVisible(false); this.setState({ updatePrizeAction: false }) }}>
                                <Icon name='arrow-back' style={{ color: "#D81B60" }} />
                                <Text style={{ left: 5, color: "#D81B60" }}>Back</Text>
                            </Button>
                            <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp('7%') }}>Your Prizes</Title>
                        </Left>
                    </Header>
                    <Swiper
                        onIndexChanged={(index) => this.setState({ textToUpdate: "" })}
                        showsButtons={false} showsPagination={true} activeDotColor="#D81B60" loop={false}>
                        {prizesData.length ? prizesData.map((item, key) =>
                            <Grid key={key}>
                                <Row size={30} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Spinner color="#D82B60" size="large" animating={imageLoading} style={{ position: 'absolute' }} />
                                    <ImageBackground
                                        onLoadStart={() => this.setState({ imageLoading: true })}
                                        onLoadEnd={() => this.setState({ imageLoading: false })}
                                        style={{ width: "100%", height: "100%" }}
                                        source={{ uri: imageToUpdate.id !== "" ? imageToUpdate.id === item.id ? imageToUpdate.fileUri : item.aboutThePrize.picture : item.aboutThePrize.picture }}>
                                        <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                            {updatePrizeAction
                                                ? <Button
                                                    onPress={() => { this.useLibraryHandler(item.id); this.setState({ changeImagenData: item }) }}
                                                    transparent bordered disabled={this.state.upLoadingImagen}
                                                    style={{ alignSelf: 'center', borderColor: '#fff', minWidth: "50%", justifyContent: 'center' }}>
                                                    {
                                                        this.state.upLoadingImagen
                                                            ? item.id === itemIdForSpinner
                                                                ? <Spinner color="#FFF" size="small" />
                                                                : <Text style={{ color: "#fff", fontSize: 22 }}>
                                                                    Update picture
                                                            </Text>
                                                            : <Text style={{ color: "#fff", fontSize: 22 }}>
                                                                Update picture
                                                            </Text>
                                                    }
                                                </Button>
                                                : null}
                                        </View>
                                    </ImageBackground>
                                </Row>
                                <Row size={5} style={{ justifyContent: 'flex-end' }}>
                                    <Text style={{ fontWeight: '100', fontStyle: 'italic', fontSize: wp(4), padding: 3, color: '#E0E0E0' }}>
                                        {`${_.upperFirst(_.lowerCase((item.category)))}, Published ${moment(item.createdAt).fromNow()}`}
                                    </Text>
                                </Row>
                                <Row size={65}>
                                    <Grid>
                                        {/* Name of prizes - Price */}
                                        <Row size={15} style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: wp(7), color: "#333" }}
                                                    onPress={() => updatePrizeAction ? this.setState({
                                                        openEditModal: true,
                                                        itemToUpdate: item,
                                                        typeElement: "nameOfPrize",
                                                        placeholderEdit: item.aboutThePrize.nameOfPrize,
                                                        isPicker: false
                                                    }) : null}>
                                                    {_.startCase(item.aboutThePrize.nameOfPrize)}
                                                </Text>
                                                {updatePrizeAction
                                                    ? <Ionicons name='md-create' style={{ fontSize: 20, color: "#E0E0E0", left: 10, top: 3 }}
                                                        onPress={() => updatePrizeAction ? this.setState({
                                                            openEditModal: true,
                                                            itemToUpdate: item,
                                                            typeElement: "nameOfPrize",
                                                            placeholderEdit: item.aboutThePrize.nameOfPrize,
                                                            isPicker: false
                                                        }) : null} />
                                                    : null}
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: wp(5), color: "#333", color: '#D81B60', padding: 5, fontStyle: 'italic', fontWeight: '100' }}
                                                    onPress={() => updatePrizeAction ? this.setState({
                                                        openEditModal: true,
                                                        itemToUpdate: item,
                                                        typeElement: "nameOfPrize",
                                                        placeholderEdit: item.aboutThePrize.price,
                                                        isPicker: true
                                                    }) : null}>
                                                    {_.replace(_.replace(item.aboutThePrize.price, "P", ""), "_", " - ")}$
                                                </Text>
                                                {updatePrizeAction
                                                    ? <Ionicons name='md-create' style={{ fontSize: 20, color: "#E0E0E0", left: 10, top: 3 }}
                                                        onPress={() => updatePrizeAction ? this.setState({
                                                            openEditModal: true,
                                                            itemToUpdate: item,
                                                            typeElement: "nameOfPrize",
                                                            placeholderEdit: `${_.replace(_.replace(item.aboutThePrize.price, "P", ""), "_", " - ")}$`,
                                                            isPicker: true
                                                        }) : null} />
                                                    : null}
                                            </View>
                                        </Row>

                                        {/* Short Description */}
                                        <Row size={20} style={{ paddingLeft: 40, paddingRight: 40, top: 3, justifyContent: 'center' }}>
                                            <Text onPress={() => updatePrizeAction ? this.setState({
                                                openEditModal: true,
                                                itemToUpdate: item,
                                                typeElement: "shortDescriptionOfThePrize",
                                                placeholderEdit: item.aboutThePrize.shortDescriptionOfThePrize,
                                                isPicker: false
                                            }) : null} style={{ fontSize: wp(4.5), textAlign: 'center', fontWeight: '100' }}>{item.aboutThePrize.shortDescriptionOfThePrize}</Text>
                                            {updatePrizeAction
                                                ? <Ionicons name='md-create' style={{ fontSize: 15, color: "#E0E0E0", left: 10 }}
                                                    onPress={() => updatePrizeAction ? this.setState({
                                                        openEditModal: true,
                                                        itemToUpdate: item,
                                                        typeElement: "shortDescriptionOfThePrize",
                                                        placeholderEdit: item.aboutThePrize.shortDescriptionOfThePrize,
                                                        isPicker: false
                                                    }) : null} />
                                                : null}
                                        </Row>

                                        {/* Special INstructiuon */}
                                        <Row size={20} style={{ paddingLeft: 40, paddingRight: 40, justifyContent: 'center' }}>
                                            <Text onPress={() => updatePrizeAction ? this.setState({
                                                openEditModal: true,
                                                itemToUpdate: item,
                                                typeElement: "specialInstructions",
                                                placeholderEdit: item.aboutThePrize.specialInstructions,
                                                isPicker: false
                                            }) : null} style={{ fontSize: wp(4.5), textAlign: 'center', fontWeight: '100' }}>
                                                {item.aboutThePrize.specialInstructions}
                                            </Text>
                                            {updatePrizeAction
                                                ? <Ionicons name='md-create' style={{ fontSize: 15, color: "#E0E0E0", left: 10 }}
                                                    onPress={() => updatePrizeAction ? this.setState({
                                                        openEditModal: true,
                                                        itemToUpdate: item,
                                                        typeElement: "specialInstructions",
                                                        placeholderEdit: item.aboutThePrize.specialInstructions,
                                                        isPicker: false
                                                    }) : null} />
                                                : null}
                                        </Row>

                                        {/* cCpmany name */}
                                        <Row size={15} style={{ paddingLeft: 40, paddingRight: 40, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: wp(4.5), textAlign: 'center', fontWeight: '100' }}
                                                onPress={() => updatePrizeAction ? this.setState({
                                                    openEditModal: true,
                                                    itemToUpdate: item,
                                                    typeElement: "companyNamePrize",
                                                    placeholderEdit: item.aboutThePrize.companyNamePrize,
                                                    isPicker: false
                                                }) : null}>{item.aboutThePrize.companyNamePrize}</Text>
                                            {updatePrizeAction
                                                ? <Ionicons name='md-create' style={{ fontSize: 20, color: "#E0E0E0", left: 10 }}
                                                    onPress={() => updatePrizeAction ? this.setState({
                                                        openEditModal: true,
                                                        itemToUpdate: item,
                                                        typeElement: "companyNamePrize",
                                                        placeholderEdit: item.aboutThePrize.companyNamePrize,
                                                        isPicker: false
                                                    }) : null} />
                                                : null}
                                        </Row>
                                        <Row size={30} style={{ justifyContent: 'center' }}>
                                            <Button transparent style={{ right: 10 }} onPress={() => Alert.alert(
                                                `${item.aboutThePrize.nameOfPrize}`,
                                                'Are you sure you want to delete it?',
                                                [
                                                    {
                                                        text: 'Cancel',
                                                        style: 'cancel',
                                                    },
                                                    { text: 'OK', onPress: () => this.ereasePrize(item) },
                                                ],
                                                { cancelable: false },
                                            )}>
                                                <Ionicons name='md-trash' style={{ fontSize: 25, color: "#D84315" }} />
                                            </Button>
                                            <Button disabled={this.state.upLoadingImagen} transparent style={{ left: 10 }} onPress={() => this.setState({ updatePrizeAction: !updatePrizeAction })}>
                                                <Ionicons name={!updatePrizeAction ? "md-create" : "md-close"} style={{ fontSize: 25, color: "#E0E0E0" }} />
                                            </Button>
                                        </Row>
                                    </Grid>
                                </Row>
                            </Grid>
                        ) : <DataNotFound />}
                    </Swiper>
           
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={openEditModal}>
                        <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 1 }}>
                            <Header style={{ width: "100%", height: Platform.OS === 'android' ? 55 : 70, backgroundColor: "#FFF", borderBottomColor: "#FFF" }}>
                                <Left style={{ flexDirection: 'row' }}>
                                    <Button transparent onPress={() => this.setState({ openEditModal: false })}>
                                        <Icon name='close' style={{ color: "#D81B60" }} />
                                    </Button>
                                    <Title style={{ alignSelf: "center", left: 15, color: "#D81B60", fontSize: wp('7%') }}>Editing</Title>
                                </Left>
                            </Header>
                            {!isPicker
                                ? <Item
                                    error={textToUpdate ? false : true}
                                    success={textToUpdate ? true : false}
                                    style={{ width: "90%", top: 15, alignSelf: "center" }}>
                                    <Input
                                        maxLength={512}
                                        placeholder={placeholderEdit} multiline={typeElement !== 'nameOfPrize' ? true : false}
                                        autoFocus={true} ref={(ref) => { input = ref }}
                                        value={textToUpdate} keyboardType="ascii-capable" selectionColor="#333"
                                        onChangeText={(textToUpdate) => this.setState({ textToUpdate })} />
                                    <Icon
                                        style={{ color: textToUpdate ? '#4CAF50' : '#EF5350' }}
                                        name={textToUpdate ? 'checkmark-circle' : 'close-circle'} />
                                </Item>
                                : <ListItem style={{ maxHeight: 45, borderBottomColor: price ? '#4CAF50' : '#DFDFDF', borderBottomWidth: 1, width: "90%", left: 4 }}>
                                    <Left>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="SELECT ONE"
                                            headerBackButtonTextStyle={{ color: '#D81B60', fontSize: wp(5) }}
                                            headerTitleStyle={{ color: "#D81B60" }}
                                            headerStyle={{ backgroundColor: '#fff', borderBottomColor: "#fff" }}
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
                                        </Picker>
                                    </Left>
                                </ListItem>
                            }
                            <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Col size={50} style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
                                    <Button
                                        bordered
                                        onPress={() => this.setState({ openEditModal: false, textToUpdate: "" })}
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
                                        onPress={!isPicker ? textToUpdate
                                            ? () => { this._updateSubmitAPrizeItem(); this.setState({ loadingUpdate: true }) } : null
                                            : () => { this._updateSubmitAPrizeItem(); this.setState({ loadingUpdate: true }) }}
                                        style={{
                                            borderRadius: 0, borderColor: "#E0E0E0", width: "100%",
                                            justifyContent: 'center', alignItems: 'center'
                                        }}>
                                        {loadingUpdate
                                            ? <Spinner color="#E0E0E0" size="small" animating={loadingUpdate} />
                                            : <Text style={{ color: !isPicker ? textToUpdate ? "#333" : "#E0E0E0" : "#333" }}>ACCEPT</Text>}
                                    </Button>
                                </Col>
                            </Grid>
                        </KeyboardAvoidingView>
                    </Modal>
                </Container>
            </Modal>
        )
    }
}

export default MyPrizes