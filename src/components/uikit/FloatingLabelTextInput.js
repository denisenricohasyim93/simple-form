import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Animated
} from 'react-native'

class FloatingLabel extends Component {
    constructor(props) {
        super(props);

        let initialPadding = 9;
        let initialOpacity = 0;

        if (this.props.visible) {
            initialPadding = 5;
            initialOpacity = 1;
        }

        this.state = {
            paddingAnim: new Animated.Value(initialPadding),
            opacityAnim: new Animated.Value(initialOpacity)
        }
    }

    componentWillReceiveProps(newProps) {
        Animated.timing(this.state.paddingAnim, {
            toValue: newProps.visible ? 5 : 9,
            duration: 230
        }).start();

        return Animated.timing(this.state.opacityAnim, {
            toValue: newProps.visible ? 1 : 0,
            duration: 230
        }).start();
    }

    render() {
        return(
            <Animated.View style={[styles.floatingLabel, {paddingTop: this.state.paddingAnim, opacity: this.state.opacityAnim}]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

class TextFieldHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
        }
    }

    componentWillReceiveProps(newProps) {
        return Animated.timing(this.state.marginAnim, {
            toValue: newProps.withValue ? 13 : 0,
            duration: 230
        }).start();
    }

    render() {
        return(
            <Animated.View style={{marginTop: this.state.marginAnim}}>
                {this.props.children}
            </Animated.View>
        );
    }
}

class FloatLabelTextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            text: this.props.value
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.hasOwnProperty('value') && newProps.value !== this.state.text) {
            this.setState({ text: newProps.value })
        }
    }

    withBorder() {
        if (!this.props.noBorder) {
            return styles.withBorder;
        }
    }

    handleSubmitEditing() {
        if (this.props.returnKeyType == 'done') return;
        if (this.props.nextFocus && typeof this.props.nextFocus === 'function') {
            this.props.nextFocus().focus()
        } else {
            this.blur()
        }
    }

    render() {
        return(
            <View style={[styles.container, this.props.style]}>
                <View style={styles.viewContainer}>
                    <View style={styles.paddingView}/>
                    <View style={[styles.fieldContainer, this.withBorder()]}>
                        <FloatingLabel visible={this.state.text}>
                            <Text style={[styles.fieldLabel, this.labelStyle()]}>{this.placeholderValue()}</Text>
                        </FloatingLabel>
                        <TextFieldHolder withValue={this.state.text}>
                            <TextInput {...this.props}
                                ref="textInput"
                                keyboardType={this.props.keyboardType || 'default'}
                                style={[styles.valueText, this.props.multiline ? {height: 75} : null]}
                                defaultValue={this.props.defaultValue}
                                value={this.state.text}
                                underlineColorAndroid={'transparent'}
                                maxLength={this.props.maxLength}
                                onFocus={() => this.setFocus()}
                                onBlur={() => this.unsetFocus()}
                                multiline={this.props.multiline}
                                returnKeyType={this.props.returnKeyType}
                                onSubmitEditing={this.handleSubmitEditing.bind(this)}
                                onChangeText={(value) => this.setText(value)}
                            />
                        </TextFieldHolder>
                    </View>
                </View>
            </View>
        );
    }

    setFocus() {
        this.setState({
            focused: true
        });
        try {
            return this.props.onFocus();
        } catch (_error) {}
    }

    unsetFocus() {
        this.setState({
            focused: false
        });
        try {
            return this.props.onBlur();
        } catch (_error) {}
    }

    labelStyle() {
        if (this.state.focused) {
            return styles.focused;
        }
    }

    placeholderValue() {
        if (this.state.text) {
            return this.props.placeholder;
        }
    }

    focus = () => {
        this.refs['textInput'].focus();
    };

    blur = () => {
        this.refs['textInput'].blur();
    };

    setText(value) {
        this.setState({
            text: value
        });
        try {
            return this.props.onChangeTextValue(value);
        } catch (_error) {}
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 45,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    paddingView: {
        width: 0
    },
    floatingLabel: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    fieldLabel: {
        height: 15,
        fontSize: 9,
        color: '#565D6B'
    },
    fieldContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
    withBorder: {
        borderBottomWidth: 1 / 2,
        borderColor: '#C8C7CC',
    },
    valueText: {
        height: 28,
        padding: 0,
        paddingTop: 5,
        fontSize: 16,
        color: '#111111',
        backgroundColor: 'transparent',
        textAlignVertical: 'top'
    },
    focused: {
        color: "#565D6B"
    }
});

export default FloatLabelTextField;