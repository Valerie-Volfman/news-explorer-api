const CentralError = require('../errors/central-error');

NO_ARTICLE_FOUND = new CentralError(404, 'No article found with that id');
FORBIDDEN_ERROR = new CentralError(403, 'Forbidden error');
NO_USER_FOUND = new CentralError(404, 'No user found with that id');

module.exports = NO_ARTICLE_FOUND, FORBIDDEN_ERROR, NO_USER_FOUND;