import React from "react";
import useDebounce from "../../shared/hooks/useDebounce";
import { getDadJokes } from "../../shared/api/dadJokes";
import Autocomplete from "../../components/Autocomplete/Autocomplete";
import styles from "./mainView.module.css";

function MainView() {
  const [search, setSearch] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<any[]>([]);
  const debouncedFilter = useDebounce<string>(search, 1000);

  React.useEffect(() => {
    if (debouncedFilter !== "") {
      getDadJokes(debouncedFilter).then(({ data }: any): void => {
        setSuggestions(data.results);
      });
    }
  }, [debouncedFilter]);

  return (
    <div className={styles.mainDiv}>
      <Autocomplete
        suggestions={suggestions}
        search={search}
        setSearch={setSearch}
        setSuggestions={setSuggestions}
      />
    </div>
  );
}

export default MainView;
