import pkg from '../package.json';
import { exec } from 'child_process';
import promptsJson from '../src/config/prompts.json';
import { parseRoute } from '../src/utils/setRoutes.js';
import { modulesInit } from '../src/modules/index.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Generator ended
 * @param  {generator} self
 */
const genEnd = self => {
    let toExec;

    // No need to install stuff
    if (self.options['skip-install']) {
        return;
    }

    toExec = 'git init; npm install';

    if (self.props.structure === 'slim_twig') {
        toExec += '; composer install';
    }

    self.log('\n\nInstalling dependencies...\n');

    exec(toExec, (error, stdout, stderr) => {
        /* eslint-disable no-console */
        if (error || stderr) {
            console.error(error || stderr);
        } else {
            console.log(stdout);
        }
        /* eslint-enable no-console */
    });

    // TODO: Should it add origin and make the first commit?
};

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Initialize yeoman
 */
const init = function () {
    this.pkg = pkg;

    // Wait for the end of generator
    this.on('end', () => genEnd(this));
};

/**
 * Takes care of questions to prompt
 */
const askFor = function () {
    const done = this.async();

    // Finally prompt!
    this.prompt(promptsJson, (props) => {
        const newProps = props;

        // Take care of routes
        newProps.routes = parseRoute(newProps.routes);

        this.props = newProps;
        done();
    });
};

/**
 * Copy the template files
 */
const writing = function () {
    // Take care of modules
    modulesInit(this);
};

// -----------------------------------------
// EXPORT

export default { init, askFor, writing };
