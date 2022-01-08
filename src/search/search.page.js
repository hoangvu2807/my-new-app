import React from "react";
import { Post } from "../post/post";
import { getSearchResults } from "./search.util";

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
    // if (event.key === "Enter") {
    let term = event.target.value;
    this.setState({
      searchTerm: term,
      searchResults: getSearchResults(term)
    });
    // }
  };

  render() {
    return (
      <div className={"searchPage"}>
        <div>
          <input
            placeholder="Search"
            defaultValue="hello"
            onKeyUp={this.onKeyUp}
          />
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
