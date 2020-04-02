import { StyleSheet } from "react-native";

import { Constants } from "../constants";

/**
 * Styles.ts
 *
 * Common style for app.
 */
const Styles = StyleSheet.create({

    // =========================================================================
    // Box & Container
    // =========================================================================
    appContainer: {
        flex: 1,
    },
    contentContainer: {
        padding: Constants.Styles.CONTENT_SPACE, 
        marginHorizontal: Constants.Styles.CONTENT_SPACE, 
        backgroundColor: Constants.Styles.WHITE_COLOR, 
        borderRadius: 10,
    },
    spacing: {
        height: Constants.Styles.CONTENT_SPACE,
    },
    /** Style center for any element inside it */
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        backgroundColor: Constants.Styles.BACKGROUND_COLOR,
        // flex: 1,
    },
    blueContainer: {
        backgroundColor: Constants.Styles.BLUE_COLOR,
        flex: 1,
    },
    containerStatusBar: {
        backgroundColor: Constants.Styles.BACKGROUND_COLOR,
        flex: 1,
        paddingTop: Constants.Styles.STATUS_BAR_HEIGHT,
    },
    content: {
        paddingHorizontal: Constants.Styles.HORIZONTAL_SPACE_SIZE,
        paddingVertical: Constants.Styles.VERTICAL_SPACE_SIZE,
    },
    fullSize: { width: "100%", height: "100%" },
    /** Please use one time inside the container or containerStatusBar class */
    mainContent: {
        marginHorizontal: Constants.Styles.HORIZONTAL_SPACE_SIZE,
        marginVertical: Constants.Styles.VERTICAL_SPACE_SIZE,
    },

    absolute: { position: "absolute" },
    absoluteStretch: {
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
    },
    bottomLeft: { bottom: 0, left: 0 },
    bottomRight: { top: 0, right: 0 },
    relative: { position: "relative" },
    topLeft: { top: 0, left: 0 },
    topRight: { top: 0, right: 0 },

    // =========================================================================
    // Style using for debug
    // =========================================================================

    transparentBackground: { backgroundColor: "transparent" },

    debugBackground: {
        backgroundColor: Constants.Styles.GRAY_COLOR
    },
    debugBorder: {
        borderColor: Constants.Styles.RED_COLOR,
        borderWidth: 1,
    },
    debugBorder2: {
        borderColor: Constants.Styles.GREEN_COLOR,
        borderWidth: 1,
    },

    // =========================================================================
    // List
    // =========================================================================
    listContent: {},
    listEmpty: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: Constants.Styles.HORIZONTAL_SPACE_SIZE,
        marginVertical: Constants.Styles.VERTICAL_SPACE_SIZE,
    },
    listFooter: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: Constants.Styles.HORIZONTAL_SPACE_SIZE,
        marginVertical: Constants.Styles.VERTICAL_SPACE_SIZE,
    },
    listItem: {
        paddingHorizontal: Constants.Styles.HORIZONTAL_SPACE_SIZE,
        paddingVertical: Constants.Styles.VERTICAL_SPACE_SIZE / 2,
    },
    listSeperator: {
        height: 1,
        backgroundColor: Constants.Styles.BORDER_COLOR,
    },

    // =========================================================================
    // Layout
    // =========================================================================
    horizontal: {
        flexDirection: "row",
    },
    horizontalSpace: {
        flex: 1,
        flexDirection: "row",
    },
    space: {
        flex: 1,
    },
    vertical: {
        flexDirection: "column",
    },
    verticalSpace: {
        flex: 1,
        flexDirection: "column",
    },
    paddingItem: {
        paddingHorizontal: 16
    },

    // =========================================================================
    // Controls style
    // =========================================================================
    controlFirst: { marginBottom: Constants.Styles.VERTICAL_SPACE_SIZE / 2 },
    controlLast: { marginTop: Constants.Styles.VERTICAL_SPACE_SIZE / 2 },
    controlMiddle: { marginVertical: Constants.Styles.VERTICAL_SPACE_SIZE / 2 },

    // =========================================================================
    // Align & Valign
    // =========================================================================
    alignCenter: { alignItems: "center" },
    alignEnd: { alignItems: "flex-end" },
    alignStart: { alignItems: "flex-start" },
    justifyCenter: { justifyContent: "center" },
    justifyEnd: { justifyContent: "flex-end" },
    justifySpace: { justifyContent: "space-between" },
    justifyStart: { justifyContent: "flex-start" },

    // =========================================================================
    // Text
    // =========================================================================
    text: {
        color: Constants.Styles.TEXT_DEFAULT_COLOR,
        fontFamily: Constants.Styles.FONT_REGULAR,
        fontSize: Constants.Styles.FONT_SIZE_SMALL,
    },
    textBold: { fontFamily: Constants.Styles.FONT_BOLD},
    textBoldItalic: { fontFamily: Constants.Styles.FONT_BOLD_ITALIC },
    textItalic: { fontFamily: Constants.Styles.FONT_ITALIC },
    textRegular: { fontFamily: Constants.Styles.FONT_REGULAR},
    textSub: {
        // color: Constants.Styles.TEXT_SUB_COLOR,
        fontFamily: Constants.Styles.FONT_REGULAR,
        fontSize: Constants.Styles.FONT_SIZE_SMALL,
        opacity: 0.3,
    },
    textSubColor: { opacity: 0.3 },

    textLarge: { fontSize: Constants.Styles.FONT_SIZE_LARGE },
    textSmall: { fontSize: Constants.Styles.FONT_SIZE_SMALL },

    textCenter: { textAlign: "center" },
    textJustify: { textAlign: "justify" },
    textLeft: { textAlign: "left" },
    textRight: { textAlign: "right" },

    textCapitalize: { textTransform: "capitalize" },
    textLowercase: { textTransform: "lowercase" },
    textUppercase: { textTransform: "uppercase" },

    // =========================================================================
    // Width: px=pixel, pc=percent
    // =========================================================================
    w0px: { width: 0 },
    w10px: { width: 10 },
    w20px: { width: 20 },
    w25px: { width: 25 },
    w30px: { width: 30 },
    w40px: { width: 40 },
    w50px: { width: 50 },
    w60px: { width: 60 },
    w70px: { width: 70 },
    w80px: { width: 80 },
    w90px: { width: 90 },

    w100px: { width: 100 },
    w200px: { width: 200 },
    w250px: { width: 250 },
    w300px: { width: 300 },
    w400px: { width: 400 },
    w500px: { width: 500 },

    w0pc: { width: "0%" },
    w10pc: { width: "10%" },
    w20pc: { width: "20%" },
    w25pc: { width: "25%" },
    w30pc: { width: "30%" },
    w40pc: { width: "40%" },
    w50pc: { width: "50%" },
    w60pc: { width: "60%" },
    w70pc: { width: "70%" },
    w80pc: { width: "80%" },
    w90pc: { width: "90%" },
    w100pc: { width: "100%" },

    // =========================================================================
    // Height: px=pixel, pc=percent
    // =========================================================================
    h0px: { height: 0 },
    h10px: { height: 10 },
    h20px: { height: 20 },
    h25px: { height: 25 },
    h30px: { height: 30 },
    h40px: { height: 40 },
    h50px: { height: 50 },
    h60px: { height: 60 },
    h70px: { height: 70 },
    h80px: { height: 80 },
    h90px: { height: 90 },

    h100px: { height: 100 },
    h200px: { height: 200 },
    h300px: { height: 300 },
    h400px: { height: 400 },
    h500px: { height: 500 },

    h0pc: { height: "0%" },
    h10pc: { height: "10%" },
    h20pc: { height: "20%" },
    h30pc: { height: "30%" },
    h40pc: { height: "40%" },
    h50pc: { height: "50%" },
    h60pc: { height: "60%" },
    h70pc: { height: "70%" },
    h80pc: { height: "80%" },
    h90pc: { height: "90%" },

    h100pc: { height: "100%" },

    // =========================================================================
    // Margin
    // =========================================================================
    m0: { margin: 0 },
    m5: { margin: 5 },

    m10: { margin: 10 },
    m15: { margin: 15 },
    m20: { margin: 20 },
    m25: { margin: 25 },
    m30: { margin: 30 },
    m35: { margin: 35 },
    m40: { margin: 40 },

    // =========================================================================
    // Margin top
    // =========================================================================
    mt0: { marginTop: 0 },
    mt4: { marginTop: 4 },
    mt5: { marginTop: 5 },

    mt10: { marginTop: 10 },
    mt15: { marginTop: 15 },
    mt16: { marginTop: 16 },
    mt20: { marginTop: 20 },
    mt25: { marginTop: 25 },
    mt24: { marginTop: 24 },
    mt30: { marginTop: 30 },
    mt35: { marginTop: 35 },
    mt40: { marginTop: 40 },

    // =========================================================================
    // Margin right
    // =========================================================================
    mr0: { marginRight: 0 },
    mr5: { marginRight: 5 },
    mr8: { marginRight: 8 },

    mr10: { marginRight: 10 },
    mr16: { marginRight: 16 },
    mr15: { marginRight: 15 },
    mr20: { marginRight: 20 },
    mr25: { marginRight: 25 },
    mr30: { marginRight: 30 },
    mr35: { marginRight: 35 },
    mr40: { marginRight: 40 },

    // =========================================================================
    // Margin bottomm
    // =========================================================================
    mb0: { marginBottom: 0 },
    mb5: { marginBottom: 5 },

    mb10: { marginBottom: 10 },
    mb15: { marginBottom: 15 },
    mb16: { marginBottom: 16 },
    mb20: { marginBottom: 20 },
    mb25: { marginBottom: 25 },
    mb30: { marginBottom: 30 },
    mb35: { marginBottom: 35 },
    mb40: { marginBottom: 40 },

    // =========================================================================
    // Margin left
    // =========================================================================
    ml0: { marginLeft: 0 },
    ml5: { marginLeft: 5 },
    ml8: { marginLeft: 8 },
    ml10: { marginLeft: 10 },
    ml15: { marginLeft: 15 },
    ml16: { marginLeft: 16 },
    ml20: { marginLeft: 20 },
    ml25: { marginLeft: 25 },
    ml30: { marginLeft: 30 },
    ml35: { marginLeft: 35 },
    ml40: { marginLeft: 40 },

    // =========================================================================
    // Padding
    // =========================================================================
    p0: { padding: 0 },
    p5: { padding: 5 },

    p10: { padding: 10 },
    p15: { padding: 15 },
    p20: { padding: 20 },
    p25: { padding: 25 },
    p30: { padding: 30 },
    p35: { padding: 35 },
    p40: { padding: 40 },

    // =========================================================================
    // Padding top
    // =========================================================================
    pt0: { paddingTop: 0 },
    pt5: { paddingTop: 5 },

    pt10: { paddingTop: 10 },
    pt15: { paddingTop: 15 },
    pt20: { paddingTop: 20 },
    pt25: { paddingTop: 25 },
    pt30: { paddingTop: 30 },
    pt35: { paddingTop: 35 },
    pt40: { paddingTop: 40 },

    // =========================================================================
    // Padding right
    // =========================================================================
    pr0: { paddingRight: 0 },
    pr5: { paddingRight: 5 },

    pr10: { paddingRight: 10 },
    pr15: { paddingRight: 15 },
    pr20: { paddingRight: 20 },
    pr25: { paddingRight: 25 },
    pr30: { paddingRight: 30 },
    pr35: { paddingRight: 35 },
    pr40: { paddingRight: 40 },

    // =========================================================================
    // Padding bottom
    // =========================================================================
    pb0: { paddingBottom: 0 },
    pb5: { paddingBottom: 5 },

    pb10: { paddingBottom: 10 },
    pb15: { paddingBottom: 15 },
    pb20: { paddingBottom: 20 },
    pb25: { paddingBottom: 25 },
    pb30: { paddingBottom: 30 },
    pb35: { paddingBottom: 35 },
    pb40: { paddingBottom: 40 },

    // =========================================================================
    // Padding left
    // =========================================================================
    pl0: { paddingLeft: 0 },
    pl5: { paddingLeft: 5 },

    pl10: { paddingLeft: 10 },
    pl15: { paddingLeft: 15 },
    pl20: { paddingLeft: 20 },
    pl25: { paddingLeft: 25 },
    pl30: { paddingLeft: 30 },
    pl35: { paddingLeft: 35 },
    pl40: { paddingLeft: 40 },

    // =========================================================================
    // Top
    // =========================================================================
    t0: { top: 0 },
    t1: { top: 1 },
    t2: { top: 2 },
    t3: { top: 3 },
    t4: { top: 4 },
    t5: { top: 5 },
    t6: { top: 6 },
    t7: { top: 7 },
    t8: { top: 8 },
    t9: { top: 9 },

    t10: { top: 10 },

    // =========================================================================
    // Right
    // =========================================================================
    r0: { right: 0 },
    r1: { right: 1 },
    r2: { right: 2 },
    r3: { right: 3 },
    r4: { right: 4 },
    r5: { right: 5 },
    r6: { right: 6 },
    r7: { right: 7 },
    r8: { right: 8 },
    r9: { right: 9 },

    r10: { right: 10 },
    r16: { right: 16 },
    r20: { right: 20 },
    r30: { right: 30 },

    // =========================================================================
    // Bottom
    // =========================================================================
    b0: { bottom: 0 },
    b1: { bottom: 1 },
    b2: { bottom: 2 },
    b3: { bottom: 3 },
    b4: { bottom: 4 },
    b5: { bottom: 5 },
    b6: { bottom: 6 },
    b7: { bottom: 7 },
    b8: { bottom: 8 },
    b9: { bottom: 9 },

    b10: { bottom: 10 },

    // =========================================================================
    // Left
    // =========================================================================
    l0: { left: 0 },
    l1: { left: 1 },
    l2: { left: 2 },
    l3: { left: 3 },
    l4: { left: 4 },
    l5: { left: 5 },
    l6: { left: 6 },
    l7: { left: 7 },
    l8: { left: 8 },
    l9: { left: 9 },

    l10: { left: 10 },

    // =========================================================================
    // Common Page, Body, Form Containner
    // =========================================================================
    body: {
        marginHorizontal: Constants.Styles.CONTENT_SPACE,
        marginTop: 10,
        flex: 1,
    },
    form: {
        padding: Constants.Styles.CONTENT_SPACE, 
        backgroundColor: Constants.Styles.WHITE_COLOR, 
        borderRadius: 10
    },
    // =========================================================================
    // Common Text Style for App
    // =========================================================================
    textDefaultSmall: {
        fontFamily: Constants.Styles.FONT_REGULAR,
        fontSize: Constants.Styles.FONT_SIZE_SMALL,
        color: Constants.Styles.TEXT_SUB_TITLE_COLOR,
    },
    textDefault: {
        fontFamily: Constants.Styles.FONT_REGULAR,
        fontSize: Constants.Styles.FONT_SIZE_DEFAULT,
        color: Constants.Styles.PRIMARY_COLOR,
    },
    textBoldDefault: {
        fontFamily: Constants.Styles.FONT_BOLD,
        fontSize: Constants.Styles.FONT_SIZE_DEFAULT,
        color: Constants.Styles.PRIMARY_COLOR,
    },
    textItemTitle: {
        fontFamily: Constants.Styles.FONT_REGULAR,
        fontSize: Constants.Styles.FONT_SIZE_DEFAULT,
        color: Constants.Styles.ITEM_TITLE_COLOR,
    },
    textItemValue: {
        fontFamily: Constants.Styles.FONT_BOLD,
        fontSize: Constants.Styles.FONT_SIZE_DEFAULT,
        color: Constants.Styles.ITEM_VALUE_COLOR,
    },
    textInput: {
        fontFamily: Constants.Styles.FONT_BOLD,
        fontSize: Constants.Styles.FONT_SIZE_MEDIUM,
        color: Constants.Styles.PRIMARY_COLOR,
    },

    // =========================================================================
    // Common Button
    // =========================================================================
    iconButton: {
        width: 24, 
        height: 40, 
        alignItems: 'flex-end', 
        justifyContent: 'center',
    },
    iconDropDown: {
        width: 16, 
        height: 9,
    },
    iconSize: {
        width: 24, 
        height: 24,
    },
    // =========================================================================
    // Common For Icon
    // =========================================================================
    transactionIcon: {
        width: 16,
        height: 22,
    },
    bottom: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginBottom: 16
    }
});

export default Styles;
