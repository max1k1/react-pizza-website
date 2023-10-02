import s from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={s.root}>
      <h1>
        <span>🙃</span>
        <br />
        Nothing was found
      </h1>
      <p className={s.description}>Unfortunately this page is does not exist in our online store</p>
    </div>
  );
};

export default NotFoundBlock;
