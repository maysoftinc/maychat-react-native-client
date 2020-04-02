import React, { PureComponent } from "react";
import {
    StyleSheet,
} from "react-native";
import FastImage, {
    FastImageProperties,
} from "react-native-fast-image";

export interface IProps extends FastImageProperties {
    size: number;
    source: any;
    circleStyles?: any;
};

export default class ControlCircle extends PureComponent<IProps> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        const size: number = this.props.size;
        const circleStyles: any = this.props.circleStyles;
        return (
            <FastImage
                {...this.props}
                source={this.props.source}
                style={[{ borderRadius: size / 2, width: size, height: size }, circleStyles]}
                resizeMode={"stretch"}
            >
                {this.props.children}
            </FastImage>
        );
    }
}
/**
 * Local stylesheet for this component.
 */
const localStyles = StyleSheet.create({
});
