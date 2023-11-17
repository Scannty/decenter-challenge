# Decenter Challenge

This app queries Maker DAO smart contracts and displays info about CDPs.

## How to run

First install the necessary packages by running:

```
    npm install
```

Then to run the project type in command line:

```
    npm start
```

## How to use

The user should choose a collateral type and a CDP ID, and the app will return information for the 20 closest CDPs that match the given collateral type.

### Technical Note

The bulk of the logic is located in the [Web3Client.js](./src/utils/Web3Client.js).

### PS

Pozz za Decenter :D
