
import { useState, useEffect, useRef } from "react";
import CategoryBtn from "../CategoryBtn/CategoryBtn.tsx";
import { v4 as uuidv4 } from 'uuid';
import ApplicationForm from "../ApplicationForm/ApplicationForm.tsx";
import type { JSX } from "react";
import { data } from "react-router";

// Constants and Types

const backendUrl: string = 'http://localhost:3005/api';

type Category = {
    name: string;
    frontendId: string;
    backendId?: string; // Optional, only if the category has been saved to the backend
}

type Application = {
    frontendId: string;
    backendId?: string; // Optional, only if the application has been saved to the backend
    jobTitle: string;
    companyName: string;
    applicationDate: string;
    status: string;
    categoryName: string;
    categoryFrontendId: string;
    userId?: string; // Optional, only if the application has been saved to the backend
};

type showApplicationFormType = {
    show: boolean;
    categoryId?: string; // Optional, only if the form is shown for a specific category
    categoryName?: string
}

interface CategorySectionProps {
    loginStatus: boolean;
}


/****************************************************************************
***********             Tailwind CSS classes            **********************
* ****************************************************************************/
const categorySectionClass: string = "flex justify-center flex-col items-center";
const categoryItemClass: string = "bg-purple-200 p-4 rounded shadow mb-2 mt-3 min-w-200 m-auto text-center";
const categoryDivClass: string = "flex justify-between items-center";
const applicationBtnClass: string = "bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition-colors duration-300";
const h2InputClass: string = "border-none text-xl font-bold text-purple-600 rounded px-2 py-2 w-full focus:outline-none transition-colors duration-300";
const ApplicationContainerClass: string = "flex justify-between items-center bg-purple-100 p-2 rounded mb-2 mt-2";
const DeleteBtn: string = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors duration-300";


/****************************************************************************
*************         CategorySection Component            **********************
// ****************************************************************************/

function CategorySection({ loginStatus }: CategorySectionProps): JSX.Element {

    // State
    const [categories, setCategories] = useState<Category[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [showApplicationForm, setShowApplicationForm] = useState<showApplicationFormType[]>([]);
    const timeoutRef = useRef<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("CategorySection Mounted");
        setLoading(true);
        setError(null);
        const dashboardUrl: string = backendUrl + '/dashboard';
        const optionsObj: RequestInit = {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(dashboardUrl, optionsObj)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Server response was not OK');
                }
            })
            .then((data: { applicationData: Application[], categoriesData: Category[] }) => {
                console.log('Fetched applications:', data);
                if (data.applicationData) {
                    console.log("Setting applications:", data.applicationData);
                    setApplications(data.applicationData);
                }
                else {
                    setApplications([]);
                }
                if (data.categoriesData) {
                    console.log("Setting categories:", data.categoriesData);
                    setCategories(data.categoriesData);
                }
                else {
                    setCategories([]);
                }
                // Extract unique categories from applications
            })
            .finally(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                setError(error.message);
            });
    }, []);


    function handleCategoryBtnClick(): void {
        // Logic for handling button click can be added here
        setCategories([...categories, { name: "", frontendId: uuidv4() }]);

    }

    function handleInputCategoryChange(e: React.ChangeEvent<HTMLInputElement>, id: string): void {
        // const currCategories: Category[] = [...categories];
        setCategories(prevCategories => {
            return prevCategories.map(category => category.frontendId === id ? { ...category, name: e.target.value } : category);
        })

        const delay: number = 500; // milliseconds
        const httpUpdateCategoryUrl: string = backendUrl + '/category/' + id;
        const httpUpdateCategoryBody: RequestInit = {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: e.target.value }) // Add body if needed
        };

        // Clear the previous timeout if it exists
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }


        timeoutRef.current = setTimeout(() => {
            // API call to update category name in the backend
            // const categoryToUpdate: Category | undefined = categories.find(cat => cat.frontendId === id);

            // Send API request after the delay
            // Include name and frontendId in the request body

            fetch(httpUpdateCategoryUrl, httpUpdateCategoryBody)
                .then(response => {
                    if (response.ok) {
                        console.log('Category updated successfully on the server');
                        return response.json();
                    } else {
                        throw new Error('Server response was not OK');
                    }
                })
                .then(data => {
                    console.log('Updated category data:', data);

                    // Update applications with new category name
                    setApplications(prevApps => prevApps.map(app => app.frontendId === id ? { ...app, categoryName: e.target.value } : app));

                })
                .catch((error) => {
                    console.error('Error updating category:', error);
                });
        }, delay);
    }

    function handleApplicationBtnClick(e: React.MouseEvent<HTMLButtonElement>, categoryId: string, categoryName: string): void {
        // Logic for handling application button click can be added here
        // This could involve opening a modal or navigating to another page
        console.log("Add Application button clicked");
        const targetShowForm = showApplicationForm.filter(form => form.categoryId === categoryId);
        if (targetShowForm.length === 0) {
            setShowApplicationForm(prevShow => [...prevShow, { show: true, categoryId: categoryId, categoryName: categoryName }]);
        } else {
            setShowApplicationForm(prevShow => prevShow.map(form => form.categoryId === categoryId ? { ...form, show: true } : form));
        }
    }

    function handleApplicationFormSubmit(e: React.FormEvent<HTMLFormElement>, formData: Application): void {
        e.preventDefault();
        console.log("Form data:", formData);

        // Create unique ID for frontend
        formData.frontendId = uuidv4();

        const categoryToSubmit: Category | undefined = categories.find(cat => cat.frontendId === formData.categoryFrontendId);

        // Update API
        const fetchURL: string = backendUrl + '/applications';
        fetch(fetchURL, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                application: formData,
                category: categoryToSubmit
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Application submitted successfully');
                    // Set Application state
                    setApplications(prevApps => [...prevApps, formData]);
                    return response.json();
                } else {
                    throw new Error('Server response was not OK');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // setShowApplicationForm(false);
        setShowApplicationForm(prevShow => prevShow.map(form => form.show && form.categoryName === formData.categoryName ? { ...form, show: false } : form)); // Hide the form after submission

    }

    function handleDelete(app: Application, e: React.MouseEvent<HTMLButtonElement>): void {
        console.log("Delete button clicked", e.target);

        // Update API
        const fetchURL: string = backendUrl + '/application' + '/' + app.frontendId;
        fetch(fetchURL, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ application: app })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Application deleted successfully');
                    // Set Application state
                    setApplications(prevApps => prevApps.filter(a => a.frontendId !== app.frontendId));
                    return response.json();
                } else {
                    throw new Error('Server response was not OK');
                }
            })
            .then(data => {
                console.log('Deleted application data:', data);
                if (data.length === 0) {
                    setCategories(prevCategories => prevCategories.filter(cat => cat.name !== app.categoryName));
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    return (
        <section className={categorySectionClass}>
            {(loading && <p>Loading...</p>)}
            {error && <p>Error: {error}</p>}
            {loading ? null : <CategoryBtn handleBtnClick={handleCategoryBtnClick} />}
            {categories.map((category: Category) => (
                <div key={category.frontendId} className={categoryItemClass}>
                    <div className={categoryDivClass}>
                        <h2><input type="text" placeholder="Category Name" className={h2InputClass} name={category.name} value={category.name} onChange={e => handleInputCategoryChange(e, category.frontendId)}></input></h2>
                        <button className={applicationBtnClass} onClick={e => handleApplicationBtnClick(e, category.frontendId, category.name)}>+ Add New Application</button>
                    </div>
                    <div>
                        {showApplicationForm.filter(form => form.show && form.categoryId === category.frontendId).map((form, index) => (
                            <ApplicationForm key={index} handleSubmit={handleApplicationFormSubmit} categoryName={category.name} categoryFrontendId={category.frontendId} />
                        ))}
                        {applications.filter(app => app.categoryName === category.name).map((app, index) =>
                        (
                            <div key={index} className={ApplicationContainerClass}>
                                <p>{app.jobTitle} - {app.companyName} - {app.status} on {app.applicationDate}</p> <button className={DeleteBtn} onClick={(e) => handleDelete(app, e)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}

export default CategorySection;