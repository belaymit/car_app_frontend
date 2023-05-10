import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getCar } from '../redux/carDetail/carDetailSlice';
import DetailTable from '../components/DetailTable';
import styles from '../styles/CarDetail.module.css';

export default function Detail() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.car.data);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCar(id));
  }, []);

  return (
    <>
      {data.errors === true ? (
        <div className={styles.errorContainer}>
          <p>{data.message || 'Error'}</p>
        </div>
      ) : (
        <section className={styles.container}>
          <div className={styles.photoArea}>
            <img className={styles.photo} src={data.payload?.image} alt="car" />
          </div>
          <div className={styles.infoArea}>
            <div className={styles.features}>
              <h1 className={styles.title}>{data.payload?.model}</h1>
              <p className={styles.subtitle}>
                {`- $${data.payload?.price * 0.1} deposit upon any ${data.payload?.model} purchase`}
              </p>
              <DetailTable data={data.payload} />
            </div>
            <Link to={`/reservation/${id}`}>
              <button type="button" className={styles.reserveBtn}>Reserve</button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
