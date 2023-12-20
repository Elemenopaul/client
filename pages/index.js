// pages/index.js

import Search from '../components/search';
import ProxycurlSearchForm from '../components/proxycurlsearchform';

export default function Home() {
  return (
    <div>
      <h1>Search People</h1>
      <Search />
      <h1>Search Proxycurl</h1>
      <ProxycurlSearchForm />
    </div>
  );
}