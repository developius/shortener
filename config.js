var config = {}

config.configVersion = '0.0.1'
config.programVersion = '0.0.1'

/*
Error (4) - Log things when the system is in distress, will affect users.
Warn  (3) - Something seems phishy, we'll log it to make sure.
Info  (2) - Helpful things that you might want to know, will be high volume.
Debug (1) - Just about everything, will be extremely high volume.
Trace (0) - A fly moves a couple of centimeters in Africa, you'll know about it.
*/

config.loggingLevel = 'debug'

config.port = process.env.PORT || 3004
config.mongo = "mongodb://mongo:27017/shortener"

module.exports = config
