const options = {
    debounceTime: 1000,
    dateFormat: 'DD.MM.YYYY',
    dateTimeFormat: 'DD.MM.YYYY HH:mm',
};

const config = {
    production: {
        API_URL: 'http://192.168.1.26:24/api/v2/', //http://192.168.1.26:24/api/v2/
        options,
    },
    staging: {
        API_URL: 'https://dev-api.tastesonway.com/api/v2/',
        options,
    },
    local: {
        API_URL: 'http://localhost/taste-on-way-api/public/api/v2/',
        options,
    },
};

export const allConfig = config;

const environmentConfig = 'staging';

export default config[environmentConfig] ?? config.production;
