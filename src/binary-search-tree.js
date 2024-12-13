module.exports = class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.store = this.createStore(size);
  }

  insert(item) {
    const hashes = this.getHashValues(item);
    hashes.forEach((hash) => this.store.setValue(hash, 1));
  }

  mayContain(item) {
    const hashes = this.getHashValues(item);
    return hashes.every((hash) => this.store.getValue(hash) === 1);
  }

  createStore(size) {
    const bitArray = new Array(size).fill(0);
    return {
      getValue: (index) => bitArray[index],
      setValue: (index, value) => {
        bitArray[index] = value;
      },
    };
  }

  hash1(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) - hash + item.charCodeAt(i);
      hash &= hash;
    }
    return Math.abs(hash % this.size);
  }

  hash2(item) {
    let hash = 5381;
    for (let i = 0; i < item.length; i++) {
      hash = (hash * 33) ^ item.charCodeAt(i);
    }
    return Math.abs(hash % this.size);
  }

  hash3(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = ((hash << 7) ^ item.charCodeAt(i)) & hash;
    }
    return Math.abs(hash % this.size);
  }

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }
};
