import { Platform } from "react-native";

/**
 * Helpers.ts
 *
 * Common function for app.
 */
const Helpers = {

    /**
     * Check is iOS device.
     *
     * @returns {boolean} TRUE if device is iOS, otherwise return FALSE
     */
    isIOS: (): boolean => {
        return Platform.OS === "ios";
    },

    /**
     * Check is Android device.
     *
     * @returns {boolean} TRUE if device is Android, otherwise return FALSE
     */
    isAndroid: (): boolean => {
        return Platform.OS === "android";
    },

    /**
     * Check value is string or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is string true. Otherwise it returns false.
     */
    isString: (value: any): value is string => {
        return typeof value === "string";
    },

    /**
     * Check value is object or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is object true. Otherwise it returns false.
     */
    isObject: (value: any): value is object => {
        return typeof value === "object";
    },

    /**
     * Determine if the argument passed is a JavaScript function object.
     *
     * @param {any} obj: Object to test whether or not it is an array.
     * @returns {boolean} returns a Boolean indicating whether the object is a JavaScript function
     */
    isFunction: (value: any): value is (...args: any) => void => {
        return typeof value === "function";
    },

    /**
     * Check a value is number or non, if number then return true, otherwise return false.
     *
     * @param {string} value: Value can check number
     * @returns {boolean} if number then return true, otherwise return false.
     */
    isNumber: (value: any): value is number => {
        return typeof value === "number";
    },

    /**
     * Check Object is null or String null or empty.
     *
     * @param {object | string} value Object or String
     * @returns {boolean} if null or empty return true, otherwise return false.
     */
    isNullOrEmpty: (value: any): value is undefined | boolean => {
        return value === undefined || value === null || value === "";
    },

    /**
     * Trim space character (start, end) of input string.
     *
     * @param {string} value: Value for trim
     * @returns {string} String after trim, space start & end is removed
     */
    trim: (value: string): string => {
        return Helpers.isString(value) ? value.trim() : "";
    },

    /**
     * If value is string return value, otherwise return value.toString
     *
     * @param {string} value: Value
     * @returns {string} String or convert of value to string
     */
    ensureString: (value: any): string => {
        try {
            if (!Helpers.isNullOrEmpty(value)) {
                if (Helpers.isString(value)) {
                    return value;
                } else if (Helpers.isObject(value)) {
                    return JSON.stringify(value);
                } else {
                    return `${value}`;
                }
            }
        } catch (error) {
            return "";
        }
        return "";
    },

    /**
     * Copy object properties to another object
     *
     * @param {any} sourceObj Object
     * @param {any} distObj Object
     */
    copyProperties: (sourceObj: any, distObj: any) => {
        for (const key in sourceObj) {
            if (!sourceObj.hasOwnProperty(key)) {
                continue;
            }
            const sourceObjData: any = sourceObj[key];
            if (!Helpers.isNullOrEmpty(sourceObjData)) {
                if (Array.isArray(sourceObjData)) {
                    const distObjData: any = [];
                    Helpers.copyProperties(sourceObjData, distObjData);
                    distObj[key] = distObjData;
                    continue;
                }
                if (Helpers.isObject(sourceObjData)) {
                    const distObjData: any = {};
                    Helpers.copyProperties(sourceObjData, distObjData);
                    distObj[key] = distObjData;
                    continue;
                }
            }
            distObj[key] = sourceObjData;
        }
    },

    /**
     * Clone object
     *
     * @param {T} sourceObj Object
     */
    cloneObject: <T>(sourceObj: T): T => {
        const cloneObj: T = {} as T;
        Helpers.copyProperties(sourceObj, cloneObj);
        return cloneObj;
    },

    formatTime: (date?: Date | number): string => {
        console.log("Date", date);
        let h = "";
        let m = "";
        let s = "";
        if (date) {
            if (Helpers.isNumber(date)) {
                h = "" + new Date(date).getHours();
                m = "" + new Date(date).getMinutes();
                s = "" + new Date(date).getSeconds();
            }
            else {
                h = "" + date.getHours();
                m = "" + date.getMinutes();
                s = "" + date.getSeconds();
            }
            if (h.length < 2) {
                h = "0" + h;
            }
            if (m.length < 2) {
                m = "0" + m;
            }
            if (s.length < 2) {
                s = "0" + s;
            }
            return h + ":" + m + ":" + s;
        }
        return "";
    },

    removeSpecialString: (alias: string): string => {
        var str = alias;
        str = str.replace("à", "af");
        str = str.replace("á", "as");
        str = str.replace("ả", "ar");
        str = str.replace("ã", "ax");
        str = str.replace("ạ", "aj");

        str = str.replace("â", "aa");
        str = str.replace("ă", "aw");

        str = str.replace("À", "Af");
        str = str.replace("Á", "As");
        str = str.replace("Ả", "Ar");
        str = str.replace("Ã", "Ax");
        str = str.replace("Ạ", "Aj");

        str = str.replace("Â", "Aa");
        str = str.replace("Ă", "Aw");


        str = str.replace("è", "ef");
        str = str.replace("é", "es");
        str = str.replace("ẻ", "er");
        str = str.replace("ẽ", "ex");
        str = str.replace("ẹ", "ej");

        str = str.replace("ê", "ee");

        str = str.replace("È", "Ef");
        str = str.replace("É", "Es");
        str = str.replace("Ẻ", "Er");
        str = str.replace("Ẽ", "Ex");
        str = str.replace("Ẹ", "Ej");

        str = str.replace("Ê", "Ee");


        str = str.replace("ì", "if");
        str = str.replace("í", "is");
        str = str.replace("ỉ", "ir");
        str = str.replace("ĩ", "ix");
        str = str.replace("ị", "ij");

        str = str.replace("Ì", "If");
        str = str.replace("Í", "Is");
        str = str.replace("Ỉ", "Ir");
        str = str.replace("Ĩ", "Ix");
        str = str.replace("Ị", "Ij");

        str = str.replace("ù", "uf");
        str = str.replace("ú", "us");
        str = str.replace("ủ", "ur");
        str = str.replace("ũ", "ux");
        str = str.replace("ụ", "uj");

        str = str.replace("ư", "uw");

        str = str.replace("Ù", "Uf");
        str = str.replace("Ú", "Us");
        str = str.replace("Ủ", "Ur");
        str = str.replace("Ũ", "Ux");
        str = str.replace("Ụ", "Uj");

        str = str.replace("Ư", "Uw");

        str = str.replace("ò", "of");
        str = str.replace("ó", "os");
        str = str.replace("ỏ", "or");
        str = str.replace("õ", "ox");
        str = str.replace("ọ", "oj");

        str = str.replace("ô", "oo");
        str = str.replace("ơ", "ow");

        str = str.replace("Ò", "Of");
        str = str.replace("Ó", "Os");
        str = str.replace("Ỏ", "Ox");
        str = str.replace("Õ", "Ox");
        str = str.replace("Ọ", "Oj");

        str = str.replace("Ô", "Oo");
        str = str.replace("Ơ", "Ow");

        str = str.replace("ỳ", "yf");
        str = str.replace("ý", "ys");
        str = str.replace("ỷ", "yx");
        str = str.replace("ỹ", "yx");
        str = str.replace("ỵ", "yj");

        str = str.replace("Ỳ", "Yf");
        str = str.replace("Ý", "Ys");
        str = str.replace("Ỷ", "Yr");
        str = str.replace("Ỹ", "Yx");
        str = str.replace("Ỵ", "Yj");

        str = str.replace("đ", "dd");
        str = str.replace("Đ", "Dd");

        str = str.replace(/!|@|%|\•|\√|\π|\÷|\×|\¶|\∆|\£|\¢|\€|\¥|\°|\©|\®|\™|\℅|\^|\*|\+|\=|\<|\>|\?|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, "");
        str = str.replace(/ + /g, "");
        // str = str.trim();

        return str;
    },
    removeVietNamese: (alias: string): string => {
        var str = alias;
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.trim();
        return str;
    },
};

export default Helpers;
