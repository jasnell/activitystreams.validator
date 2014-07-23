/****************************************************
 * Activity Streams 2.0 Validator
 * Author: James M Snell
 ****************************************************/
var log4js   = require('log4js'),
    util     = require('util'),
    logger   = log4js.getLogger("Validator");

var validate_object       = require('./module/validate-object'),
    validate_absolute_iri = require('./module/validate-absolute-iri'),
    validate_type_value   = require('./module/validate-type-value'),
    validate_language_tag = require('./module/validate-language-tag'),
    validate_nlv          = require('./module/validate-natural-language-value'),
    validate_link_value   = require('./module/validate-link-value'),
    validate_media_type   = require('./module/validate-media-type'),
    validate_link_rel     = require('./module/validate-link-relation'),
    validate_priority     = require('./module/validate-priority'),
    validate_status       = require('./module/validate-status'),
    validate_alias        = require('./module/validate-alias'),
    validate_datetime     = require('./module/validate-datetime'),
    validate_rating       = require('./module/validate-rating'),
    validate_duration     = require('./module/validate-duration'),
    validate_actions      = require('./module/validate-actions');

function defaultReporter(err,info) {
  var args = Array.prototype.slice.call(arguments, 2);
  if (info) {
    process.nextTick(function() {
      if (info.message) {
        args.unshift(info.message);
        logger.info(
          util.format(
            '%s - %s', 
            info.type || "error", 
            util.format.apply(null,args)
          )
        );
      }
    });
  } else if (err) {
    process.nextTick(function() {
      logger.error(err);
    });
  }
}


function default_validator(key,value,options) {
  return true;
}

function isNumberValidator(key,value,reporter,context) {
  if (typeof value !== 'number') {
    reporter(null,{message:'%s MUST be a number [key: %s, was: %s]'},key,key,typeof number);
    return false;
  }
  if (value < 0)
    reporter(null,{message:'%s SHOULD be a non-negative number [key: %s, was: %s]'},key,value);
  return true;
}

function itemsValidator(key,value,reporter,context) {
  if (!Array.isArray(value)) {
    reporter(null,{message:'items MUST be an Array of objects'});
    return false;
  }
  var answer = true;
  value.forEach(function(item) {
    var a = validate_object.validate(item);
    if (!a) {
      reporter(null,{message:'The items array MUST contain valid objects'});
      answer = false;
    }
  });
  return answer;
}

var context = {
  validate: function(key,value,reporter) {
    var validator = key ?
      validators[key] || default_validator :
      validate_object.validate;
    return validator(key,value,reporter||defaultReporter,context);
  },
  isUndefinedOrNull: function(item) {
    return typeof item === 'undefined' || item === null;
  }
};

var validators = {
  'id': validate_absolute_iri.validate,
  'objectType': validate_type_value.validate,
  'language': validate_language_tag.validate,
  'displayName': validate_nlv.validate,
  'url': validate_link_value.validate,
  'rel': validate_link_rel.validate,
  'mediaType': validate_media_type.validate,
  'verb': validate_type_value.validate,
  'actor': validate_link_value.validate,
  'object': validate_link_value.validate,
  'target': validate_link_value.validate,
  'result': validate_link_value.validate,
  'instrument': validate_link_value.validate,
  'participant': validate_link_value.validate,
  'priority': validate_priority.validate,
  'status': validate_status.validate,
  'to': validate_link_value.validate,
  'bto': validate_link_value.validate,
  'cc': validate_link_value.validate,
  'bcc': validate_link_value.validate,
  'alias': validate_alias.validate,
  'author': validate_link_value.validate,
  'content': validate_nlv.validate,
  'summary': validate_nlv.validate,
  'title': validate_nlv.validate,
  'duplicates': validate_link_value.validate,
  'icon': validate_link_value.validate,
  'image': validate_link_value.validate,
  'location': validate_link_value.validate,
  'generator': validate_link_value.validate,
  'provider': validate_link_value.validate,
  'published': validate_datetime.validate,
  'updated': validate_datetime.validate,
  'startTime': validate_datetime.validate,
  'endTime': validate_datetime.validate,
  'validFrom': validate_datetime.validate,
  'validAfter': validate_datetime.validate,
  'validUntil': validate_datetime.validate,
  'validBefore': validate_datetime.validate,
  'rating': validate_rating.validate,
  'attachments': validate_link_value.validate,
  'tags': validate_link_value.validate,
  'inReplyTo': validate_link_value.validate,
  'scope': validate_link_value.validate,
  'height': isNumberValidator,
  'width': isNumberValidator,
  'duration': validate_duration.validate,
  'actions': validate_actions.validate,
  'items': itemsValidator,
  'totalItems': isNumberValidator,
  'itemsPerPage': isNumberValidator,
  'startIndex': isNumberValidator,
  'itemsAfter': validate_datetime.validate,
  'itemsBefore': validate_datetime.validate,
  'first': validate_link_value.validate,
  'last': validate_link_value.validate,
  'prev': validate_link_value.validate,
  'previous': validate_link_value.validate,
  'next': validate_link_value.validate,
  'current': validate_link_value.validate,
  'self': validate_link_value.validate,
  'replies': validate_object.validate
};

exports.validate = context.validate.bind(null,null);
