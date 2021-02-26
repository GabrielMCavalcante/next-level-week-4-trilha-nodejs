if (process.env.NODE_ENV == "production") {
  module.exports = {
    "type": "sqlite",
    "database": "./src/database/database.sqlite",
    "migrations": ["./src/database/migrations/*.js"],
    "cli": { 
      "migrationsDir": "./src/database/migrations" 
    },
    "entities": ["./src/models/*.js"]
  }
} else {
  module.exports = {
    "type": "sqlite",
    "database": "./src/database/database.sqlite",
    "migrations": ["./src/database/migrations/*.ts"],
    "cli": { 
      "migrationsDir": "./src/database/migrations" 
    },
    "entities": ["./src/models/*.ts"]
  }
}