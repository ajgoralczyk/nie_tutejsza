'use strict';

/**
 * message-submission service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::message-submission.message-submission');
