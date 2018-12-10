const log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug'; // default level is OFF - which means no logs at all.
logger.trace("Some debug messages");
logger.debug("Some debug messages");
logger.info("Some debug messages");
logger.warn("Some debug messages");
logger.error("Some debug messages");
logger.fatal("Some debug messages");
