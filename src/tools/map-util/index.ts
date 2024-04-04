enum DistanceMode {
  /** 默认模式，返回值数字，单位是km */
  DEFAULT = 'DEFAULT',
  /** 中文模式，返回值为字符串，大于1km使用千米，小于1km使用米 */
  CHINESE = 'CHINESE',
  /** 英文模式，返回值为字符串，大于1km使用km，小于1km使用m */
  ENGLISH = 'ENGLISH',
}

type DistanceReturnType<T> = T extends 'DEFAULT'
  ? number
  : T extends 'CHINESE'
  ? string
  : T extends 'ENGLISH'
  ? string
  : never

/**
 * 使用vincenty算法
 *
 * 若不传第五个参数为默认模式
 *
 * mode为DEFAULT是默认模式，返回值数字，单位是m，整数。
 *
 * mode为CHINESE是中文模式，返回值为字符串，大于1km使用千米，保留两位小数，小于1km使用米，整数。
 *
 * mode为ENGLISH是英文模式，返回值为字符串，大于1km使用km，保留两位小数，小于1km使用m，整数。
 *   */
export function distance<T extends keyof typeof DistanceMode>(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  mode: T = 'DEFAULT' as T,
): DistanceReturnType<T> {
  const a = 6378137 // 地球长半轴长度
  const f = 1 / 298.257223563 // 地球扁率
  const b = (1 - f) * a // 地球短半轴长度
  const toRadians = (value) => (value * Math.PI) / 180
  const L = toRadians(lon2 - lon1)

  const U1 = Math.atan((1 - f) * Math.tan(toRadians(lat1)))
  const U2 = Math.atan((1 - f) * Math.tan(toRadians(lat2)))
  const sinU1 = Math.sin(U1)
  const cosU1 = Math.cos(U1)
  const sinU2 = Math.sin(U2)
  const cosU2 = Math.cos(U2)

  let lambda = L
  let lambdaP
  let iterLimit = 100
  let sinLambda
  let cosLambda
  let sinSigma
  let cosSigma
  let sigma
  let sinAlpha
  let cosSqAlpha
  let cos2SigmaM
  let C

  do {
    sinLambda = Math.sin(lambda)
    cosLambda = Math.cos(lambda)
    sinSigma = Math.sqrt(
      cosU2 * sinLambda * (cosU2 * sinLambda) +
        (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) *
          (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda),
    )
    if (sinSigma === 0) {
      return 0 as DistanceReturnType<T> // 两点重合
    }
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda
    sigma = Math.atan2(sinSigma, cosSigma)
    sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma
    cosSqAlpha = 1 - sinAlpha * sinAlpha
    cos2SigmaM = cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha
    if (isNaN(cos2SigmaM)) {
      cos2SigmaM = 0 // 逆极点
    }
    C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha))
    lambdaP = lambda
    lambda =
      L +
      (1 - C) *
        f *
        sinAlpha *
        (sigma +
          C *
            sinSigma *
            (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)))
  } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0)

  if (iterLimit === 0) {
    return NaN as DistanceReturnType<T> // 失败，迭代次数达到限制
  }

  const uSq = (cosSqAlpha * (a * a - b * b)) / (b * b)
  const aA = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)))
  const bB = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)))
  const deltaSigma =
    bB *
    sinSigma *
    (cos2SigmaM +
      (bB / 4) *
        (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
          (bB / 6) *
            cos2SigmaM *
            (-3 + 4 * sinSigma * sinSigma) *
            (-3 + 4 * cos2SigmaM * cos2SigmaM)))
  const s = b * aA * (sigma - deltaSigma)
  const modeProcessor = {
    [DistanceMode.DEFAULT](dis: number) {
      return Math.round(dis)
    },
    [DistanceMode.ENGLISH](dis: number) {
      if (dis < 1) {
        return `${Math.round(dis)}m`
      } else {
        return `${(dis / 1000).toFixed(2)}km`
      }
    },
    [DistanceMode.CHINESE](dis: number) {
      if (dis < 1) {
        return `${Math.round(dis)}米`
      } else {
        return `${(dis / 1000).toFixed(2)}千米`
      }
    },
  }
  return modeProcessor[mode](s) as DistanceReturnType<T>
}
// 循环引用处理
export function safeStringify(obj, replacer?, space?, cycleReplacer?) {
  const stack = new WeakMap()

  return JSON.stringify(
    obj,
    (key, value) => {
      if (value !== null && typeof value === 'object') {
        if (stack.has(value)) {
          // 循环引用处理
          return cycleReplacer ? cycleReplacer(key, value) : '[Circular]'
        }

        stack.set(value, true)
      }

      return replacer ? replacer(key, value) : value
    },
    space,
  )
}
// 缓存函数
export function memoize(fn) {
  const cache = new Map()
  return function (...args) {
    const key = safeStringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = (() => fn.apply(this, args))()
    cache.set(key, result)
    return result
  }
}
