import React, { useState, useEffect } from 'react';

interface SurveyResponse {
question1: string;
question2: string;
}

interface SurveyFormData {
formId: number;
formName: string;
}

const Reports: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<SurveyFormData | null>(null);
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    if (selectedForm !== null) {
      // Make API call to get survey responses for selected form
      // Here we're simulating the API call by generating some sample responses
      const responses = [
        {
          question1: 'Response 1 to Question 1',
          question2: 'Response 1 to Question 2',
        },
        {
          question1: 'Response 2 to Question 1',
          question2: 'Response 2 to Question 2',
          question5: 'Response 5 to Question 1',
          question10: 'Response 10 to Question 2',
        },
      ];
      setSurveyResponses(responses);
    }
  }, [selectedForm]);

  const surveyForms: SurveyFormData[] = [
    { formId: 1, formName: 'Form 1' },
    { formId: 2, formName: 'Form 2' },
  ];

  const handleFormSelect = (form: SurveyFormData) => {
    setSelectedForm(form);
  };

  return (
    <div>
      <h2>Select a form to view responses:</h2>
      <ul>
        {surveyForms.map((form) => (
          <li key={form.formId}>
            <button onClick={() => handleFormSelect(form)}>
              {form.formName}
            </button>
          </li>
        ))}
      </ul>
      {selectedForm !== null && (
        <div>
          <h3>Responses for {selectedForm.formName}:</h3>
          <table>
            <thead>
              <tr>
                <th>Question 1</th>
                <th>Question 2</th>
              </tr>
            </thead>
            <tbody>
              {surveyResponses.map((response, index) => (
                <tr key={index}>
                  <td>{response.question1}</td>
                  <td>{response.question2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;