/**
 * 生成数独解决方案
 */
const Tooltik = require('./tooltik')

module.exports = class Generator {
  generate() {
    while (!this.internalGenerate()) {
      console.warn('try again')
    }
  }

  internalGenerate() {
    this.matrix = Tooltik.matrix.makeMatrix()
    this.orders = Tooltik.matrix.makeMatrix()
      .map(row => row.map((v, i) => i))
      .map(row => Tooltik.matrix.shuffle(row))

    for (let n = 1; n <= 9; n++) {
      if (!this.fillNumber(n)) {
        return false
      }
    }
    return true
  }

  fillNumber(n) {
    return this.fillRow(n, 0)
  }

  fillRow(n, rowIndex) {
    if (rowIndex > 8) {
      return true
    }

    const row = this.matrix[rowIndex]
    // 随机选择列
    const orders = this.orders[rowIndex]
    for (let i = 0; i < 9; i++) {
      const colIndex = orders[i]
      // 如果这个位置已经有值，跳过
      if (row[colIndex]) {
        continue;
      }

      // 检查这个位置是否可以填写 n
      if (!Tooltik.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue;
      }

      row[colIndex] = n

      // 当前行填写 n 成功，递归调用 fillRow() 来在下一行中填写 n
      // 去下一行填写 n， 如果没填写进去，就继续寻找当前行下一个位置
      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0
        continue;
      }
      return true
    }
    return false
  }
}