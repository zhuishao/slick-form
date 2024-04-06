import { PluginInter } from './Interface';
export interface FormLibInstance {
    /** start 开启步骤引导 */
    start: (options: PluginInter) => any;
}
declare const sub: React.FC<FormLibInstance>;
export default sub;
