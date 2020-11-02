import React from "react";

import { EuiIconTip } from "@elastic/eui";

export default function ({ errors }) {
  const errorItems = errors.map((error, i) => (
    <li key={`${i}-il-error`}>
      <EuiIconTip
        aria-label="Warning"
        type="alert"
        color="warning"
        content={error}
      />
    </li>
  ));

  return <ul>{errorItems}</ul>;
}
