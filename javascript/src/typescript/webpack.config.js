const path = require('path');
const crypto = require('crypto');
const cryptoOrigCreateHash = crypto.createHash;
crypto.createHash = algorithm => cryptoOrigCreateHash(algorithm === 'md4' ? 'sha256' : algorithm);

var server = {
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { transpileOnly: true }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    output: {
        filename: 'server.js',
        library: 'workspace-telemetry-client',
        libraryTarget: 'umd',
        globalObject: 'this',
        path: path.resolve(__dirname, 'dist')
    }
};

var client = {
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { transpileOnly: true }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'web',
    output: {
        filename: 'client.js',
        library: 'workspace-telemetry-client',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = [client, server];
