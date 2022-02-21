import React from "react";
import MainView from "./pages/MainView/MainView";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <MainView />
    </div>
  );
}

export default App;
