"use client"

import { useState } from 'react';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Feedback() {

    const [isVisible, setIsVisible] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [touched, setTouched] = useState({ name: false, email: false, message: false });
    const [isFormValid, setIsFormValid] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const handleFormValid = () => {
        if (name !== '' && email !== '' && message !== '') {
            setIsFormValid(true)
        }
        else {
            setIsFormValid(false)
        }
    }

    const handleSubmit = () => {
        setName('');
        setEmail('');
        setMessage('');
        setTouched({ name: false, email: false, message: false });
        setIsFormValid(false);

        // Скрыть форму (если нужно)
        setIsVisible(false);

        alert("Успешно отправлено");
    }

    return (
        <>
            <div className="mt-6 md:mt-8 custom-text-small">
                <p className="">
                    Если у вас есть идеи, вопросы или пожелания, мы будем рады их услышать. <br />
                    Заполните <button onClick={toggleVisibility} className='underline'>форму обратной связи</button>, и мы обязательно примем во внимание ваши слова.
                </p>
            </div>

            {
                isVisible && (
                    <form onSubmit={handleSubmit} onChange={handleFormValid}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-back shadow-neutral-300 
                                   shadow-md rounded-2xl z-50 w-[50%] p-2 md:p-4 flex flex-col flex-grow gap-4 md:gap-8 custom-text-small">
                        <div className='flex items-center justify-between'>
                            <p>Заполните форму ниже, <br /> и мы обязательно учтём ваше мнение!</p>
                            <button onClick={toggleVisibility} className='rounded-2xl relative flex flex-shrink-0 bg-pdf-reader h-12 w-12'>
                                <Image src="/images/aihelper/close.png" alt="" fill sizes='50px' priority={true} className=' p-2' />
                            </button>
                        </div>

                        <div className="flex gap-2 md:gap-4 w-full">
                            <div className="flex flex-col gap-2 md:gap-4 w-1/2">
                                <p className={name === '' && touched.name === true ? 'text-red-500' : ''}>Как к вам обращаться?</p>
                                <input
                                    type="text"
                                    placeholder='Иванов Иван Иванович'
                                    onChange={(e) => {
                                        setName(e.target.value)
                                        setTouched((prev) => ({
                                            ...prev,
                                            name: true
                                        }))
                                    }}
                                    className="h-12 shadow-[inset_0_0px_2px_#A3A3A3] focus:outline-none rounded-2xl p-2 md:p-4" />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 w-1/2">
                                <p className={email === '' && touched.email === true ? 'text-red-500' : ''}>Оставьте ваш E-mail.</p>
                                <input
                                    type="email"
                                    placeholder='ivan.ivanov@mail.ru'
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setTouched((prev) => ({
                                            ...prev,
                                            email: true
                                        }))
                                    }}
                                    className="h-12 shadow-[inset_0_0px_2px_#A3A3A3] focus:outline-none rounded-2xl p-2 md:p-4" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-4 w-full">
                            <p className={message === '' && touched.message === true ? 'text-red-500' : ''}>Ваши идеи помогут нам стать лучше. Поделитесь ими!</p>
                            <textarea
                                rows={4}
                                onChange={(e) => {
                                    setMessage(e.target.value)
                                    setTouched((prev) => ({
                                        ...prev,
                                        message: true
                                    }))
                                }}
                                placeholder='Введите ваше сообщение здесь...'
                                className="custom-scrollbar overflow-y-auto overflow-x-hidden focus:outline-none shadow-[inset_0_0px_2px_#A3A3A3] rounded-2xl resize-none p-2 md:p-4">
                            </textarea>
                        </div>
                        <div className='flex items-center justify-between custom-text-tiny'>
                            <p className=''>Нажимая на кнопку, вы подтверждаете согласие на обработку <br /> персональных данных согласно <a href='#' className='underline'>пользовательскому соглашению</a>.
                            </p>
                            <div className='flex items-center gap-2 md:gap-4'>
                                <button type='submit' className={`rounded-2xl relative h-12 w-12 ${isFormValid ? ' bg-blue' : 'bg-pdf-reader cursor-not-allowed'}`}>
                                    <Image src="/images/aihelper/send.png" alt="" fill sizes='50px' priority={true} className=' p-2' />
                                </button>
                            </div>
                        </div>
                    </form>
                )
            }
        </>
    )
}