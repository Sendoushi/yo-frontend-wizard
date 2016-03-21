import React from 'react';
import ReactDOM from 'react-dom';
import outdatedBrowser from 'bedrock/outdatedbrowser';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Component mount
 * @param  {tag} self
 */
const componentDidMount = () => {
    // Set outdated browser
    outdatedBrowser({ lowerThan: 'IE11', languagePath: '' });
};

/**
 * Renders tag
 * @param  {tag} self
 * @return {template}
 */
const render = () => {
    return (
    // <div className="ss-rg app">
    //     <div id="outdated">
    //         <h6>Your browser is out-of-date!</h6>
    //         <p>Update your browser to view this website correctly. <a href="http://outdatedbrowser.com/" id="btnUpdateBrowser">Update my browser now </a></p>
    //         <p className="last"><a title="Close" id="btnCloseUpdateBrowser" href="#">&times;</a></p>
    //     </div>
    // </div>
    );
};

// -----------------------------------------
// The tag

class App extends React.Component {
    componentDidMount() { componentDidMount(this); }

    render() { return render(this); }
}

/**
 * Mounts app
 * @param  {element} el
 */
 const mountApp = el => {};
// const mountApp = el => ReactDOM.render(<App/>, el);

// -------------------------------------------
// EXPORT

export { App, mountApp };
