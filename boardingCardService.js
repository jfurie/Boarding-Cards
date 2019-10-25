class BoardingCardService {
  constructor() {
    this.boardingCards = [];
    this.addBoardingCards.bind(this);
    this.outGetDescription.bind(this);
    this.getCurrentDescription.bind(this);
    this.getSeatAssignment.bind(this);
    this.locations = {};
    this.start = null;
  }
  hello() {
    console.log('world');
  }
  addBoardingCards(boardingCards) {
    this.boardingCards = boardingCards;
    boardingCards.forEach(card => {
      const origin = card.origin;
      const destination = card.destination;
      if (!this.locations[origin]) {
        this.locations[origin] = {
          departure: null,
          arrival: null
        };
      }
      if (!this.locations[destination]) {
        this.locations[destination] = {
          departure: null,
          arrival: null
        };
      }
      this.locations[origin].departure = card;
      this.locations[destination].arrival = card;
    });
    for (const location in this.locations) {
      const current = this.locations[location];
      if (!current.arrival) {
        this.start = location;
      }
    }
  }
  getSeatAssignment(boardingPass) {
    if (boardingPass.meansMeta.seat) {
      return `Sit in Seat ${boardingPass.meansMeta.seat}`;
    } else {
      return 'No Seat Assignment';
    }
  }
  getCurrentDescription(location, boardingPass) {
    switch (boardingPass.means) {
      case 'Train':
        return `Take train ${boardingPass.meansMeta.trainNumber} from ${
          boardingPass.origin
        } going to ${boardingPass.destination}. ${this.getSeatAssignment(
          boardingPass
        )}`;
        break;
      case 'Airport Bus':
        return `Take airport bus from ${boardingPass.origin} to ${
          boardingPass.destination
        }. ${this.getSeatAssignment(boardingPass)}`;
      case 'Plane':
        return `Take flight ${boardingPass.meansMeta.flightNumber} from ${
          boardingPass.origin
        }, gate ${boardingPass.meansMeta.gate} going to ${
          boardingPass.destination
        }. ${this.getSeatAssignment(boardingPass)}`;
      default:
        break;
    }
  }
  outGetDescription() {
    let current = this.start;
    let departure = null;
    let result = [];
    do {
      let currentLocation = this.locations[current];
      departure = currentLocation.departure;
      if (departure) {
        result.push(this.getCurrentDescription(currentLocation, departure));
        current = departure.destination;
      }
    } while (departure);
    return result;
  }
}

module.exports = BoardingCardService;
