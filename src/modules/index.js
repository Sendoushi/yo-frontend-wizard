// -----------------------------------------
// VARS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Initialize modules
 */
const modulesInit = (self) => {
    const style = require('./style/index.js');
    let struc = self.props.structure;
    console.log(`./${struc}/index.js`, struc);
    struc = require(`./${struc}/index.js`);

    // Set initial source in modules
    self.sourceRoot(__dirname);

    console.log(struc);

    // Take care of modules
    style.init(self);
    struc.init(self);
};

// -----------------------------------------
// EXPORT

export { modulesInit };
