class BoardingCard {
  constructor(origin, destination, means, meansMeta) {
    this.origin = origin;
    this.destination = destination;
    this.means = means;
    this.meansMeta = meansMeta;
  }
  hello() {
    console.log('world');
  }
}

module.exports = BoardingCard;
