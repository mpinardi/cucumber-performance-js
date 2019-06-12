export default class OptionSplitter {
    static split(option) {
      const parts = option.split(/([^A-Z]):(?!\\)/)
  
      let result = parts.reduce((memo, part, i) => {
        if (partNeedsRecombined(i)) {
          memo.push(parts.slice(i, i + 2).join(''))
        }
        return memo
      }, []);
      result[1] =result.length>1? result[1]: ''
      result[2] =result.length>2? splitOptions(result[2]): []
      return {type:result[0],outputTo:result[1],options:result[2]}
    }
  }
  function splitOptions(option) {
      const parts = option.split(',')
      return parts
  }
  
  function partNeedsRecombined(i) {
    return i % 2 === 0
  }