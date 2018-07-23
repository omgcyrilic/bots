import React from 'react';
import ReactDOM from 'react-dom';
import App, { GenerateRoster, roster } from './App';

GenerateRoster();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('roster has 15 players', () => {
  expect(roster).toHaveLength(15);
});

test('roster has all attributes', () => {
  expect(roster)
    .toContainEqual(
      expect.objectContaining({ 
        name: expect.any(String),
        speed: expect.any(Number),
        strength: expect.any(Number),
      })
    );
});

// test('attributes in range'), () => {
//   for(let i = 0; i < roster.length; i++) {
//     expect(roster[i].speed).toBeLessThan(50);
//     expect(roster[i].strength).toBeLessThan(50);
//   }
// }; 
