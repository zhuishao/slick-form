import './index.less';

const BlockQuote = ({
  title,
  subTitle,
  label = title,
  subLabel = subTitle,
  style = {},
}: any) => {
  return (
    <div className="slick-form-block-quote" style={style}>
      {label}
      {subLabel && <div className="slick-form-block-quote-sub">{subLabel}</div>}
    </div>
  );
};
BlockQuote.displayName = 'BlockQuote';
export default BlockQuote;
