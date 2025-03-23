/**
 * App Configuration
 * -----------------
 * This file contains all development-level app configurations.
 * Not to be confused with user-configurable app settings like theme preferences.
 * 
 * Note:
 *  To connect to a local backend instead of production: Set isProduction to false
 */
const isProduction = false;

const DOMAINS = {
    production: "ec2-13-217-166-117.compute-1.amazonaws.com",
    local: "10.0.2.2"
};

const PORTS = {
    production: 8000,
    local: 8000
};

const BACKEND_DOMAIN = isProduction ? DOMAINS.production : DOMAINS.local;
const BACKEND_PORT = isProduction ? PORTS.production : PORTS.local;
const BACKEND_URL = `${BACKEND_DOMAIN}:${BACKEND_PORT}`;

interface Setting {
    isUserVisible: boolean;
    value: string | number | object;
}

interface Settings {
    [key: string]: Setting;
}

export const settings: Settings = {
    rebotWebsocket: {
        isUserVisible: false,
        value: `ws://${BACKEND_URL}/ws/rebot`
    },
    authEndpoints: {
        isUserVisible: false,
        value: {
            token: `http://${BACKEND_URL}/api/token/`,
            tokenRefresh: `http://${BACKEND_URL}/api/token/refresh/`,
            login: `http://${BACKEND_URL}/login`,
            signupStepOne: `http://${BACKEND_URL}/signup/step-one`,
            signupStepTwo: `http://${BACKEND_URL}/signup/step-two`,
            forgotPassword: `http://${BACKEND_URL}/forget-password/`,
            resetPassword: `http://${BACKEND_URL}/reset-password`,
        }
    }
};
