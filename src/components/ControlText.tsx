import React, { PureComponent } from "react";
import {
    StyleSheet,
    Text,
    TextProps,
} from "react-native";

import { Styles } from "../commons";
import { Constants } from "../constants";

export interface IProps extends TextProps {
    fontStyle?: string;
    textColor?: string;
    isMarginTop?: boolean;
    fontSize?: number;
}

export default class ControlText extends PureComponent<IProps> {

    public static FontStyle = {
        BOLD: "bold",
        BOLD_ITALIC: "bold-italic",
        ITALIC: "italic",
        REGULAR: "regular",
    };

    public static TextColor = {
        GRAY: "gray",
        WHITE: "white",
        YELLOW: "yellow"
    };

    public static FontSize = {
        SMALL: 12,
        DEFAULT: 14,
        MEDIUM: 16,
        X_LARGE: 18,
        XX_LARGE: 20,
        XXX_LARGE: 32
    };

    constructor(props: any) {
        super(props);
    }

    public render() {
        const {
            style,
            children,
            fontStyle,
            textColor,
            fontSize
        } = this.props;
        
        let textStyle: any;
        let textColorStyle: any = {
            color: ""
        };
        let textMargin: any = {
            marginTop: 0
        }
        if (this.props.isMarginTop) {
            textMargin.marginTop = 16;
        }
        switch (textColor) {
            case ControlText.TextColor.GRAY:
                textColorStyle.color = Constants.Styles.TEXT_GRAY_COLOR;
                break;
            case ControlText.TextColor.WHITE:
                textColorStyle.color = Constants.Styles.WHITE_COLOR;
                break;
            case ControlText.TextColor.YELLOW:
                textColorStyle.color = Constants.Styles.YELLOW_COLOR;
                break;
            default:
                textColorStyle.color = Constants.Styles.TEXT_DEFAULT_COLOR;
                break;
        }

        switch (fontStyle) {
            // case ControlText.FontStyle.ITALIC:
            //     textStyle = Styles.textItalic;
            //     break;
            case ControlText.FontStyle.BOLD:
                textStyle = Styles.textBold;
                break;
            // case ControlText.FontStyle.BOLD_ITALIC:
            //     textStyle = Styles.textBoldItalic;
            //     break;
            default:
                textStyle = Styles.textRegular;
                break;
        }

        return (
            <Text
                {...this.props}
                // Specifies whether fonts should scale to respect
                // Text Size accessibility settings. The default is true
                // allowFontScaling={false}
                style={StyleSheet.flatten([{fontSize: fontSize ? fontSize : Constants.Styles.FONT_SIZE_DEFAULT}, textStyle, textColorStyle, textMargin, style])}>
                {children}
            </Text>
        );
    }
}

/**
 * Local stylesheet for this component.
 */
const localStyles = StyleSheet.create({
});
