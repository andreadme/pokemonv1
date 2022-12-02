'use strict';
const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,    // the number of connections node.js will hold open to our database
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

//create trainers table
pool.query('CREATE TABLE IF NOT EXISTS `trainers` (' +
    'id BIGINT NOT NULL AUTO_INCREMENT,' +
    'full_name VARCHAR(255) NOT NULL,' +
    'username VARCHAR(255) NOT NULL,' +
    'email VARCHAR(255) NOT NULL,' +
    'password VARCHAR(255) NOT NULL,' +
    'is_admin TINYINT(1) NOT NULL DEFAULT 0,' +
	'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
	'updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
	'PRIMARY KEY (`id`),' +
    'UNIQUE KEY `uni_trainer` (`username`, `email`))', function (err, result) {
        if (err) throw err;
        console.log("trainers table created");
    }
);

//create leagues table
pool.query('CREATE TABLE IF NOT EXISTS `leagues` (' +
    'id BIGINT NOT NULL AUTO_INCREMENT,' +
    'title VARCHAR(255) NOT NULL,' +
	'location VARCHAR(255) NOT NULL,' +
	'terrain VARCHAR(255) NOT NULL,' +
	'start_date DATE NOT NULL,' +
	'slots INT NOT NULL,' +
    'max_stats_limit INT NOT NULL,' +
	'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
	'updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
    'PRIMARY KEY (`id`),' +
    'UNIQUE KEY `uni_title` (`title`))', function (err, result) {
        if (err) throw err;
        console.log("leagues table created");
    }
);

//create pokemons table
pool.query('CREATE TABLE IF NOT EXISTS `pokemons` (' +
    'id BIGINT NOT NULL AUTO_INCREMENT,' +
    'trainer_id BIGINT NULL,' +
	'name VARCHAR(255) NOT NULL,' +
	'type VARCHAR(255) NOT NULL,' +
	'attack_stat INT NOT NULL,' +
	'defense_stat INT NOT NULL,' +
	'speed_stat INT NOT NULL,' +
	'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
	'updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
	'PRIMARY KEY (`id`),' +
    'UNIQUE KEY `uni_name` (`name`, `trainer_id`),' +
    'FOREIGN KEY (trainer_id) references trainers(id))', function (err, result) {
        if (err) throw console.log(err);
        console.log("pokemons table created");
    }
);

//create slots table
pool.query('CREATE TABLE IF NOT EXISTS slots (' +
    'id BIGINT NOT NULL AUTO_INCREMENT,' +
    'trainer_id BIGINT NOT NULL,' +
    'league_id BIGINT NOT NULL,' +
    'pokemon_id BIGINT NOT NULL,' +
    'order_no INT NOT NULL,' +
    'slot_no INT NOT NULL,' +
	'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
	'updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
	'PRIMARY KEY (`id`),' +
    'UNIQUE KEY `uni_slot` (`trainer_id`, `league_id`, `slot_no`, `order_no`),' +
    'FOREIGN KEY (trainer_id) references trainers(id),' +
    'FOREIGN KEY (league_id) references leagues(id))', function (err, result) {
        if (err) throw err;
        console.log("slots table created");
    }
);


// pool.query(`INSERT INTO trainers (full_name, username, email, password, is_admin) SELECT * FROM (SELECT 'Admin', 'superadmin', 'admin@mail.com', '$2a$12$mQRKSk7W/zmku20GkHaXmuq7aWPktwcqGt7ONTCkMeWPB5eerv8Om', 1) AS tmp WHERE NOT EXISTS (SELECT username FROM trainers WHERE username = 'ashketchum' ORDER BY id) LIMIT 1;`, function (err, result) { if (err) throw err;
//     console.log("trainer is created");
// }
// );

// pool.query(`INSERT INTO trainers (full_name, username, email, password, is_admin) SELECT * FROM (SELECT 'Ash Ketchum', 'ashketchum', 'askketchum@mail.com', '$2a$12$hWHqHXOtzSPFoyBaeOnzvOHlyIhe0JGf7iyry5By5kNmaechy6Tfi', 0) AS tmp WHERE NOT EXISTS (SELECT username FROM trainers WHERE username = 'ashketchum' ORDER BY id) LIMIT 1;`, function (err, result) { if (err) throw err;
//         console.log("trainer is created");
//     }
// );


// pool.query(`INSERT INTO leagues (title, location, terrain, start_date, slots, max_stats_limit) SELECT * FROM (SELECT 'Indigo', 'Indigo Plateau', 'Desert', '2023-03-25', 5, 2000) AS tmp WHERE NOT EXISTS (SELECT title FROM leagues WHERE title = 'Indigo' ORDER BY id) LIMIT 1;`, function (err, result) { if (err) throw err; console.log("league is created"); }
// );

// pool.query(`INSERT INTO leagues (title, location, terrain, start_date, slots, max_stats_limit) SELECT * FROM (SELECT 'Silver', 'Johto', 'Jungle', '2023-03-25', 3, 2000) AS tmp WHERE NOT EXISTS (SELECT title FROM leagues WHERE title = 'Silver' ORDER BY id) LIMIT 1;`, function (err, result) { if (err) throw err;
//         console.log("league is created");
//     }
// );

// pool.query(`INSERT INTO leagues (title, location, terrain, start_date, slots, max_stats_limit) SELECT * FROM (SELECT 'Sinnoh', 'Sinnoh Region', 'Open Sea', '2023-03-25', 4, 2000) AS tmp WHERE NOT EXISTS (SELECT title FROM leagues WHERE title = 'Sinnoh' ORDER BY id) LIMIT 1;`, function (err, result) { if (err) throw err;
//         console.log("league is created");
//     }
// );

// pool.query(`INSERT INTO pokemons (trainer_id, name, type, attack_stat, defense_stat, speed_stat) SELECT * FROM (SELECT 1, 'Pikachu', 'Electric', 230, 300, 405) AS tmp WHERE NOT EXISTS (SELECT name FROM pokemons WHERE name = 'Pikachu' ORDER BY id) LIMIT 1;`, function (err, result) { if (err) throw err;
//         console.log("pokemon is created");
//     }
// );

// pool.query(`INSERT INTO pokemons (trainer_id, name, type, attack_stat, defense_stat, speed_stat) SELECT * FROM (SELECT 1, 'Charizard', 'Fire', 450, 280, 500) AS tmp WHERE NOT EXISTS (SELECT name FROM pokemons WHERE name = 'Charizard' ORDER BY id) LIMIT 1;`, function (err, result) { if (err) throw err;
//         console.log("pokemon is created");
//     }
// );

// pool.query(`INSERT INTO pokemons (trainer_id, name, type, attack_stat, defense_stat, speed_stat) SELECT * FROM (SELECT 1, 'Blastoise', 'Water', 450, 320, 400) AS tmp WHERE NOT EXISTS (SELECT name FROM pokemons WHERE name = 'Blastoise' ORDER BY id) LIMIT 1;`, function (err, result) { if (err) throw err;
//         console.log("pokemon is created");
//     }
// );

module.exports = pool;