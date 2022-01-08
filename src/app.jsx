import * as React from 'react';
import { SearchPage } from "./search/search.page";
const App = () => {
    return (
        //<div>Hello Electron ....</div>,
        <div className="App">
            {/* <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2> */}
            <SearchPage />
        </div>    
    )
}
export default App;