// pages/api/searchPeople.js
import { searchPeople } from '../../src/searchPeople';

export default async function handler(req, res) {
  const people = await searchPeople(req.query);
  res.json(people);
}