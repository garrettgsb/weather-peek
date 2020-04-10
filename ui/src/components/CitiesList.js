import React from 'react';
import { say } from '../utils.js';

const CitiesList = ({ cities, removeCity }) => (
  <section className='cities-list'>
    { cities.map((city, index) => {
      const { city: name, condition, expect, temperature, cloudy, windy } = city;
      const summary = `Expect ${expect} in ${name}. It's ${temperature} outside, ${cloudy} cloudy, and ${windy} windy.`;
      return (
        <article key={name} className='city-card' styles={{ animationDelay: `${cities.length - index}s` }}>
          <main>
            <h2>{city.city}</h2>
            <h3>{condition}</h3>
            <p>{summary}</p>
          </main>
          <footer>
            <button onClick={() => say(summary)}>Audio</button>
            <button onClick={() => removeCity(city.city)}>Delete</button>
          </footer>
        </article>
      );
    })}
  </section>
);

export default CitiesList;
