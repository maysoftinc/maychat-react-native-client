import React, { PureComponent } from "react";
import {
    StyleSheet,
} from "react-native";
import FastImage, {
    FastImageProperties,
} from "react-native-fast-image";
export interface IProps extends FastImageProperties {
};

export default class ControlImage extends PureComponent<IProps> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <FastImage {...this.props}/>
        );
    }
}
/**
 * Local stylesheet for this component.
 */
const localStyles = StyleSheet.create({
});
