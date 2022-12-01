'use strict';
const pool = require("../config/db.config");

const League = function(values) {
    // this.id = values.id;
    this.title = values.title;
    this.location = values.location;
    this.terrain = values.terrain;
    this.start_date = values.startDate;
    this.slots = values.slots;
    this.max_stats_limit = values.maxStatsLimit;
};

League.create = (values, result) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO leagues SET ?', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

League.get = (id, result) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM leagues WHERE id = ?', [id], (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

League.getAll = (values, result) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM leagues', (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

module.exports= League;
