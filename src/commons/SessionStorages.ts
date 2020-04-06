import Helpers from "./Helpers";

/**
 * SessionStorages.ts
 *
 * Support for get/set data in a session.
 */
class SessionStorages {

    // =========================================================================
    // Static function
    // =========================================================================
    public static instance = new SessionStorages();

    /**
     * Clear all data in session store.
     */
    public static clear = () => {
        SessionStorages.instance.clear();
    }

    /**
     * Remove data stored in session store by key.
     *
     * @param {string} key Key
     */
    public static remove = (key: string) => {
        SessionStorages.instance.remove(key);
    }

    /**
     * Get data stored in session store by key.
     *
     * @param {string} key Key
     * @param {any} defaultValue Value return if null
     * @returns {object} Object data, if not exist return null
     */
    public static get = (key: string, defaultValue?: any): any => {
        return SessionStorages.instance.get(key, defaultValue);
    }

    /**
     * Set data to session store.
     *
     * @param {string} key Key
     * @param {any} value Object data
     */
    public static set = (key: string, value: any) => {
        SessionStorages.instance.set(key, value);
    }

    // debugLog: boolean = __DEV__;
    private debugLog: boolean = false;

    private stored: any;

    constructor() {
        // init store object
        this.stored = {};
    }

    /**
     * Print all stored data to console
     */
    private logAllStored = () => {
        if (this.debugLog) {
            console.log("SessionStorages#_logAllStored", this.stored);
        }
    }

    /**
     * Clear all data in session store.
     * @see https://stackoverflow.com/questions/684575/how-to-quickly-clear-a-javascript-object
     */
    private clear = () => {
        if (this.debugLog) {
            console.log(`SessionStorages#clear`);
        }
        // for all properties of shallow/plain object
        for (const key in this.stored) {
            // this check can be safely omitted in modern JS engines
            if (this.stored.hasOwnProperty(key)) {
                delete this.stored[key];
            }
        }
        this.logAllStored();
    }

    /**
     * Remove data stored in session store by key.
     *
     * @param {string} key Key
     */
    private remove = (key: string) => {
        if (this.debugLog) {
            console.log(`SessionStorages#remove(key): key=${key}`);
        }
        if (this.stored.hasOwnProperty(key)) {
            delete this.stored[key];
        }
        this.logAllStored();
    }

    /**
     * Get data stored in session store by key.
     *
     * @param {string} key Key
     * @param {any} defaultValue Value return if null
     * @returns {object} Object data, if not exist return null
     */
    private get = (key: string, defaultValue?: any): any => {
        let result: any = null;
        if (this.stored.hasOwnProperty(key)) {
            result = this.stored[key];
        } else if (!Helpers.isNullOrEmpty(defaultValue)) {
            result = defaultValue;
        }
        if (this.debugLog) {
            console.log(`SessionStorages#get(key): key=${key}, result=`, result);
        }
        return result;
    }

    /**
     * Set data to session store.
     *
     * @param {string} key Key
     * @param {any} value Object data
     */
    private set = (key: string, value: any) => {
        if (this.debugLog) {
            console.log(`SessionStorages#set(key, str): key=${key}, value=`, value);
        }
        this.stored[key] = value;
        this.logAllStored();
    }
}

export default SessionStorages;
