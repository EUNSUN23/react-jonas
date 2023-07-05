import styles from "./City.module.css";
import {useParams, useSearchParams} from "react-router-dom";
import {useCities} from "../context/CitiesContext.jsx";
import {useEffect} from "react";
import Spinner from "./Spinner.jsx";
import BackButton from "./BackButton.jsx";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function City() {
    // * City컴포넌트와 매칭되는 라우터 url의 parameter 사용하기 *
    const {id} = useParams();
    const {getCity, currentCity, isLoading} = useCities();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    useEffect(function () {
        getCity(id);
    },[id, getCity]); // getCity는 CitiesProvider가 리렌더링될때마다 재생성되는데, getCity가 context를 업데이트하므로 매번 재생성됨. memoization없이 디펜던시에 추가하면 무한 loop를 유발한다.

    const {cityName, emoji, date, notes} = currentCity;

    if(isLoading) return <Spinner/>;

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City {id}</h6>
                <h3>
                    <span>{emoji}</span> {cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date || null)}</p>
            </div>

            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <BackButton/>
            </div>
        </div>
    );
}

export default City;
