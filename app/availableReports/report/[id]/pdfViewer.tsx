"use client"

import React from 'react';
import { usePdfTextSearch } from "@/lib/usePdfTextSearch";
import useResizeObserver from "@react-hook/resize-observer";
import { Loader2 } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { TextItem } from 'pdfjs-dist/types/src/display/api.js';
import OutlineContent from "./OutlineContent";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch"

import { Input } from "@/components/ui/input";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import printJS from 'print-js';

export default function PDFViewer({
  file,
  fileSecond,
  contents,
  contentsSecond,
  className,
}: {
  file: string | undefined,
  fileSecond: string | undefined,
  contents: ({
    id: string,
    pageNumber: number | undefined
    title: string | undefined
  } | undefined)[],
  contentsSecond: ({
    id: string,
    pageNumber: number | undefined
    title: string | undefined
  } | undefined)[],
  className?: string
}) {
  const [isChecked, setIsChecked] = useState(false)

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1); // start on first page

  const [searchString, setSearchString] = useState('');
  const [debouncedSearchString] = useDebounce(searchString, 250);
  const searchResults = usePdfTextSearch(isChecked ? file ?? "" : fileSecond ?? "", debouncedSearchString);

  const contentRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(0);

  const handleResize = (entry: ResizeObserverEntry) => {
    const { width } = entry.contentRect;

    if (width < 928) {
      const margin = 40 * 2 // from padding
      setPageWidth(width - margin)
    } else {
      const margin = 0 // from padding
      const halfWidth = (width) / 1.8 // with gap: 32px
      setPageWidth(halfWidth - margin)
    }
  };

  useResizeObserver(contentRef, handleResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
    setPageNumber(file == undefined ? 1: pageNumber && fileSecond == undefined ? 1: pageNumber)
    //setPageNumber(pageNumber)
  }

  function goToPrevPage() {
    setIsLoading(true)
    setPageNumber(prevPage => prevPage > 1 ? prevPage - 1 : 1);
  }

  function goToNextPage() {
    setIsLoading(true)
    setPageNumber(prevPage => prevPage < numPages ? prevPage + 1 : numPages);
  }

  const options = useMemo(() => ({
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    httpHeaders: {
      'Content-Type': 'application/pdf',
      'Accept-Ranges': 'bytes',
      'Content-Encoding': 'identity',
      'Access-Control-Expose-Headers': 'Accept-Ranges , Content-Length, Content-Range',
      'Content-Length': '1000000',
      'Content-Range': 'bytes 0 - 999999 / 1000000',
    },
  }), []);

  function highlightPattern(text: string, pattern: string) {
    return text.replace(new RegExp(`(${pattern})`, 'gi'), (value) => `<mark>${value}</mark>`);
  }

  const textRenderer = useCallback(
    (textItem: TextItem) => {
      if (!textItem) return '';
      return highlightPattern(textItem.str, debouncedSearchString);
    },
    [debouncedSearchString]
  );

  const [isOpenSearch, setIsOpenSearch] = useState(false)

  const toggleSearchInput = () => {
    setIsOpenSearch(!(isOpenSearch));
  };

  let resultText =
    searchResults.length === 1
      ? "Найдено на одной странице"
      : `Найдено на ${searchResults?.length} страницах`;

  if (searchResults?.length === 0) {
    resultText = "Ничего не найдено";
  }

  const handlePrint = () => {
    printJS({ printable: isChecked ? (file == undefined ? '/decrypted.pdf' : file) : (fileSecond == undefined ? '/archive.pdf' : fileSecond), type: 'pdf', showModal: false });
  };

  const [isTransformEnabled, setIsTransformEnabled] = useState(true);

  const toggleTransform = () => {
    setIsTransformEnabled(!isTransformEnabled);
  };


  const handleOpenPDF = () => {
    const pdfFile = isChecked ? (file || '/decrypted.pdf') : (fileSecond || '/archive.pdf');
    window.open(pdfFile, '_blank');
  };

  const loadedPage = () => {
    setIsLoading(false)
  }

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className={className}>

      <div className="mt-6 md:mt-8 flex flex-shrink-0 justify-start sm:justify-end space-x-2 sm:space-x-4 items-center custom-text-small">
        <div className='flex flex-shrink-0'>
          <p className={`${isChecked ? '' : 'font-bold'} line-clamp-1`}>Архивный документ</p>
        </div>
        <div>
          <Switch onCheckedChange={() => setIsChecked(!isChecked)} />
        </div>
        <div className=''>
          <p className={`${isChecked ? 'font-bold' : ''} line-clamp-1`}>Расшифрованный документ</p>
        </div>
      </div>

      <div className="w-full mt-4 md:mt-8">
        <div ref={contentRef} className="w-full">
          <Document
            file={isChecked ? (file == undefined ? '/decrypted.pdf' : file) : (fileSecond == undefined ? '/archive.pdf' : fileSecond)}
            noData="Документ не найден."
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<Loader2 className="mx-auto my-56 md:my-72 lg:my-20 animate-spin w-6 h-6" />}
            className="w-full mt-4 lg:flex lg:space-x-7 items-start justify-center custom-text-small"
          >
            <OutlineContent
              contents={isChecked ? contents : contentsSecond}
              setPageNumber={setPageNumber}
            />

            <div className="relative mt-4 md:mt-8 lg:mt-0 h-fit w-full bg-pdf-reader rounded-xl overflow-hidden flex flex-col justify-center">

              <div className="absolute top-0 w-full mt-3 lg:mt-6 flex items-start justify-between">
                <div className="ml-3 lg:ml-6 flex items-start justify-center">
                  <button onClick={toggleSearchInput}
                    className='relative w-4 h-4'>
                    <Image src='/images/glass.svg' alt="" fill sizes='10vw' priority={true}/>
                  </button>

                  <div className={isOpenSearch ? `visible` : `hidden`}>
                    <div className="mx-3 flex flex-col items-start">
                      <Input placeholder="Найти..." value={searchString} type="" onChange={(e) => setSearchString(e.target?.value)}
                        className="custom-text-button w-full mb-3" />
                      <p className="custom-text-tiny text-white italic">
                        {resultText}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mr-3 lg:mr-6 flex items-center space-x-4">
                  <button onClick={toggleTransform} className="relative w-4 h-4">
                    <Image src={isTransformEnabled ? '/images/text.svg' : '/images/move.svg'} alt="" fill sizes='5vw' priority={true}/>
                  </button>
                  <button className='relative w-4 h-4 hidden lg:block' onClick={handlePrint}>
                    <Image src='/images/printer.svg' alt="" fill sizes='10vw' priority={true}/>
                  </button>

                  <button onClick={handleOpenPDF} className="relative w-4 h-4">
                    <Image src='/images/open-in-new.svg' alt="" fill sizes='5vw' priority={true}/>
                  </button>

                </div>

              </div>

              <div className={`flex items-center justify-center ${isOpenSearch ? 'mt-20 lg:mt-24' : 'mt-6 lg:mt-12'}`}>
                <button className={`relative w-4 h-4 mx-auto shrink-0 ${isLoading ? 'opacity-10 cursor-not-allowed' : ''}`} onClick={goToPrevPage}>
                  <Image src='/images/right-arrow.svg' alt="" fill sizes='10vw' className="rotate-180" priority={true}/>
                </button>
                <div className="flex flex-col pt-4 mb-3 lg:mb-6">
                  {isTransformEnabled ? (
                    <TransformWrapper>
                      <TransformComponent>
                        <Page
                          className="rounded-lg overflow-hidden cursor-move"
                          key={pageNumber}
                          pageNumber={pageNumber}
                          renderTextLayer={true}
                          customTextRenderer={textRenderer}
                          width={pageWidth}
                          loading={<Loader2 className="animate-spin w-6 h-6" />}
                          onRenderSuccess={loadedPage}
                        />
                      </TransformComponent>
                    </TransformWrapper>
                  ) : (
                    <Page
                      className="rounded-lg overflow-hidden"
                      key={pageNumber}
                      pageNumber={pageNumber}
                      renderTextLayer
                      customTextRenderer={textRenderer}
                      width={pageWidth}
                      loading={<Loader2 className="animate-spin w-6 h-6" />}
                      onRenderSuccess={loadedPage}
                    />
                  )}

                  <Progress value={pageNumber} className="mt-3 w-full h-2" />
                </div>
                <button className={`relative w-4 h-4 mx-auto shrink-0 ${isLoading ? 'opacity-10 cursor-not-allowed' : ''}`} onClick={goToNextPage}>
                  <Image src='/images/right-arrow.svg' alt="" fill sizes='10vw' priority={true}/>
                </button>
              </div>

            </div>
          </Document>
        </div>
      </div>
    </div>
  );
}
