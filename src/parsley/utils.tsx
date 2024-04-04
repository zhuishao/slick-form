export const query: any = document.querySelector.bind(document); // 选择器
// 创建元素
export const creatE: any = document.createElement.bind(document);
// 清除高光
export const deleteLight = stepRef => {
  const spotlight = query('.slick-form-spotlight');
  const targetValue = query('.slick-form-spotlight-setvalue');
  if (targetValue) {
    let classList = [...targetValue.classList];
    classList = classList.filter(i => i !== 'slick-form-spotlight-setvalue');
    targetValue.setAttribute('class', `${classList.join(' ')}`);
  }
  spotlight && spotlight.parentElement.removeChild(spotlight);
  const body = query('body');
  const stepNode = query(`.slick-form-steps-tips${stepRef.current}`);
  stepNode && body.removeChild(stepNode);
};
export const createdBoxSure = overflow => {
  const root = creatE('div');
  root.setAttribute('class', 'slick-form-steps-center');
  const body = query('body');
  overflow = body.style.overflow;
  body.style.overflow = 'hidden';
  body.append(root);
};
// 设置遮罩外层宽高
export const setSpotlight = (element, flash) => {
  const { height, width, left, top } = element.getBoundingClientRect();
  let spotlight = query('.slick-form-spotlight');
  // 不存在就新增，存在就更新位置
  if (!spotlight) {
    spotlight = creatE('div');
    spotlight.setAttribute(
      'class',
      `slick-form-spotlight ${flash ? 'flash' : ''}`
    );
    // 添加到最外层
    const center = query('.slick-form-steps-center');
    center && center.append(spotlight);
    const classList = [...element.classList];
    classList.push('slick-form-spotlight-setvalue');
    element.setAttribute('class', `${classList.join(' ')}`);
  }
  spotlight.style.width = `${width}px`;
  spotlight.style.height = `${height}px`;
  spotlight.style.left = `${left}px`;
  spotlight.style.top = `${top}px`;
  spotlight.style.zIndex = '100000';
  spotlight.style.position = 'fixed';
};

// 创建提示框
export const createdTips = (subStep): any => {
  const tips = creatE('div');
  tips.setAttribute('class', `slick-form-steps-tips${subStep}`);
  tips.style.zIndex = '10000';
  const body = query('body');
  body.append(tips);
  return tips;
};
