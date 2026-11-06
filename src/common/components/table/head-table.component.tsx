import React from 'react';
import './head-table.css';

interface Props {
  days: Date[];
}

export const HeadTable: React.FC<Props> = ({ days }) => {
  return (
    <thead>
      <tr>
        <th className="head"></th>
        {
          days.map((d, id) => {
            const day = new Date(d).getDate();
            const dayOfWeek = new Date(d).toLocaleDateString('en-US', { weekday: 'short' });
            return <th key={id} className="head">{day} {dayOfWeek}</th>;
          })
        }
        <th className="head">Totales</th>
      </tr>
    </thead>
  )
}
