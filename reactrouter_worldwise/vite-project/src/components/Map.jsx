import styles from './Map.module.css';
import {useNavigate, useSearchParams} from "react-router-dom";

function Map() {
    // ** Link, NavLink통하지 않고 navigate하기 - useNavigate
    const navigate = useNavigate();

    // ** 현재 url parameter 사용하기 - url에 저장된 state는 모든 컴포넌트에서 접근 가능하다.
    // * setSearchParams : 현재 url parameter 변경 메서드. url뿐 아니라 전체 컴포넌트에서 사용하는 해당 param값이 업데이트된다.
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');


    return (
        <div className={styles.mapContainer} onClick={()=>{navigate('form')}}>

        </div>
    );
}

export default Map;