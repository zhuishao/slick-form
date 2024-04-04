import './index.less';

const Ellipsis = ({ children }) => {
  return (
    <div className="slick-form-ellipsis-wrap">
      <span className="txt">{children}</span>
      <span className="title" title={children}>
        {children}
      </span>
    </div>
  );
};

export default Ellipsis;
