const BoardingCardService = require('./boardingCardService');
const BoardingCard = require('./boardingCard');

const boardingCard1 = new BoardingCard('San Francisco', 'New York', 'Train', {
  trainNumber: '48A',
  seat: '45C'
});
const boardingCard3 = new BoardingCard('New York', 'London', 'Plane', {
  flightNumber: '48A',
  seat: '45C',
  gate: '22'
});
const boardingCard2 = new BoardingCard(
  'Los Angeles',
  'San Francisco',
  'Airport Bus',
  {
    seat: null
  }
);

const service = new BoardingCardService();
service.addBoardingCards([boardingCard1, boardingCard3, boardingCard2]);
const steps = service.outGetDescription();
steps.map(step => console.log(step));
