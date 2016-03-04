var config = {}

config.configVersion = '0.02'
config.programVersion = '0.04'

/*
Error (4) - Log things when the system is in distress, will affect users.
Warn  (3) - Something seems phishy, we'll log it to make sure.
Info  (2) - Helpful things that you might want to know, will be high volume.
Debug (1) - Just about everything, will be extremely high volume.
Trace (0) - A fly moves a couple of centimeters in Africa, you'll know about it.
*/

config.loggingLevel = 'debug'

config.port = 3004
config.url = "mongodb://localhost/shortener"

/*
PROD - Production server, tests are not initially run and messages are piped to file.
DEV  - Development server, tests are run and messages are displayed to default out.
*/

config.environment = "DEV"

module.exports = config
