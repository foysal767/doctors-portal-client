import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Home/Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostingKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate()

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await
                fetch('http://localhost:5000/appointmentSpecialty')
            const data = await res.json()
            return data
        }
    })

    const handleAddDoctor = data => {
        // console.log(data.image[0])
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    //save doctor information to the database....
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type':'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result)
                        toast.success(`${data.name} is Added Successfully`)
                        navigate('/dashboard/manageDoctors')
                    })
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h2 className='text-4xl font-semibold text-center text-secondary mb-4'>Add A Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type='text'
                        {...register("name", {
                            required: "Name is Required"
                        })}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name && <p className='text-error'>{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type='email'
                        {...register("email", { required: "Email address is required" })}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Specialty</span></label>
                    <select
                        {...register('specialty')}
                        className="select input-bordered w-full max-w-xs">
                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }

                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Photo</span></label>
                    <input type='file'
                        {...register("image", {
                            required: "Photo is Required"
                        })}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.image && <p className='text-error'>{errors.image?.message}</p>}
                </div>
                <input className='btn btn-accent w-full mt-4' value='Add Doctor' type="submit" />

            </form>
        </div>
    );
};


/* 
***Three places to store images
1. Third party image hosting server --> best
2. File system of your server
3. mongodb (database)
*/


export default AddDoctor;