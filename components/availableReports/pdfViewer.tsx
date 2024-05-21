'use client'

import Image from 'next/image';
import { Button } from '../ui/button';
import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, Outline, pdfjs } from 'react-pdf';
import { Progress } from '../ui/progress'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useIsLargeScreen from './useLargeScreen';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  pdfUrl: string,
  contents: [
    {
      id: string,
      pageNumber: number,
      title: string
    }
  ];
}

export default function PdfViewer({ pdfUrl, contents }: Props) {

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [contentsOpen, setContentsOpen] = useState<boolean>(false);
  const [outlineEmpty, setOutlineEmpty] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages, outline }: { numPages: number, outline?: string[] }) {
    setNumPages(numPages);
    console.log(outline)
    setOutlineEmpty(outline?.length === 0 ? true : false);
  }

  function goToPrevPage() {
    setPageNumber(prevPage => prevPage > 1 ? prevPage - 1 : 1);
  }

  function goToNextPage() {
    setPageNumber(prevPage => prevPage < numPages ? prevPage + 1 : numPages);
  }


  {/* Pages */ }
  function SetPage(numPage: number) {
    setPageNumber(numPage);
  }

  function handleOutlineItemClick({ pageIndex }: { pageIndex: number }) {
    setPageNumber(pageIndex + 1);
  }

  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Обработчик выхода из полноэкранного режима
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const isLargeScreen = useIsLargeScreen();

  return (
    <div className='w-full flex flex-col md:flex-row'>

      <div className="w-1/2">
        <h1 className={!isLargeScreen == true ? 'hidden' : 'block mb-5 font-bold text-blue custom-text-big'}>
          Содержание
        </h1>
        <Button
          className="font-bold text-blue border-2 border-blue custom-text-big mb-5 md:hidden"
          onClick={() => setContentsOpen((prev) => !prev)}>
          Содержание
        </Button>

        <div className={!isLargeScreen ? contentsOpen ? "block mb-5 text-gray-950" : "hidden" : "block text-gray-950"} >
          {

            outlineEmpty ? (
              <Document file={pdfUrl}>
                <Outline onItemClick={handleOutlineItemClick} className="" >

                </Outline>
              </Document>) : (

              contents.map((content) => (
                <h1 className='cursor-pointer text-blue hover:font-bold mb-2 custom-text-big'
                  key={content.id} onClick={() => SetPage(content.pageNumber)}>
                  {content.title}
                </h1>
              ))

            )
          }
        </div>



      </div>

      <div className='h-full w-full relative bg-pdf-reader rounded-xl flex flex-col justify-center items-center' ref={containerRef}>

        <button
          onClick={toggleFullscreen}
          className={`absolute top-5 right-5 w-6 h-6 rounded`}
        >
          <Image src={isFullscreen ? '/images/minimize.svg' : '/images/resize.svg'} alt="" fill sizes='5vw' />
        </button>

        <div className='flex items-center'>
          <button className='relative w-8 h-8' onClick={goToPrevPage}>
            <Image src='/images/left-arrow.svg' alt="" fill sizes='5vw' />
          </button>
          <div className='mx-10 flex flex-col items-center justify-center h-[80vw]'>
            <div className=' flex items-center justify-center'>
              <TransformWrapper>
                <TransformComponent>
                  <Document className="flex items-center justify-center"
                    file={pdfUrl ? pdfUrl : '/sorry.pdf'}
                    onLoadSuccess={onDocumentLoadSuccess}
                    error={<div className="text-center text-red-500">
                      Ошибка загрузки файла
                    </div>}
                    loading={<div className="text-center text-white">
                      Загрузка файла...
                    </div>}
                  >
                    <div className='h-full flex items-center justify-center'>
                      <Page pageNumber={pageNumber}
                        className='p-5 rounded-2xl'
                        renderTextLayer={false} renderAnnotationLayer={false} height={600} width={300}
                      />
                    </div>
                  </Document>
                </TransformComponent>
              </TransformWrapper>
            </div>
            <Progress value={pageNumber} className="mt-5 h-[10px] w-full" />
          </div>
          <button className='relative w-8 h-8' onClick={goToNextPage}>
            <Image src='/images/right-arrow.svg' alt="" fill sizes='5vw' />
          </button>
        </div>
      </div>
    </div>
  )
}

