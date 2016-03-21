import path from 'path';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Creates folders in the base
 * @param   {yo} self
 * @param   {string} src
 * @param   {array} files
 * @param   {object} data
 */
const templateBase = (self, src, files, data) => {
    src = path.join(self.sourceRoot(), src);
    data = data || self.props;

    const filesOut = files.out || files.in;

    filesOut.forEach((file, i) => {
        const template = path.join(src, (files.in[i] || files.in[0]));
        self.template(template, file, data);
    });
};

// -----------------------------------------
// EXPORT

export { templateBase };
