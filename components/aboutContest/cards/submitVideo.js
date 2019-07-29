import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Button, Card, CardItem } from 'native-base';

// Submit a Video in the contest
export default function SubmitAVideo() {
    return (
        <Card style={{ borderRadius: 15, width: "95%", elevation: 15 }}>
            <CardItem cardBody style={{ borderRadius: 15 }}>
                <ImageBackground
                    borderRadius={15}
                    style={{ height: 130, width: "100%" }}
                    source={{ uri: "https://images.unsplash.com/photo-1521638704613-d1ef2eb6c7ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1146&q=80" }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        width: "100%",
                        height: "100%",
                        borderRadius: 15
                    }}>
                        <Button bordered style={{ alignSelf: "center", padding: 5, borderRadius: 10, borderColor: "#fff" }}>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                                Submit a video
                               </Text>
                        </Button>
                    </View>
                </ImageBackground>
            </CardItem>
        </Card>
    );
}