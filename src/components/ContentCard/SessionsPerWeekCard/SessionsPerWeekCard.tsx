import React, { FunctionComponent } from 'react';
import Plot from 'react-plotly.js';
import './SessionsPerWeekCard.scss';
import { SessionsPerWeekProps } from './SessionsPerWeekCard.types';

import ContentCard from './../ContentCard';
import { Data } from 'plotly.js';
import { AppColors } from '../../../utils';

const getRanges = (weeks = 5, weekEndingDay = 5, paddingWeeks = 1) => {
  const ranges: Array<{ start: Date, end: Date, label: string }> = [];
  let friday = new Date();
  friday.setDate(friday.getDate() + (weekEndingDay - 1 - friday.getDay() + 7) % 7 + 1 - ((weeks - paddingWeeks) * 7));
  for (let i = 0; i < weeks; ++i) {
    const start = new Date(friday);
    friday.setDate(friday.getDate() + 6);
    const nextThursday = new Date(friday);
    friday.setDate(friday.getDate() + 1);
    const end = new Date(friday);
    ranges.push({
      start,
      end,
      label: `${start.toDateString().slice(4, 7)} ${start.getDate()}-${nextThursday.getDate()}`,
    });
  }
  return ranges;
}

const SessionsPerWeekCard: FunctionComponent<SessionsPerWeekProps> = ({ sessions }) => {
  const ranges = getRanges();
  const data: Data & { width: number } = {
    type: 'bar',
    x: ranges.map(r => r.label),
    y: ranges.map(r => sessions.filter(s => s.timestamp > r.start && s.timestamp <= r.end).length),
    marker: { opacity: 0.5, color: [ 'blue', 'blue', 'blue', 'red', 'red' ] },
    width: 0.5,
  };
  return (
    <div className="SessionsPerWeekCard">
      <ContentCard>
        <Plot
          className="SessionsPerWeekCard-plot"
          data={[ data ]}
          layout={{
            margin: { t: 24, r: 36, b: 44, l: 36, pad: 10 },
            autosize: true,
            xaxis: {
              tickangle: -15,
              tickfont: { size: 8 },
            },
            yaxis: {
              tickcolor: AppColors.textColorDim,
              tickfont: { size: 10 },
            },
          }}
          config={{ displayModeBar: false }}
        />
        <div>Sessions per week</div>
      </ContentCard>
    </div>
  );
};

export default React.memo(SessionsPerWeekCard);
