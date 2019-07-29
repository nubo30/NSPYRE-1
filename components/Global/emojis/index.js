import React from 'react'
import { Text, View } from 'native-base'

// Data not found
var emojis = ['😫', '😣', '😥', '😯', '😓', '😔', '😕', '🙃', '🙁', '😞', '😟', '😢', '😭', '😰', '😩', '😧', '😦', '😱'];
export const DataNotFound = (props) => {
    const { inputText } = props
    return (
        <View style={{ justifyContent: "flex-start", flex: 1, alignItems: 'center', top: 60 }}>
            <Text style={{ fontSize: 80 }}>{`${emojis[Math.floor(Math.random() * emojis.length)]}`}</Text>
            <Text style={{ color: "#9E9E9E", fontSize: 16 }}>We could not find <Text style={{ fontWeight: 'bold', color: "#9E9E9E" }}>{inputText}</Text></Text>
        </View>
    )
}

// Search data
export const DataSearch = () => {
    return (
        <View style={{ justifyContent: "flex-start", flex: 1, alignItems: 'center', top: 60 }}>
            <Text style={{ fontSize: 80 }}>{`${emojis[Math.floor(Math.random() * emojis.length)]}`}</Text>
            <Text>No encontrado</Text>
        </View>
    )
}