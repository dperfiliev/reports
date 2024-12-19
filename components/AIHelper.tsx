"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

interface Message {
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
}

export default function AIHelper() {
    const [isVisible, setIsVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: 'Приветствую! Задавайте вопросы — с радостью помогу!', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
        setLoading(false);
    }

    const handleSubmit = async () => {
        if (!inputValue.trim()) return;  

        setLoading(true);
        setError(null);

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   
        setMessages(prevMessages => [...prevMessages, { sender: 'user', text: inputValue, timestamp: currentTime }]);
        setInputValue('');

        if (!recaptchaRef.current) {
            setError('reCAPTCHA не инициализирована');
            setLoading(false);
            return;
        }

        try {
            const token = await recaptchaRef.current?.executeAsync();

            if (!token) {
                setError('Токен reCAPTCHA не имеет значения');
                setLoading(false);
                return;
            }

            recaptchaRef.current?.reset();

            const response = await fetch('/api/query', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: inputValue, recaptchaToken: token }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении ответа от сервера');
            }

            const data = await response.json();

            const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            if (data.output_text) {
                setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: data.output_text, timestamp: botTime }]);
            } else {
                setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'No data', timestamp: botTime }]);
            }
        } catch (error: any) {
            console.error('Error sending request:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const modal = document.getElementById('ai-helper');
            if (modal && !modal.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        if (isVisible) {
            document.addEventListener('pointerdown', handleClickOutside);
        } else {
            document.removeEventListener('pointerdown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, [isVisible]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
        console.error('reCAPTCHA site key is not defined');
    }

    return (
        <div id="ai-helper">
            <button className={`fixed w-12 h-12 ${isVisible ? "bg-pdf-reader" : "bg-blue"} shadow-neutral-300 hover:shadow-neutral-400 shadow-md rounded-2xl z-50 right-4 bottom-4 md:right-8 md:bottom-8`}
                onClick={toggleVisibility}>
                <Image src={isVisible ? "/images/aihelper/close.png" : "/images/aihelper/bot.png"} alt='' fill sizes='50px' className='p-2' />
            </button>
            {isVisible && (
                <div className="fixed mx-auto h-[70%] md:w-[40%] md:h-[70%] bg-back shadow-neutral-300 shadow-md rounded-2xl z-50 p-2 md:p-4 flex flex-col justify-between gap-2 md:gap-4 left-4 bottom-20 right-4 md:left-auto md:right-8 md:bottom-24">
                    <div className='flex gap-2 md:gap-4'>
                        <div className='w-12 h-12 bg-blue rounded-2xl relative'>
                            <Image src="/images/aihelper/bot.png" alt="" fill sizes='50px' className='p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <span className='custom-text-big'>Нейропомощник</span>
                            <span className='custom-text-tiny'>Специалист по отчётам губерноторов</span>
                        </div>
                    </div>
                    <div className='h-max flex flex-col flex-grow rounded-2xl bg-white shadow-[inset_0_0px_2px_#A3A3A3] p-2 md:p-4 overflow-y-auto overflow-x-hidden custom-scrollbar custom-text-small'>

                        {messages.map((message, index) => (
                            <div key={index} className={`flex flex-col h-max w-max max-w-[60%] rounded-2xl p-2 md:p-4 mb-2 text-white ${message.sender === 'user' ? 'bg-pdf-reader self-end text-end' : 'bg-blue self-start'}`}>

                                <p>
                                    {message.text}
                                </p>
                                <p className='custom-text-tiny text-end text-gray-400'>
                                    {message.timestamp}
                                </p>

                            </div>
                        ))}

                        {loading && <div className="h-max w-max rounded-2xl bg-blue text-white p-2 md:p-4 custom-text-small typing-animation"></div>}
                        {error && <div className="text-red-500 custom-text-small">{error}</div>}

                        <div ref={messagesEndRef}></div>
                    </div>

                    <div className='h-12 w-full flex'>
                        <input id='query' className='w-full shadow-[inset_0_0px_2px_#A3A3A3] mr-2 md:mr-4 rounded-2xl p-2 md:p-4 resize-none overflow-y-auto custom-scrollbar focus:outline-none custom-text-small'
                            placeholder="Введите запрос..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="off">
                        </input>
                        <button disabled={loading} onClick={handleSubmit}
                            className={`h-12 w-12 shrink-0 ${(loading) ? `bg-pdf-reader` : `bg-blue`} text-white rounded-2xl relative`}>
                            <Image src="/images/aihelper/send.png" alt="" fill sizes='50px' className=' p-2' />
                        </button>

                        {siteKey && (
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={siteKey}
                                size='invisible'
                                onErrored={() => setError('Проверка reCAPTCHA завершилась неудачно')}
                                badge='bottomleft'
                            />
                        )}
                
                    </div>
                </div>
            )}
        </div>
    )
}