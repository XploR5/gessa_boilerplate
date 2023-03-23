import React, { useEffect, useState } from "react";
import axios from "axios";

interface Survey {
  name: string;
  status: string;
  questions: number;
  createdOn: Date;
  expirationDate: Date;
}

interface SurveyStats {
  total: number;
  ongoing: number;
  draft: number;
  completed: number;
}

const Dashboard: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [stats, setStats] = useState<SurveyStats>({
    total: 0,
    ongoing: 0,
    draft: 0,
    completed: 0,
  });

  useEffect(() => {
    // This is just sample data for now, replace it with axios call to backend
    const sampleData = {
      surveys: [
        {
          name: 'Survey 1',
          status: 'completed',
          questions: 10,
          createdOn: new Date('2022-01-01'),
          expirationDate: new Date('2022-02-01'),
        },
        {
          name: 'Survey 2',
          status: 'ongoing',
          questions: 5,
          createdOn: new Date('2022-02-01'),
          expirationDate: new Date('2022-03-01'),
        },
        {
          name: 'Survey 3',
          status: 'draft',
          questions: 7,
          createdOn: new Date('2022-03-01'),
          expirationDate: new Date('2022-04-01'),
        },
        {
          name: 'Survey 4',
          status: 'draft',
          questions: 7,
          createdOn: new Date('2022-03-01'),
          expirationDate: new Date('2022-04-01'),
        },
        {
          name: 'Survey 5',
          status: 'draft',
          questions: 7,
          createdOn: new Date('2022-03-01'),
          expirationDate: new Date('2022-04-01'),
        },
        {
          name: 'Survey 6',
          status: 'draft',
          questions: 7,
          createdOn: new Date('2022-03-01'),
          expirationDate: new Date('2022-04-01'),
        },
      ],
      stats: {
        total: 6,
        ongoing: 1,
        draft: 1,
        completed: 1,
      },
    };
    setSurveys(sampleData.surveys);
    setStats(sampleData.stats);
  }, []);

  return (
    <div>
      <h2>
        Total Surveys: {stats.total}, Ongoing Surveys: {stats.ongoing}, Draft
        Surveys: {stats.draft}, Completed Surveys: {stats.completed}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Questions</th>
            <th>Created On</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey.name}>
              <td>{survey.name}</td>
              <td>{survey.status}</td>
              <td>{survey.questions}</td>
              <td>{survey.createdOn.toLocaleDateString()}</td>
              <td>{survey.expirationDate.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;