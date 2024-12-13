class BloomFilter {
  constructor(size) {
    this.size = size;
    this.store = new Array(size).fill(false);
  }

  insert(item) {
    const hashValues = this.getHashValues(item);
    hashValues.forEach((hash) => {
      this.store[hash] = true;
    });
  }

  mayContain(item) {
    const hashValues = this.getHashValues(item);
    return hashValues.every((hash) => this.store[hash]);
  }

  createStore(size) {
    return new Array(size).fill(false);
  }

  hash1(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) - hash + item.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % this.size;
  }

  hash2(item) {
    let hash = 5381;
    for (let i = 0; i < item.length; i++) {
      hash = (hash * 33) ^ item.charCodeAt(i);
    }
    return Math.abs(hash) % this.size;
  }

  hash3(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 7) ^ item.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % this.size;
  }

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }
}

module.exports = BloomFilter;