
import type { JSX } from 'react';
import { useState } from 'react';


/****************************************************************************
 * **************              Type Definitions        ************************
 * ****************************************************************************/

type Application = {
    jobTitle: string;
    companyName: string;
    applicationDate: string;
    status: string;
    categoryName: string;
};

type ApplicationFormProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, formData: Application) => void,
    categoryName: string;
};

/****************************************************************************
 * **************              CSS Classes          ************************
 * ****************************************************************************/
// Input['text']
// Input['date']
// Select styles
// Button Styles




// Initial form data
const initialFormData: Application = {
    jobTitle: '',
    companyName: '',
    applicationDate: '',
    status: '',
    categoryName: ""
}


/****************************************************************************
 * **************              Component             ************************
 * ****************************************************************************/
function ApplicationForm({ handleSubmit, categoryName }: ApplicationFormProps): JSX.Element {

    const [formData, setFormData] = useState(initialFormData);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const { name, value } = e.target;
        // console.log('Name:', name, 'Value:', value);
        setFormData(prevData => ({
            ...prevData,
            categoryName: categoryName,
            [name]: value
        }));
    }

    // Function to handle form submission
    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        handleSubmit(e, formData);
        setFormData(initialFormData); // Reset form after submission
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
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
        </div>
    );
}

export default ApplicationForm;