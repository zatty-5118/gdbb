import { useState,useEffect } from 'react';
import { BASE_URL } from '../../../scripts/modules/baseURL.js';
import { array__allBrand } from '../../../scripts/modules/array__allBrand.js';
import { array__allSeries } from '../../../scripts/modules/array__allSeries.js';
import styles from "./SearchForm.module.scss";

export default function SearchForm({years}) {
    const [msName, setmsName] = useState('');
    const [series, setSeries] = useState('');
    const [brand, setBrand] = useState('');
    const [release, setRelease] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (msName) params.set('msName', msName);
        if (series) params.set('series', series);
        if (brand) params.set('brand', brand);
        if (release) params.set('release', release);

        window.location.href = `${BASE_URL}/search?${params.toString()}`;
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.searchForm__field}>
                <input
                    type="text"
                    placeholder="機体名"
                    value={msName}
                    onChange={(e) => setmsName(e.target.value)}
                />
                <select 
                    value={release} 
                    onChange={(e) => setRelease(e.target.value)}
                    className={release === '' ? "" : `${styles.selected}`}
                >
                    <option value="">発売年を選択</option>
                    {years.map((year, idx) => (
                        <option value={year}>{year}年</option>
                    ))}
                </select>

            </div>
            <div className={styles.searchForm__field}>
                <select 
                    value={series} 
                    onChange={(e) => setSeries(e.target.value)}
                    className={series === '' ? "" : `${styles.selected}`}
                >
                    <option value="">作品を選択</option>
                    {array__allSeries.map((option, idx) => (
                        <option key={idx} value={option.series}>
                            {option.seriesJa}
                        </option>
                    ))}
                </select>
                <select 
                    value={brand} 
                    onChange={(e) => setBrand(e.target.value)}
                    className={brand === '' ? "" : `${styles.selected}`}
                >
                    <option value="">ブランドを選択</option>
                    {array__allBrand.map((option, idx) => (
                        <option key={idx} value={option.brand}>
                            {option.brand}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.searchForm__button}>
                <button type="submit" disabled={!msName && !series && !brand && !release}>検索</button>
            </div>
        </form>
    );
}
