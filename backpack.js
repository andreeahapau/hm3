class PackingService {
    constructor() {
      this.counter = 1;
      this.backpackContents = {
        small: [],
        medium: [],
        big: [],
      };
    }
  
    pack(itemSize) {
      if (this.backpackContents[itemSize].length >= maxCapacity[itemSize]) {
        return -1;
      }
  
      const itemId = this.counter++;
      this.backpackContents[itemSize].push(itemId);
      return itemId;
    }
  
    unpack(itemSize) {
      if (this.backpackContents[itemSize].length === 0) {
        return -2; // Item size does not exist
      }
  
      const lastItemId = this.backpackContents[itemSize].pop();
      return lastItemId;
    }
  }
  
  class Backpack {
    constructor(maxCapacity) {
      this.maxCapacity = maxCapacity;
      this.packingService = new PackingService();
    }
  
    organize(actions) {
      const results = [];
  
      for (const action of actions) {
        const [actionType, itemSize] = action;
        if (actionType === 'pack') {
          const itemId = this.packingService.pack(itemSize);
          results.push(itemId);
        } else if (actionType === 'unpack') {
          const itemId = this.packingService.unpack(itemSize);
          results.push(itemId);
        }
      }
  
      return results;
    }
  }
  
  const maxCapacity = {
    small: 8,
    medium: 4,
    big: 2,
  };
  
  const actions = [
    ['pack', 'small'],
    ['pack', 'big'],
    ['pack', 'big'],
    ['pack', 'big'],
    ['unpack', 'big'],
    ['pack', 'medium'],
  ];
  
  const backpack = new Backpack(maxCapacity);
  const output = backpack.organize(actions);
  
  console.log(output); // Output should be [1, 2, 3, -1, 3, 4]