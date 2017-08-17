'use strict';

const assert = require('assert');

/**
 * Mock action receiving a Slack event from slack/receive,
 *   and sending an attachment to slack/post.
 *
 * @param  {JSON} params - Slack event subscription
 * @return {JSON}        - Slack POST parameters of text message
 */
function main(params) {
  return new Promise(resolve => {
    validateParameters(params);

    const attachments = [
      {
        actions: [
          {
            name: 'test_option_one',
            text: 'Test Option One',
            type: 'button',
            value: 'test option one'
          },
          {
            name: 'test_option_two',
            text: 'Test Option Two',
            type: 'button',
            value: 'test option two'
          },
          {
            name: 'test_option_three',
            text: 'Test Option Three',
            type: 'button',
            value: 'test option three'
          }
        ],
        fallback: 'Buttons not working...',
        callback_id: 'test_integration_options'
      }
    ];

    resolve({
      channel: params.slack.event.channel,
      text: params.slack.event.text,
      attachments
    });
  });
}

/**
 * Validates the required parameters for running this action.
 *
 * @param  {JSON} params - the parameters passed into the action
 */
function validateParameters(params) {
  // Required: The channel provider communicating with this action
  assert(
    params.provider && params.provider === 'slack',
    'No Slack channel provider provided.'
  );

  // Required: The parameters of the channel provider
  assert(params.slack, 'No Slack data provided.');

  // Required: Slack event data
  assert(params.slack.event, 'No Slack event data provided.');

  // Required: Slack channel
  assert(params.slack.event.channel, 'No Slack channel provided.');

  // Required: Slack input text
  assert(params.slack.event.text, 'No Slack input text provided.');
}

module.exports = main;