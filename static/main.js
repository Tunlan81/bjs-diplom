'use strict'

class Profile {
    constructor(user) {
        this.username = user.username;
        this.name = user.name;
        this.password = user.password;    
    }

    createUser({ username, name: { firstName, lastName }, password }, callback) {
        return ApiConnector.createUser({ username, name: { firstName, lastName }, password }, (err, data) => {
            console.log(`Adding ${username}`);
            callback(err, data);
        });
    }

    performLogin({ username, password }, callback) {
        return ApiConnector.performLogin({ username, password }, (err, data) => {
            console.log(`Logging ${username}`);
            callback(err, data);
        });
    }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Converting ${targetAmount} of ${targetCurrency} from ${fromCurrency}`);
            callback(err, data);
        });
    }

    transferMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Transferring ${amount} to ${to}`);
            callback(err, data);
        });
    }
}

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
                console.log(`Downloading the rates`);
                callback(err, data);
        });
}

function main() {
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });

    const Petr = new Profile({
                    username: 'petr',
                    name: { firstName: 'Petr', lastName: 'Barashev' },
                    password: 'petrspass',
                });
                

            
    Ivan.createUser( Ivan, (err, data) => {
        if (err) {
            console.error('Failed to create user Ivan');
        } else {
            console.log(`Created user Ivan`);

            Ivan.performLogin({ username: Ivan.username, password: Ivan.password}, (err, data) => {
                if (err) {
                    console.error('Failed login with Ivan');
                } else {
                    console.log(`Successful login with Ivan`);

                    Ivan.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => {
                        if (err) {
                            console.error('Error during adding money to Ivan');
                        } else {
                            console.log(`Added 500000 euros to Ivan`);

                            getStocks((err, rates) => {
                                if (err) {
                                    console.error('Error during rates download');
                                } else {
                                    console.log(`Here are the rates`);
                                    
                                    let targetAmount = 500000 * rates[99].EUR_NETCOIN;
                                    console.log(rates[99].EUR_NETCOIN);
                                    console.log(targetAmount);

                                    Ivan.convertMoney({ fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: targetAmount }, (err, data) => {
                                        if (err) {
                                            console.error(`Failed to convert`);
                                        } else {
                                            console.log(`Converted EUR to NETCOIN`);

                                            Petr.createUser( Petr, (err, data) => {
                                                if (err) {
                                                    console.error('Failed to create user Petr');
                                                } else {
                                                    console.log(`Created user Petr`);

                                                    Ivan.transferMoney({ to: 'petr', amount: targetAmount }, (err, data) => {
                                                        if (err) {
                                                            console.error(`Failed to transfer money`);
                                                        } else {
                                                            console.log(`Transfered money`);
                                                    }}); 
                                            }});
                                    }}); 
                            }});
                    }});
            }});
    }});    
}

main();