"use client"

import { usePdfTextSearch } from "@/lib/usePdfTextSearch";
import useResizeObserver from "@react-hook/resize-observer";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { TextItem } from 'pdfjs-dist/types/src/display/api.js';
import OutlineContent from "./OutlineContent";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

import { Input } from "@/components/ui/input";

import printJS from 'print-js';

export default function PDFViewer({
  file,
  contents,
  className,
}: {
  file: string,
  contents: {
    id: string,
    pageNumber: number
    title: string
  }[],
  className?: string
}) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1); // start on first page

  const [searchString, setSearchString] = useState('');
  const [debouncedSearchString] = useDebounce(searchString, 250);
  const searchResults = usePdfTextSearch(file, debouncedSearchString);

  const contentRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(0);

  const handleResize = (entry: ResizeObserverEntry) => {
    const { width } = entry.contentRect;

    if (width < 928) {
      const margin = 56 * 2 // from padding
      setPageWidth(width - margin)
    } else {
      const margin = 66 * 2 // from padding
      const halfWidth = (width - 30) / 2 // with gap: 32px
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
    setPageNumber(1)
  }

  function goToPrevPage() {
    setPageNumber(prevPage => prevPage > 1 ? prevPage - 1 : 1);
  }

  function goToNextPage() {
    setPageNumber(prevPage => prevPage < numPages ? prevPage + 1 : numPages);
  }

  // Full screen
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current) {
        void containerRef.current.requestFullscreen();
      }
    } else {
      void document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
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
      : `Найдено на ${searchResults.length} страницах`;

  if (searchResults.length === 0) {
    resultText = "Ничего не найдено";
  }

  const handlePrint = () => {
    printJS({ printable: file, type: 'pdf', showModal: true });
    setIsFullscreen(false)
  };
  
  return (
    <div className={className}>
      <div className="w-full">
        <div ref={contentRef} className="w-full">
          <Document
            file={file}
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<Loader2 className="animate-spin w-6 h-8" />}
            className="w-full mt-4 lg:mt-8 grid lg:grid-cols-2 gap-4 items-center justify-center"
          >
            <OutlineContent
              contents={contents}
              setPageNumber={setPageNumber}
            />

            <div className="relative h-fit w-full bg-pdf-reader rounded-xl overflow-hidden flex flex-col justify-center" ref={containerRef}>

              <div className="absolute top-0 w-full mt-4 flex items-start justify-between">
                <div className="ml-4 flex items-start justify-center">
                  <button onClick={toggleSearchInput}
                    className='relative w-6 h-8'>
                    <Image src='/images/glass.svg' alt="" fill sizes='10vw' />
                  </button>

                  <div className={isOpenSearch ? `visible` : `hidden`}>
                    <div className="mx-4 flex flex-col items-start gap-4">
                      <Input placeholder="Найти..." value={searchString} type="search" onChange={(e) => setSearchString(e.target.value)}
                        className="custom-text-button w-full" />
                      <p className="custom-text-tiny text-white italic">
                        {resultText}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mr-4 flex items-center space-x-4">
                  <button className='relative w-6 h-8 invisible lg:visible' onClick={handlePrint}>
                    <Image src='/images/printer.svg' alt="" fill sizes='10vw' />
                  </button>
                  <button onClick={toggleFullscreen} className="relative w-6 h-8">
                    <Image src={isFullscreen ? '/images/minimize.svg' : '/images/resize.svg'} alt="" fill sizes='5vw' />
                  </button>
                </div>

              </div>

              <div className={isFullscreen ? `flex items-center justify-center` : isOpenSearch ? `mt-24 flex items-center justify-center` : `mt-12 flex items-center justify-center`}>
                <button className='relative w-6 h-8 shrink-0 ml-4' onClick={goToPrevPage}>
                  <Image src='/images/right-arrow.svg' alt="" fill sizes='10vw' className="rotate-180" />
                </button>
                <div className="flex flex-col p-4">
                  <Page
                    className="rounded-lg overflow-hidden"
                    key={pageNumber}
                    pageNumber={pageNumber}
                    renderTextLayer
                    customTextRenderer={textRenderer}
                    width={pageWidth}
                    loading={<Loader2 className="animate-spin w-6 h-8" />}
                  />
                  <Progress value={pageNumber} className="mt-4 w-full h-2" />
                </div>
                <button className='relative w-6 h-8 shrink-0 mr-4' onClick={goToNextPage}>
                  <Image src='/images/right-arrow.svg' alt="" fill sizes='10vw' />
                </button>
              </div>

            </div>
          </Document>
        </div>
      </div>
    </div>
  );
}
