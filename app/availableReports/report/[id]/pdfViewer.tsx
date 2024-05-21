"use client"

import useResizeObserver from "@react-hook/resize-observer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { pdfjs, Document, Page, Outline } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
// import type { TextItem } from 'pdfjs-dist/types/src/display/api.js';

export default function PDFViewer({
    file,
    className,
}: {
    file: string,
    className?: string
}) {

    console.log(pdfjs.version)

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1); // start on first page

  const [render, setRender] = useState(true);
  const [outlineOpen, setOutlineOpen] = useState(false);

//   const [searchString, setSearchString] = useState('');
//   const [debouncedSearchString] = useDebounce(searchString, 250);

  const contentRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(0);

//   const searchResults = usePdfTextSearch(file, debouncedSearchString);

    const handleResize = (entry: ResizeObserverEntry) => {
        const { width } = entry.contentRect;
        const margin = 20; // Adjust this margin as necessary
        setPageWidth(width - margin);
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

  function onRenderSuccess() {
    setRender(false)
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

  // Go to next page
  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

//   function highlightPattern(text: string, pattern: string) {
//     return text.replace(pattern, (value) => <mark>${value}</mark>);
//   }

//   const textRenderer = useCallback(
//     (textItem: TextItem) => {
//       if (!textItem) return '';
//       return highlightPattern(textItem.str, debouncedSearchString);
//     },
//     [debouncedSearchString]
//   );

//   let resultText =
//   searchResults.length === 1
//     ? "Results found on 1 page"
//     : Results found on ${searchResults.length} pages;

//   if (searchResults.length === 0) {
//     resultText = "no results found";
//   }
return (
    <div className={className}>
        <div className="min-h-screen w-full transform bg-white text-left align-middle shadow-xl transition-all">
          <div ref={contentRef} className="flex flex-col min-h-screen items-center justify-center">
            <Document
              file={file}
              options={options}
              // renderMode="canvas"
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<p className="text-gray-950">Loading...</p>}
              className="mt-20"
            >
              <button 
                className="text-gray-950 font-bold p-2 border border-gray-950 my-2 rounded-xl" 
                onClick={() => setOutlineOpen((prev) => !prev) }>
                  Содержание
              </button>
              <Outline 
                className={outlineOpen ? "block text-gray-950 underline" : "hidden"} 
                onItemClick={({pageNumber}) => {
                  setPageNumber(pageNumber)
                  setOutlineOpen(false)
                }} 
              />
              {render && (
                <p className="text-gray-950">Render...</p>
              )}
              <Page
                className=""
                key={pageNumber}
                pageNumber={pageNumber}
                // customTextRenderer={textRenderer}
                // renderAnnotationLayer={false}
                renderTextLayer
                // onLoadSuccess={onPageLoadSuccess}
                renderForms
                onRenderSuccess={onRenderSuccess}
                // onRenderError={() => setLoading(false)}
                width={Math.min(pageWidth * 0.9, 600)}
                loading={<p className="text-gray-950">Loading...</p>}
              />
            </Document>
          </div>
          <div className="bg-gray-950 fixed top-0 flex w-full flex-row items-center justify-center gap-2 py-4 z-50">

            <nav className="bg-black absolute right-2 top-0">
              <div className="mx-auto">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    Pages:
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium w-max">
                      <span>{pageNumber}</span>
                      <span className="text-gray-400"> / {numPages}</span>
                    </div>
                  </div>
                  {/* <div className="flex flex-col gap-1 ml-3">
                    <label htmlFor="search">Search:</label>
                    <input
                      value={searchString}
                      onChange={(e) => setSearchString(e.target.value)}
                      type="search"
                      className="text-gray-950 pl-2"
                    />
                    <p>{resultText}</p>
                  </div> */}
                </div>
              </div>
            </nav>

            <button
              className="text-gray-950 flex h-fit w-fit items-center justify-center rounded-full bg-white p-3 transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
              disabled={pageNumber <= 1}
              onClick={() =>
                goToPreviousPage()
              }
            >
              <ArrowLeft />
            </button>
            <button
              className="text-gray-950 flex h-fit w-fit items-center justify-center rounded-full bg-white p-3 transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
    </div>
  );
}