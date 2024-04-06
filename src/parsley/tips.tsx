import { Button } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TipsInInter, TipsInterface } from './Interface/Interface';

const query: any = document.querySelector.bind(document); // 选择器

function Tips({
  steps,
  step,
  switchSteps,
  ending,
  element,
  okText,
  jumpText,
  previousText,
  width: boxWidth,
  theme = 'default',
}: TipsInterface) {
  const [imgDire, setimgDire] = useState('top-left');
  const type = theme === 'line';
  const ref: TipsInInter = useRef({ current: {} });
  // 针对tips提示框 设置提示框的位置
  const setTipsPosition = () => {
    // 获取视口
    const { offsetWidth, offsetHeight } = document.body;
    const { current } = ref;
    if (!current) return;
    current.style.width = `${steps[step - 1].width || boxWidth || 360}px`;
    // 无指定，居中
    if (!element) {
      current.style.left = `${offsetWidth / 2}px`;
      current.style.top = `${offsetHeight / 2}px`;
      current.style.transform = 'translate(-50%,-50%)';
      return;
    }
    // transform会一直存在，不设置，之前的就会保留
    current.style.transform = 'translate(0,0)';
    // 目标元素的宽高
    const { height, width, left, top } = element.getBoundingClientRect();
    // 提示框的宽高
    const { height: subHeight, width: subWidth } =
      current.getBoundingClientRect();
    // 提示框是否超过你底部,不同类型增加70
    const tipsBottom = top + height + subHeight + 10 + (type ? 70 : 0);
    // 目标高+top+10, 计算宽高
    const bottomStatus = tipsBottom > offsetHeight;
    // 设置箭头方向
    setTriangle(bottomStatus, subHeight);
    const leftPosition = left + width / 2;
    // 区分不同类型
    if (type) {
      const leftFlag = leftPosition + subWidth > offsetWidth;
      current.style.top = `${
        bottomStatus ? top - 20 - subHeight - 50 : tipsBottom - 150
      }px`;
      current.style.left = `${
        leftFlag ? left + width / 2 - subWidth : leftPosition
      }px`;
      if (bottomStatus) {
        !leftFlag ? setimgDire('bottom-left') : setimgDire('bottom-right');
      } else {
        !leftFlag ? setimgDire('top-left') : setimgDire('top-right');
      }
      return;
    }
    const subLeftPosition = left + width / 2 - subWidth / 2;
    // 是否到右边边框rightFlag
    const rightFlag = offsetWidth - subWidth;
    current.style.left = `${
      // eslint-disable-next-line no-nested-ternary
      subLeftPosition > 0
        ? subLeftPosition > rightFlag
          ? rightFlag
          : subLeftPosition
        : 0
    }px`;
    current.style.top = `${
      bottomStatus ? top - 20 - subHeight : top + height + 20
    }px`;
  };
  const onResize = useCallback(debounce(setTipsPosition, 300), []);
  useEffect(() => {
    setTipsPosition();
    // 监听位置
    window.addEventListener('resize', onResize);
    return () => {
      // 卸载
      window.removeEventListener('resize', onResize);
    };
  }, []);
  // 设置箭头位置
  const setTriangle = (bottomStatus, subHeight) => {
    const triangle: any = query(
      `.slick-form-box-tips-${type ? 'img' : 'triangle'}`
    );
    if (!triangle) return;
    // 目前只判断上下两种,不区分左右
    if (!type) {
      triangle.style.left = '50%';
      triangle.style.top = bottomStatus ? `${subHeight}px` : '0';
    }
  };
  return (
    <div
      className={`slick-form-box-tips-center ${type ? '' : 'default'}`}
      ref={ref}
    >
      {steps[step - 1]?.title ? (
        <div className="slick-form-box-tips-title">{steps[step - 1].title}</div>
      ) : (
        ''
      )}
      <div className="slick-form-box-tips-body">{steps[step - 1]?.intro}</div>
      <div className="slick-form-box-tips-footer">
        {step !== steps.length && (
          <div
            id="__step__jump"
            onClick={debounce(ending, 200)}
            style={{ flex: '1 1 0%', cursor: 'pointer' }}
          >
            {jumpText || '跳过'}
          </div>
        )}
        <div
          className="__provious_step"
          onClick={debounce(() => {
            switchSteps('proviousStep');
          }, 200)}
        >
          {step > 1 ? `${previousText || '上一步'}` : ''}
        </div>
        <Button type="primary" onClick={debounce(switchSteps, 200)}>
          {okText || '我知道了'}
          {true && `(${step}/${steps.length})`}
        </Button>
      </div>
      <div
        className="slick-form-box-tips-icon"
        style={{ right: type ? 26 : 14 }}
      >
        <i
          className="iconfont spicon-guanbi"
          style={{ fontSize: 20 }}
          onClick={debounce(ending, 200)}
        />
        {type ? <div className="slick-form-box-tips-star" /> : ''}
      </div>
      {steps[step - 1]?.element ? (
        <div
          className={`slick-form-box-tips-${
            type ? 'img' : 'triangle'
          } slick-form-box-tips-img-${imgDire}`}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default Tips;
