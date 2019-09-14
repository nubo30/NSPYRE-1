import React from "react"
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Platform } from "react-native"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const { height } = Dimensions.get("window")

// Colors
import { colorsPalette } from '../static/colors'

export const GadrientsAuth = () => (
    // Gadrient of the scene auth
    <LinearGradient
        start={[0.5, 0.1]}
        colors={[colorsPalette.primaryColor, colorsPalette.primaryColorGradient]}
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
        colors={[colorsPalette.secondaryColor, colorsPalette.secondaryColor]}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: height - height / 2,
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