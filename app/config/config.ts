function globalVariable(varName: any, defaultValue: any) {
    try {
        return window[varName] || defaultValue
    } catch {
        // @eslint-ignore
        return process.env[varName] || defaultValue
    }
}

const NODE_ENV = globalVariable('NODE_ENV', 'development')
const HOST = globalVariable('HOST', 'localhost')
const APIHOST = globalVariable('APIHOST', 'localhost')
const PORT = globalVariable('PORT', 3000)
const APIPORT = globalVariable('APIPORT', 3000)
const APIVERSION = globalVariable('APIVERSION', 'v1')

const production = {
    environment: 'production',
    s3BaseUrl: 'https://youmee-th.s3.ap-southeast-1.amazonaws.com/',
    cdnBaseUrl: 'https://d1ljz7er88cmtt.cloudfront.net/',
    website: 'https://admin.youmee.info',
    emailAddress: 'noreply@youmee.info',
}

const development = {
    environment: 'development',
    s3BaseUrl: 'https://youmee-th.s3.ap-southeast-1.amazonaws.com/',
    cdnBaseUrl: 'https://d1ljz7er88cmtt.cloudfront.net/',
    emailAddress: 'noreply@youmee.info',
}

const localdev = {
    ...development,
}

const test = {
    ...localdev,
}

const configurations: any = {
    localdev,
    test,
    development,
    production,
}

export function getConfig(environment = NODE_ENV) {
    return Object.assign(
        {
            environment,
            company: 'Youmee',
            host: HOST,
            port: PORT,
            apiHost: APIHOST,
            apiPort: APIPORT,
            apiVersion: APIVERSION,
            baseUrl: `http://${HOST}:${PORT}`,
            apiBaseUrl: `http://${APIHOST}:${APIPORT}/api/${APIVERSION}`,
        },
        configurations[environment]
    )
}

export const config = getConfig()
