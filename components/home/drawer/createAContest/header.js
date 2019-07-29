import React from "react"
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Title,
} from 'native-base';

// Icons
import { Feather } from "@expo/vector-icons"

// This function is the header of slide create a contest
export default function HeaderCreateAContest(props) {
    return (
        <Header style={{ backgroundColor: "rgba(0,0,0,0.0)", elevation: 0, borderBottomColor: "rgba(0,0,0,0.0)" }}>
            <Left>
                <Button transparent onPress={() => props.setModalVisibleCreateContest(false)}>
                    <Feather name='x' style={{ color: "#fff", fontSize: 30 }} />
                </Button>
            </Left>
            <Body>
                <Title style={{ color: "#fff", fontSize: 30 }}>{props.indexSwiper !== 0 ? props.nameOfContenstInput : null}</Title>
            </Body>
            <Right />
        </Header>
    )
}