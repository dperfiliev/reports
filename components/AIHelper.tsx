"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

interface Message {
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
}

interface QueryResponse {
    query: string,
    answer: string,
    date: string,
    timestamp: string;
}

export default function AIHelper() {
    const [isVisible, setIsVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showReCAPTCHA, setShowReCAPTCHA] = useState(true);

    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: 'Здравствуйте! Задавайте вопросы, с радостью отвечу!', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
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

        setInputValue('');

        const sendMessagesToGoogleSheetsAPI = async (message: QueryResponse) => {
            try {
                const response = await fetch('/api/ai-log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(message),
                });
            } catch (error: unknown) {
            }
        };

        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setMessages(prevMessages => [...prevMessages, { sender: 'user', text: inputValue, timestamp: currentTime }]);

        try {
            const token = await recaptchaRef.current?.executeAsync();

            if (!token) {
                setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'reCAPTCHA больше не защищает этот чат!', timestamp: botTime }]);
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
                throw new Error('Ошибка при получении ответа сервера');
            }

            const data = await response.json();

            const botTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            if (data.output_text) {
                setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: data.output_text, timestamp: botTime }]);
            } else {
                setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Извините, но сейчас я не могу ответить. Попробуйте снова через некоторое время.', timestamp: botTime }]);
            }

            const Date = currentDate.toLocaleDateString();

            const newMessage = { query: inputValue, answer: data.output_text, date: Date, timestamp: currentTime };
            sendMessagesToGoogleSheetsAPI(newMessage);

        } catch (error: unknown) {
            //setError((error as Error)?.message || 'Не удалось отправить запрос');
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
        if (isVisible && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
        }
    }, [isVisible]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        const originalViewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content');

        const updateViewport = () => {
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta) {
                viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        };

        const restoreViewport = () => {
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta && originalViewport) {
                viewportMeta.setAttribute('content', originalViewport);
            }
        };

        if (isVisible) {
            updateViewport();
        } else {
            restoreViewport();
        }

        return () => {
            restoreViewport();
        };
    }, [isVisible]);

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    return (
        <div id="ai-helper">

            <button className={`fixed w-12 h-12 ${isVisible ? "bg-pdf-reader" : "bg-blue"} shadow-neutral-300 hover:shadow-neutral-400 shadow-md rounded-2xl z-50 right-4 bottom-4 md:right-8 md:bottom-8`}
                onClick={toggleVisibility}>
                <Image src={isVisible ? "/images/aihelper/close.png" : "/images/aihelper/bot.png"} alt='' fill sizes='50px' priority={true} className='p-2'/>
            </button>
            {isVisible && (
                <div className="fixed mx-auto h-[70%] md:w-[40%] md:h-[70%] bg-back shadow-neutral-300 shadow-md rounded-2xl z-50 p-2 md:p-4 flex flex-col justify-between gap-2 md:gap-4 left-4 bottom-20 right-4 md:left-auto md:right-8 md:bottom-24">
                    <div className='flex gap-2 md:gap-4'>
                        <div className='w-12 h-12 bg-blue rounded-2xl relative'>
                            <Image src="/images/aihelper/bot.png" alt="" fill sizes='50px' priority={true} className='p-2'/>
                        </div>
                        <div className='flex flex-col'>
                            <span className='custom-text-big'>Нейропомощник</span>
                            <span className='custom-text-tiny'>Специалист по отчётам губернаторов</span>
                        </div>
                    </div>
                    <div className='h-max flex flex-col flex-grow rounded-2xl bg-white shadow-[inset_0_0px_2px_#A3A3A3] p-2 md:p-4 overflow-y-auto overflow-x-hidden custom-scrollbar custom-text-small'>

                        {messages.map((message, index) => (
                            <div key={index} className={`inline-flex flex-col h-max max-w-[90%] rounded-2xl p-2 md:p-4 mb-2 text-white ${message.sender === 'user' ? 'bg-pdf-reader self-end text-end' : 'bg-blue self-start'}`}>

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
                            <Image src="/images/aihelper/send.png" alt="" fill sizes='50px' priority={true} className=' p-2' />
                        </button>

                        {siteKey && showReCAPTCHA && (
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={siteKey}
                                size='invisible'
                                onErrored={() => {
                                    setShowReCAPTCHA(false);
                                }}
                                badge='bottomleft'
                            />
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}