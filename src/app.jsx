//import * as React from 'react';
import React, { useState,useEffect  } from 'react';
//import { SearchPage } from "./search/search.page";


import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import { getSearchResults } from './search/search.util'
 
/* const App = () => {
    
    return (
        //<div>Hello Electron ....</div>,
        <div className="App">
            
            <SearchPage />
            
        </div>
       
    )
} */
//export default App;
const MIN_INPUT = 3;

const styles = {
    container: {
      margin: "auto",
      maxWidth: "650px",
      padding: "40px",
    },
    constrained: {
      // margin: "auto",
      // maxWidth: "400px",
    },
    formItem: {
      marginLeft: "15px",
    },
    formLabel: {
      marginLeft: "5px",
    },
    selected: {
      color: "#114488",
    }
};
const preselectedChoices = [{ key: "38963", description: "The Mandalorian" }, { key: "563", description: "Star Wars: The Clone Wars" }];
const App = () => {
    const [input, setInput] = useState("");
    // khai báo state, sử dụng hook: useState
    const [variant, setVariant] = useState(SearchPanelVariant.checkbox)
    // SearchPanelVariant : checkbox, link, radio
    const [choices, setChoices] = useState([]);
    const [selectedChoices, setSelectedChoices] = useState(preselectedChoices);
    const [isLoading, setIsLoading] = useState(false);
  
    /**
     * Handle change in search input.
     * @param event
     */
    const handleSearchChange = (event) => {
      const target = event.target;
      setInput(target.value);
    };
  
    /**
     * Handle when selections are made.
     * When picking a link variant, clear search box
     * because we would presumably navigate somewhere.
     * @param selectedChoices
     */
    const handleSelectionChange = (selectedChoices) => {
      setSelectedChoices(selectedChoices);
      // const combinedDescriptions = selectedChoices.map(choice => (choice.description)).join(" ");
      // setInput(combinedDescriptions);
    };
  
    useEffect(() => {
      if (variant === SearchPanelVariant.link || variant === SearchPanelVariant.radio) {
        setSelectedChoices([]);
      }
      setInput("");
    }, [variant]);
  
    /**
     * Perform a search when input changes.
     */
    useEffect(() => {
      // đc gọi khi khi component render va results dưới dạng array
      const search = async () => {
        setIsLoading(true);
        const resultChoices = [];
  
        // Only perform a search if end user has typed a minimum number of characters
        if (input.length >= MIN_INPUT) {
           const results = getSearchResults()
           // lấy results từ data of getSearchResults ở search.util.js
            console.log(results)
          // Transform results to choices.
          results.forEach((result) => {
            const choice = { key: result.id, description: result.content };
            resultChoices.push(choice);
          });
        }
        setChoices(resultChoices);
        setIsLoading(false);
      };
      search();
    }, [input]);
  
    
  
    const VariantChoice = (props) => {
      const { label, variantChoice } = props;
      // props đc truyền vào với values là  variantChoice ở dạng radio
      return (
        <label style={styles.formItem}>
          <input
            key={label}
            type="radio"
            value={variantChoice}
            tabIndex={0}
            checked={variant === variantChoice}
            onChange={() => setVariant(variantChoice)}
          />
          <span style={styles.formLabel}>
            {label}
          </span>
        </label>
      );
    };
  
    return (
      <div style={styles.container}>
        <h1>React-search-panel</h1>
        {/* <p>
          This demonstration searches for TV shows when you type at least {MIN_INPUT} characters.
          It uses the public <a href="http://www.tvmaze.com/api#show-search">TVMAZE API</a>.
          When picking a link variant, clear search box to show how that can be done.
        </p> */}
        <p>
          Configure variant:
          <VariantChoice label="Checkbox" variantChoice={SearchPanelVariant.checkbox} />
          <VariantChoice label="Link" variantChoice={SearchPanelVariant.link} />
          <VariantChoice label="Radio" variantChoice={SearchPanelVariant.radio} />
        </p>
        <div style={styles.constrained}>
          <SearchPanel
            chips
            choices={choices}
            isLoading={isLoading}
            maximumHeight={150}
            onChange={handleSearchChange}
            onClear={() => setInput("")}
            onSelectionChange={handleSelectionChange}
            placeholder="Search "
            preSelectedChoices={selectedChoices}
            shadow
            value={input}
            variant={variant}
            width={400}
          />
        </div>
        {/* <p style={styles.selected}>
          Selected: {JSON.stringify(selectedChoices)}
        </p> */}
      </div>
    );
  };
  export default App;