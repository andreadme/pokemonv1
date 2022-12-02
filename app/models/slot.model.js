'use strict';
const pool = require("../config/db.config");

const Slot = function(values) {
    // this.id = values.id;
    this.trainer_id = values.trainerId;
    this.league_id = values.leagueId;
    this.pokemon_id = values.pokemonId;
    this.order_no = values.orderNo;
    this.slot_no = values.slotNo;
    this.total_attack_stat = values.totalAttackStat;
    this.total_defense_stat = values.totalDefenseStat;
    this.total_speed_stat = values.totalSpeedStat;
    this.total_per_slot = values.totalPerSlot;
    this.total_overall = values.totalOverall;
};

Slot.create = (values, result) => {
    console.log(values)
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO slots SET ? ON DUPLICATE KEY UPDATE pokemon_id=VALUES(pokemon_id), total_attack_stat=VALUES(total_attack_stat), total_defense_stat=VALUES(total_defense_stat), total_speed_stat=VALUES(total_speed_stat), total_per_slot=VALUES(total_per_slot), total_overall=VALUES(total_overall)', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

Slot.trainerSlots= (id, leagueId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM slots WHERE trainer_id = ? ORDER BY league_id, slot_no, order_no', [id, leagueId], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

module.exports= Slot;
