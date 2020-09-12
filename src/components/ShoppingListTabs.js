import React from "react";

import { EuiTabbedContent } from "@elastic/eui";

import ByAisleTab from "./ByAisleTab";
import ByRecipeTab from "./ByRecipeTab";

export default () => {
  const tabs = [
    {
      id: "by-aisle--id",
      name: "By Aisle",
      content: <ByAisleTab />,
    },
    {
      id: "by-recipe--id",
      name: "By Recipe",
      content: <ByRecipeTab />,
    },
  ];

  return (
    <EuiTabbedContent
      tabs={tabs}
      initialSelectedTab={tabs[0]}
      autoFocus="selected"
      onTabClick={(tab) => {
        console.log("clicked tab", tab);
      }}
    />
  );
};
