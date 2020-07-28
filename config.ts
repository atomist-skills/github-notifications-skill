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
