const Slot = require("../models/slot.model.js")
const League = require("../models/league.model.js")
const Pokemon = require("../models/pokemon.model.js");

// create and save a new slot
exports.create = async (req, res, next) => {
    try { 
        const trainerId = JSON.parse(req.body.trainerId);
        const leagueId = JSON.parse(req.body.leagueId);
        let firstSlot = req.body.firstSlotData;
        let secondSlot = req.body.secondSlotData;

        // first slots
        firstSlot = firstSlot.replace(/'/g, '"');
        let firstSlotArr = JSON.parse(firstSlot);
        for (let i = 0; i < firstSlotArr.length; i++) {
            await Slot.create({
                trainer_id: trainerId,
                league_id: leagueId,
                pokemon_id: firstSlotArr[i].pokemonId,
                slot_no: firstSlotArr[i].slotNo,
                order_no: firstSlotArr[i].orderNo,
            });
        }

        // second slots
        secondSlot = secondSlot.replace(/'/g, '"');
        let secondSlotArr = JSON.parse(secondSlot);
        for (let i = 0; i < secondSlotArr.length; i++) {
            await Slot.create({
                trainer_id: trainerId,
                league_id: leagueId,
                pokemon_id: secondSlotArr[i].pokemonId,
                slot_no: secondSlotArr[i].slotNo,
                order_no: secondSlotArr[i].orderNo,
            });
        }

        res.status(200).json({
            success: true,
            message: "You have successfully registered.",
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e
        });
    }
}

// retrieve a trainer with its slots
exports.getTrainerSlots = async (req, res, next) => {
    try {


        let leagueObj = [];
        let leagueNames = await League.getAll();

        for (let i = 0; i < leagueNames.length; i++) {
            let slotsArr = [];
            let allSlots = {};
            let index = 0;
            while ( index < req.slots.length) {
                let league = await League.get(req.slots[index].league_id);
                if (req.slots[index].pokemon_id !== 0 && leagueNames[i].title === league[0].title) {
                    console.log(req.slots[index])
                    let pokemon = await Pokemon.get(req.slots[index].pokemon_id);
                    let allSlots = {};
                    if (req.slots[index].order_no === 1) {
                        allSlots["firstPokemon"] = { 'leagueId': req.slots[index].league_id, 'slotNo': req.slots[index].slot_no, 'pokemonName': pokemon[0].name, 'orderNo': req.slots[index].order_no }

                        if (req.slots[index+1].slot_no === req.slots[index].slot_no && parseInt(req.slots[index+1].order_no) === 2 && req.slots[index+1].pokemon_id !== 0 && leagueNames[i].title === league[0].title) {
                            let pokemon = await Pokemon.get(req.slots[index+1].pokemon_id);
                            allSlots.secondPokemon = { 'leagueId': req.slots[index+1].league_id, 'slotNo': req.slots[index].slot_no, 'pokemonName': pokemon[0].name, 'orderNo': req.slots[index+1].order_no }
                            ++index;
                        }
                        slotsArr.push(allSlots)
                    }
                }
                index++;
            }

            leagueObj.push({'leagueId': leagueNames[i].id, 'leagueName': leagueNames[i].title, 'startDate': leagueNames[i].start_date, 'slots': slotsArr})
        }

        res.status(200).json({
            success: true,
            data: leagueObj
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e
        });
    }
}
