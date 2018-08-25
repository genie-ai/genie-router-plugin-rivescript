# genie-router-plugin-rivescript

A genie-router brain plugin that allows the user to use [rivescript](https://www.rivescript.com/)
as the chat engine and process input to generate a reply.

## Configuration

At the plugin location ($HOME/.genie-router), type:

    npm install --save @genie-ai/genie-router-plugin-rivescript

To enable this plugin, at an attribute called `rivescript` to the `plugins` section
of the _genie-router_ `config.json`. This plugin has one required configuration attribute: *scripts*.
This must point to a directory with one or more `.rive` scripts to load.
