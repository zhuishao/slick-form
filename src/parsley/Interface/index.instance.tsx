import { PluginInter } from './Interface';

export interface FormLibInstance {
  /** start 开启步骤引导 */
  start: (options: PluginInter) => any;
}

const sub: React.FC<FormLibInstance> = () => null;

export default sub;
