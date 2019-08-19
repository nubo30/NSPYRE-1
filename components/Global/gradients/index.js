import React from "react"
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Platform } from "react-native"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const { height } = Dimensions.get("window")

export const GadrientsAuth = (indexSwiperRoot) => (
    // Gadrient of the scene auth
    <LinearGradient
        start={[0.5, 0.1]}
        colors={["#E91E63", "#C2185B"]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            width: "100%",
            height: "50%"
        }}
    />
)

export const GadrientsAuthX2 = () => (
    // Gadrient of the scene auth
    <LinearGradient
        start={[1, 1]}
        colors={["#fff", "#FFF"]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: height - height / 2,
        }}
    />
)

export const GradientTypeForm = () => (
    // Gadrient of the scene "More info"
    <LinearGradient
        start={Platform.OS === 'ios'
            ? [0.5, 0.2]
            : [0.2, 0.6]}
        colors={["#1976D2", "#0D47A1"]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: wp(50)
        }}
    />
)

export const GadrientsModifyProfile = () => (
    // Gadrient of the scene "Modify Profile"
    <LinearGradient
        start={[1, 0.1]}
        colors={["#FAFAFA", "#FAFAFA", "#FAFAFA"]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: "400%",
        }}
    />
)

export const GadrientsHome = () => (
    // Gadrient of the scene Home
    <LinearGradient
        start={[1, 0.1]}
        colors={["#FAFAFA", "#FAFAFA", "#FFF"]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: height
        }}
    />
)

export const GadrientsDrower = () => (
    // Gadrient of the scene Home
    <LinearGradient
        start={[1, 0.5]}
        colors={["#FAFAFA", "#fff"]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: height,
        }}
    />
)

export const GadrientsListContenst = () => (
    // Gadrient of the scene List Contents
    <LinearGradient
        start={[1, 0.1]}
        colors={["#F5F5F5", "#F5F5F5", "#fff"]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: "110%",
        }}
    />
)

export const GadrientsAboutContest = () => (
    // Gadrient of the scene List Contents
    <LinearGradient
        start={[1, 0.1]}
        colors={["#F5F5F5", "#F5F5F5", "#F5F5F5"]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: "110%",
        }}
    />
)

export const GadrientsCreateAContest = () => (
    // Gadrient of the scene Create a Constest
    <LinearGradient
        start={[1, 0.1]}
        colors={["#0D47A1", "#1565C0", "#1976D2"]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
        }}
    />
)