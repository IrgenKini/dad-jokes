import React from "react";
import styles from "./autocomplete.module.css";

interface AutocompleteProps {
  suggestions: any[] | undefined;
  search: string;
  setSearch: (val: string) => void;
}

function Autocomplete({ suggestions, search, setSearch }: AutocompleteProps) {
  const [areSuggestionsVisible, setAreSuggestionsVisible] =
    React.useState(false);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.inputDiv}>
        <input
          className={styles.inputClass}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setAreSuggestionsVisible(true);
          }}
        />
        <div className={styles.divDownButton}>
          <button
            onClick={() => setAreSuggestionsVisible(!areSuggestionsVisible)}
            className={styles.downButton}
          >
            &#9660;
          </button>
        </div>
      </div>
      {areSuggestionsVisible && (
        <div className={styles.suggestionsDiv}>
          <ul className={styles.suggList}>
            {suggestions &&
              suggestions.length > 0 &&
              suggestions.map((item, index) => (
                <li
                  key={index}
                  className={styles.listItem}
                  onClick={() => setSearch(item.joke)}
                >
                  {item.joke}
                </li>
              ))}
            {(!suggestions || suggestions.length === 0) && (
              <li key={0} className={styles.listItem}>
                No suggestions{" "}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
