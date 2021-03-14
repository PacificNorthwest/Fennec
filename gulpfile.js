const { series } = require('gulp');
const { exec } = require('child_process');
const { ncp } = require('ncp');

const rimraf = require('rimraf');
const fs = require('fs');

const BUILD_LOCATION = 'extension';

function setupBuildLocation(cb) {
    console.log('\n');
    console.log('--------------------------------');
    if (fs.existsSync(BUILD_LOCATION)) {
        console.log('Cleaning build location...');
        rimraf(`${BUILD_LOCATION}/*`, () => {
            console.log('Done');
            console.log('--------------------------------');
            console.log('\n');
            cb();
        });

    } else {
        console.log('Creating build location...');
        fs.mkdirSync(BUILD_LOCATION);
        console.log('Done');
        console.log('--------------------------------');
        console.log('\n');
    }
}

function buildClient(cb) {
    console.log('\n');
    console.log('--------------------------------');
    const buildProcess = exec('npm run build --prefix page');
    buildProcess.stdout.on('data', data => console.log(data.toString()));
    buildProcess.stderr.on('data', data => console.error(data.toString()));
    buildProcess.on('exit', code => {
        console.log(`Finished building with code: ${code}`);
        console.log('--------------------------------');
        console.log('\n');
        cb();
    });
}

async function moveArtifacts(cb) {
    const cpOptions = {
        clobber: true,
        stopOnErr: true
    };

    const handleResult = err => {
        if (err) {
            console.error(err);
            cb();
        } else {
            console.log('Copied...');
        }
    }

    console.log('\n');
    console.log('--------------------------------');
    console.log('Moving artifacts');

    handleResult(await new Promise(resolve => ncp('page/build', BUILD_LOCATION, cpOptions, resolve)));
    handleResult(await new Promise(resolve => ncp('manifest.json', `${BUILD_LOCATION}/manifest.json`, cpOptions, resolve)));
    handleResult(await new Promise(resolve => ncp('main.js', `${BUILD_LOCATION}/main.js`, cpOptions, resolve)));
    
    console.log('Done');
    console.log('--------------------------------');
    console.log('\n');
    cb();
}

exports.build = series(
    setupBuildLocation,
    buildClient,
    moveArtifacts
);