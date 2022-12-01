'use strict';
const pool = require("../config/db.config");

const Pokemon = function(values) {
    // this.id = values.id;
    this.name = values.name;
    this.trainer_id = values.trainerId;
    this.type = values.type;
    this.attack_stat = values.attackStat;
    this.defense_stat = values.defenseStat;
    this.speed_stat = values.speedStat;
};

Pokemon.create = (values, result) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO pokemons SET ?', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

Pokemon.get = function (id, result) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pokemons WHERE id = ?', id, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
};

Pokemon.getAll = (values, result) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pokemons', (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

Pokemon.trainerPokemons= (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pokemons WHERE trainer_id = ?', [id], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

module.exports= Pokemon;
