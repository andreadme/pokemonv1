'use strict';
const pool = require("../config/db.config");

const Slot = function(values) {
    // this.id = values.id;
    this.trainer_id = values.trainerId;
    this.league_id = values.leagueId;
    this.pokemon_id = values.pokemonId;
    this.order_no = values.orderNo;
    this.slot_no = values.slotNo;
};

Slot.create = (values, result) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO slots SET ? ON DUPLICATE KEY UPDATE pokemon_id=VALUES(pokemon_id)', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

Slot.trainerSlots= (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM slots WHERE trainer_id = ? ORDER BY league_id, slot_no, order_no', [id], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

module.exports= Slot;
