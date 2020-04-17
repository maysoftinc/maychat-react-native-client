import {
    AppStateEvent,
    BackPressEventName,
    Dimensions,
    Platform,
    StatusBar,
} from "react-native";
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

// import Strings from "./Strings";
// import DeviceInfo from "react-native-device-info";

// import Strings from "./Strings";

const { height, width } = Dimensions.get("window");
const IS_PLATFORM_IOS = Platform.OS === "ios";

const Constants = {

    /**
     * Config for api.
     */
    Api: {
        /** Root URL of Api Server */
        BASE_URL: "wss://chat.maysoft.io:3333/", // Server Real
        CLIENT_CERT: null,
        CLIENT_ID: null,
        CLIENT_KEY: null,
        /** Timeout for each request: 15sec */
        TIMEOUT: 15 * 1000,
    },

    /**
     * Styles for app.
     *
     * Color refer
     * @see https://www.rapidtables.com/web/color/index.html
     * @see https://www.w3schools.com/w3css/w3css_colors.asp
     */
    Styles: {
        // =====================================================================
        // Common color
        // =====================================================================
        BLACK_COLOR: "#000000",
        BLUE_COLOR: "#1E7BE6",
        GRAY_COLOR: "#808080",
        GREEN_COLOR: "#008000",
        LIGHTGRAY_COLOR: "#D3D3D3",
        RED_COLOR: "#FF0000",
        WHITE_COLOR: "#FFFFFF",

        // =====================================================================
        // Status color
        // =====================================================================
        DANGER_COLOR: "#F44336",
        INFO_COLOR: "#2196F3",
        SUCCESS_COLOR: "#4CAF50",
        WARNING_COLOR: "#FFEB3B",

        // =====================================================================
        // Text/Button/Background color
        // =====================================================================
        ACCENT_COLOR: "#341D5B",
        BACKGROUND_COLOR: "#FFFFFF",
        BOX_ELEVATION: 5,
        BOX_LINE_COLOR: "#CCCCCC",
        BOX_MODAL_RADIUS: 10,
        DEFAULT_COLOR: "#EEF6FF",
        MODAL_OVERLAY_TRANSPARENT_COLOR: "rgba(0, 0, 0, 0.4)",
        TRANSPARENT_COLOR: "rgba(0, 0, 0, 0)",
        PRIMARY_COLOR: "#082149",
        PALE_GRAY_COLOR: "#eef6ff",
        PRIMARY_DARK_COLOR: "#482880",
        YELLOW_COLOR: "#D8A962",
        PROGRESS_BAR_UNFILLED_COLOR: "rgba(247, 247, 247, 1)",
        LOADING_MODAL_COLOR: "rgba(0, 0, 0, 0.4)",
        STATUS_BAR_MODAL_COLOR: "rgba(0, 0, 0, 0.3)",
        STATUS_BAR_TRANSPARENT_COLOR: "rgba(0, 0, 0, 0.2)",
        TEXT_PRIMARY_COLOR: "#707987",
        TEXT_SUB_TITLE_COLOR: "#707987",
        TEXT_DEFAULT_COLOR: "#082149",
        TEXT_GRAY_COLOR: "#999999",
        TEXT_SUB_COLOR: "#CCCCCC",
        TEXT_INPUT_COLOR: "#F2F2F2",
        ERROR_COLOR: "#e02020",
        LIGHT_BLUE: "#EEF6FF",
        // =====================================================================
        // Text Item Title/Value Colr
        // =====================================================================
        ITEM_TITLE_COLOR: "#707987",
        ITEM_VALUE_COLOR: "#082149",
        ACCOUNT_TEXT_COLOR: "#082149",
        SEPERATOR_COLOR: "#F2F2F2",
        TEXT_OPTION_COLOR: "#333333",
        BORDER_COLOR: "#F2F2F2",
        // =====================================================================
        // Button style
        // =====================================================================
        BUTTON_ELEVATION: 2,
        TOUCH_OPACITY: 0.5,

        // =====================================================================
        // Font style
        // =====================================================================
        FONT_BOLD: IS_PLATFORM_IOS ? 'MyriadPro-Bold' : 'Myriad Pro Bold',

        FONT_BOLD_ITALIC: "MyriadPro-BoldItalic",

        FONT_ITALIC: "MyriadPro-Italic",

        FONT_REGULAR: IS_PLATFORM_IOS ? "MyriadPro-Regular" : "Myriad Pro Regular",

        FONT_SIZE_SMALL: 12,
        FONT_SIZE_DEFAULT: 14,
        FONT_SIZE_MEDIUM: 16,
        FONT_SIZE_LARGE: 22,
        FONT_SIZE_XLARGE: 26,
        FONT_SIZE_XXLARGE: 30,

        // =====================================================================
        // List or contain space size
        // =====================================================================
        HORIZONTAL_SPACE_SIZE: 16,
        HORIZONTAL_SPACE_SIZE_LARGE: 32,
        HORIZONTAL_SPACE_SIZE_SMALL: 8,
        VERTICAL_SPACE_SIZE: 20,
        VERTICAL_SPACE_SIZE_SMALL: 13,
        CONTENT_SPACE: 16,
        // =====================================================================
        // Height or padding
        // =====================================================================
        HEADER_HEIGHT: IS_PLATFORM_IOS ? 60 : (46 + (StatusBar.currentHeight || 0)),
        STATUS_BAR_HEIGHT: IS_PLATFORM_IOS ? 20 : (StatusBar.currentHeight || 0),
        HEADER_BACKGROUND_HEIGHT: (164 - 44) + StaticSafeAreaInsets.safeAreaInsetsTop,
        SAFE_AREA_INSETS: {
            bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
            top: StaticSafeAreaInsets.safeAreaInsetsTop,
            left: StaticSafeAreaInsets.safeAreaInsetsLeft,
            right: StaticSafeAreaInsets.safeAreaInsetsRight
        },

        // =====================================================================
        // Console log style
        // Color refer at: https://www.w3schools.com/w3css/w3css_colors.asp
        // =====================================================================
        CONSOLE_LOG_DONE_ERROR: "border: 2px solid #F44336; color: #000000", // Red
        CONSOLE_LOG_DONE_SUCCESS: "border: 2px solid #4CAF50; color: #000000", // Green
        CONSOLE_LOG_ERROR: "background: #F44336; color: #FFFFFF", // Red
        CONSOLE_LOG_NOTICE: "background: #FF9800; color: #000000; font-size: x-large", // Orange
        CONSOLE_LOG_PREPARE: "border: 2px solid #2196F3; color: #000000", // Blue
        CONSOLE_LOG_START: "background: #2196F3; color: #FFFFFF", // Blue
        CONSOLE_LOG_SUCCESS: "background: #4CAF50; color: #FFFFFF", // Green
    },

    /**
     * Icon name using for ControlIcon
     * Icon using in this app MaterialCommunityIcons
     * https://oblador.github.io/react-native-vector-icons/
     */
    IconName: {
        ARROW_LEFT: "arrow-left",
        EYE: "eye",
        EYE_OFF: "eye-off",
        HELP_BOX: "help-box",
    },

    /**
     * Regex Expression
     */
    RegExp: {
        /** https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript */
        EMAIL_ADDRESS: new RegExp(`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@`
            + `((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`),
        /** https://gist.github.com/HarishChaudhari/0dd5514ce430991a1b1b8fa04e8b72a4 */
        PASSWORD: new RegExp(`/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/`),
        PHONE_NUMBER: new RegExp(`^(09|01|08|03|07|05[0-9])+([0-9]{8,9})$`),
    },

    /**
     * Storage keys
     */
    StorageKeys: {
       VISITOR: "visitor"
    },

    /**
     * Width of device screen.
     */
    SCREEN_WIDTH: width,

    /**
     * Height of device screen.
     */
    SCREEN_HEIGHT: height,

    /**
     * Ratio for design layout.
     */
    RATIO: height / 896.0,

    /**
     * Debounce time for action
     */
    DEBOUNCE_TIME: 400,

    /**
     * Default setting information
     */
    // DefaultSettings: {
    //     /** Default language */
    //     LANGUAGE: Strings.getLanguage(),
    // },

    /**
     * Event name using for DeviceEventEmitter
     */
    EventName: {
        APP_STATE_CHANGE: "change" as AppStateEvent,
        HARDWARE_BACK_PRESS: "hardwareBackPress" as BackPressEventName,
        CHANGE_LANGUAGE: "CHANGE_LANGUAGE",
        CHANGE_SETTINGS: "CHANGE_SETTINGS",
    },

    DateFormat: {
        DMY: "D/M/Y",
        DDMMYY: "DD/MM/YYYY",
        YMD: "YMMDD",
        API_YMD: "YYYYMMDD",
        API_YMD_REGISTER: "YYYY-MM-DD",
        API_YYYY_MM_DD: "YYYY-MM-DD",
        DDMMYYYY_HHMM: "DD/MM/YYYY HH:mm",
    },
};

export default Constants;
