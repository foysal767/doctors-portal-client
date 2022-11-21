import React from 'react';
import fluoride from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/whitening.png'
import Service from './Service';
import treatment from '../../../assets/images/treatment.png'

const Services = () => {
    const servicesData = [
        {
            id: 1,
            name: "Fluoride Treatment",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            img: fluoride
        },
        {
            id: 2,
            name: "Cavity Filling",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            img: cavity
        },
        {
            id: 3,
            name: "Teeth Whitening",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            img: whitening
        }
    ]
    return (
        <div className='mt-16'>
            <div className='text-center'>
                <h3 className='text-xl uppercase font-bold text-primary'>Our Services</h3>
                <h2 className='text-3xl uppercase'>Services We Provide</h2>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-8'>
                {
                    servicesData.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>
            <div className="flex lg:card-side bg-base-100 shadow-xl items-center rounded-xl mt-12">
                <div className="hero rounded-xl">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className='w-3/4 md:w-1/2 mx-auto'>
                            <img src={treatment} className="w-full md:w-3/5 mx-auto rounded-lg shadow-2xl" alt='' />
                        </div>
                        <div className='md:w-1/2 mx-start'>
                            <div className='w-3/4 py-6'>
                                <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                                <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;