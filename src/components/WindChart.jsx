import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '00:00', wind: 5 },
  { name: '03:00', wind: 8 },
  { name: '06:00', wind: 12 },
  { name: '09:00', wind: 10 },
  { name: '12:00', wind: 7 },
  { name: '15:00', wind: 9 },
  { name: '18:00', wind: 11 },
  { name: '21:00', wind: 6 },
];

export default function WindChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="wind" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}