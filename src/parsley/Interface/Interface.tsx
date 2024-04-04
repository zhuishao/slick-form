import { ReactNode } from 'react';

interface PluginInter {
  /**
   * 步骤数组
   */
  steps: StepsInter[];
  /**
   * 确定文字
   */
  okText?: string;
  /**
   * 跳过文字
   */
  jumpText?: string;
  /**
   * 跳过文字
   */
  previousText?: string;
  /**
   * 宽度统一设置，也可在steps单独设置，权重低于steps
   */
  width?: number;
  /**
   * 高光提示，动画暂时不开放
   */
  // flash?: boolean;
  /**
   * 主题，
   * @param default 默认主题
   * @param line 线条提示框
   *@default   'default'
   */
  theme?: 'default' | 'line';
}
interface StepsInter {
  /**
   * 内容描述
   */
  intro: ReactNode;
  /**
   * 注入元素
   */
  element?: Element | null;
  /**
   * 执行完成回掉
   */
  callback?: Function;
  /**
   * 标题
   */
  title?: ReactNode;
  /**
   * 提示框宽度
   */
  width?: number;
}
interface TipsInterface {
  steps: any[];
  step: number;
  switchSteps: (e: any, str?: string) => {};
  ending: () => void;
  element?: Element;
  okText?: string;
  jumpText?: string;
  previousText?: string;
  width?: number;
  theme?: string;
}
interface TipsInInter {
  current: any;
}
export { TipsInInter, PluginInter, TipsInterface, StepsInter };
