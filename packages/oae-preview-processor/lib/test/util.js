/*!
 * Copyright 2014 Apereo Foundation (AF) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import assert from 'assert';
import PreviewConstants from 'oae-preview-processor/lib/constants';

// import * as pubSub from 'oae-util/lib/pubsub';
import * as MQ from 'oae-util/lib/mq';

/**
 * Purges all the events out of the previews queue
 *
 * @param  {Function}       callback        Standard callback function
 * @throws {AssertionError}                 Thrown if an error occurs while purging the queue
 */
const purgePreviewsQueue = function(callback) {
  MQ.purgeQueue(PreviewConstants.MQ.TASK_GENERATE_PREVIEWS, err => {
    assert.ok(!err);
    MQ.purgeQueue(PreviewConstants.MQ.TASK_GENERATE_PREVIEWS_PROCESSING, err => {
      assert.ok(!err);

      // Unbind our dummy-handler from the queue
      MQ.unsubscribe(PreviewConstants.MQ.TASK_GENERATE_PREVIEWS, err => {
        assert.ok(!err);
        return callback();
      });
    });
  });
};

/**
 * Purges all the messages out of the regenerate previews queue
 *
 * @param  {Function}       callback        Standard callback function
 * @throws {AssertionError}                 Thrown if an error occurs while purging the queue
 */
const purgeRegeneratePreviewsQueue = function(callback) {
  MQ.purgeQueue(PreviewConstants.MQ.TASK_REGENERATE_PREVIEWS, err => {
    assert.ok(!err);
    MQ.purgeQueue(PreviewConstants.MQ.TASK_REGENERATE_PREVIEWS_PROCESSING, err => {
      assert.ok(!err);

      // Unbind our dummy-handler from the queue
      MQ.unsubscribe(PreviewConstants.MQ.TASK_REGENERATE_PREVIEWS, err => {
        assert.ok(!err);

        return callback();
      });
    });
  });
};

/**
 * Purges all the messages out of the generate folder previews queue
 *
 * @param  {Function}       callback        Standard callback function
 * @throws {AssertionError}                 Thrown if an error occurs while purging the queue
 */
const purgeFoldersPreviewsQueue = function(callback) {
  MQ.purgeQueue(PreviewConstants.MQ.TASK_GENERATE_FOLDER_PREVIEWS, err => {
    assert.ok(!err);
    MQ.purgeQueue(PreviewConstants.MQ.TASK_GENERATE_FOLDER_PREVIEWS_PROCESSING, err => {
      assert.ok(!err);

      // Unbind our dummy-handler from the queue
      MQ.unsubscribe(PreviewConstants.MQ.TASK_GENERATE_FOLDER_PREVIEWS, err => {
        assert.ok(!err);

        return callback();
      });
    });
  });
};

export { purgePreviewsQueue, purgeRegeneratePreviewsQueue, purgeFoldersPreviewsQueue };
