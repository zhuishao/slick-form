import { getGlobalConfigByName } from '@/util';
import { ConfigProvider } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { PluginInter } from './Interface/Interface';
import Tips from './tips';
import {
  creatE,
  createdBoxSure,
  createdTips,
  deleteLight,
  query,
  setSpotlight,
} from './utils';

const { token } = getGlobalConfigByName('themeConfig', {});

const continerId = 'Parsley-20220412';

let overflow = '';
const Dialog = ({ steps, ...props }) => {
  const [step, setStep] = useState(1);
  const stepRef = useRef(0);
  // 创建或者更新box高亮
  const createdAndUpdateBoxChild = () => {
    const subStep = (stepRef.current || step) - 1;
    if (!steps.length) return;
    const { element } = steps[subStep];
    if (!element) return;
    // 设置元素外层遮罩
    setSpotlight(element, props.flash);
  };
  const onResize = useCallback(debounce(createdAndUpdateBoxChild, 300), []);
  useEffect(() => {
    // 添加监听
    window.addEventListener('resize', onResize);
    return () => {
      overflow = '';
      query('body').removeChild(query(`#${continerId}`));
      window.removeEventListener('resize', onResize);
    };
  }, []);
  useEffect(() => {
    // 步骤跳动，模块们重新创建，并记录
    stepRef.current = step;
    // 新建提示框
    createdTipsAndDes(step);
    // 遮幕+透光窗户
    createdBox();
  }, [step]);
  // 通过flag判断上一步下一步
  const switchSteps = async (flag?: any) => {
    const { current } = stepRef;
    const newStep = flag === 'proviousStep' ? current - 1 : current + 1;
    if (newStep === (steps.length as number) + 1) {
      ending();
      return;
    }
    // 上一步节点事件
    const origin = current - 1;
    if (steps[origin].callback) {
      await steps[origin].callback();
    }
    // 切换step
    deleteLight(stepRef);
    setStep(newStep);
  };

  // 结束销毁
  const ending = () => {
    const box = query('.slick-form-steps-center');
    box.parentElement.removeChild(box);
    const body = query('body');
    body.style.overflow = overflow || 'auto';
    // 销毁react
    const { current } = stepRef;
    const tips = query(`.slick-form-steps-tips${current}`);
    ReactDOM.unmountComponentAtNode(query(`#${continerId}`));
    tips && ReactDOM.unmountComponentAtNode(tips);
    // 先卸载react事件，在清除元素
    deleteLight(stepRef);
  };
  // 创建遮罩层
  const createdBox = () => {
    query('.slick-form-steps-center') || createdBoxSure(overflow);
    const spotlight = query('.slick-form-spotlight');
    if (spotlight) return;
    // 创建高光
    createdAndUpdateBoxChild();
  };
  // 创建提示框
  const createdTipsChild = (base: any): any => {
    const subStep = (stepRef.current || step) - 1;
    if (!steps.length) return;
    const { element } = steps[subStep];
    ReactDOM.render(
      <ConfigProvider theme={{ token }}>
        <Tips
          steps={steps}
          step={subStep + 1}
          switchSteps={switchSteps}
          element={element}
          ending={ending}
          {...props}
        />
      </ConfigProvider>,
      base
    );
  };
  // 提示框
  const createdTipsAndDes = subStep => {
    const tips = query(`.slick-form-steps-tips${subStep}`)
      ? query(`.slick-form-steps-tips${subStep}`)
      : createdTips(subStep);
    // 创建弹窗内容
    createdTipsChild(tips);
  };
  return null;
};

/** 对象直接调用 */
export default {
  /**
   * 开启
   */
  start: async (options: PluginInter) => {
    if (Array.isArray(options.steps)) {
      // 直接用react接管dom，最后再销毁，使用react编写，
      let tag = query(`#${continerId}`);
      if (!tag) {
        tag = creatE('div');
        tag.setAttribute('id', continerId);
        query('body').appendChild(tag);
      }
      ReactDOM.render(<Dialog {...options} />, tag);
    }
  },
};
