import React from "react";
import { Post } from "../post/post";
import { getSearchResults } from "./search.util";
import SelectSearch from 'react-select-search';
import "./search.css";


export class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "hello",
      searchResults: getSearchResults("hello")
    };
  }

  onKeyUp = (event) => {
    console.log(event)
    // if (event.key === "Enter") {
    let term = event.target.value;
    this.setState({
      searchTerm: term,
      searchResults: getSearchResults(term)
    });
    // }
  };

  onChange = event => {
    console.log(event)
  }


  render() {
    return (
      
      <div className={"searchPage"}>
        <div>
          <input
            type = "text"
            placeholder="Search"
            //defaultValue="hello"
            onKeyUp={this.onKeyUp}
          />
         
          <SelectSearch options={
            [
              {name: 'Swedish', value: 'sv'},
              {name: 'English', value: 'en'}
            ]
          } name="language" placeholder="Choose your language" search={true} onChange={() => input("")}/>
        </div>
        {this.state.searchTerm && (
          <p>Search results for {this.state.searchTerm}</p>
        )}
        <div className={"searchResultsList"}>
          {this.state.searchTerm &&
            this.state.searchResults.map((post, index) => (
              <Post key={post.id} content={post.content} index={index} />
            ))}
        </div>
        
      </div>
    );
  }
  
}
function showSuggestions(){

}