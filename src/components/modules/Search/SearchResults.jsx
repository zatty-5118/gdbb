import { useEffect, useState } from 'react';
import ArticleCard from '../Card/ArticleCard';
import { array__allSeries } from '../../../scripts/modules/array__allSeries.js';

export default function SearchResults({ data }) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const rawMsName = params.get('msName') || '';
    const rawSeries = params.get('series') || '';
    const rawBrand = params.get('brand') || '';
    const rawRelease = params.get('release') || '';

    const msName = rawMsName.toLowerCase();
    const series = rawSeries.toLowerCase();
    const brand = rawBrand.toLowerCase();
    const release = rawRelease.toLowerCase();

    setQuery({ msName: rawMsName, series: rawSeries, brand: rawBrand, release: rawRelease });

    if (data?.length) {
      const filtered = data.filter((post) => {
        const matchmsName = !msName || post.title?.toLowerCase().includes(msName);
        const matchseries = !series || post.series?.toLowerCase() === series;
        const matchBrand = !brand || post.brand?.toLowerCase() === brand;
        const matchRelease = !release || post.release?.toLowerCase().includes(release);
        console.log(matchRelease)
        return matchmsName && matchseries && matchBrand && matchRelease;
      });

      setResults(filtered);
    }

  }, [data]);

  const matchedSeries = array__allSeries.find(item => item.series === query.series);
  const seriesJa = matchedSeries ? matchedSeries.seriesJa : '';

  const [firstLoading, setFirstLoading] = useState(true);
   
  const removeLoading = (() => {
    setTimeout(() => {
      setFirstLoading(false);
      if (typeof document !== 'undefined') {
          document.querySelector('body').style.overflow = 'auto';
      }
    }, 500);
  })();

  return (
    <>
      {firstLoading ? (
          <>
            <section className="firstLoadnig">
                  <div className="spinner">
                      <svg witdh="120" height="120" viewBox="-60 -60 120 120">
                          <circle r="50" fill="none" stroke="red" strokeWidth="10" />
                      </svg>
                      <p>Loading・・・</p>
                  </div>
            </section>
          </>
        ) : (
          <>
            {Object.values(query).some((v) => v) && (
              <div className="title">
                <h1>「
                  <span className="searchWord">
                    {query.msName && <span>{query.msName}</span>}
                    {query.series && <span>{seriesJa}</span>}
                    {query.brand && <span>{query.brand}</span>}
                    {query.release && <span>{query.release}年</span>}
                  </span>
                  」の検索結果
                </h1>
              </div>
            )}
            <p className='resultLength'>検索結果：{results.length}件</p>
            {results.length === 0 ? (
              <div className="resultText">
                <p>該当する記事はありませんでした。</p>
                <p>恐れ入りますが、検索するキーワードを変えるか、<br />記事一覧、シリーズ一覧、ブランド一覧からお探しください。</p>
              </div>
            ) : (
              <ArticleCard articles={results} cardType="border"/>
            )
            }
          </>
        )
      }
    </>
  );
}
