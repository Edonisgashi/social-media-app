import React, { useContext, useState, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { MdOutlineSearch, MdOutlineArrowBackIos } from "react-icons/md";
import { appContext } from "../Context/AppContext";
import SearchResults from "./SearchResults";
import { Link } from "react-router-dom";
const Search = ({ isDark }) => {
  const [searchVisible, setSearchVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { users } = useContext(appContext);

  const searchUsers = (value, users) => {
    const searchValue = value.toLowerCase();
    return users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(searchValue) ||
        user.lastName.toLowerCase().includes(searchValue) ||
        user.username.toLowerCase().includes(searchValue)
      );
    });
  };

  const clearInput = () => {
    setSearchValue("");
  };

  const onSearch = (value) => {
    if (value !== "") {
      const result = searchUsers(value, users);
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };

  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

  return (
    <div className="d-flex flex-column pt-3">
      <h2 className="text-center text-muted d-block d-md-none">Search</h2>
      <h2 className="mb-5 mx-2 d-block d-md-none">
        <Link to="/" className="text-muted">
          <MdOutlineArrowBackIos />
        </Link>
      </h2>
      <InputGroup className="mb-3 w-100 w-md-25 position-relative d-flex ">
        <h3 className={`text-${isDark ? "dark" : "light"}`}>
          <MdOutlineSearch />
        </h3>

        <div>
          {searchVisible ? (
            <FormControl
              type="search"
              placeholder="Search..."
              className={`text-light  ${isDark ? "bg-dark" : "bg-primary"} `}
              value={searchValue}
              onChange={handleSearchChange}
              style={{
                borderTopLeftRadius: "50px",
                borderBottomLeftRadius: "50px",
                borderTopRightRadius: "50px",
                borderBottomRightRadius: "50px",
              }}
            />
          ) : null}
        </div>
      </InputGroup>
      {searchResult?.length > 0 && (
        <div className="searchResults ">
          <SearchResults
            searchResult={searchResult}
            isDark={isDark}
            clearInput={clearInput}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
