import path from 'path';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Creates folders in the base
 * @param   {yo} self
 * @param   {array} folders
 */
const createFolders = (self, folders) => {
    folders.forEach(folder => {
        self.mkdir(folder);
        self.copy('.gitkeep', path.join(folder, '.gitkeep'));
    });
};

// -----------------------------------------
// EXPORT

export { createFolders };
