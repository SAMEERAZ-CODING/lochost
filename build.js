const builder = require('electron-builder')
const Platform = builder.Platform

function getCurrentPlatform(){
    switch(process.platform){
        case 'win32':
            return Platform.WINDOWS
        case 'darwin':
            return Platform.MAC
        case 'linux':
            return Platform.linux
        default:
            console.error('What is your platform ?')
            return undefined
    }
}

builder.build({
    targets: (process.argv[2] != null && Platform[process.argv[2]] != null ? Platform[process.argv[2]] : getCurrentPlatform()).createTarget(),
    config: {
        appId: 'LocHost',
        productName: 'Lochost',
        artifactName: '${productName}-setup-${version}.${ext}',
        copyright: 'Copyright © 2021 East Wind Apps',
        directories: {
            buildResources: 'build',
            output: 'dist'
        },
        win: {
            target: [
                {
                    target: 'nsis',
                    arch: 'x64'
                }
            ]
        },
        nsis: {
            oneClick: false,
            perMachine: false,
            allowElevation: true,
            allowToChangeInstallationDirectory: true
        },
        mac: {
            target: 'dmg',
            category: 'public.app-category.developer-tools'
        },
        linux: {
            target: 'AppImage',
            maintainer: 'stereo18',
            vendor: 'stereo18',
            synopsis: 'Easy http server',
            description: 'A simple HTTP/CSS/JS localhost server',
            category: 'Utility'
        },
        compression: 'maximum',
        files: [
            '!{dist,.gitignore,.vscode,docs,dev-app-update.yml,.travis.yml,.nvmrc,.eslintrc.json,build.js,iconpack}'
        ],
        extraResources: [
            'libraries'
        ],
        asar: true
    }
}).then(() => {
    console.log('Build is complete !')
}).catch(err => {
    console.error('There is error during build ! \n\n', err)
})