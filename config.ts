import { ConfigurationMaker } from "@atomist/sdm-core/lib/machine/yaml/configureYaml";
import { githubLifecycleSupport } from "@atomist/sdm-pack-lifecycle-github";
import * as _ from "lodash";

export const LifecycleConfig: ConfigurationMaker = async cfg => {

    // Uncomment to populate atomist.yaml
    /** const cmds = [];
    sdm.commandHandlers.forEach(c => {
        const md = metadataFromInstance(toFactory(c)()) as CommandHandlerMetadata;
        md.intent.forEach(i => {
            cmds.push({
                name: md.name,
                description: md.description,
                intent: i,
            });
        });
    });
    logger.info("\n" + JSON.stringify({ commands: cmds }, undefined, 2));*/
    /**
     const events = [];
     sdm.eventHandlers.forEach(c => {
                const md = metadataFromInstance(toFactory(c)()) as EventHandlerMetadata;
                if (!!md.subscription) {
                    events.push(md.subscription);
                }
            });
     logger.info("\n" + JSON.stringify({ subscriptions: events }, undefined, 2));*/
    _.set(cfg, "sdm.extensionPacks", [githubLifecycleSupport()]);

    return cfg as any;
};
