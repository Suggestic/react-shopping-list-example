import React, { Fragment, useState } from 'react';

import {
  EuiFlexItem,
  EuiFieldSearch
} from '@elastic/eui';

import RecipeSearchResult from './RecipeSearchResult';

export default function RecipeSearch() {

  const [query, setQuery] = useState('');
  
  return (
    <Fragment>
      <EuiFlexItem>
        <EuiFieldSearch
          placeholder="Search..."
          fullWidth
          value={query}
          incremental={false}
          onChange={e => setQuery(e.target.value)}
        />
      </EuiFlexItem>
      { query && query.length > 4 ? <RecipeSearchResult query={query} /> : ''}
    </Fragment>
  );
}
