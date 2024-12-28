"use client"

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Feedback() {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    return (
        <>
            <div className="mt-6 md:mt-8 custom-text-small">
                <p className="font-bold">
                    Поделитесь своими мыслями — это просто и важно!
                </p>
                <p className="">
                    Если у вас есть идеи, вопросы или пожелания, мы будем рады их услышать. <br />
                    Заполните короткую форму обратной связи, и мы обязательно примем во внимание ваши слова.
                </p>
                <div>
                    <button onClick={toggleVisibility}>
                        Составить форму ✉️
                    </button>
                </div>
            </div>

            {
                isVisible && (
                    <form action="" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-back shadow-neutral-300 
                    shadow-md rounded-2xl z-50 w-[50%] p-2 md:p-4 flex flex-col flex-grow gap-4 md:gap-8 custom-text-small">
                        <div className='flex items-center justify-between'>
                        <p>Форма обратной связи<br/> 16:56</p>
                        <button className='rounded-2xl relative bg-pdf-reader h-12 w-12'></button>
                        </div>
                        <p>Здравствуйте!</p>

                        <div className="flex gap-2 md:gap-4 w-full">
                            <div className="flex flex-col gap-2 md:gap-4 w-1/2">
                                <p>Как к вам обращаться?</p>
                                <input type="text" placeholder='Введите ваше имя' className="h-12 shadow-[inset_0_0px_2px_#A3A3A3] focus:outline-none rounded-2xl p-2 md:p-4" />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 w-1/2">
                                <p>Почта для обратной связи</p>
                                <input type="email" placeholder='Укажите ваш email' className="h-12 shadow-[inset_0_0px_2px_#A3A3A3] focus:outline-none rounded-2xl p-2 md:p-4" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-4 w-full">
                            <p>Расскажите о своём опыте</p>
                            <textarea name="" id="" placeholder='Введите ваше сообщение здесь...' className="custom-scrollbar overflow-y-auto overflow-x-hidden focus:outline-none shadow-[inset_0_0px_2px_#A3A3A3] rounded-2xl resize-none p-2 md:p-4"></textarea>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='custom-text-tiny w-5/6'>Нажимая кнопку "Отправить", вы даете согласие на обработку своих данных в соответсвии с Условиями соглашения</p>
                            <div className='flex items-center gap-2 md:gap-4'>
                                <button type='submit' className='rounded-2xl relative bg-blue h-12 w-12'></button>
                            </div>
                        </div>
                    </form>
                )
            }
        </>
    )
}