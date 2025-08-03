
import type { JSX } from 'react';
import { useState } from 'react';

type FormData = {
    jobTitle: string;
    companyName: string;
    applicationDate: string;
    status: string;
}

type ApplicationArray = FormData[];

function Form(): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        jobTitle: '',
        companyName: '',
        applicationDate: '',
        status: ''
    });

    const [applications, setApplications] = useState<ApplicationArray>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        setApplications([...applications, formData]);
        setFormData({
            jobTitle: '',
            companyName: '',
            applicationDate: '',
            status: ''
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required />
                <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
                <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleChange} required />
                <select name="status" value={formData.status} onChange={handleChange} required>
                    <option value="">Select Status</option>
                    <option value="applied">Applied</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="offered">Offered</option>
                    <option value="rejected">Rejected</option>
                </select>
                <button type="submit">Add Application</button>
            </form>
            <div>
                <h2>Applications</h2>
                <ul>
                    {applications.map((app, index) => (
                        <li key={index}>
                            {app.jobTitle} at {app.companyName} - {app.status} on {app.applicationDate}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default Form;