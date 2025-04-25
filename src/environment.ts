const mode = import.meta.env.MODE;

type EnvironmentType = {
    SERVER_DOMAIN: string;
}

const ENVIRONMENTS: Record<string, EnvironmentType> = {
    local: {
        SERVER_DOMAIN: 'http://127.0.0.1:3000/'
    },
    development: {
        SERVER_DOMAIN: 'http://54.149.79.79:3000/'
    },
    staging: {
        SERVER_DOMAIN: 'http://54.149.79.79:3000/'
    },
    production: {
        SERVER_DOMAIN: 'https://api.instacredits.co/'
    },
}

const ENVIRONMENT: EnvironmentType = ENVIRONMENTS[mode] || ENVIRONMENTS.local;

export default ENVIRONMENT;