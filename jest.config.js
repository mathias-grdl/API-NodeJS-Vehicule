export default {
    transform: {
        '^.+\\.js$': ['babel-jest']
    },
    testEnvironment: 'node',
    transformIgnorePatterns: [
        '/node_modules/(?!mongodb|bson)/'
    ],
    moduleFileExtensions: ['js', 'json']
};
