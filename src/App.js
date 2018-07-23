import React, { PureComponent } from 'react';
import bender from './img/bender.png';
import $ from 'jquery';
import './styles/base.scss';

export let roster = [];
export let sortedRoster = [];
const availableBots = 15;
let isValidTotal = false;
let isValidUqiqueTotalScore = false;
let isValidUqiqueNames = false;
let maxAttributeScore = 100;

$(document).ready(function() {
  // generate bots with random attributes until we satisfy business requirments
  do {
    GenerateRoster();
  }
  while (!isValidTotal || !isValidUqiqueTotalScore || !isValidUqiqueNames);

  // write roster to page
  var $roster = $('.roster');
  var lineUpClass = 'starter';
  var totalScoreAttribute = 0;
  $.each(sortedRoster, function(i) {
    totalScoreAttribute = roster[i].strength + roster[i].speed;
    if (i > 9) {
      lineUpClass = 'substitute';
    }
    $roster.append('<div class="' + lineUpClass + '"><div>' + roster[i].name + '</div><div>' + roster[i].strength + '</div><div>' + roster[i].speed + '</div><div>' + totalScoreAttribute + '</div></div>');
  });
});

class Bot {
  constructor(name, speed, strength) {
    this.name = name;
    this.speed = speed;
    this.strength = strength;
  }
}

export const GenerateRoster = () => {
  roster = [];

  for (var i = 0; i < availableBots; i++) {
    var bot = new Bot(GetBotName(), GetBotAttribute(), GetBotAttribute());
    JSON.stringify(bot);
    roster.push(bot);
  }

  ValidateTotalAttributeScore(roster);
  ValidateUniqueTotalAttributeScore(roster);
  ValidateUniqueBotNames(roster);
  SortRosterByTotalScore(roster);
};

const GetBotName = () => {
  let name = '';
  let alphaNameLegnth = 3;
  let alphaSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rand = 0;

  // get text for player name
  for (var i = 0; i < alphaNameLegnth; i++) {
    rand = Math.floor(Math.random() * alphaSet.length);
    name += alphaSet.substring(rand, rand + 1);
  }

  // apend four digit number to player name
  name += Math.floor(1000 + Math.random() * 9000);

  return name;
};

const GetBotAttribute = () => {
  let attribute = 0;
  const min = 1;
  const max = 50;

  // generate unique inclusive random attribute
  const num = Math.floor((Math.random() * (max - min + 1)) + min);
  attribute = (num === attribute && min !== max) ? rand() : num;
  return attribute;
};

const ValidateTotalAttributeScore = (roster) => {
  let total = 0;

  for (var i = 0; i < availableBots; i++) {
    total = roster[i]['speed'] + roster[i]['strength'];
    if (total <= maxAttributeScore) {
      isValidTotal = true;
      return;
    }
  }
};

const ValidateUniqueTotalAttributeScore = (roster) => {
  let total = 0;
  let totalArray = [];
  let totalArraySorted = [];
  let result = [];

  for (var i = 0; i < availableBots; i++) {
    total = roster[i]['speed'] + roster[i]['strength'];
    totalArray.push(total);
  }

  totalArraySorted = totalArray.slice().sort();

  for (var i = 0; i < totalArraySorted.length - 1; i++) {
    if (totalArraySorted[i + 1] == totalArraySorted[i]) {
      result.push(totalArraySorted[i]);
    }
  }

  if (result.length === 0) {
    isValidUqiqueTotalScore = true;
    return;
  }
};

const ValidateUniqueBotNames = (roster) => {
  let name = '';
  let result = [];
  let nameArray = [];
  let nameArraySorted = [];


  for (var i = 0; i < availableBots; i++) {
    name = roster[i]['name'];
    nameArray.push(name);
  }

  nameArraySorted = nameArray.slice().sort();

  for (var i = 0; i < nameArraySorted.length - 1; i++) {
    if (nameArraySorted[i + 1] == nameArraySorted[i]) {
      result.push(nameArraySorted[i]);
    }
  }
  if (result.length === 0) {
    isValidUqiqueNames = true;
    return;
  }
};

const SortRosterByTotalScore = (roster) => {
  // consume valid roster and sort it by total score descending
  sortedRoster = roster;
  sortedRoster.sort(function(a, b) {
    return (b.speed + b.strength) - (a.speed + a.strength);
  });
};

class App extends PureComponent {
  render() {
    return (
      <div className={'main'}>
        <header>
          <img src={bender} />
          <h2>BENDER BOTS</h2>
        </header>
        <div className={'roster'}>
          <div className={'meta'}>
            <div>
              Name
            </div>
            <div>
              Speed
            </div>
            <div>
            Strength
            </div>
            <div>
            Total Score
            </div>
          </div>
        </div>
        <div className={'legend'}>
          <div>
            <div className={'legend-starter'}>
              <span></span> Starter
            </div>
            <div className={'legend-substitute'}>
              <span></span> Substitute
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
