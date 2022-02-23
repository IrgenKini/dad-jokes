import React from "react";
import styles from "./autocomplete.module.css";

interface AutocompleteProps {
  suggestions: any[];
  setSuggestions: (val: any[]) => void;
  search: string;
  setSearch: (val: string) => void;
}

function Autocomplete({
  suggestions,
  setSuggestions,
  search,
  setSearch,
}: AutocompleteProps) {
  const [areSuggestionsVisible, setAreSuggestionsVisible] =
    React.useState(false);

  const [selectedSuggestion, setSelectedSuggestion] =
    React.useState<string>("");

  const [loading, setLoading] = React.useState<boolean>(false);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [wrapperRef]);

  React.useEffect(() => {
    if (suggestions.length !== 0) {
      setLoading(false);
    }
  }, [suggestions]);

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setAreSuggestionsVisible(false);
    }
  };

  const handleChangeSearchInput = (e: any) => {
    setLoading(true);
    setSuggestions([]);
    setSearch(e.target.value);
    setAreSuggestionsVisible(true);
    if (e.target.value === "") {
      setSelectedSuggestion("");
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div ref={wrapperRef} className={styles.refDiv}>
        <div className={styles.inputDiv}>
          <input
            onFocus={(e) => e.target.select()}
            className={styles.inputClass}
            value={search}
            onChange={(e) => handleChangeSearchInput(e)}
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
        <div className={styles.suggSelectedDiv}>{selectedSuggestion}</div>
        {areSuggestionsVisible && (
          <div className={styles.suggestionsDiv}>
            <ul className={styles.suggList}>
              {suggestions &&
                suggestions.length > 0 &&
                suggestions.map((item, index) => (
                  <li
                    key={index}
                    className={styles.listItem}
                    onClick={() => {
                      setSelectedSuggestion(item.joke);
                      setAreSuggestionsVisible(false);
                    }}
                  >
                    {item.joke}
                  </li>
                ))}
              {loading && (
                <li key={0} className={styles.listItem}>
                  Loading...
                </li>
              )}
              {suggestions.length === 0 && !loading && (
                <li key={0} className={styles.listItem}>
                  No suggestions{" "}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Autocomplete;
