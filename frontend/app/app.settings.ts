const isProduction = false;

const DOMAINS = {
    production: "ec2-13-217-166-117.compute-1.amazonaws.com",
    local: "localhost"
};

const PORTS = {
    production: 8000,
    local: 8000
};

const BACKEND_DOMAIN = isProduction ? DOMAINS.production : DOMAINS.local;
const BACKEND_PORT = isProduction ? PORTS.production : PORTS.local;
const BACKEND_URL = `http://${BACKEND_DOMAIN}:${BACKEND_PORT}`;

export const settings = {
    rebotWebsocket: {
        isUserVisible: false,
        value: `ws://${BACKEND_URL}/ws/rebot`
    },
    apiBaseUrl: {
        isUserVisible: false,
        value: BACKEND_URL
    },
    authEndpoints: {
        isUserVisible: false,
        value: {
            login: "/login",
            signupStepOne: "/signup/step-one",
            signupStepTwo: "/signup/step-two",
            forgotPassword: "/forget-password",
            resetPassword: "/reset-password"
        }
    }
};