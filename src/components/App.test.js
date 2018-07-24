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

test('bot attributes in range', () => {
  for (let i = 0; i < roster.length; i++) {
    expect(roster[i].strength + roster[i].strength).toBeLessThanOrEqual(100);
  }
});

let nameArray = [];
for (let i = 0; i < roster.length; i++) {
  nameArray.push(roster[i].name);
}
test('unique bot names', () => {
  var uniqueBotNames = Array.from(new Set(nameArray));
  expect(uniqueBotNames.length).toEqual(15);
});
