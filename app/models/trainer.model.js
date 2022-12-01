'use strict';
const pool = require("../config/db.config");

const Trainer = function(values) {
    // this.id = values.id;
    this.full_name = values.fullName;
    this.username = values.username;
    this.email = values.email;
    this.password = values.password;
};

Trainer.register = (values, result) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO trainers SET ?', values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

Trainer.login = function (username) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM trainers WHERE username = ?', [username], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

Trainer.getAll = (values, result) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM trainers', (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

module.exports= Trainer;
