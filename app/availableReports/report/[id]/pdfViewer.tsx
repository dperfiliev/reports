"use client"

import { usePdfTextSearch } from "@/lib/usePdfTextSearch";
import useResizeObserver from "@react-hook/resize-observer";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { TextItem } from 'pdfjs-dist/types/src/display/api.js';
import OutlineContent from "./OutlineContent";

export default function PDFViewer({
  file,
  contents,
  className,
}: {
  file: string,
  contents:{
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
      const margin = 12*2 // from padding
      setPageWidth(width - margin)
    } else {
      const margin = 48*2 // from padding
      const halfWidth = (width - 32)/2 // with gap: 32px
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
  // function goToNextPage() {
  //   setPageNumber((prevPageNumber) => prevPageNumber + 1);
  // }

  // function goToPreviousPage() {
  //   setPageNumber((prevPageNumber) => prevPageNumber - 1);
  // }

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

  // let resultText =
  // searchResults.length === 1
  //   ? "Найдено на одной странице"
  //   : `Найдено на ${searchResults.length} страницах`;

  // if (searchResults.length === 0) {
  //   resultText = "Не найдено";
  // }

  return (
    <div className={className}>
      <div className="w-full">
        <div ref={contentRef} className="w-full">
          <Document
            file={file}
            options={options}
            // renderMode="canvas"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<Loader2 className="animate-spin w-8 h-8" />}
            className="w-full mt-20 grid lg:grid-cols-2 gap-8 items-center justify-center"
          >
            <OutlineContent 
              contents={contents}
              setPageNumber={setPageNumber}
            />

            <div className="h-fit bg-[#303030] lg:p-12 p-3 rounded-xl overflow-hidden">
              <Page
                className="rounded-lg overflow-hidden"
                key={pageNumber}
                pageNumber={pageNumber}
                renderTextLayer
                customTextRenderer={textRenderer}
                width={pageWidth}
                loading={<Loader2 className="animate-spin w-8 h-8" />}
              />
            </div>
          </Document>
        </div>
        {/* <div className="bg-gray-950 fixed top-0 flex w-full flex-row items-center justify-center gap-2 py-4 z-50">
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
                <div className="flex flex-col gap-1 ml-3">
                  <label htmlFor="search">Search:</label>
                  <input
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    type="search"
                    className="text-gray-950 pl-2"
                  />
                  <p>{resultText}</p>
                </div>
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
        </div> */}
      </div>
    </div>
  );
}