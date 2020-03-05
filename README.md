# `atomist/github-lifecycle-skill`

<!---atomist-skill-readme:start--->

Enabling this skill automatically turns on notifications and provides commands for GitHub activities from Slack. This skill uses the Atomist Slack integration, which needs to be configured before using the skill. To choose channels to receive notifications from repositories, link them on the **Manage > Integrations > Slack** page. For more information about the Slack integration and channel repository linking, see [the documentation](https://docs.atomist.com/user/slack/).

## Configuration

Configuration of this skill is done in Slack. As a direct message with the `@atomist` bot or in any channel where you have invited `@atomist`, enter and send this command:

`@atomist configure lifecycle`

Follow the instructions provided to configure:

- How notifications work for pushes, issues, pull requests, branches, code reviews and commenting
- Whether to show compact or standard notification messages
- Add emoji used by these notifications

## Integrations

**Slack**

This skill requires the Atomist Slack integration to be configured.

<!---atomist-skill-readme:end--->

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack workspace][slack]. 

[atomist]: https://atomist.com/ (Atomist - How Teams Deliver Software)
[slack]: https://join.atomist.com/ (Atomist Community Slack)
 
