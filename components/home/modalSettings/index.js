import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { View, Root } from 'native-base';
import ModalAnimated from 'react-native-modal'

// Colors
import { colorsPalette } from '../../global/static/colors'

// Child Components
import SettingsOptions from './menu'

class Settings extends Component {
    state = { modalAnimated: false, modalComment: false, comment: "", isLoading: false, modalUpdateComment: false, itemToUpdate: {} }

    render() {
        const { menu, userData, _menu } = this.props
        return (
            <ModalAnimated
                isVisible={menu}
                onSwipeComplete={() => _menu(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}>
                <Root>
                    <View style={{
                        backgroundColor: colorsPalette.secondaryColor,
                        borderTopStartRadius: 10,
                        borderTopEndRadius: 10,
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        flex: 1,
                        maxHeight: 600,
                        position: 'absolute',
                        bottom: 0,
                        width: '100%'
                    }}>
                        <SettingsOptions userData={userData} _menu={_menu} />
                    </View>
                </Root>
            </ModalAnimated>
        );
    }
}

export default withNavigation(Settings)