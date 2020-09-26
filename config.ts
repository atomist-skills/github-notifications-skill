/*
 * Copyright © 2020 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { lifecycleSupport } from "@atomist/sdm-pack-lifecycle";
import { DefaultGitHubLifecycleOptions } from "@atomist/sdm-pack-lifecycle-github/lib/githubLifecycleSupport";
import { ConfigurationMaker } from "@atomist/sdm/lib/core/machine/yaml/configureYaml";
import * as _ from "lodash";

export const LifecycleConfig: ConfigurationMaker = async cfg => {
	/* const printCommandsExtensionPack: ExtensionPack = {
        ...metadata("print-commands"),
        configure: sdm => {
            // Uncomment to populate atomist.yaml
            const cmds = [];
            sdm.commandHandlers.forEach(c => {
                const md = metadataFromInstance(toFactory(c)()) as CommandHandlerMetadata;
                if (!!md.intent && md.intent.length > 0) {
                    cmds.push({
                        name: md.name,
                        description: md.description,
                        pattern: md.intent[0],
                    });
                }
            });
            logger.info("\n" + JSON.stringify({ commands: cmds }, undefined, 2));
             const events = [];
             sdm.eventHandlers.forEach(c => {
            const md = metadataFromInstance(toFactory(c)()) as EventHandlerMetadata;
            if (!!md.subscription) {
                events.push(md.subscription);
            }
        });
             logger.info("\n" + JSON.stringify({ subscriptions: events }, undefined, 2));

             throw new Error("");
        },
    }; */

	const options = DefaultGitHubLifecycleOptions;
	delete options.push.web;
	delete options.issue.web;
	delete options.pullRequest.web;

	_.set(cfg, "sdm.extensionPacks", [
		lifecycleSupport(DefaultGitHubLifecycleOptions),
	]);

	return cfg as any;
};
