import { guid } from "@atomist/automation-client/lib/internal/util/string";
import {
    ConfigurationMaker,
    YamlCommandHandlerRegistration,
} from "@atomist/sdm-core/lib/machine/yaml/configureYaml";
import { mapCommand } from "@atomist/sdm-core/lib/machine/yaml/mapCommand";
import { githubLifecycleSupport } from "@atomist/sdm-pack-lifecycle-github";
import { ExtensionPack } from "@atomist/sdm/lib/api/machine/ExtensionPack";
import { SoftwareDeliveryMachine } from "@atomist/sdm/lib/api/machine/SoftwareDeliveryMachine";
import { CommandHandlerRegistration } from "@atomist/sdm/lib/api/registration/CommandHandlerRegistration";
import * as _ from "lodash";

export const LifecycleConfig: ConfigurationMaker = async cfg => {
    const gls = githubLifecycleSupport();
    const functionLifecycleSupport: ExtensionPack = {
        ...gls,
        name: `${gls.name}-${guid().slice(0, 7)}`,
        configure: sdm => {
            const proxy = new Proxy<SoftwareDeliveryMachine>(sdm, {
                get: (target, propKey) => {
                    if (propKey === "addCommand") {
                        return (...args) => {
                            const cmd = args[0] as CommandHandlerRegistration;
                            target[propKey]({ name: cmd.name, ...mapCommand(cmd)(sdm) as YamlCommandHandlerRegistration });
                        };
                    } else if (propKey === "addExtensionPacks") {
                        return (...args) => {
                            const packs = args as ExtensionPack[];
                            target[propKey](...packs.map(p => ({ ...p, name: `${p.name}-${guid().slice(0, 7)}`})));
                        };
                    } else {
                        return target[propKey];
                    }
                },
            });
            gls.configure(proxy);

            // Uncomment to populate atomist.yaml
            /*const cmds = [];
            sdm.commandHandlers.forEach(c => {
                const md = metadataFromInstance(toFactory(c)()) as CommandHandlerMetadata;
                if (!!md.intent && md.intent.length > 0) {
                    cmds.push({
                        name: md.name,
                        description: md.description,
                        intent: toArray(md.intent)[0],
                    });
                }
            });
            logger.info("\n" + JSON.stringify({ commands: cmds }, undefined, 2));
            const events = [];
            sdm.eventHandlers.forEach(c => {
                if (!!md.subscription) {
                    events.push(md.subscription);
                }
            });
            logger.info("\n" + JSON.stringify({ subscriptions: events }, undefined, 2));*/
        },
    };

    _.set(cfg, "sdm.extensionPacks", [functionLifecycleSupport]);

    return cfg as any;
};
